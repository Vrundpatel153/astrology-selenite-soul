"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Compass, BookOpen } from "lucide-react";
import { Link } from "wouter";
import {
  CHALDEAN_LETTER_MAP,
  CHALDEAN_ARCHETYPES,
  calculateDriverNumber,
  calculateDestinyNumber,
  calculateChaldeanName,
  calculateChaldeanCompatibility,
} from "@/lib/chaldeanNumerology";

export { CHALDEAN_ARCHETYPES as NUMEROLOGY_ARCHETYPES };

export default function InteractiveNumerologyMatrix({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"birth" | "name" | "alphabet">("birth");
  const [birthDate, setBirthDate] = useState("1996-08-15");
  const [nameInput, setNameInput] = useState("Ektaz Shah");

  // Birth date calculations
  const driverData = calculateDriverNumber(birthDate);
  const destinyData = calculateDestinyNumber(birthDate);
  const driverArch = CHALDEAN_ARCHETYPES[driverData.driverNumber] || CHALDEAN_ARCHETYPES[1];
  const destinyArch = CHALDEAN_ARCHETYPES[destinyData.destinyNumber] || CHALDEAN_ARCHETYPES[1];
  const birthSynergy = calculateChaldeanCompatibility(driverData.driverNumber, destinyData.destinyNumber);

  // Name calculation
  const nameData = calculateChaldeanName(nameInput);
  const nameArch = CHALDEAN_ARCHETYPES[nameData.rootNumber] || CHALDEAN_ARCHETYPES[1];
  const nameToDriverSynergy = calculateChaldeanCompatibility(nameData.rootNumber, driverData.driverNumber);
  const nameToDestinySynergy = calculateChaldeanCompatibility(nameData.rootNumber, destinyData.destinyNumber);

  // Alphabet table groups for the Chaldean sound frequency reference
  const alphabetByNumber: Record<number, string[]> = {
    1: ["A", "I", "J", "Q", "Y"],
    2: ["B", "K", "R"],
    3: ["C", "G", "L", "S"],
    4: ["D", "M", "T"],
    5: ["E", "H", "N", "X"],
    6: ["U", "V", "W"],
    7: ["O", "Z"],
    8: ["F", "P"],
  };

  return (
    <div className={`w-full max-w-[1320px] mx-auto ${className}`}>
      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 w-full max-w-2xl mx-auto">
        <button
          onClick={() => setActiveTab("birth")}
          className={`px-5 sm:px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all border text-center cursor-pointer ${
            activeTab === "birth"
              ? "bg-[#c8a951] text-[#1a0e05] border-[#c8a951] shadow-md shadow-[#c8a951]/20 font-bold"
              : "bg-white/90 text-[#2a1f1a] border-[#e8d9cf] hover:border-[#c8a951]"
          }`}
        >
          Driver & Destiny (Birth Blueprint)
        </button>
        <button
          onClick={() => setActiveTab("name")}
          className={`px-5 sm:px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all border text-center cursor-pointer ${
            activeTab === "name"
              ? "bg-[#c8a951] text-[#1a0e05] border-[#c8a951] shadow-md shadow-[#c8a951]/20 font-bold"
              : "bg-white/90 text-[#2a1f1a] border-[#e8d9cf] hover:border-[#c8a951]"
          }`}
        >
          Name Vibration & Compound Number
        </button>
        <button
          onClick={() => setActiveTab("alphabet")}
          className={`px-5 sm:px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all border text-center cursor-pointer ${
            activeTab === "alphabet"
              ? "bg-[#c8a951] text-[#1a0e05] border-[#c8a951] shadow-md shadow-[#c8a951]/20 font-bold"
              : "bg-white/90 text-[#2a1f1a] border-[#e8d9cf] hover:border-[#c8a951]"
          }`}
        >
          Chaldean Sound Matrix (1 to 8)
        </button>
      </div>

      {/* ── TAB 1: DRIVER & DESTINY (BIRTH BLUEPRINT) ────────────────────────── */}
      {activeTab === "birth" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Controls Bar */}
          <div className="bg-white/95 border border-[#c8a951]/35 p-6 sm:p-8 rounded-sm shadow-xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 items-center">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#a5762a] mb-2">
                  Select Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-[#fdf8f4] border border-[#c8a951]/40 text-[#2a1f1a] px-4 py-3 rounded-sm outline-none focus:border-[#c8a951] text-sm [color-scheme:light]"
                />
                <p className="text-[11px] text-[#665242] mt-2 font-light">
                  Chaldean calculation derives two distinct cosmic forces: Driver (Moolank) and Destiny (Bhagyank).
                </p>
              </div>

              <div className="p-5 bg-[#fcf8f4] border border-[#e8d9cf] rounded-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a]">
                    Chaldean Formula Breakdown
                  </span>
                  <span className="text-[9px] px-2.5 py-0.5 bg-[#c8a951]/15 text-[#a5762a] font-bold uppercase tracking-wider rounded-full">
                    Ancient Babylonian Method
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white border border-[#e8d9cf] rounded-sm">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#665242]">Driver (Day of Birth)</p>
                    <p className="text-xs font-mono text-[#2a1f1a] mt-0.5">{driverData.breakdown}</p>
                  </div>
                  <div className="p-3 bg-white border border-[#e8d9cf] rounded-sm">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#665242]">Destiny (Full Sum)</p>
                    <p className="text-xs font-mono text-[#2a1f1a] mt-0.5">{destinyData.breakdown}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Dossiers: Driver & Destiny Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Driver Number Card */}
            <div className="bg-white/95 border border-[#c8a951]/40 p-7 sm:p-9 rounded-sm shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between pb-5 border-b border-[#e8d9cf] mb-6">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a] block mb-1">
                      Psychic / Driver Number (Moolank)
                    </span>
                    <h3 className="text-2xl font-light text-[#2a1f1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {driverArch.title}
                    </h3>
                    <p className="text-xs text-[#665242] mt-0.5">
                      Ruled by {driverArch.planet} ({driverArch.vedicPlanet})
                    </p>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#fdf8f4] border-2 border-[#c8a951]/60 flex items-center justify-center rounded-sm shrink-0">
                    <span className="text-4xl sm:text-5xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {driverData.driverNumber}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {driverArch.keywords.map((kw) => (
                    <span key={kw} className="text-[9px] font-bold uppercase tracking-wider text-[#2a1f1a] bg-[#f5ede4] border border-[#e8d9cf] px-2 py-0.5">
                      {kw}
                    </span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#4a382e] leading-relaxed font-light mb-6">
                  {driverArch.description}
                </p>

                <div className="space-y-3 p-4 bg-[#fdf8f4] border-l-2 border-[#c8a951] mb-6 text-xs">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] block">Core Role</span>
                    <p className="text-[#2a1f1a] font-light mt-0.5">
                      Governs innate personality, instinctive drives, and inner desires (dominant age 0 to 35).
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] block">Sacred Gemstone</span>
                    <p className="text-[#2a1f1a] font-medium mt-0.5">{driverArch.crystal}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] block">Auspicious Day & Color</span>
                    <p className="text-[#2a1f1a] font-light mt-0.5">{driverArch.luckyDay} | {driverArch.luckyColor}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e8d9cf] flex items-center justify-between">
                <span className="text-[10px] text-[#665242]">Inner Soul Frequency</span>
                <Link href="/shop">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#a5762a] hover:text-[#2a1f1a] cursor-pointer">
                    View Crystal Remedy <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Destiny Number Card */}
            <div className="bg-white/95 border border-[#c8a951]/40 p-7 sm:p-9 rounded-sm shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between pb-5 border-b border-[#e8d9cf] mb-6">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a] block mb-1">
                      Destiny / Conductor Number (Bhagyank)
                    </span>
                    <h3 className="text-2xl font-light text-[#2a1f1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {destinyArch.title}
                    </h3>
                    <p className="text-xs text-[#665242] mt-0.5">
                      Ruled by {destinyArch.planet} ({destinyArch.vedicPlanet})
                    </p>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#fdf8f4] border-2 border-[#c8a951]/60 flex items-center justify-center rounded-sm shrink-0">
                    <span className="text-4xl sm:text-5xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {destinyData.destinyNumber}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {destinyArch.keywords.map((kw) => (
                    <span key={kw} className="text-[9px] font-bold uppercase tracking-wider text-[#2a1f1a] bg-[#f5ede4] border border-[#e8d9cf] px-2 py-0.5">
                      {kw}
                    </span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#4a382e] leading-relaxed font-light mb-6">
                  {destinyArch.description}
                </p>

                <div className="space-y-3 p-4 bg-[#fdf8f4] border-l-2 border-[#c8a951] mb-6 text-xs">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] block">Karmic Destiny</span>
                    <p className="text-[#2a1f1a] font-light mt-0.5">
                      Governs life mission, career trajectory, and worldly achievements (dominant age 35 and onwards).
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] block">Soul Mission</span>
                    <p className="text-[#2a1f1a] font-light mt-0.5">{destinyArch.soulMission}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] block">Sacred Gemstone</span>
                    <p className="text-[#2a1f1a] font-medium mt-0.5">{destinyArch.crystal}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e8d9cf] flex items-center justify-between">
                <span className="text-[10px] text-[#665242]">Outer Karmic Trajectory</span>
                <Link href="/tarot#book">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#a5762a] hover:text-[#2a1f1a] cursor-pointer">
                    Book Life Path Reading <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Planetary Synergy Banner */}
          <div className="p-6 bg-[#fcf8f4] border border-[#c8a951]/50 rounded-sm flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a]">
                  Planetary Alignment: Driver ({driverData.driverNumber}) vs Destiny ({destinyData.destinyNumber})
                </span>
                <span className="px-2 py-0.5 bg-[#c8a951]/20 text-[#a5762a] text-[9px] font-bold rounded-full uppercase">
                  {birthSynergy.relation} Vibration
                </span>
              </div>
              <p className="text-xs text-[#4a382e] font-light max-w-3xl leading-relaxed">
                {birthSynergy.description}
              </p>
            </div>
            <div className="text-center shrink-0">
              <span className="text-2xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {birthSynergy.score}%
              </span>
              <p className="text-[8px] uppercase tracking-wider text-[#665242]">Resonance</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── TAB 2: NAME VIBRATION & COMPOUND NUMBER (CHALDEAN) ────────────────── */}
      {activeTab === "name" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Controls Bar */}
          <div className="bg-white/95 border border-[#c8a951]/35 p-6 sm:p-8 rounded-sm shadow-xl backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 items-center">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#a5762a] mb-2">
                  Enter Your Full Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Ektaz Shah"
                  className="w-full bg-[#fdf8f4] border border-[#c8a951]/40 text-[#2a1f1a] px-4 py-3 rounded-sm outline-none focus:border-[#c8a951] text-sm placeholder:text-[#2a1f1a]/30"
                />
                <p className="text-[11px] text-[#665242] mt-2 font-light">
                  Chaldean letters translate to sound frequencies 1 through 8. No letter is assigned the sacred number 9.
                </p>
              </div>

              {/* Sound Letter Display */}
              <div className="p-5 bg-[#fcf8f4] border border-[#e8d9cf] rounded-sm">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a] block mb-3">
                  Letter Sound Vibrations (Chaldean Numerical Values)
                </span>
                <div className="flex flex-wrap gap-2 mb-3">
                  {nameData.letters.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center bg-white border border-[#c8a951]/40 px-2.5 py-1 rounded-sm shadow-sm min-w-[28px]"
                    >
                      <span className="text-xs font-bold text-[#2a1f1a]">{item.char}</span>
                      <span className="text-[9px] text-[#a5762a] font-mono font-semibold">{item.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-mono text-[#2a1f1a]">
                  Sum: <strong className="text-[#a5762a]">{nameData.compoundSum}</strong> (Compound) → Root Single Number:{" "}
                  <strong className="text-[#a5762a]">{nameData.rootNumber}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Result Card: Compound and Root */}
          <div className="bg-white/95 border border-[#c8a951]/40 p-8 sm:p-10 rounded-sm shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
              {/* Emblem with Compound + Single Root */}
              <div className="flex flex-col items-center justify-center p-8 bg-[#fdf8f4] border-2 border-[#c8a951]/60 rounded-sm text-center shadow-lg">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-6xl sm:text-7xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {nameData.compoundSum}
                  </span>
                  <span className="text-2xl text-[#665242] font-light">/</span>
                  <span className="text-4xl font-light text-[#2a1f1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {nameData.rootNumber}
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a5762a] border-t border-[#c8a951]/30 pt-3 w-full">
                  Compound {nameData.compoundSum} · Root {nameData.rootNumber}
                </span>
                <span className="text-[9px] font-semibold text-[#665242] mt-1">
                  Ruled by {nameArch.planet} ({nameArch.vedicPlanet})
                </span>
              </div>

              {/* In-depth Compound & Root Meaning */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-[#c8a951]/15 text-[#a5762a] border border-[#c8a951]/30 rounded-full">
                    Chaldean Compound Name
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#665242]">
                    Status: {nameData.compoundInfo?.fortune}
                  </span>
                </div>

                <h3 className="text-3xl font-light text-[#2a1f1a] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {nameData.compoundInfo?.name}
                </h3>
                <p className="text-xs text-[#a5762a] font-medium uppercase tracking-wider mb-4">
                  Root Vibration: {nameArch.title}
                </p>

                <div className="p-4 bg-[#fdf8f4] border-l-2 border-[#c8a951] mb-6">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1">
                    Occult / Esoteric Symbolism of Compound {nameData.compoundSum}
                  </p>
                  <p className="text-xs sm:text-sm text-[#2a1f1a] leading-relaxed font-light">
                    {nameData.compoundInfo?.symbolism}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4a382e] leading-relaxed font-light mb-6">
                  {nameArch.description}
                </p>

                {/* Compatibility with Birth Numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#fcf8f4] border border-[#e8d9cf] mb-6">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#665242] block">
                      Name ({nameData.rootNumber}) vs Driver ({driverData.driverNumber})
                    </span>
                    <p className="text-xs text-[#2a1f1a] font-medium mt-0.5">
                      {nameToDriverSynergy.relation} Harmony ({nameToDriverSynergy.score}%)
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#665242] block">
                      Name ({nameData.rootNumber}) vs Destiny ({destinyData.destinyNumber})
                    </span>
                    <p className="text-xs text-[#2a1f1a] font-medium mt-0.5">
                      {nameToDestinySynergy.relation} Harmony ({nameToDestinySynergy.score}%)
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/shop">
                    <span className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1a0e05] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] shadow-lg hover:shadow-[#c8a951]/30 transition-all cursor-pointer">
                      Shop Harmonizing Crystals <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                  <Link href="/tarot#book">
                    <span className="inline-flex items-center gap-2 border border-[#c8a951]/60 text-[#a5762a] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-[#c8a951]/10 transition-all cursor-pointer">
                      Consult Ektaz Shah on Name Correction
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── TAB 3: CHALDEAN SOUND MATRIX (ALPHABET VALUES 1 TO 8) ─────────────── */}
      {activeTab === "alphabet" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/95 border border-[#c8a951]/40 p-8 sm:p-12 rounded-sm shadow-2xl backdrop-blur-md space-y-8"
        >
          <div className="max-w-2xl">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a] block mb-1">
              Ancient Babylonian Sound Science
            </span>
            <h3 className="text-3xl font-light text-[#2a1f1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              The Sacred Chaldean Alphabet Values
            </h3>
            <p className="text-xs sm:text-sm text-[#4a382e]/80 font-light mt-2 leading-relaxed">
              Unlike Pythagorean numerology which mechanically counts from 1 to 9 in sequence, Chaldean numerology assigns values based on the acoustic sound frequency each letter emits into the astral sphere.
            </p>
          </div>

          {/* 1 to 8 Sound Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const arch = CHALDEAN_ARCHETYPES[num];
              const letters = alphabetByNumber[num] || [];
              return (
                <div
                  key={num}
                  className="p-4 bg-[#fdf8f4] border border-[#c8a951]/40 rounded-sm text-center flex flex-col justify-between hover:border-[#c8a951] hover:shadow-md transition-all"
                >
                  <div>
                    <span className="text-3xl sm:text-4xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {num}
                    </span>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#665242] mt-1">
                      {arch.planet}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5 mt-3 mb-2">
                      {letters.map((ch) => (
                        <span key={ch} className="px-2 py-0.5 bg-white border border-[#e8d9cf] font-bold text-xs text-[#2a1f1a]">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[8px] text-[#a5762a] font-medium border-t border-[#e8d9cf] pt-2 block mt-2">
                    {arch.vedicPlanet}
                  </span>
                </div>
              );
            })}
          </div>

          {/* The Mystery of Sacred Number 9 */}
          <div className="p-6 bg-[#fcf8f4] border border-[#c8a951] rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl text-[#a5762a] font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                Number 9:
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a]">
                The Sacred Unassigned Frequency
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4a382e] font-light leading-relaxed">
              In genuine Chaldean numerology, the number 9 is held sacred because it represents the highest cosmic completion and divine manifestation. No letter of the alphabet has the value of 9 because 9 disappears when added to any single digit (e.g., 9 + 4 = 13 → 4). It is only found when numbers are added together or when a person is born on the 9th, 18th, or 27th of the month.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
