"use client";
import { useEffect, useRef, type ReactNode } from "react";

/* A wrapper that lets its child lean toward the pointer when it comes close. Pointer devices only. */
export default function Magnet({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reach = 90;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const near = Math.abs(dx) < r.width / 2 + reach && Math.abs(dy) < r.height / 2 + reach;
      el.style.transform = near ? `translate(${dx * 0.18}px, ${dy * 0.22}px)` : "";
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <span ref={ref} className={`inline-block transition-transform duration-300 ease-out ${className}`}>
      {children}
    </span>
  );
}
