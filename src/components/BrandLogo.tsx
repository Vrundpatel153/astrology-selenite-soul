"use client";
import { motion } from "framer-motion";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  isScrolled?: boolean;
  showTagline?: boolean;
  variant?: "header" | "footer" | "drawer";
  fontStyle?: "pinyon" | "greatvibes" | "alexbrush" | "pacifico";
}

export default function BrandLogo({
  className = "",
  size = "md",
  isScrolled = false,
  showTagline = true,
  variant = "header",
  fontStyle = "pinyon",
}: BrandLogoProps) {
  // Dimension adjustments based on size
  const iconSize = size === "sm" ? 18 : size === "lg" ? 26 : isScrolled ? 19 : 22;

  // Cursive scripts require natural, flowing sizing without uppercase transform
  const textSize =
    size === "sm"
      ? "text-xl md:text-2xl"
      : size === "lg"
      ? "text-3xl md:text-4xl"
      : isScrolled
      ? "text-2xl md:text-[26px]"
      : "text-[26px] md:text-[30px]";

  const taglineSize = size === "sm" ? "text-[6px]" : size === "lg" ? "text-[8px]" : "text-[6.5px]";

  // Font family selection
  const fontFamily =
    fontStyle === "greatvibes"
      ? "'Great Vibes', cursive"
      : fontStyle === "alexbrush"
      ? "'Alex Brush', cursive"
      : fontStyle === "pacifico"
      ? "'Pacifico', cursive"
      : "'Pinyon Script', 'Great Vibes', cursive";

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 group select-none cursor-pointer ${className}`}>
      {/* Delicate Celestial Accent: Crescent Moon with 4-point Selenite Star */}
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
            className="opacity-40"
          />

          {/* Luminous Crescent Moon */}
          <path
            d="M17.5 4.5C12.5 5.5 8.8 9.8 8.8 15C8.8 20.2 12.5 24.5 17.5 25.5C10.5 26.5 4.5 20.8 4.5 14C4.5 7.2 10.5 1.5 17.5 4.5Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="0.75"
          />

          {/* Central 4-point Selenite Crystal Star */}
          <path
            d="M16 8L17.2 12.8L22 14L17.2 15.2L16 20L14.8 15.2L10 14L14.8 12.8L16 8Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.35"
          />

          {/* Small celestial diamond point */}
          <circle cx="16" cy="14" r="0.8" fill="#fcf8f4" />
        </svg>
      </div>

      {/* Elegant Flowing Cursive Script Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-normal text-[#2a1f1a] transition-colors duration-300 group-hover:text-[#a5762a] leading-none ${textSize}`}
          style={{ fontFamily }}
        >
          Selenite Soul
        </span>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-px bg-[#c8a951]/60" />
            <span
              className={`font-semibold tracking-[0.34em] uppercase text-[#a5762a] opacity-85 ${taglineSize}`}
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              Sanctuary
            </span>
            <span className="w-2 h-px bg-[#c8a951]/60" />
          </div>
        )}
      </div>
    </div>
  );
}
