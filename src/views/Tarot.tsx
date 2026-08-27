"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import InteractiveTarotDeck from "@/components/InteractiveTarotDeck";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { Link } from "wouter";

// ─── Floating Gold Sparkle Canvas ─────────────────────────────────────────────
function TarotSparkles({ count = 20 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#c8a951]"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.15, 0.75, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: (i * 0.35) % 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Bespoke Guidance Domains (Monolithic Hairline Grid) ────────────────────────
const guidanceDomains = [
  {
    numeral: "I",
    title: "Sacred Love & Alignment",
    subtitle: "Soulmate Dynamics & Energetic Boundaries",
    desc: "Uncover karmic patterns in romantic partnerships, heal attachment wounds, and magnetize conscious, elevated love.",
    archetype: "The Lovers (VI)",
    crystal: "Rose Quartz & Rhodonite",
  },
  {
    numeral: "II",
    title: "Soul Purpose & Abundance",
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
    <div id={id} className="max-w-2xl mx-auto bg-white/95 border border-[#c8a951]/40 p-8 md:p-12 shadow-2xl backdrop-blur-md rounded-sm">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#c8a951]/20 border border-[#c8a951] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#a5762a]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-[#2a1f1a] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Booking Request Received
            </h3>
            <p className="text-[#4a382e]/80 mb-6 max-w-md mx-auto text-sm leading-relaxed font-light">
              Thank you, {form.name}. Ekta will personally review your inquiry and confirm your appointment details within 24 hours via email at <span className="font-semibold text-[#a5762a]">{form.email}</span>.
            </p>
            <button
              onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", date: "", time: "", message: "" }); }}
              className="text-[10px] font-bold uppercase tracking-widest text-[#a5762a] border-b border-[#c8a951]/60 pb-0.5"
            >
              Schedule Another Consultation →
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-2">Full Name *</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm transition-colors placeholder:text-[#2a1f1a]/30"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-2">Email Address *</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="e.g. priya@gmail.com"
                  className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm transition-colors placeholder:text-[#2a1f1a]/30"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-2">Phone Number</label>
                <input
                  name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm transition-colors placeholder:text-[#2a1f1a]/30"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-2">Preferred Date *</label>
                <input
                  name="date" type="date" value={form.date} onChange={handleChange} required
                  className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm transition-colors [color-scheme:light]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-2">Preferred Time Slot</label>
              <select
                name="time" value={form.time} onChange={handleChange}
                className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm transition-colors [color-scheme:light]"
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
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-2">
                What Would You Like Sacred Guidance On?
              </label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Share the area of life you're seeking clarity on — love, career, a life pivot, spiritual growth..."
                rows={4}
                className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm transition-colors resize-none placeholder:text-[#2a1f1a]/30"
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
            <p className="text-center text-[10px] text-[#4a382e]/60 uppercase tracking-widest">
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
    <div className="border-b border-[#e8d9cf] last:border-none">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group cursor-pointer"
      >
        <span className="text-sm md:text-base font-normal text-[#2a1f1a] group-hover:text-[#a5762a] transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-[#a5762a]">
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
            <p className="pb-5 text-xs md:text-sm text-[#4a382e]/80 leading-relaxed font-light">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Tarot() {
  return (
    <div className="min-h-screen bg-[#fcf8f4] text-[#2a1f1a] overflow-x-hidden">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#fdf8f4]">
        <TarotSparkles count={28} />
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(200,169,81,0.15) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(220,180,150,0.15) 0%, transparent 70%)" }} />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#a5762a]">Sacred Intuitive Oracle</span>
            <div className="h-px w-10 bg-[#c8a951]/60" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-[#2a1f1a] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Tarot Reading<br />
            <span className="italic text-[#a5762a]">with Ekta</span>
          </h1>
          <p className="text-[#4a382e]/80 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mb-10">
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
                className="inline-flex items-center gap-2 border border-[#c8a951] text-[#a5762a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:bg-[#c8a951]/10 bg-white/80"
                transition={{ duration: 0.2 }}
              >
                Book Personal Session
              </motion.span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── INTERACTIVE 3D TAROT DECK SUITE ────────────────────────────────────────── */}
      <section id="interactive-deck" className="py-20 md:py-28 px-6 bg-[#f9f4ee] border-t border-b border-[#e8d9cf]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a] mb-2">Live Oracle Deck</p>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Experience the <em className="italic text-[#a5762a]">Sacred Spread</em>
            </h2>
            <p className="text-xs md:text-sm text-[#4a382e]/80 font-light leading-relaxed">
              Click cards directly from the fanned deck to deal and unveil your Major Arcana archetype.
            </p>
          </div>

          <InteractiveTarotDeck />
        </div>
      </section>

      {/* ── BESPOKE EDITORIAL GUIDANCE DOMAINS ─────────────────────────────────────── */}
      <section id="guidance" className="py-24 md:py-32 px-6 bg-[#fcf8f4] border-b border-[#e8d9cf]">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Sacred Domains of Ingestion</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              What Ekta Guides You On
            </h2>
            <p className="text-[#4a382e]/75 max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-light">
              Each domain bridges deep archetypal Tarot wisdom with planetary alignments and crystal remedies.
            </p>
          </ScrollReveal>

          {/* Monolithic Hairline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#e8d9cf] bg-white divide-y md:divide-y-0 divide-[#e8d9cf] shadow-md">
            {guidanceDomains.map((domain, i) => (
              <ScrollReveal key={domain.title} delay={i * 0.05}>
                <div className="p-8 md:p-10 flex flex-col justify-between h-full group hover:bg-[#fcf8f4] transition-all duration-300 border-b lg:border-b-0 border-r-0 md:border-r border-[#e8d9cf] last:border-r-0">
                  <div>
                    {/* Roman Numeral Header */}
                    <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#e8d9cf]">
                      <span className="text-3xl md:text-4xl font-light text-[#a5762a] leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {domain.numeral}
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-[#a5762a] uppercase">
                        Archetype: {domain.archetype}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-light text-[#2a1f1a] mb-1.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {domain.title}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5762a] mb-4">
                      {domain.subtitle}
                    </p>

                    <p className="text-xs md:text-sm text-[#4a382e]/80 leading-relaxed font-light mb-8">
                      {domain.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e8d9cf] flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-[#a5762a]">Prescribed Crystal Ally</p>
                      <p className="text-xs font-semibold text-[#2a1f1a]">{domain.crystal}</p>
                    </div>
                    <span className="text-[#a5762a] text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
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
      <section className="py-24 md:py-32 px-6 bg-[#f7efe6] border-b border-[#e8d9cf]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a] mb-2">The Four Sacred Phases</p>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              The Consultation Architecture
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { Icon: Clock, label: "45–60 Minutes" },
                { Icon: Calendar, label: "Private Video or In-Person" },
                { Icon: CheckCircle, label: "Crystal Remedy Prescription Included" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[#4a382e]/80 text-[10px] uppercase tracking-widest font-bold">
                  <Icon className="w-4 h-4 text-[#a5762a]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sessionSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div className="p-8 bg-white/90 border border-[#e8d9cf] rounded-sm hover:border-[#c8a951] transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#a5762a] uppercase tracking-widest">{step.phase}</span>
                    <span className="text-2xl font-light text-[#a5762a]" style={{ fontFamily: "'Playfair Display', serif" }}>{step.num}</span>
                  </div>
                  <h3 className="text-xl font-light text-[#2a1f1a] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                  <p className="text-xs md:text-sm text-[#4a382e]/80 leading-relaxed font-light">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING SECTION ─────────────────────────────────────────────────────── */}
      <section id="book" className="py-24 md:py-32 px-6 bg-[#fcf8f4] border-b border-[#e8d9cf]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Sacred Reservation</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Book Your Consultation with Ekta
            </h2>
            <p className="text-[#4a382e]/80 max-w-md mx-auto text-xs md:text-sm font-light leading-relaxed">
              Step into a private sanctuary of intuitive wisdom. Select your preferred date and time below.
            </p>
          </ScrollReveal>

          <BookingForm id="booking-form" />
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#f9f4ee]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Sacred Inquiries</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="bg-white p-8 md:p-10 border border-[#e8d9cf] rounded-sm shadow-md">
            {faqs.map((faq) => (
              <FAQ key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
