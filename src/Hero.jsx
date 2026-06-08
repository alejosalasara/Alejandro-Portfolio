/* Hero.jsx — full-bleed photo band (SpaceX) carrying the name lockup.
   Striped graded placeholder (no scrim), line-art globe floating over it, an
   announcement banner, and a single outline CTA. Sits under the overlay nav. */

function Hero({ onNav }) {
  const t = window.useT();
  return (
    <header className="hero-band" id="home">
      <div className="photo-slot" data-label="◇ full-bleed portrait — graded dark, no scrim"></div>
      <div className="hero-art" aria-hidden="true">
        <GlobeArt size={620} />
      </div>

      <div className="hero-inner container">
        <button className="announce" onClick={() => onNav && onNav('works')}
          style={{ cursor: 'pointer' }}>
          <span className="tag">{t('hero.tag')}</span>
          <span className="txt">{t('hero.announce')}</span>
          <span className="arr"><Icon name="arrow-right" size={15} /></span>
        </button>

        <span className="tech-eyebrow" style={{ marginTop: 26 }}><span className="idx">01</span> {t('hero.eyebrow')}</span>

        <h1 style={{ margin: '18px 0 0', fontSize: 104, fontWeight: 900, lineHeight: 0.86, letterSpacing: '-2px', textTransform: 'uppercase' }}>
          {t('hero.t1')}<br />{t('hero.t2')} <span style={{ color: 'var(--accent-red)' }}>{t('hero.t3')}</span>
        </h1>

        <div className="hero-cta-row">
          <button className="btn btn-outline" onClick={() => onNav && onNav('works')}>
            {t('hero.cta')} <Icon name="arrow-right" size={16} />
          </button>
          <span className="scroll-note">{t('hero.scroll')}</span>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Hero });
