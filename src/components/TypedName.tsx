"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Types the name out once on load. A hidden copy of the full word reserves the
 * space so nothing below shifts while it types. Screen readers get the full
 * heading text straight away.
 */
export default function TypedName({ text, label }: { text: string; label: string }) {
  const reduce = useReducedMotion(false);
  const [typed, setTyped] = useState(0);
  const count = reduce ? text.length : typed;

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setTyped(i);
      // Slightly uneven rhythm so it reads as typed, not animated
      if (i < text.length) timer = setTimeout(step, 110 + Math.random() * 90);
    };
    timer = setTimeout(step, 450);
    return () => clearTimeout(timer);
  }, [text, reduce]);

  return (
    <h1 className="font-display text-[clamp(3.25rem,min(15.5vw,22svh),13.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="relative inline-grid">
        <span className="invisible col-start-1 row-start-1">
          {text}
          <span className="ml-[0.06em] inline-block w-[0.12em]" />
        </span>
        <span className="col-start-1 row-start-1 whitespace-nowrap">
          {text.slice(0, count)}
          <span className="caret ml-[0.06em] inline-block h-[0.78em] w-[0.12em] translate-y-[0.06em] bg-flare align-baseline" />
        </span>
      </span>
    </h1>
  );
}
