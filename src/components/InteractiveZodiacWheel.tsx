"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Shield, Heart, Sparkles, Orbit } from "lucide-react";
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
    bgRgba: "rgba(224,122,82,0.14)",
    keywords: ["Pioneer", "Courage", "Drive", "Passion"],
    crystal: "Red Carnelian & Bloodstone",
    crystalDesc: "Channels fiery passion into grounded willpower and protects vital life force.",
    lightTraits: ["Fearless initiative", "Natural leadership", "Authentic enthusiasm"],
    shadowTraits: ["Impatience", "Impulsiveness", "Burnout risk"],
    summary: "The fiery pioneer of the zodiac, Aries initiates action with unstoppable vitality and bold spiritual courage.",
    compatibleSigns: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
  },
  {
    sign: "Taurus",
    archetype: "The Celestial Bull",
    dates: "Apr 20 – May 20",
    element: "Earth",
    modality: "Fixed",
    ruler: "Venus",
    symbol: "♉",
    color: "#7aad78",
    bgRgba: "rgba(122,173,120,0.14)",
    keywords: ["Grounded", "Sensual", "Steadfast", "Abundant"],
    crystal: "Rose Quartz & Emerald",
    crystalDesc: "Opens the heart chakra to unconditional love and attracts grounded prosperity.",
    lightTraits: ["Unshakable loyalty", "Artistic appreciation", "Manifestation mastery"],
    shadowTraits: ["Resistance to change", "Stubbornness", "Over-attachment"],
    summary: "Rooted in the fertile earth, Taurus cultivates enduring beauty, material abundance, and sacred loyalty.",
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
    bgRgba: "rgba(200,169,81,0.14)",
    keywords: ["Curious", "Brilliant", "Adaptable", "Communicative"],
    crystal: "Citrine & Clear Quartz",
    crystalDesc: "Clarifies mental chatter and activates witty, magnetic expression.",
    lightTraits: ["Mental agility", "Infectious curiosity", "Bridging polarities"],
    shadowTraits: ["Scattered focus", "Superficiality", "Overthinking"],
    summary: "The cosmic messenger bridging dimensions, Gemini weaves curiosity, sparkling wit, and multifaceted ideas.",
    compatibleSigns: ["Libra", "Aquarius", "Aries", "Leo"],
  },
  {
    sign: "Cancer",
    archetype: "The Sacred Crab",
    dates: "Jun 21 – Jul 22",
    element: "Water",
    modality: "Cardinal",
    ruler: "Moon",
    symbol: "♋",
    color: "#8fa8d0",
    bgRgba: "rgba(143,168,208,0.14)",
    keywords: ["Nurturing", "Intuitive", "Empathic", "Sanctuary"],
    crystal: "Rainbow Moonstone & Selenite",
    crystalDesc: "Harmonizes emotional tides and shields sensitive psychic boundaries.",
    lightTraits: ["Profound empathy", "Sacred devotion", "Psychic receptivity"],
    shadowTraits: ["Emotional defensiveness", "Clinging to past", "Moody withdrawal"],
    summary: "Guided by the tides of the Moon, Cancer creates sanctuary, protective emotional depth, and unconditional care.",
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
    bgRgba: "rgba(224,122,82,0.14)",
    keywords: ["Radiant", "Generous", "Magnetic", "Creative"],
    crystal: "Sunstone & Tiger Eye",
    crystalDesc: "Ignites sovereign self-expression, creative radiance, and golden abundance.",
    lightTraits: ["Warm generosity", "Magnetic charisma", "Noble authenticity"],
    shadowTraits: ["Pride", "Craving external validation", "Domineering"],
    summary: "Radiating the pure golden warmth of the Sun, Leo leads with expansive generosity, artistic flair, and genuine royalty.",
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
    bgRgba: "rgba(122,173,120,0.14)",
    keywords: ["Devoted", "Discerning", "Pure", "Healing"],
    crystal: "Amazonite & Green Aventurine",
    crystalDesc: "Calms perfectionist tension and channels divine service with effortless ease.",
    lightTraits: ["Sacred precision", "Practical healing wisdom", "Selfless devotion"],
    shadowTraits: ["Harsh self-criticism", "Perfectionist paralysis", "Micro-managing"],
    summary: "Virgo refines matter into spirit through devoted craftsmanship, holistic discernment, and pure healing service.",
    compatibleSigns: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
  },
  {
    sign: "Libra",
    archetype: "The Cosmic Balancer",
    dates: "Sep 23 – Oct 22",
    element: "Air",
    modality: "Cardinal",
    ruler: "Venus",
    symbol: "♎",
    color: "#c8a951",
    bgRgba: "rgba(200,169,81,0.14)",
    keywords: ["Harmony", "Grace", "Diplomacy", "Beauty"],
    crystal: "Lapis Lazuli & Rose Quartz",
    crystalDesc: "Restores inner equilibrium, clears hesitation, and attracts harmonious soul connections.",
    lightTraits: ["Aesthetic mastery", "Diplomatic justice", "Radiant elegance"],
    shadowTraits: ["Indecision", "People-pleasing", "Conflict avoidance"],
    summary: "The architect of peace and beauty, Libra seeks divine equilibrium, refined aesthetics, and conscious relationship.",
    compatibleSigns: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
  },
  {
    sign: "Scorpio",
    archetype: "The Alchemical Phoenix",
    dates: "Oct 23 – Nov 21",
    element: "Water",
    modality: "Fixed",
    ruler: "Mars / Pluto",
    symbol: "♏",
    color: "#8fa8d0",
    bgRgba: "rgba(143,168,208,0.14)",
    keywords: ["Transformative", "Mystic", "Fierce", "Rebirth"],
    crystal: "Black Obsidian & Labradorite",
    crystalDesc: "Transmutes deep shadow into spiritual gold and grants psychic protection.",
    lightTraits: ["Unflinching truth-seeking", "Karmic regeneration", "Profound loyalty"],
    shadowTraits: ["Secretiveness", "Control instincts", "Obsession"],
    summary: "Plunging fearlessly into the occult depths, Scorpio masters death and rebirth to rise like the transcendent Phoenix.",
    compatibleSigns: ["Cancer", "Pisces", "Virgo", "Capricorn"],
  },
  {
    sign: "Sagittarius",
    archetype: "The Cosmic Seeker",
    dates: "Nov 22 – Dec 21",
    element: "Fire",
    modality: "Mutable",
    ruler: "Jupiter",
    symbol: "♐",
    color: "#e07a52",
    bgRgba: "rgba(224,122,82,0.14)",
    keywords: ["Expansive", "Philosophical", "Free", "Visionary"],
    crystal: "Turquoise & Sodalite",
    crystalDesc: "Expands higher consciousness, protects on sacred travels, and anchors philosophical truth.",
    lightTraits: ["Boundless optimism", "Spiritual questing", "Philosophical wisdom"],
    shadowTraits: ["Restlessness", "Dogmatism", "Tactless bluntness"],
    summary: "Aiming its golden arrow at the infinite horizon, Sagittarius seeks truth across foreign philosophies, cosmology, and freedom.",
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
    bgRgba: "rgba(122,173,120,0.14)",
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
    bgRgba: "rgba(200,169,81,0.14)",
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
    bgRgba: "rgba(143,168,208,0.14)",
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
                  : "bg-[#140c12]/80 text-white/70 border-[#c8a951]/20 hover:border-[#c8a951]/60 hover:text-white"
              }`}
              data-cursor="hover"
            >
              <ZodiacGlyph sign={s.sign} size={14} strokeWidth={isActive ? 2.2 : 1.6} />
              <span>{s.sign}</span>
            </button>
          );
        })}
      </div>

      {/* Main Celestial Wheel Stage - Deep Obsidian Glass */}
      <div className="bg-[#10090e]/95 border border-[#c8a951]/35 p-6 md:p-12 rounded-sm shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-10 lg:gap-14 items-center">
          {/* Left: Concentric 3D Celestial Wheel Illustration */}
          <div className="relative flex items-center justify-center p-4">
            <div className="relative w-[280px] sm:w-[360px] aspect-square rounded-full overflow-hidden border border-[#c8a951]/40 shadow-2xl bg-[#080406]">
              {/* Rotating Constellation Mandala Wheel */}
              <motion.img
                src="/zodiac-wheel-artwork.webp"
                alt="Zodiac Constellations Wheel"
                className="w-full h-full object-cover"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Glowing Center Badge */}
            <div
              className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0e070c]/95 border-2 border-[#c8a951] flex flex-col items-center justify-center shadow-2xl backdrop-blur-md"
              style={{ boxShadow: `0 0 35px ${activeSign.color}60` }}
            >
              <ZodiacGlyph sign={activeSign.sign} size={36} strokeWidth={2} />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mt-0.5">
                {activeSign.sign}
              </span>
            </div>
          </div>

          {/* Right: Detailed Cosmological Dossier */}
          <div>
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 border"
                style={{ borderColor: activeSign.color, color: activeSign.color, background: activeSign.bgRgba }}
              >
                {activeSign.element} Element
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/10 text-white/80">
                {activeSign.modality} Modality
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/10 text-white/80">
                Ruler: {activeSign.ruler}
              </span>
            </div>

            <h3
              className="text-4xl sm:text-5xl font-light text-white mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {activeSign.sign} · <em className="italic text-[#c8a951]">{activeSign.archetype}</em>
            </h3>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-6">
              {activeSign.dates}
            </p>

            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 font-light">
              {activeSign.summary}
            </p>

            {/* Light vs Shadow Dual Nature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#0a0508]/80 border border-[#c8a951]/20 rounded-sm">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7aad78] mb-2">
                  ◈ Radiant Light Archetype
                </p>
                <ul className="text-xs text-white/75 space-y-1 font-light">
                  {activeSign.lightTraits.map(t => <li key={t}>• {t}</li>)}
                </ul>
              </div>

              <div className="p-4 bg-[#0a0508]/80 border border-[#c8a951]/20 rounded-sm">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e07a52] mb-2">
                  ◈ Shadow Growth Edge
                </p>
                <ul className="text-xs text-white/75 space-y-1 font-light">
                  {activeSign.shadowTraits.map(t => <li key={t}>• {t}</li>)}
                </ul>
              </div>
            </div>

            {/* Prescribed Crystal Ally */}
            <div className="p-5 bg-[#0a0508]/80 border-l-2 border-[#c8a951] rounded-sm mb-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-1">
                Prescribed Crystal Ally
              </p>
              <h5 className="text-sm font-semibold text-white mb-1">
                {activeSign.crystal}
              </h5>
              <p className="text-xs text-white/70 font-light">
                {activeSign.crystalDesc}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href={`/shop?zodiac=${activeSign.sign.toLowerCase()}`}>
                <span className="inline-flex items-center gap-2 bg-[#c8a951] text-[#0a0508] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] shadow-lg hover:shadow-[#c8a951]/30 transition-all cursor-pointer">
                  Shop {activeSign.sign} Crystals <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
              <Link href="/kundali">
                <span className="inline-flex items-center gap-2 border border-[#c8a951]/60 text-[#c8a951] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-[#c8a951]/10 transition-all cursor-pointer">
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
