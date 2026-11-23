"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Full-width background clip. Purely decorative: muted, looping, no controls.
 * The poster image sits underneath, so it shows while the video loads, if the
 * file is missing, and for visitors who prefer reduced motion (no autoplay).
 * Playback pauses whenever the band scrolls out of view.
 */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover" />
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload={reduce ? "none" : "auto"}
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
