/**
 * Sacred Chaldean Numerology Engine
 * 
 * Rooted in ancient Babylonian sound vibrations and Vedic planetary rulerships.
 * Key distinctions from Pythagorean numerology:
 * 1. Letter sound frequencies are mapped to numbers 1 through 8 only.
 * 2. Number 9 is holy and sacred; it is never assigned to any individual alphabet letter.
 * 3. Driver (Moolank) is derived strictly from the Day of Birth (1–31).
 * 4. Destiny (Bhagyank) is derived from the Full Date of Birth (Day + Month + Year).
 * 5. Name Number (Namank) preserves both the occult Compound Number (e.g. 19, 23, 24, 37)
 *    and the reduced Single Root Number (1–9).
 */

// ─── Chaldean Alphabet Vibration Table (1 to 8) ──────────────────────────────
export const CHALDEAN_LETTER_MAP: Record<string, number> = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8,
};

// ─── Single Digit Reduction ──────────────────────────────────────────────────
export function reduceToSingleDigit(num: number): number {
  if (num <= 0) return 1;
  while (num > 9) {
    num = String(num)
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0);
  }
  return num;
}

// ─── Planetary Rulerships & Archetypes (1 to 9) ──────────────────────────────
export interface ChaldeanArchetype {
  number: number;
  planet: string;
  vedicPlanet: string;
  title: string;
  archetype: string;
  keywords: string[];
  description: string;
  soulMission: string;
  crystal: string;
  luckyColor: string;
  luckyDay: string;
  friendlyNumbers: number[];
  neutralNumbers: number[];
  enemyNumbers: number[];
}

export const CHALDEAN_ARCHETYPES: Record<number, ChaldeanArchetype> = {
  1: {
    number: 1,
    planet: "Sun",
    vedicPlanet: "Surya",
    title: "The Sovereign Pioneer",
    archetype: "Leader & Originator",
    keywords: ["Leadership", "Vitality", "Individuality", "Willpower", "Honor"],
    description: "Number 1 represents the pure creative fire of the Sun (Surya). You possess natural authority, boundless ambition, and an innate drive to pioneer original paths rather than follow existing conventions.",
    soulMission: "To lead with benevolent integrity and illuminate the path for others without egoic dominance.",
    crystal: "Ruby, Red Carnelian & Sunstone",
    luckyColor: "Gold, Orange & Ruby Red",
    luckyDay: "Sunday",
    friendlyNumbers: [1, 2, 3, 9],
    neutralNumbers: [5],
    enemyNumbers: [8],
  },
  2: {
    number: 2,
    planet: "Moon",
    vedicPlanet: "Chandra",
    title: "The Sacred Empath",
    archetype: "Intuitive Peacemaker",
    keywords: ["Intuition", "Harmony", "Receptivity", "Diplomacy", "Grace"],
    description: "Number 2 embodies the reflective, oceanic tides of the Moon (Chandra). Gentle, imaginative, and deeply empathetic, you bridge discordant polarities and sense emotional currents long before they surface.",
    soulMission: "To master emotional sovereignty while anchoring peace, balance, and artistic beauty in the world.",
    crystal: "Pearl, Rainbow Moonstone & Selenite",
    luckyColor: "Pure White, Silver & Pearl Cream",
    luckyDay: "Monday",
    friendlyNumbers: [1, 5],
    neutralNumbers: [2, 3],
    enemyNumbers: [4, 8, 9],
  },
  3: {
    number: 3,
    planet: "Jupiter",
    vedicPlanet: "Brihaspati / Guru",
    title: "The Divine Sage & Alchemist",
    archetype: "Wisdom Seeker & Creator",
    keywords: ["Wisdom", "Expansion", "Optimism", "Expression", "Counsel"],
    description: "Number 3 is governed by Jupiter (Guru), the cosmic teacher and bringer of luck. Blessed with intellectual brilliance, expressive eloquence, and moral fortitude, your words carry transformative authority.",
    soulMission: "To channel higher philosophical truth and creative inspiration to uplift and enlighten collective consciousness.",
    crystal: "Yellow Sapphire, Citrine & Golden Topaz",
    luckyColor: "Yellow, Saffron & Warm Amber",
    luckyDay: "Thursday",
    friendlyNumbers: [1, 2, 9],
    neutralNumbers: [3],
    enemyNumbers: [6],
  },
  4: {
    number: 4,
    planet: "Rahu",
    vedicPlanet: "Rahu (North Lunar Node)",
    title: "The Unconventional Architect",
    archetype: "Visionary Reformer",
    keywords: ["Originality", "Revolution", "Discipline", "Focus", "Perseverance"],
    description: "Number 4 vibrates with Rahu's unconventional brilliance. You perceive the world from angles others overlook, possessing the grit to rebuild outdated structures and master sudden life evolutions.",
    soulMission: "To bring methodical order to chaotic visions and build enduring foundations for future generations.",
    crystal: "Hessonite Garnet, Brown Agate & Smoky Quartz",
    luckyColor: "Electric Blue, Grey & Khaki",
    luckyDay: "Saturday & Sunday",
    friendlyNumbers: [1, 5, 6, 7],
    neutralNumbers: [8],
    enemyNumbers: [2, 4, 9],
  },
  5: {
    number: 5,
    planet: "Mercury",
    vedicPlanet: "Budha",
    title: "The Cosmic Messenger",
    archetype: "Versatile Free Spirit",
    keywords: ["Adaptability", "Commerce", "Magnetism", "Eloquence", "Speed"],
    description: "Number 5 is ruled by Mercury (Budha), the swift-winged planet of intellect, commerce, and communication. Highly versatile and charismatic, you recover swiftly from setbacks and thrive amid rapid movement.",
    soulMission: "To bridge diverse perspectives with quick-witted insight while anchoring focused discipline.",
    crystal: "Emerald, Green Jade & Green Aventurine",
    luckyColor: "Emerald Green, Mint & Turquoise",
    luckyDay: "Wednesday",
    friendlyNumbers: [1, 6],
    neutralNumbers: [2, 3, 4, 5, 7, 8, 9],
    enemyNumbers: [], // Mercury is universal friend in Chaldean system
  },
  6: {
    number: 6,
    planet: "Venus",
    vedicPlanet: "Shukra",
    title: "The Harmonious Nurturer",
    archetype: "Sanctuary Guardian & Artist",
    keywords: ["Compassion", "Luxury", "Aesthetics", "Protection", "Devotion"],
    description: "Number 6 radiates the magnetic charm and aesthetic grace of Venus (Shukra). You are a natural healer and creator of sanctuary, magnetic to abundance, fine arts, and enduring interpersonal devotion.",
    soulMission: "To elevate physical environments into sanctuaries of peace and offer selfless care without depleting your own reserves.",
    crystal: "Diamond, Rose Quartz & Clear Quartz",
    luckyColor: "Rose Pink, Diamond White & Sky Blue",
    luckyDay: "Friday",
    friendlyNumbers: [5, 8],
    neutralNumbers: [6, 7],
    enemyNumbers: [3],
  },
  7: {
    number: 7,
    planet: "Ketu",
    vedicPlanet: "Ketu (South Lunar Node)",
    title: "The Esoteric Mystic",
    archetype: "Spiritual Seeker & Analyst",
    keywords: ["Occult Wisdom", "Detachment", "Introspection", "Discernment", "Vision"],
    description: "Number 7 carries Ketu's deep mystical and analytical current. Unmoved by shallow material illusions, you are drawn to the hidden mechanics of the universe, spiritual science, and psychic intuition.",
    soulMission: "To penetrate material veils, uncover metaphysical truths, and guide others toward spiritual liberation.",
    crystal: "Cat's Eye, Labradorite & Amethyst",
    luckyColor: "Smoky Quartz, Silver Grey & Pastel Violet",
    luckyDay: "Monday & Thursday",
    friendlyNumbers: [1, 4, 5],
    neutralNumbers: [6, 7],
    enemyNumbers: [2, 9],
  },
  8: {
    number: 8,
    planet: "Saturn",
    vedicPlanet: "Shani",
    title: "The Karmic Master",
    archetype: "Manifestor of Justice",
    keywords: ["Endurance", "Karmic Balance", "Authority", "Patience", "Mastery"],
    description: "Number 8 represents the stern yet deeply rewarding discipline of Saturn (Shani). Your path requires perseverance through early trials, emerging as a sovereign pillar of justice, wealth, and executive mastery.",
    soulMission: "To wield worldly authority and material power as a conscious steward of divine karma and fairness.",
    crystal: "Blue Sapphire, Black Tourmaline & Lapis Lazuli",
    luckyColor: "Midnight Blue, Black & Deep Violet",
    luckyDay: "Saturday",
    friendlyNumbers: [5, 6],
    neutralNumbers: [4, 7],
    enemyNumbers: [1, 2, 9],
  },
  9: {
    number: 9,
    planet: "Mars",
    vedicPlanet: "Mangal",
    title: "The Universal Warrior",
    archetype: "Protector & Humanitarian",
    keywords: ["Courage", "Valor", "Humanitarianism", "Transformation", "Sacrifice"],
    description: "Number 9 is the sacred fire of Mars (Mangal), containing the distilled energy of all preceding numbers. Fearless, passionate, and protective, you champion the vulnerable and fight for righteous universal causes.",
    soulMission: "To transmute fierce warrior energy into unconditional compassion, universal service, and spiritual completion.",
    crystal: "Red Coral, Carnelian & Red Jasper",
    luckyColor: "Crimson Red, Scarlet & Coral",
    luckyDay: "Tuesday",
    friendlyNumbers: [1, 2, 3],
    neutralNumbers: [5],
    enemyNumbers: [2, 4, 8],
  },
};

// ─── Chaldean Compound Numbers (10 to 52) ────────────────────────────────────
export interface CompoundInterpretation {
  compound: number;
  root: number;
  name: string;
  symbolism: string;
  fortune: "Fortunate" | "Spiritual / Dual" | "Challenging / Caution" | "Master";
}

export const CHALDEAN_COMPOUND_NUMBERS: Record<number, CompoundInterpretation> = {
  10: {
    compound: 10,
    root: 1,
    name: "The Wheel of Fortune",
    symbolism: "Honor, self-reliance, and rise through personal merit. Symbolizes rise, change of fortune, and strong self-belief.",
    fortune: "Fortunate",
  },
  11: {
    compound: 11,
    root: 2,
    name: "The Clenched Hand",
    symbolism: "Great intuitive downloads accompanied by hidden trials and moral dilemmas. Requires emotional grounding and discernment.",
    fortune: "Spiritual / Dual",
  },
  12: {
    compound: 12,
    root: 3,
    name: "The Sacred Offering",
    symbolism: "Self-sacrifice for ideals, philosophical devotion, and the danger of giving too much without receiving balance.",
    fortune: "Challenging / Caution",
  },
  13: {
    compound: 13,
    root: 4,
    name: "Regeneration & Transformation",
    symbolism: "Sweeping shifts and upheaval that clear old foundations. If energy is directed purposefully, it bestows extraordinary power.",
    fortune: "Spiritual / Dual",
  },
  14: {
    compound: 14,
    root: 5,
    name: "Movement & Challenge",
    symbolism: "Magnetic charm and versatility combined with rapid travel and change. Advises prudence in risk-taking and financial speculation.",
    fortune: "Spiritual / Dual",
  },
  15: {
    compound: 15,
    root: 6,
    name: "The Magician & Enchanter",
    symbolism: "High personal magnetism, artistic eloquence, and wealth through charm. A deeply fortunate vibration for public influence.",
    fortune: "Fortunate",
  },
  16: {
    compound: 16,
    root: 7,
    name: "The Shattered Citadel",
    symbolism: "The Tower vibration in ancient Chaldean lore. Warns against egoic overconfidence; teaches spiritual awakening through rebirth.",
    fortune: "Challenging / Caution",
  },
  17: {
    compound: 17,
    root: 8,
    name: "The Star of the Magi",
    symbolism: "Immense spiritual peace, immortality of fame, and victory over trials. One of the most revered spiritual numbers.",
    fortune: "Fortunate",
  },
  18: {
    compound: 18,
    root: 9,
    name: "Spiritual vs Material Friction",
    symbolism: "Conflict between worldly ambitions and spiritual ethics. Demands unwavering honesty and caution regarding deceptive associations.",
    fortune: "Challenging / Caution",
  },
  19: {
    compound: 19,
    root: 1,
    name: "The Prince of Heaven",
    symbolism: "Supreme auspiciousness, happiness, success, and high social honor. Sweeps away past obstacles and guarantees victory.",
    fortune: "Fortunate",
  },
  20: {
    compound: 20,
    root: 2,
    name: "The Awakening",
    symbolism: "A spiritual awakening and higher calling. Points toward delayed material rewards in favor of lasting spiritual purpose.",
    fortune: "Spiritual / Dual",
  },
  21: {
    compound: 21,
    root: 3,
    name: "The Crown of the Magi",
    symbolism: "Total advancement, universal success, and high honor achieved after persevering through initial tests.",
    fortune: "Fortunate",
  },
  22: {
    compound: 22,
    root: 4,
    name: "The Master Architect",
    symbolism: "Immense visionary potential. Warns against living in dreams or trusting blindly; when grounded, constructs generational empires.",
    fortune: "Master",
  },
  23: {
    compound: 23,
    root: 5,
    name: "The Royal Star of the Lion",
    symbolism: "The most fortunate Chaldean vibration for worldly triumph. Promises protection, favor from high authorities, and rising renown.",
    fortune: "Fortunate",
  },
  24: {
    compound: 24,
    root: 6,
    name: "Love, Wealth & Alliance",
    symbolism: "Warm domestic blessings, financial prosperity, and loyal assistance from influential benefactors and partners.",
    fortune: "Fortunate",
  },
  25: {
    compound: 25,
    root: 7,
    name: "Discrimination & Analysis",
    symbolism: "Wisdom earned through experience, analytical brilliance, and deep introspection. Blesses writers, researchers, and mystics.",
    fortune: "Spiritual / Dual",
  },
  26: {
    compound: 26,
    root: 8,
    name: "Partnerships & Prudence",
    symbolism: "Financial strength accompanied by warnings regarding partnership disputes or contracts. Advises independent verification.",
    fortune: "Challenging / Caution",
  },
  27: {
    compound: 27,
    root: 9,
    name: "The Sceptre",
    symbolism: "Supreme command, creative intellect, and executive authority. Highly fortunate for leadership and humanitarian missions.",
    fortune: "Fortunate",
  },
  28: {
    compound: 28,
    root: 1,
    name: "The Trusting Pilgrim",
    symbolism: "Promising talents vulnerable to legal or business friction if too trusting. Calls for contractual vigilance and strong advisors.",
    fortune: "Challenging / Caution",
  },
  29: {
    compound: 29,
    root: 2,
    name: "Grace Under Pressure",
    symbolism: "Deep emotional strength forged through uncertainty and relationship tests. Teaches inner faith and spiritual reliance.",
    fortune: "Challenging / Caution",
  },
  30: {
    compound: 30,
    root: 3,
    name: "Philosophical Sovereignty",
    symbolism: "Intellectual superiority, mental focus, and academic or spiritual mastery. Prefers wisdom and legacy over fleeting luxury.",
    fortune: "Fortunate",
  },
  31: {
    compound: 31,
    root: 4,
    name: "The Solitary Innovator",
    symbolism: "Originality and self-containment. Walking an uncommon road, creating independent solutions that redefine standards.",
    fortune: "Spiritual / Dual",
  },
  32: {
    compound: 32,
    root: 5,
    name: "The Global Communicator",
    symbolism: "Magnetic oratory and diplomatic prowess. Brings connections across foreign lands and public favor in enterprise.",
    fortune: "Fortunate",
  },
  33: {
    compound: 33,
    root: 6,
    name: "The Master Healer of Light",
    symbolism: "Universal love, profound devotion, and spiritual protection. Radiates uplifting frequencies that comfort and elevate all.",
    fortune: "Master",
  },
  34: {
    compound: 34,
    root: 7,
    name: "Analytical Perseverance",
    symbolism: "Similar to 25. Success achieved through persistent research, steady self-cultivation, and contemplative insight.",
    fortune: "Spiritual / Dual",
  },
  35: {
    compound: 35,
    root: 8,
    name: "Commercial Acumen",
    symbolism: "Resourceful management of assets, navigating market shifts with patience, and grounding volatile ventures.",
    fortune: "Spiritual / Dual",
  },
  36: {
    compound: 36,
    root: 9,
    name: "Creative Vanguard",
    symbolism: "Vibrant artistic leadership, humanitarian causes, and courage to stand for the disenfranchised.",
    fortune: "Fortunate",
  },
  37: {
    compound: 37,
    root: 1,
    name: "The Royal Star of Fortune",
    symbolism: "Exceptional good fortune in business, love, and community partnerships. Highly auspicious for mutual growth.",
    fortune: "Fortunate",
  },
  38: {
    compound: 38,
    root: 2,
    name: "Artistic Sensitivity",
    symbolism: "Deep intuition and aesthetic refinement; flourishes best in trustworthy, emotionally nurturing environments.",
    fortune: "Spiritual / Dual",
  },
  39: {
    compound: 39,
    root: 3,
    name: "Eloquent Orator",
    symbolism: "Mastery of written and spoken word, healthy longevity, and ability to inspire large assemblies.",
    fortune: "Fortunate",
  },
  40: {
    compound: 40,
    root: 4,
    name: "Systemic Reformer",
    symbolism: "Constructive focus on legal, administrative, and institutional restructuring; patient and resolute.",
    fortune: "Spiritual / Dual",
  },
  41: {
    compound: 41,
    root: 5,
    name: "Dynamic Enterprise",
    symbolism: "Entrepreneurial flair, rapid resourcefulness, and winning outcomes in commercial or leadership ventures.",
    fortune: "Fortunate",
  },
  42: {
    compound: 42,
    root: 6,
    name: "Sanctuary of Plenty",
    symbolism: "Warm domestic blessings, artistic reputation, and nurturing generosity that invites reciprocal prosperity.",
    fortune: "Fortunate",
  },
  45: {
    compound: 45,
    root: 9,
    name: "Strategic Sovereignty",
    symbolism: "Supreme command, strategic brilliance, and victory over adversaries through moral courage and discipline.",
    fortune: "Fortunate",
  },
  51: {
    compound: 51,
    root: 6,
    name: "The Protector of Realms",
    symbolism: "Fierce protective power, unstoppable determination, and leadership that defends loved ones and sacred principles.",
    fortune: "Fortunate",
  },
};

// ─── Core Calculations ───────────────────────────────────────────────────────

/**
 * 1. Psychic / Driver Number (Moolank)
 * Calculated ONLY from the Day of Birth (1 to 31).
 */
export function calculateDriverNumber(dateStr: string): {
  day: number;
  driverNumber: number;
  breakdown: string;
} {
  if (!dateStr) return { day: 15, driverNumber: 6, breakdown: "Day 15 → 1 + 5 = 6" };
  const parts = dateStr.split("-").map(Number);
  const day = parts.length === 3 ? parts[2] : 15;
  const driverNumber = reduceToSingleDigit(day);
  const dayStr = String(day).padStart(2, "0");
  const breakdown =
    day > 9
      ? `Birth Day (${day}) → ${dayStr[0]} + ${dayStr[1]} = ${driverNumber}`
      : `Birth Day (${day}) → Driver ${driverNumber}`;
  return { day, driverNumber, breakdown };
}

/**
 * 2. Destiny / Conductor Number (Bhagyank)
 * Calculated from the FULL Date of Birth (Day + Month + Year).
 */
export function calculateDestinyNumber(dateStr: string): {
  destinyNumber: number;
  breakdown: string;
  totalSum: number;
} {
  if (!dateStr) return { destinyNumber: 3, breakdown: "", totalSum: 39 };
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3) return { destinyNumber: 3, breakdown: "", totalSum: 39 };
  const [year, month, day] = parts;

  const daySum = reduceToSingleDigit(day);
  const monthSum = reduceToSingleDigit(month);
  const yearSum = reduceToSingleDigit(
    String(year)
      .split("")
      .reduce((acc, c) => acc + Number(c), 0)
  );

  const rawSum = daySum + monthSum + yearSum;
  const destinyNumber = reduceToSingleDigit(rawSum);

  const breakdown = `Day (${daySum}) + Month (${monthSum}) + Year (${yearSum}) = ${rawSum} → Destiny ${destinyNumber}`;
  return { destinyNumber, breakdown, totalSum: rawSum };
}

/**
 * 3. Name Number (Namank) with Chaldean Sound Letter Breakdown
 */
export interface NameVibrationLetter {
  char: string;
  val: number;
}

export interface NameCalculationResult {
  rawName: string;
  letters: NameVibrationLetter[];
  compoundSum: number;
  rootNumber: number;
  compoundInfo?: CompoundInterpretation;
  formula: string;
}

export function calculateChaldeanName(nameStr: string): NameCalculationResult {
  const clean = (nameStr || "Ektaz Shah").toLowerCase().replace(/[^a-z]/g, "");
  if (!clean.length) {
    return {
      rawName: nameStr,
      letters: [{ char: "E", val: 5 }],
      compoundSum: 5,
      rootNumber: 5,
      formula: "E (5) = 5",
    };
  }

  const letters: NameVibrationLetter[] = clean.split("").map((c) => ({
    char: c.toUpperCase(),
    val: CHALDEAN_LETTER_MAP[c] || 0,
  }));

  const compoundSum = letters.reduce((acc, item) => acc + item.val, 0);
  const rootNumber = reduceToSingleDigit(compoundSum);

  const compoundInfo =
    CHALDEAN_COMPOUND_NUMBERS[compoundSum] || {
      compound: compoundSum,
      root: rootNumber,
      name: `Compound Vibration ${compoundSum}`,
      symbolism: `Vibrates with reduced root number ${rootNumber} energy under Chaldean planetary frequency.`,
      fortune: compoundSum % 2 === 0 ? "Fortunate" : "Spiritual / Dual",
    };

  const formula = letters.map((l) => `${l.char}(${l.val})`).join(" + ") + ` = ${compoundSum} → ${rootNumber}`;

  return {
    rawName: nameStr,
    letters,
    compoundSum,
    rootNumber,
    compoundInfo,
    formula,
  };
}

/**
 * 4. Chaldean Planetary Compatibility & Synergy Analyzer
 */
export function calculateChaldeanCompatibility(
  numA: number,
  numB: number
): {
  score: number;
  relation: "Friendly" | "Neutral" | "Challenging";
  description: string;
} {
  const archA = CHALDEAN_ARCHETYPES[numA] || CHALDEAN_ARCHETYPES[1];
  const archB = CHALDEAN_ARCHETYPES[numB] || CHALDEAN_ARCHETYPES[1];

  if (numA === numB) {
    return {
      score: 95,
      relation: "Friendly",
      description: `Identical vibrations of ${archA.planet} (${archA.vedicPlanet}): deep mutual understanding, intuitive mirror synergy, and shared life rhythm.`,
    };
  }

  const aConsidersB = archA.friendlyNumbers.includes(numB)
    ? "friend"
    : archA.enemyNumbers.includes(numB)
    ? "enemy"
    : "neutral";

  const bConsidersA = archB.friendlyNumbers.includes(numA)
    ? "friend"
    : archB.enemyNumbers.includes(numA)
    ? "enemy"
    : "neutral";

  if (aConsidersB === "friend" && bConsidersA === "friend") {
    return {
      score: 92,
      relation: "Friendly",
      description: `Sacred Cosmic Harmony: ${archA.planet} and ${archB.planet} share reciprocal natural friendship, inviting prosperity, smooth communication, and lasting spiritual growth.`,
    };
  }

  if (
    (aConsidersB === "friend" && bConsidersA === "neutral") ||
    (aConsidersB === "neutral" && bConsidersA === "friend")
  ) {
    return {
      score: 84,
      relation: "Friendly",
      description: `Strong Complementary Resonance: ${archA.planet} and ${archB.planet} form a supportive bond where differences stimulate growth without destructive friction.`,
    };
  }

  if (aConsidersB === "neutral" && bConsidersA === "neutral") {
    return {
      score: 75,
      relation: "Neutral",
      description: `Balanced Equanimity: steady, independent collaboration. Requires conscious cultivation of mutual interests to deepen connection.`,
    };
  }

  if (
    (aConsidersB === "enemy" && bConsidersA !== "enemy") ||
    (bConsidersA === "enemy" && aConsidersB !== "enemy")
  ) {
    return {
      score: 62,
      relation: "Challenging",
      description: `Karmic Growth Catalyst: polar planetary currents of ${archA.planet} and ${archB.planet}. Demands clear boundaries, patience, and mutual respect for contrasting worldviews.`,
    };
  }

  return {
    score: 52,
    relation: "Challenging",
    description: `Intense Polar Friction: conflicting planetary agendas require conscious spiritual maturity and gemstone harmonizers to align frequencies smoothly.`,
  };
}
