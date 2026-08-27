"use client";
/**
 * Selenite Soul — Ultra-Responsive Luxury Cursor
 * A fast, hardware-accelerated, unified celestial cursor that tracks tightly
 * with zero lag, sleek interactive states, and a dedicated gold pointing finger
 * for card selection.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CursorState = "default" | "hover" | "card" | "drag" | "text" | "hidden";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Position state (instantaneous dot + smooth outer ring)
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

      if (el.closest("[data-cursor='card']") || el.closest("[data-cursor='pick']")) {
        setState("card");
        return;
      }
      if (el.closest("[data-cursor='drag']")) {
        setState("drag");
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
      setRipples((r) => [...r.slice(-2), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 500);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("click", onClick);

    // High-performance tight ring follow (lerp = 0.55 for immediate response)
    const render = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.55;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.55;

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
      className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-150 ${
        isVisible && state !== "hidden" ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Precision Inner Dot (hidden when pointing finger is active) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full transition-[width,height,opacity,background-color] duration-150 ease-out"
        style={{
          width: state === "text" ? 2 : state === "card" ? 0 : state === "hover" ? 5 : 4,
          height: state === "text" ? 18 : state === "card" ? 0 : state === "hover" ? 5 : 4,
          opacity: state === "card" ? 0 : 1,
          backgroundColor: state === "text" ? "#c8a951" : "#c8a951",
          boxShadow: state === "text" ? "0 0 6px rgba(200,169,81,0.8)" : "0 0 8px rgba(200,169,81,0.6)",
          borderRadius: state === "text" ? "1px" : "50%",
          willChange: "transform",
        }}
      />

      {/* Responsive Tight Outer Element */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex items-center justify-center transition-[width,height,border-color,background-color] duration-150 ease-out"
        style={{
          width: state === "card" ? 36 : state === "drag" ? 54 : state === "hover" ? 34 : state === "text" ? 0 : 22,
          height: state === "card" ? 36 : state === "drag" ? 54 : state === "hover" ? 34 : state === "text" ? 0 : 22,
          border:
            state === "text" || state === "card"
              ? "none"
              : `1.2px solid ${state === "hover" ? "rgba(200,169,81,0.9)" : "rgba(200,169,81,0.4)"}`,
          borderRadius: "50%",
          backgroundColor:
            state === "drag"
              ? "rgba(200,169,81,0.12)"
              : state === "hover"
              ? "rgba(200,169,81,0.06)"
              : "transparent",
          boxShadow: state === "hover" ? "0 0 14px rgba(200,169,81,0.25)" : "none",
          willChange: "transform",
        }}
      >
        {/* Sleek Golden Pointing Finger for Card Selection */}
        {state === "card" && (
          <div className="flex flex-col items-center pointer-events-none -mt-4 animate-bounce" style={{ animationDuration: "1.2s" }}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="#fffdf9"
              stroke="#a5762a"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter drop-shadow-[0_2px_8px_rgba(165,118,42,0.5)]"
            >
              <path d="M10 13V3a2 2 0 0 1 4 0v7" />
              <path d="M14 10a2 2 0 0 1 4 0v3" />
              <path d="M18 12a2 2 0 0 1 4 0v4a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-3a2 2 0 0 1 3.4-1.4L10 14" />
            </svg>
            <span className="text-[7.5px] font-bold tracking-[0.16em] text-[#a5762a] uppercase bg-[#fffdf9] border border-[#c8a951]/50 px-1.5 py-0.2 rounded-xs mt-0.5 shadow-sm">
              Pick
            </span>
          </div>
        )}

        {state === "drag" && (
          <span className="text-[8px] font-bold tracking-widest text-[#a5762a] select-none">
            ⟨ DRAG ⟩
          </span>
        )}
      </div>

      {/* Subtle Instant Click Ripple */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="fixed rounded-full border border-[#c8a951]/70 pointer-events-none"
            style={{ left: r.x, top: r.y, x: "-50%", y: "-50%" }}
            initial={{ width: 4, height: 4, opacity: 0.7 }}
            animate={{ width: 38, height: 38, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
