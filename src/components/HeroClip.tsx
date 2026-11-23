"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const embed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`;

/**
 * Muted looping gameplay clip. Autoplays unless the visitor prefers reduced
 * motion, in which case it waits for a click. A pause control is always offered.
 */
export default function HeroClip({ id, title }: { id: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  // Prerender assumes reduced motion so the player only loads once the browser confirms it's wanted.
  const reduce = useReducedMotion(true);
  const [choice, setChoice] = useState<"play" | "pause" | null>(null);
  const playing = choice ? choice === "play" : !reduce;
  const loaded = choice !== null || !reduce;

  const command = (func: "playVideo" | "pauseVideo") =>
    frame.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );

  const toggle = () => {
    if (loaded) command(playing ? "pauseVideo" : "playVideo");
    setChoice(playing ? "pause" : "play");
  };

  return (
    <figure className="relative">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface">
        <Image
          src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
        {loaded && (
          <iframe
            ref={frame}
            src={embed(id)}
            title={`${title} (muted gameplay clip)`}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02]"
          />
        )}
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-dust">
        <span>{title}, recorded in Roblox Studio</span>
        <button
          type="button"
          onClick={toggle}
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-line px-4 text-star transition-colors hover:border-brand hover:text-brand"
        >
          {playing ? (
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
              <path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" />
            </svg>
          )}
          {playing ? "Pause clip" : "Play clip"}
        </button>
      </figcaption>
    </figure>
  );
}
