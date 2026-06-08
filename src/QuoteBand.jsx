/* QuoteBand.jsx — CONDENSED red band placed just below the hero. Quote on the
   left, wireframe coil motif on the right. Auto-advances every 4s and can be
   dragged left/right to change. */

const QUOTES = [
  { qKey: 'quote.0.q', byKey: 'quote.0.by' },
  { qKey: 'quote.1.q', byKey: 'quote.1.by' },
  { qKey: 'quote.2.q', byKey: 'quote.2.by' },
];

function QuoteBand() {
  const t = window.useT();
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const startX = React.useRef(null);
  const cur = QUOTES[i];
  const next = () => setI((p) => (p + 1) % QUOTES.length);
  const prev = () => setI((p) => (p - 1 + QUOTES.length) % QUOTES.length);

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused]);

  const onDown = (e) => { startX.current = e.clientX; setPaused(true); };
  const onUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    startX.current = null;
    setPaused(false);
  };
  const onLeave = () => { if (startX.current != null) { startX.current = null; } setPaused(false); };

  return (
    <section className="qband" id="quote"
      onPointerDown={onDown} onPointerUp={onUp} onPointerLeave={onLeave}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container qband-inner">
        <div className="q-left">
          <p className="q-text">“{t(cur.qKey)}”</p>
          <div className="q-by">{t(cur.byKey)}</div>
        </div>
        <div className="q-art" aria-hidden="true">
          <CoilArt w={260} h={120} stroke="#fff" />
        </div>
      </div>
      {/* dots pinned to the band, independent of quote height */}
      <div className="container q-dots-rail">
        <div className="q-dots">
          {QUOTES.map((_, n) => (
            <button key={n} className={'d' + (n === i ? ' on' : '')} aria-label={'quote ' + (n + 1)}
              onPointerDown={(e) => e.stopPropagation()} onClick={() => setI(n)}></button>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { QuoteBand });
