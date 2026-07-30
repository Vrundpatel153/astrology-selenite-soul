import { Link } from "wouter";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import CategoryGrid from "@/components/CategoryGrid";
import ShopByConcern from "@/components/ShopByConcern";
import ProductCarousel from "@/components/ProductCarousel";
import BestSellers from "@/components/BestSellers";
import NewArrivals from "@/components/NewArrivals";
import ShopByAstrology from "@/components/ShopByAstrology";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

function TrustBadges() {
  const badges = [
    "100% Natural",
    "Energised After Order",
    "Lab Testing Certificate",
    "1.5L+ Happy Customers",
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12 py-6 border-b border-[#e8d9cf] bg-white overflow-hidden">
      {badges.map((badge, i) => (
        <motion.span
          key={badge}
          className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-[#2a1f1a] text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
        >
          {badge}
        </motion.span>
      ))}
    </div>
  );
}

function KundaliPromo() {
  return (
    <ScrollReveal direction="up" threshold={0.15}>
      <Link href="/kundali">
        <motion.div
          className="mx-4 md:mx-8 my-10 md:my-14 border border-[#c8a951]/40 bg-gradient-to-r from-[#fdf3e1] to-[#fdf8f4] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 cursor-pointer group overflow-hidden relative"
          whileHover={{ borderColor: "rgba(200,169,81,0.8)" }}
          transition={{ duration: 0.2 }}
        >
          {/* Floating zodiac symbols */}
          {["♈","♌","♐","♎"].map((sym, i) => (
            <motion.span
              key={i}
              className="absolute text-4xl text-[#c8a951]/10 font-serif select-none pointer-events-none"
              style={{ top: `${10 + i * 20}%`, right: `${5 + i * 8}%` }}
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            >
              {sym}
            </motion.span>
          ))}
          <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-full" style={{ border: "1.5px solid rgba(200,169,81,0.6)", background: "rgba(200,169,81,0.06)" }}>
            <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
              {/* Star of David / Sri Yantra — upward triangle */}
              <polygon points="20,4 33,28 7,28" fill="rgba(200,169,81,0.1)" stroke="#c8a951" strokeWidth="1.5" strokeLinejoin="round"/>
              {/* Downward triangle */}
              <polygon points="20,36 7,12 33,12" fill="rgba(200,169,81,0.05)" stroke="rgba(200,169,81,0.7)" strokeWidth="1.5" strokeLinejoin="round"/>
              {/* Center dot */}
              <circle cx="20" cy="20" r="2.5" fill="#c8a951"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8a951] mb-1">Free Vedic Reading</p>
            <h3 className="text-xl md:text-2xl font-serif font-light text-[#2a1f1a] mb-1.5">
              Discover Your Crystal Destiny
            </h3>
            <p className="text-sm text-[#2a1f1a]/60 max-w-md">
              Enter your birth details and our Jyotish engine prescribes the exact gemstones aligned with your planetary chart.
            </p>
          </div>
          <motion.span
            className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a951] border-b border-[#c8a951]/40 pb-0.5 group-hover:border-[#c8a951] transition-colors"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.18 }}
          >
            Get My Kundali →
          </motion.span>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
}

// ─── Ekta Brand Introduction ────────────────────────────────────────────────────
function EktaIntro() {
  return (
    <ScrollReveal direction="up" threshold={0.08}>
      <section className="py-16 md:py-20 px-4 md:px-8 bg-[#fdf8f4]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-3">Meet Ekta</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2a1f1a] mb-5 leading-snug">
                Ancient Wisdom,<br />Modern Clarity
              </h2>
              <p className="text-[#2a1f1a]/65 leading-relaxed mb-4 text-sm md:text-base">
                Selenite Soul is Ekta's life's work — a sacred bridge between Vedic astrology, Tarot, Numerology, and the healing power of crystals. With over a decade of study and thousands of clients guided, Ekta brings the wisdom of ancient India into your everyday life.
              </p>
              <p className="text-[#2a1f1a]/65 leading-relaxed mb-6 text-sm md:text-base">
                Every crystal in our shop is personally selected and energised. Every reading is conducted with care, warmth, and the highest intention for your wellbeing.
              </p>
              <Link href="/about">
                <motion.span
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#c8a951] border-b border-[#c8a951]/40 pb-0.5 cursor-pointer"
                  whileHover={{ x: 4 }} transition={{ duration: 0.18 }}
                >
                  Ekta's Story <ArrowRight className="w-3 h-3" />
                </motion.span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "/kundali",    sym: "★", label: "Kundali",     sub: "Vedic Birth Chart" },
                { href: "/tarot",      sym: "♥", label: "Tarot",       sub: "Sacred Readings" },
                { href: "/numerology", sym: "7", label: "Numerology",  sub: "Name & Life Path" },
                { href: "/shop",       sym: "◈", label: "Crystals",    sub: "Ethically Sourced" },
              ].map((item, i) => (
                <Link key={item.label} href={item.href}>
                  <motion.div
                    className="border border-[#e8d9cf] p-5 text-center bg-white group cursor-pointer"
                    whileHover={{ borderColor: "rgba(200,169,81,0.5)", y: -3, boxShadow: "0 8px 24px rgba(200,169,81,0.08)" }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="block text-2xl text-[#c8a951] mb-2 font-serif">{item.sym}</span>
                    <p className="font-serif text-[#2a1f1a] group-hover:text-[#c8a951] transition-colors text-sm">{item.label}</p>
                    <p className="text-[9px] uppercase tracking-wider text-[#2a1f1a]/40 mt-0.5">{item.sub}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

// ─── Tarot Gateway ───────────────────────────────────────────────────────────────
function TarotPromo() {
  return (
    <ScrollReveal direction="up" threshold={0.12}>
      <Link href="/tarot">
        <motion.div
          className="mx-4 md:mx-8 mb-6 md:mb-8 border border-[#b07ec8]/30 bg-gradient-to-r from-[#1e1410] to-[#2a1624] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 cursor-pointer group overflow-hidden relative"
          whileHover={{ borderColor: "rgba(176,126,200,0.7)" }}
          transition={{ duration: 0.2 }}
        >
          {/* Floating symbols */}
          {["♥","★","☽","✦"].map((sym, i) => (
            <motion.span key={i}
              className="absolute text-3xl text-[#b07ec8]/10 font-serif select-none pointer-events-none"
              style={{ top: `${10 + i * 20}%`, right: `${4 + i * 9}%` }}
              animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            >
              {sym}
            </motion.span>
          ))}
          <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-sm border border-[#b07ec8]/40 bg-[#b07ec8]/10">
            <span className="text-2xl text-[#b07ec8]">♥</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b07ec8] mb-1">Sacred Guidance</p>
            <h3 className="text-xl md:text-2xl font-serif font-light text-white mb-1.5">
              Tarot Reading with Ekta
            </h3>
            <p className="text-sm text-white/50 max-w-md">
              Not fortune-telling — a conversation with your inner wisdom. Book a one-on-one Tarot session and receive clarity on love, career, and life's deeper questions.
            </p>
          </div>
          <motion.span
            className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b07ec8] border-b border-[#b07ec8]/40 pb-0.5 group-hover:border-[#b07ec8] transition-colors"
            whileHover={{ x: 4 }} transition={{ duration: 0.18 }}
          >
            Book a Reading →
          </motion.span>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
}

// ─── Numerology Gateway ──────────────────────────────────────────────────────────
function NumerologyPromo() {
  return (
    <ScrollReveal direction="up" threshold={0.12}>
      <Link href="/numerology">
        <motion.div
          className="mx-4 md:mx-8 mb-10 md:mb-14 border border-[#7e9dbf]/30 bg-gradient-to-r from-[#111820] to-[#141c28] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 cursor-pointer group overflow-hidden relative"
          whileHover={{ borderColor: "rgba(126,157,191,0.7)" }}
          transition={{ duration: 0.2 }}
        >
          {[7,3,9,1,22].map((num, i) => (
            <motion.span key={i}
              className="absolute font-serif text-[#7e9dbf]/08 select-none pointer-events-none"
              style={{ fontSize: `${40 + i * 12}px`, top: `${5 + i * 18}%`, right: `${6 + i * 8}%` }}
              animate={{ y: [0, -10, 0], opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            >
              {num}
            </motion.span>
          ))}
          <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-sm border border-[#7e9dbf]/40 bg-[#7e9dbf]/10">
            <span className="text-2xl font-serif text-[#7e9dbf] leading-none">7</span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7e9dbf] mb-1">Free Calculator</p>
            <h3 className="text-xl md:text-2xl font-serif font-light text-white mb-1.5">
              Discover Your Numerology
            </h3>
            <p className="text-sm text-white/50 max-w-md">
              Numbers are the language of the Universe. Calculate your Name Number, Life Path, and compatibility — and unlock the sacred code encoded in your birth.
            </p>
          </div>
          <motion.span
            className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7e9dbf] border-b border-[#7e9dbf]/40 pb-0.5 group-hover:border-[#7e9dbf] transition-colors"
            whileHover={{ x: 4 }} transition={{ duration: 0.18 }}
          >
            Calculate Now →
          </motion.span>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopBar />
      <Header />

      <main>
        <Hero />
        <TrustBadges />

        {/* Brand intro / Ekta gateway */}
        <EktaIntro />

        <ScrollReveal direction="up" threshold={0.06}>
          <CategoryGrid />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.05} threshold={0.05}>
          <ShopByConcern />
        </ScrollReveal>

        <ScrollReveal direction="up" threshold={0.05}>
          <ProductCarousel />
        </ScrollReveal>

        {/* Kundali gateway */}
        <KundaliPromo />

        {/* Tarot gateway */}
        <TarotPromo />

        {/* Numerology gateway */}
        <NumerologyPromo />

        <ScrollReveal direction="up" threshold={0.04}>
          <BestSellers />
        </ScrollReveal>

        <ScrollReveal direction="up" threshold={0.04}>
          <NewArrivals />
        </ScrollReveal>

        <ScrollReveal direction="up" threshold={0.06}>
          <Manifesto />
        </ScrollReveal>

        <ScrollReveal direction="up" threshold={0.05}>
          <ShopByAstrology />
        </ScrollReveal>

        <ScrollReveal direction="up" threshold={0.05}>
          <Services />
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
