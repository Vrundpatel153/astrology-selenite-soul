import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import leafBranch from "@/assets/leaf-branch.webp";
import { geocodePlace, RASHIS, type BirthData, INDIAN_CITIES, searchIndianPlaces, reverseGeocode } from "@/lib/kundali";
import { useGenerateKundali } from "@/lib/api-client/api";
import type { KundaliChart as KundaliResult, Planet as PlanetInfo } from "@/lib/api-client/api.schemas";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

// ─── Custom SVG Icons (no Lucide) ─────────────────────────────────────────────
function IconPerson() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="7" cy="4.5" r="2.5"/>
      <path d="M1.5 13c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="1.5" y="2.5" width="11" height="10" rx="0.5"/>
      <line x1="1.5" y1="5.5" x2="12.5" y2="5.5"/>
      <line x1="4.5" y1="1" x2="4.5" y2="4"/>
      <line x1="9.5" y1="1" x2="9.5" y2="4"/>
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="7" cy="7" r="5.5"/>
      <line x1="7" y1="4" x2="7" y2="7.5" strokeLinecap="round"/>
      <line x1="7" y1="7.5" x2="9.5" y2="8.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M7 13C7 13 2 8.5 2 5.5a5 5 0 0110 0C12 8.5 7 13 7 13z"/>
      <circle cx="7" cy="5.5" r="1.5"/>
    </svg>
  );
}
function IconReset() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M2 6.5A4.5 4.5 0 1 1 6.5 11" strokeLinecap="round"/>
      <polyline points="2,3 2,7 6,7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <line x1="2" y1="7" x2="11" y2="7" strokeLinecap="round"/>
      <polyline points="8,4 11,7 8,10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconDiamond({ size = 6 }: { size?: number }) {
  const h = size;
  return (
    <svg width={h} height={h} viewBox="0 0 10 10" fill="currentColor">
      <polygon points="5,0 10,5 5,10 0,5"/>
    </svg>
  );
}
// Small badge icons for the "Enter Birth Details" info pills
function IconMandalaDot() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="7" cy="7" r="5.5"/>
      <circle cx="7" cy="7" r="2"/>
      {[0, 90, 180, 270].map(a => (
        <line key={a}
          x1={7 + 5.5 * Math.cos((a * Math.PI) / 180)} y1={7 + 5.5 * Math.sin((a * Math.PI) / 180)}
          x2={7 + 7 * Math.cos((a * Math.PI) / 180)}   y2={7 + 7 * Math.sin((a * Math.PI) / 180)}
        />
      ))}
    </svg>
  );
}
function IconFlame() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M7 1.5C5 4 3.5 5.5 3.5 8.2A3.5 3.5 0 0 0 7 12.5a3.5 3.5 0 0 0 3.5-4.3C10.5 6 9 5 9 3.2c0 1.3-1 1.8-1 3 0 .8.6 1.3.6 2.1a1.6 1.6 0 0 1-3.2 0c0-1.6 1.6-2.7 1.6-6.8Z"/>
    </svg>
  );
}
function IconLotusPetal() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M7 13C4 11 2.5 8.5 4 5.5 5 7.5 6 9 7 13Z"/>
      <path d="M7 13C10 11 11.5 8.5 10 5.5 9 7.5 8 9 7 13Z"/>
      <path d="M7 13C7 8.5 6.5 4.5 7 1.5c.5 3 0 7 0 11.5Z"/>
    </svg>
  );
}
function IconStarBurst() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 0.5c.3 2.7 1 4.3 2.6 5.9C11.2 8 12.8 8.7 13.5 9c-2.7.3-4.3 1-5.9 2.6C6 13.2 5.3 13.8 5 13.5c-.3-2.7-1-4.3-2.6-5.9C.8 6 .2 5.3.5 5c2.7-.3 4.3-1 5.9-2.6C7.8.8 8 .5 7 .5Z"/>
    </svg>
  );
}

// ─── Sparkle field (soft gold twinkles on cream backgrounds) ───────────────────
function SparkleField({ count = 22 }: { count?: number }) {
  const pts = useRef(
    Array.from({ length: count }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 4,
      dur: 2.5 + Math.random() * 2.5,
    }))
  ).current;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${p.top}%`, left: `${p.left}%`,
            width: p.size, height: p.size,
            background: "#d9b25c",
          }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.7, 1.15, 0.7] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Decorative corner leaves (soft watercolour-style botanical accents) ────────
function CornerLeaves({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="150" height="170" viewBox="0 0 150 170" fill="none"
      className={flip ? "scale-x-[-1]" : ""}
    >
      <g opacity="0.55">
        <path d="M8 168C4 130 10 95 34 68C50 50 64 44 62 44C58 60 44 78 40 100C36 124 42 148 8 168Z" fill="#a9bf95" opacity="0.55"/>
        <path d="M8 168C10 140 22 112 46 96C58 88 66 86 66 86C58 98 46 110 40 128C34 146 30 156 8 168Z" fill="#7f9d68" opacity="0.6"/>
        <path d="M18 166C26 138 42 116 66 106C46 130 34 148 18 166Z" fill="#5f7d4a" opacity="0.55"/>
        <circle cx="30" cy="150" r="2" fill="#c8a951" opacity="0.7"/>
        <circle cx="52" cy="112" r="1.4" fill="#c8a951" opacity="0.6"/>
      </g>
    </svg>
  );
}

// Elemental colour coding for the 12 zodiac glyphs (fire / earth / air / water)
const ZODIAC_COLORS = [
  "#d9704a", // Aries — fire
  "#5f8a52", // Taurus — earth
  "#3f8fa0", // Gemini — air
  "#b15a86", // Cancer — water
  "#d9704a", // Leo — fire
  "#5f8a52", // Virgo — earth
  "#3f8fa0", // Libra — air
  "#b15a86", // Scorpio — water
  "#d9704a", // Sagittarius — fire
  "#5f8a52", // Capricorn — earth
  "#3f8fa0", // Aquarius — air
  "#b15a86", // Pisces — water
];

// ─── Geometric Mandala ─────────────────────────────────────────────────────────
function VedicMandala({ lagna = 0 }: { lagna?: number }) {
  const outerR = 112;
  const midR   = 84;
  const innerR = 56;
  const labelR = outerR + 26; // radius where zodiac icons sit

  // 12 zodiac SVG paths — each drawn in a 20×20 coordinate space (0–20)
  // These are STATIC (never rotate), so they always read upright
  const zodiacPaths: [string, string][] = [
    // 0  Aries ♈ — ram horns: two upward arcs
    ["Aries",    "M5,15 C5,9 9,5.5 10,9 C11,5.5 15,9 15,15"],
    // 1  Taurus ♉ — circle + two short horns
    ["Taurus",   "M6,14 a4,4 0 1,1 8,0 M10,10 L7,5 M10,10 L13,5"],
    // 2  Gemini ♊ — two vertical bars with top & bottom rails
    ["Gemini",   "M7,5 L7,15 M13,5 L13,15 M7,5 L13,5 M7,15 L13,15"],
    // 3  Cancer ♋ — interlocked 6 & 9
    ["Cancer",   "M13,9 a3.5,3.5 0 1,0 -3.5,3.5 M7,11 a3.5,3.5 0 1,0 3.5,-3.5"],
    // 4  Leo ♌ — circle + curling tail
    ["Leo",      "M7,9 a3,3 0 1,1 6,0 M13,9 C15,9 16,13 14,15 C12,17 11,15 12,13"],
    // 5  Virgo ♍ — m-shape + right descending loop
    ["Virgo",    "M4,15 L4,7 C4,5 6.5,5 7,7.5 C7.5,5 10,5 10.5,7.5 L10.5,12 C10.5,15.5 15,15.5 15,12 C15,8.5 10.5,8.5 10.5,12"],
    // 6  Libra ♎ — flat line + arch
    ["Libra",    "M4,13 L16,13 M7,13 C7,8.5 13,8.5 13,13"],
    // 7  Scorpio ♏ — m-shape + forward arrow
    ["Scorpio",  "M4,14 L4,7 C4,5 6.5,5 7,7.5 C7.5,5 10,5 10.5,7.5 L10.5,12 L15,12 M13,10 L15,12 L13,14"],
    // 8  Sagittarius ♐ — diagonal arrow up-right
    ["Sagittarius","M5,15 L15,5 M15,5 L10,5 M15,5 L15,10"],
    // 9  Capricorn ♑ — V + curling right tail
    ["Capricorn","M4,5 L8,13 C9,16 11,16 12,13 C13,10 13,9 15,9 C17,9 17,14 15,14"],
    // 10 Aquarius ♒ — two wavy lines
    ["Aquarius", "M4,9 C6,7 8,11 10,9 C12,7 14,11 16,9 M4,13 C6,11 8,15 10,13 C12,11 14,15 16,13"],
    // 11 Pisces ♓ — two arcs + center vertical line
    ["Pisces",   "M10,5 L10,15 M5,7.5 C5,5 9,5 9,10 C9,15 5,15 5,12.5 M15,7.5 C15,5 11,5 11,10 C11,15 15,15 15,12.5"],
  ];

  return (
    <div className="relative w-[380px] h-[380px] md:w-[480px] md:h-[480px] shrink-0 flex items-center justify-center select-none">
      <svg viewBox="-165 -165 330 330" className="absolute inset-0 w-full h-full overflow-visible">

        {/* ═══ Layer 1: outermost dashed ring (very slow, reverse) ═══ */}
        <g className="kundali-spin-slow-rev">
          <circle cx={0} cy={0} r={labelR + 20}
            fill="none" stroke="rgba(184,134,58,0.22)" strokeWidth="0.5"
            strokeDasharray="2 10"
          />
          <circle cx={0} cy={0} r={labelR + 14}
            fill="none" stroke="rgba(184,134,58,0.35)" strokeWidth="0.6"
          />
        </g>

        {/* ═══ Layer 2: beaded dotted ring outside main wheel (slow, forward) ═══ */}
        <g className="kundali-spin-300">
          {Array.from({ length: 72 }, (_, i) => {
            const a = (i * 5) * (Math.PI / 180);
            return (
              <circle key={i}
                cx={(outerR + 8) * Math.cos(a)} cy={(outerR + 8) * Math.sin(a)}
                r={0.9} fill="rgba(184,134,58,0.55)"
              />
            );
          })}
        </g>

        {/* ═══ Layer 3: main wheel ring + ticks + diamonds (medium, forward) ═══ */}
        <g className="kundali-spin">
          <circle cx={0} cy={0} r={outerR}
            fill="none" stroke="rgba(184,134,58,0.7)" strokeWidth="1.1"
          />
          {/* Major ticks at every 30° */}
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 - 90) * (Math.PI / 180);
            return (
              <line key={`maj-${i}`}
                x1={(outerR - 6) * Math.cos(a)} y1={(outerR - 6) * Math.sin(a)}
                x2={(outerR + 6) * Math.cos(a)} y2={(outerR + 6) * Math.sin(a)}
                stroke="rgba(184,134,58,0.85)" strokeWidth="1.1"
              />
            );
          })}
          {/* Minor ticks at every 10° */}
          {Array.from({ length: 36 }, (_, i) => {
            if (i % 3 === 0) return null;
            const a = (i * 10 - 90) * (Math.PI / 180);
            return (
              <line key={`min-${i}`}
                x1={(outerR - 2.5) * Math.cos(a)} y1={(outerR - 2.5) * Math.sin(a)}
                x2={(outerR + 2.5) * Math.cos(a)} y2={(outerR + 2.5) * Math.sin(a)}
                stroke="rgba(184,134,58,0.4)" strokeWidth="0.6"
              />
            );
          })}
          {/* Diamond markers on ring (offset by 15° so they sit between zodiac slots) */}
          {Array.from({ length: 12 }, (_, i) => {
            const a = ((i * 30) + 15 - 90) * (Math.PI / 180);
            const dx = outerR * Math.cos(a);
            const dy = outerR * Math.sin(a);
            return (
              <polygon key={`dm-${i}`}
                points={`${dx},${dy - 3.2} ${dx + 3.2},${dy} ${dx},${dy + 3.2} ${dx - 3.2},${dy}`}
                fill="rgba(184,134,58,0.55)"
              />
            );
          })}
        </g>

        {/* ═══ Layer 4: mid dotted ring (medium, reverse) ═══ */}
        <g className="kundali-spin-med-rev">
          <circle cx={0} cy={0} r={midR + 6}
            fill="none" stroke="rgba(184,134,58,0.35)" strokeWidth="0.5"
            strokeDasharray="1 4"
          />
          <circle cx={0} cy={0} r={midR}
            fill="none" stroke="rgba(184,134,58,0.55)" strokeWidth="0.9"
          />
        </g>

        {/* ═══ Layer 5: inner beaded ring (fast, forward) ═══ */}
        <g className="kundali-spin-90">
          {Array.from({ length: 48 }, (_, i) => {
            const a = (i * 7.5) * (Math.PI / 180);
            return (
              <circle key={i}
                cx={(innerR + 8) * Math.cos(a)} cy={(innerR + 8) * Math.sin(a)}
                r={0.7} fill="rgba(184,134,58,0.5)"
              />
            );
          })}
          <circle cx={0} cy={0} r={innerR}
            fill="none" stroke="rgba(184,134,58,0.6)" strokeWidth="1"
          />
        </g>

        {/* ═══ Layer 6: LOTUS (many pointed petals, slow REVERSE — opposite of wheel) ═══ */}
        <g className="kundali-spin-rev-150">
          {/* Outer pointed petal ring — 24 long petals */}
          {Array.from({ length: 24 }, (_, i) => {
            const rot = i * 15;
            return (
              <path key={`p1-${i}`}
                d="M0 -48 C 5 -30, 3 -14, 0 -6 C -3 -14, -5 -30, 0 -48 Z"
                fill="rgba(200,169,81,0.06)"
                stroke="rgba(184,134,58,0.7)" strokeWidth="0.7"
                transform={`rotate(${rot})`}
              />
            );
          })}
          {/* Mid petal ring — 16 petals offset */}
          {Array.from({ length: 16 }, (_, i) => {
            const rot = i * 22.5 + 11.25;
            return (
              <path key={`p2-${i}`}
                d="M0 -36 C 4.5 -22, 3 -12, 0 -6 C -3 -12, -4.5 -22, 0 -36 Z"
                fill="rgba(200,169,81,0.09)"
                stroke="rgba(184,134,58,0.65)" strokeWidth="0.65"
                transform={`rotate(${rot})`}
              />
            );
          })}
          {/* Inner petal ring — 12 small petals */}
          {Array.from({ length: 12 }, (_, i) => {
            const rot = i * 30;
            return (
              <path key={`p3-${i}`}
                d="M0 -24 C 3 -16, 2 -10, 0 -5 C -2 -10, -3 -16, 0 -24 Z"
                fill="rgba(200,169,81,0.14)"
                stroke="rgba(184,134,58,0.7)" strokeWidth="0.6"
                transform={`rotate(${rot})`}
              />
            );
          })}
        </g>

        {/* ═══ Layer 7: center disc + crescent moon (static, upright) ═══ */}
        <g>
          <circle cx={0} cy={0} r={13}
            fill="#fffaf2" stroke="rgba(184,134,58,0.7)" strokeWidth="0.8"
          />
          {/* Crescent moon */}
          <path
            d="M4 -8 A8 8 0 1 0 4 8 A6 6 0 1 1 4 -8 Z"
            fill="#c8a951"
          />
        </g>

        {/* ═══ Layer 8: Zodiac icons orbit like Ferris-wheel gondolas (upright) ═══ */}
        <g className="kundali-orbit">
          {zodiacPaths.map(([name, path], i) => {
            const a      = (i * 30 - 90) * (Math.PI / 180);
            const lx     = labelR * Math.cos(a);
            const ly     = labelR * Math.sin(a);
            const active = i === lagna;
            const glyphColor = ZODIAC_COLORS[i];
            return (
              <g
                key={name}
                className="kundali-orbit-counter"
                style={{ transformOrigin: `${lx}px ${ly}px`, transformBox: "view-box" }}
              >
                <circle cx={lx} cy={ly} r={13}
                  fill="#fffaf2"
                  stroke={active ? "#c8a951" : "rgba(184,134,58,0.35)"}
                  strokeWidth={active ? 1.4 : 0.8}
                />
                <g transform={`translate(${lx - 10},${ly - 10})`}>
                  <path d={path}
                    fill="none"
                    stroke={active ? "#c8a951" : glyphColor}
                    strokeWidth={active ? 2 : 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            );
          })}
        </g>

      </svg>
    </div>
  );
}

// ─── North Indian Chart ───────────────────────────────────────────────────────
const HOUSE_GRID: [number, number, number][] = [
  [12,0,0],[1,0,1],[2,0,2],[3,0,3],
  [11,1,0],[4,1,3],
  [10,2,0],[5,2,3],
  [9,3,0],[8,3,1],[7,3,2],[6,3,3],
];

function KundaliChart({ result }: { result: KundaliResult }) {
  const cells: Record<number, PlanetInfo[]> = {};
  for (let h = 1; h <= 12; h++) cells[h] = [];
  result.planets.forEach(p => { if (cells[p.house]) cells[p.house].push(p); });

  return (
    <div className="w-full max-w-[300px] mx-auto">
      <div className="grid grid-cols-4 gap-px" style={{ background: "rgba(184,134,58,0.25)" }}>
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 4 }, (_, col) => {
            if ((row === 1 || row === 2) && (col === 1 || col === 2)) {
              if (row === 1 && col === 1) return (
                <motion.div
                  key="center"
                  className="col-span-2 row-span-2 flex flex-col items-center justify-center p-3 border border-[#c8a951]/30"
                  style={{ background: "#fffaf2", minHeight: 68 }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.div
                    className="w-8 h-8 flex items-center justify-center mb-1"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg viewBox="0 0 30 30" fill="none" className="w-full h-full">
                      <polygon points="15,2 28,28 2,28" fill="none" stroke="rgba(184,134,58,0.7)" strokeWidth="1"/>
                      <polygon points="15,28 2,2 28,2" fill="none" stroke="rgba(184,134,58,0.5)" strokeWidth="1"/>
                      <circle cx="15" cy="15" r="3" fill="#c8a951" opacity="0.9"/>
                    </svg>
                  </motion.div>
                  <p className="text-[#a5762a] text-[9px] font-bold uppercase tracking-widest">Lagna</p>
                  <p className="text-[#3d2115] text-[11px] font-semibold mt-0.5">{result.lagnaName}</p>
                  <p className="text-[#5c4636] text-[8px] mt-0.5 font-mono font-bold">{result.lagnaLongitude.toFixed(1)}°</p>
                </motion.div>
              );
              return null;
            }
            const entry = HOUSE_GRID.find(([, r, c]) => r === row && c === col);
            if (!entry) return null;
            const houseNum = entry[0];
            const rashiNum = result.houseRashis[houseNum - 1];
            const rashi = RASHIS[rashiNum - 1];
            const here = cells[houseNum] || [];
            return (
              <motion.div
                key={`${row}-${col}`}
                style={{ background: "#fffdf9", minHeight: 68 }}
                className="flex flex-col items-center justify-center p-1 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * (row * 4 + col) }}
              >
                <span className="absolute top-1 left-1.5 text-[9px] text-[#5c4636] font-mono font-bold">{houseNum}</span>
                <p className="text-[10px] text-[#3d2115] font-serif font-bold">{rashi?.name.slice(0,2)}</p>
                <div className="flex flex-wrap justify-center gap-0.5 mt-1">
                  {here.map(p => (
                    <motion.span key={p.name}
                      title={`${p.name}${p.isRetrograde ? " (R)" : ""}`}
                      className="text-[11px] font-bold font-mono"
                      style={{ color: p.color }}
                      animate={{ opacity: [0.65, 1, 0.65] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() }}
                    >
                      {p.symbol}{p.isRetrograde ? "ᴿ" : ""}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 justify-center">
        {result.planets.map(p => (
          <span key={p.name} className="text-[10px] flex items-center gap-0.5 font-mono font-bold" style={{ color: p.color }}>
            {p.symbol} {p.name.slice(0,3)}{p.isRetrograde ? "ᴿ" : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Planet Table ─────────────────────────────────────────────────────────────
function PlanetTable({ planets }: { planets: PlanetInfo[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(184,134,58,0.25)" }}>
            {["Planet","Sanskrit","Sign","House","Nakshatra","Pada",""].map(h => (
              <th key={h} className="text-[9px] uppercase tracking-widest text-[#5c4636] font-bold py-3 px-3 text-left whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planets.map((p, i) => (
            <motion.tr key={p.name}
              className={i % 2 === 0 ? "" : ""}
              style={{ borderBottom: "1px solid rgba(120,80,40,0.08)" }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ backgroundColor: "rgba(200,169,81,0.06)" }}
            >
              <td className="py-3 px-3 font-bold whitespace-nowrap" style={{ color: p.color }}>
                <span className="font-mono text-sm">{p.symbol}</span>
                <span className="ml-1.5 text-[11px]">{p.name}</span>
              </td>
              <td className="py-3 px-3 text-[#4a2c11] font-semibold font-serif italic text-[11px]">{p.sanskrit}</td>
              <td className="py-3 px-3 whitespace-nowrap text-[#3d2115] font-medium text-[11px]">
                {p.rashiName}
              </td>
              <td className="py-3 px-3 text-center font-mono font-semibold text-[#3d2115] text-[11px]">{p.house}</td>
              <td className="py-3 px-3 whitespace-nowrap text-[#3d2115] font-semibold text-[11px]">{p.nakshatra}</td>
              <td className="py-3 px-3 text-center font-mono font-semibold text-[#3d2115] text-[11px]">{p.nakshatraPada}</td>
              <td className="py-3 px-3">
                {p.isRetrograde && (
                  <span className="text-[9px] font-bold tracking-widest border border-orange-500/40 text-orange-600 px-1.5 py-0.5">R</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Crystal Card ──────────────────────────────────────────────────────────────
function CrystalCard({ rec, onAdd, delay = 0 }: {
  rec: { crystal: string; reason: string; planet: string; image: string; benefit: string };
  onAdd: () => void;
  delay?: number;
}) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => { onAdd(); setAdded(true); setTimeout(() => setAdded(false), 2000); };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="group relative overflow-hidden flex gap-4 items-start p-5"
      style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(184,134,58,0.22)" }}
      whileHover={{ borderColor: "rgba(184,134,58,0.5)", backgroundColor: "rgba(255,255,255,0.85)" }}
    >
      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 -translate-x-full pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,81,0.08), transparent)" }}
        whileHover={{ translateX: "200%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      <div className="w-14 h-14 shrink-0 overflow-hidden" style={{ border: "1px solid rgba(184,134,58,0.3)" }}>
        <motion.img src={rec.image} alt={rec.crystal} className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }} transition={{ duration: 0.35 }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-0.5">{rec.planet}</p>
        <p className="text-sm font-medium text-[#3d2115] leading-tight">{rec.crystal}</p>
        <p className="text-[10px] text-[#6b5645] mt-1 leading-relaxed">{rec.benefit}</p>
        <p className="text-[9.5px] text-[#5c4636] font-medium mt-1 italic">{rec.reason}</p>
      </div>
      <motion.button onClick={handleAdd}
        className="shrink-0 self-center px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider"
        style={{
          border: added ? "1px solid #22c55e" : "1px solid rgba(184,134,58,0.6)",
          color: added ? "#22c55e" : "#a5762a",
        }}
        whileHover={!added ? { backgroundColor: "#c8a951", color: "#fffaf2" } : {}}
        whileTap={{ scale: 0.92 }}
      >
        {added ? "Added" : "Add"}
      </motion.button>
    </motion.div>
  );
}

// ─── Yoga Card ────────────────────────────────────────────────────────────────
function YogaCard({ yoga, i }: { yoga: { name: string; description: string; strength: string }; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.08 }}
      className="flex gap-4 items-start p-4"
      style={{ border: "1px solid rgba(184,134,58,0.22)", background: "rgba(200,169,81,0.06)" }}
    >
      <div className="mt-0.5 text-[#a5762a] opacity-80 shrink-0"><IconDiamond size={8} /></div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#4a2b12]">{yoga.name}</p>
          <span className="text-[7px] font-bold uppercase tracking-wider px-2 py-0.5"
            style={{ border: "1px solid rgba(184,134,58,0.4)", color: "#a5762a" }}
          >{yoga.strength}</span>
        </div>
        <p className="text-xs text-[#6b5645] leading-relaxed">{yoga.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Kundali() {
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  const [form, setForm] = useState({ name: "", date: "", time: "12:00", place: "" });
  const [formError, setFormError] = useState("");
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [activeTab, setActiveTab] = useState<"chart" | "planets" | "crystals" | "yogas" | "dasha">("crystals");

  const [suggestions, setSuggestions] = useState<Array<{ name: string; lat: number; lon: number }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { mutate: generateKundali, data: result, isPending: loading, error: apiError, reset } = useGenerateKundali();
  const error = formError || (apiError ? (apiError as { message?: string }).message ?? "Something went wrong. Please try again." : "");

  const heroRef   = useRef<HTMLDivElement>(null);
  const formRef   = useRef<HTMLFormElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY   = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOp  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Click outside suggestions list
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Suggestions search logic (static + dynamic)
  useEffect(() => {
    if (!form.place || form.place.length < 2) {
      setSuggestions([]);
      return;
    }
    const query = form.place.toLowerCase();
    const localMatches = INDIAN_CITIES.filter(c => c.name.toLowerCase().includes(query))
      .slice(0, 5);

    setSuggestions(localMatches);

    const timeout = setTimeout(async () => {
      const dynamicMatches = await searchIndianPlaces(form.place);
      if (dynamicMatches.length > 0) {
        setSuggestions(prev => {
          const names = new Set(prev.map(p => p.name));
          const merged = [...prev];
          dynamicMatches.forEach(item => {
            if (!names.has(item.name)) {
              merged.push(item);
            }
          });
          return merged.slice(0, 6);
        });
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [form.place]);

  // Geolocation detector
  function handleDetectLocation() {
    if (!navigator.geolocation) {
      setFormError("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLoading(true);
    setFormError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        const placeName = await reverseGeocode(lat, lon);
        setGeoLoading(false);
        if (placeName) {
          setForm(f => ({ ...f, place: placeName }));
          setSelectedCoords({ lat, lon });
        } else {
          setFormError("Could not detect city name automatically. Please search or enter manually.");
        }
      },
      (err) => {
        setGeoLoading(false);
        setFormError("Geolocation failed: " + err.message);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  // GSAP scroll reveals
  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(formRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 85%", once: true } }
    );
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  useEffect(() => {
    if (!labelsRef.current) return;
    const els = labelsRef.current.querySelectorAll(".reveal-tag");
    gsap.fromTo(els,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: labelsRef.current, start: "top 88%", once: true } }
    );
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (e.target.name === "place") {
      setSelectedCoords(null);
      setShowSuggestions(true);
    }
    setFormError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.date || !form.time || !form.place) {
      setFormError("Please complete all four fields."); return;
    }
    setFormError(""); reset();

    let lat = selectedCoords?.lat;
    let lon = selectedCoords?.lon;

    if (lat === undefined || lon === undefined) {
      const geo = await geocodePlace(form.place);
      if (!geo) {
        setFormError("Could not geocode that location. Try a major city name.");
        return;
      }
      lat = geo.lat;
      lon = geo.lon;
    }

    const data: BirthData = { ...form, latitude: lat, longitude: lon };
    setBirthData(data);
    generateKundali(
      { data: { name: form.name, date: form.date, time: form.time, latitude: lat, longitude: lon, place: form.place } },
      { onSuccess: () => setActiveTab("crystals") },
    );
  }

  const handleAddCrystal = (crystal: string) => {
    const match = products.find(p =>
      p.name.toLowerCase().includes(crystal.toLowerCase()) ||
      (p.gemstone && crystal.toLowerCase().includes(p.gemstone.toLowerCase()))
    );
    if (match) addToCart(match);
  };

  const tabs = [
    { id: "chart",    label: "Birth Chart"      },
    { id: "planets",  label: "Planets"           },
    { id: "crystals", label: "Crystal Remedies"  },
    { id: "yogas",    label: "Yogas & Doshas"    },
    { id: "dasha",    label: "Dasha & Panchang"  },
  ] as const;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen text-[#3d2115]"
      style={{ background: "linear-gradient(180deg, #fdf3ec 0%, #fbe6d9 45%, #fdf3ec 100%)" }}
    >
      <Header />


      {/* KUNDALI INTRO */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #2a1f1a 0%, #1e1410 100%)" }}>
        <SparkleField count={20} />
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-20 md:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-4">Free Vedic Reading</p>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight mb-6">
              Your Kundali <br />
              <span className="italic text-[#c8a951]">The Blueprint of Your Soul</span>
            </h1>
            <p className="text-[#fdf8f4]/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8">
              In Vedic astrology, your Kundali is a precise cosmic map of the sky at the moment you were born. It reveals your dharma, karma, relationships, health, wealth, and spiritual path — all encoded in the positions of nine planets across twelve houses.
            </p>
            <a href="#kundali-calc">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#2a1f1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Generate My Kundali
              </motion.span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fdf8f4 0%, #f7ebe1 100%)" }}>
        <div className="max-w-[1140px] mx-auto relative z-10">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Included in Every Reading</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2a1f1a]">What You Receive</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { tag: "Ascendant & Moon", title: "Lagna & Rashi Chart", desc: "Your Ascendant, Moon sign, and complete D1 birth chart showing all 9 planets across 12 houses." },
              { tag: "Navagraha Sidereal", title: "Planetary Positions", desc: "Precise sidereal longitudes for all Navagrahas including Rahu & Ketu, with dignity and retrograde states." },
              { tag: "27-Star System", title: "Nakshatra Reading", desc: "Your Moon Nakshatra, Nakshatra lord, and pada — the 27-star system that adds unmatched depth." },
              { tag: "Lifetime Timeline", title: "Vimshottari Dasha", desc: "Your full lifetime Dasha sequence, including the current Mahadasha and Antardasha with exact dates." },
              { tag: "Planetary Combos", title: "Yogas & Doshas", desc: "Automatic detection of auspicious Yogas (Raj Yoga, Gaja Kesari) and Doshas (Mangal, Kaal Sarp)." },
              { tag: "Gemstone Remedies", title: "Crystal Prescriptions", desc: "Personalised gemstone recommendations based on your planetary placements — add directly to cart." },
            ].map((item, i) => (
              <motion.div key={item.title}
                className="border border-[#c8a951]/30 p-8 bg-white/90 shadow-md backdrop-blur-md rounded-sm flex flex-col justify-between group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                whileHover={{ borderColor: "rgba(200,169,81,0.8)", backgroundColor: "#ffffff", y: -4, boxShadow: "0 20px 40px rgba(42,31,26,0.08)" }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e8d9cf]">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a5762a]">{item.tag}</span>
                    <span className="text-[#c8a951] text-xs group-hover:scale-125 transition-transform">✦</span>
                  </div>
                  <h3 className="font-serif text-[#2a1f1a] text-xl font-normal mb-3 group-hover:text-[#a5762a] transition-colors">{item.title}</h3>
                  <p className="text-xs md:text-sm text-[#4a3020]/80 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6" style={{ background: "#3d2115" }}>
        <div className="max-w-[800px] mx-auto">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Simple & Free</p>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white">How It Works</h2>
          </motion.div>
          <div className="space-y-0">
            {[
              { n: "01", title: "Enter Your Birth Details", desc: "Provide your name, date of birth, exact birth time, and birth place. The more precise your birth time, the more accurate your Lagna." },
              { n: "02", title: "Jyotish Engine Calculates", desc: "Our VSOP87-based astronomy engine computes your sidereal planetary positions using Lahiri Ayanamsa — the standard used by Indian Vedic astrology." },
              { n: "03", title: "Receive Your Full Chart", desc: "Instantly view your complete Kundali — birth chart, planetary positions, Nakshatras, Dasha timeline, Panchang, Yogas, Doshas, and crystal prescriptions." },
            ].map((step, i) => (
              <motion.div key={step.n} className="flex gap-8 pb-10 relative"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                {i < 2 && <div className="absolute left-[22px] top-12 bottom-0 w-px bg-[#c8a951]/20" />}
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-[#c8a951]/40 bg-[#c8a951]/10 z-10">
                  <span className="text-xs font-bold text-[#c8a951]">{step.n}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-serif text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center mt-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          >
            <a href="#kundali-calc">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#2a1f1a] px-10 py-4 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Launch the Kundali App
              </motion.span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CALCULATOR ANCHOR */}
      <div id="kundali-calc" />
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "min(560px, 70vw)" }}>
        <SparkleField count={26} />

        {/* Soft blush glows + botanical corners */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[6%] left-[10%] w-96 h-96 rounded-full blur-[110px]"
            style={{ background: "radial-gradient(circle, rgba(200,169,81,0.16) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-[8%] w-72 h-72 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(233,178,150,0.28) 0%, transparent 70%)" }} />
          <div className="absolute -top-6 -left-6 opacity-90"><CornerLeaves /></div>
          <div className="absolute bottom-0 right-0 opacity-80"><CornerLeaves flip /></div>
          {/* Botanical vine branches flanking the mandala — responsive */}
          <img
            src={leafBranch.src}
            alt=""
            aria-hidden="true"
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-[70%] md:h-[85%] w-auto opacity-70 md:opacity-80 pointer-events-none select-none -translate-x-4 md:-translate-x-2"
            style={{ maxWidth: "22vw" }}
          />
          <img
            src={leafBranch.src}
            alt=""
            aria-hidden="true"
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-[70%] md:h-[85%] w-auto opacity-70 md:opacity-80 pointer-events-none select-none translate-x-4 md:translate-x-2 scale-x-[-1]"
            style={{ maxWidth: "22vw" }}
          />
          {/* Mobile: smaller top-corner accents */}
          <img
            src={leafBranch.src}
            alt=""
            aria-hidden="true"
            className="sm:hidden absolute -left-6 top-4 h-40 w-auto opacity-60 pointer-events-none select-none"
          />
          <img
            src={leafBranch.src}
            alt=""
            aria-hidden="true"
            className="sm:hidden absolute -right-6 bottom-4 h-40 w-auto opacity-60 pointer-events-none select-none scale-x-[-1]"
          />
          {/* faint mandala watermark ring, top-right */}
          <svg className="absolute -top-10 -right-10 opacity-[0.08]" width="220" height="220" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="100" fill="none" stroke="#a5762a" strokeWidth="1" strokeDasharray="3 7"/>
            <circle cx="110" cy="110" r="70" fill="none" stroke="#a5762a" strokeWidth="1"/>
          </svg>
        </div>

        <motion.div
          className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20 max-w-[960px] mx-auto"
          style={{ y: heroY, opacity: heroOp }}
        >
          {/* Mandala */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <VedicMandala lagna={result ? (result.lagna - 1) : 0} />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center md:text-left max-w-[360px]"
          >
            {/* Label line — no icons, just geometry */}
            <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Vedic Jyotish</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>

            <h1 className="text-5xl md:text-6xl font-normal leading-none mb-4 text-[#4a2b12]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", letterSpacing: "-0.02em" }}
            >
              Your Kundali
            </h1>

            {/* Flourish divider */}
            <div className="flex items-center gap-2 mb-5 justify-center md:justify-start">
              <div className="h-px w-10 bg-[#c8a951]/50" />
              <span className="text-[#c8a951]"><IconLotusPetal /></span>
              <div className="h-px w-10 bg-[#c8a951]/50" />
            </div>

            <p className="text-sm text-[#6b5645] leading-relaxed mb-8">
              Discover your Vedic birth chart, nakshatra, planetary positions, yogas — and the crystals the universe has aligned for your soul.
            </p>

            {/* Tags — colourful pills, one per topic */}
            <div ref={labelsRef} className="flex flex-wrap gap-2 justify-center md:justify-start">
              {[
                { label: "Lahiri Ayanamsa", icon: <IconMandalaDot />, color: "#1f8a6f", bg: "rgba(31,138,111,0.08)", border: "rgba(31,138,111,0.25)" },
                { label: "Vedic Sidereal",  icon: <IconFlame />,      color: "#c1622f", bg: "rgba(193,98,47,0.08)",  border: "rgba(193,98,47,0.25)" },
                { label: "9 Grahas",        icon: <IconLotusPetal />, color: "#5f8a3e", bg: "rgba(95,138,62,0.08)",  border: "rgba(95,138,62,0.25)" },
                { label: "27 Nakshatras",   icon: <IconStarBurst />,  color: "#8558a8", bg: "rgba(133,88,168,0.08)", border: "rgba(133,88,168,0.25)" },
              ].map(tag => (
                <span key={tag.label}
                  className="reveal-tag flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] px-3.5 py-2 rounded-full"
                  style={{ border: `1px solid ${tag.border}`, background: tag.bg, color: tag.color }}
                >
                  {tag.icon}
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to top, #fdf3ec, transparent)" }} />
      </div>

      {/* ── FORM ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-[860px] mx-auto px-5 md:px-8 pt-6 pb-14">

        <form ref={formRef} onSubmit={handleSubmit} className="relative mb-12" style={{ opacity: 0 }}>
          {/* Outer border */}
          <div className="relative" style={{ border: "1px solid rgba(184,134,58,0.3)", background: "rgba(255,255,255,0.5)" }}>

            {/* Corner accents */}
            {(["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"] as const).map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-5 h-5 pointer-events-none`}>
                <div className={`absolute top-0 ${i%2===0?"left-0":"right-0"} w-5 h-px bg-[#c8a951]`} />
                <div className={`absolute ${i<2?"top-0":"bottom-0"} ${i%2===0?"left-0":"right-0"} h-5 w-px bg-[#c8a951]`} />
              </div>
            ))}

            <div className="p-6 md:p-10">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-4 bg-[#c8a951]" />
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#a5762a]">Enter Birth Details</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">

                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5c4636] mb-2">
                    <span className="text-[#c8a951]"><IconPerson /></span>Full Name
                  </label>
                  <input name="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-3.5 text-sm text-[#3d2115] outline-none transition-all placeholder:text-[#c2b3a3]"
                    style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(184,134,58,0.4)" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(184,134,58,0.8)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(184,134,58,0.4)"; }}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5c4636] mb-2">
                    <span className="text-[#c8a951]"><IconCalendar /></span>Date of Birth
                  </label>
                  <input name="date" type="date" value={form.date} onChange={handleChange}
                    className="w-full px-4 py-3.5 text-sm text-[#3d2115] outline-none transition-all [color-scheme:light]"
                    style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(184,134,58,0.4)" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(184,134,58,0.8)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(184,134,58,0.4)"; }}
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5c4636] mb-2">
                    <span className="text-[#c8a951]"><IconClock /></span>Time of Birth
                  </label>
                  <input name="time" type="time" value={form.time} onChange={handleChange}
                    className="w-full px-4 py-3.5 text-sm text-[#3d2115] outline-none transition-all [color-scheme:light]"
                    style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(184,134,58,0.4)" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "rgba(184,134,58,0.8)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "rgba(184,134,58,0.4)"; }}
                  />
                </div>

                {/* Place */}
                <div className="sm:col-span-2 relative">
                  <div className="flex justify-between items-center mb-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5c4636]">
                      <span className="text-[#c8a951]"><IconPin /></span>Place of Birth
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={geoLoading}
                      className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] hover:text-[#c8a951] disabled:opacity-50 transition-colors flex items-center gap-1"
                    >
                      {geoLoading ? (
                        <>Detecting...</>
                      ) : (
                        <>Auto-detect</>
                      )}
                    </button>
                  </div>
                  <input name="place" type="text" value={form.place} onChange={handleChange}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = "rgba(184,134,58,0.8)";
                      if (suggestions.length > 0) setShowSuggestions(true);
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = "rgba(184,134,58,0.4)";
                    }}
                    placeholder="e.g. Mumbai, India"
                    className="w-full px-4 py-3.5 text-sm text-[#3d2115] outline-none transition-all placeholder:text-[#c2b3a3]"
                    style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(184,134,58,0.4)" }}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto"
                      style={{
                        background: "#fffdf9",
                        border: "1px solid rgba(184, 134, 58, 0.3)",
                        boxShadow: "0 4px 12px rgba(74, 43, 18, 0.08)",
                      }}
                    >
                      {suggestions.map((s, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setForm(f => ({ ...f, place: s.name }));
                            setSelectedCoords({ lat: s.lat, lon: s.lon });
                            setShowSuggestions(false);
                          }}
                          className="px-4 py-2.5 text-xs text-[#5c4636] hover:bg-[#c8a951]/10 cursor-pointer border-b border-[#c8a951]/10 last:border-0 transition-colors"
                        >
                          {s.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] text-red-600/90 mb-5 tracking-wide"
                >{error}</motion.p>
              )}

              {/* Submit */}
              <motion.button type="submit" disabled={loading}
                className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.25em] disabled:opacity-50 relative overflow-hidden flex items-center justify-center gap-3"
                style={{ background: "#c8a951", color: "#fffaf2" }}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
              >
                {loading ? (
                  <>
                    <motion.div className="w-4 h-4 border border-[#fffaf2]/40 border-t-[#fffaf2] rounded-full"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                    />
                    Consulting the Stars
                  </>
                ) : (
                  <>Generate My Kundali</>
                )}
              </motion.button>

              <p className="text-[7.5px] text-[#b3a494] text-center mt-4 uppercase tracking-widest">
                Lahiri Ayanamsa · Vedic Sidereal System · Geocoded via OpenStreetMap
              </p>
            </div>
          </div>
        </form>

        {/* ── RESULTS ──────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {result && birthData && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* Summary banner */}
              <div className="relative mb-7 overflow-hidden" style={{ border: "1px solid rgba(200,169,81,0.2)", background: "rgba(200,169,81,0.04)" }}>
                <SparkleField count={14} />
                <div className="relative z-10 p-7 md:p-9">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-7">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-1.5">Kundali for</p>
                      <h2 className="text-2xl font-serif font-light text-[#3d2115]">{birthData.name}</h2>
                      <p className="text-[10px] text-[#a89686] mt-1 font-mono">{birthData.date} · {birthData.time} · {birthData.place}</p>
                    </div>
                    <motion.button onClick={() => { reset(); setBirthData(null); }}
                      className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#a89686] hover:text-[#6b5645] transition-colors self-start"
                      whileHover={{ x: -2 }}
                    >
                      <IconReset /> New Chart
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Lagna",    value: result.lagnaName },
                      { label: "Moon",     value: result.moonSign },
                      { label: "Sun",      value: result.sunSign },
                      { label: "Nakshatra",value: `${result.nakshatra} P${result.nakshatraPada}` },
                    ].map((item, i) => (
                      <motion.div key={item.label}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.07 }}
                        className="p-3.5"
                        style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(184,134,58,0.16)" }}
                      >
                        <p className="text-[7.5px] font-bold uppercase tracking-widest text-[#a89686] mb-1.5">{item.label}</p>
                        <p className="text-sm font-medium text-[#3d2115]">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info pills */}
              <div className="flex flex-wrap gap-2 mb-7">
                {[
                  { label: "Current Dasha",  value: `${result.currentDasha.lord} · ${result.currentDasha.years} yrs` },
                  { label: "Nakshatra Lord", value: result.nakshatraLord },
                  { label: "Lagna Lord",     value: RASHIS[result.lagna - 1].ruler },
                ].map(pill => (
                  <motion.div key={pill.label}
                    className="flex gap-2 items-center px-4 py-2"
                    style={{ border: "1px solid rgba(184,134,58,0.4)", background: "rgba(255,255,255,0.7)" }}
                    whileHover={{ borderColor: "rgba(200,169,81,0.5)" }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#5c4636]">{pill.label}</span>
                    <div className="w-px h-3 bg-[#c2b3a3]/60" />
                    <span className="text-[12px] font-semibold text-[#3d2115]">{pill.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex mb-7 overflow-x-auto" style={{ borderBottom: "1px solid rgba(184,134,58,0.4)" }}>
                {tabs.map(tab => (
                  <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className="px-5 md:px-7 py-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap relative"
                    style={{ color: activeTab === tab.id ? "#8c5e1c" : "#7a6251" }}
                    whileHover={{ color: activeTab !== tab.id ? "#4a2c11" : "#8c5e1c" }}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div layoutId="tab-line"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: "#8c5e1c" }}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                >
                  {activeTab === "chart" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-4">D1 — Janma Kundali (North Indian)</p>
                        <KundaliChart result={result} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-4">Chart Summary</p>
                        <div style={{ border: "1px solid rgba(184,134,58,0.3)" }}>
                          {[
                            { label: "Ascendant",      val: `${result.lagnaName} ${result.lagnaLongitude.toFixed(2)}°` },
                            { label: "Moon Sign",      val: result.moonSign },
                            { label: "Sun Sign",       val: result.sunSign },
                            { label: "Nakshatra",      val: `${result.nakshatra}, Pada ${result.nakshatraPada}` },
                            { label: "Nakshatra Lord", val: result.nakshatraLord },
                            { label: "Dasha",          val: `${result.currentDasha.lord} (${result.currentDasha.years} yrs)` },
                          ].map((r, i) => (
                            <motion.div key={r.label}
                              className="flex justify-between px-4 py-3"
                              style={{ borderBottom: "1px solid rgba(120,80,40,0.15)" }}
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                              whileHover={{ backgroundColor: "rgba(200,169,81,0.04)" }}
                            >
                              <span className="text-[9px] uppercase tracking-widest text-[#6b5645] font-bold">{r.label}</span>
                              <span className="text-[11px] font-semibold text-[#3d2115]">{r.val}</span>
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-[9.5px] text-[#6b5645] leading-relaxed mt-3">
                          Approximate positions using Lahiri Ayanamsa. For precise readings consult a Jyotishi.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "planets" && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-5">Graha Positions</p>
                      <div style={{ border: "1px solid rgba(184,134,58,0.3)" }}>
                        <PlanetTable planets={result.planets} />
                      </div>
                      <p className="text-[9.5px] text-[#6b5645] mt-3">ᴿ = Retrograde. Houses counted from Lagna.</p>
                    </div>
                  )}

                  {activeTab === "crystals" && (
                    <div>
                      <div className="mb-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-1.5">Personalised Crystal Remedies</p>
                        <p className="text-xs text-[#5c4636]">Based on your Lagna lord, Moon sign, and planetary strengths</p>
                      </div>
                      <div className="space-y-3 mb-8">
                        {result.crystalRecommendations.map((rec, i) => (
                          <CrystalCard key={i} rec={rec} delay={i * 0.1} onAdd={() => handleAddCrystal(rec.crystal)} />
                        ))}
                      </div>
                      <motion.div
                        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-5"
                        style={{ border: "1px solid rgba(200,169,81,0.35)", background: "rgba(255,255,255,0.7)" }}
                        whileHover={{ borderColor: "rgba(200,169,81,0.5)" }}
                      >
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-1.5">
                            {result.lagnaName} Rising Collection
                          </p>
                          <p className="text-xs text-[#4a2c11] leading-relaxed max-w-sm">
                            Crystals curated for your Lagna — worn as jewellery they continuously strengthen your energy field.
                          </p>
                        </div>
                        <motion.button onClick={() => navigate("/shop")}
                          className="shrink-0 flex items-center gap-2.5 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest"
                          style={{ border: "1px solid rgba(200,169,81,0.5)", color: "#c8a951" }}
                          whileHover={{ backgroundColor: "#c8a951", color: "#fffaf2" }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.18 }}
                        >
                          Explore Shop <IconArrow />
                        </motion.button>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === "yogas" && (
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-5">Yogas Detected</p>
                        <div className="space-y-3">
                          {result.yogas.map((yoga, i) => (
                            <YogaCard key={yoga.name} yoga={yoga} i={i} />
                          ))}
                        </div>
                      </div>

                      {result.doshas && result.doshas.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-5 mt-8">Doshas & Remedies</p>
                          <div className="space-y-3">
                            {result.doshas.map((dosha, i) => (
                              <motion.div key={dosha.name}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.08 }}
                                className="p-4"
                                style={{ border: "1px solid rgba(220,90,90,0.35)", background: "rgba(220,90,90,0.06)" }}
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-red-600/80">{dosha.name}</p>
                                  <span className="text-[7px] font-bold uppercase tracking-wider px-2 py-0.5"
                                    style={{ border: "1px solid rgba(239,68,68,0.35)", color: "#f87171" }}
                                  >{dosha.severity}</span>
                                </div>
                                <p className="text-xs text-[#5c4636] leading-relaxed mb-1.5">{dosha.description}</p>
                                <p className="text-[10px] text-[#8c5e1c] font-medium italic">Remedy: {dosha.remedy}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "dasha" && (
                    <div className="space-y-8">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-1.5">Vimshottari Mahadasha Timeline</p>
                        <p className="text-xs text-[#5c4636] mb-5">The nine planetary periods that structure the arc of this lifetime</p>
                        <div style={{ border: "1px solid rgba(184,134,58,0.3)" }}>
                          {result.dashaSequence.map((d, i) => {
                            const isCurrent = d.lord === result.currentDasha.lord && d.startDate === result.currentDasha.startDate;
                            return (
                              <motion.div key={`${d.lord}-${d.startDate}`}
                                className="flex items-center justify-between px-4 py-3 gap-4"
                                style={{ borderBottom: "1px solid rgba(120,80,40,0.15)", background: isCurrent ? "rgba(200,169,81,0.06)" : "transparent" }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                              >
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: isCurrent ? "#8c5e1c" : "#5c4636" }}>
                                  {d.lord}{isCurrent ? " · Now" : ""}
                                </span>
                                <span className="text-[11px] font-mono text-[#3d2115] font-semibold">{d.startDate} → {d.endDate}</span>
                                <span className="text-[10px] font-mono text-[#5c4636] font-medium">{d.years.toFixed(1)} yrs</span>
                              </motion.div>
                            );
                          })}
                        </div>
                        {result.currentDasha.antardashas && (
                          <>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-3 mt-6">
                              {result.currentDasha.lord} Mahadasha — Antardasha Sub-periods
                            </p>
                            <div style={{ border: "1px solid rgba(184,134,58,0.3)" }}>
                              {result.currentDasha.antardashas.map((ad) => {
                                const isCurrentAd = result.currentAntardasha && ad.lord === result.currentAntardasha.lord && ad.startDate === result.currentAntardasha.startDate;
                                return (
                                  <div key={`${ad.lord}-${ad.startDate}`}
                                    className="flex items-center justify-between px-4 py-2.5"
                                    style={{ borderBottom: "1px solid rgba(120,80,40,0.15)", background: isCurrentAd ? "rgba(200,169,81,0.06)" : "transparent" }}
                                  >
                                    <span className="text-[9px] uppercase tracking-widest" style={{ color: isCurrentAd ? "#8c5e1c" : "#5c4636" }}>
                                      {ad.lord}{isCurrentAd ? " · Now" : ""}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#3d2115] font-semibold">{ad.startDate} → {ad.endDate}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5c4636] mb-1.5">Panchang at Birth</p>
                        <p className="text-xs text-[#5c4636] mb-5">The five limbs of the Vedic almanac for this exact moment</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { label: "Tithi", value: `${result.panchang.tithi} (${result.panchang.paksha} Paksha)` },
                            { label: "Nakshatra", value: `${result.panchang.nakshatra} · Pada ${result.panchang.nakshatraPada}` },
                            { label: "Nitya Yoga", value: result.panchang.yogaName },
                            { label: "Karana", value: result.panchang.karana },
                            { label: "Vara", value: result.panchang.vara },
                            { label: "Ayanamsa", value: `${result.ayanamsa.toFixed(4)}°` },
                            { label: "Sunrise", value: result.panchang.sunrise },
                            { label: "Sunset", value: result.panchang.sunset },
                          ].map((item) => (
                            <div key={item.label} className="p-3.5" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(184,134,58,0.22)" }}>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-[#6b5645] mb-1.5">{item.label}</p>
                              <p className="text-sm font-semibold text-[#3d2115]">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
