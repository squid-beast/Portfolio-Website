"use client";
import { useEffect, useRef } from "react";

/* The scene behind the page. Scroll progress 0..1 drives it: the sun crosses and sets,
   the sky cuts through flat colours like a print, stars come out, the moon rises.
   No assets, no gradients, no loop: it only redraws on scroll and resize. */

type Stop = { at: number; sky: string; ground: string; fg: string; disc: string; night: boolean };

const STOPS: Stop[] = [
  { at: 0.0, sky: "#f3ecdd", ground: "#e3d8c0", fg: "#171411", disc: "#ff6a2a", night: false }, // morning
  { at: 0.16, sky: "#f4dcb9", ground: "#e2c297", fg: "#171411", disc: "#ff5a1f", night: false }, // afternoon
  { at: 0.3, sky: "#e8a56d", ground: "#c9804d", fg: "#1a1210", disc: "#ff3f0d", night: false }, // dusk
  { at: 0.44, sky: "#454a58", ground: "#30343f", fg: "#f1ebdd", disc: "#ede3cb", night: true }, // blue hour
  { at: 0.56, sky: "#0f1218", ground: "#090b10", fg: "#efe7d6", disc: "#ece2c8", night: true }, // night
  { at: 0.93, sky: "#1a2130", ground: "#10141d", fg: "#efe7d6", disc: "#e2d8bf", night: true }, // before dawn
];

const FADE = 0.035; // how much scroll a cut takes

function hex(c: string): [number, number, number] {
  return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
}
function mix(a: string, b: string, t: number): string {
  const A = hex(a);
  const B = hex(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * t));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}
function rgba(c: string, alpha: number): string {
  const [r, g, b] = hex(c);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => t * t * (3 - 2 * t);

function luminance(c: [number, number, number]): number {
  const f = (v: number) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
}
function contrast(a: [number, number, number], b: [number, number, number]): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function mixRgb(a: string, b: string, t: number): [number, number, number] {
  const A = hex(a);
  const B = hex(b);
  return [0, 1, 2].map((i) => Math.round(A[i] + (B[i] - A[i]) * t)) as [number, number, number];
}

function palette(p: number) {
  let i = 0;
  for (let k = 0; k < STOPS.length; k++) if (STOPS[k].at <= p) i = k;
  const cur = STOPS[i];
  const next = STOPS[Math.min(i + 1, STOPS.length - 1)];
  const t = i === 0 ? 1 : clamp01((p - cur.at) / FADE); // crossfade just after each cut
  const prev = STOPS[Math.max(i - 1, 0)];
  const from = t < 1 ? prev : cur;
  const m = ease(t);
  // While the sky crossfades, text does not: it snaps to whichever colour reads better on the mixed sky,
  // so the day-to-night cut never passes through a grey-on-grey moment.
  const skyRgb = mixRgb(from.sky, cur.sky, m);
  const fgHex = contrast(skyRgb, hex(cur.fg)) >= contrast(skyRgb, hex(from.fg)) ? cur.fg : from.fg;
  return {
    sky: mix(from.sky, cur.sky, m),
    ground: mix(from.ground, cur.ground, m),
    fg: fgHex,
    disc: mix(from.disc, cur.disc, m),
    fgHex,
    night: fgHex === cur.fg ? cur.night : from.night,
    nextAt: next.at,
  };
}

// Fixed star field, seeded so it never twinkles or moves.
function stars(n: number) {
  let s = 1234567;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: n }, () => ({ x: rnd(), y: rnd() * 0.72, r: 0.6 + rnd() * 1.1, a: 0.35 + rnd() * 0.65 }));
}
const STARS = stars(110);

export default function Sky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const root = document.documentElement;
    let raf = 0;
    let lastPhase = "";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const born = performance.now();
    const INTRO = 1600;

    const draw = () => {
      raf = 0;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const max = root.scrollHeight - H;
      const p = max > 0 ? clamp01(window.scrollY / max) : 0;
      const pal = palette(p);
      const small = W < 720;
      const horizon = H * 0.9;
      const r = small ? Math.min(W, H) * 0.11 : Math.min(Math.min(W, H) * 0.17, 210);

      // one flat sky; the horizon is a line, and everything below it masks what has set
      ctx.fillStyle = pal.sky;
      ctx.fillRect(0, 0, W, H);

      // stars, only at night
      const starAlpha = clamp01((p - 0.5) / 0.14) * (p > 0.93 ? 1 - clamp01((p - 0.93) / 0.07) * 0.7 : 1);
      if (starAlpha > 0) {
        ctx.fillStyle = "#efe7d6";
        const count = small ? 45 : STARS.length;
        for (let i = 0; i < count; i++) {
          const s = STARS[i];
          ctx.globalAlpha = s.a * starAlpha;
          ctx.beginPath();
          ctx.arc(s.x * W, s.y * horizon, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // the sun: rises on load, then crosses from top right and sets into the horizon by mid page
      const intro = reduced ? 1 : clamp01((performance.now() - born) / INTRO);
      const sunT = clamp01(p / 0.5);
      if (sunT < 1) {
        const x = W * (small ? 0.8 : 0.78) - W * 0.16 * sunT;
        const rest = H * 0.14 + (horizon + r * 1.1 - H * 0.14) * ease(sunT);
        const y = rest + (horizon + r * 1.1 - rest) * (1 - ease(intro));
        ctx.fillStyle = pal.disc;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        // the ground hides the part that has set
        ctx.fillStyle = pal.sky;
        ctx.fillRect(0, horizon, W, H - horizon);
      }

      // the moon: rises after the sun is gone and drifts up and right until dawn
      const moonT = clamp01((p - 0.5) / 0.5);
      if (moonT > 0) {
        const mr = r * 0.78;
        const x = W * (small ? 0.72 : 0.64) + W * 0.2 * moonT;
        const y = horizon + mr * 1.1 - (horizon + mr * 1.1 - H * 0.16) * ease(clamp01(moonT / 0.5));
        ctx.globalAlpha = small && pal.night ? 0.45 : 1;
        ctx.fillStyle = pal.disc;
        ctx.beginPath();
        ctx.arc(x, y, mr, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = pal.sky;
        ctx.fillRect(0, horizon, W, H - horizon);
      }

      // hand the palette to CSS so type, rules and buttons follow the sky
      root.style.setProperty("--sky", pal.sky);
      root.style.setProperty("--ground", pal.ground);
      root.style.setProperty("--fg", pal.fg);
      root.style.setProperty("--fg-2", rgba(pal.fgHex, 0.72));
      root.style.setProperty("--line", rgba(pal.fgHex, 0.18));
      root.style.setProperty("--disc", pal.disc);
      const phase = pal.night ? "night" : "day";
      if (phase !== lastPhase) {
        lastPhase = phase;
        root.dataset.phase = phase;
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const introLoop = () => {
      draw();
      if (performance.now() - born < INTRO + 50) raf = requestAnimationFrame(introLoop);
    };
    if (reduced) draw();
    else raf = requestAnimationFrame(introLoop);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
      for (const v of ["--sky", "--ground", "--fg", "--fg-2", "--line", "--disc"]) root.style.removeProperty(v);
      delete root.dataset.phase;
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 -z-10 h-dvh w-full" />;
}
