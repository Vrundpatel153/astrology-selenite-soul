"use client";
/**
 * Selenite Soul — Celestial Orbit Cursor
 * A bespoke, ultra-luxury mouse cursor featuring a smooth fluid trailing orbit,
 * rotating celestial crescent moon accent, dynamic shape morphing, and magnetic physics.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CursorState = "default" | "hover" | "view" | "drag" | "text";

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const pos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const vel = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    document.documentElement.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      if (el.closest("[data-cursor='drag']")) {
        setState("drag");
        setIsHovered(true);
        return;
      }
      if (el.closest("[data-cursor='view']") || el.closest("img")) {
        setState("view");
        setIsHovered(true);
        return;
      }
      if (el.closest("a, button, [role='button'], [data-cursor='hover'], input[type='submit']")) {
        setState("hover");
        setIsHovered(true);
        return;
      }
      if (el.closest("input, textarea, [contenteditable]")) {
        setState("text");
        setIsHovered(false);
        return;
      }
      setState("default");
      setIsHovered(false);
    };

    const onClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 800);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick);

    // Smooth fluid lerp & velocity stretch
    const animate = () => {
      const prevX = pos.current.x;
      const prevY = pos.current.y;

      pos.current.x = lerp(pos.current.x, targetPos.current.x, 0.16);
      pos.current.y = lerp(pos.current.y, targetPos.current.y, 0.16);

      vel.current.x = pos.current.x - prevX;
      vel.current.y = pos.current.y - prevY;

      const speed = Math.sqrt(vel.current.x * vel.current.x + vel.current.y * vel.current.y);
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.015, 0.35);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetPos.current.x}px, ${targetPos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId.current);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Luminous Inner Celestial Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full transition-all duration-200"
        style={{
          width: state === "text" ? 2 : state === "hover" ? 8 : 6,
          height: state === "text" ? 22 : state === "hover" ? 8 : 6,
          background: state === "text" ? "#c8a951" : "#d4af37",
          boxShadow: state === "text" ? "0 0 10px rgba(200,169,81,0.8)" : "0 0 12px rgba(212,175,55,0.6)",
          borderRadius: state === "text" ? "1px" : "50%",
        }}
      />

      {/* Outer Orbit Ring with Rotating Crescent & Diamond Accents */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          width: state === "view" ? 80 : state === "drag" ? 70 : state === "hover" ? 54 : 38,
          height: state === "view" ? 80 : state === "drag" ? 70 : state === "hover" ? 54 : 38,
          border: `1px solid ${state === "hover" ? "rgba(200,169,81,0.85)" : state === "view" ? "rgba(200,169,81,0.9)" : "rgba(200,169,81,0.35)"}`,
          background: state === "view" ? "rgba(30, 20, 16, 0.85)" : state === "drag" ? "rgba(200,169,81,0.12)" : "transparent",
          backdropFilter: state === "view" ? "blur(4px)" : "none",
        }}
      >
        {/* Rotating Crescent Moon on Orbit Rim */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          {/* Top Orbit Diamond */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#c8a951] rotate-45 opacity-80" />
          {/* Subtle Crescent Arc */}
          <div className="absolute top-1 right-2 w-2 h-2 rounded-full border-r-2 border-t-2 border-[#c8a951] opacity-70" />
        </motion.div>

        {/* Dynamic Label for Custom States */}
        {state === "view" && (
          <span className="text-[9px] font-bold tracking-[0.22em] text-[#c8a951] uppercase">
            VIEW
          </span>
        )}
        {state === "drag" && (
          <span className="text-[10px] font-medium tracking-widest text-[#c8a951]">
            ⟨ DRAG ⟩
          </span>
        )}
      </div>

      {/* Starlight Click Ripples */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="fixed rounded-full border border-[#c8a951]/60 pointer-events-none"
            style={{ left: r.x, top: r.y, x: "-50%", y: "-50%" }}
            initial={{ width: 4, height: 4, opacity: 0.9 }}
            animate={{ width: 90, height: 90, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
