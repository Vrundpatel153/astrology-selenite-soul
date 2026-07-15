// Vedic Astrology (Jyotish) calculation engine.
//
// Uses `astronomy-engine` (VSOP/ELP-based, arc-second accurate 1900-2100) for
// true geocentric ecliptic longitudes, then converts to the sidereal zodiac
// via the Lahiri (Chitrapaksha) ayanamsa — the standard used by Indian
// Vedic astrology software and panchang publishers.
import * as Astronomy from "astronomy-engine";
import { DateTime } from "luxon";
import { find as findTimeZone } from "geo-tz";

// ─── Basic math helpers ─────────────────────────────────────────────────────
function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}
function normalize(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

// ─── Static tables ──────────────────────────────────────────────────────────
export interface RashiInfo {
  name: string;
  english: string;
  symbol: string;
  ruler: string;
  element: string;
}

export const RASHIS: RashiInfo[] = [
  { name: "Mesha", english: "Aries", symbol: "\u2648", ruler: "Mars", element: "Fire" },
  { name: "Vrishabha", english: "Taurus", symbol: "\u2649", ruler: "Venus", element: "Earth" },
  { name: "Mithuna", english: "Gemini", symbol: "\u264A", ruler: "Mercury", element: "Air" },
  { name: "Karka", english: "Cancer", symbol: "\u264B", ruler: "Moon", element: "Water" },
  { name: "Simha", english: "Leo", symbol: "\u264C", ruler: "Sun", element: "Fire" },
  { name: "Kanya", english: "Virgo", symbol: "\u264D", ruler: "Mercury", element: "Earth" },
  { name: "Tula", english: "Libra", symbol: "\u264E", ruler: "Venus", element: "Air" },
  { name: "Vrishchika", english: "Scorpio", symbol: "\u264F", ruler: "Mars", element: "Water" },
  { name: "Dhanu", english: "Sagittarius", symbol: "\u2650", ruler: "Jupiter", element: "Fire" },
  { name: "Makara", english: "Capricorn", symbol: "\u2651", ruler: "Saturn", element: "Earth" },
  { name: "Kumbha", english: "Aquarius", symbol: "\u2652", ruler: "Saturn", element: "Air" },
  { name: "Meena", english: "Pisces", symbol: "\u2653", ruler: "Jupiter", element: "Water" },
];

const NAKSHATRAS = [
  { name: "Ashwini", lord: "Ketu" },
  { name: "Bharani", lord: "Venus" },
  { name: "Krittika", lord: "Sun" },
  { name: "Rohini", lord: "Moon" },
  { name: "Mrigashira", lord: "Mars" },
  { name: "Ardra", lord: "Rahu" },
  { name: "Punarvasu", lord: "Jupiter" },
  { name: "Pushya", lord: "Saturn" },
  { name: "Ashlesha", lord: "Mercury" },
  { name: "Magha", lord: "Ketu" },
  { name: "Purva Phalguni", lord: "Venus" },
  { name: "Uttara Phalguni", lord: "Sun" },
  { name: "Hasta", lord: "Moon" },
  { name: "Chitra", lord: "Mars" },
  { name: "Swati", lord: "Rahu" },
  { name: "Vishakha", lord: "Jupiter" },
  { name: "Anuradha", lord: "Saturn" },
  { name: "Jyeshtha", lord: "Mercury" },
  { name: "Mula", lord: "Ketu" },
  { name: "Purva Ashadha", lord: "Venus" },
  { name: "Uttara Ashadha", lord: "Sun" },
  { name: "Shravana", lord: "Moon" },
  { name: "Dhanishtha", lord: "Mars" },
  { name: "Shatabhisha", lord: "Rahu" },
  { name: "Purva Bhadrapada", lord: "Jupiter" },
  { name: "Uttara Bhadrapada", lord: "Saturn" },
  { name: "Revati", lord: "Mercury" },
] as const;
const NAKSHATRA_SPAN = 360 / 27; // 13°20'

const DASHA_SEQUENCE = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
const DASHA_YEARS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};
const TOTAL_DASHA_YEARS = Object.values(DASHA_YEARS).reduce((a, b) => a + b, 0); // 120

// Combustion orb (degrees from the Sun) per classical Muhurtha texts.
const COMBUSTION_ORB: Record<string, number> = {
  Moon: 12, Mars: 17, Mercury: 14, Jupiter: 11, Venus: 10, Saturn: 15,
};

const DIGNITY: Record<string, { exalt: string; debil: string; own: string[] }> = {
  Sun: { exalt: "Mesha", debil: "Tula", own: ["Simha"] },
  Moon: { exalt: "Vrishabha", debil: "Vrishchika", own: ["Karka"] },
  Mars: { exalt: "Makara", debil: "Karka", own: ["Mesha", "Vrishchika"] },
  Mercury: { exalt: "Kanya", debil: "Meena", own: ["Mithuna", "Kanya"] },
  Jupiter: { exalt: "Karka", debil: "Makara", own: ["Dhanu", "Meena"] },
  Venus: { exalt: "Meena", debil: "Kanya", own: ["Vrishabha", "Tula"] },
  Saturn: { exalt: "Tula", debil: "Mesha", own: ["Makara", "Kumbha"] },
  Rahu: { exalt: "Vrishabha", debil: "Vrishchika", own: [] },
  Ketu: { exalt: "Vrishchika", debil: "Vrishabha", own: [] },
};

const CRYSTAL_MAP: Record<string, { crystal: string; image: string; benefit: string }> = {
  Sun: { crystal: "Citrine", image: "/product-3.webp", benefit: "Boosts confidence, vitality & leadership" },
  Moon: { crystal: "Moonstone", image: "/product-2.webp", benefit: "Calms emotions, enhances intuition" },
  Mars: { crystal: "Red Jasper", image: "/product-1.webp", benefit: "Builds courage & life force energy" },
  Mercury: { crystal: "Green Aventurine", image: "/product-1.webp", benefit: "Sharpens intellect & communication" },
  Jupiter: { crystal: "Amethyst", image: "/product-2.webp", benefit: "Attracts wisdom, growth & abundance" },
  Venus: { crystal: "Rose Quartz", image: "/product-1.webp", benefit: "Opens the heart to love & beauty" },
  Saturn: { crystal: "Black Tourmaline", image: "/product-1.webp", benefit: "Grounds energy & removes obstacles" },
  Rahu: { crystal: "Lapis Lazuli", image: "/product-2.webp", benefit: "Cuts illusion & amplifies ambition" },
  Ketu: { crystal: "Clear Quartz", image: "/product-4.webp", benefit: "Deepens spiritual insight & liberation" },
};

const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami",
  "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi",
];
const KARANA_NAMES = ["Bava", "Balava", "Kaulava", "Taitila", "Garija", "Vanija", "Vishti"];
const FIXED_KARANAS = ["Shakuni", "Chatushpada", "Naga", "Kimstughna"];
const YOGA_NAMES = [
  "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma",
  "Dhriti", "Shoola", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
  "Siddhi", "Vyatipata", "Variyana", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha",
  "Shukla", "Brahma", "Indra", "Vaidhriti",
];
const WEEKDAYS = ["Ravivar (Sunday)", "Somvar (Monday)", "Mangalvar (Tuesday)", "Budhvar (Wednesday)", "Guruvar (Thursday)", "Shukravar (Friday)", "Shanivar (Saturday)"];

const PLANET_META: { name: string; sanskrit: string; symbol: string; color: string }[] = [
  { name: "Sun", sanskrit: "Surya", symbol: "\u2609", color: "#f59e0b" },
  { name: "Moon", sanskrit: "Chandra", symbol: "\u263D", color: "#94a3b8" },
  { name: "Mars", sanskrit: "Mangal", symbol: "\u2642", color: "#ef4444" },
  { name: "Mercury", sanskrit: "Budha", symbol: "\u263F", color: "#10b981" },
  { name: "Jupiter", sanskrit: "Guru", symbol: "\u2643", color: "#8b5cf6" },
  { name: "Venus", sanskrit: "Shukra", symbol: "\u2640", color: "#ec4899" },
  { name: "Saturn", sanskrit: "Shani", symbol: "\u2644", color: "#64748b" },
  { name: "Rahu", sanskrit: "Rahu", symbol: "\u260A", color: "#6366f1" },
  { name: "Ketu", sanskrit: "Ketu", symbol: "\u260B", color: "#d97706" },
];

// ─── Time & ephemeris helpers ───────────────────────────────────────────────
function julianDayUT(time: Astronomy.AstroTime): number {
  return 2451545.0 + time.ut;
}

/** Lahiri (Chitrapaksha) ayanamsa in degrees, accurate to a few arcseconds 1900-2100. */
function lahiriAyanamsa(time: Astronomy.AstroTime): number {
  const jdTT = 2451545.0 + time.tt;
  const T = (jdTT - 2451545.0) / 365.25; // Julian years since J2000.0
  // 23.85333deg at J2000 (Chitrapaksha), precessing at ~50.2388"/yr.
  return 23.85333 + T * (50.2388 / 3600);
}

/** Mean lunar ascending node (Meeus 22.2), used as Rahu in Vedic practice. */
function meanNodeLongitude(time: Astronomy.AstroTime): number {
  const jdTT = 2451545.0 + time.tt;
  const T = (jdTT - 2451545.0) / 36525; // Julian centuries TT
  const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
  return normalize(omega);
}

function tropicalLongitude(body: Astronomy.Body, time: Astronomy.AstroTime): number {
  // Geocentric apparent ecliptic-of-date longitude (includes light-time & aberration).
  const geo = Astronomy.GeoVector(body, time, true);
  return normalize(Astronomy.Ecliptic(geo).elon);
}

function ascendantTropicalLongitude(time: Astronomy.AstroTime, latDeg: number, lonDeg: number): number {
  const gastHours = Astronomy.SiderealTime(time); // Greenwich Apparent Sidereal Time
  const lstDeg = normalize((gastHours + lonDeg / 15) * 15);
  const lstRad = toRad(lstDeg);
  const tilt = Astronomy.e_tilt(time);
  const epsRad = toRad(tilt.tobl); // true obliquity of date
  const latRad = toRad(latDeg);
  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  return normalize(toDeg(Math.atan2(y, x)));
}

function isRetrograde(body: Astronomy.Body, time: Astronomy.AstroTime): boolean {
  const dt = 0.5; // days
  const before = tropicalLongitude(body, time.AddDays(-dt));
  const after = tropicalLongitude(body, time.AddDays(dt));
  let diff = after - before;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

function getRashiIndex(siderealLon: number): number {
  return Math.floor(siderealLon / 30); // 0-11
}

function getNakshatra(siderealLon: number): { name: string; pada: number; lord: string; index: number } {
  const idx = Math.min(Math.floor(siderealLon / NAKSHATRA_SPAN), 26);
  const nk = NAKSHATRAS[idx]!;
  const posInNk = siderealLon - idx * NAKSHATRA_SPAN;
  const pada = Math.min(Math.floor(posInNk / (NAKSHATRA_SPAN / 4)) + 1, 4);
  return { name: nk.name, pada, lord: nk.lord, index: idx };
}

function getHouse(rashiIndex: number, lagnaRashiIndex: number): number {
  return ((rashiIndex - lagnaRashiIndex + 12) % 12) + 1;
}

function getDignity(planet: string, rashiIndex: number): string | null {
  const d = DIGNITY[planet];
  if (!d) return null;
  const rashiName = RASHIS[rashiIndex]!.name;
  if (rashiName === d.exalt) return "Exalted";
  if (rashiName === d.debil) return "Debilitated";
  if (d.own.includes(rashiName)) return "Own Sign";
  return null;
}

// ─── Public types ───────────────────────────────────────────────────────────
export interface BirthInput {
  name: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM local (24h)
  latitude: number;
  longitude: number;
  place: string;
}

export interface PlanetResult {
  name: string; sanskrit: string; symbol: string;
  longitude: number; degreeInSign: number;
  rashi: number; rashiName: string; rashiSymbol: string;
  nakshatra: string; nakshatraPada: number; nakshatraLord: string;
  house: number; isRetrograde: boolean; isCombust: boolean;
  dignity: string | null; color: string;
}

export interface AntarDashaResult { lord: string; startDate: string; endDate: string }
export interface DashaPeriodResult { lord: string; startDate: string; endDate: string; years: number; antardashas?: AntarDashaResult[] }
export interface YogaResult { name: string; description: string; strength: string }
export interface DoshaResult { name: string; description: string; remedy: string; severity: string }
export interface CrystalRecResult { crystal: string; reason: string; planet: string; image: string; benefit: string }
export interface PanchangResult {
  tithi: string; tithiNumber: number; paksha: string;
  nakshatra: string; nakshatraPada: number; yogaName: string; karana: string;
  vara: string; sunrise: string; sunset: string;
}

export interface KundaliChartResult {
  lagna: number; lagnaName: string; lagnaSymbol: string; lagnaLongitude: number;
  planets: PlanetResult[]; houseRashis: number[];
  moonSign: string; moonSignSymbol: string; sunSign: string;
  nakshatra: string; nakshatraPada: number; nakshatraLord: string;
  crystalRecommendations: CrystalRecResult[];
  yogas: YogaResult[]; doshas: DoshaResult[];
  currentDasha: DashaPeriodResult; currentAntardasha?: AntarDashaResult;
  dashaSequence: DashaPeriodResult[]; panchang: PanchangResult; ayanamsa: number;
}

export class InvalidBirthDataError extends Error {}

// ─── Local time resolution ──────────────────────────────────────────────────
/** Resolves the exact UTC instant of a local birth date/time using the historically
 *  correct IANA timezone for the given coordinates (handles DST / historical offset
 *  changes automatically, e.g. British "double summer time", pre-1955 Indian offsets). */
function resolveBirthInstant(input: BirthInput): { utcDate: Date; timezone: string } {
  const zones = findTimeZone(input.latitude, input.longitude);
  const timezone = zones[0] ?? "UTC";
  const iso = `${input.date}T${input.time}:00`;
  const dt = DateTime.fromISO(iso, { zone: timezone });
  if (!dt.isValid) {
    throw new InvalidBirthDataError(dt.invalidExplanation ?? "Invalid date/time");
  }
  return { utcDate: dt.toUTC().toJSDate(), timezone };
}

// ─── Vimshottari Dasha ──────────────────────────────────────────────────────
function computeDashaSequence(moonSiderealLon: number, birthDate: Date): { sequence: DashaPeriodResult[]; current: DashaPeriodResult; currentAntardasha: AntarDashaResult } {
  const nk = getNakshatra(moonSiderealLon);
  const startLordIdx = DASHA_SEQUENCE.indexOf(nk.lord);
  // Fraction of the birth-nakshatra already elapsed determines the balance of the first dasha.
  const posInNk = moonSiderealLon - nk.index * NAKSHATRA_SPAN;
  const fractionElapsed = posInNk / NAKSHATRA_SPAN;
  const firstLordYears = DASHA_YEARS[nk.lord]!;
  const balanceYears = firstLordYears * (1 - fractionElapsed);

  const sequence: DashaPeriodResult[] = [];
  let cursor = DateTime.fromJSDate(birthDate, { zone: "utc" });

  for (let i = 0; i < 9; i++) {
    const lord = DASHA_SEQUENCE[(startLordIdx + i) % 9]!;
    const years = i === 0 ? balanceYears : DASHA_YEARS[lord]!;
    const start = cursor;
    const end = cursor.plus({ years });
    sequence.push({
      lord,
      startDate: start.toISODate()!,
      endDate: end.toISODate()!,
      years: Math.round(years * 100) / 100,
    });
    cursor = end;
  }
  // Extend a second full 120-year cycle so `currentDasha` resolves for any lookup date far from birth.
  for (let cycle = 1; cycle <= 2; cycle++) {
    for (let i = 0; i < 9; i++) {
      const lord = DASHA_SEQUENCE[(startLordIdx + i) % 9]!;
      const years = DASHA_YEARS[lord]!;
      const start = cursor;
      const end = cursor.plus({ years });
      sequence.push({ lord, startDate: start.toISODate()!, endDate: end.toISODate()!, years });
      cursor = end;
    }
  }

  const now = DateTime.utc();
  const current = sequence.find((d) => now >= DateTime.fromISO(d.startDate, { zone: "utc" }) && now < DateTime.fromISO(d.endDate, { zone: "utc" })) ?? sequence[0]!;

  // Antardashas (sub-periods) within the current Mahadasha, in the same Vimshottari order
  // starting from the Mahadasha lord itself.
  const mdLordIdx = DASHA_SEQUENCE.indexOf(current.lord);
  const mdStart = DateTime.fromISO(current.startDate, { zone: "utc" });
  const mdYears = current.years;
  let adCursor = mdStart;
  const antardashas: AntarDashaResult[] = [];
  let currentAntardasha: AntarDashaResult = { lord: current.lord, startDate: current.startDate, endDate: current.endDate };
  for (let i = 0; i < 9; i++) {
    const adLord = DASHA_SEQUENCE[(mdLordIdx + i) % 9]!;
    const adYears = (mdYears * DASHA_YEARS[adLord]!) / TOTAL_DASHA_YEARS;
    const adStart = adCursor;
    const adEnd = adCursor.plus({ years: adYears });
    const ad: AntarDashaResult = { lord: adLord, startDate: adStart.toISODate()!, endDate: adEnd.toISODate()! };
    antardashas.push(ad);
    if (now >= adStart && now < adEnd) currentAntardasha = ad;
    adCursor = adEnd;
  }
  current.antardashas = antardashas;

  return { sequence: sequence.slice(0, 9), current, currentAntardasha };
}

// ─── Yogas ──────────────────────────────────────────────────────────────────
function rashiLord(rashiIndex: number): string {
  return RASHIS[rashiIndex]!.ruler;
}

function detectYogas(planets: PlanetResult[], lagnaRashiIndex: number): YogaResult[] {
  const yogas: YogaResult[] = [];
  const byName = (n: string) => planets.find((p) => p.name === n)!;
  const sun = byName("Sun"), moon = byName("Moon"), mars = byName("Mars"),
    merc = byName("Mercury"), jup = byName("Jupiter"), ven = byName("Venus"), sat = byName("Saturn");
  const kendras = [1, 4, 7, 10];
  const kendraFromEachOther = (h1: number, h2: number) => kendras.includes((((h1 - h2 + 12) % 12) + 1));
  if (kendraFromEachOther(moon.house, jup.house)) {
    yogas.push({ name: "Gaja Kesari Yoga", description: "Moon and Jupiter stand in mutual kendra (angular houses) — grants intelligence, reputation and steady prosperity throughout life.", strength: "Strong" });
  }

  // Panch Mahapurusha Yogas — karaka planet in own/exalted sign AND in a kendra house.
  const mahapurusha: [PlanetResult, string][] = [[mars, "Ruchaka"], [merc, "Bhadra"], [jup, "Hamsa"], [ven, "Malavya"], [sat, "Sasha"]];
  for (const [p, yogaName] of mahapurusha) {
    if (kendras.includes(p.house) && (p.dignity === "Own Sign" || p.dignity === "Exalted")) {
      yogas.push({ name: `${yogaName} Yoga`, description: `${p.name} (${p.sanskrit}) occupies its own/exalted sign in a kendra (house ${p.house}) — one of the five Panch Mahapurusha yogas, indicating exceptional strength of character, status and success tied to ${p.name}'s significations.`, strength: "Very Strong" });
    }
  }

  if (sun.rashi === merc.rashi) {
    yogas.push({ name: "Budh-Aditya Yoga", description: "Sun and Mercury conjoin in the same sign — sharpens intellect, analytical skill and communication; favours careers in analysis, writing and strategy.", strength: "Moderate" });
  }
  if (moon.rashi === mars.rashi) {
    yogas.push({ name: "Chandra-Mangal Yoga", description: "Moon and Mars conjoin — a classical wealth-producing yoga, granting business acumen, drive and the ability to accumulate resources.", strength: "Moderate" });
  }
  if (jup.rashi === mars.rashi) {
    yogas.push({ name: "Guru-Mangal Yoga", description: "Jupiter and Mars conjoin — combines courage with wisdom, favouring leadership, property gains and bold but principled decision-making.", strength: "Moderate" });
  }

  // Raj Yoga: a kendra lord and a trikona lord (from lagna) conjoined in the same rashi.
  const kendraLords = new Set([1, 4, 7, 10].map((h) => rashiLord((lagnaRashiIndex + h - 1) % 12)));
  const trikonaLords = new Set([1, 5, 9].map((h) => rashiLord((lagnaRashiIndex + h - 1) % 12)));
  for (const kl of kendraLords) {
    for (const tl of trikonaLords) {
      if (kl === tl) continue;
      const pk = planets.find((p) => p.name === kl);
      const pt = planets.find((p) => p.name === tl);
      if (pk && pt && pk.rashi === pt.rashi) {
        yogas.push({ name: "Raja Yoga", description: `The lord of a kendra house (${kl}) and the lord of a trikona house (${tl}) unite in the same sign — a classic Raja Yoga bestowing authority, rank and rising fortune.`, strength: "Strong" });
      }
    }
  }

  // Dhana Yoga: 2nd lord and 11th lord conjoined or exchanging signs.
  const lord2 = rashiLord((lagnaRashiIndex + 1) % 12);
  const lord11 = rashiLord((lagnaRashiIndex + 10) % 12);
  const p2 = planets.find((p) => p.name === lord2);
  const p11 = planets.find((p) => p.name === lord11);
  if (p2 && p11 && lord2 !== lord11 && p2.rashi === p11.rashi) {
    yogas.push({ name: "Dhana Yoga", description: "The lords of the 2nd (wealth) and 11th (gains) houses combine — a strong indicator of financial growth and accumulation of assets over the native's life.", strength: "Moderate" });
  }

  // Sunapha / Anapha / Durudhara — planets (excluding Sun) in the 2nd/12th from Moon.
  const nonLuminaries = planets.filter((p) => p.name !== "Sun" && p.name !== "Moon");
  const has2ndFromMoon = nonLuminaries.some((p) => (((p.house - moon.house + 12) % 12) + 1) === 2);
  const has12thFromMoon = nonLuminaries.some((p) => (((p.house - moon.house + 12) % 12) + 1) === 12);
  if (has2ndFromMoon && has12thFromMoon) {
    yogas.push({ name: "Durudhara Yoga", description: "Planets flank the Moon on both sides (2nd and 12th houses from Chandra) — brings comfort, resources and support networks throughout life.", strength: "Moderate" });
  } else if (has2ndFromMoon) {
    yogas.push({ name: "Sunapha Yoga", description: "A planet (other than the Sun) occupies the 2nd house from the Moon — grants self-earned wealth, eloquence and reputation.", strength: "Moderate" });
  } else if (has12thFromMoon) {
    yogas.push({ name: "Anapha Yoga", description: "A planet (other than the Sun) occupies the 12th house from the Moon — grants good health, contentment and a dignified nature.", strength: "Moderate" });
  }

  if (yogas.length === 0) {
    yogas.push({ name: "Standard Chart", description: "No major classical yoga combination is strongly formed; the chart's strength comes from the balance of individual planetary placements, dignities and the running dasha.", strength: "Neutral" });
  }
  return yogas;
}

// ─── Doshas ─────────────────────────────────────────────────────────────────
function detectDoshas(planets: PlanetResult[], lagnaRashiIndex: number, currentTransitSaturnRashi: number): DoshaResult[] {
  const doshas: DoshaResult[] = [];
  const byName = (n: string) => planets.find((p) => p.name === n)!;
  const mars = byName("Mars"), moon = byName("Moon"), sun = byName("Sun"),
    rahu = byName("Rahu"), ketu = byName("Ketu"), jup = byName("Jupiter"), sat = byName("Saturn");

  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const marsCancelled = mars.dignity === "Own Sign" || mars.dignity === "Exalted";
  if (manglikHouses.includes(mars.house)) {
    doshas.push({
      name: "Mangal Dosha (from Lagna)",
      description: `Mars occupies house ${mars.house} from the Ascendant, one of the Manglik houses (1, 2, 4, 7, 8, 12) — traditionally watched for in marriage compatibility.` + (marsCancelled ? " Mars is in its own/exalted sign here, which classically cancels or greatly weakens the dosha." : ""),
      remedy: marsCancelled ? "Largely self-cancelled by Mars' own dignity; Red Coral or Red Jasper can still be worn to further strengthen Mars." : "Worship of Hanuman on Tuesdays, Kumbh Vivah before marriage, or wearing Red Coral after consultation.",
      severity: marsCancelled ? "Low" : "Moderate",
    });
  }
  const marsHouseFromMoon = (((mars.house - moon.house + 12) % 12) + 1);
  if (manglikHouses.includes(marsHouseFromMoon)) {
    doshas.push({
      name: "Mangal Dosha (from Moon)",
      description: `Mars occupies house ${marsHouseFromMoon} counted from the Moon, also considered a Manglik placement in Chandra Kundali analysis.`,
      remedy: "Same remedies as lagna Mangal Dosha; match with another Manglik chart to neutralise the effect.",
      severity: "Moderate",
    });
  }

  // Kaal Sarp Dosha: all seven classical grahas fall within the arc from Rahu to Ketu.
  const classical = [sun, moon, mars, byName("Mercury"), jup, byName("Venus"), sat];
  const rahuLon = rahu.longitude;
  const arcFromRahu = classical.map((p) => normalize(p.longitude - rahuLon));
  const allOneSide = arcFromRahu.every((a) => a < 180) || arcFromRahu.every((a) => a >= 180);
  if (allOneSide) {
    doshas.push({
      name: "Kaal Sarp Dosha",
      description: "All seven classical planets are hemmed between Rahu and Ketu — a Kaal Sarp yoga/dosha associated with karmic struggle early in life followed by sudden, fated rises once the axis matures.",
      remedy: "Nag Panchami puja, chanting the Maha Mrityunjaya mantra, and worship of Lord Shiva are the classical remedies.",
      severity: "Moderate",
    });
  }

  // Sade Sati: transiting Saturn in the 12th, 1st (natal) or 2nd sign from natal Moon.
  const diffFromMoon = ((currentTransitSaturnRashi - moon.rashi + 12) % 12) + 1;
  if (diffFromMoon === 12 || diffFromMoon === 1 || diffFromMoon === 2) {
    const phase = diffFromMoon === 12 ? "Rising phase" : diffFromMoon === 1 ? "Peak phase" : "Setting phase";
    doshas.push({
      name: `Shani Sade Sati — ${phase}`,
      description: "Transiting Saturn is currently within the seven-and-a-half-year cycle around the natal Moon sign, a period of restructuring, discipline and long-term karmic lessons.",
      remedy: "Recite the Shani Chalisa/Hanuman Chalisa on Saturdays, donate black sesame and iron, and avoid unnecessary conflict during this period.",
      severity: diffFromMoon === 1 ? "High" : "Moderate",
    });
  }

  if (jup.rashi === rahu.rashi) {
    doshas.push({
      name: "Guru Chandal Dosha",
      description: "Jupiter conjoins Rahu — can cloud judgement, ethics or belief systems, or produce unconventional, boundary-breaking wisdom depending on the rest of the chart.",
      remedy: "Strengthen Jupiter with Yellow Sapphire (after consultation), recite Guru mantras on Thursdays, and practice ethical discernment.",
      severity: "Moderate",
    });
  }

  if (sun.rashi === rahu.rashi || sun.rashi === ketu.rashi || rahu.house === 9 || ketu.house === 9) {
    doshas.push({
      name: "Pitra Dosha",
      description: "The Sun (or the 9th house of ancestry) is afflicted by a lunar node — traditionally linked to unresolved ancestral karma affecting steady progress.",
      remedy: "Perform Pitru Tarpan/Shraddha rituals, offer water to the Sun at sunrise, and donate on Amavasya (new moon) days.",
      severity: "Low",
    });
  }

  if (sun.rashi === rahu.rashi || sun.rashi === ketu.rashi || moon.rashi === rahu.rashi || moon.rashi === ketu.rashi) {
    doshas.push({
      name: "Grahan (Eclipse) Dosha",
      description: "A luminary (Sun or Moon) conjoins a lunar node, resembling an eclipse axis in the birth chart — can bring intensity, obscured clarity or transformative turning points tied to that luminary's house.",
      remedy: "Chant the Gayatri mantra (for Sun) or Chandra mantras (for Moon), and observe fasting on the relevant eclipse-adjacent days.",
      severity: "Low",
    });
  }

  return doshas;
}

// ─── Crystal / gemstone recommendations ────────────────────────────────────
function getCrystalRecommendations(planets: PlanetResult[], lagnaRashiIndex: number, dashaLord: string): CrystalRecResult[] {
  const recs: CrystalRecResult[] = [];
  const seen = new Set<string>();
  const push = (planet: string, reason: string) => {
    if (seen.has(planet)) return;
    const rec = CRYSTAL_MAP[planet];
    if (!rec) return;
    seen.add(planet);
    recs.push({ planet, reason, ...rec });
  };

  // Primary: the current Mahadasha lord — the single most relevant remedy right now.
  push(dashaLord, `${dashaLord} Mahadasha is currently active — the most impactful gemstone to strengthen now`);

  const lagnaLordName = rashiLord(lagnaRashiIndex);
  push(lagnaLordName, `Lagna lord ${lagnaLordName} — strengthens core vitality and self-expression`);

  const moon = planets.find((p) => p.name === "Moon")!;
  push(rashiLord(moon.rashi - 1), `Moon in ${RASHIS[moon.rashi - 1]!.name} — supports emotional balance and intuition`);

  const weak = planets.find((p) => p.dignity === "Debilitated" && CRYSTAL_MAP[p.name]);
  if (weak) push(weak.name, `${weak.name} is debilitated — remedial support recommended`);

  const retro = planets.find((p) => p.isRetrograde && CRYSTAL_MAP[p.name] && !seen.has(p.name));
  if (retro) push(retro.name, `${retro.name} is retrograde — remedy & balance`);

  return recs.slice(0, 4);
}

// ─── Panchang ───────────────────────────────────────────────────────────────
function computePanchang(sunTropical: number, moonTropical: number, birthDate: Date, sunriseIso: string, sunsetIso: string): PanchangResult {
  const diff = normalize(moonTropical - sunTropical);
  const tithiIndex = Math.floor(diff / 12); // 0-29
  const paksha = tithiIndex < 15 ? "Shukla" : "Krishna";
  const tithiInHalf = tithiIndex % 15;
  const tithiName = tithiInHalf === 14 ? (paksha === "Shukla" ? "Purnima" : "Amavasya") : TITHI_NAMES[tithiInHalf]!;

  const karanaIndex = Math.floor(diff / 6); // 0-59, each tithi = 2 karanas
  let karanaName: string;
  if (karanaIndex === 0) karanaName = FIXED_KARANAS[3]!; // Kimstughna
  else if (karanaIndex >= 57) karanaName = FIXED_KARANAS[(karanaIndex - 57)]!; // Shakuni, Chatushpada, Naga
  else karanaName = KARANA_NAMES[(karanaIndex - 1) % 7]!;

  const nitya = normalize(sunTropical + moonTropical);
  const yogaIdx = Math.min(Math.floor(nitya / NAKSHATRA_SPAN), 26);

  const nk = getNakshatra(normalize(moonTropical)); // panchang nakshatra is conventionally tropical-independent (uses sidereal in practice; approximated here with same span)
  const vara = WEEKDAYS[DateTime.fromJSDate(birthDate, { zone: "utc" }).weekday % 7]!;

  return {
    tithi: tithiName,
    tithiNumber: tithiInHalf + 1,
    paksha,
    nakshatra: nk.name,
    nakshatraPada: nk.pada,
    yogaName: YOGA_NAMES[yogaIdx]!,
    karana: karanaName,
    vara,
    sunrise: sunriseIso,
    sunset: sunsetIso,
  };
}

// ─── Main entry point ───────────────────────────────────────────────────────
export function generateKundali(input: BirthInput): KundaliChartResult {
  if (Number.isNaN(input.latitude) || Number.isNaN(input.longitude)) {
    throw new InvalidBirthDataError("Latitude/longitude are required");
  }

  const { utcDate } = resolveBirthInstant(input);
  const time = Astronomy.MakeTime(utcDate);
  const ayanamsa = lahiriAyanamsa(time);

  const tropSun = tropicalLongitude(Astronomy.Body.Sun, time);
  const tropMoon = tropicalLongitude(Astronomy.Body.Moon, time);
  const tropMars = tropicalLongitude(Astronomy.Body.Mars, time);
  const tropMerc = tropicalLongitude(Astronomy.Body.Mercury, time);
  const tropJup = tropicalLongitude(Astronomy.Body.Jupiter, time);
  const tropVen = tropicalLongitude(Astronomy.Body.Venus, time);
  const tropSat = tropicalLongitude(Astronomy.Body.Saturn, time);
  const tropRahu = meanNodeLongitude(time);
  const tropAsc = ascendantTropicalLongitude(time, input.latitude, input.longitude);

  const sidSun = normalize(tropSun - ayanamsa);
  const sidMoon = normalize(tropMoon - ayanamsa);
  const sidMars = normalize(tropMars - ayanamsa);
  const sidMerc = normalize(tropMerc - ayanamsa);
  const sidJup = normalize(tropJup - ayanamsa);
  const sidVen = normalize(tropVen - ayanamsa);
  const sidSat = normalize(tropSat - ayanamsa);
  const sidRahu = normalize(tropRahu - ayanamsa);
  const sidKetu = normalize(sidRahu + 180);
  const sidAsc = normalize(tropAsc - ayanamsa);

  const lagnaRashiIndex = getRashiIndex(sidAsc);

  const rawPlanets: { name: string; lon: number; retro: boolean; body?: Astronomy.Body }[] = [
    { name: "Sun", lon: sidSun, retro: false },
    { name: "Moon", lon: sidMoon, retro: false },
    { name: "Mars", lon: sidMars, retro: isRetrograde(Astronomy.Body.Mars, time) },
    { name: "Mercury", lon: sidMerc, retro: isRetrograde(Astronomy.Body.Mercury, time) },
    { name: "Jupiter", lon: sidJup, retro: isRetrograde(Astronomy.Body.Jupiter, time) },
    { name: "Venus", lon: sidVen, retro: isRetrograde(Astronomy.Body.Venus, time) },
    { name: "Saturn", lon: sidSat, retro: isRetrograde(Astronomy.Body.Saturn, time) },
    { name: "Rahu", lon: sidRahu, retro: true },
    { name: "Ketu", lon: sidKetu, retro: true },
  ];

  const planets: PlanetResult[] = rawPlanets.map((rp) => {
    const meta = PLANET_META.find((m) => m.name === rp.name)!;
    const rashiIndex = getRashiIndex(rp.lon);
    const nk = getNakshatra(rp.lon);
    const combustOrb = COMBUSTION_ORB[rp.name];
    const angleFromSun = Math.min(Math.abs(normalize(rp.lon - sidSun)), 360 - Math.abs(normalize(rp.lon - sidSun)));
    const isCombust = rp.name !== "Sun" && combustOrb !== undefined && angleFromSun <= combustOrb;
    return {
      name: rp.name, sanskrit: meta.sanskrit, symbol: meta.symbol,
      longitude: rp.lon, degreeInSign: rp.lon - rashiIndex * 30,
      rashi: rashiIndex + 1, rashiName: RASHIS[rashiIndex]!.name, rashiSymbol: RASHIS[rashiIndex]!.symbol,
      nakshatra: nk.name, nakshatraPada: nk.pada, nakshatraLord: nk.lord,
      house: getHouse(rashiIndex, lagnaRashiIndex),
      isRetrograde: rp.retro, isCombust,
      dignity: getDignity(rp.name, rashiIndex),
      color: meta.color,
    };
  });

  const houseRashis: number[] = Array.from({ length: 12 }, (_, h) => ((lagnaRashiIndex + h) % 12) + 1);

  const moonInfo = planets.find((p) => p.name === "Moon")!;
  const nkInfo = getNakshatra(sidMoon);

  const { sequence, current, currentAntardasha } = computeDashaSequence(sidMoon, utcDate);

  // Current transiting Saturn sign (for Sade Sati) evaluated at "now", not at birth.
  const nowTime = Astronomy.MakeTime(new Date());
  const nowAyanamsa = lahiriAyanamsa(nowTime);
  const transitSaturnSidereal = normalize(tropicalLongitude(Astronomy.Body.Saturn, nowTime) - nowAyanamsa);
  const transitSaturnRashi = getRashiIndex(transitSaturnSidereal) + 1;

  const doshas = detectDoshas(planets, lagnaRashiIndex, transitSaturnRashi);
  const yogas = detectYogas(planets, lagnaRashiIndex);
  const crystalRecommendations = getCrystalRecommendations(planets, lagnaRashiIndex, current.lord);

  // Panchang: sunrise/sunset at the birth location on the birth date.
  const observer = new Astronomy.Observer(input.latitude, input.longitude, 0);
  const dayStart = Astronomy.MakeTime(new Date(utcDate.getTime() - 24 * 3600 * 1000));
  const sunriseTime = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, dayStart, 2) ?? time;
  const sunsetTime = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, dayStart, 2) ?? time;
  const panchang = computePanchang(
    tropSun, tropMoon, utcDate,
    DateTime.fromJSDate(sunriseTime.date).toUTC().toFormat("HH:mm 'UTC'"),
    DateTime.fromJSDate(sunsetTime.date).toUTC().toFormat("HH:mm 'UTC'"),
  );

  return {
    lagna: lagnaRashiIndex + 1,
    lagnaName: RASHIS[lagnaRashiIndex]!.name,
    lagnaSymbol: RASHIS[lagnaRashiIndex]!.symbol,
    lagnaLongitude: sidAsc,
    planets,
    houseRashis,
    moonSign: moonInfo.rashiName,
    moonSignSymbol: moonInfo.rashiSymbol,
    sunSign: planets.find((p) => p.name === "Sun")!.rashiName,
    nakshatra: nkInfo.name,
    nakshatraPada: nkInfo.pada,
    nakshatraLord: nkInfo.lord,
    crystalRecommendations,
    yogas,
    doshas,
    currentDasha: current,
    currentAntardasha,
    dashaSequence: sequence,
    panchang,
    ayanamsa,
  };
}
