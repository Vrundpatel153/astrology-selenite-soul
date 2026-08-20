"use client";
/**
 * Selenite Soul — Astrala-Inspired 3D Interactive Tarot Deck
 * Features an interactive 3D fanned arc deck, pick-and-place dealing animations,
 * smooth 3D card flips with gold foil backing, and in-depth crystal remedy correlations.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Compass, Moon, Sparkles, Eye, Check } from "lucide-react";
import { Link } from "wouter";

export interface TarotCardData {
  id: string;
  name: string;
  arcana: "Major" | "Minor";
  number: string;
  image: string;
  uprightKeywords: string[];
  reversedKeywords: string[];
  summary: string;
  affirmation: string;
  crystalRemedy: string;
  element: "Fire" | "Water" | "Air" | "Earth";
}

export const TAROT_DECK: TarotCardData[] = [
  {
    id: "the-magician",
    name: "The Magician",
    arcana: "Major",
    number: "I",
    image: "/tarot-the-magician.webp",
    uprightKeywords: ["Manifestation", "Willpower", "Resourcefulness", "Creation"],
    reversedKeywords: ["Scattered Focus", "Untapped Potential", "Manipulation"],
    summary: "The Magician channels celestial energy from the heavens above into tangible reality below. You hold all four elemental tools necessary to manifest your intentions.",
    affirmation: "As above, so below; I possess the sovereign power to create my reality.",
    crystalRemedy: "Tiger Eye & Pyrite",
    element: "Air",
  },
  {
    id: "the-high-priestess",
    name: "The High Priestess",
    arcana: "Major",
    number: "II",
    image: "/tarot-high-priestess.webp",
    uprightKeywords: ["Intuition", "Sacred Mystery", "Inner Knowing", "Divine Feminine"],
    reversedKeywords: ["Ignored Intuition", "Secrets", "Surface Thinking"],
    summary: "Sitting between the pillars of light and shadow, The High Priestess urges you to quiet the outer noise and listen to the stillness within.",
    affirmation: "My intuition is my most reliable compass; I trust the unseen.",
    crystalRemedy: "Rainbow Moonstone & Selenite",
    element: "Water",
  },
  {
    id: "the-empress",
    name: "The Empress",
    arcana: "Major",
    number: "III",
    image: "/tarot-the-empress.webp",
    uprightKeywords: ["Abundance", "Nurturing", "Sensuality", "Fertility"],
    reversedKeywords: ["Creative Block", "Over-giving", "Depletion"],
    summary: "The Empress embodies the fertile generosity of Mother Earth. Everything you touch is ready to bloom into luxurious beauty and material abundance.",
    affirmation: "I welcome boundless abundance and nurture my creative seeds.",
    crystalRemedy: "Green Jade & Rose Quartz",
    element: "Earth",
  },
  {
    id: "the-lovers",
    name: "The Lovers",
    arcana: "Major",
    number: "VI",
    image: "/tarot-the-lovers.webp",
    uprightKeywords: ["Sacred Union", "Harmony", "Values Alignment", "Choice"],
    reversedKeywords: ["Misalignment", "Inner Conflict", "Discord"],
    summary: "The Lovers represents sacred alchemy between complementary souls and values. A choice made from your highest integrity will bring divine union.",
    affirmation: "I attract relationships that mirror my highest spiritual truth.",
    crystalRemedy: "Rhodonite & Rose Quartz",
    element: "Air",
  },
  {
    id: "the-hermit",
    name: "The Hermit",
    arcana: "Major",
    number: "IX",
    image: "/tarot-the-hermit.webp",
    uprightKeywords: ["Introspection", "Inner Light", "Solitude", "Wisdom"],
    reversedKeywords: ["Isolation", "Loneliness", "Withdrawal"],
    summary: "Standing upon the mountain peak with a golden lantern, The Hermit reminds you that the answers you seek cannot be found in the crowd, only within.",
    affirmation: "My inner light illuminates every step of my spiritual path.",
    crystalRemedy: "Labradorite & Smoky Quartz",
    element: "Earth",
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    arcana: "Major",
    number: "X",
    image: "/tarot-wheel-fortune.webp",
    uprightKeywords: ["Destiny", "Cycles", "Turning Point", "Karma"],
    reversedKeywords: ["Resisting Change", "Temporary Setback", "Delay"],
    summary: "The eternal cosmic wheel turns in your favor. A pivotal karmic shift is unfolding, bringing synchronicities and elevating you to your next chapter.",
    affirmation: "I surrender to the divine rhythm of destiny and welcome positive change.",
    crystalRemedy: "Lapis Lazuli & Citrine",
    element: "Fire",
  },
  {
    id: "the-star",
    name: "The Star",
    arcana: "Major",
    number: "XVII",
    image: "/tarot-the-star.webp",
    uprightKeywords: ["Hope", "Inspiration", "Healing", "Spiritual Renewal"],
    reversedKeywords: ["Despair", "Lost Faith", "Disconnection"],
    summary: "Following any period of turmoil, The Star appears as a celestial beacon of serenity and cosmic protection. Your soul is actively receiving healing light.",
    affirmation: "I am guided, healed, and blessed by the infinite cosmos.",
    crystalRemedy: "Aquamarine & Clear Quartz",
    element: "Air",
  },
  {
    id: "the-sun",
    name: "The Sun",
    arcana: "Major",
    number: "XIX",
    image: "/tarot-the-sun.webp",
    uprightKeywords: ["Joy", "Radiance", "Vitality", "Success", "Clarity"],
    reversedKeywords: ["Temporary Clouds", "Over-optimism", "Blocked Joy"],
    summary: "The Sun illuminates every dark corner with divine warmth and unwavering vitality. It signals breakthrough clarity, creative abundance, and genuine joy.",
    affirmation: "I radiate warm divine light and attract unconditional abundance.",
    crystalRemedy: "Sunstone & Citrine",
    element: "Fire",
  },
  {
    id: "the-world",
    name: "The World",
    arcana: "Major",
    number: "XXI",
    image: "/tarot-the-world.webp",
    uprightKeywords: ["Completion", "Wholeness", "Integration", "Triumph"],
    reversedKeywords: ["Unfinished Cycle", "Shortcuts", "Delay"],
    summary: "Surrounded by the golden wreath of cosmic triumph, The World celebrates the successful completion of a major soul lesson and the dawn of a new cycle.",
    affirmation: "I celebrate my soul's growth and step into complete wholeness.",
    crystalRemedy: "Amethyst & Selenite",
    element: "Earth",
  },
];

interface Slot {
  position: string;
  card: TarotCardData | null;
  isFlipped: boolean;
}

export default function InteractiveTarotDeck({ className = "" }: { className?: string }) {
  const [spreadMode, setSpreadMode] = useState<"single" | "three">("three");
  const maxPicks = spreadMode === "single" ? 1 : 3;

  // Deck of available cards in fan
  const [deck, setDeck] = useState<TarotCardData[]>(() =>
    [...TAROT_DECK].sort(() => 0.5 - Math.random())
  );

  // Spread slots
  const [slots, setSlots] = useState<Slot[]>([
    { position: "1. Past / Root Energy", card: null, isFlipped: false },
    { position: "2. Present / Current Path", card: null, isFlipped: false },
    { position: "3. Future / Emerging Potential", card: null, isFlipped: false },
  ]);

  const [pickedCardIds, setPickedCardIds] = useState<Set<string>>(new Set());
  const [selectedDetails, setSelectedDetails] = useState<TarotCardData | null>(null);

  // Switch spread mode
  const handleModeChange = (mode: "single" | "three") => {
    setSpreadMode(mode);
    setPickedCardIds(new Set());
    setSelectedDetails(null);
    if (mode === "single") {
      setSlots([{ position: "Daily Oracle Guidance", card: null, isFlipped: false }]);
    } else {
      setSlots([
        { position: "1. Past / Root Energy", card: null, isFlipped: false },
        { position: "2. Present / Current Path", card: null, isFlipped: false },
        { position: "3. Future / Emerging Potential", card: null, isFlipped: false },
      ]);
    }
  };

  // Reshuffle deck
  const handleReshuffle = () => {
    setDeck([...TAROT_DECK].sort(() => 0.5 - Math.random()));
    setPickedCardIds(new Set());
    setSelectedDetails(null);
    if (spreadMode === "single") {
      setSlots([{ position: "Daily Oracle Guidance", card: null, isFlipped: false }]);
    } else {
      setSlots([
        { position: "1. Past / Root Energy", card: null, isFlipped: false },
        { position: "2. Present / Current Path", card: null, isFlipped: false },
        { position: "3. Future / Emerging Potential", card: null, isFlipped: false },
      ]);
    }
  };

  // Pick a card from the 3D fan
  const handlePickFromFan = (card: TarotCardData) => {
    if (pickedCardIds.has(card.id)) return;
    if (pickedCardIds.size >= maxPicks) return;

    const nextEmptyIndex = slots.findIndex((s) => s.card === null);
    if (nextEmptyIndex === -1) return;

    const updatedSlots = [...slots];
    updatedSlots[nextEmptyIndex] = {
      ...updatedSlots[nextEmptyIndex],
      card,
      isFlipped: false,
    };

    setSlots(updatedSlots);
    setPickedCardIds((prev) => new Set(prev).add(card.id));
  };

  // Flip a dealt card
  const handleFlipCard = (index: number) => {
    if (!slots[index].card) return;
    const updated = [...slots];
    updated[index] = { ...updated[index], isFlipped: true };
    setSlots(updated);
    setSelectedDetails(slots[index].card);
  };

  const allDealt = slots.every((s) => s.card !== null);

  return (
    <div className={`w-full max-w-[1300px] mx-auto ${className}`}>
      {/* Control bar: Spread Mode Selection & Shuffle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#c8a951]/25">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleModeChange("three")}
            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all border ${
              spreadMode === "three"
                ? "bg-[#c8a951] text-[#1a0e05] border-[#c8a951] shadow-lg shadow-[#c8a951]/25"
                : "bg-transparent text-[#c8a951] border-[#c8a951]/30 hover:border-[#c8a951]"
            }`}
          >
            3-Card Spread (Past · Present · Future)
          </button>
          <button
            onClick={() => handleModeChange("single")}
            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all border ${
              spreadMode === "single"
                ? "bg-[#c8a951] text-[#1a0e05] border-[#c8a951] shadow-lg shadow-[#c8a951]/25"
                : "bg-transparent text-[#c8a951] border-[#c8a951]/30 hover:border-[#c8a951]"
            }`}
          >
            Single Daily Oracle
          </button>
        </div>

        <button
          onClick={handleReshuffle}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#c8a951] hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reshuffle Deck
        </button>
      </div>

      {/* ── 3D FANNED ARC DECK (ASTRALA-STYLE INTERACTIVE FAN) ── */}
      <div className="relative py-12 px-4 mb-14 overflow-hidden rounded-sm bg-gradient-to-b from-[#1c0d16]/80 via-[#26131f]/60 to-[#140810] border border-[#c8a951]/25 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-1">
            Interactive Deck Fan
          </p>
          <p className="text-xs text-white/70 font-light">
            {pickedCardIds.size < maxPicks ? (
              <>Choose <strong>{maxPicks - pickedCardIds.size}</strong> more card{maxPicks - pickedCardIds.size > 1 ? "s" : ""} from the fanned deck below:</>
            ) : (
              <>All {maxPicks} cards chosen! Click each card in the spread below to flip and reveal.</>
            )}
          </p>
        </div>

        {/* 3D Curved Fan Spread Container */}
        <div className="relative h-[220px] sm:h-[260px] flex items-center justify-center select-none overflow-x-auto overflow-y-visible py-4">
          <div className="relative w-full max-w-[860px] h-full flex items-center justify-center">
            {deck.map((card, idx) => {
              const total = deck.length;
              const mid = (total - 1) / 2;
              const offset = idx - mid; // e.g. -4 to +4
              const rot = offset * 4.5; // -18deg to +18deg
              const transX = offset * 38; // spread across x
              const transY = Math.abs(offset) * 6; // curved arc
              const isPicked = pickedCardIds.has(card.id);

              return (
                <motion.div
                  key={card.id}
                  className={`absolute w-[110px] sm:w-[130px] h-[170px] sm:h-[200px] rounded-md border-2 border-[#c8a951]/70 overflow-hidden shadow-2xl transition-shadow ${
                    isPicked ? "opacity-20 pointer-events-none scale-90" : "cursor-pointer hover:border-[#c8a951] hover:shadow-[#c8a951]/40"
                  }`}
                  style={{
                    transformOrigin: "bottom center",
                    zIndex: idx,
                  }}
                  animate={{
                    x: transX,
                    y: isPicked ? -50 : transY,
                    rotate: rot,
                  }}
                  whileHover={
                    !isPicked
                      ? {
                          y: transY - 32,
                          scale: 1.12,
                          zIndex: 50,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }
                      : {}
                  }
                  onClick={() => handlePickFromFan(card)}
                  data-cursor="hover"
                >
                  <img
                    src="/tarot-card-back.webp"
                    alt="Tarot Card Back"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DEALING SPREAD SLOTS (DEALT CARDS) ── */}
      <div className="mb-14">
        <div className="text-center mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-1">
            Your Sacred Reading Spread
          </p>
          <p className="text-xs text-white/60 font-light">
            Click any face-down card to flip and unveil its divine archetype.
          </p>
        </div>

        <div
          className={`grid gap-8 justify-center items-center ${
            spreadMode === "single" ? "grid-cols-1 max-w-[320px] mx-auto" : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {slots.map((slot, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-3 text-center">
                {slot.position}
              </span>

              {/* Slot Box with 3D Perspective */}
              <div
                className="relative w-[230px] sm:w-[260px] h-[350px] sm:h-[390px] cursor-pointer"
                style={{ perspective: 1200 }}
                onClick={() => handleFlipCard(index)}
                data-cursor="hover"
              >
                {slot.card ? (
                  <motion.div
                    className="w-full h-full relative"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: slot.isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, scale: 1.02 }}
                  >
                    {/* Face Down Back */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-md overflow-hidden border-2 border-[#c8a951]/70 shadow-2xl bg-[#1a0e05]"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <img
                        src="/tarot-card-back.webp"
                        alt="Tarot Back"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c8a951] bg-[#1a0e05]/90 px-4 py-1.5 border border-[#c8a951]/50 rounded-full shadow-lg">
                          Click to Reveal
                        </span>
                      </div>
                    </div>

                    {/* Face Up Front */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-md overflow-hidden border-2 border-[#c8a951] shadow-2xl bg-[#140810]"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <img
                        src={slot.card.image}
                        alt={slot.card.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#140810] via-[#140810]/85 to-transparent pt-8 pb-4 px-4 text-center">
                        <p className="text-[9px] font-mono tracking-widest text-[#c8a951]/80 mb-0.5">
                          {slot.card.number}
                        </p>
                        <h4
                          className="text-lg font-light text-white"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {slot.card.name}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Empty Dealt Slot Placeholder */
                  <div className="w-full h-full rounded-md border-2 border-dashed border-[#c8a951]/30 bg-[#1e1019]/40 flex flex-col items-center justify-center p-6 text-center">
                    <Moon className="w-8 h-8 text-[#c8a951]/40 mb-3" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951]/60">
                      Empty Slot
                    </p>
                    <p className="text-[11px] text-white/40 mt-1 font-light">
                      Click a card in the fanned deck above to place here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CARD REVELATION & CRYSTAL ALLY DOSSIER ── */}
      <AnimatePresence>
        {selectedDetails && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="bg-[#241710]/95 border border-[#c8a951]/40 p-6 md:p-10 rounded-sm shadow-2xl backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
              <div className="w-full max-w-[220px] mx-auto aspect-[2/3] rounded-sm overflow-hidden border border-[#c8a951]/50 shadow-xl">
                <img
                  src={selectedDetails.image}
                  alt={selectedDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c8a951] border border-[#c8a951]/30 px-3 py-1 bg-[#c8a951]/10">
                    {selectedDetails.arcana} Arcana · {selectedDetails.number}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/60">
                    Element: {selectedDetails.element}
                  </span>
                </div>

                <h3
                  className="text-3xl md:text-4xl font-light text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {selectedDetails.name}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedDetails.uprightKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[9px] font-bold uppercase tracking-wider text-white/80 bg-white/5 border border-white/10 px-2.5 py-1"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <p className="text-sm md:text-base text-white/85 leading-relaxed mb-6 font-light">
                  {selectedDetails.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#1a0e05]/70 border border-[#c8a951]/20 rounded-sm mb-6">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-1">
                      Sacred Affirmation
                    </p>
                    <p className="text-xs text-white/90 italic font-light">
                      "{selectedDetails.affirmation}"
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-1">
                      Aligned Crystal Ally
                    </p>
                    <p className="text-xs text-white/90 font-medium">
                      {selectedDetails.crystalRemedy}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/tarot#book">
                    <span className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1a0e05] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] shadow-lg hover:shadow-[#c8a951]/40 transition-all cursor-pointer">
                      Book Deep Consultation with Ekta <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                  <Link href="/shop">
                    <span className="inline-flex items-center gap-2 border border-[#c8a951]/60 text-[#c8a951] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.22em] hover:bg-[#c8a951]/10 transition-all cursor-pointer">
                      Shop Aligned Crystals
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
