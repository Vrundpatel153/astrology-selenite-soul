"use client";
/**
 * Selenite Soul: Authentic Precision Mouse Pointer
 * High-performance, zero-lag, hardware-accelerated cursor shaped like an authentic
 * mouse pointer arrow with luxury obsidian/gold styling, transitioning seamlessly
 * into an iconic pointing hand on clickable elements.
 */
import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "pointer" | "card" | "text" | "hidden";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Direct mouse coordinates for 0ms lag tracking
  const mousePos = useRef({ x: -100, y: -100 });
  const currentStateRef = useRef<CursorState>("default");

  useEffect(() => {
    // Disable on touch screens / mobile devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return;

    // Hide default OS cursor completely on all elements
    document.documentElement.style.cursor = "none";
    let styleEl = document.getElementById("force-hide-os-cursor");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "force-hide-os-cursor";
      styleEl.textContent = `
        *, *::before, *::after, html, body, a, button, input, textarea, select, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    const updatePosition = (x: number, y: number, curState: CursorState) => {
      if (!cursorRef.current) return;
      // Align hotspot depending on pointer type:
      // - Arrow: tip is at top-left (0, 0)
      // - Pointing hand: tip is at (9, 0)
      // - I-beam: center is at (7, 10)
      let offsetX = 0;
      let offsetY = 0;

      if (curState === "pointer" || curState === "card") {
        offsetX = -9;
        offsetY = 0;
      } else if (curState === "text") {
        offsetX = -7;
        offsetY = -10;
      }

      cursorRef.current.style.transform = `translate3d(${x + offsetX}px, ${y + offsetY}px, 0)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Determine state from hovered DOM element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      let nextState: CursorState = "default";

      if (el) {
        if (el.closest("[data-cursor='card']") || el.closest("[data-cursor='pick']")) {
          nextState = "card";
        } else if (el.closest("input, textarea, [contenteditable]")) {
          nextState = "text";
        } else if (
          el.closest(
            "a, button, [role='button'], [data-cursor='hover'], input[type='submit'], input[type='button'], .cursor-pointer"
          )
        ) {
          nextState = "pointer";
        }
      }

      if (currentStateRef.current !== nextState) {
        currentStateRef.current = nextState;
        setState(nextState);
      }

      updatePosition(e.clientX, e.clientY, nextState);
    };

    const onMouseDown = () => {
      setIsPressed(true);
    };

    const onMouseUp = () => {
      setIsPressed(false);
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
      setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 400);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("click", onClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("click", onClick);
      document.documentElement.style.cursor = "";
      const el = document.getElementById("force-hide-os-cursor");
      if (el) el.remove();
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999999] will-change-transform transition-opacity duration-150 select-none ${
          isVisible && state !== "hidden" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      >
        <div
          className="transition-transform duration-100 ease-out origin-top-left"
          style={{
            transform: isPressed ? "scale(0.88) rotate(-3deg)" : "scale(1) rotate(0deg)",
          }}
        >
          {/* 1. DEFAULT: Authentic Mouse Pointer Arrow */}
          {state === "default" && (
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.38)]"
            >
              <path
                d="M0 0V17.5L4.8 13.5L8.5 21L11.2 19.8L7.5 12.5L13.8 12.5L0 0Z"
                fill="#1c140e"
                stroke="#c8a951"
                strokeWidth="1.3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* 2. POINTER / HOVER: Authentic Pointing Hand Pointer */}
          {state === "pointer" && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
            >
              <path
                d="M7.5 1.5C7.5 0.7 8.2 0 9 0C9.8 0 10.5 0.7 10.5 1.5V10.5H11.5C12.3 10.5 13 11.2 13 12C13 11.2 13.7 10.5 14.5 10.5C15.3 10.5 16 11.2 16 12C16 11.2 16.7 10.5 17.5 10.5C18.3 10.5 19 11.2 19 12V15C19 18.9 15.9 22 12 22C9.2 22 6.7 20.3 5.7 17.7L3.2 11.8C2.8 10.9 3.2 9.9 4.1 9.5C4.9 9.1 5.9 9.5 6.3 10.3L7.5 13V1.5Z"
                fill="#1c140e"
                stroke="#c8a951"
                strokeWidth="1.3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* 3. CARD / PICK: Hand Pointer with subtle Gold Aura */}
          {state === "card" && (
            <div className="relative">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_8px_rgba(200,169,81,0.7)]"
              >
                <path
                  d="M7.5 1.5C7.5 0.7 8.2 0 9 0C9.8 0 10.5 0.7 10.5 1.5V10.5H11.5C12.3 10.5 13 11.2 13 12C13 11.2 13.7 10.5 14.5 10.5C15.3 10.5 16 11.2 16 12C16 11.2 16.7 10.5 17.5 10.5C18.3 10.5 19 11.2 19 12V15C19 18.9 15.9 22 12 22C9.2 22 6.7 20.3 5.7 17.7L3.2 11.8C2.8 10.9 3.2 9.9 4.1 9.5C4.9 9.1 5.9 9.5 6.3 10.3L7.5 13V1.5Z"
                  fill="#1c140e"
                  stroke="#dfbe65"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          {/* 4. TEXT: Precision I-Beam */}
          {state === "text" && (
            <svg
              width="14"
              height="20"
              viewBox="0 0 14 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            >
              <path d="M3 1H11M7 1V19M3 19H11" stroke="#c8a951" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 1H10M7 2V18M4 19H10" stroke="#1c140e" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      {/* Subtle luxury click ripple */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="pointer-events-none fixed rounded-full border border-[#c8a951]/60 animate-ping z-[9999998]"
          style={{
            left: r.x - 12,
            top: r.y - 12,
            width: 24,
            height: 24,
            animationDuration: "350ms",
            animationIterationCount: 1,
          }}
        />
      ))}
    </>
  );
}
