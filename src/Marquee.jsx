/* Marquee.jsx — full-width auto-scroll band, red hourglass separators. */

function Marquee() {
  const t = window.useT();
  const seg = [t('mq.1'), '⧗', t('mq.2'), '⧗'];
  const run = [...seg, ...seg, ...seg, ...seg];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {run.map((s, n) => (
          s === '⧗'
            ? <span key={n} className="m sep">⧗</span>
            : <span key={n} className="m">{s}</span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Marquee });
