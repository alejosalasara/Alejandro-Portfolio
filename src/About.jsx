/* About.jsx — "who am i" lockup + red chevrons + lead + buttons, then the
   decorative line-art band (node / warped mesh / three circles). */

const TOOLS = ['Adobe Suite', 'Figma', 'Klaviyo', 'Optimizely', 'Claude', 'Google Analytics'];

function RedChevrons({ count = 6 }) {
  return (
    <span className="red-chevrons" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => <Icon key={i} name="chevron-right" size={26} strokeWidth={2.5} />)}
    </span>
  );
}

function About({ onNav }) {
  const t = window.useT();
  return (
    <section className="container about-stage" id="about" style={{ scrollMarginTop: 90 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <h2 style={{ margin: 0, fontSize: 92, fontWeight: 900, lineHeight: 0.82, letterSpacing: '-2px', textAlign: 'right' }}>
          {t('about.who')}<br />
          <span className="outline-type" style={{ WebkitTextStrokeWidth: '2px' }}>{t('about.am')}&nbsp;</span>
          <span style={{ color: 'var(--accent-red)' }}>{t('about.i')}</span>
        </h2>
        <div>
          <RedChevrons />
          <p className="body" style={{ color: 'var(--ink-muted)', maxWidth: 360, marginTop: 18, marginBottom: 28 }}>
            {t('about.body')}
          </p>
          <div style={{ display: 'flex', gap: 0 }}>
            <button className="btn btn-outline" style={{ borderRight: 'none' }} onClick={() => onNav && onNav('contact')}>{t('about.plan')}</button>
            <button className="btn btn-primary" onClick={() => onNav && onNav('contact')}>{t('about.hit')} <Icon name="sun" size={16} /></button>
          </div>
        </div>
      </div>
      <div className="about-tools">
        <span className="about-tools-label">Stack —</span>
        {TOOLS.map(tool => (
          <span key={tool} className="about-tools-chip">{tool}</span>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { About, RedChevrons });
