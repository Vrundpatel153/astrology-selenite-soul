"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import InteractiveNumerologyMatrix, { NUMEROLOGY_ARCHETYPES } from "@/components/InteractiveNumerologyMatrix";
import { toast } from "sonner";
import { ArrowRight, RefreshCw, Heart, Compass, Shield } from "lucide-react";
import { Link } from "wouter";

// ─── Pythagorean Numerology Engine ─────────────────────────────────────────────
const LETTER_MAP: Record<string, number> = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
  j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
  s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8,
};

function reduceToMasterOrSingle(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) {
    n = String(n).split("").reduce((sum, d) => sum + Number(d), 0);
    if (n === 11 || n === 22 || n === 33) return n;
  }
  return n;
}

function getLifePathNumber(dateStr: string): { number: number; steps: string } {
  if (!dateStr) return { number: 0, steps: "" };
  const [year, month, day] = dateStr.split("-").map(Number);
  const mSum = reduceToMasterOrSingle(month);
  const dSum = reduceToMasterOrSingle(day);
  const ySum = reduceToMasterOrSingle(
    String(year).split("").reduce((a, b) => a + Number(b), 0)
  );
  const total = mSum + dSum + ySum;
  const number = reduceToMasterOrSingle(total);
  const steps = `Month (${mSum}) + Day (${dSum}) + Year (${ySum}) = ${total} → ${number}`;
  return { number, steps };
}

// ─── Compatibility Section ──────────────────────────────────────────────────────
function CompatibilityCalculator() {
  const [a, setA] = useState({ name: "", date: "1994-04-12" });
  const [b, setB] = useState({ name: "", date: "1996-08-15" });
  const [result, setResult] = useState<{ numA: number; numB: number; score: number } | null>(null);

  function calculate() {
    if (!a.date || !b.date) { toast.error("Please enter both birth dates."); return; }
    const numA = getLifePathNumber(a.date).number;
    const numB = getLifePathNumber(b.date).number;
    const baseA = numA > 9 ? numA - 9 : numA;
    const baseB = numB > 9 ? numB - 9 : numB;
    const diff = Math.abs(baseA - baseB);
    const score = diff === 0 ? 96 : diff <= 2 ? 88 : diff <= 4 ? 76 : diff <= 6 ? 64 : 52;
    setResult({ numA, numB, score });
  }

  function compatDesc(score: number) {
    if (score >= 90) return "Cosmic Alchemy — your life path numbers resonate at the deepest vibrational core, fostering effortless spiritual harmony and mutual elevation.";
    if (score >= 80) return "Strong Resonance — your energetic blueprints complement each other with natural understanding, shared ethics, and passionate collaboration.";
    if (score >= 70) return "Dynamic Growth — you challenge each other to expand beyond comfort zones, teaching valuable karmic lessons through healthy balance.";
    return "Transformative Dynamic — differences in core purpose require conscious communication, boundary respect, and mutual celebration of each other's unique perspective.";
  }

  return (
    <div className="bg-[#10080d]/95 border border-[#c8a951]/35 p-8 md:p-12 shadow-2xl backdrop-blur-md rounded-sm">
      <div className="text-center max-w-xl mx-auto mb-10">
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-2">Vibrational Synergy</p>
        <h3 className="text-3xl font-light text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Numerology Compatibility Matcher
        </h3>
        <p className="text-xs text-white/60 mt-2 font-light">
          Compare two birth dates to calculate the resonance score and energetic dynamic between your life path numbers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Person A */}
        <div className="p-6 bg-[#080406] border border-[#c8a951]/25 rounded-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-4">First Person's Details</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-white/60 mb-1.5">Name</label>
              <input
                value={a.name} onChange={e => setA(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Maya"
                className="w-full bg-[#140b11] border border-[#c8a951]/30 text-white px-3.5 py-2.5 text-sm outline-none focus:border-[#c8a951] rounded-sm placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-white/60 mb-1.5">Date of Birth</label>
              <input
                type="date" value={a.date} onChange={e => setA(p => ({ ...p, date: e.target.value }))}
                className="w-full bg-[#140b11] border border-[#c8a951]/30 text-white px-3.5 py-2.5 text-sm outline-none focus:border-[#c8a951] rounded-sm [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* Person B */}
        <div className="p-6 bg-[#080406] border border-[#c8a951]/25 rounded-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-4">Second Person's Details</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-white/60 mb-1.5">Name</label>
              <input
                value={b.name} onChange={e => setB(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Rohan"
                className="w-full bg-[#140b11] border border-[#c8a951]/30 text-white px-3.5 py-2.5 text-sm outline-none focus:border-[#c8a951] rounded-sm placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-white/60 mb-1.5">Date of Birth</label>
              <input
                type="date" value={b.date} onChange={e => setB(p => ({ ...p, date: e.target.value }))}
                className="w-full bg-[#140b11] border border-[#c8a951]/30 text-white px-3.5 py-2.5 text-sm outline-none focus:border-[#c8a951] rounded-sm [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <motion.button
          onClick={calculate}
          className="bg-[#c8a951] text-[#0a0508] px-10 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] shadow-xl hover:shadow-[#c8a951]/30 rounded-sm cursor-pointer"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        >
          Analyze Compatibility
        </motion.button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-[#080406] border border-[#c8a951] rounded-sm text-center"
          >
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <span className="text-4xl font-light text-[#c8a951]" style={{ fontFamily: "'Playfair Display', serif" }}>{result.numA}</span>
                <p className="text-[9px] uppercase tracking-wider text-white/60 mt-1">{a.name || "Person A"} Life Path</p>
              </div>
              <span className="text-2xl text-[#c8a951]/60 font-light">+</span>
              <div className="text-center">
                <span className="text-4xl font-light text-[#c8a951]" style={{ fontFamily: "'Playfair Display', serif" }}>{result.numB}</span>
                <p className="text-[9px] uppercase tracking-wider text-white/60 mt-1">{b.name || "Person B"} Life Path</p>
              </div>
            </div>

            <div className="inline-block px-6 py-2 bg-[#c8a951]/15 border border-[#c8a951]/40 rounded-full mb-4">
              <span className="text-xl font-bold text-[#c8a951]">{result.score}% Harmonic Resonance</span>
            </div>

            <p className="text-sm text-white/80 max-w-lg mx-auto leading-relaxed font-light mb-6">
              {compatDesc(result.score)}
            </p>

            <Link href="/tarot#book">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] hover:text-white border-b border-[#c8a951]/40 pb-0.5 cursor-pointer">
                Book Full Relationship Reading <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Master Numbers Deep Dive ──────────────────────────────────────────────────
const masterNumbers = [11, 22, 33];

export default function Numerology() {
  return (
    <div className="min-h-screen bg-[#fcf8f4] text-[#2a1f1a] overflow-x-hidden">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#0c070a]">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] bg-[#c8a951]/10" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951]">Pythagorean Sacred Matrix</span>
            <div className="h-px w-10 bg-[#c8a951]/60" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The Secret Language<br />
            <span className="italic text-[#c8a951]">of Numbers</span>
          </h1>
          <p className="text-[#fdf8f4]/70 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mb-10">
            From the moment of your birth, numbers encoded the energetic geometry of your soul. Calculate your Life Path, Name Destiny, and sacred Master Numbers below.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#interactive-matrix">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#0a0508] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-lg"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Launch Live Matrix <ArrowRight className="w-4 h-4" />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── LIVE INTERACTIVE NUMEROLOGY MATRIX ─────────────────────────────────── */}
      <section id="interactive-matrix" className="py-20 md:py-28 px-6 bg-[#090407] border-t border-b border-[#c8a951]/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">Live Engine</p>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Calculate Your <em className="italic text-[#c8a951]">Core Vibration</em>
            </h2>
            <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
              Toggle between your birthdate for soul purpose or your full birth name for outer expression.
            </p>
          </div>

          <InteractiveNumerologyMatrix />
        </div>
      </section>

      {/* ── MASTER NUMBERS SECTION ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#fcf8f4]">
        <div className="max-w-[1240px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Sacred Higher Octaves</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              The Master Numbers: 11, 22 & 33
            </h2>
            <p className="text-[#4a3020]/75 max-w-xl mx-auto text-sm leading-relaxed font-light">
              Master numbers are never reduced to a single digit because they carry an intense energetic charge and a heavy spiritual responsibility.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {masterNumbers.map((m) => {
              const details = NUMEROLOGY_ARCHETYPES[m];
              return (
                <div key={m} className="bg-white/90 border border-[#c8a951]/35 p-8 rounded-sm shadow-xl flex flex-col justify-between group hover:border-[#c8a951] transition-all">
                  <div>
                    <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[#e8d9cf]">
                      <span className="text-5xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>{m}</span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a5762a]">Master Vibration</span>
                    </div>
                    <h3 className="text-xl font-light text-[#2a1f1a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{details.title}</h3>
                    <p className="text-xs md:text-sm text-[#4a3020]/75 leading-relaxed font-light mb-6">{details.description}</p>
                  </div>
                  <div className="pt-4 border-t border-[#e8d9cf]/60">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1">Crystal Ally</p>
                    <p className="text-xs font-semibold text-[#2a1f1a]">{details.crystal}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPATIBILITY MATCHER ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#0c070a] text-white">
        <div className="max-w-[1000px] mx-auto">
          <CompatibilityCalculator />
        </div>
      </section>

      <Footer />
    </div>
  );
}
