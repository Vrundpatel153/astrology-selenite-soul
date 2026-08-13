"use client";
/**
 * CustomCursor — premium gold dot cursor with interactive states.
 * - Default: small gold filled dot
 * - Hover link/button: expands to open circle ring
 * - Hover image: shows "VIEW" label inside ring
 * - Drag/carousel: shows drag arrow icon
 * - Click: ripple burst
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
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // hide system cursor site-wide
    document.documentElement.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Detect state
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      if (el.closest("[data-cursor='drag']")) { setState("drag"); return; }
      if (el.closest("[data-cursor='view']") || el.closest("img")) { setState("view"); return; }
      if (el.closest("a, button, [role='button'], [data-cursor='hover']")) { setState("hover"); return; }
      if (el.closest("input, textarea, [contenteditable]")) { setState("text"); return; }
      setState("default");
    };

    const onClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 700);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("click", onClick);

    // Smooth trailing ring
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId.current);
      document.documentElement.style.cursor = "";
    };
  }, []);

  const ringSize = state === "default" ? 36 : state === "hover" ? 52 : state === "view" ? 72 : state === "drag" ? 60 : 24;
  const dotSize = state === "text" ? 2 : 6;

  return (
    <>
      {/* Main dot — instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: state === "text" ? 2 : dotSize,
          height: state === "text" ? 20 : dotSize,
          background: state === "text" ? "transparent" : "#c8a951",
          borderLeft: state === "text" ? "1.5px solid #c8a951" : "none",
          borderRadius: state === "text" ? 0 : "50%",
          transition: "width 0.18s, height 0.18s",
          willChange: "transform",
        }}
      />

      {/* Trailing ring — interpolated */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${state === "hover" ? "#c8a951" : state === "view" ? "rgba(200,169,81,0.8)" : "rgba(200,169,81,0.4)"}`,
          background: state === "view" ? "rgba(200,169,81,0.12)" : "transparent",
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, background 0.2s",
          willChange: "transform",
        }}
      >
        {state === "view" && (
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", color: "#c8a951", userSelect: "none" }}>VIEW</span>
        )}
        {state === "drag" && (
          <span style={{ fontSize: 10, color: "#c8a951", userSelect: "none" }}>⟺</span>
        )}
      </div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="fixed rounded-full pointer-events-none z-[9997] border border-[#c8a951]/40"
            style={{ left: r.x, top: r.y, x: "-50%", y: "-50%" }}
            initial={{ width: 0, height: 0, opacity: 0.7 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
