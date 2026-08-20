"use client";
/**
 * Selenite Soul — Ultra-Responsive Luxury Cursor
 * A fast, hardware-accelerated, unified celestial cursor that tracks tightly
 * with zero lag separation, fluid interactive hover morphs, and subtle gold aura.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CursorState = "default" | "hover" | "view" | "drag" | "text" | "hidden";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Position state (tight, instantaneous + smooth outer ring)
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Disable on touch screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return;

    document.documentElement.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instant inner dot placement
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check hover targets
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      if (el.closest("[data-cursor='drag']")) {
        setState("drag");
        return;
      }
      if (el.closest("[data-cursor='view']") || (el.closest("img") && !el.closest("header, nav"))) {
        setState("view");
        return;
      }
      if (el.closest("a, button, [role='button'], [data-cursor='hover'], input[type='submit']")) {
        setState("hover");
        return;
      }
      if (el.closest("input, textarea, [contenteditable]")) {
        setState("text");
        return;
      }
      setState("default");
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setState("hidden");
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      setState("default");
    };

    const onClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples(r => [...r.slice(-2), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 600);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("click", onClick);

    // High-performance tight ring follow (lerp = 0.45 for immediate responsiveness)
    const render = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.45;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.45;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };
    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId.current);
      document.documentElement.style.cursor = "";
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-200 ${
        isVisible && state !== "hidden" ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Precision Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full transition-[width,height,background-color] duration-150 ease-out"
        style={{
          width: state === "text" ? 2 : state === "hover" ? 6 : 5,
          height: state === "text" ? 20 : state === "hover" ? 6 : 5,
          backgroundColor: state === "text" ? "#c8a951" : "#d4af37",
          boxShadow: state === "text" ? "0 0 8px rgba(200,169,81,0.9)" : "0 0 10px rgba(212,175,55,0.7)",
          borderRadius: state === "text" ? "1px" : "50%",
          willChange: "transform",
        }}
      />

      {/* Responsive Tight Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full flex items-center justify-center transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          width: state === "view" ? 68 : state === "drag" ? 64 : state === "hover" ? 44 : state === "text" ? 0 : 28,
          height: state === "view" ? 68 : state === "drag" ? 64 : state === "hover" ? 44 : state === "text" ? 0 : 28,
          border: state === "text" ? "none" : `1.2px solid ${state === "hover" ? "rgba(200,169,81,0.85)" : state === "view" ? "rgba(200,169,81,0.9)" : "rgba(200,169,81,0.4)"}`,
          backgroundColor: state === "view" ? "rgba(26,16,11,0.88)" : state === "hover" ? "rgba(200,169,81,0.08)" : state === "drag" ? "rgba(200,169,81,0.14)" : "transparent",
          backdropFilter: state === "view" ? "blur(4px)" : "none",
          boxShadow: state === "hover" ? "0 0 16px rgba(200,169,81,0.25)" : "none",
          willChange: "transform",
        }}
      >
        {state === "view" && (
          <span className="text-[8px] font-bold tracking-[0.2em] text-[#c8a951] uppercase select-none">
            VIEW
          </span>
        )}
        {state === "drag" && (
          <span className="text-[9px] font-medium tracking-widest text-[#c8a951] select-none">
            ⟨ DRAG ⟩
          </span>
        )}
      </div>

      {/* Subtle Instant Click Ripple */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="fixed rounded-full border border-[#c8a951]/70 pointer-events-none"
            style={{ left: r.x, top: r.y, x: "-50%", y: "-50%" }}
            initial={{ width: 6, height: 6, opacity: 0.8 }}
            animate={{ width: 52, height: 52, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
