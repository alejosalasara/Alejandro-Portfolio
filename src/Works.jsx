/* Works.jsx — selected-works list. On hover, the trailing arrow turns red +
   diagonal and a 1:1 image preview follows the cursor, showing that project's
   placeholder. Row also lifts to --surface-1 on hover. */

const WORKS = [
  { title: 'Metalform SAS', metaKey: 'works.0.meta', tagKey: 'works.0.tag', href: 'works/metalform.html', shutterIndex: 1, shutterTotal: 5 },
  { title: 'La Fábrica', metaKey: 'works.1.meta', tagKey: 'works.1.tag', href: 'works/la-fabrica.html', shutterIndex: 2, shutterTotal: 5 },
  { title: 'IMFIT', metaKey: 'works.2.meta', tagKey: 'works.2.tag', href: 'works/imfit.html', shutterIndex: 3, shutterTotal: 5 },
  { title: 'Noble', metaKey: 'works.3.meta', tagKey: 'works.3.tag', href: 'works/noble.html', shutterIndex: 4, shutterTotal: 5 },
  { title: 'Email Marketing', metaKey: 'works.4.meta', tagKey: 'works.4.tag', tall: true },
];

function Works({ onNav }) {
  const t = window.useT();
  const [hover, setHover] = React.useState(null);
  const previewRef = React.useRef(null);
  const target = React.useRef({ x: 0, y: 0 });
  const cur = React.useRef({ x: 0, y: 0 });
  const raf = React.useRef(0);
  const seeded = React.useRef(false);

  // Ease the preview toward the cursor (no teleport, no per-row remount flicker).
  React.useEffect(() => {
    const tick = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.22;
      cur.current.y += (target.current.y - cur.current.y) * 0.22;
      const el = previewRef.current;
      if (el) { el.style.left = cur.current.x + 'px'; el.style.top = cur.current.y + 'px'; }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const onMove = (e) => {
    target.current = { x: e.clientX, y: e.clientY };
    // On the first move after showing, snap so it doesn't slide in from a corner.
    if (!seeded.current) { cur.current = { x: e.clientX, y: e.clientY }; seeded.current = true; }
  };

  const active = hover != null ? WORKS[hover] : null;
  const pvIdx = hover ?? 0;

  return (
    <section className="works-stage" id="works" style={{ scrollMarginTop: 90 }}
      onMouseMove={onMove}>
      <div className="container">
        <div className="kit-label" style={{ marginBottom: 40 }}>
          {t('works.label')}
          <span className="hatch" style={{ marginLeft: 8 }}>
            {Array.from({ length: 11 }).map((_, i) => <i key={i}></i>)}
          </span>
        </div>
        <div onMouseLeave={() => { setHover(null); seeded.current = false; }}>
          {WORKS.map((w, idx) => (
            <div className={'works-row' + (w.tall ? ' works-row--stat' : '')} key={w.title}
              onMouseEnter={() => setHover(idx)}
              onClick={() => {
                if (w.href && window.__shutter) {
                  try { sessionStorage.setItem('salazar:returnTarget', 'works'); } catch (e) {}
                  window.__shutter.navigate(w.href, { name: w.title, index: w.shutterIndex, total: w.shutterTotal });
                } else {
                  onNav && onNav('projects');
                }
              }}>
              <span className="w-title">{w.title}</span>
              {w.tall && <span className="w-count">100+ clients</span>}
              <span className="w-meta">{t(w.metaKey)}</span>
              <span className="w-arrow"><Icon name={'arrow-right'} size={28} /></span>
            </div>
          ))}
        </div>
      </div>

      {/* single persistent cursor-following 1:1 preview — portalled to <body>
          so no transformed/will-change ancestor can become its containing block */}
      {ReactDOM.createPortal(
        <div ref={previewRef} className={'work-preview' + (active ? ' is-on' : '') + (WORKS[pvIdx].tall ? ' is-tall' : '')} aria-hidden="true">
          <div className={'pv-img pv-' + (pvIdx % 4)}></div>
          <div className="pv-meta">
            <span className="pv-idx">{String(pvIdx + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}</span>
            <span className="pv-title">{(active || WORKS[0]).title}</span>
            <span className="pv-tag">{t((active || WORKS[0]).tagKey)}</span>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

Object.assign(window, { Works });
