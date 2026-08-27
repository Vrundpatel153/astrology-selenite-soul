"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { ZodiacGlyph } from "./ZodiacGlyphs";

export interface ZodiacSignDetails {
  sign: string;
  archetype: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  ruler: string;
  symbol: string;
  color: string;
  bgRgba: string;
  keywords: string[];
  crystal: string;
  crystalDesc: string;
  lightTraits: string[];
  shadowTraits: string[];
  summary: string;
  compatibleSigns: string[];
}

export const ZODIAC_SIGNS: ZodiacSignDetails[] = [
  {
    sign: "Aries",
    archetype: "The Pioneer Ram",
    dates: "Mar 21 – Apr 19",
    element: "Fire",
    modality: "Cardinal",
    ruler: "Mars",
    symbol: "♈",
    color: "#e07a52",
    bgRgba: "rgba(224,122,82,0.12)",
    keywords: ["Initiation", "Courage", "Vitality", "Passion"],
    crystal: "Red Carnelian & Bloodstone",
    crystalDesc: "Channels fierce creative willpower, removes hesitation, and protects personal energy.",
    lightTraits: ["Fearless initiative", "Unyielding optimism", "Authentic leadership"],
    shadowTraits: ["Impatience", "Impulsive anger", "Burnout from over-assertion"],
    summary: "As the first sign of the zodiac wheel, Aries carries the raw spark of universal creation. You are born to break frontiers and initiate bold spiritual beginnings.",
    compatibleSigns: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
  },
  {
    sign: "Taurus",
    archetype: "The Sacred Earth Anchor",
    dates: "Apr 20 – May 20",
    element: "Earth",
    modality: "Fixed",
    ruler: "Venus",
    symbol: "♉",
    color: "#7aad78",
    bgRgba: "rgba(122,173,120,0.12)",
    keywords: ["Abundance", "Devotion", "Stability", "Sensuality"],
    crystal: "Rose Quartz & Emerald",
    crystalDesc: "Deepens heart-chakra grounding, invites material luxury, and fosters unconditional self-love.",
    lightTraits: ["Steadfast loyalty", "Appreciation for beauty", "Granite resilience"],
    shadowTraits: ["Possessiveness", "Resistance to change", "Material overindulgence"],
    summary: "Rooted deeply in the sanctuary of Mother Earth, Taurus cultivates tangible abundance, sensory refinement, and unshakeable inner peace.",
    compatibleSigns: ["Virgo", "Capricorn", "Cancer", "Pisces"],
  },
  {
    sign: "Gemini",
    archetype: "The Cosmic Twins",
    dates: "May 21 – Jun 20",
    element: "Air",
    modality: "Mutable",
    ruler: "Mercury",
    symbol: "♊",
    color: "#c8a951",
    bgRgba: "rgba(200,169,81,0.12)",
    keywords: ["Intellect", "Curiosity", "Duality", "Transmission"],
    crystal: "Tiger Eye & Citrine",
    crystalDesc: "Synthesizes rapid intellectual streams, balances dual perspectives, and clarifies nervous system chatter.",
    lightTraits: ["Quick-witted brilliance", "Charming adaptability", "Insatiable thirst for learning"],
    shadowTraits: ["Scattered focus", "Superficiality", "Overthinking"],
    summary: "The cosmic messenger bridging dimensions, Gemini weaves curiosity, sparkling wit, and multifaceted wisdom to connect disparate ideas.",
    compatibleSigns: ["Libra", "Aquarius", "Aries", "Leo"],
  },
  {
    sign: "Cancer",
    archetype: "The Lunar Guardian",
    dates: "Jun 21 – Jul 22",
    element: "Water",
    modality: "Cardinal",
    ruler: "Moon",
    symbol: "♋",
    color: "#8fa8d0",
    bgRgba: "rgba(143,168,208,0.12)",
    keywords: ["Intuition", "Sanctuary", "Empathy", "Nourishment"],
    crystal: "Rainbow Moonstone & Selenite",
    crystalDesc: "Calms psychic tides, cleanses ancestral memory, and creates an energetic shield around sensitive empathic hearts.",
    lightTraits: ["Profound psychic intuition", "Unconditional nurturing", "Emotional depth"],
    shadowTraits: ["Defensive moodiness", "Clinging to past wounds", "Martyr complex"],
    summary: "Guided by the luminous phases of the Moon, Cancer holds the sacred chalice of ancestral memory, emotional healing, and maternal devotion.",
    compatibleSigns: ["Scorpio", "Pisces", "Taurus", "Virgo"],
  },
  {
    sign: "Leo",
    archetype: "The Solar Sovereign",
    dates: "Jul 23 – Aug 22",
    element: "Fire",
    modality: "Fixed",
    ruler: "Sun",
    symbol: "♌",
    color: "#e07a52",
    bgRgba: "rgba(224,122,82,0.12)",
    keywords: ["Radiance", "Sovereignty", "Generosity", "Artistry"],
    crystal: "Sunstone & Pyrite",
    crystalDesc: "Amplifies magnetic solar charisma, banishes imposter feelings, and radiates golden abundance.",
    lightTraits: ["Magnanimous heart", "Inspiring creative vitality", "Unwavering nobility"],
    shadowTraits: ["Need for validation", "Prideful arrogance", "Dramatic overreaction"],
    summary: "Radiating the golden center of our solar system, Leo reminds humanity of our divine inner child, artistic fire, and open-hearted sovereignty.",
    compatibleSigns: ["Aries", "Sagittarius", "Gemini", "Libra"],
  },
  {
    sign: "Virgo",
    archetype: "The Sacred Alchemist",
    dates: "Aug 23 – Sep 22",
    element: "Earth",
    modality: "Mutable",
    ruler: "Mercury",
    symbol: "♍",
    color: "#7aad78",
    bgRgba: "rgba(122,173,120,0.12)",
    keywords: ["Discernment", "Purity", "Service", "Mastery"],
    crystal: "Amazonite & Green Jade",
    crystalDesc: "Soothes mental tension, aligns high standards with self-compassion, and activates sacred earth healing.",
    lightTraits: ["Impeccable discernment", "Devoted selfless service", "Analytical precision"],
    shadowTraits: ["Chronic self-criticism", "Perfectionist paralysis", "Worry addiction"],
    summary: "Dedicated to refining raw matter into spiritual gold, Virgo embodies the sacred priestess of harvest, bodily healing, and daily devotional craft.",
    compatibleSigns: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
  },
  {
    sign: "Libra",
    archetype: "The Cosmic Scale",
    dates: "Sep 23 – Oct 22",
    element: "Air",
    modality: "Cardinal",
    ruler: "Venus",
    symbol: "♎",
    color: "#c8a951",
    bgRgba: "rgba(200,169,81,0.12)",
    keywords: ["Harmonic Balance", "Beauty", "Diplomacy", "Sacred Union"],
    crystal: "Lapis Lazuli & Opal",
    crystalDesc: "Empowers clear boundary communication, enhances aesthetic intuition, and balances relationship dynamics.",
    lightTraits: ["Exquisite aesthetic eye", "Graceful mediator", "Commitment to justice"],
    shadowTraits: ["Indecisiveness", "Conflict avoidance", "Losing identity in partners"],
    summary: "Seeking the divine mathematics of harmony, Libra weighs all perspectives to restore universal balance, refined beauty, and ethical peace.",
    compatibleSigns: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
  },
  {
    sign: "Scorpio",
    archetype: "The Mystic Phoenix",
    dates: "Oct 23 – Nov 21",
    element: "Water",
    modality: "Fixed",
    ruler: "Mars / Pluto",
    symbol: "♏",
    color: "#8fa8d0",
    bgRgba: "rgba(143,168,208,0.12)",
    keywords: ["Alchemy", "Rebirth", "Depth", "Kundalini"],
    crystal: "Black Obsidian & Malachite",
    crystalDesc: "Facilitates deep shadow integration, psychic cord-cutting, and powerful kundalini awakening.",
    lightTraits: ["Fearless shadow alchemy", "Unshakeable loyalty", "Profound magnetism"],
    shadowTraits: ["Paranoid secrecy", "Obsessive control", "Vindictive holding of grudges"],
    summary: "Diving fearlessly into the unseen depths of the psyche, Scorpio transforms dense emotional lead into transcendent spiritual gold through cyclic rebirth.",
    compatibleSigns: ["Cancer", "Pisces", "Virgo", "Capricorn"],
  },
  {
    sign: "Sagittarius",
    archetype: "The Cosmic Archer",
    dates: "Nov 22 – Dec 21",
    element: "Fire",
    modality: "Mutable",
    ruler: "Jupiter",
    symbol: "♐",
    color: "#e07a52",
    bgRgba: "rgba(224,122,82,0.12)",
    keywords: ["Truth", "Expansion", "Philosophy", "Adventure"],
    crystal: "Turquoise & Sodalite",
    crystalDesc: "Inspires expansive philosophical wisdom, attracts lucky synchronicities, and protects spiritual wanderers.",
    lightTraits: ["Boundless optimism", "Visionary philosophy", "Joyous thirst for freedom"],
    shadowTraits: ["Preachiness", "Reckless escapism", "Blunt insensitivity"],
    summary: "Aiming its golden arrow at the galactic core, Sagittarius searches across continents and spiritual doctrines for universal, unifying truth.",
    compatibleSigns: ["Aries", "Leo", "Libra", "Aquarius"],
  },
  {
    sign: "Capricorn",
    archetype: "The Master Architect",
    dates: "Dec 22 – Jan 19",
    element: "Earth",
    modality: "Cardinal",
    ruler: "Saturn",
    symbol: "♑",
    color: "#7aad78",
    bgRgba: "rgba(122,173,120,0.12)",
    keywords: ["Mastery", "Legacy", "Disciplined", "Sovereign"],
    crystal: "Garnet & Smoky Quartz",
    crystalDesc: "Grounds ambitious milestones and dissolves fatigue during monumental endeavors.",
    lightTraits: ["Integrity", "Generational vision", "Patient resilience"],
    shadowTraits: ["Rigidity", "Pessimism", "Emotional detachment"],
    summary: "Scaling the highest peaks of mastery, Capricorn builds enduring legacies through patience, duty, and spiritual discipline.",
    compatibleSigns: ["Taurus", "Virgo", "Scorpio", "Pisces"],
  },
  {
    sign: "Aquarius",
    archetype: "The Celestial Visionary",
    dates: "Jan 20 – Feb 18",
    element: "Air",
    modality: "Fixed",
    ruler: "Saturn / Uranus",
    symbol: "♒",
    color: "#c8a951",
    bgRgba: "rgba(200,169,81,0.12)",
    keywords: ["Visionary", "Liberating", "Innovative", "Cosmic"],
    crystal: "Amethyst & Fluorite",
    crystalDesc: "Channelling future-oriented blueprints, expanding mental bandwidth, and dispelling stagnation.",
    lightTraits: ["Revolutionary thinking", "Universal humanitarianism", "Independent genius"],
    shadowTraits: ["Emotional aloofness", "Rebellion for its own sake", "Stubborn dogma"],
    summary: "Pouring the waters of cosmic knowledge onto humanity, Aquarius shatters illusions to pioneer a conscious collective future.",
    compatibleSigns: ["Gemini", "Libra", "Aries", "Sagittarius"],
  },
  {
    sign: "Pisces",
    archetype: "The Mystic Ocean",
    dates: "Feb 19 – Mar 20",
    element: "Water",
    modality: "Mutable",
    ruler: "Jupiter / Neptune",
    symbol: "♓",
    color: "#8fa8d0",
    bgRgba: "rgba(143,168,208,0.12)",
    keywords: ["Transcendent", "Compassionate", "Dreamer", "Mystic"],
    crystal: "Aquamarine & Lepidolite",
    crystalDesc: "Anchors gentle emotional peace, amplifies spiritual dreams, and heals psychic fatigue.",
    lightTraits: ["Universal compassion", "Artistic channelling", "Transcendent mysticism"],
    shadowTraits: ["Escapism", "Boundary dissolution", "Victim mindset"],
    summary: "Swimming between the material realm and the infinite cosmos, Pisces dissolves ego boundaries to embody pure divine love.",
    compatibleSigns: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
  },
];

export default function InteractiveZodiacWheel({ className = "" }: { className?: string }) {
  const [activeSignIndex, setActiveSignIndex] = useState(0);
  const activeSign = ZODIAC_SIGNS[activeSignIndex];

  return (
    <div className={`w-full max-w-[1300px] mx-auto ${className}`}>
      {/* Sign Selector Ribbon (All 12 Signs) */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-4 mb-8 select-none no-scrollbar">
        {ZODIAC_SIGNS.map((s, idx) => {
          const isActive = idx === activeSignIndex;
          return (
            <button
              key={s.sign}
              onClick={() => setActiveSignIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase font-bold tracking-[0.18em] transition-all whitespace-nowrap rounded-sm border ${
                isActive
                  ? "bg-[#c8a951] text-[#0a0508] border-[#c8a951] shadow-lg shadow-[#c8a951]/20 scale-105"
                  : "bg-white/90 text-[#2a1f1a] border-[#e8d9cf] hover:border-[#c8a951] hover:text-[#a5762a]"
              }`}
              data-cursor="hover"
            >
              <ZodiacGlyph sign={s.sign} size={14} strokeWidth={isActive ? 2.2 : 1.6} />
              <span>{s.sign}</span>
            </button>
          );
        })}
      </div>

      {/* Main Celestial Wheel Stage - Luxury Light Alabaster Glass */}
      <div className="bg-white/95 border border-[#c8a951]/35 p-5 sm:p-8 md:p-12 rounded-sm shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left: Concentric 3D Celestial Wheel Illustration */}
          <div className="relative flex items-center justify-center p-2 sm:p-4">
            <div className="relative w-[230px] sm:w-[300px] md:w-[360px] aspect-square rounded-full overflow-hidden border border-[#c8a951]/40 shadow-2xl bg-[#fcf8f4]">
              {/* Rotating Constellation Mandala Wheel (Smooth Continuous Vinyl Spin) */}
              <img
                src="/zodiac-wheel-artwork.webp"
                alt="Zodiac Constellations Wheel"
                className="w-full h-full object-cover celestial-disc-spin"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/20 pointer-events-none" />
            </div>

            {/* Glowing Center Badge */}
            <div
              className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#fdf8f4]/95 border-2 border-[#c8a951] flex flex-col items-center justify-center shadow-xl backdrop-blur-md"
              style={{ boxShadow: `0 0 25px ${activeSign.color}40` }}
            >
              <ZodiacGlyph sign={activeSign.sign} size={28} strokeWidth={2} className="sm:w-8 sm:h-8" />
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mt-0.5">
                {activeSign.sign}
              </span>
            </div>
          </div>

          {/* Right: Detailed Cosmological Dossier */}
          <div>
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
              <span
                className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 sm:px-3 py-1 border rounded-full font-semibold"
                style={{ borderColor: activeSign.color, color: activeSign.color, background: activeSign.bgRgba }}
              >
                {activeSign.element} Element
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 sm:px-3 py-1 bg-[#f5ede4] border border-[#e8d9cf] text-[#4a382e] rounded-full">
                {activeSign.modality} Modality
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 sm:px-3 py-1 bg-[#f5ede4] border border-[#e8d9cf] text-[#4a382e] rounded-full">
                Ruler: {activeSign.ruler}
              </span>
            </div>

            <h3
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#2a1f1a] mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {activeSign.sign} · <em className="italic text-[#a5762a]">{activeSign.archetype}</em>
            </h3>
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#a5762a] mb-4 sm:mb-6">
              {activeSign.dates}
            </p>

            <p className="text-xs sm:text-sm md:text-base text-[#4a382e] leading-relaxed mb-6 font-light">
              {activeSign.summary}
            </p>

            {/* Light vs Shadow Dual Nature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              <div className="p-3.5 sm:p-4 bg-[#fcf8f4] border border-[#e8d9cf] rounded-sm shadow-sm">
                <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[#558253] mb-2 font-semibold">
                  ◈ Radiant Light Archetype
                </p>
                <ul className="text-xs text-[#2a1f1a]/85 space-y-1 font-light">
                  {activeSign.lightTraits.map(t => <li key={t}>• {t}</li>)}
                </ul>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#fcf8f4] border border-[#e8d9cf] rounded-sm shadow-sm">
                <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[#c05934] mb-2 font-semibold">
                  ◈ Shadow Growth Edge
                </p>
                <ul className="text-xs text-[#2a1f1a]/85 space-y-1 font-light">
                  {activeSign.shadowTraits.map(t => <li key={t}>• {t}</li>)}
                </ul>
              </div>
            </div>

            {/* Prescribed Crystal Ally */}
            <div className="p-4 sm:p-5 bg-[#fcf8f4] border-l-2 border-[#c8a951] rounded-sm mb-6 shadow-sm">
              <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-1">
                Prescribed Crystal Ally
              </p>
              <h5 className="text-xs sm:text-sm font-semibold text-[#2a1f1a] mb-0.5 sm:mb-1">
                {activeSign.crystal}
              </h5>
              <p className="text-xs text-[#4a382e] font-light">
                {activeSign.crystalDesc}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={`/shop?zodiac=${activeSign.sign.toLowerCase()}`} className="w-full sm:w-auto">
                <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c8a951] text-[#0a0508] px-6 sm:px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] shadow-md hover:shadow-[#c8a951]/30 transition-all cursor-pointer">
                  Shop {activeSign.sign} Crystals <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
              <Link href="/kundali" className="w-full sm:w-auto">
                <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#c8a951]/60 text-[#a5762a] px-6 sm:px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-[#c8a951]/10 transition-all cursor-pointer">
                  Calculate Full Kundali Chart
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
