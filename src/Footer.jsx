/* Footer.jsx — full-bleed divided bar (matches the nav language): social cells
   and the GO UP button are full-height cells of the footer container, split by
   hairlines. Availability + live time sit centered in the middle. */

function FooterSocial({ label, onSelect, children }) {
  return (
    <button onClick={onSelect} className="foot-cell"
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        alignSelf: 'stretch', width: 130, padding: '0 12px',
        background: 'none', border: 'none', borderRight: '1px solid var(--hairline)',
        color: 'var(--ink)', cursor: 'pointer', transition: 'background .15s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-1)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}>
      <span style={{ fontSize: 18, fontWeight: 800 }}>{children}</span>
      <span className="caption" style={{ color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: 2 }}>{label}</span>
    </button>
  );
}

function Footer() {
  const t = window.useT();
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase());
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="site-footer" style={{ borderTop: '1px solid var(--hairline)', display: 'flex', alignItems: 'stretch', minHeight: 116 }}>
      {/* left — social full-height cells */}
      <div className="foot-social" style={{ display: 'flex', alignItems: 'stretch', borderLeft: '1px solid var(--hairline)' }}>
        <FooterSocial label="behance"><b>Be</b></FooterSocial>
        <FooterSocial label="linkedin"><b>in</b></FooterSocial>
        <FooterSocial label="instagram"><Icon name="sun" size={20} /></FooterSocial>
      </div>

      {/* center — availability + live time */}
      <div className="foot-center" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 24px', gap: 6 }}>
        <div className="caption" style={{ color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 2 }}>{t('footer.time')} {time}</div>
        <div className="caption" style={{ color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: 2 }}>{t('footer.available')}</div>
      </div>

      {/* right — GO UP full-height cell */}
      <button className="btn btn-primary foot-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ alignSelf: 'stretch', borderRadius: 0, padding: '0 40px', fontSize: 15 }}>
        {t('footer.up')} <Icon name="arrow-up" size={18} />
      </button>
    </footer>
  );
}

Object.assign(window, { Footer, FooterSocial });
