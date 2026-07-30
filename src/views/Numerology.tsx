"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { toast } from "sonner";
import { ArrowRight, Sparkles, Star, RefreshCw } from "lucide-react";

// ─── Pythagorean Numerology ─────────────────────────────────────────────────────
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

function getNameNumber(name: string): { number: number; steps: string } {
  const letters = name.toLowerCase().replace(/[^a-z]/g, "").split("");
  if (!letters.length) return { number: 0, steps: "" };
  const values = letters.map(l => LETTER_MAP[l] ?? 0);
  const sum = values.reduce((a, b) => a + b, 0);
  const number = reduceToMasterOrSingle(sum);
  const steps = `${letters.join(" + ")} = ${values.join(" + ")} = ${sum} → ${number}`;
  return { number, steps };
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
  const steps = `Month ${month} = ${mSum} | Day ${day} = ${dSum} | Year ${year} = ${ySum} → ${mSum}+${dSum}+${ySum} = ${total} → ${number}`;
  return { number, steps };
}

// ─── Number meanings ─────────────────────────────────────────────────────────────
const NUMBER_MEANINGS: Record<number, { title: string; keywords: string[]; desc: string; planet: string; crystal: string }> = {
  1: { title: "The Leader", keywords: ["Independence","Ambition","Originality","Courage"], desc: "Number 1 is the pioneer — driven, original, and self-reliant. You are here to lead, create, and initiate. Your path is one of self-mastery and bold action.", planet: "Sun", crystal: "Ruby / Red Carnelian" },
  2: { title: "The Diplomat", keywords: ["Balance","Harmony","Intuition","Cooperation"], desc: "Number 2 is the peacemaker — sensitive, empathic, and deeply intuitive. You thrive in partnership and possess a natural gift for healing relationships.", planet: "Moon", crystal: "Pearl / Moonstone" },
  3: { title: "The Creative", keywords: ["Expression","Joy","Communication","Creativity"], desc: "Number 3 is the artist and communicator — expressive, joyful, and magnetic. Your purpose is to uplift through creative self-expression and inspired communication.", planet: "Jupiter", crystal: "Yellow Sapphire / Citrine" },
  4: { title: "The Builder", keywords: ["Stability","Discipline","Endurance","Structure"], desc: "Number 4 is the architect of life — reliable, methodical, and deeply trustworthy. You are here to build lasting foundations through patience and hard work.", planet: "Rahu", crystal: "Hessonite / Brown Agate" },
  5: { title: "The Free Spirit", keywords: ["Freedom","Adventure","Change","Versatility"], desc: "Number 5 is the seeker — dynamic, adventurous, and magnetic. You thrive on variety, travel, and new experiences, and your path leads through constant evolution.", planet: "Mercury", crystal: "Emerald / Green Aventurine" },
  6: { title: "The Nurturer", keywords: ["Love","Service","Responsibility","Beauty"], desc: "Number 6 is the heart of the home — caring, devoted, and aesthetically inclined. Your purpose is to nurture, heal, and bring beauty into the world around you.", planet: "Venus", crystal: "Diamond / White Topaz" },
  7: { title: "The Seeker", keywords: ["Wisdom","Spirituality","Analysis","Introspection"], desc: "Number 7 is the mystic — deeply spiritual, analytical, and drawn to the hidden mysteries of life. Your path is one of inner knowing and sacred wisdom.", planet: "Ketu", crystal: "Cat's Eye / Labradorite" },
  8: { title: "The Powerhouse", keywords: ["Abundance","Authority","Karma","Manifestation"], desc: "Number 8 is the manifestor — capable, ambitious, and magnetically powerful. You are here to master the material world and balance personal power with compassion.", planet: "Saturn", crystal: "Blue Sapphire / Amethyst" },
  9: { title: "The Humanitarian", keywords: ["Compassion","Wisdom","Completion","Service"], desc: "Number 9 is the old soul — compassionate, wise, and universally loving. Your path is one of selfless service, letting go, and helping humanity evolve.", planet: "Mars", crystal: "Red Coral / Bloodstone" },
  11: { title: "The Illuminator", keywords: ["Intuition","Vision","Inspiration","Spiritual Mastery"], desc: "Master Number 11 is the spiritual messenger — highly intuitive, visionary, and sensitive to subtle energies. You are here to inspire and illuminate others through spiritual insight.", planet: "Moon/Sun", crystal: "Clear Quartz / Selenite" },
  22: { title: "The Master Builder", keywords: ["Manifestation","Legacy","Mastery","Transformation"], desc: "Master Number 22 is the master architect — capable of turning the grandest visions into tangible reality. You are here to build something of lasting, universal significance.", planet: "Saturn/Uranus", crystal: "Lapis Lazuli / Sodalite" },
  33: { title: "The Master Teacher", keywords: ["Love","Healing","Teaching","Compassion"], desc: "Master Number 33 is the master teacher — a rare vibration of unconditional love and selfless service. You are here to heal, uplift, and teach at the highest level.", planet: "Jupiter/Neptune", crystal: "Rose Quartz / Aquamarine" },
};

function NumberCard({ num, type }: { num: number; type: string }) {
  const meaning = NUMBER_MEANINGS[num] || NUMBER_MEANINGS[9];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-[#c8a951]/30 p-8 relative overflow-hidden"
    >
      <div className="absolute top-4 right-6 text-[80px] font-serif font-light text-[#c8a951]/10 leading-none select-none">
        {num}
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-1">{type} Number</p>
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-5xl font-serif font-light text-[#2a1f1a]">{num}</span>
          <span className="text-xl font-serif text-[#2a1f1a]/60">{meaning.title}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {meaning.keywords.map(kw => (
            <span key={kw} className="text-[9px] font-bold uppercase tracking-wider bg-[#c8a951]/10 text-[#c8a951] px-2 py-0.5 border border-[#c8a951]/20">
              {kw}
            </span>
          ))}
        </div>
        <p className="text-sm text-[#2a1f1a]/70 leading-relaxed mb-5">{meaning.desc}</p>
        <div className="flex flex-wrap gap-6 pt-4 border-t border-[#e8d9cf]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#2a1f1a]/40 mb-0.5">Ruling Planet</p>
            <p className="text-sm font-medium text-[#2a1f1a]">{meaning.planet}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#2a1f1a]/40 mb-0.5">Crystal Remedy</p>
            <p className="text-sm font-medium text-[#2a1f1a]">{meaning.crystal}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Name Calculator ────────────────────────────────────────────────────────────
function NameCalculator() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ number: number; steps: string } | null>(null);

  function calculate() {
    if (!name.trim()) { toast.error("Please enter a name."); return; }
    const r = getNameNumber(name.trim());
    if (!r.number) { toast.error("Please enter a name with letters."); return; }
    setResult(r);
  }

  return (
    <div className="bg-[#fdf3e8] border border-[#e8d9cf] p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-[#c8a951]/15 border border-[#c8a951]/40 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#c8a951]" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#c8a951]">Expression / Destiny</p>
          <h3 className="text-xl font-serif text-[#2a1f1a]">Name Number Calculator</h3>
        </div>
      </div>
      <p className="text-sm text-[#2a1f1a]/60 mb-6 leading-relaxed">
        Your <strong>Name Number</strong> (Expression Number) reveals the natural talents and abilities encoded in your birth name. Enter your <em>full name at birth</em> for the most accurate reading.
      </p>
      <div className="flex gap-0 mb-4">
        <input
          value={name}
          onChange={e => { setName(e.target.value); setResult(null); }}
          onKeyDown={e => e.key === "Enter" && calculate()}
          placeholder="Enter your full birth name..."
          className="flex-1 bg-white border border-[#e8d9cf] px-4 py-3.5 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors"
        />
        <motion.button
          onClick={calculate}
          className="bg-[#2a1f1a] text-white px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest"
          whileHover={{ backgroundColor: "#3d2d25" }}
          whileTap={{ scale: 0.97 }}
        >
          Calculate
        </motion.button>
      </div>
      {result && (
        <div className="mt-2 mb-4 text-[10px] text-[#2a1f1a]/40 font-mono leading-relaxed">
          {result.steps}
        </div>
      )}
      <AnimatePresence>
        {result && <NumberCard num={result.number} type="Name (Expression)" />}
      </AnimatePresence>
      {result && (
        <button
          onClick={() => { setName(""); setResult(null); }}
          className="mt-4 flex items-center gap-1.5 text-[10px] text-[#2a1f1a]/50 uppercase tracking-wider hover:text-[#c8a951] transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      )}
    </div>
  );
}

// ─── Life Path Calculator ───────────────────────────────────────────────────────
function LifePathCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{ number: number; steps: string } | null>(null);

  function calculate() {
    if (!date) { toast.error("Please select your birth date."); return; }
    const r = getLifePathNumber(date);
    setResult(r);
  }

  return (
    <div className="bg-[#fdf3e8] border border-[#e8d9cf] p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-[#c8a951]/15 border border-[#c8a951]/40 flex items-center justify-center">
          <Star className="w-4 h-4 text-[#c8a951]" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#c8a951]">Life Path</p>
          <h3 className="text-xl font-serif text-[#2a1f1a]">Life Path Number Calculator</h3>
        </div>
      </div>
      <p className="text-sm text-[#2a1f1a]/60 mb-6 leading-relaxed">
        Your <strong>Life Path Number</strong> is the most important number in your chart. Derived from your birthdate, it reveals your soul's core purpose and the major themes of your life journey.
      </p>
      <div className="flex gap-0 mb-4">
        <input
          type="date"
          value={date}
          onChange={e => { setDate(e.target.value); setResult(null); }}
          className="flex-1 bg-white border border-[#e8d9cf] px-4 py-3.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] transition-colors"
        />
        <motion.button
          onClick={calculate}
          className="bg-[#2a1f1a] text-white px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest"
          whileHover={{ backgroundColor: "#3d2d25" }}
          whileTap={{ scale: 0.97 }}
        >
          Calculate
        </motion.button>
      </div>
      {result && (
        <div className="mt-2 mb-4 text-[10px] text-[#2a1f1a]/40 font-mono leading-relaxed">
          {result.steps}
        </div>
      )}
      <AnimatePresence>
        {result && <NumberCard num={result.number} type="Life Path" />}
      </AnimatePresence>
      {result && (
        <button
          onClick={() => { setDate(""); setResult(null); }}
          className="mt-4 flex items-center gap-1.5 text-[10px] text-[#2a1f1a]/50 uppercase tracking-wider hover:text-[#c8a951] transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      )}
    </div>
  );
}

// ─── Compatibility Section ──────────────────────────────────────────────────────
function CompatibilityCalculator() {
  const [a, setA] = useState({ name: "", date: "" });
  const [b, setB] = useState({ name: "", date: "" });
  const [result, setResult] = useState<{ numA: number; numB: number; score: number } | null>(null);

  function calculate() {
    if (!a.date || !b.date) { toast.error("Please enter both birth dates."); return; }
    const numA = a.date ? getLifePathNumber(a.date).number : getNameNumber(a.name).number;
    const numB = b.date ? getLifePathNumber(b.date).number : getNameNumber(b.name).number;
    const baseA = numA > 9 ? numA - 9 : numA;
    const baseB = numB > 9 ? numB - 9 : numB;
    const diff = Math.abs(baseA - baseB);
    const score = diff === 0 ? 95 : diff <= 2 ? 85 : diff <= 4 ? 72 : diff <= 6 ? 60 : 50;
    setResult({ numA, numB, score });
  }

  function compatDesc(score: number) {
    if (score >= 90) return "Cosmic Match — your numbers resonate at the deepest level, creating natural harmony and mutual growth.";
    if (score >= 80) return "Strong Harmony — your energies complement each other beautifully, with natural understanding and shared values.";
    if (score >= 70) return "Good Compatibility — your paths align well, though conscious communication will deepen the bond.";
    if (score >= 60) return "Learning Relationship — growth through contrast; your differences create opportunities for profound personal evolution.";
    return "Karmic Connection — challenging but transformative; this relationship carries deep lessons for both souls.";
  }

  return (
    <div className="bg-[#2a1f1a] text-[#fdf8f4] p-8 md:p-10">
      <div className="text-center mb-8">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#c8a951] mb-2">Compatibility</p>
        <h3 className="text-2xl font-serif font-light">Numerology Compatibility</h3>
        <p className="text-sm text-[#fdf8f4]/50 mt-2 max-w-md mx-auto">Enter two birth dates to discover how your numerological energies harmonise.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[
          { label: "Person A", val: a, onChange: (f: typeof a) => { setA(f); setResult(null); } },
          { label: "Person B", val: b, onChange: (f: typeof b) => { setB(f); setResult(null); } },
        ].map(({ label, val, onChange }) => (
          <div key={label} className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#fdf8f4]/40">{label}</p>
            <input
              value={val.name} placeholder="Name (optional)"
              onChange={e => onChange({ ...val, name: e.target.value })}
              className="w-full bg-white/5 border border-[#fdf8f4]/15 px-4 py-3 text-sm text-[#fdf8f4] placeholder:text-[#fdf8f4]/20 outline-none focus:border-[#c8a951] transition-colors"
            />
            <input
              type="date" value={val.date}
              onChange={e => onChange({ ...val, date: e.target.value })}
              className="w-full bg-white/5 border border-[#fdf8f4]/15 px-4 py-3 text-sm text-[#fdf8f4] outline-none focus:border-[#c8a951] transition-colors"
            />
          </div>
        ))}
      </div>
      <motion.button
        onClick={calculate}
        className="w-full bg-[#c8a951] text-[#2a1f1a] py-4 text-[11px] font-bold uppercase tracking-widest"
        whileHover={{ backgroundColor: "#d4b565" }}
        whileTap={{ scale: 0.98 }}
      >
        Calculate Compatibility
      </motion.button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-8 border-t border-[#fdf8f4]/10"
          >
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-wider text-[#fdf8f4]/40 mb-1">{a.name || "Person A"}</p>
                <span className="text-4xl font-serif font-light text-[#c8a951]">{result.numA}</span>
                <p className="text-[10px] text-[#fdf8f4]/50 mt-0.5">{NUMBER_MEANINGS[result.numA]?.title}</p>
              </div>
              <div className="text-3xl text-[#c8a951]/40 font-serif">+</div>
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-wider text-[#fdf8f4]/40 mb-1">{b.name || "Person B"}</p>
                <span className="text-4xl font-serif font-light text-[#c8a951]">{result.numB}</span>
                <p className="text-[10px] text-[#fdf8f4]/50 mt-0.5">{NUMBER_MEANINGS[result.numB]?.title}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(200,169,81,0.15)" strokeWidth="8" />
                  <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#c8a951" strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 264" }}
                    animate={{ strokeDasharray: `${result.score * 2.64} 264` }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-serif font-light text-[#c8a951]">{result.score}%</span>
                </div>
              </div>
              <p className="text-sm text-[#fdf8f4]/70 max-w-sm mx-auto leading-relaxed">{compatDesc(result.score)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Booking form ──────────────────────────────────────────────────────────────
function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please provide your name and email."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setDone(true);
      toast.success("Numerology reading request received! Ekta will be in touch within 24 hours.");
    }, 1400);
  }

  if (done) return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-[#c8a951]/20 border border-[#c8a951]/40 flex items-center justify-center mx-auto mb-5">
        <Star className="w-7 h-7 text-[#c8a951]" />
      </div>
      <h3 className="text-2xl font-serif font-light text-[#2a1f1a] mb-2">Request Received!</h3>
      <p className="text-[#2a1f1a]/60 max-w-sm mx-auto">Thank you, {form.name}. Ekta will confirm your numerology session within 24 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Full Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
            className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors" />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
            className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210"
            className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors" />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Preferred Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange}
            className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">What Are You Seeking Clarity On?</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={3}
          placeholder="E.g. my life direction, relationship patterns, career clarity, spiritual purpose..."
          className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors resize-none" />
      </div>
      <motion.button type="submit" disabled={loading}
        className="w-full bg-[#2a1f1a] text-white py-4 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
        whileHover={{ backgroundColor: "#3d2d25" }} whileTap={{ scale: 0.98 }}
      >
        {loading
          ? <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>✦</motion.span>
          : <><span>Book Numerology Session</span> <ArrowRight className="w-4 h-4" /></>
        }
      </motion.button>
    </form>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Numerology() {
  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a]">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-[#1e1614]">
        {/* Animated number background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[1,2,3,4,5,6,7,8,9,11,22,33].map((n, i) => (
            <motion.span key={n}
              className="absolute font-serif text-[#c8a951]/5 select-none"
              style={{ fontSize: `${60 + (i % 4) * 30}px`, top: `${(i * 29 + 8) % 90}%`, left: `${(i * 43 + 5) % 90}%` }}
              animate={{ opacity: [0.05, 0.15, 0.05], y: [0, -20, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            >
              {n}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-5">Ancient Wisdom · Modern Clarity</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-6">
            Numerology<br />
            <span className="italic text-[#c8a951]">with Ekta</span>
          </h1>
          <p className="text-[#fdf8f4]/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Numbers are the language of the Universe. Unlock the sacred codes hidden in your name and birthdate to understand your soul's purpose, natural gifts, and life path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#calculator">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#2a1f1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Calculate My Numbers
              </motion.span>
            </a>
            <a href="#book">
              <motion.span
                className="inline-flex items-center gap-2 border border-[#fdf8f4]/30 text-[#fdf8f4]/80 px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{ borderColor: "rgba(200,169,81,0.6)", color: "#c8a951" }}
                transition={{ duration: 0.2 }}
              >
                Book a Deep Reading →
              </motion.span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── INTRO STRIPS ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#fdf8f4]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "✦", title: "Name Number", desc: "Derived from the letters of your birth name, this reveals your natural talents and life's expression." },
              { num: "◈", title: "Life Path Number", desc: "Your most important number — calculated from your birthdate, it reveals your soul's core purpose." },
              { num: "∞", title: "Compatibility", desc: "Compare two people's numerological energies to understand the deeper pattern of your connection." },
            ].map((item, i) => (
              <div key={item.title} className="text-center">
                <motion.div
                  className="w-14 h-14 rounded-full border border-[#c8a951]/30 bg-[#c8a951]/05 flex items-center justify-center mx-auto mb-4 text-xl text-[#c8a951] font-serif"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: i * 1.5 }}
                >
                  {item.num}
                </motion.div>
                <h3 className="font-serif text-lg text-[#2a1f1a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#2a1f1a]/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── CALCULATORS ──────────────────────────────────────────────────────────── */}
      <section id="calculator" className="py-12 md:py-20 px-6 bg-[#f5ede4]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Free Calculator</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#2a1f1a]">Discover Your Numbers</h2>
          </ScrollReveal>
          <div className="space-y-6">
            <ScrollReveal><NameCalculator /></ScrollReveal>
            <ScrollReveal delay={0.08}><LifePathCalculator /></ScrollReveal>
            <ScrollReveal delay={0.12}><CompatibilityCalculator /></ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── NUMBER REFERENCE ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#fdf8f4]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Reference Guide</p>
            <h2 className="text-3xl font-serif font-light text-[#2a1f1a]">The Nine Core Numbers</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(NUMBER_MEANINGS).filter(([n]) => Number(n) <= 9).map(([num, meaning], i) => (
              <ScrollReveal key={num} delay={i * 0.05}>
                <motion.div
                  className="border border-[#e8d9cf] p-6 bg-white group"
                  whileHover={{ borderColor: "rgba(200,169,81,0.5)", y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-serif font-light text-[#c8a951]">{num}</span>
                    <div>
                      <p className="font-serif text-[#2a1f1a]">{meaning.title}</p>
                      <p className="text-[9px] uppercase tracking-wider text-[#2a1f1a]/40">{meaning.planet}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#2a1f1a]/60 leading-relaxed">{meaning.desc.slice(0, 120)}...</p>
                  <p className="mt-3 text-[9px] font-bold uppercase tracking-wider text-[#c8a951]">Crystal: {meaning.crystal}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5" delay={0.1}>
            {Object.entries(NUMBER_MEANINGS).filter(([n]) => Number(n) > 9).map(([num, meaning]) => (
              <motion.div key={num}
                className="border-2 border-[#c8a951]/30 p-6 bg-[#fdf3e8] group relative overflow-hidden"
                whileHover={{ borderColor: "rgba(200,169,81,0.7)", y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-2 right-3 text-[9px] font-bold uppercase tracking-widest text-[#c8a951]">Master Number</div>
                <div className="flex items-center gap-3 mb-3 mt-4">
                  <span className="text-3xl font-serif font-light text-[#c8a951]">{num}</span>
                  <p className="font-serif text-[#2a1f1a]">{meaning.title}</p>
                </div>
                <p className="text-xs text-[#2a1f1a]/60 leading-relaxed">{meaning.desc.slice(0, 100)}...</p>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── BOOK A DEEP READING ───────────────────────────────────────────────────── */}
      <section id="book" className="py-20 md:py-28 px-6 bg-[#2a1f1a]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <Sparkles className="w-8 h-8 text-[#c8a951] mx-auto mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Go Deeper</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">Book a Numerology Reading</h2>
            <p className="text-[#fdf8f4]/50 max-w-lg mx-auto text-sm leading-relaxed">
              The free calculator is just the beginning. A full reading with Ekta dives into your entire numerological chart — personal year cycles, pinnacles, challenges, and your soul's deepest purpose.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="bg-[#1e1614] p-8 md:p-12">
            <BookingForm />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
