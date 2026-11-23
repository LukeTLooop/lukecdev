/**
 * Lukeyy wordmark: an animated vector version of the black hole mark beside the name.
 * Drawn in the original PNG's 512px coordinate space (cropped by the viewBox).
 * Light orbits the accretion disk, passing behind the hole and back in front;
 * the photon ring breathes and the sparkles twinkle. Static under reduced motion.
 */

// Disk geometry, in the disk's own (unrotated) frame
const C = { x: 258, y: 253 };
const RX = 205;
const RY = 68;
const TILT = -13.5;
const L = C.x - RX;
const R = C.x + RX;
// From the left tip under the hole to the right tip, and back over the top
const front = `M${L} ${C.y} A${RX} ${RY} 0 0 0 ${R} ${C.y}`;
const back = `M${R} ${C.y} A${RX} ${RY} 0 0 0 ${L} ${C.y}`;

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-[-0.02em]">
      <svg viewBox="30 80 452 326" aria-hidden="true" className="bh h-8 w-auto overflow-visible">
        <defs>
          <linearGradient id="bh-disk" gradientUnits="userSpaceOnUse" x1={L} y1={C.y} x2={R} y2={C.y}>
            <stop offset="0" stopColor="#7c5cff" />
            <stop offset="0.38" stopColor="#b86cf6" />
            <stop offset="0.68" stopColor="#f08bdc" />
            <stop offset="1" stopColor="#5ee7f7" />
          </linearGradient>
          <linearGradient id="bh-halo" gradientUnits="userSpaceOnUse" x1="178" y1="150" x2="402" y2="150">
            <stop offset="0" stopColor="#c07bff" />
            <stop offset="0.5" stopColor="#f0a6e8" />
            <stop offset="1" stopColor="#c9c3f5" />
          </linearGradient>
          <radialGradient id="bh-void" cx="0.42" cy="0.38" r="0.7">
            <stop offset="0" stopColor="#1b1533" />
            <stop offset="1" stopColor="#040309" />
          </radialGradient>
        </defs>

        {/* Soft glow behind everything */}
        <circle cx="258" cy="250" r="148" fill="#b9a6ff" opacity="0.13" />

        {/* Lensed arc above the hole */}
        <path
          className="bh-halo"
          d="M178 158 A138 138 0 0 1 402 146"
          fill="none"
          stroke="url(#bh-halo)"
          strokeWidth="13"
          strokeLinecap="round"
        />

        <g transform={`rotate(${TILT} ${C.x} ${C.y})`}>
          {/* Far side of the disk, behind the hole */}
          <ellipse cx={C.x} cy={C.y} rx={RX} ry={RY} fill="none" stroke="url(#bh-disk)" strokeWidth="44" opacity="0.14" />
          <path d={back} fill="none" stroke="url(#bh-disk)" strokeWidth="24" strokeLinecap="round" opacity="0.5" />
          <path className="bh-orbit bh-orbit-back" d={back} pathLength={100} fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
        </g>

        {/* Shockwave that rings out from the hole on hover */}
        <circle className="bh-ripple" cx="262" cy="248" r="114" fill="none" stroke="#c4a8ff" strokeWidth="10" />

        {/* The hole and its photon ring */}
        <circle className="bh-ring" cx="262" cy="248" r="124" fill="#7b4cf2" opacity="0.3" />
        <circle cx="262" cy="248" r="114" fill="#5a26cf" />
        <circle cx="262" cy="248" r="102" fill="url(#bh-void)" />

        <g transform={`rotate(${TILT} ${C.x} ${C.y})`}>
          {/* Near side of the disk, in front of the hole */}
          <path d={front} fill="none" stroke="url(#bh-disk)" strokeWidth="26" strokeLinecap="round" />
          <path
            d={`M${L + 18} ${C.y + 6} A${RX - 16} ${RY - 12} 0 0 0 ${R - 22} ${C.y + 2}`}
            fill="none"
            stroke="#fbd3ff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path className="bh-orbit" d={front} pathLength={100} fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
        </g>

        {/* Sparkles */}
        <circle className="bh-spark" cx="112" cy="148" r="6" fill="#c9b8ff" />
        <circle className="bh-spark bh-spark-2" cx="423" cy="135" r="8" fill="#7ff0ff" />
        <circle className="bh-spark bh-spark-3" cx="420" cy="355" r="6" fill="#f4a6f0" />
      </svg>
      <span className="bh-word">Lukeyy</span>
    </span>
  );
}
