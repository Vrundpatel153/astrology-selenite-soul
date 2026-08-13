"use client";
import { Link } from "wouter";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import ShopByConcernCarousel from "@/components/ShopByConcernCarousel";
import ShopByAstrologyCarousel from "@/components/ShopByAstrologyCarousel";
import TabbedProductCarousel from "@/components/TabbedProductCarousel";
import { ArrowRight, Sparkles, Star } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// 1. TRUST STRIP
// ─────────────────────────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { sym: "✦", label: "100% Natural" },
    { sym: "◈", label: "Full Moon Energised" },
    { sym: "★", label: "Lab Tested & Certified" },
    { sym: "♥", label: "1.5L+ Happy Customers" },
    { sym: "✿", label: "Ethically Sourced" },
    { sym: "☽", label: "Vedic Wisdom" },
  ];
  return (
    <div className="bg-[#2a1f1a] overflow-hidden">
      <div className="flex items-center">
        {[...items, ...items].map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 px-7 py-3.5 flex-none border-r border-white/10 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (i % items.length) * 0.06 }}
          >
            <span className="text-[#c8a951] text-xs">{item.sym}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. EKTA'S STORY
// ─────────────────────────────────────────────────────────────────────────────
function EktaStory() {
  return (
    <section className="relative overflow-hidden bg-[#fdf8f4]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] md:min-h-[720px]">
          {/* Image side */}
          <ScrollReveal direction="right" duration={0.9}>
            <div className="relative h-[50vw] md:h-full min-h-[340px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=80"
                alt="Ekta — Founder of Selenite Soul"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fdf8f4]/20" />
              {/* Floating credential tag */}
              <motion.div
                className="absolute bottom-6 right-0 bg-white/90 backdrop-blur-sm border border-[#e8d9cf] px-5 py-3 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#c8a951] mb-0.5">Founder</p>
                <p className="font-serif text-lg text-[#2a1f1a] leading-snug">Ekta</p>
                <p className="text-[10px] text-[#2a1f1a]/50 leading-tight max-w-[180px]">
                  Vedic Astrologer · Tarot Reader<br />Numerologist · Crystal Healer
                </p>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Text side */}
          <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-14 md:py-20 bg-[#fdf8f4]">
            <ScrollReveal direction="left" duration={0.8}>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-4">Ekta's Story</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#2a1f1a] leading-snug mb-7">
                A Journey from<br />Seeking to <span className="italic text-[#c8a951]">Guiding</span>
              </h2>
              <p className="text-[#2a1f1a]/70 leading-relaxed mb-5 text-sm md:text-base">
                In 2012, during a family pilgrimage to Haridwar, a sage placed a raw amethyst in Ekta's hands and said: <em className="text-[#2a1f1a]">"The Earth already knows your answer."</em>
              </p>
              <p className="text-[#2a1f1a]/65 leading-relaxed mb-5 text-sm md:text-base">
                That moment sparked a decade-long immersion in Vedic Jyotish, Pythagorean Numerology, intuitive Tarot, and crystal healing — studying formally in Pune and privately with teachers across India.
              </p>
              <p className="text-[#2a1f1a]/65 leading-relaxed mb-8 text-sm md:text-base">
                In 2019, Selenite Soul was born — a sacred mission to make ancient healing wisdom accessible to every modern person seeking clarity.
              </p>
              <div className="flex flex-wrap gap-5 mb-8">
                {["10+ Years Study", "1.5L+ Clients", "Certified Jyotish"].map(cred => (
                  <div key={cred} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#c8a951]" />
                    <span className="text-xs font-medium text-[#2a1f1a]/70 uppercase tracking-wider">{cred}</span>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <motion.span
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#c8a951] border-b border-[#c8a951]/40 pb-0.5 cursor-pointer"
                  whileHover={{ x: 5 }} transition={{ duration: 0.18 }}
                >
                  Read Ekta's Full Story <ArrowRight className="w-3 h-3" />
                </motion.span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BRAND INTRODUCTION / PHILOSOPHY
// ─────────────────────────────────────────────────────────────────────────────
function BrandIntro() {
  const pillars = [
    { sym: "✦", title: "Ancient Vedic Wisdom", desc: "Jyotish, Tarot, and Numerology — three sacred systems aligned to illuminate your path and deepen your understanding of self." },
    { sym: "◈", title: "Earth's Crystal Energy", desc: "Ethically sourced, full-moon charged crystals that carry the earth's healing intelligence — responsibly mined and ceremonially energised." },
    { sym: "♥", title: "Ekta's Sacred Intention", desc: "Every piece, every reading, every recommendation carries the personal energy of Ekta's decade of training and heartfelt care." },
    { sym: "☽", title: "Holistic & Integrative", desc: "We believe healing happens on all levels — physical, emotional, mental, and spiritual. Ancient wisdom, modern life." },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-14 bg-[#2a1f1a] overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-3">Selenite Soul</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-5 leading-snug">
            Where Ancient Wisdom<br />Meets the <span className="italic text-[#c8a951]">Modern Soul</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            We bridge the sacred knowledge of Vedic India — crystals, Jyotish, Tarot, Numerology — with the rhythms of your everyday life.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <motion.div
                className="border border-white/10 p-7 group h-full"
                whileHover={{ borderColor: "rgba(200,169,81,0.45)", backgroundColor: "rgba(200,169,81,0.03)" }}
                transition={{ duration: 0.2 }}
              >
                <span className="block text-2xl text-[#c8a951] mb-5 font-serif">{p.sym}</span>
                <h3 className="font-serif text-white text-lg mb-3 leading-snug">{p.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{p.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pull quote */}
        <ScrollReveal className="mt-14">
          <div className="border-l-2 border-[#c8a951]/50 pl-7 py-3 max-w-3xl">
            <p className="text-lg md:text-xl font-serif font-light text-white/80 leading-relaxed italic mb-3">
              "I believe every person carries a cosmic blueprint — a unique energetic signature written in the stars, in numbers, and in the crystals that call to them. My work is to help you read that blueprint and live from its truth."
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#c8a951]">— Ekta, Founder of Selenite Soul</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. KUNDALI SECTION
// ─────────────────────────────────────────────────────────────────────────────
function KundaliSection() {
  return (
    <section className="relative overflow-hidden min-h-[480px] md:min-h-[560px] flex items-center" style={{ background: "linear-gradient(135deg, #1e1410 0%, #2d1a10 50%, #1a1a24 100%)" }}>
      {/* Animated zodiac symbols */}
      {["♈","♌","♐","♎","♒","♊"].map((sym, i) => (
        <motion.span key={i}
          className="absolute font-serif select-none pointer-events-none text-[#c8a951]"
          style={{ fontSize: `${48 + (i % 3) * 20}px`, top: `${8 + i * 14}%`, right: `${2 + (i % 4) * 6}%`, opacity: 0.06 }}
          animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
        >{sym}</motion.span>
      ))}
      {/* Mandala glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] opacity-20"
          style={{ background: "radial-gradient(circle, #c8a951 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-14 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <ScrollReveal direction="right">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-4">Free Vedic Reading</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-snug mb-5">
              Your Kundali —<br />
              <span className="italic text-[#c8a951]">The Blueprint of Your Soul</span>
            </h2>
            <p className="text-white/55 text-sm md:text-base leading-relaxed mb-7 max-w-lg">
              In Vedic astrology, your Kundali (birth chart) is a precise cosmic map of the sky at the moment you were born. It reveals your dharma, karma, relationships, health, wealth, and spiritual path — all in one free reading.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Birth Chart", "9 Planets", "27 Nakshatras", "Dasha Periods", "Crystal Remedies"].map(feat => (
                <span key={feat} className="text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 border border-[#c8a951]/30 text-[#c8a951]/80">{feat}</span>
              ))}
            </div>
            <Link href="/kundali">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1e1410] px-8 py-4 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(200,169,81,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Generate My Free Kundali <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </ScrollReveal>

          {/* Visual: Mandala art */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 280 280" width="280" height="280" className="opacity-30 absolute">
                <circle cx="140" cy="140" r="130" fill="none" stroke="#c8a951" strokeWidth="0.5" strokeDasharray="4 8" className="kundali-spin-slow" />
                <circle cx="140" cy="140" r="100" fill="none" stroke="#c8a951" strokeWidth="0.5" className="kundali-spin-slow-rev" />
                <circle cx="140" cy="140" r="70" fill="none" stroke="#c8a951" strokeWidth="0.5" strokeDasharray="2 6" className="kundali-spin-med" />
              </svg>
              <div className="w-52 h-52 border border-[#c8a951]/20 flex items-center justify-center bg-[#c8a951]/05">
                <div className="text-center">
                  <div className="text-5xl text-[#c8a951] font-serif mb-3">♋</div>
                  <p className="text-white/40 text-[9px] uppercase tracking-widest">Your Cosmic Map</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. NUMEROLOGY SECTION
// ─────────────────────────────────────────────────────────────────────────────
function NumerologySection() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-14 bg-[#fdf3ec] overflow-hidden">
      {/* Floating number bg */}
      {numbers.map((n, i) => (
        <motion.span key={n}
          className="absolute font-serif text-[#2a1f1a]/04 pointer-events-none select-none"
          style={{ fontSize: `${50 + (i % 4) * 22}px`, top: `${(i * 23 + 7) % 90}%`, left: `${(i * 31 + 5) % 85}%` }}
          animate={{ opacity: [0.04, 0.10, 0.04], y: [0, -12, 0] }}
          transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >{n}</motion.span>
      ))}

      <div className="relative z-10 max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Number grid visual */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4,5,6,7,8,9,"◈","★","☽"].map((n, i) => (
                <motion.div key={i}
                  className="aspect-square border border-[#e8d9cf] flex items-center justify-center bg-white group cursor-default"
                  whileHover={{ borderColor: "rgba(200,169,81,0.6)", backgroundColor: "rgba(200,169,81,0.05)" }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                >
                  <span className="text-xl md:text-2xl font-serif text-[#2a1f1a]/70">{n}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal direction="left">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-4">Free Calculator</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#2a1f1a] leading-snug mb-5">
              Numbers Are the<br />
              <span className="italic text-[#c8a951]">Language of the Universe</span>
            </h2>
            <p className="text-[#2a1f1a]/60 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
              Discover your Name Number, Life Path, and compatibility score — unlock the sacred Pythagorean code encoded in your birth and name. No signup required.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { sym: "✦", title: "Name Number", desc: "Expression & destiny encoded in your birth name" },
                { sym: "★", title: "Life Path", desc: "Your soul's core purpose from your birthdate" },
                { sym: "∞", title: "Compatibility", desc: "Compare two people's energetic vibrations" },
              ].map((feat, i) => (
                <div key={feat.title} className="p-4 border border-[#e8d9cf] bg-white">
                  <span className="block text-lg text-[#c8a951] font-serif mb-2">{feat.sym}</span>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2a1f1a] mb-1">{feat.title}</h4>
                  <p className="text-[10px] text-[#2a1f1a]/50 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/numerology">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#2a1f1a] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                whileHover={{ backgroundColor: "#3d2d25", scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Calculate My Numbers <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. YOGA / ASTROLOGY SECTION
// ─────────────────────────────────────────────────────────────────────────────
function YogaAstrologySection() {
  const yogas = [
    { name: "Raj Yoga", desc: "The yoga of power and authority — when lords of trine and kendra meet, greatness follows.", planet: "☉", color: "#c8a951" },
    { name: "Gaja Kesari", desc: "Elephant-lion yoga — Jupiter-Moon union creating enormous courage, wisdom and magnetism.", planet: "♃", color: "#7aad78" },
    { name: "Dhana Yoga", desc: "Wealth yoga — the 2nd and 11th lords combine to attract material abundance and prosperity.", planet: "♀", color: "#7e9dbf" },
    { name: "Chandra Mangal", desc: "The Moon-Mars combination — emotional passion, entrepreneurial drive, and bold heart.", planet: "☽", color: "#b07ec8" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-14 bg-[#fdf8f4]">
      <div className="max-w-[1300px] mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-3">Vedic Astrology</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2a1f1a] mb-4">
            Sacred <span className="italic text-[#c8a951]">Yogas</span> & Cosmic Patterns
          </h2>
          <p className="text-[#2a1f1a]/55 max-w-xl mx-auto text-sm md:text-base">
            Vedic Jyotish identifies powerful planetary combinations — called Yogas — that shape your life's energy, purpose, and potential.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {yogas.map((yoga, i) => (
            <ScrollReveal key={yoga.name} delay={i * 0.1}>
              <motion.div
                className="border border-[#e8d9cf] p-7 bg-white h-full group"
                whileHover={{ borderColor: yoga.color + "80", y: -5, boxShadow: `0 16px 48px ${yoga.color}15` }}
                transition={{ duration: 0.22 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-xl font-serif"
                  style={{ border: `1.5px solid ${yoga.color}40`, background: yoga.color + "12", color: yoga.color }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: i * 1.2 }}
                >
                  {yoga.planet}
                </motion.div>
                <h3 className="font-serif text-[#2a1f1a] text-lg mb-2" style={{ color: yoga.color }}>{yoga.name}</h3>
                <p className="text-sm text-[#2a1f1a]/55 leading-relaxed">{yoga.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Link href="/kundali">
            <motion.span
              className="inline-flex items-center gap-2 border border-[#2a1f1a] text-[#2a1f1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
              whileHover={{ backgroundColor: "#2a1f1a", color: "#fdf8f4" }}
              transition={{ duration: 0.2 }}
            >
              Discover Your Yogas in Kundali <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CRYSTALS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function CrystalsSection() {
  const crystalTypes = [
    { name: "Bracelets", image: "/cat-bracelets.webp", href: "/shop?category=bracelets" },
    { name: "Pendants", image: "/cat-pendants.webp", href: "/shop?category=pendants" },
    { name: "Gemstones", image: "/cat-gemstones.webp", href: "/shop?category=gemstones" },
    { name: "Rings", image: "/cat-rings.webp", href: "/shop?category=rings" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1e1410]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] md:min-h-[680px]">
          {/* Image collage */}
          <ScrollReveal direction="right" duration={0.8}>
            <div className="grid grid-cols-2 gap-1 h-full min-h-[400px]">
              {crystalTypes.map((cat, i) => (
                <div key={cat.name} className="relative overflow-hidden group">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 min-h-[200px]"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />
                  <p className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-widest">{cat.name}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Text & CTA */}
          <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 md:py-20 bg-[#1e1410]">
            <ScrollReveal direction="left">
              {/* Sparkle */}
              <motion.div className="mb-6"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-[#c8a951]" />
              </motion.div>

              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-4">Healing Crystals</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-snug mb-5">
                Discover Your<br />
                <span className="italic text-[#c8a951]">Healing Crystal</span>
              </h2>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Every crystal in our shop is personally selected by Ekta, ethically sourced, lab-tested, and energised under the full moon. From raw stones to sacred jewellery — there is a crystal aligned to your energy.
              </p>

              {/* Two CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kundali">
                  <motion.span
                    className="inline-flex items-center justify-center gap-2 border border-[#c8a951] text-[#c8a951] px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                    whileHover={{ backgroundColor: "#c8a951", color: "#1e1410" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Star className="w-3.5 h-3.5" /> Know Your Crystal
                  </motion.span>
                </Link>
                <Link href="/shop">
                  <motion.span
                    className="inline-flex items-center justify-center gap-2 bg-[#c8a951] text-[#1e1410] px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                    whileHover={{ scale: 1.04, boxShadow: "0 12px 36px rgba(200,169,81,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Shop Crystals <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </div>

              {/* Trust mini-stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
                {[["222+", "Products"], ["100%", "Natural"], ["1.5L+", "Customers"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-serif font-light text-[#c8a951]">{num}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. TAROT SECTION
// ─────────────────────────────────────────────────────────────────────────────
function TarotSection() {
  const tarotCards = [
    { sym: "♥", label: "Love" },
    { sym: "★", label: "Career" },
    { sym: "☽", label: "Spirit" },
    { sym: "✦", label: "Future" },
    { sym: "♦", label: "Wealth" },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-14 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1e0a15 0%, #2a0e1e 40%, #1a0a24 100%)" }}
    >
      {/* Floating card symbols */}
      {tarotCards.map((card, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none select-none"
          style={{ top: `${10 + i * 16}%`, right: `${3 + (i % 3) * 8}%` }}
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0], opacity: [0.06, 0.18, 0.06] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        >
          <div className="w-12 h-16 md:w-16 md:h-22 border border-[#b07ec8]/30 flex items-center justify-center"
            style={{ background: "rgba(176,126,200,0.06)" }}>
            <span className="text-xl md:text-2xl text-[#b07ec8]">{card.sym}</span>
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <ScrollReveal direction="right">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#b07ec8] mb-4">Sacred Guidance</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-snug mb-5">
              Tarot Reading<br />
              <span className="italic text-[#b07ec8]">with Ekta</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
              Not fortune-telling — a conversation with your inner wisdom. Ekta uses Tarot as a sacred mirror to illuminate your path, offer clarity, and empower your choices in love, career, and life.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Love & Relationships", "Career & Purpose", "Spiritual Growth", "Life Transitions"].map(area => (
                <span key={area} className="text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 border border-[#b07ec8]/30 text-[#b07ec8]/70">{area}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/tarot#book">
                <motion.span
                  className="inline-flex items-center gap-2 bg-[#b07ec8] text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 36px rgba(176,126,200,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book a Reading <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/tarot">
                <motion.span
                  className="inline-flex items-center gap-2 border border-[#b07ec8]/50 text-[#b07ec8] px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer"
                  whileHover={{ backgroundColor: "rgba(176,126,200,0.12)" }}
                  transition={{ duration: 0.18 }}
                >
                  Learn More
                </motion.span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="relative">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&q=80"
                  alt="Ekta — Tarot Reader"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a15]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-20 h-20 border border-[#b07ec8]/30 bg-[#b07ec8]/05" />
              <div className="absolute -top-3 -right-3 w-14 h-14 border border-[#b07ec8]/20" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHOP BY PRODUCT CAROUSEL (using ProductCarousel's data but enhanced)
// ─────────────────────────────────────────────────────────────────────────────
import { products } from "@/data/products";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";

const shopByProductItems = products.slice(0, 12);

function ShopByProductCarousel() {
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateState);
    emblaApi.on("reInit", updateState);
    updateState();
    return () => { emblaApi.off("select", updateState); emblaApi.off("reInit", updateState); };
  }, [emblaApi, updateState]);

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="px-4 md:px-14 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">Shop By</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2a1f1a]">Product</h2>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev}
            className="w-10 h-10 border border-[#e8d9cf] flex items-center justify-center text-[#2a1f1a] disabled:opacity-30 hover:border-[#c8a951] hover:text-[#c8a951] transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext}
            className="w-10 h-10 border border-[#e8d9cf] flex items-center justify-center text-[#2a1f1a] disabled:opacity-30 hover:border-[#c8a951] hover:text-[#c8a951] transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden border-t border-b border-[#e8d9cf]" ref={emblaRef}>
        <div className="flex">
          {shopByProductItems.map(product => (
            <div
              key={product.id}
              className="flex-none w-[56vw] sm:w-[40vw] md:w-[300px] border-r border-[#e8d9cf] bg-[#f7f1ec] group cursor-pointer relative"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.badge && (
                <div className={`absolute top-3 left-3 z-10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${product.badge === "SALE" ? "bg-[#8b2020] text-white" : product.badge === "BEST SELLER" ? "bg-[#c8a951] text-[#2a1f1a]" : "bg-[#2a1f1a] text-white"}`}>
                  {product.badge}
                </div>
              )}
              <div className="relative aspect-square w-full p-6 md:p-8">
                <img src={product.image} alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute bottom-3 right-3 w-9 h-9 bg-white border border-[#e8d9cf] flex items-center justify-center hover:bg-[#2a1f1a] hover:text-white hover:border-[#2a1f1a] transition-colors"
                  onClick={e => { e.stopPropagation(); addToCart(product); }} aria-label="Quick add">
                  <Plus className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
              <div className="p-3 md:p-4 bg-white border-t border-[#e8d9cf]">
                <h3 className="text-[10px] md:text-[11px] font-normal uppercase tracking-widest text-[#2a1f1a] mb-1.5 truncate">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-[13px] md:text-[15px] font-bold text-[#2a1f1a]">₹{product.price}</p>
                  {product.originalPrice && <p className="text-[11px] text-[#2a1f1a]/40 line-through">₹{product.originalPrice}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HOME EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopBar />
      <Header />

      <main>
        {/* 1 — Hero Carousel */}
        <HeroCarousel />

        {/* Trust strip */}
        <TrustStrip />

        {/* 2 — Ekta's Story */}
        <EktaStory />

        {/* 3 — Brand Introduction / Philosophy */}
        <BrandIntro />

        {/* 4 — Kundali */}
        <KundaliSection />

        {/* 5 — Numerology */}
        <NumerologySection />

        {/* 6 — Yoga / Astrology */}
        <YogaAstrologySection />

        {/* 7 — Crystals */}
        <CrystalsSection />

        {/* 8 — Tarot */}
        <TarotSection />

        {/* 9 — Shop by Concern Carousel */}
        <ShopByConcernCarousel />

        {/* 10 — Shop by Product Carousel */}
        <ShopByProductCarousel />

        {/* 11 — Shop by Astrology Carousel */}
        <ShopByAstrologyCarousel />

        {/* 12 — Tabbed Carousel: New Arrivals / Bestsellers / Ekta's Picks */}
        <TabbedProductCarousel />
      </main>

      <Footer />
    </div>
  );
}
