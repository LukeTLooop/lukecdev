"use client";

import { useEffect, useState } from "react";

/**
 * Floating back-to-top button, bottom right. It fades in once the visitor is
 * most of a screen down the page, and its ring fills with reading progress
 * (in browsers with scroll-driven animations). While hidden it uses
 * visibility: hidden, so it's also out of the tab order and the accessibility tree.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // React skips the re-render when the value hasn't changed, so this is cheap per event
    const check = () => setShown(window.scrollY > window.innerHeight * 0.75);
    // First check runs after mount (covers a page restored mid-scroll on refresh)
    const first = setTimeout(check, 0);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(first);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`group fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full border border-line bg-surface/80 text-star shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition-[opacity,translate,visibility,border-color,background-color] duration-300 hover:border-brand hover:bg-surface sm:bottom-8 sm:right-8 ${
        shown ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
    >
      {/* Progress ring */}
      <svg aria-hidden="true" viewBox="0 0 52 52" className="absolute inset-0 size-full -rotate-90">
        <circle
          className="sd-ring"
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset="100"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path
          d="M8 13V3.5M4 7l4-4 4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
