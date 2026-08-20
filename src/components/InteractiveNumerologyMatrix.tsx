"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Heart, Shield, Sparkles, Hash } from "lucide-react";
import { Link } from "wouter";

const PYTHAGOREAN_TABLE: Record<string, number> = {
  a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9,
  j:1, k:2, l:3, m:4, n:5, o:6, p:7, q:8, r:9,
  s:1, t:2, u:3, v:4, w:5, x:6, y:7, z:8
};

export const NUMEROLOGY_ARCHETYPES: Record<number, {
  title: string;
  archetype: string;
  keywords: string[];
  description: string;
  mission: string;
  planet: string;
  crystal: string;
  isMaster?: boolean;
}> = {
  1: {
    title: "The Pioneer & Originator",
    archetype: "Leader",
    keywords: ["Independence", "Innovation", "Courage", "Self-Reliance"],
    description: "Number 1 vibrates with the pure creative fire of beginnings. You are destined to blaze original trails where others hesitate to walk.",
    mission: "To overcome fear of standing alone and lead with uncompromised integrity.",
    planet: "Sun",
    crystal: "Red Carnelian & Ruby",
  },
  2: {
    title: "The Sacred Mediator",
    archetype: "Peacemaker",
    keywords: ["Intuition", "Harmony", "Empathy", "Partnership"],
    description: "Number 2 possesses the gentle yet profound power of the feminine tides. You bring healing balance and intuitive reconciliation to conflicting forces.",
    mission: "To master energetic boundaries while maintaining an open, loving heart.",
    planet: "Moon",
    crystal: "Moonstone & Pearl",
  },
  3: {
    title: "The Joyful Alchemist",
    archetype: "Creator",
    keywords: ["Expression", "Inspiration", "Artistry", "Optimism"],
    description: "Number 3 is the spark of divine play and creative genius. Through words, melody, or visuals, you awaken joy in everyone you encounter.",
    mission: "To channel creative brilliance into purposeful, inspiring creations.",
    planet: "Jupiter",
    crystal: "Citrine & Yellow Topaz",
  },
  4: {
    title: "The Master Architect",
    archetype: "Builder",
    keywords: ["Stability", "Discipline", "Legacy", "Structure"],
    description: "Number 4 lays the unyielding granite foundations of reality. Reliable, methodical, and patient, you turn abstract dreams into generational empires.",
    mission: "To build enduring security without becoming trapped in rigid perfectionism.",
    planet: "Rahu / Uranus",
    crystal: "Brown Agate & Hessonite",
  },
  5: {
    title: "The Cosmic Voyager",
    archetype: "Free Spirit",
    keywords: ["Freedom", "Adventure", "Versatility", "Magnetism"],
    description: "Number 5 thrives in the dynamic winds of change. You are the seeker of truth across foreign lands, unconventional ideas, and thrilling sensory experiences.",
    mission: "To experience boundless freedom while anchoring personal discipline.",
    planet: "Mercury",
    crystal: "Green Aventurine & Emerald",
  },
  6: {
    title: "The Sacred Guardian",
    archetype: "Nurturer",
    keywords: ["Compassion", "Healing", "Beauty", "Service"],
    description: "Number 6 embodies the warmth of the cosmic hearth. Deeply empathetic and aesthetically refined, you bring sanctuary, justice, and love into chaotic spaces.",
    mission: "To nurture others while maintaining sacred self-care and sovereign boundaries.",
    planet: "Venus",
    crystal: "Rose Quartz & Diamond",
  },
  7: {
    title: "The Esoteric Mystic",
    archetype: "Seeker",
    keywords: ["Wisdom", "Spirituality", "Analysis", "Solitude"],
    description: "Number 7 walks the solitary path between scientific precision and occult mysticism. You dissect the illusions of the material world to uncover universal truth.",
    mission: "To trust inner intuitive knowing over external validation.",
    planet: "Ketu / Neptune",
    crystal: "Labradorite & Cat's Eye",
  },
  8: {
    title: "The Sovereign Manifestor",
    archetype: "Powerhouse",
    keywords: ["Abundance", "Authority", "Karmic Balance", "Mastery"],
    description: "Number 8 represents the eternal lemniscate of energy and material manifestation. You hold the executive capability to direct wealth toward noble collective evolution.",
    mission: "To master material abundance without losing spiritual humility.",
    planet: "Saturn",
    crystal: "Blue Sapphire & Amethyst",
  },
  9: {
    title: "The Universal Humanitarian",
    archetype: "Sage",
    keywords: ["Completion", "Unconditional Love", "Transcendence", "Generosity"],
    description: "Number 9 carries the cumulative wisdom of all previous numbers. An old soul with universal vision, you are here to release past cycles and uplift humanity.",
    mission: "To practice universal forgiveness and surrender attachment to outcomes.",
    planet: "Mars",
    crystal: "Red Coral & Bloodstone",
  },
  11: {
    title: "The Master Illuminator",
    archetype: "Spiritual Messenger",
    keywords: ["Visionary", "Channeller", "High Vibration", "Awakening"],
    description: "Master Number 11 acts as a living lightning rod between cosmic consciousness and physical reality. You receive profound intuitive downloads to inspire mass awakening.",
    mission: "To anchor high-frequency spiritual visions into grounded daily life.",
    planet: "Sun / Moon",
    crystal: "Selenite & Clear Quartz",
    isMaster: true,
  },
  22: {
    title: "The Master Builder of Worlds",
    archetype: "Grand Architect",
    keywords: ["Legacy", "Global Impact", "Execution", "Practical Genius"],
    description: "Master Number 22 bridges visionary idealism with monumental execution. You possess the rare capacity to construct institutions that benefit generations.",
    mission: "To direct immense organizational power solely for the highest good of humanity.",
    planet: "Saturn / Uranus",
    crystal: "Lapis Lazuli & Sodalite",
    isMaster: true,
  },
  33: {
    title: "The Master Teacher of Light",
    archetype: "Avatar of Love",
    keywords: ["Universal Compassion", "Divine Healing", "Selfless Service", "Blessing"],
    description: "Master Number 33 is the highest octave of spiritual devotion. Radiating Christ-consciousness and unconditional love, your very presence heals broken hearts.",
    mission: "To embody pure unconditional love and elevate collective vibration.",
    planet: "Jupiter / Neptune",
    crystal: "Aquamarine & Morganite",
    isMaster: true,
  },
};

function reduceNumber(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    num = String(num).split("").reduce((acc, digit) => acc + Number(digit), 0);
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
}

export default function InteractiveNumerologyMatrix({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"lifepath" | "name">("lifepath");
  const [birthDate, setBirthDate] = useState("1996-08-15");
  const [nameInput, setNameInput] = useState("Ekta Sharma");

  // Calculate Life Path
  const calculateLifePath = (dateStr: string) => {
    if (!dateStr) return { number: 7, breakdown: "" };
    const parts = dateStr.split("-").map(Number);
    if (parts.length !== 3) return { number: 7, breakdown: "" };
    const [year, month, day] = parts;
    const mRed = reduceNumber(month);
    const dRed = reduceNumber(day);
    const yRed = reduceNumber(
      String(year).split("").reduce((s, c) => s + Number(c), 0)
    );
    const total = mRed + dRed + yRed;
    const finalNum = reduceNumber(total);
    const breakdown = `Month (${mRed}) + Day (${dRed}) + Year (${yRed}) = ${total} → ${finalNum}`;
    return { number: finalNum, breakdown };
  };

  // Calculate Name Number
  const calculateName = (nameStr: string) => {
    const clean = nameStr.toLowerCase().replace(/[^a-z]/g, "");
    if (!clean.length) return { number: 1, letters: [], sum: 0 };
    const letters = clean.split("").map(char => ({
      char: char.toUpperCase(),
      val: PYTHAGOREAN_TABLE[char] || 0,
    }));
    const sum = letters.reduce((acc, item) => acc + item.val, 0);
    const finalNum = reduceNumber(sum);
    return { number: finalNum, letters, sum };
  };

  const lifePathResult = calculateLifePath(birthDate);
  const nameResult = calculateName(nameInput);

  const activeNumber = activeTab === "lifepath" ? lifePathResult.number : nameResult.number;
  const activeDetails = NUMEROLOGY_ARCHETYPES[activeNumber] || NUMEROLOGY_ARCHETYPES[1];

  return (
    <div className={`w-full max-w-[1300px] mx-auto ${className}`}>
      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveTab("lifepath")}
          className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all border ${
            activeTab === "lifepath"
              ? "bg-[#c8a951] text-[#0a0508] border-[#c8a951] shadow-lg shadow-[#c8a951]/25"
              : "bg-[#140b11]/80 text-[#c8a951] border-[#c8a951]/30 hover:border-[#c8a951]"
          }`}
        >
          Life Path Number (Birthdate)
        </button>
        <button
          onClick={() => setActiveTab("name")}
          className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all border ${
            activeTab === "name"
              ? "bg-[#c8a951] text-[#0a0508] border-[#c8a951] shadow-lg shadow-[#c8a951]/25"
              : "bg-[#140b11]/80 text-[#c8a951] border-[#c8a951]/30 hover:border-[#c8a951]"
          }`}
        >
          Name Destiny Number (Pythagorean)
        </button>
      </div>

      {/* Inputs & Calculation Engine Display */}
      <div className="bg-[#10080d]/95 border border-[#c8a951]/35 p-6 md:p-10 rounded-sm shadow-2xl backdrop-blur-md mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-center">
          {/* Input control */}
          <div>
            {activeTab === "lifepath" ? (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-2">
                  Select Your Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-[#080406] border border-[#c8a951]/40 text-white px-4 py-3.5 rounded-sm outline-none focus:border-[#c8a951] text-sm [color-scheme:dark]"
                />
                <p className="text-[11px] text-white/50 mt-2 font-light">
                  Decodes the core vibrational blueprint you brought into this lifetime.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-2">
                  Enter Your Full Birth Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-[#080406] border border-[#c8a951]/40 text-white px-4 py-3.5 rounded-sm outline-none focus:border-[#c8a951] text-sm placeholder:text-white/30"
                />
                <p className="text-[11px] text-white/50 mt-2 font-light">
                  Pythagorean alphabetic reduction reveals your outer destiny and expression.
                </p>
              </div>
            )}
          </div>

          {/* Interactive Live Formula Visualization */}
          <div className="p-6 bg-[#080406]/90 border border-[#c8a951]/25 rounded-sm">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-3">
              Mathematical Reduction Process
            </p>
            {activeTab === "lifepath" ? (
              <div className="space-y-2">
                <p className="text-sm font-mono text-white/90">
                  {lifePathResult.breakdown}
                </p>
                <p className="text-xs text-white/50 font-light">
                  The day, month, and year are reduced to single digits or sacred Master Numbers (11, 22, 33), then summed.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {nameResult.letters.map((item, i) => (
                    <div key={i} className="flex flex-col items-center bg-[#140b11] border border-[#c8a951]/30 px-2 py-1 rounded-sm">
                      <span className="text-xs font-bold text-white">{item.char}</span>
                      <span className="text-[9px] text-[#c8a951] font-mono">{item.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-mono text-white/80">
                  Sum: {nameResult.sum} → Reduced Destiny Number: <strong className="text-[#c8a951] font-bold">{nameResult.number}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Result Card Dossier */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${activeNumber}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-[#10080d]/95 border border-[#c8a951]/40 p-8 md:p-12 rounded-sm shadow-2xl backdrop-blur-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
            {/* Massive Golden Number Emblem */}
            <div className="flex flex-col items-center justify-center p-8 bg-[#080406] border-2 border-[#c8a951]/60 rounded-sm text-center shadow-xl">
              <span
                className="text-7xl md:text-8xl font-light text-[#c8a951] leading-none mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {activeNumber}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] border-t border-[#c8a951]/30 pt-3 w-full">
                {activeDetails.isMaster ? "Sacred Master Number" : `${activeTab === "lifepath" ? "Life Path" : "Expression"} Archetype`}
              </span>
            </div>

            {/* In-depth Archetype breakdown */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-[#c8a951]/15 text-[#c8a951] border border-[#c8a951]/30">
                  Archetype: {activeDetails.archetype}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                  Ruling Planet: {activeDetails.planet}
                </span>
              </div>

              <h3
                className="text-3xl md:text-4xl font-light text-white mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {activeDetails.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {activeDetails.keywords.map((kw) => (
                  <span key={kw} className="text-[9px] font-bold uppercase tracking-wider text-white/80 bg-white/5 border border-white/10 px-2.5 py-1">
                    {kw}
                  </span>
                ))}
              </div>

              <p className="text-sm md:text-base text-white/85 leading-relaxed mb-6 font-light">
                {activeDetails.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#080406]/80 border-l-2 border-[#c8a951] mb-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-1">
                    Soul Mission & Highest Potential
                  </p>
                  <p className="text-xs text-white/90 leading-relaxed font-light">
                    {activeDetails.mission}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-1">
                    Harmonizing Crystal Remedy
                  </p>
                  <p className="text-xs text-white/90 font-medium mb-1">
                    {activeDetails.crystal}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <span className="inline-flex items-center gap-2 bg-[#c8a951] text-[#0a0508] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] shadow-lg hover:shadow-[#c8a951]/30 transition-all cursor-pointer">
                    Shop Number {activeNumber} Crystals <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
                <Link href="/tarot">
                  <span className="inline-flex items-center gap-2 border border-[#c8a951]/60 text-[#c8a951] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-[#c8a951]/10 transition-all cursor-pointer">
                    Book Numerology Reading
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
