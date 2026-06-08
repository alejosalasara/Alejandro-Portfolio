/* Nav.jsx — SpaceX-style overlay nav. Transparent + light over the hero photo,
   then a blurred translucent bar on scroll (theme-aware). The eye toggles
   light/dark; the hamburger opens the language menu (EN/ES). All copy is
   translated via useT(). */

function useTheme() {
  const [theme, setTheme] = React.useState(() => document.documentElement.getAttribute('data-theme') || 'dark');
  const toggle = React.useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
      else document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('salazar-theme', next); } catch (e) {}
      return next;
    });
  }, []);
  return [theme, toggle];
}

/* Inline copy of the LanguageMenu (shares .lang-menu CSS with the DS component) */
function NavLangMenu({ value, onChange }) {
  const t = window.useT();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const langs = [{ code: 'en', label: t('lang.en') }, { code: 'es', label: t('lang.es') }];
  return (
    <div className="lang-menu" ref={ref}>
      <button className={'lang-trigger' + (open ? ' open' : '')} onClick={() => setOpen((v) => !v)}
        aria-haspopup="true" aria-expanded={open} aria-label="Language">
        <span className="hb" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="lang-cur">{value.toUpperCase()}</span>
      </button>
      {open ? (
        <div className="lang-pop" role="menu">
          <div className="lang-pop-head">{t('lang.head')}</div>
          {langs.map((l) => (
            <button key={l.code} role="menuitemradio" aria-checked={value === l.code}
              className={'lang-opt' + (value === l.code ? ' on' : '')}
              onClick={() => { onChange && onChange(l.code); setOpen(false); }}>
              <span className="lang-code">{l.code.toUpperCase()}</span>
              <span className="lang-label">{l.label}</span>
              {value === l.code ? <span className="lang-chk"><Icon name="check" size={15} /></span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Nav({ onNav, lang, setLang, theme, toggleTheme }) {
  const t = window.useT();
  const [solid, setSolid] = React.useState(false);
  const [active, setActive] = React.useState(null);
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: with the sticky card-stack, sections don't scroll out of view —
  // a covered card is still "intersecting", so IntersectionObserver can't tell
  // which one is on top. Instead, walk the cards in DOM order and mark the last
  // one whose top has risen past the viewport midline as active.
  React.useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const els = document.querySelectorAll('[data-nav]');
      const mid = (window.innerHeight || 800) * 0.5;
      let cur = null;
      els.forEach((el) => { if (el.getBoundingClientRect().top <= mid) cur = el.getAttribute('data-nav'); });
      setActive(cur);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(compute); } };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const items = ['about', 'works', 'contact'];
  const baseStyle = { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', gap: 40 };

  return (
    <nav className={'snav' + (solid ? ' is-solid' : '')} style={baseStyle}>
      <div className="brand-wrap">
        <button className="theme-eye" onClick={toggleTheme} title={t('theme.toggle')} aria-label={t('theme.toggle')}>
          <Icon name={theme === 'light' ? 'eye-off' : 'eye'} size={18} />
        </button>
        <button className="brand" onClick={() => { window.salGoTo && window.salGoTo('home'); onNav && onNav('home'); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          salazar<b>.</b>
        </button>
      </div>
      <div className="snav-links">
        {items.map((it) => (
          <a key={it} href={'#' + it} className={active === it ? 'is-active' : ''}
            onClick={(e) => { e.preventDefault(); window.salGoTo && window.salGoTo(it); onNav && onNav(it); }}>{t('nav.' + it)}</a>
        ))}
      </div>
      <div className="snav-right">
        <button className="snav-cta" onClick={() => { window.salGoTo && window.salGoTo('contact'); onNav && onNav('contact'); }}>
          {t('nav.cta')} <Icon name="arrow-up-right" size={15} />
        </button>
        <NavLangMenu value={lang} onChange={setLang} />
      </div>
    </nav>
  );
}

Object.assign(window, { Nav, NavLangMenu, useTheme });
