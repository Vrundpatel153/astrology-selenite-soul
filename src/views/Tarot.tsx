"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import InteractiveTarotDeck from "@/components/InteractiveTarotDeck";
import { toast } from "sonner";
import {
  Clock, Calendar, CheckCircle, ChevronDown, ArrowRight
} from "lucide-react";

// ─── Sparkle field ─────────────────────────────────────────────────────────────
function TarotSparkles({ count = 24 }: { count?: number }) {
  const pts = Array.from({ length: count }, (_, i) => ({
    top: (i * 37 + 11) % 100,
    left: (i * 53 + 7) % 100,
    size: 1.5 + (i % 3),
    delay: (i * 0.4) % 4,
    dur: 2.5 + (i % 3),
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size, background: "#c8a951" }}
          animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Guidance Domains (Bespoke Editorial Structure) ────────────────────────────
const guidanceDomains = [
  {
    numeral: "I",
    title: "Love & Sacred Union",
    subtitle: "Soulmate Alchemy & Relationship Crossroads",
    desc: "Unravel karmic contracts, heal ancestral emotional loops, and cultivate conscious, elevated partnership dynamics.",
    archetype: "The Lovers (VI)",
    crystal: "Rhodonite & Rose Quartz",
  },
  {
    numeral: "II",
    title: "Dharmic Vocation & Abundance",
    subtitle: "Life Calling & Executive Transitions",
    desc: "Discern your authentic soul vocation, navigate major career thresholds, and magnetize divine material abundance.",
    archetype: "The Magician (I)",
    crystal: "Pyrite & Tiger Eye",
  },
  {
    numeral: "III",
    title: "Spiritual Awakening & Shadow",
    subtitle: "Intuitive Expansion & Higher Self Contact",
    desc: "Synthesize shadow archetypes, decode recurring synchronicities, and anchor high-frequency cosmic consciousness.",
    archetype: "The Star (XVII)",
    crystal: "Selenite & Clear Quartz",
  },
  {
    numeral: "IV",
    title: "Somatic & Auric Vitality",
    subtitle: "Energetic Restoration & Chakra Alignment",
    desc: "Pinpoint subtle energetic depletion, restore meridian flow, and align gemstone prescriptions to physical vitality.",
    archetype: "The Empress (III)",
    crystal: "Green Jade & Bloodstone",
  },
  {
    numeral: "V",
    title: "Ancestral Lineage & Karma",
    subtitle: "Generational Resolution & Family Harmony",
    desc: "Release inherited familial conditioning, consecrate peaceful resolution, and heal past-life vows.",
    archetype: "The High Priestess (II)",
    crystal: "Rainbow Moonstone & Black Tourmaline",
  },
  {
    numeral: "VI",
    title: "Thresholds & Sacred Pivots",
    subtitle: "New Horizons & Bold Spiritual Beginnings",
    desc: "Gain sovereign navigational clarity during major life relocations, relationship endings, and ambitious ventures.",
    archetype: "The World (XXI)",
    crystal: "Lapis Lazuli & Amethyst",
  },
];

// ─── Consultation Journey ───────────────────────────────────────────────────────
const sessionSteps = [
  {
    num: "01",
    phase: "Consecration & Intention",
    title: "Setting the Sacred Field",
    desc: "Before laying the cards, we clarify your core inquiries and align your energetic field through a grounding breath meditation.",
  },
  {
    num: "02",
    phase: "Channelling",
    title: "The Bespoke Oracle Spread",
    desc: "Ekta lays a customized spread tailored specifically to your inquiry, weaving archetypal geometry and celestial aspects.",
  },
  {
    num: "03",
    phase: "Multi-Disciplinary Synthesis",
    title: "Vedic, Tarot & Numerology Synthesis",
    desc: "The card revelations are cross-referenced with your planetary dashas and life path vibrations for multi-layered depth.",
  },
  {
    num: "04",
    phase: "Integration",
    title: "Sovereign Remedies & Affirmations",
    desc: "You conclude with actionable spiritual practices, tailored crystal prescriptions, and personalized sacred affirmations.",
  },
];

// ─── Booking form ──────────────────────────────────────────────────────────────
function BookingForm({ id }: { id: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) {
      toast.error("Please fill in your name, email and preferred date.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success("Booking request received! Ekta will confirm your appointment within 24 hours.");
    }, 1200);
  }

  return (
    <div id={id} className="max-w-2xl mx-auto bg-[#1a0e05]/95 border border-[#c8a951]/40 p-8 md:p-12 shadow-2xl backdrop-blur-md rounded-sm">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#c8a951]/20 border border-[#c8a951] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#c8a951]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-white mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Booking Request Received
            </h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto text-sm leading-relaxed font-light">
              Thank you, {form.name}. Ekta will personally review your inquiry and confirm your appointment details within 24 hours via email at <span className="font-semibold text-[#c8a951]">{form.email}</span>.
            </p>
            <button
              onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", date: "", time: "", message: "" }); }}
              className="text-[10px] font-bold uppercase tracking-widest text-[#c8a951] border-b border-[#c8a951]/60 pb-0.5"
            >
              Schedule Another Consultation →
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-2">Full Name *</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-[#120803] border border-[#c8a951]/40 px-4 py-3 text-sm text-white outline-none focus:border-[#c8a951] rounded-sm transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-2">Email Address *</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="priya@example.com"
                  className="w-full bg-[#120803] border border-[#c8a951]/40 px-4 py-3 text-sm text-white outline-none focus:border-[#c8a951] rounded-sm transition-colors placeholder:text-white/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-2">Phone Number</label>
                <input
                  name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#120803] border border-[#c8a951]/40 px-4 py-3 text-sm text-white outline-none focus:border-[#c8a951] rounded-sm transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-2">Preferred Date *</label>
                <input
                  name="date" type="date" value={form.date} onChange={handleChange} required
                  className="w-full bg-[#120803] border border-[#c8a951]/40 px-4 py-3 text-sm text-white outline-none focus:border-[#c8a951] rounded-sm transition-colors [color-scheme:dark]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-2">Preferred Time Slot</label>
              <select
                name="time" value={form.time} onChange={handleChange}
                className="w-full bg-[#120803] border border-[#c8a951]/40 px-4 py-3 text-sm text-white outline-none focus:border-[#c8a951] rounded-sm transition-colors [color-scheme:dark]"
              >
                <option value="">Select a preferred time window</option>
                <option>10:00 AM – 11:00 AM (IST)</option>
                <option>11:30 AM – 12:30 PM (IST)</option>
                <option>02:00 PM – 03:00 PM (IST)</option>
                <option>04:00 PM – 05:00 PM (IST)</option>
                <option>06:00 PM – 07:00 PM (IST)</option>
                <option>07:30 PM – 08:30 PM (IST)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] mb-2">
                What Would You Like Sacred Guidance On?
              </label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Share the area of life you're seeking clarity on — love, career, a life pivot, spiritual growth..."
                rows={4}
                className="w-full bg-[#120803] border border-[#c8a951]/40 px-4 py-3 text-sm text-white outline-none focus:border-[#c8a951] rounded-sm transition-colors resize-none placeholder:text-white/20"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c8a951] text-[#1a0e05] py-4 text-[11px] font-bold uppercase tracking-[0.22em] flex items-center justify-center gap-2 shadow-xl hover:shadow-[#c8a951]/30 transition-all rounded-sm disabled:opacity-60 cursor-pointer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span>Aligning Request...</span>
              ) : (
                <>Schedule My Reading <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
            <p className="text-center text-[10px] text-white/50 uppercase tracking-widest">
              All sessions are 100% confidential and held in sacred space.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FAQ accordion ─────────────────────────────────────────────────────────────
const faqs = [
  { q: "How long is a Tarot reading session?", a: "Each reading is 45–60 minutes, conducted via private high-definition video call or in person. Ekta ensures dedicated time for in-depth questions and custom spread interpretations." },
  { q: "Do I need prior knowledge of Tarot?", a: "Not at all. You only need an open heart and a willingness to explore your path. Ekta translates the archetypal symbolism into clear, grounded guidance." },
  { q: "Is Tarot fortune-telling or deterministic?", a: "Ekta's philosophy honors your sovereign free will. Tarot serves as an intuitive mirror reflecting present energetic trajectories, empowering you to make aligned choices." },
  { q: "What is included with my session?", a: "In addition to your live consultation, Ekta provides a personalized crystal prescription and a recap of key affirmations to anchor your session's energy." },
  { q: "Can I record or take notes during the reading?", a: "Yes, you are warmly encouraged to record or take notes so you can revisit the insights whenever you need guidance." },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#c8a951]/20 last:border-none">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group cursor-pointer"
      >
        <span className="text-sm md:text-base font-normal text-white group-hover:text-[#c8a951] transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-[#c8a951]">
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-xs md:text-sm text-white/70 leading-relaxed font-light">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Tarot() {
  return (
    <div className="min-h-screen bg-[#140810] text-[#fdf8f4] overflow-x-hidden">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#140810]">
        <TarotSparkles count={28} />
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(200,169,81,0.18) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(180,110,140,0.15) 0%, transparent 70%)" }} />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951]">Sacred Intuitive Oracle</span>
            <div className="h-px w-10 bg-[#c8a951]/60" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Tarot Reading<br />
            <span className="italic text-[#c8a951]">with Ekta</span>
          </h1>
          <p className="text-[#fdf8f4]/70 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Not fortune-telling — a sacred mirror reflecting your soul's highest wisdom. Draw from the 3D deck below or schedule an intimate consultation with Ekta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#interactive-deck">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1a0e05] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-lg"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Draw Cards Online <ArrowRight className="w-4 h-4" />
              </motion.span>
            </a>
            <a href="#book">
              <motion.span
                className="inline-flex items-center gap-2 border border-[#c8a951]/60 text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:bg-[#c8a951]/10"
                transition={{ duration: 0.2 }}
              >
                Book Personal Session
              </motion.span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── INTERACTIVE 3D TAROT DECK SUITE ────────────────────────────────────────── */}
      <section id="interactive-deck" className="py-20 md:py-28 px-6 bg-[#180c14] border-t border-b border-[#c8a951]/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">Live Oracle Deck</p>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Experience the <em className="italic text-[#c8a951]">Sacred Spread</em>
            </h2>
            <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
              Click cards directly from the fanned deck to deal and unveil your Major Arcana archetype.
            </p>
          </div>

          <InteractiveTarotDeck />
        </div>
      </section>

      {/* ── BESPOKE EDITORIAL GUIDANCE DOMAINS (NO AI-SLOP CARDS) ───────────────────── */}
      <section id="guidance" className="py-24 md:py-32 px-6 bg-[#160c10] border-b border-[#c8a951]/20">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951]">Sacred Domains of Ingestion</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              What Ekta Guides You On
            </h2>
            <p className="text-white/65 max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-light">
              Each domain bridges deep archetypal Tarot wisdom with planetary alignments and crystal remedies.
            </p>
          </ScrollReveal>

          {/* Monolithic Hairline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#c8a951]/30 bg-[#1c0f16]/90 divide-y md:divide-y-0 divide-[#c8a951]/20">
            {guidanceDomains.map((domain, i) => (
              <ScrollReveal key={domain.title} delay={i * 0.05}>
                <div className="p-8 md:p-10 flex flex-col justify-between h-full group hover:bg-[#281520] transition-all duration-300 border-b lg:border-b-0 border-r-0 md:border-r border-[#c8a951]/20 last:border-r-0">
                  <div>
                    {/* Roman Numeral Header */}
                    <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#c8a951]/20">
                      <span className="text-3xl md:text-4xl font-light text-[#c8a951] leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {domain.numeral}
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-[#c8a951]/70 uppercase">
                        Archetype: {domain.archetype}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-light text-white mb-1.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {domain.title}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c8a951]/80 mb-4">
                      {domain.subtitle}
                    </p>

                    <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light mb-8">
                      {domain.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#c8a951]/20 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-[#c8a951]">Prescribed Crystal Ally</p>
                      <p className="text-xs font-semibold text-white/90">{domain.crystal}</p>
                    </div>
                    <span className="text-[#c8a951] text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THE SESSION ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#1a0e05] border-b border-[#c8a951]/20">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">The Four Sacred Phases</p>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              The Consultation Architecture
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { Icon: Clock, label: "45–60 Minutes" },
                { Icon: Calendar, label: "Private Video or In-Person" },
                { Icon: CheckCircle, label: "Crystal Remedy Prescription Included" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/70 text-[10px] uppercase tracking-widest font-bold">
                  <Icon className="w-4 h-4 text-[#c8a951]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sessionSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div className="p-8 bg-[#24150c]/80 border border-[#c8a951]/25 rounded-sm hover:border-[#c8a951]/60 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-light text-[#c8a951]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.num}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c8a951] bg-[#c8a951]/10 px-3 py-1 border border-[#c8a951]/30">{step.phase}</span>
                  </div>
                  <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.title}</h3>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT EKTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#160c10] border-b border-[#c8a951]/20">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#c8a951]/60" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951]">Your Sacred Guide</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Meet Ekta — Intuitive Tarot Reader & Vedic Healer
                </h2>
                <p className="text-sm text-white/75 leading-relaxed mb-4 font-light">
                  Ekta has dedicated over a decade to mastering the sacred arts of Tarot, Vedic Jyotish, Pythagorean Numerology, and certified crystal healing. Her readings are warm, non-prescriptive, and deeply grounded.
                </p>
                <p className="text-sm text-white/75 leading-relaxed mb-8 font-light">
                  She empowers you to reconnect with your own sovereign inner wisdom through the language of sacred archetypes and celestial alignments.
                </p>
                <a href="#book">
                  <motion.span
                    className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1a0e05] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-lg"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  >
                    Schedule with Ekta <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </a>
              </div>
              <div className="order-1 lg:order-2 relative" data-cursor="view">
                <div className="relative overflow-hidden rounded-sm border border-[#c8a951]/40 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=85&fm=webp&fit=crop&crop=top"
                    alt="Ekta — Tarot Reader & Healer"
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140810]/40 to-transparent" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#1a0e05] border-b border-[#c8a951]/20">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">Clarity & Details</p>
            <h2 className="text-3xl md:text-4xl font-light text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="bg-[#22130a]/80 border border-[#c8a951]/30 p-6 md:p-10 shadow-lg rounded-sm">
            {faqs.map(faq => <FAQ key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── BOOK YOUR CONSULTATION ──────────────────────────────────────────────── */}
      <section id="book" className="py-24 md:py-32 px-6 bg-[#140810]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951]">Personalized Reading</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Book Your Consultation</h2>
            <p className="text-xs md:text-sm text-white/70 max-w-lg mx-auto leading-relaxed font-light">
              Submit your preferred date and inquiry below. Ekta will personally confirm your appointment within 24 hours.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <BookingForm id="booking-form" />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
