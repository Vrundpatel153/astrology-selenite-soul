"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCart } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import ShopByConcernCarousel from "@/components/ShopByConcernCarousel";
import ShopByAstrologyCarousel from "@/components/ShopByAstrologyCarousel";
import TabbedProductCarousel from "@/components/TabbedProductCarousel";
import InteractiveTarotDeck from "@/components/InteractiveTarotDeck";
import InteractiveZodiacWheel from "@/components/InteractiveZodiacWheel";
import InteractiveNumerologyMatrix from "@/components/InteractiveNumerologyMatrix";
import { products } from "@/data/products";
import { useGSAPReveal, useParallax, useSplitReveal, useCounter } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap-init";

// ─── Shared serif style
const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

// ─── Hover tilt hook for cards
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * intensity;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * -intensity;
    ref.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };
  return { ref, handleMouseMove, handleMouseLeave };
}

// ─── Magnetic link wrapper (Hydration safe with useLocation)
function MagLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const [, navigate] = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      className={`cursor-pointer ${className}`}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={() => navigate(href)}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GOLD MARQUEE TRUST STRIP
// ─────────────────────────────────────────────────────────────────────────────
function TrustStrip() {
  const items = ["100% Natural Crystals", "Full Moon Energised", "Lab Tested & Certified", "1.5L+ Lives Guided", "Ethically Sourced", "Vedic Wisdom", "Handpicked by Ekta"];
  return (
    <div className="bg-[#c8a951] overflow-hidden py-3.5 select-none shadow-md">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#0a0508] whitespace-nowrap">
            {item}<span className="opacity-40 font-mono">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. EKTA'S STORY
// ─────────────────────────────────────────────────────────────────────────────
function EktaStory() {
  const sectionRef = useGSAPReveal({ staggerSelector: ".ekta-reveal", staggerDelay: 0.13, from: { opacity: 0, y: 60 }, start: "top 80%" });
  const imgRef = useParallax(0.15);

  const stats = [
    { target: 10, suffix: "+", label: "Years of Study" },
    { target: 150000, suffix: "+", label: "Lives Guided" },
    { target: 3, suffix: "", label: "Sacred Disciplines" },
  ];
  const c1 = useCounter(stats[0].target, stats[0].suffix);
  const c2 = useCounter(stats[1].target, stats[1].suffix);
  const c3 = useCounter(stats[2].target, stats[2].suffix);
  const counters = [c1, c2, c3];

  return (
    <section ref={sectionRef} className="bg-[#fcf8f4] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[600px] lg:min-h-[720px]">
        {/* Image */}
        <div className="relative overflow-hidden min-h-[380px] lg:min-h-0" data-cursor="view">
          <motion.img
            ref={imgRef as any}
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1100&q=85&fm=webp&fit=crop&crop=top"
            alt="Ekta — Founder, Selenite Soul"
            className="w-full h-full object-cover object-top scale-110"
          />
          <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, transparent 60%, #fcf8f4 100%)" }} />

          {/* Animated credential badge */}
          <motion.div
            className="ekta-reveal absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-[#0d070b]/90 backdrop-blur-md px-5 py-4 border-l-2 border-[#c8a951] shadow-2xl"
            whileHover={{ x: 4, borderLeftWidth: "4px" }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#c8a951] mb-1">Founder · Selenite Soul</p>
            <p className="text-lg text-white leading-snug" style={serif}>Ekta</p>
            <p className="text-[10px] text-white/50 mt-0.5">Jyotish · Tarot · Numerology · Crystal Healing</p>
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-14 lg:py-20">
          <div className="ekta-reveal flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Ekta's Story</span>
          </div>

          <h2 className="ekta-reveal text-3xl md:text-4xl xl:text-5xl font-light text-[#2a1f1a] leading-[1.1] mb-7" style={serif}>
            A Journey From<br />
            <em className="italic text-[#a5762a]">Seeking to Guiding</em>
          </h2>

          <div className="ekta-reveal space-y-4 mb-8 max-w-lg">
            <p className="text-sm text-[#4a3020]/80 leading-[1.85] font-light">
              In 2012, during a pilgrimage to Haridwar, a sage placed a raw amethyst in Ekta's hands and said: <span className="italic text-[#2a1f1a] font-medium">"The Earth already knows your answer."</span>
            </p>
            <p className="text-sm text-[#4a3020]/75 leading-[1.85] font-light">
              That moment ignited a decade of immersion — Vedic Jyotish, Pythagorean Numerology, intuitive Tarot, and crystal healing. In 2019, Selenite Soul was born.
            </p>
          </div>

          {/* Animated counters */}
          <div className="ekta-reveal flex gap-8 mb-8 pb-8 border-b border-[#e8d9cf]">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <p ref={counters[i]} className="text-2xl text-[#a5762a] font-light" style={serif}>
                  0{stat.suffix}
                </p>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#4a3020]/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <MagLink href="/about" className="ekta-reveal">
            <motion.span
              className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#a5762a] group"
              whileHover={{ x: 4 }}
            >
              Read Ekta's Full Story
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </motion.span>
          </MagLink>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BRAND PHILOSOPHY — Crisp Sacred Geometry & Deep Obsidian Velvet
// ─────────────────────────────────────────────────────────────────────────────
const pillars = [
  { num: "01", title: "Ancient Vedic Wisdom", body: "Jyotish, Tarot, and Numerology — three sacred systems that have guided humanity for millennia, now decoded for your modern path." },
  { num: "02", title: "Earth's Crystal Energy", body: "Every stone is ethically sourced, lab-tested for authenticity, and ceremonially energised under the full moon before it reaches you." },
  { num: "03", title: "Ekta's Sacred Intention", body: "Each reading carries the energy of over a decade of dedicated study and thousands of personal client sessions." },
  { num: "04", title: "Holistic Healing", body: "We work across physical, emotional, mental, and spiritual layers — because true healing is never one-dimensional." },
];

function BrandPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".pillar-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[#0c070a]">
      {/* High-Resolution Luxury Sacred Geometry Artwork Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/brand-philosophy-luxury.webp"
          alt="Sacred Geometry Sri Yantra"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c070a] via-transparent to-[#0c070a]" />
        <div className="absolute inset-0 bg-[#0c070a]/50" />
      </div>

      <div className="relative z-10 px-5 md:px-14 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <motion.p
              className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-3"
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              Selenite Soul Philosophy
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl xl:text-6xl font-light text-white leading-[1.08]" style={serif}
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
            >
              Where Ancient Wisdom<br />
              <em className="italic text-[#c8a951]">Meets Modern Life</em>
            </motion.h2>
          </div>
          <motion.p
            className="text-sm md:text-base text-white/75 leading-relaxed max-w-md font-light"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          >
            We bridge the sacred knowledge of Vedic India with the rhythms of your everyday life — through crystals, astrology, Tarot, and numbers.
          </motion.p>
        </div>

        {/* Pillar Cards in Deep Obsidian Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const { ref, handleMouseMove, handleMouseLeave } = useTilt(5);
            return (
              <div
                key={p.num}
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="pillar-card bg-[#140b11]/85 border border-[#c8a951]/30 p-8 flex flex-col group cursor-default backdrop-blur-md hover:border-[#c8a951]/80 hover:bg-[#1a0f16] transition-all duration-300 rounded-sm shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-light text-[#c8a951]" style={serif}>{p.num}</span>
                  <span className="text-[#c8a951]/50 text-xs font-mono">•</span>
                </div>
                <h3 className="text-lg md:text-xl font-light text-white leading-snug mb-3" style={serif}>{p.title}</h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed mt-auto font-light">{p.body}</p>
              </div>
            );
          })}
        </div>

        {/* Pull quote */}
        <motion.div
          className="mt-16 md:mt-24 border-l-2 border-[#c8a951] pl-8 max-w-3xl bg-[#140b11]/70 border border-y-0 border-r-0 border-l-[#c8a951] p-6 backdrop-blur-md shadow-xl"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-4 font-light" style={{ ...serif, fontStyle: "italic" }}>
            "I believe every person carries a cosmic blueprint — a unique energetic signature written in the stars, in numbers, and in the crystals that call to them."
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951]">
            — Ekta, Founder of Selenite Soul
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. KUNDALI — Luxury Vedic Birth Chart & Astrological Mandala
// ─────────────────────────────────────────────────────────────────────────────
function KundaliSection() {
  const bgRef = useParallax(0.12);
  const sectionRef = useGSAPReveal({ staggerSelector: ".k-reveal", staggerDelay: 0.12, start: "top 80%" });
  const headRef = useSplitReveal();

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[600px] lg:min-h-[720px] flex items-center bg-[#090407]">
      {/* High-Resolution Luxury Vedic Astrology Mandala Artwork Backdrop */}
      <div className="absolute inset-0 scale-105 pointer-events-none">
        <img
          ref={bgRef as any}
          src="/kundali-blueprint-luxury.webp"
          alt="Vedic Kundali Celestial Mandala"
          className="w-full h-full object-cover object-right lg:object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090407] via-[#090407]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090407] via-transparent to-[#090407]/60" />
      </div>

      <div className="relative z-10 px-6 md:px-14 lg:px-20 py-16 md:py-24 max-w-[860px]">
        <div>
          <div className="k-reveal flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#c8a951]">Free Vedic Reading</span>
          </div>
          <h2 ref={headRef as any}
            className="k-reveal text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.04] mb-6"
            style={serif}
          >
            Your Kundali — The Blueprint of Your Soul
          </h2>
          <p className="k-reveal text-sm md:text-base text-white/70 leading-[1.85] mb-8 max-w-[520px] font-light">
            Your birth chart is a precise cosmic map — revealing dharma, karma, relationships, health, wealth, and spiritual path. Computed free, instantly.
          </p>
          <div className="k-reveal flex flex-wrap gap-y-2 gap-x-6 mb-10 text-white/40 text-[10px] uppercase tracking-widest font-bold">
            {["Lahiri Ayanamsa", "9 Grahas", "27 Nakshatras", "Dasha Timeline", "Crystal Remedies"].map(f => (
              <span key={f} className="flex items-center gap-1.5">
                <motion.span className="w-1.5 h-1.5 rounded-full bg-[#c8a951]"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
                {f}
              </span>
            ))}
          </div>
          <MagLink href="/kundali" className="k-reveal">
            <motion.span
              className="inline-flex items-center gap-3 bg-[#c8a951] text-[#0a0508] px-8 md:px-10 py-4 text-[10px] font-bold uppercase tracking-[0.24em] relative overflow-hidden shadow-2xl hover:shadow-[#c8a951]/40 transition-shadow"
              whileTap={{ scale: 0.97 }}
            >
              Generate My Free Kundali <ArrowRight className="w-4 h-4" />
            </motion.span>
          </MagLink>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. NUMEROLOGY — with Interactive Live Decoder
// ─────────────────────────────────────────────────────────────────────────────
function NumerologySection() {
  const sectionRef = useGSAPReveal({ staggerSelector: ".num-reveal", staggerDelay: 0.1, start: "top 80%" });

  return (
    <section ref={sectionRef} className="py-20 md:py-28 overflow-hidden bg-[#0c070a]">
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951]">Pythagorean Numerology</span>
            <div className="h-px w-8 bg-[#c8a951]/60" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={serif}>
            Numbers Are the <em className="italic text-[#c8a951]">Language of the Universe</em>
          </h2>
          <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
            Every number carries a precise vibrational frequency. Enter your details below to reveal your life path and expression archetype.
          </p>
        </div>

        {/* Live Interactive Decoder */}
        <InteractiveNumerologyMatrix />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ASTROLOGY & ZODIAC — with Interactive Celestial Wheel
// ─────────────────────────────────────────────────────────────────────────────
function AstrologyZodiacSection() {
  return (
    <section className="py-20 md:py-28 overflow-hidden bg-[#090407]">
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951]">Cosmic Alignment</span>
            <div className="h-px w-8 bg-[#c8a951]/60" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={serif}>
            Interactive <em className="italic text-[#c8a951]">Zodiac & Astrology</em> Explorer
          </h2>
          <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
            Select any sign along the cosmic wheel to uncover its elemental frequency, ruling planet, shadow archetype, and prescribed healing crystals.
          </p>
        </div>

        {/* Live Interactive Wheel */}
        <InteractiveZodiacWheel />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CRYSTALS — full bleed, generated image
// ─────────────────────────────────────────────────────────────────────────────
function CrystalsSection() {
  const bgRef = useParallax(0.15);
  const sectionRef = useGSAPReveal({ staggerSelector: ".cr-reveal", staggerDelay: 0.12, start: "top 80%" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[580px] lg:min-h-[700px] flex items-stretch">
      <div className="absolute inset-0 scale-110">
        <img ref={bgRef as any} src="/crystal-collection.webp" alt="Healing Crystals"
          className="w-full h-full object-cover object-center" data-cursor="view" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,5,8,0.95) 0%, rgba(10,5,8,0.80) 48%, rgba(10,5,8,0.40) 100%)" }} />
      </div>

      <div className="relative z-10 flex items-center px-6 md:px-14 lg:px-20 py-16 md:py-24 max-w-[780px]">
        <div className="w-full">
          <div className="cr-reveal flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#c8a951]">Healing Crystals</span>
          </div>
          <h2 className="cr-reveal text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.04] mb-6" style={serif}>
            Discover Your<br /><em className="italic text-[#c8a951]">Healing Crystal</em>
          </h2>
          <p className="cr-reveal text-sm md:text-base text-white/60 leading-[1.85] mb-8 max-w-[480px] font-light">
            Every crystal at Selenite Soul is personally selected by Ekta, ethically sourced, lab-tested, and energised under the full moon.
          </p>

          {/* Animated stats */}
          <div className="cr-reveal flex gap-8 mb-10 pb-10 border-b border-white/10">
            {[["222+", "Unique Products"], ["100%", "Natural & Tested"], ["Full Moon", "Energised"]].map(([num, label]) => (
              <motion.div key={label} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <p className="text-2xl text-[#c8a951] font-light" style={serif}>{num}</p>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          <div className="cr-reveal flex flex-wrap gap-4">
            <MagLink href="/kundali">
              <motion.span
                className="inline-flex items-center gap-2.5 border border-[#c8a951]/70 text-[#c8a951] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em]"
                whileHover={{ backgroundColor: "rgba(200,169,81,0.12)", borderColor: "#c8a951" }}
                transition={{ duration: 0.18 }}
              >
                Know Your Crystal
              </motion.span>
            </MagLink>
            <MagLink href="/shop">
              <motion.span
                className="inline-flex items-center gap-2.5 bg-[#c8a951] text-[#0a0508] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] relative overflow-hidden shadow-xl"
                whileHover={{ boxShadow: "0 12px 40px rgba(200,169,81,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                Shop Crystals <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </MagLink>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. TAROT — with 3D Interactive Oracle Deck
// ─────────────────────────────────────────────────────────────────────────────
function TarotSection() {
  return (
    <section className="py-20 md:py-28 overflow-hidden bg-[#0e070c]">
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951]">Intuitive Oracle</span>
            <div className="h-px w-8 bg-[#c8a951]/60" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4" style={serif}>
            Interactive <em className="italic text-[#c8a951]">Tarot Reading</em> Suite
          </h2>
          <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
            Draw a daily oracle card or lay a sacred 3-card spread to receive intuitive clarity for love, career, and spiritual evolution.
          </p>
        </div>

        {/* Live 3D Tarot Deck Component */}
        <InteractiveTarotDeck />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHOP BY PRODUCT CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────
const shopByProductItems = products.slice(0, 14);

function ShopByProductCarousel() {
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const update = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", update); emblaApi.on("reInit", update); update();
    return () => { emblaApi.off("select", update); emblaApi.off("reInit", update); };
  }, [emblaApi, update]);

  const handleAdd = (e: React.MouseEvent, product: typeof shopByProductItems[0]) => {
    e.stopPropagation();
    addToCart(product);
    setAddedIds(ids => new Set(ids).add(product.id));
    setTimeout(() => setAddedIds(ids => { const s = new Set(ids); s.delete(product.id); return s; }), 1200);
  };

  return (
    <section className="py-14 md:py-20 overflow-hidden bg-[#fcf8f4]">
      <div className="px-5 md:px-14 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Shop By</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-[#2a1f1a]" style={serif}>Product</h2>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {[{ icon: ChevronLeft, fn: () => emblaApi?.scrollPrev(), disabled: !canPrev },
            { icon: ChevronRight, fn: () => emblaApi?.scrollNext(), disabled: !canNext }].map(({ icon: Icon, fn, disabled }, i) => (
            <motion.button key={i} onClick={fn} disabled={disabled}
              className="w-11 h-11 border border-[#e0cdb8] flex items-center justify-center text-[#4a3020] disabled:opacity-20"
              whileHover={{ borderColor: "#c8a951", backgroundColor: "rgba(200,169,81,0.06)" }}
              whileTap={{ scale: 0.93 }}
              data-cursor="hover"
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </motion.button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden border-t border-b border-[#e8d9cf]" ref={emblaRef} data-cursor="drag">
        <div className="flex">
          {shopByProductItems.map(product => (
            <motion.div
              key={product.id}
              className="flex-none w-[56vw] sm:w-[40vw] md:w-[280px] lg:w-[300px] border-r border-[#e8d9cf] bg-[#f9f4ef] group cursor-pointer relative overflow-hidden"
              onClick={() => navigate(`/product/${product.id}`)}
              whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(42,31,26,0.10)" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="hover"
            >
              {product.badge && (
                <div className={`absolute top-3 left-3 z-10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                  product.badge === "SALE" ? "bg-[#8b2020] text-white" :
                  product.badge === "BEST SELLER" ? "bg-[#c8a951] text-[#2a1f1a]" :
                  "bg-[#2a1f1a] text-white"
                }`}>
                  {product.badge}{product.savePercent ? ` −${product.savePercent}%` : ""}
                </div>
              )}
              <div className="relative aspect-square w-full p-6 md:p-8 bg-[#f9f4ef] overflow-hidden">
                <motion.img
                  src={product.image} alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Add to cart button */}
                <AnimatePresence>
                  <motion.button
                    className={`absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center text-white text-xs font-bold ${addedIds.has(product.id) ? "bg-[#1f8a6f]" : "bg-[#2a1f1a]"}`}
                    onClick={e => handleAdd(e, product)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.15 }}
                    data-cursor="hover"
                    aria-label="Add to cart"
                  >
                    <AnimatePresence mode="wait">
                      {addedIds.has(product.id)
                        ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>✓</motion.span>
                        : <motion.span key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Plus className="w-4 h-4 stroke-[1.5]" /></motion.span>
                      }
                    </AnimatePresence>
                  </motion.button>
                </AnimatePresence>
              </div>
              <div className="p-3.5 md:p-4 bg-white border-t border-[#e8d9cf]">
                <h3 className="text-[10px] font-normal uppercase tracking-widest text-[#2a1f1a] mb-1.5 truncate">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#2a1f1a]">₹{product.price}</p>
                  {product.originalPrice && <p className="text-[11px] text-[#2a1f1a]/35 line-through">₹{product.originalPrice}</p>}
                </div>
                {product.swatches && product.swatches.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {product.swatches.slice(0, 5).map((c, i) => (
                      <motion.div key={i} className="w-3 h-3 border border-[#e8d9cf] cursor-pointer"
                        style={{ backgroundColor: c }} whileHover={{ scale: 1.5 }} transition={{ duration: 0.15 }} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HOME
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopBar />
      <Header />
      <main>
        <HeroCarousel />
        <TrustStrip />
        <EktaStory />
        <BrandPhilosophy />
        <KundaliSection />
        <NumerologySection />
        <AstrologyZodiacSection />
        <CrystalsSection />
        <TarotSection />
        <ShopByConcernCarousel />
        <ShopByProductCarousel />
        <ShopByAstrologyCarousel />
        <TabbedProductCarousel />
      </main>
      <Footer />
    </div>
  );
}
