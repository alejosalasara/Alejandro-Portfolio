const CASE_NAMES = ['metalform', 'imfit', 'noble'];

function Hero({ onNav }) {
  const t = window.useT();
  const langCtx = React.useContext(window.LangCtx);
  const lang = langCtx ? langCtx.lang : 'en';
  const [caseIdx, setCaseIdx] = React.useState(0);
  const h1Ref = React.useRef(null);
  const caseRef = React.useRef(null);

  /* cycle the case name every 2.5s */
  React.useEffect(function () {
    var id = setInterval(function () {
      setCaseIdx(function (i) { return (i + 1) % CASE_NAMES.length; });
    }, 2500);
    return function () { clearInterval(id); };
  }, []);

  /* lock the case-name span to the widest name so the pill never reflows */
  React.useEffect(function () {
    var el = caseRef.current;
    if (!el) return;
    var saved = el.textContent;
    var maxW = 0;
    CASE_NAMES.forEach(function (name) {
      el.textContent = name;
      maxW = Math.max(maxW, el.getBoundingClientRect().width);
    });
    el.textContent = saved;
    if (maxW > 0) el.style.width = Math.ceil(maxW) + 'px';
  }, []);

  /* fit each .h-word font-size so every word is exactly as wide as the container */
  React.useEffect(function () {
    function fit() {
      var h1 = h1Ref.current;
      if (!h1) return;
      if (window.innerWidth > 768) {
        h1.querySelectorAll('.h-word').forEach(function (w) { w.style.fontSize = ''; });
        return;
      }
      var cw = h1.offsetWidth;
      if (!cw) return;
      h1.querySelectorAll('.h-word').forEach(function (w) {
        w.style.fontSize = '';               // clear any previous fit
        w.style.display = 'inline-block';    // shrink to intrinsic text width
        var base = parseFloat(getComputedStyle(w).fontSize);
        var natW = w.getBoundingClientRect().width;
        w.style.display = '';                // restore (CSS block rule re-applies)
        if (natW > 0 && base > 0) w.style.fontSize = (base * cw / natW).toFixed(1) + 'px';
      });
    }
    var run = function () { requestAnimationFrame(fit); };
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(run); } else { run(); }
    window.addEventListener('resize', fit);
    return function () { window.removeEventListener('resize', fit); };
  }, [lang]);

  return (
    <header className="hero-band" id="home">
      <div className="photo-slot" data-label="◇ full-bleed portrait — graded dark, no scrim"></div>
      <div className="hero-art" aria-hidden="true">
        <GlobeArt size={620} />
      </div>

      <div className="hero-inner container">
        <div className="announce">
          <span className="tag">{t('hero.tag')}</span>
          <span className="txt">case studies live — <span className="announce-case" ref={caseRef}>{CASE_NAMES[caseIdx]}</span></span>
          <span className="arr"><Icon name="arrow-right" size={15} /></span>
        </div>

        <span className="tech-eyebrow" style={{ marginTop: 26 }}>
          <span className="idx">01</span> {t('hero.eyebrow')}
        </span>

        <h1 ref={h1Ref} style={{ margin: '18px 0 0', fontSize: 104, fontWeight: 900, lineHeight: 0.86, letterSpacing: '-2px', textTransform: 'uppercase' }}>
          <span className="h-word">{t('hero.t1')}</span>
          <br className="h-br" />
          <span className="h-word">{t('hero.t2')}</span>{' '}
          <span className="h-word" style={{ color: 'var(--accent-red)' }}>{t('hero.t3')}</span>
        </h1>

        <div className="hero-cta-row">
          <button className="btn btn-outline" onClick={() => { window.salGoTo && window.salGoTo('works'); }}>
            {t('hero.cta')} <Icon name="arrow-right" size={16} />
          </button>
          <span className="scroll-note">{t('hero.scroll')}</span>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Hero });
