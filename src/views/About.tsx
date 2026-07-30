import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Sparkles, Heart, Shield, Star, Leaf, Sun, Moon, ArrowRight } from "lucide-react";
import { Link } from "wouter";

// ─── Brand philosophy pillars ───────────────────────────────────────────────────
const beliefs = [
  {
    icon: Leaf,
    title: "Ethically Sourced",
    desc: "Every crystal is responsibly mined and sourced directly from trusted partners in Brazil, Uruguay, India, and Peru. We visit mines, verify conditions, and ensure fair wages at every step.",
  },
  {
    icon: Sparkles,
    title: "Full Moon Energised",
    desc: "All our crystals are cleansed under running water and recharged under each full moon before being packed for you. Every piece arrives imbued with clear, intentional energy.",
  },
  {
    icon: Shield,
    title: "Lab Tested & Certified",
    desc: "Each gemstone is authenticated and tested for quality. You get only genuine, natural crystals — never dyed, treated, or synthetic. Certificates are available on request.",
  },
  {
    icon: Heart,
    title: "Made with Intention",
    desc: "Ekta personally sets a healing intention into each piece before dispatch. Whether a bracelet or a raw crystal, the energy of care and prayer travels with every order.",
  },
  {
    icon: Star,
    title: "Vedic Wisdom",
    desc: "Our crystal recommendations are grounded in ancient Indian Vedic astrology, Ayurveda, and thousands of years of healing tradition — filtered through Ekta's decade of study.",
  },
  {
    icon: Sun,
    title: "Holistic & Integrative",
    desc: "We believe healing happens on all levels — physical, emotional, mental, and spiritual. Selenite Soul bridges ancient wisdom with modern life, making sacred tools accessible to everyone.",
  },
];

// ─── Ekta's healing modalities ──────────────────────────────────────────────────
const modalities = [
  { sym: "★", title: "Vedic Kundali",      href: "/kundali",     desc: "Sidereal birth chart readings revealing your planetary blueprint, life purpose, and crystal prescriptions." },
  { sym: "♥", title: "Tarot Reading",      href: "/tarot",       desc: "Intuitive card readings that illuminate life choices, relationships, career paths, and spiritual growth." },
  { sym: "7", title: "Numerology",         href: "/numerology",  desc: "Name and birthdate analysis revealing your soul's code, life path, and karmic lessons." },
  { sym: "◈", title: "Crystal Therapy",    href: "/shop",        desc: "Personalised crystal prescriptions based on your Kundali, numerology, and healing intentions." },
];

// ─── Timeline of Ekta's journey ────────────────────────────────────────────────
const journey = [
  { year: "2012", title: "The First Crystal", desc: "A raw amethyst placed in her hands during a family pilgrimage to Haridwar. Ekta felt something shift — a calm, a knowing. It was the beginning." },
  { year: "2014", title: "Deep Study Begins", desc: "Ekta enrolled in Vedic astrology training in Pune, spending three years immersed in Jyotish, the ancient science of light." },
  { year: "2017", title: "Tarot & Numerology", desc: "Drawn by how the systems connected, Ekta completed formal training in Pythagorean Numerology and intuitive Tarot reading." },
  { year: "2019", title: "Selenite Soul is Born", desc: "What began as sharing crystals with friends and family became an official brand — built on the belief that ancient wisdom belongs in every modern home." },
  { year: "2021", title: "1,000+ Lives Touched", desc: "Ekta crossed her first major milestone — one thousand clients personally guided through Kundali, Tarot, and crystal therapy sessions." },
  { year: "2024", title: "Growing the Mission", desc: "Selenite Soul now serves over 1.5 lakh happy customers, with Ekta continuing to personally guide and connect in every session." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a]">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-[#2a1f1a]">
        <div className="absolute inset-0 opacity-25"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1400&q=80)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a1f1a]/60 to-[#2a1f1a]/90" />
        {/* Floating symbols */}
        <div className="absolute inset-0 pointer-events-none">
          {["☽","★","✦","◈","♥"].map((sym, i) => (
            <motion.span key={i}
              className="absolute text-[#c8a951]/10 font-serif select-none text-4xl"
              style={{ top: `${15 + i * 15}%`, left: `${8 + i * 18}%` }}
              animate={{ y: [0, -10, 0], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
            >
              {sym}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-4">Selenite Soul</p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white leading-tight mb-6">
            Where Ancient Wisdom<br />Meets the Modern Soul
          </h1>
          <p className="text-[#fdf8f4]/65 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Selenite Soul is Ekta's life's work — a sacred bridge between Vedic astrology, Tarot, Numerology, and the healing power of crystals.
          </p>
        </motion.div>
      </section>

      {/* ── THE SELENITE SOUL PHILOSOPHY ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#fdf8f4]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Our Philosophy</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2a1f1a] mb-6 leading-snug">
                The Selenite Soul Philosophy
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Star, label: "Ancient Wisdom", desc: "Jyotish, Tarot, Numerology — three sacred systems aligned to illuminate your path." },
                { icon: Moon, label: "Crystal Energy", desc: "Ethically sourced, full-moon charged crystals that carry the earth's healing intelligence." },
                { icon: Heart, label: "Ekta's Intention", desc: "Every piece, every reading, every recommendation carries the personal energy of Ekta's care." },
              ].map((item, i) => (
                <motion.div key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="p-6"
                >
                  <div className="w-14 h-14 rounded-full border border-[#c8a951]/30 bg-[#c8a951]/08 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[#c8a951]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#2a1f1a] mb-2">{item.label}</h3>
                  <p className="text-sm text-[#2a1f1a]/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 p-8 border-l-2 border-[#c8a951]/40 bg-[#fdf3e8]">
              <p className="text-lg md:text-xl font-serif font-light text-[#2a1f1a] leading-relaxed italic">
                "I believe every person carries within them a cosmic blueprint — a unique energetic signature written in the stars, in numbers, and in the crystals that call to them. My work is to help you read that blueprint and live from its truth."
              </p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#c8a951]">— Ekta, Founder of Selenite Soul</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EKTA'S STORY ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#f5ede4]">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-4">Ekta's Story</p>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2a1f1a] mb-6 leading-snug">
                  A Journey from Seeking to Guiding
                </h2>
                <p className="text-[#2a1f1a]/70 leading-relaxed mb-4">
                  Ekta's path to becoming a healer began not in a classroom, but in a moment of profound personal stillness. In 2012, during a family pilgrimage to Haridwar, a sage placed a raw amethyst in her hands and said: <em>"The Earth already knows your answer."</em>
                </p>
                <p className="text-[#2a1f1a]/70 leading-relaxed mb-4">
                  That moment cracked something open. Over the next decade, Ekta immersed herself in Vedic astrology (Jyotish), Pythagorean Numerology, intuitive Tarot reading, and crystal healing — studying formally in Pune, and privately with teachers across India.
                </p>
                <p className="text-[#2a1f1a]/70 leading-relaxed">
                  In 2019, Selenite Soul was born — not as a business, but as a mission. To bring these ancient tools into the hands of every modern person seeking clarity, healing, and a deeper connection to themselves.
                </p>
              </div>
              <div className="relative">
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80"
                    alt="Ekta — Founder of Selenite Soul"
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 w-28 h-28 bg-[#c8a951]/15 border border-[#c8a951]/30" />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#fdf8f4] border border-[#e8d9cf]" />
                <div className="absolute bottom-8 left-4 right-4 bg-white/90 backdrop-blur-sm border border-[#e8d9cf] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#c8a951] mb-0.5">Founder</p>
                  <p className="font-serif text-[#2a1f1a] text-lg">Ekta</p>
                  <p className="text-xs text-[#2a1f1a]/50">Vedic Astrologer · Tarot Reader · Numerologist · Crystal Healer</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EKTA'S JOURNEY TIMELINE ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#2a1f1a]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">The Journey</p>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white">Ekta's Path</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-[#c8a951]/20" />
            {journey.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.08}>
                <div className="flex gap-8 pb-10 relative">
                  <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#c8a951]/40 bg-[#c8a951]/10 z-10">
                    <span className="text-[9px] font-bold text-[#c8a951]">{item.year}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-serif text-white mb-1.5">{item.title}</h3>
                    <p className="text-sm text-[#fdf8f4]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EKTA'S APPROACH ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#fdf8f4]">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-4">How Ekta Works</p>
              <h2 className="text-3xl font-serif font-light text-[#2a1f1a] mb-6 leading-snug">Ekta's Approach to Healing</h2>
              <p className="text-[#2a1f1a]/70 leading-relaxed mb-4">
                Ekta's approach is warm, grounded, and deeply non-prescriptive. She does not predict your future — she helps you remember your own wisdom and make choices aligned with your soul's true direction.
              </p>
              <p className="text-[#2a1f1a]/70 leading-relaxed mb-6">
                Whether through a Kundali reading, a Tarot session, or numerological analysis, Ekta creates a safe, confidential space where you can arrive exactly as you are — with your questions, your confusion, and your longing for clarity.
              </p>
              <div className="space-y-4">
                {["Empowerment over prediction", "Listening before advising", "Ancient science meets intuitive wisdom", "Always kind, never alarmist"].map(principle => (
                  <div key={principle} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a951] shrink-0" />
                    <span className="text-sm text-[#2a1f1a]/80">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {modalities.map((mod, i) => (
                <Link key={mod.title} href={mod.href}>
                  <motion.div
                    className="border border-[#e8d9cf] p-5 bg-white group cursor-pointer"
                    whileHover={{ borderColor: "rgba(200,169,81,0.5)", y: -3, boxShadow: "0 8px 32px rgba(200,169,81,0.08)" }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    // @ts-ignore
                    transition2={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <span className="block text-2xl text-[#c8a951] mb-3 font-serif">{mod.sym}</span>
                    <h4 className="font-serif text-[#2a1f1a] mb-2 group-hover:text-[#c8a951] transition-colors">{mod.title}</h4>
                    <p className="text-xs text-[#2a1f1a]/55 leading-relaxed">{mod.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BRAND BELIEFS / SACRED COMMITMENTS ──────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#2a1f1a]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white">Our Sacred Commitments</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <motion.div
                  className="border border-[#fdf8f4]/10 p-7 group cursor-default"
                  whileHover={{ borderColor: "rgba(200,169,81,0.4)", backgroundColor: "rgba(200,169,81,0.04)" }}
                  transition={{ duration: 0.2 }}
                >
                  <v.icon className="w-6 h-6 text-[#c8a951] mb-5" />
                  <h3 className="text-lg font-serif font-light text-white mb-3">{v.title}</h3>
                  <p className="text-sm text-[#fdf8f4]/50 leading-relaxed">{v.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#f5ede4] text-center">
        <ScrollReveal>
          <Sparkles className="w-8 h-8 text-[#c8a951] mx-auto mb-5" />
          <h2 className="text-3xl font-serif font-light text-[#2a1f1a] mb-4">Begin Your Journey with Ekta</h2>
          <p className="text-[#2a1f1a]/60 mb-8 max-w-md mx-auto">
            Whether you seek clarity through the stars, the cards, numbers, or crystals — Ekta is here to guide you home to yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kundali">
              <motion.span className="inline-flex items-center gap-2 bg-[#c8a951] text-[#2a1f1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                Free Kundali Reading <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link href="/tarot">
              <motion.span className="inline-flex items-center gap-2 border border-[#2a1f1a] text-[#2a1f1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer" whileHover={{ backgroundColor: "#2a1f1a", color: "#fdf8f4" }} transition={{ duration: 0.2 }}>
                Book a Tarot Reading
              </motion.span>
            </Link>
            <Link href="/numerology">
              <motion.span className="inline-flex items-center gap-2 border border-[#c8a951]/50 text-[#c8a951] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer" whileHover={{ backgroundColor: "#c8a951", color: "#2a1f1a" }} transition={{ duration: 0.2 }}>
                Numerology
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
