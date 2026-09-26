"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import InteractiveNumerologyMatrix, { NUMEROLOGY_ARCHETYPES } from "@/components/InteractiveNumerologyMatrix";
import {
  calculateDriverNumber,
  calculateDestinyNumber,
  calculateChaldeanCompatibility,
  CHALDEAN_COMPOUND_NUMBERS,
  CHALDEAN_ARCHETYPES,
} from "@/lib/chaldeanNumerology";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

// ─── Chaldean Compatibility Section ──────────────────────────────────────────
function ChaldeanCompatibilityCalculator() {
  const [a, setA] = useState({ name: "", date: "1994-04-12" });
  const [b, setB] = useState({ name: "", date: "1996-08-15" });
  const [result, setResult] = useState<{
    driverA: number;
    destinyA: number;
    driverB: number;
    destinyB: number;
    score: number;
    relation: string;
    description: string;
  } | null>(null);

  function calculate() {
    if (!a.date || !b.date) {
      toast.error("Please enter both birth dates.");
      return;
    }
    const dDataA = calculateDriverNumber(a.date);
    const destDataA = calculateDestinyNumber(a.date);
    const dDataB = calculateDriverNumber(b.date);
    const destDataB = calculateDestinyNumber(b.date);

    // Calculate Driver to Driver compatibility & Destiny to Destiny
    const driverMatch = calculateChaldeanCompatibility(dDataA.driverNumber, dDataB.driverNumber);
    const destinyMatch = calculateChaldeanCompatibility(destDataA.destinyNumber, destDataB.destinyNumber);

    // Weighted score: 50% Driver, 50% Destiny
    const blendedScore = Math.round((driverMatch.score + destinyMatch.score) / 2);

    setResult({
      driverA: dDataA.driverNumber,
      destinyA: destDataA.destinyNumber,
      driverB: dDataB.driverNumber,
      destinyB: destDataB.destinyNumber,
      score: blendedScore,
      relation: driverMatch.relation,
      description: driverMatch.description,
    });
  }

  return (
    <div className="bg-white/95 border border-[#c8a951]/40 p-8 md:p-12 shadow-2xl backdrop-blur-md rounded-sm">
      <div className="text-center max-w-xl mx-auto mb-10">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a] mb-2">Vibrational Synergy</p>
        <h3 className="text-3xl font-light text-[#2a1f1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Chaldean Planetary Compatibility Matcher
        </h3>
        <p className="text-xs text-[#4a382e]/80 mt-2 font-light">
          Compare two birth dates to calculate the energetic resonance between both Driver (Moolank) and Destiny (Bhagyank) numbers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Person A */}
        <div className="p-6 bg-[#fdf8f4] border border-[#e8d9cf] rounded-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-4">First Person's Details</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#4a382e] mb-1.5">Name</label>
              <input
                value={a.name}
                onChange={(e) => setA((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Maya"
                className="w-full bg-white border border-[#e8d9cf] text-[#2a1f1a] px-3.5 py-2.5 text-sm outline-none focus:border-[#c8a951] rounded-sm placeholder:text-[#2a1f1a]/30"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#4a382e] mb-1.5">Date of Birth</label>
              <input
                type="date"
                value={a.date}
                onChange={(e) => setA((p) => ({ ...p, date: e.target.value }))}
                className="w-full bg-white border border-[#e8d9cf] text-[#2a1f1a] px-3.5 py-2.5 text-sm outline-none focus:border-[#c8a951] rounded-sm [color-scheme:light]"
              />
            </div>
          </div>
        </div>

        {/* Person B */}
        <div className="p-6 bg-[#fdf8f4] border border-[#e8d9cf] rounded-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-4">Second Person's Details</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#4a382e] mb-1.5">Name</label>
              <input
                value={b.name}
                onChange={(e) => setB((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Rohan"
                className="w-full bg-white border border-[#e8d9cf] text-[#2a1f1a] px-3.5 py-2.5 text-sm outline-none focus:border-[#c8a951] rounded-sm placeholder:text-[#2a1f1a]/30"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#4a382e] mb-1.5">Date of Birth</label>
              <input
                type="date"
                value={b.date}
                onChange={(e) => setB((p) => ({ ...p, date: e.target.value }))}
                className="w-full bg-white border border-[#e8d9cf] text-[#2a1f1a] px-3.5 py-2.5 text-sm outline-none focus:border-[#c8a951] rounded-sm [color-scheme:light]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <motion.button
          onClick={calculate}
          className="bg-[#c8a951] text-[#1a0e05] px-10 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] shadow-xl hover:shadow-[#c8a951]/30 rounded-sm cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Analyze Chaldean Compatibility
        </motion.button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-[#fdf8f4] border border-[#c8a951] rounded-sm text-center shadow-md"
          >
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-6">
              <div className="p-4 bg-white border border-[#e8d9cf] rounded-sm">
                <span className="text-xs uppercase tracking-wider text-[#665242] block font-bold mb-1">
                  {a.name || "Person A"}
                </span>
                <p className="text-2xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Driver {result.driverA} · Destiny {result.destinyA}
                </p>
                <p className="text-[10px] text-[#665242] mt-1">
                  {CHALDEAN_ARCHETYPES[result.driverA]?.planet} Vibration
                </p>
              </div>

              <div className="p-4 bg-white border border-[#e8d9cf] rounded-sm">
                <span className="text-xs uppercase tracking-wider text-[#665242] block font-bold mb-1">
                  {b.name || "Person B"}
                </span>
                <p className="text-2xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Driver {result.driverB} · Destiny {result.destinyB}
                </p>
                <p className="text-[10px] text-[#665242] mt-1">
                  {CHALDEAN_ARCHETYPES[result.driverB]?.planet} Vibration
                </p>
              </div>
            </div>

            <div className="inline-block px-6 py-2 bg-[#c8a951]/15 border border-[#c8a951]/40 rounded-full mb-4">
              <span className="text-xl font-bold text-[#a5762a]">
                {result.score}% Chaldean Resonance ({result.relation})
              </span>
            </div>

            <p className="text-sm text-[#4a382e] max-w-lg mx-auto leading-relaxed font-light mb-6">
              {result.description}
            </p>

            <Link href="/tarot#book">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] hover:text-[#2a1f1a] border-b border-[#c8a951]/40 pb-0.5 cursor-pointer">
                Book Full Relationship Reading with Ektaz Shah <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Key Chaldean Sacred Compound Numbers ──────────────────────────────────────
const sacredCompoundKeys = [19, 23, 24, 33, 37];

export default function Numerology() {
  return (
    <div className="min-h-screen bg-[#fcf8f4] text-[#2a1f1a] overflow-x-hidden">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#fdf8f4]">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] bg-[#c8a951]/15" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-10 md:py-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#a5762a]">
              Chaldean Sacred Matrix
            </span>
            <div className="h-px w-10 bg-[#c8a951]/60" />
          </div>
          <h1
            className="text-5xl md:text-7xl font-light text-[#2a1f1a] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The Sacred Sound Vibration<br />
            <span className="italic text-[#a5762a]">of Chaldean Numbers</span>
          </h1>
          <p className="text-[#4a382e]/80 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Rooted in ancient Babylonian acoustics and Vedic planetary frequencies. Decode your Driver Number (Moolank), Destiny Number (Bhagyank), and Name Compound Vibration below.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#interactive-matrix">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1a0e05] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Launch Chaldean Matrix <ArrowRight className="w-4 h-4" />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── LIVE INTERACTIVE NUMEROLOGY MATRIX ─────────────────────────────────── */}
      <section id="interactive-matrix" className="py-10 md:py-14 px-6 bg-[#f9f4ee] border-t border-b border-[#e8d9cf]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a] mb-2">Chaldean Engine</p>
            <h2
              className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Calculate Your <em className="italic text-[#a5762a]">Sound Frequency</em>
            </h2>
            <p className="text-xs md:text-sm text-[#4a382e]/80 font-light leading-relaxed">
              Examine your birth blueprint (Driver & Destiny), test your full name for occult compound vibrations, or explore the sacred 1 to 8 sound frequency grid.
            </p>
          </div>

          <InteractiveNumerologyMatrix />
        </div>
      </section>

      {/* ── SACRED COMPOUND NUMBERS SECTION ───────────────────────────────────── */}
      <section className="py-10 md:py-14 px-6 bg-[#fcf8f4]">
        <div className="max-w-[1240px] mx-auto">
          <ScrollReveal className="text-center mb-8 md:mb-10">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">
                Esoteric Chaldean Compounds
              </span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2
              className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Most Fortunate Compound Vibrations
            </h2>
            <p className="text-[#4a382e]/75 max-w-2xl mx-auto text-sm leading-relaxed font-light">
              In authentic Chaldean numerology, the double-digit compound number reveals the spiritual and karmic destiny behind the outward physical root number.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {sacredCompoundKeys.map((cNum) => {
              const comp = CHALDEAN_COMPOUND_NUMBERS[cNum];
              const rootArch = CHALDEAN_ARCHETYPES[comp.root];
              return (
                <div
                  key={cNum}
                  className="bg-white/95 border border-[#c8a951]/35 p-6 rounded-sm shadow-md flex flex-col justify-between group hover:border-[#c8a951] hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-[#e8d9cf]">
                      <span className="text-4xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {cNum}
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#a5762a]">
                        Root {comp.root}
                      </span>
                    </div>
                    <h3 className="text-base font-light text-[#2a1f1a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {comp.name}
                    </h3>
                    <p className="text-xs text-[#4a382e]/80 leading-relaxed font-light mb-4">
                      {comp.symbolism}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#e8d9cf]/60">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-[#a5762a] mb-0.5">Ruling Planet</p>
                    <p className="text-xs font-semibold text-[#2a1f1a]">{rootArch.planet} ({rootArch.vedicPlanet})</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CHALDEAN COMPATIBILITY MATCHER ────────────────────────────────────── */}
      <section className="py-10 md:py-14 px-6 bg-[#f7efe6] border-t border-[#e8d9cf]">
        <div className="max-w-[1000px] mx-auto">
          <ChaldeanCompatibilityCalculator />
        </div>
      </section>

      <Footer />
    </div>
  );
}
