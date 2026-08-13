"use client";
/**
 * MagneticButton — button that magnetically attracts the cursor within a radius.
 * Gives every CTA a premium tactile feel.
 */
import { useRef, ReactNode } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  radius?: number;   // px radius in which magnet activates
  strength?: number; // 0–1, how strongly it pulls
  onClick?: () => void;
  style?: React.CSSProperties;
  as?: "button" | "span" | "div";
}

export default function MagneticButton({
  children,
  className = "",
  radius = 80,
  strength = 0.35,
  onClick,
  style,
  as: Tag = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 160, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 160, damping: 18, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
      data-cursor="hover"
    >
      <motion.button
        style={{ x, y, ...style }}
        className={`relative overflow-hidden ${className}`}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
      >
        {/* Ripple layer */}
        <motion.span
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          initial={false}
          whileTap={{
            background: ["rgba(255,255,255,0)", "rgba(255,255,255,0.15)", "rgba(255,255,255,0)"],
            transition: { duration: 0.4 },
          }}
        />
        {/* Shine sweep on hover */}
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%", skewX: "-20deg", opacity: 0 }}
          whileHover={{ x: "150%", opacity: 0.18, transition: { duration: 0.55, ease: "easeOut" } }}
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)", width: "60%" }}
        />
        {children}
      </motion.button>
    </div>
  );
}
