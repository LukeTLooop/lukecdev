"use client";

import Image from "next/image";
import { useState } from "react";
import type { System } from "@/lib/content";

/** Shows a thumbnail first and only loads the YouTube player once someone presses play. */
export default function SystemCard({ system }: { system: System }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-surface">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${system.id}?autoplay=1&rel=0&modestbranding=1`}
            title={system.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 cursor-pointer focus-visible:rounded-xl"
          >
            <span className="sr-only">Play {system.title} video</span>
            <Image
              src={`https://i.ytimg.com/vi/${system.id}/maxresdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 768px) 46vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 grid size-12 place-items-center rounded-full bg-brand-strong text-white shadow-[0_0_0_6px_rgba(13,10,28,0.55)] transition-colors group-hover:bg-brand-hover"
            >
              <svg viewBox="0 0 16 16" className="ml-0.5 size-4 fill-current">
                <path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" />
              </svg>
            </span>
          </button>
        )}
        <ul className="pointer-events-none absolute right-3 top-3 flex flex-wrap justify-end gap-1.5">
          {system.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-void/80 px-2 py-0.5 text-xs font-medium text-star backdrop-blur-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.01em]">{system.title}</h3>
      <p className="mt-2 max-w-[58ch] text-dust">{system.summary}</p>
    </article>
  );
}
