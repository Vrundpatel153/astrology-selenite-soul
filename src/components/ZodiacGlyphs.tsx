"use client";
import React from "react";

interface ZodiacGlyphProps {
  sign: string;
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function ZodiacGlyph({
  sign,
  className = "",
  size = 28,
  color = "#c8a951",
  strokeWidth = 1.8,
}: ZodiacGlyphProps) {
  const norm = sign.toLowerCase().trim();
  const id = `zodiac-gold-grad-${norm}`;

  const renderPath = () => {
    switch (norm) {
      case "aries":
        return (
          <>
            {/* Aries: Elegant Ram Horns splitting from central stem */}
            <path
              d="M16 27V9 M16 9C13.5 5 7 5 7 10C7 14 12 14.5 12 14.5 M16 9C18.5 5 25 5 25 10C25 14 20 14.5 20 14.5"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "taurus":
        return (
          <>
            {/* Taurus: Sacred Bull Horns over Head Circle */}
            <path
              d="M7 6C7 11.5 11 14 16 14C21 14 25 11.5 25 6"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <circle
              cx="16"
              cy="21"
              r="6.5"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
          </>
        );
      case "gemini":
        return (
          <>
            {/* Gemini: Cosmic Twins Dual Pillars with Top/Bottom Arcs */}
            <path
              d="M7 6C13 8 19 8 25 6 M7 26C13 24 19 24 25 26 M11.5 7V25 M20.5 7V25"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );
      case "cancer":
        return (
          <>
            {/* Cancer: Sacred 69 Spiral Claws */}
            <circle
              cx="10"
              cy="11"
              r="3.5"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
            <path
              d="M13.5 11C18 11 25 13 25 8"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <circle
              cx="22"
              cy="21"
              r="3.5"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
            <path
              d="M18.5 21C14 21 7 19 7 24"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );
      case "leo":
        return (
          <>
            {/* Leo: Lion Head Circle & Flowing Majestic Mane */}
            <circle
              cx="9.5"
              cy="20"
              r="3.5"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
            />
            <path
              d="M13 20C13 14 15 7 20.5 7C24.5 7 26 10 24 14.5C21.5 20 22 25 25.5 25"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "virgo":
        return (
          <>
            {/* Virgo: Triple Arched M with Intersecting Loop Ribbon */}
            <path
              d="M5 9V23 M5 12C5 8 9 8 9 12V23 M9 12C9 8 13.5 8 13.5 12V23 M13.5 12C13.5 8 18 8 18 12V21C18 25 21.5 26 23 23C24.5 20 21 16 16.5 16 M20 20L25 27"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "libra":
        return (
          <>
            {/* Libra: Setting Sun Arch over Cosmic Baseline */}
            <path
              d="M5 25H27 M5 19H10C10 14 12 11 16 11C20 11 22 14 22 19H27"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "scorpio":
        return (
          <>
            {/* Scorpio: Triple Arched M with Piercing Arrow Stinger */}
            <path
              d="M5 9V23 M5 12C5 8 9 8 9 12V23 M9 12C9 8 13.5 8 13.5 12V23 M13.5 12C13.5 8 18 8 18 12V23C18 25 21 24.5 24 21 M24 21V26 M24 21H19 M21.5 18.5L25.5 22.5"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "sagittarius":
        return (
          <>
            {/* Sagittarius: Celestial Arrow with Crossbar */}
            <path
              d="M7 25L25 7 M25 7H16 M25 7V16 M11 14L18 21"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "capricorn":
        return (
          <>
            {/* Capricorn: Goat Horn into Looping Fish Tail */}
            <path
              d="M6 10L12 24L18 10C18 6 22 6 23.5 9.5C25 13 22 18 19 21C16 24 16 27 19.5 27C23 27 25 24 25 20"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "aquarius":
        return (
          <>
            {/* Aquarius: Dual Cosmic Electric Waves */}
            <path
              d="M6 11L9.5 8L13.5 11L17.5 8L21.5 11L25 8.5 M6 20L9.5 17L13.5 20L17.5 17L21.5 20L25 17.5"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );
      case "pisces":
        return (
          <>
            {/* Pisces: Dual Transcendent Fish Crescents Tied by Chord */}
            <path
              d="M10 6C6.5 11 6.5 21 10 26 M22 6C25.5 11 25.5 21 22 26 M5 16H27"
              fill="none"
              stroke={`url(#${id})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );
      default:
        return (
          <circle
            cx="16"
            cy="16"
            r="10"
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={strokeWidth}
          />
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`inline-block shrink-0 transition-transform ${className}`}
      style={{ verticalAlign: "middle" }}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5dc8c" />
          <stop offset="50%" stopColor="#c8a951" />
          <stop offset="100%" stopColor="#a5762a" />
        </linearGradient>
      </defs>
      {renderPath()}
    </svg>
  );
}
