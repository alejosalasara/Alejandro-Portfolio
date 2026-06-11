/* ==========================================================================
   Slat Shutter — page-transition loader  ·  v0.1  ·  vanilla, zero deps
   --------------------------------------------------------------------------
   A mechanical "venetian shutter" page transition for the Salazar portfolio:
   N red slats snap closed in a stagger to cover the screen, the destination
   name stamps in, then the slats snap open the other way to reveal the next
   page. Black + one red, hard rectangles, no shadows.

   Pair with slat-shutter.css (the look lives there; this file is behaviour).

   ── QUICK START (single-page app — swap content mid-cover) ────────────────
     <link rel="stylesheet" href="slat-shutter.css">
     <script src="slat-shutter.js"></script>

     const shutter = new SlatShutter();           // builds the overlay once
     // on a project click:
     shutter.run(
       { name: 'IMFIT', index: 3, total: 5 },     // what to show on the field
       () => renderProjectPage(3)                  // runs while fully covered
     );

   ── BETWEEN REAL PAGES (multi-document site) ──────────────────────────────
     // list page — intercept links once:
     const shutter = new SlatShutter();
     shutter.bindLinks('a[data-shutter]');         // <a data-shutter href="…">
     // …or imperatively:  shutter.navigate('/work/imfit.html', { name:'IMFIT', index:3, total:5 })

     // EVERY destination page, at the top of its init script:
     new SlatShutter().revealOnLoad();             // opens the shutter on arrival

   ── OPTIONS (constructor) ────────────────────────────────────────────────
     slats      7        number of vertical slats
     slatMs     280      per-slat scale duration (ms)
     stagger    30       delay between adjacent slats (ms)  → total = slatMs + (slats-1)*stagger
     holdMs     80       dwell at full cover before swap/navigate (ms)
     ease       cubic-bezier(.76,0,.16,1)
     eyebrow    'Now Loading'   default kicker above the name
     chrome     true     corner ticks + "Transition"/"Loading" labels
     zIndex     9000
     color      null     CSS colour for the field (else inherits --accent-red)
     mount      null     element to append the overlay to (default document.body)
     sessionKey 'slatShutter:pending'   sessionStorage key carrying meta across a real navigation

   ── API ───────────────────────────────────────────────────────────────────
     .run(meta, swapFn)      Promise   cover → swapFn() → reveal   (SPA)
     .navigate(href, meta)             cover → stash meta → location.assign(href)   (MPA)
     .revealOnLoad()         Promise<bool>   if a navigation is pending, reveal on arrival
     .bindLinks(selector?)             auto-intercept clicks on matching <a> (default '[data-shutter]')
     .cover(meta)            Promise   close the shutter (resolves at full cover + holdMs)
     .reveal()               Promise   open the shutter
     .destroy()                        remove the overlay + listeners

     meta = { name, index, total }  or  { name, idx, eyebrow }
       name    destination title (required for a useful loader)
       index   1-based position; with total renders "03 / 05"
       idx     pre-formatted right label (overrides index/total)
       eyebrow per-call kicker (overrides opts.eyebrow)

   data-* attributes read by bindLinks():
     data-shutter            marker (the selector)
     data-shutter-name       overrides link text as the name
     data-shutter-index / data-shutter-total / data-shutter-eyebrow
   ========================================================================== */
(function (global) {
  'use strict';

  var DEFAULTS = {
    slats: 7,
    slatMs: 280,
    stagger: 30,
    holdMs: 80,
    ease: 'cubic-bezier(.76,0,.16,1)',
    eyebrow: 'Now Loading',
    chrome: true,
    zIndex: 9000,
    color: null,
    mount: null,
    sessionKey: 'slatShutter:pending'
  };

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function pad2(v) { return String(v).padStart(2, '0'); }
  function prefersReduced() {
    return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function SlatShutter(opts) {
    this.o = Object.assign({}, DEFAULTS, opts || {});
    this._busy = false;
    this._build();
  }

  SlatShutter.prototype._build = function () {
    var o = this.o;
    var root = el('div', 'slsh');
    root.setAttribute('aria-hidden', 'true');
    root.style.setProperty('--slsh-z', o.zIndex);
    if (o.color) root.style.setProperty('--slsh-color', o.color);

    var slats = el('div', 'slsh__slats');
    this.slats = [];
    for (var i = 0; i < o.slats; i++) {
      var s = el('span', 'slsh__slat');
      slats.appendChild(s);
      this.slats.push(s);
    }

    var card = el('div', 'slsh__card',
      '<span class="slsh__eyebrow"></span><span class="slsh__name"></span><span class="slsh__idx"></span>');
    this.elEyebrow = card.querySelector('.slsh__eyebrow');
    this.elName = card.querySelector('.slsh__name');
    this.elIdx = card.querySelector('.slsh__idx');

    root.appendChild(slats);
    root.appendChild(card);

    if (o.chrome) {
      root.appendChild(el('div', 'slsh__chrome',
        '<span class="slsh__tick slsh__tick--tl"></span>' +
        '<span class="slsh__tick slsh__tick--tr"></span>' +
        '<span class="slsh__tick slsh__tick--bl"></span>' +
        '<span class="slsh__tick slsh__tick--br"></span>' +
        '<span class="slsh__meta slsh__meta--tl">Transition</span>' +
        '<span class="slsh__meta slsh__meta--br">Loading</span>'));
    }

    (o.mount || document.body).appendChild(root);
    this.root = root;
  };

  SlatShutter.prototype._setMeta = function (meta) {
    meta = meta || {};
    this.elEyebrow.textContent = meta.eyebrow != null ? meta.eyebrow : this.o.eyebrow;
    this.elName.textContent = meta.name || '';
    var idx = '';
    if (meta.idx != null) {
      idx = meta.idx;
    } else if (meta.index != null && meta.index !== '') {
      idx = pad2(meta.index) + (meta.total != null && meta.total !== '' ? (' / ' + pad2(meta.total)) : '');
    }
    this.elIdx.textContent = idx;
  };

  /* Configure every slat for a phase: alternate the growth edge top/bottom,
     stagger the start, and set the duration. Returns the phase's total ms.
     dir = 'cover' | 'reveal' (reveal flips the edge for mechanical continuity). */
  SlatShutter.prototype._phase = function (dir) {
    var o = this.o, n = o.slats;
    var reduce = prefersReduced();
    var dur = reduce ? 0 : o.slatMs;
    var stag = reduce ? 0 : o.stagger;
    for (var i = 0; i < n; i++) {
      var fromTop = (i % 2 === 0);
      var origin = (dir === 'cover') ? (fromTop ? 'top' : 'bottom') : (fromTop ? 'bottom' : 'top');
      var s = this.slats[i];
      s.style.transformOrigin = origin;
      s.style.transition = 'transform ' + dur + 'ms ' + o.ease;
      s.style.transitionDelay = (i * stag) + 'ms';
    }
    return dur + (n - 1) * stag;
  };

  /* Close the shutter. Resolves once fully covered (+ holdMs dwell). */
  SlatShutter.prototype.cover = function (meta) {
    this._setMeta(meta);
    var root = this.root;
    root.classList.remove('is-covered');
    root.classList.add('is-active');
    void root.offsetWidth;                 // commit slats-down baseline
    var total = this._phase('cover');
    for (var i = 0; i < this.slats.length; i++) this.slats[i].classList.add('is-up');
    var showAt = prefersReduced() ? 0 : Math.max(0, total - 130);
    var self = this;
    clearTimeout(this._coverT);
    this._coverT = setTimeout(function () { root.classList.add('is-covered'); }, showAt);
    return wait(total + this.o.holdMs);
  };

  /* Open the shutter. Resolves once fully revealed; deactivates the overlay. */
  SlatShutter.prototype.reveal = function () {
    var root = this.root, self = this;
    root.classList.remove('is-covered');
    void root.offsetWidth;
    var total = this._phase('reveal');
    for (var i = 0; i < this.slats.length; i++) this.slats[i].classList.remove('is-up');
    return wait(total + 40).then(function () {
      root.classList.remove('is-active');
    });
  };

  /* SPA: cover → swap() → reveal. swap() runs while the screen is fully red. */
  SlatShutter.prototype.run = function (meta, swap) {
    if (this._busy) return Promise.resolve();
    this._busy = true;
    var self = this;
    return this.cover(meta)
      .then(function () { if (typeof swap === 'function') return swap(); })
      .then(function () { return self.reveal(); })
      .then(function () { self._busy = false; });
  };

  /* MPA: cover → stash meta → navigate. The destination page calls
     revealOnLoad() to open the shutter on arrival. */
  SlatShutter.prototype.navigate = function (href, meta) {
    if (this._busy) return;
    this._busy = true;
    try { sessionStorage.setItem(this.o.sessionKey, JSON.stringify(meta || {})); } catch (e) {}
    var self = this;
    this.cover(meta).then(function () { global.location.assign(href); });
  };

  /* Call on EVERY destination page's init. If a navigation is pending, snap to
     the covered state then reveal. Returns Promise<bool> (true if it ran). */
  SlatShutter.prototype.revealOnLoad = function () {
    var meta = null;
    try {
      var raw = sessionStorage.getItem(this.o.sessionKey);
      if (raw) { meta = JSON.parse(raw); sessionStorage.removeItem(this.o.sessionKey); }
    } catch (e) {}
    if (meta == null) return Promise.resolve(false);

    this._setMeta(meta);
    var root = this.root, self = this;
    this._phase('cover');
    for (var i = 0; i < this.slats.length; i++) {
      this.slats[i].style.transition = 'none';
      this.slats[i].classList.add('is-up');
    }
    root.classList.add('is-active', 'is-covered');
    void root.offsetWidth;
    return wait(prefersReduced() ? 0 : 240).then(function () { return self.reveal(); }).then(function () { return true; });
  };

  /* Auto-intercept clicks on matching <a> (default '[data-shutter]'). Honours
     modifier keys / new-tab so it never hijacks a deliberate new-window open. */
  SlatShutter.prototype.bindLinks = function (selector) {
    var sel = selector || '[data-shutter]';
    var self = this;
    this._linkHandler = function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest(sel);
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || a.target === '_blank') return;
      e.preventDefault();
      self.navigate(href, {
        name: a.getAttribute('data-shutter-name') || a.textContent.trim(),
        index: a.getAttribute('data-shutter-index'),
        total: a.getAttribute('data-shutter-total'),
        eyebrow: a.getAttribute('data-shutter-eyebrow')
      });
    };
    document.addEventListener('click', this._linkHandler);
    return this;
  };

  SlatShutter.prototype.destroy = function () {
    if (this._linkHandler) document.removeEventListener('click', this._linkHandler);
    clearTimeout(this._coverT);
    if (this.root && this.root.parentNode) this.root.parentNode.removeChild(this.root);
  };

  // UMD-ish export
  if (typeof module !== 'undefined' && module.exports) module.exports = SlatShutter;
  global.SlatShutter = SlatShutter;
})(typeof window !== 'undefined' ? window : this);
