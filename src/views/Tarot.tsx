"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { toast } from "sonner";
import {
  Star, Heart, Briefcase, Leaf, Sun, Moon, Users, Sparkles,
  Clock, Calendar, CheckCircle, ChevronDown, ArrowRight
} from "lucide-react";

// ─── Sparkle field ─────────────────────────────────────────────────────────────
function TarotSparkles({ count = 18 }: { count?: number }) {
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

// ─── Tarot card SVG decoration ─────────────────────────────────────────────────
function TarotCardIcon({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div
      className="relative w-14 h-20 flex items-center justify-center rounded-sm border"
      style={{ borderColor: `${color}60`, background: `linear-gradient(160deg, ${color}10 0%, transparent 100%)` }}
    >
      <span className="text-2xl" style={{ color }}>{symbol}</span>
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l" style={{ borderColor: `${color}80` }} />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r" style={{ borderColor: `${color}80` }} />
    </div>
  );
}

// ─── Guidance areas ────────────────────────────────────────────────────────────
const guidanceAreas = [
  { icon: Heart,    symbol: "♥", color: "#c07080", title: "Love & Relationships",  desc: "Clarity on your romantic path, soulmate connections, and healing from heartbreak." },
  { icon: Briefcase,symbol: "☿", color: "#7e9dbf", title: "Career & Purpose",       desc: "Uncover your dharmic calling, navigate career crossroads, and align work with soul." },
  { icon: Sun,      symbol: "☀", color: "#c8a951", title: "Spiritual Growth",       desc: "Guidance on your awakening journey, shadow work, and expanding consciousness." },
  { icon: Leaf,     symbol: "♂", color: "#7aad78", title: "Health & Wellbeing",     desc: "Understanding energy blocks, body wisdom, and holistic healing paths." },
  { icon: Users,    symbol: "♀", color: "#b07ec8", title: "Family & Bonds",         desc: "Healing ancestral patterns, strengthening family ties, and karmic relationships." },
  { icon: Moon,     symbol: "☽", color: "#8fa8d0", title: "Life Transitions",       desc: "Support during major life changes — moves, endings, new beginnings." },
];

// ─── Session steps ─────────────────────────────────────────────────────────────
const sessionSteps = [
  { num: "01", title: "Set Your Intention",   desc: "Before the session, reflect on what area of life you seek guidance on. There are no wrong questions." },
  { num: "02", title: "The Reading",          desc: "Ekta creates a sacred space, shuffles the cards with your energy, and lays a personalised spread chosen for your question." },
  { num: "03", title: "Intuitive Guidance",   desc: "She interprets the cards through her intuitive lens — weaving in Vedic wisdom, crystal healing, and numerology where relevant." },
  { num: "04", title: "Your Actionable Path", desc: "You leave with clarity, specific actions, and if appropriate, a crystal or mantra recommendation to anchor your intention." },
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
    }, 1400);
  }

  return (
    <div id={id} className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-8"
          >
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[#c8a951]/20 border border-[#c8a951]/40 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-[#c8a951]" />
            </motion.div>
            <h3 className="text-2xl font-serif font-light text-[#2a1f1a] mb-3">Booking Request Received</h3>
            <p className="text-[#2a1f1a]/60 mb-6">Thank you, {form.name}. Ekta will personally confirm your appointment within 24 hours via email at {form.email}.</p>
            <button
              onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", date: "", time: "", message: "" }); }}
              className="text-[10px] font-bold uppercase tracking-widest text-[#c8a951] border-b border-[#c8a951]/40 pb-0.5"
            >
              Book Another Session →
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Full Name *</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  placeholder="Your full name"
                  className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Email *</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="your@email.com"
                  className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Phone</label>
                <input
                  name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Preferred Date *</label>
                <input
                  name="date" type="date" value={form.date} onChange={handleChange} required
                  className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">Preferred Time</label>
              <select
                name="time" value={form.time} onChange={handleChange}
                className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] transition-colors appearance-none"
              >
                <option value="">Select a time slot</option>
                <option>10:00 AM – 11:00 AM</option>
                <option>11:00 AM – 12:00 PM</option>
                <option>12:00 PM – 1:00 PM</option>
                <option>3:00 PM – 4:00 PM</option>
                <option>4:00 PM – 5:00 PM</option>
                <option>6:00 PM – 7:00 PM</option>
                <option>7:00 PM – 8:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/50 mb-1.5">What Would You Like Guidance On?</label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Share the area of life you're seeking clarity on — love, career, a decision, spiritual growth..."
                rows={4}
                className="w-full bg-white border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] placeholder:text-[#2a1f1a]/30 outline-none focus:border-[#c8a951] transition-colors resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2a1f1a] text-white py-4 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
              whileHover={{ backgroundColor: "#3d2d25" }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  ✦
                </motion.span>
              ) : (
                <>Schedule My Reading <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
            <p className="text-center text-[10px] text-[#2a1f1a]/40 uppercase tracking-wider">
              Ekta confirms all appointments personally within 24 hours.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FAQ accordion ─────────────────────────────────────────────────────────────
const faqs = [
  { q: "How long is a Tarot reading session?", a: "Each session is 45–60 minutes, held via video call or in person in Mumbai. Ekta ensures you have ample time to ask follow-up questions." },
  { q: "Do I need to know anything about Tarot?", a: "Absolutely not. All you need is an open mind and a question or area of life you'd like clarity on. Ekta guides you through the entire experience." },
  { q: "Is Tarot fortune-telling?", a: "Ekta's approach is not predictive fortune-telling. She uses Tarot as a mirror to reflect your inner wisdom and help you navigate choices — you always have free will." },
  { q: "How much does a session cost?", a: "Session pricing varies based on duration. Please contact Ekta after booking for current rates. The first session includes a complimentary crystal recommendation." },
  { q: "Can I record the session?", a: "Yes, Ekta encourages you to record or take notes so you can reflect on the guidance at your own pace." },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8d9cf]">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-sm font-medium text-[#2a1f1a] group-hover:text-[#c8a951] transition-colors">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-[#2a1f1a]/40">
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
            <p className="pb-5 text-sm text-[#2a1f1a]/60 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Tarot() {
  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a]">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#1e1410]">
        <TarotSparkles count={28} />
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(200,169,81,0.18) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(180,110,140,0.15) 0%, transparent 70%)" }} />
        </div>

        {/* Decorative tarot card shapes */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
          {["♥","★","☽"].map((sym, i) => (
            <motion.div key={i} className="mb-6"
              animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
            >
              <TarotCardIcon symbol={sym} color="#c8a951" />
            </motion.div>
          ))}
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
          {["☀","♦","✦"].map((sym, i) => (
            <motion.div key={i} className="mb-6"
              animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3.5 + i, repeat: Infinity, delay: i * 0.6 }}
            >
              <TarotCardIcon symbol={sym} color="#c8a951" />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-5">Sacred Guidance</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white leading-tight mb-6">
            Tarot Reading<br />
            <span className="italic text-[#c8a951]">with Ekta</span>
          </h1>
          <p className="text-[#fdf8f4]/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Not fortune-telling — a conversation with your inner wisdom. Ekta uses Tarot as a sacred mirror to illuminate your path, offer clarity, and empower your choices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#2a1f1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Book a Reading <ArrowRight className="w-4 h-4" />
              </motion.span>
            </a>
            <a href="#guidance">
              <motion.span
                className="inline-flex items-center gap-2 border border-[#fdf8f4]/30 text-[#fdf8f4]/80 px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{ borderColor: "rgba(200,169,81,0.6)", color: "#c8a951" }}
                transition={{ duration: 0.2 }}
              >
                What Ekta Guides On ↓
              </motion.span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── WHAT EKTA CAN GUIDE YOU ON ──────────────────────────────────────────── */}
      <section id="guidance" className="py-20 md:py-28 px-6 bg-[#fdf8f4]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Areas of Guidance</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#2a1f1a] mb-4">What Ekta Can Guide You On</h2>
            <p className="text-[#2a1f1a]/60 max-w-xl mx-auto text-sm leading-relaxed">
              Tarot speaks to all dimensions of life. Ekta brings warmth, depth, and intuitive clarity to each of these sacred territories.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidanceAreas.map((area, i) => (
              <ScrollReveal key={area.title} delay={i * 0.08}>
                <motion.div
                  className="border border-[#e8d9cf] p-8 group cursor-default bg-white"
                  whileHover={{ borderColor: area.color + "60", y: -4, boxShadow: `0 12px 40px ${area.color}15` }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full shrink-0"
                      style={{ background: area.color + "15", border: `1px solid ${area.color}40` }}>
                      <area.icon className="w-5 h-5" style={{ color: area.color }} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[#2a1f1a] leading-snug">{area.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-[#2a1f1a]/60 leading-relaxed">{area.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THE SESSION ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#2a1f1a]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">About the Session</h2>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {[
                { Icon: Clock, label: "45–60 minutes" },
                { Icon: Calendar, label: "Online or In-person" },
                { Icon: Star, label: "Personalised Spread" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[#fdf8f4]/60 text-sm">
                  <Icon className="w-4 h-4 text-[#c8a951]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <div className="space-y-0">
            {sessionSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="flex gap-8 pb-10 relative">
                  {i < sessionSteps.length - 1 && (
                    <div className="absolute left-[26px] top-12 bottom-0 w-px bg-[#c8a951]/20" />
                  )}
                  <div className="shrink-0 w-13 h-13 flex items-center justify-center rounded-full border border-[#c8a951]/40 bg-[#c8a951]/10 z-10">
                    <span className="text-sm font-bold text-[#c8a951]">{step.num}</span>
                  </div>
                  <div className="pt-2.5">
                    <h3 className="text-lg font-serif text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-[#fdf8f4]/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT EKTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#fdf8f4]">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <div className="order-2 md:order-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-4">Your Guide</p>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2a1f1a] mb-6 leading-snug">
                  Meet Ekta — Intuitive Tarot Reader & Vedic Healer
                </h2>
                <p className="text-[#2a1f1a]/70 leading-relaxed mb-4">
                  Ekta has spent over a decade studying the ancient arts of Tarot, Vedic Astrology, Numerology, and crystal healing. Her journey began as a personal quest for meaning during a deeply transformative period — and blossomed into a calling to guide others through their own.
                </p>
                <p className="text-[#2a1f1a]/70 leading-relaxed mb-6">
                  Her readings are warm, grounded, and non-prescriptive. She believes in empowering you — not dictating your future — helping you reconnect with your own inner knowing through the language of the cards and the cosmos.
                </p>
                <div className="flex flex-col gap-3 mb-8">
                  {["Certified Tarot Reader (10+ years)", "Jyotish Vedic Astrologer", "Pythagorean Numerologist", "Crystal Healing Practitioner"].map(cred => (
                    <div key={cred} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-[#c8a951]/20 border border-[#c8a951]/40 flex items-center justify-center shrink-0">
                        <Star className="w-2 h-2 text-[#c8a951]" />
                      </span>
                      <span className="text-sm text-[#2a1f1a]/80">{cred}</span>
                    </div>
                  ))}
                </div>
                <a href="#book">
                  <motion.span
                    className="inline-flex items-center gap-2 bg-[#c8a951] text-[#2a1f1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  >
                    Book with Ekta <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </a>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80"
                    alt="Ekta — Tarot Reader & Healer"
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f1a]/20 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-[#c8a951]/15 border border-[#c8a951]/30" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#f5e6d0] border border-[#c8a951]/20" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#f5ede4]">
        <div className="max-w-[760px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Common Questions</p>
            <h2 className="text-3xl font-serif font-light text-[#2a1f1a]">Frequently Asked</h2>
          </ScrollReveal>
          <div className="bg-white p-6 md:p-8">
            {faqs.map(faq => <FAQ key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── BOOK YOUR CONSULTATION ──────────────────────────────────────────────── */}
      <section id="book" className="py-20 md:py-28 px-6 bg-[#fdf8f4]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <Sparkles className="w-8 h-8 text-[#c8a951] mx-auto mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Schedule Your Session</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#2a1f1a] mb-4">Book Your Consultation</h2>
            <p className="text-[#2a1f1a]/60 max-w-lg mx-auto text-sm leading-relaxed">
              Fill in your details and Ekta will personally reach out to confirm your appointment. All sessions are held in a safe, confidential, and sacred space.
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
