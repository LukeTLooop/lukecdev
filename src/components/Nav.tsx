"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { label: "Systems", id: "systems" },
  { label: "Process", id: "process" },
  { label: "About", id: "about" },
];

/** Sticky nav that marks the section currently in the middle of the screen. */
export default function Nav({ wrap }: { wrap: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = [...links.map((l) => l.id), "hire"];
    const sections = ids
      .map((id) => document.querySelector<HTMLElement>(`section[aria-labelledby="${id}"]`))
      .filter((s): s is HTMLElement => s !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.getAttribute("aria-labelledby");
          setActive((prev) => (e.isIntersecting ? id : prev === id ? null : prev));
        }
      },
      // A thin line across the middle of the viewport decides which section is "current"
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-void/75 backdrop-blur-md">
      <nav aria-label="Main" className={`${wrap} flex h-16 items-center justify-between`}>
        <a href="#top" className="logo-link rounded-md">
          <Logo />
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(({ label, id }) => {
              const current = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={current ? "location" : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-md px-3 transition-colors hover:text-star ${
                      current ? "text-star" : "text-dust"
                    }`}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ${
                        current ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="#hire"
            aria-current={active === "hire" ? "location" : undefined}
            className="ml-2 inline-flex min-h-11 items-center rounded-full bg-brand-strong px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Hire me
          </a>
        </div>
      </nav>
      {/* Reading progress (scroll-driven; hidden where unsupported) */}
      <div aria-hidden="true" className="sd-only absolute inset-x-0 -bottom-px h-0.5">
        <div className="sd-progress h-full w-full bg-gradient-to-r from-brand-strong to-brand" />
      </div>
    </header>
  );
}
