/** Lukeyy wordmark: a ringed planet beside the name. */
export function PlanetMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <g transform="rotate(-22 12 12)">
        <ellipse cx="12" cy="12" rx="11" ry="3.6" fill="none" stroke="var(--dust)" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="6.2" fill="var(--brand)" />
        <path d="M1 12a11 3.6 0 0 0 22 0" fill="none" stroke="var(--star)" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-[-0.02em]">
      <PlanetMark className="size-7" />
      Lukeyy
    </span>
  );
}
