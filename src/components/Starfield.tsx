"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number };

/** Fixed starfield behind the page. A few stars twinkle; all motion stops under reduced-motion. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stars: Star[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 5200);
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.06;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: big ? 1 + Math.random() * 0.8 : 0.3 + Math.random() * 0.6,
          a: 0.25 + Math.random() * 0.6,
          tw: Math.random() < 0.18 ? 0.4 + Math.random() * 1.2 : 0,
          ph: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const flicker = s.tw && !reduce.matches ? 0.55 + 0.45 * Math.sin(t / 1000 * s.tw + s.ph) : 1;
        ctx.globalAlpha = s.a * flicker;
        ctx.fillStyle = s.r > 1 ? "#e9dcff" : "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches || document.hidden) draw(0);
      else raf = requestAnimationFrame(loop);
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
    document.addEventListener("visibilitychange", start);
    reduce.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
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
