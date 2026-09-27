"use client";
import { motion } from "framer-motion";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  isScrolled?: boolean;
  showTagline?: boolean;
  variant?: "header" | "footer" | "drawer";
}

export default function BrandLogo({
  className = "",
  size = "md",
  isScrolled = false,
  showTagline = true,
  variant = "header",
}: BrandLogoProps) {
  // Dimension adjustments based on size
  const iconSize = size === "sm" ? 20 : size === "lg" ? 28 : isScrolled ? 21 : 24;
  const textSize =
    size === "sm"
      ? "text-base tracking-[0.16em]"
      : size === "lg"
      ? "text-2xl md:text-3xl tracking-[0.18em]"
      : isScrolled
      ? "text-base md:text-lg tracking-[0.16em]"
      : "text-lg md:text-xl tracking-[0.18em]";

  const taglineSize = size === "sm" ? "text-[6.5px]" : size === "lg" ? "text-[8.5px]" : "text-[7px]";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none cursor-pointer ${className}`}>
      {/* Sacred Celestial Emblem: Crescent Moon embracing a 4-point Selenite Crystal Star */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 28 28"
          fill="none"
          className="text-[#a5762a] transition-all duration-700 ease-out group-hover:rotate-12 group-hover:text-[#c8a951]"
        >
          {/* Subtle outer orbit ring */}
          <circle
            cx="14"
            cy="14"
            r="12.5"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="2 3"
            className="opacity-45"
          />

          {/* Luminous Crescent Moon */}
          <path
            d="M17.5 4.5C12.5 5.5 8.8 9.8 8.8 15C8.8 20.2 12.5 24.5 17.5 25.5C10.5 26.5 4.5 20.8 4.5 14C4.5 7.2 10.5 1.5 17.5 4.5Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="0.8"
          />

          {/* Central 4-point Selenite Crystal Star */}
          <path
            d="M16 8L17.2 12.8L22 14L17.2 15.2L16 20L14.8 15.2L10 14L14.8 12.8L16 8Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.4"
          />

          {/* Small celestial diamond point */}
          <circle cx="16" cy="14" r="0.9" fill="#fcf8f4" />
        </svg>
      </div>

      {/* Typographic Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span
            className={`font-semibold text-[#2a1f1a] uppercase transition-colors duration-300 group-hover:text-[#a5762a] ${textSize}`}
            style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
          >
            Selenite Soul
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2.5 h-px bg-[#c8a951]/60" />
            <span
              className={`font-medium tracking-[0.32em] uppercase text-[#a5762a] opacity-90 ${taglineSize}`}
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              Sanctuary
            </span>
            <span className="w-2.5 h-px bg-[#c8a951]/60" />
          </div>
        )}
      </div>
    </div>
  );
}
