"use client";
import { createElement, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/* Text that decodes into place: every glyph cycles through noise and settles left to right.
   The real text is always in the DOM, sizes the box and keeps its accessible name: while
   decoding it turns transparent rather than hidden, and a single-line copy sits on top,
   clipped to the box, so it can never spill into what comes after. */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=";

type Props = {
  text: string;
  as?: "h1" | "h2" | "span" | "p";
  trigger?: "load" | "view" | "hover";
  hoverParent?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: ReactNode;
};

export default function Scramble({ text, as = "span", trigger = "view", hoverParent = false, duration = 900, delay = 0, className = "", suffix }: Props) {
  const [display, setDisplay] = useState(text);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now() + delay;
    const chars = text.split("");
    setActive(true);
    const loop = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / duration));
      const settled = Math.floor(p * chars.length * 1.2);
      let out = "";
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c === " " || c === "." || c === "," || i < settled) out += c;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      if (p >= 1) {
        setDisplay(text);
        setActive(false);
      } else {
        setDisplay(out);
        raf.current = requestAnimationFrame(loop);
      }
    };
    raf.current = requestAnimationFrame(loop);
  }, [text, duration, delay]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === "load") {
      run();
      return () => cancelAnimationFrame(raf.current);
    }
    if (trigger === "view") {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        cancelAnimationFrame(raf.current);
      };
    }
    const target = (hoverParent ? el.closest("a, button") : el) ?? el;
    const onEnter = () => run();
    target.addEventListener("mouseenter", onEnter);
    target.addEventListener("focus", onEnter, true);
    return () => {
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("focus", onEnter, true);
      cancelAnimationFrame(raf.current);
    };
  }, [trigger, hoverParent, run]);

  return createElement(
    as,
    { ref, className: `relative inline-block ${className}`, style: { overflowX: "clip", overflowY: "visible" } },
    <span className={active ? "text-transparent" : undefined}>{text}</span>,
    active ? (
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
        {display}
      </span>
    ) : null,
    suffix ? <span aria-hidden="true"> {suffix}</span> : null,
  );
}
