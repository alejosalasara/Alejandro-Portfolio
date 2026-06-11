/* ============================================================
   WORK DETAIL DECK — horizontal card controller
   Vertical wheel / trackpad → horizontal movement, card by card.
   Also: ← → / PageUp-Down / Home-End keys, on-screen arrows,
   rail-tick clicks, and touch swipe. No vertical page scroll.

   Three motion modes (set live by the Tweaks panel):
     • track — eased slide, one card per wheel gesture (default)
     • glide — free horizontal drag that settles to the nearest card
     • reel  — hard cut with a red slat flash between cards
   ============================================================ */
(function () {
  var deck = document.getElementById('deck');
  var cards = Array.prototype.slice.call(deck.querySelectorAll('.card'));
  var N = cards.length;

  var SECTIONS = cards.map(function (c) { return (c.getAttribute('data-label') || '').toUpperCase(); });

  // HUD refs
  var elNow   = document.getElementById('hud-now');
  var elTotal = document.getElementById('hud-total');
  var elSect  = document.getElementById('hud-sect');
  var railFill = document.getElementById('rail-fill');
  var ticks   = Array.prototype.slice.call(document.querySelectorAll('.rail-tick'));
  var btnPrev = document.getElementById('nav-prev');
  var btnNext = document.getElementById('nav-next');
  var hint    = document.getElementById('scroll-hint');
  var flash   = document.getElementById('reel-flash');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // mobile swipe hint — created once, referenced in paintHud
  var swipePulse = document.createElement('div');
  swipePulse.className = 'swipe-pulse';
  swipePulse.setAttribute('aria-hidden', 'true');
  document.body.appendChild(swipePulse);
  var _swipePulseDone = false; // latches true once user scrolls past card 0

  var index = 0;          // current snapped card
  var pos = 0;            // continuous position in "cards" (glide)
  var motion = 'track';
  var locked = false;     // gesture lock for track/reel
  var lockT = null, settleT = null, hintT = null;

  if (elTotal) elTotal.textContent = pad(N);

  function pad(n) { return String(n).padStart(2, '0'); }
  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  // ---- render the track at a continuous position p (in cards) ----
  // NB: use px (viewport width) not vw — some engines reject vw inside
  // translate3d() and silently drop the whole transform.
  function paint(p) {
    deck.style.transform = 'translate3d(' + (-p * window.innerWidth) + 'px,0,0)';
    // rail fill follows the continuous position so glide feels live
    if (railFill) railFill.style.width = (N > 1 ? (p / (N - 1)) * 100 : 0) + '%';
  }

  // ---- update HUD chrome to a snapped index ----
  function paintHud(i) {
    if (elNow) elNow.textContent = pad(i + 1);
    if (elSect) elSect.textContent = SECTIONS[i] || '';
    ticks.forEach(function (t, k) {
      t.classList.toggle('on', k === i);
      t.classList.toggle('done', k < i);
    });
    if (btnPrev) btnPrev.disabled = i <= 0;
    if (btnNext) btnNext.disabled = i >= N - 1;
    if (i > 0) _swipePulseDone = true;
    document.body.classList.toggle('is-first-card', i === 0 && !_swipePulseDone);
    // scroll hint only on the cover, only before first move
    if (hint) {
      if (i === 0) { window.clearTimeout(hintT); hintT = window.setTimeout(function () { hint.classList.add('on'); }, 900); }
      else hint.classList.remove('on');
    }
  }

  // ---- animate to a snapped index ----
  function animateTo(i, opts) {
    opts = opts || {};
    index = clamp(i, 0, N - 1);
    pos = index;
    deck.setAttribute('data-anim', opts.instant ? 'off' : 'on');
    paint(pos);
    if (opts.instant) {
      // force reflow then restore eased default for subsequent moves
      void deck.offsetWidth;
      deck.setAttribute('data-anim', 'on');
    }
    paintHud(index);
  }

  // ---- public navigation ----
  function goTo(i, fromUser) {
    i = clamp(i, 0, N - 1);
    if (i === index && fromUser !== 'force') return;
    if (motion === 'reel' && !reduce) {
      runReel(function () { animateTo(i, { instant: true }); });
    } else {
      animateTo(i, { instant: false });
    }
  }
  function next() { if (index < N - 1) step(1); }
  function prev() { if (index > 0) step(-1); }
  function step(dir) {
    if (locked) return;
    goTo(index + dir);
    lockGesture();
  }
  function lockGesture() {
    locked = true;
    window.clearTimeout(lockT);
    lockT = window.setTimeout(function () { locked = false; }, motion === 'reel' ? 480 : 660);
  }

  // ---- reel slat flash ----
  function runReel(swap) {
    if (!flash) { swap(); return; }
    flash.classList.remove('run'); void flash.offsetWidth;
    flash.classList.add('run');
    // swap underneath at the midpoint, while the slats cover the screen
    window.setTimeout(swap, 200);
    window.setTimeout(function () { flash.classList.remove('run'); }, 560);
  }

  // ---- wheel / trackpad ----
  function onWheel(e) {
    // horizontal-dominant gestures (trackpad) and vertical both drive the deck
    var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (d === 0) return;
    e.preventDefault();

    if (motion === 'glide' && !reduce) {
      // free continuous drag; settle to nearest on idle
      deck.setAttribute('data-anim', 'off');
      pos = clamp(pos + d / window.innerWidth, 0, N - 1);
      paint(pos);
      // live index readout while gliding
      var live = Math.round(pos);
      if (live !== index) { index = live; paintHud(index); }
      window.clearTimeout(settleT);
      settleT = window.setTimeout(function () {
        deck.setAttribute('data-anim', 'on');
        animateTo(Math.round(pos));
      }, 120);
    } else {
      // track / reel — one snapped step per gesture
      if (Math.abs(d) < 8) return;
      step(d > 0 ? 1 : -1);
    }
  }

  // ---- keyboard ----
  function onKey(e) {
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); goTo(0); break;
      case 'End': e.preventDefault(); goTo(N - 1); break;
    }
  }

  // ---- touch swipe ----
  var tsx = 0, tsy = 0, tracking = false;
  function onTS(e) { var t = e.touches[0]; tsx = t.clientX; tsy = t.clientY; tracking = true; }
  function onTM(e) {
    if (!tracking) return;
    var t = e.touches[0];
    if (Math.abs(t.clientX - tsx) > Math.abs(t.clientY - tsy) && Math.abs(t.clientX - tsx) > 8) {
      e.preventDefault();
    }
  }
  function onTE(e) {
    if (!tracking) return; tracking = false;
    var t = (e.changedTouches && e.changedTouches[0]) || null; if (!t) return;
    var dx = t.clientX - tsx, dy = t.clientY - tsy;
    if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
  }

  // ---- public API for Tweaks + in-page buttons ----
  window.deck = {
    goTo: function (i) { goTo(i, 'force'); },
    next: next, prev: prev,
    setMotion: function (m) {
      motion = (m === 'glide' || m === 'reel') ? m : 'track';
      deck.parentNode.classList.toggle('deck-glide', motion === 'glide');
      // re-snap cleanly when switching modes
      animateTo(index);
    }
  };

  // ---- wire events ----
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKey);
  window.addEventListener('touchstart', onTS, { passive: true });
  window.addEventListener('touchmove', onTM, { passive: false });
  window.addEventListener('touchend', onTE, { passive: true });
  if (btnPrev) btnPrev.addEventListener('click', prev);
  if (btnNext) btnNext.addEventListener('click', next);
  ticks.forEach(function (t, k) { t.addEventListener('click', function () { goTo(k); }); });
  // brand "back to works" — standalone, so just return to the cover
  var bk = document.getElementById('hud-back');
  if (bk) bk.addEventListener('click', function () { goTo(0); });

  window.addEventListener('resize', function () { paint(pos); });

  // init
  animateTo(0);
})();
