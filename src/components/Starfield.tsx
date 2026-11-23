"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, animated starfield behind the page.
 * - Three depth layers drift slowly and parallax against the scroll position.
 * - Scroll speed stretches stars into warp streaks (nearer layers stretch more).
 * - A light pointer parallax on devices with a fine pointer.
 * Under prefers-reduced-motion it draws one static frame and listens to nothing.
 */

type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; layer: number };

const LAYERS = [
  { depth: 0.08, drift: 3, share: 0.55 }, // far: barely moves
  { depth: 0.22, drift: 7, share: 0.32 },
  { depth: 0.45, drift: 14, share: 0.13 }, // near: biggest, fastest, longest streaks
];

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let driftT = 0;
    let lastScroll = window.scrollY;
    let velocity = 0; // px per second, smoothed
    let px = 0; // pointer offset, -1..1
    let py = 0;
    let tpx = 0;
    let tpy = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const sameWidth = w === window.innerWidth && stars.length > 0;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mobile address bars resize the height while scrolling: keep the stars put
      if (sameWidth) return;
      const total = Math.round((w * h) / 4600);
      stars = [];
      LAYERS.forEach((layer, li) => {
        const n = Math.round(total * layer.share);
        for (let i = 0; i < n; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: li === 2 ? 0.9 + Math.random() * 0.9 : li === 1 ? 0.5 + Math.random() * 0.5 : 0.25 + Math.random() * 0.45,
            a: li === 0 ? 0.2 + Math.random() * 0.4 : 0.35 + Math.random() * 0.55,
            tw: Math.random() < 0.2 ? 0.4 + Math.random() * 1.2 : 0,
            ph: Math.random() * Math.PI * 2,
            layer: li,
          });
        }
      });
    };

    const draw = (t: number, still: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = still ? 0 : window.scrollY;
      ctx.lineCap = "round";
      for (const s of stars) {
        const L = LAYERS[s.layer];
        const offX = still ? 0 : px * 12 * L.depth * 4;
        const offY = still ? 0 : py * 12 * L.depth * 4;
        const x = mod(s.x + offX - driftT * L.drift * 0.35, w);
        const y = mod(s.y + offY - scroll * L.depth - driftT * L.drift, h);
        const flicker = s.tw && !still ? 0.55 + 0.45 * Math.sin((t / 1000) * s.tw + s.ph) : 1;
        const streak = still ? 0 : Math.max(-70, Math.min(70, velocity * L.depth * 0.035));

        ctx.globalAlpha = s.a * flicker;
        const color = s.layer === 2 ? "#e9dcff" : "#ffffff";
        if (Math.abs(streak) > 1.2) {
          // Warp streak trails opposite to the travel direction
          ctx.strokeStyle = color;
          ctx.lineWidth = s.r * 1.6;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + streak);
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const frame = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0.016;
      last = t;
      driftT += dt;

      const y = window.scrollY;
      let instant = (y - lastScroll) / Math.max(dt, 0.001);
      lastScroll = y;
      // An instant jump (refresh restore, Home/End) is a teleport, not travel
      if (Math.abs(instant) > 15000) instant = 0;
      // Rise quickly, settle within about half a second
      velocity += (instant - velocity) * (Math.abs(instant) > Math.abs(velocity) ? 0.3 : 0.14);
      if (Math.abs(velocity) < 2) velocity = 0;

      px += (tpx - px) * 0.05;
      py += (tpy - py) * 0.05;

      draw(t, false);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
      lastScroll = window.scrollY;
      velocity = 0;
      if (reduce.matches) draw(0, true);
      else if (!document.hidden) raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      if (!finePointer.matches || reduce.matches) return;
      tpx = e.clientX / w - 0.5;
      tpy = e.clientY / h - 0.5;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        seed();
        start();
      }, 150);
    };

    seed();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", start);
    reduce.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", start);
      reduce.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
