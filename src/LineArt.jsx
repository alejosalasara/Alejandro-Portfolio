/* LineArt.jsx — real wireframe motifs from the brand SVG library (assets/lineart/r/,
   recolored white/red). Small glyphs (node, three-circles, eye) stay as inline SVG. */

const ART = 'assets/lineart/r/';

function Art({ name, w, h, style, className }) {
  return <img src={ART + name + '.svg'} alt="" aria-hidden="true" className={className}
    style={{ width: w, height: h, objectFit: 'contain', display: 'block', ...style }} />;
}

/* Hero sphere — layered red outer + white inner globe (matches the source frame).
   Outer ring spins slowly, inner globe counter-rotates and breathes. */
function GlobeArt({ size = 360 }) {
  return (
    <div className="globe-art" style={{ position: 'relative', width: size, height: size }}>
      <Art name="globe-red" className="globe-outer" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <Art name="globe-white" className="art-themed globe-inner" style={{ position: 'absolute', left: '19%', top: '19%', width: '62%', height: '62%', opacity: 0.92 }} />
    </div>
  );
}

/* Warped perspective grid mesh. */
function MeshArt({ w = 240, h = 170 }) {
  return <Art name="mesh-white" w={w} h={h} className="art-themed" />;
}

/* Horizontal 3D spring/coil — white motif on the red quote band. */
function CoilArt({ w = 420, h = 160 }) {
  return <Art name="coil-white" w={w} h={h} />;
}

/* Small node — red filled dot with a diagonal line crossing it. */
function NodeArt({ size = 90 }) {
  const s = size, c = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <line x1={c - s * 0.42} y1={c + s * 0.42} x2={c + s * 0.42} y2={c - s * 0.42} stroke="var(--line-red)" strokeWidth="1.2" />
      <circle cx={c} cy={c} r={s * 0.18} fill="var(--line-red)" />
    </svg>
  );
}

/* Three overlapping outline circles. */
function ThreeCircles({ size = 90 }) {
  const s = size, r = s * 0.26;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" stroke="var(--line-red)" strokeWidth="1.2">
      <circle cx={s * 0.42} cy={s * 0.38} r={r} />
      <circle cx={s * 0.6} cy={s * 0.38} r={r} />
      <circle cx={s * 0.51} cy={s * 0.6} r={r} />
    </svg>
  );
}

/* Small eye/lens oval motif (above the testimonial). */
function EyeMotif({ size = 60 }) {
  const s = size, c = s / 2;
  return (
    <svg width={s} height={s * 0.6} viewBox={`0 0 ${s} ${s * 0.6}`} fill="none" stroke="var(--line-red)" strokeWidth="1.1">
      <ellipse cx={c} cy={s * 0.3} rx={s * 0.42} ry={s * 0.22} />
      <ellipse cx={c} cy={s * 0.3} rx={s * 0.16} ry={s * 0.22} />
    </svg>
  );
}

Object.assign(window, { Art, GlobeArt, MeshArt, CoilArt, NodeArt, ThreeCircles, EyeMotif });
