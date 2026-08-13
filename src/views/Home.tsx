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
import { products } from "@/data/products";
import { useGSAPReveal, useParallax, useSplitReveal, useCounter } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap-init";

// ─── Shared serif style
const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

// ─── Hover tilt hook for cards
function useTilt(intensity = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * intensity;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * -intensity;
    ref.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };
  return { ref, handleMouseMove, handleMouseLeave };
}

// ─── Magnetic link wrapper (Fixes nested <a> hydration error by using useLocation navigate)
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
  const items = ["100% Natural", "Full Moon Energised", "Lab Tested", "1.5L+ Customers", "Ethically Sourced", "Vedic Wisdom", "Handpicked by Ekta"];
  return (
    <div className="bg-[#c8a951] overflow-hidden py-3 select-none">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1a0e05] whitespace-nowrap">
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
    <section ref={sectionRef} className="bg-[#fdf8f4] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[600px] lg:min-h-[720px]">
        {/* Image */}
        <div className="relative overflow-hidden min-h-[380px] lg:min-h-0" data-cursor="view">
          <motion.img
            ref={imgRef as any}
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1100&q=85&fm=webp&fit=crop&crop=top"
            alt="Ekta — Founder, Selenite Soul"
            className="w-full h-full object-cover object-top scale-110"
          />
          <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, transparent 60%, #fdf8f4 100%)" }} />

          {/* Animated credential badge */}
          <motion.div
            className="ekta-reveal absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-[#2a1f1a]/90 backdrop-blur-sm px-5 py-4 border-l-2 border-[#c8a951]"
            whileHover={{ x: 4, borderLeftWidth: "4px" }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#c8a951] mb-1">Founder · Selenite Soul</p>
            <p className="text-lg text-white leading-snug" style={serif}>Ekta</p>
            <p className="text-[10px] text-white/45 mt-0.5">Jyotish · Tarot · Numerology · Crystal Healing</p>
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-14 lg:py-20">
          <div className="ekta-reveal flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c8a951]/50" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Ekta's Story</span>
          </div>

          <h2 className="ekta-reveal text-3xl md:text-4xl xl:text-5xl font-light text-[#2a1f1a] leading-[1.1] mb-7" style={serif}>
            A Journey From<br />
            <em className="italic text-[#a5762a]">Seeking to Guiding</em>
          </h2>

          <div className="ekta-reveal space-y-4 mb-8 max-w-lg">
            <p className="text-sm text-[#4a3020]/75 leading-[1.85]">
              In 2012, during a pilgrimage to Haridwar, a sage placed a raw amethyst in Ekta's hands and said: <span className="italic text-[#2a1f1a]">"The Earth already knows your answer."</span>
            </p>
            <p className="text-sm text-[#4a3020]/65 leading-[1.85]">
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
// 3. BRAND PHILOSOPHY
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
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-[#1a100b]">
      {/* Background artwork */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <img src="/brand-philosophy-bg.webp" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a100b] via-transparent to-[#1a100b]" />
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
            className="text-sm md:text-base text-white/80 leading-relaxed max-w-md font-light"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          >
            We bridge the sacred knowledge of Vedic India with the rhythms of your everyday life — through crystals, astrology, Tarot, and numbers.
          </motion.p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const { ref, handleMouseMove, handleMouseLeave } = useTilt(5);
            return (
              <div
                key={p.num}
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="pillar-card bg-[#241710]/80 border border-[#c8a951]/25 p-8 flex flex-col group cursor-default backdrop-blur-md hover:border-[#c8a951]/70 hover:bg-[#2e1d15] transition-all duration-300 rounded-sm shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-light text-[#c8a951]" style={serif}>{p.num}</span>
                  <span className="text-[#c8a951]/50 text-xs font-mono">•</span>
                </div>
                <h3 className="text-lg md:text-xl font-light text-white leading-snug mb-3" style={serif}>{p.title}</h3>
                <p className="text-xs md:text-sm text-white/75 leading-relaxed mt-auto font-light">{p.body}</p>
              </div>
            );
          })}
        </div>

        {/* Pull quote */}
        <motion.div
          className="mt-16 md:mt-24 border-l-2 border-[#c8a951] pl-8 max-w-3xl bg-[#241710]/40 p-6 backdrop-blur-sm"
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
// 4. KUNDALI — full bleed with parallax
// ─────────────────────────────────────────────────────────────────────────────
function KundaliSection() {
  const bgRef = useParallax(0.18);
  const sectionRef = useGSAPReveal({ staggerSelector: ".k-reveal", staggerDelay: 0.12, start: "top 80%" });
  const headRef = useSplitReveal();

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[580px] lg:min-h-[700px] flex items-stretch">
      <div className="absolute inset-0 scale-110">
        <img ref={bgRef as any} src="/yoga-astrology.webp" alt="Kundali background"
          className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(18,8,2,0.95) 0%, rgba(18,8,2,0.78) 45%, rgba(18,8,2,0.35) 100%)" }} />
      </div>

      {/* Mandala SVG rings */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block opacity-20">
        <svg width="420" height="420" viewBox="0 0 420 420" fill="none">
          <circle cx="210" cy="210" r="200" stroke="#c8a951" strokeWidth="0.6" strokeDasharray="3 9" className="kundali-spin-slow" />
          <circle cx="210" cy="210" r="160" stroke="#c8a951" strokeWidth="0.6" className="kundali-spin-slow-rev" />
          <circle cx="210" cy="210" r="120" stroke="#c8a951" strokeWidth="0.6" strokeDasharray="2 7" className="kundali-spin-med" />
          <circle cx="210" cy="210" r="80" stroke="#c8a951" strokeWidth="1" className="kundali-spin-med-rev" />
          <circle cx="210" cy="210" r="6" fill="#c8a951" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return <line key={i} x1={210 + 85 * Math.cos(a)} y1={210 + 85 * Math.sin(a)} x2={210 + 195 * Math.cos(a)} y2={210 + 195 * Math.sin(a)} stroke="#c8a951" strokeWidth="0.5" opacity="0.4" />;
          })}
        </svg>
      </div>

      <div className="relative z-10 flex items-center px-6 md:px-14 lg:px-20 py-16 md:py-24 max-w-[860px]">
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
          <p className="k-reveal text-sm md:text-base text-white/50 leading-[1.85] mb-8 max-w-[500px]">
            Your birth chart is a precise cosmic map — revealing dharma, karma, relationships, health, wealth, and spiritual path. Computed free, instantly.
          </p>
          <div className="k-reveal flex flex-wrap gap-y-2 gap-x-6 mb-10 text-white/35 text-[10px] uppercase tracking-widest font-bold">
            {["Lahiri Ayanamsa", "9 Grahas", "27 Nakshatras", "Dasha Timeline", "Crystal Remedies"].map(f => (
              <span key={f} className="flex items-center gap-1.5">
                <motion.span className="w-1 h-1 rounded-full bg-[#c8a951]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
                {f}
              </span>
            ))}
          </div>
          <MagLink href="/kundali" className="k-reveal">
            <motion.span
              className="inline-flex items-center gap-3 bg-[#c8a951] text-[#1a0e05] px-8 md:px-10 py-4 text-[10px] font-bold uppercase tracking-[0.24em] relative overflow-hidden"
              whileHover={{ boxShadow: "0 16px 48px rgba(200,169,81,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shine effect */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%", skewX: "-20deg" }}
                whileHover={{ x: "150%", transition: { duration: 0.5 } }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", width: "60%" }}
              />
              Generate My Free Kundali <ArrowRight className="w-4 h-4" />
            </motion.span>
          </MagLink>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. NUMEROLOGY
// ─────────────────────────────────────────────────────────────────────────────
function NumerologySection() {
  const sectionRef = useGSAPReveal({ staggerSelector: ".num-reveal", staggerDelay: 0.1, start: "top 80%" });

  return (
    <section ref={sectionRef} className="overflow-hidden" style={{ background: "#fdf3ec" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">
        {/* Text */}
        <div className="flex flex-col justify-center px-6 md:px-14 lg:px-16 xl:px-20 py-14 lg:py-24 order-2 lg:order-1">
          <div className="num-reveal flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Free Calculator</span>
          </div>
          <h2 className="num-reveal text-3xl md:text-4xl xl:text-5xl font-light text-[#2a1f1a] leading-[1.08] mb-7" style={serif}>
            Numbers Are the<br /><em className="italic text-[#a5762a]">Language of the Universe</em>
          </h2>
          <p className="num-reveal text-sm text-[#4a3020]/65 leading-[1.85] mb-10 max-w-md">
            Discover your Name Number, Life Path, and compatibility — Pythagorean numerology decoded free, no signup.
          </p>
          <div className="num-reveal space-y-5 mb-10">
            {[
              { num: "01", title: "Name Number", desc: "Expression and destiny encoded in your birth name" },
              { num: "02", title: "Life Path", desc: "Your soul's core purpose from your birthdate" },
              { num: "03", title: "Compatibility", desc: "The energetic resonance between two people" },
            ].map((feat) => (
              <motion.div key={feat.num} className="flex gap-5 items-start group cursor-default"
                whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                <span className="shrink-0 text-4xl text-[#e0cdb8] leading-none select-none group-hover:text-[#c8a951]/50 transition-colors" style={serif}>{feat.num}</span>
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#2a1f1a] mb-1">{feat.title}</h4>
                  <p className="text-xs text-[#4a3020]/55">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <MagLink href="/numerology" className="num-reveal">
            <motion.span
              className="inline-flex items-center gap-3 bg-[#2a1f1a] text-[#fdf8f4] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.24em] relative overflow-hidden"
              whileHover={{ backgroundColor: "#3d2d25" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span className="absolute inset-0 pointer-events-none" initial={{ x: "-100%", skewX: "-20deg" }}
                whileHover={{ x: "150%", transition: { duration: 0.5 } }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", width: "60%" }} />
              Calculate My Numbers <ArrowRight className="w-4 h-4" />
            </motion.span>
          </MagLink>
        </div>

        {/* Visual — Pythagorean table with artwork backdrop */}
        <div className="relative overflow-hidden min-h-[420px] lg:min-h-full order-1 lg:order-2 flex items-center justify-center p-6 lg:p-12 bg-[#1c120c]">
          {/* Background image */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <img src="/numerology-art.webp" alt="Numerology Celestial" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c120c] via-transparent to-[#1c120c]" />
          </div>

          <motion.div
            className="relative z-10 w-full max-w-[440px] bg-[#2a1b12]/85 border border-[#c8a951]/40 p-8 backdrop-blur-md shadow-2xl rounded-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6 border-b border-[#c8a951]/30 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951]">Pythagorean System</span>
              <span className="text-[#c8a951]/70 text-xs font-mono">•</span>
            </div>

            <div className="grid grid-cols-9 mb-6 bg-[#160c07]/60 border border-[#c8a951]/20 p-2 rounded-sm">
              {["A","B","C","D","E","F","G","H","I"].map(l => (
                <motion.div key={l} className="aspect-square flex items-center justify-center border-b border-[#c8a951]/20"
                  whileHover={{ backgroundColor: "rgba(200,169,81,0.15)" }} transition={{ duration: 0.15 }}>
                  <span className="text-[9px] font-bold text-[#c8a951]/70 uppercase">{l}</span>
                </motion.div>
              ))}
              {[1,2,3,4,5,6,7,8,9].map((n, i) => (
                <motion.div key={n} className="aspect-square flex items-center justify-center cursor-default"
                  initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.3 }}
                  whileHover={{ scale: 1.3, color: "#c8a951" }}>
                  <span className="text-xl text-white font-medium" style={serif}>{n}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-8 justify-center pt-2">
              {["11","22","33"].map((n, i) => (
                <motion.div key={n} className="text-center cursor-default bg-[#160c07]/70 border border-[#c8a951]/30 px-5 py-3 rounded-sm flex-1"
                  animate={{ y: [0, -4, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(200,169,81,0.8)" }}>
                  <p className="text-2xl font-light text-[#c8a951]" style={serif}>{n}</p>
                  <p className="text-[8px] text-white/60 uppercase tracking-widest mt-0.5">Master</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. YOGA / ASTROLOGY — with generated image background
// ─────────────────────────────────────────────────────────────────────────────
const yogas = [
  { num: "01", name: "Raj Yoga", subtitle: "Power & Authority", body: "When lords of trine and angular houses combine — a yoga of leadership, recognition, and elevated status." },
  { num: "02", name: "Gaja Kesari", subtitle: "Wisdom & Magnetism", body: "Jupiter and Moon in angular relationship — creates wisdom, public presence, and gravitational pull on others." },
  { num: "03", name: "Dhana Yoga", subtitle: "Abundance & Wealth", body: "Lords of 2nd and 11th houses unite — a reliable indicator of financial growth and material accumulation." },
  { num: "04", name: "Chandra Mangal", subtitle: "Drive & Passion", body: "Moon and Mars in mutual angular relationship — emotional intensity, entrepreneurial courage, fierce determination." },
];

function YogaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".yoga-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" } }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden" style={{ background: "#fdf8f4" }}>
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 md:mb-20 items-end">
          <div>
            <motion.div className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Vedic Jyotish</span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl xl:text-6xl font-light text-[#2a1f1a] leading-[1.04]" style={serif}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
            >
              Sacred <em className="italic text-[#a5762a]">Yogas</em> &<br />Cosmic Patterns
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:text-right"
          >
            <p className="text-sm text-[#4a3020]/60 leading-[1.85] max-w-sm lg:ml-auto mb-5">
              Vedic astrology identifies powerful planetary combinations that shape your energy, purpose, and life potential.
            </p>
            <MagLink href="/kundali">
              <motion.span
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a5762a] border-b border-[#c8a951]/40 pb-0.5"
                whileHover={{ x: 4 }} transition={{ duration: 0.18 }}
              >
                Check My Yogas <ArrowRight className="w-3 h-3" />
              </motion.span>
            </MagLink>
          </motion.div>
        </div>

        {/* Generated image panel */}
        <motion.div
          className="w-full h-40 md:h-56 overflow-hidden mb-10 relative"
          initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          data-cursor="view"
        >
          <img src="/yoga-astrology.webp" alt="Vedic Yoga Celestial" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fdf8f4 0%, transparent 15%, transparent 85%, #fdf8f4 100%)" }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[#e8d9cf] border border-[#e8d9cf]">
          {yogas.map((yoga) => {
            const { ref, handleMouseMove, handleMouseLeave } = useTilt(5);
            return (
              <div
                key={yoga.num} ref={ref}
                onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
                className="yoga-card p-7 md:p-9 lg:p-8 xl:p-10 group cursor-default bg-white hover:bg-[#2a1f1a] transition-colors duration-300"
                style={{ transition: "background 0.3s, transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <span className="block text-5xl text-[#e8d9cf] group-hover:text-[#c8a951]/20 leading-none mb-8 transition-colors duration-300" style={serif}>{yoga.num}</span>
                <h3 className="text-lg md:text-xl font-light text-[#2a1f1a] group-hover:text-white mb-1.5 transition-colors duration-300" style={serif}>{yoga.name}</h3>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a5762a] group-hover:text-[#c8a951]/70 mb-5 transition-colors duration-300">{yoga.subtitle}</p>
                <p className="text-sm text-[#4a3020]/60 group-hover:text-white/45 leading-[1.8] mt-auto transition-colors duration-300">{yoga.body}</p>
              </div>
            );
          })}
        </div>
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
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(18,10,5,0.95) 0%, rgba(18,10,5,0.80) 48%, rgba(18,10,5,0.40) 100%)" }} />
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
          <p className="cr-reveal text-sm md:text-base text-white/50 leading-[1.85] mb-8 max-w-[480px]">
            Every crystal at Selenite Soul is personally selected by Ekta, ethically sourced, lab-tested, and energised under the full moon.
          </p>

          {/* Animated stats */}
          <div className="cr-reveal flex gap-8 mb-10 pb-10 border-b border-white/10">
            {[["222+", "Unique Products"], ["100%", "Natural & Tested"], ["Full Moon", "Energised"]].map(([num, label]) => (
              <motion.div key={label} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <p className="text-2xl text-[#c8a951] font-light" style={serif}>{num}</p>
                <p className="text-[9px] text-white/35 uppercase tracking-widest mt-0.5">{label}</p>
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
                className="inline-flex items-center gap-2.5 bg-[#c8a951] text-[#1a0e05] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] relative overflow-hidden"
                whileHover={{ boxShadow: "0 12px 40px rgba(200,169,81,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                <motion.span className="absolute inset-0 pointer-events-none" initial={{ x: "-100%", skewX: "-20deg" }}
                  whileHover={{ x: "150%", transition: { duration: 0.5 } }}
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", width: "60%" }} />
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
// 8. TAROT — generated image
// ─────────────────────────────────────────────────────────────────────────────
function TarotSection() {
  const sectionRef = useGSAPReveal({ staggerSelector: ".tar-reveal", staggerDelay: 0.1, start: "top 80%" });

  return (
    <section ref={sectionRef} className="overflow-hidden" style={{ background: "#140810" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] min-h-[600px] lg:min-h-[700px]">
        {/* Generated tarot image */}
        <div className="relative overflow-hidden min-h-[340px] lg:min-h-0" data-cursor="view">
          <motion.img
            src="/ekta-tarot.webp"
            alt="Ekta — Tarot Reader"
            className="w-full h-full object-cover object-top"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,8,16,0.2) 0%, rgba(20,8,16,0.94) 100%)" }} />

          {/* Floating tarot card shapes */}
          {["♥","◈","☽","♦"].map((sym, i) => (
            <motion.div key={i}
              className="absolute pointer-events-none select-none"
              style={{ top: `${15 + i * 18}%`, left: `${10 + i * 5}%` }}
              animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0], opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            >
              <div className="w-10 h-14 border border-[#b07ec8]/20 flex items-center justify-center"
                style={{ background: "rgba(176,126,200,0.06)" }}>
                <span className="text-base text-[#b07ec8]">{sym}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-14 xl:px-20 py-14 lg:py-24">
          <div className="tar-reveal flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#b07ec8]/50" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#b07ec8]">Sacred Guidance</span>
          </div>
          <h2 className="tar-reveal text-3xl md:text-4xl xl:text-5xl font-light text-white leading-[1.08] mb-6" style={serif}>
            Tarot Reading<br /><em className="italic text-[#b07ec8]">with Ekta</em>
          </h2>
          <p className="tar-reveal text-sm text-white/50 leading-[1.85] mb-8 max-w-md">
            Not fortune-telling — a conversation with your inner wisdom. Ekta uses Tarot as a sacred mirror to illuminate your path.
          </p>
          <div className="tar-reveal grid grid-cols-2 gap-3 mb-8">
            {["Love & Relationships","Career & Purpose","Spiritual Growth","Life Transitions"].map(area => (
              <motion.div key={area} className="flex items-center gap-2.5" whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
                <span className="w-1 h-1 rounded-full bg-[#b07ec8]/60 shrink-0" />
                <span className="text-[10px] text-white/45 uppercase tracking-wider">{area}</span>
              </motion.div>
            ))}
          </div>
          <div className="tar-reveal flex gap-5 mb-8 pb-8 border-b border-white/8">
            {[["45–60 min","Session"], ["Online & In-Person","Format"], ["₹2,499+","Starting"]].map(([val,label]) => (
              <div key={label}>
                <p className="text-sm text-white font-light" style={serif}>{val}</p>
                <p className="text-[8px] text-white/30 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <div className="tar-reveal flex flex-wrap gap-3">
            <MagLink href="/tarot#book">
              <motion.span
                className="inline-flex items-center gap-2.5 bg-[#b07ec8] text-white px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] relative overflow-hidden"
                whileHover={{ boxShadow: "0 12px 40px rgba(176,126,200,0.45)" }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span className="absolute inset-0 pointer-events-none" initial={{ x: "-100%", skewX: "-20deg" }}
                  whileHover={{ x: "150%", transition: { duration: 0.5 } }}
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", width: "60%" }} />
                Book a Reading <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </MagLink>
            <MagLink href="/tarot">
              <motion.span
                className="inline-flex items-center gap-2.5 border border-[#b07ec8]/40 text-[#b07ec8] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em]"
                whileHover={{ borderColor: "#b07ec8", backgroundColor: "rgba(176,126,200,0.08)" }}
                transition={{ duration: 0.18 }}
              >
                Learn More
              </motion.span>
            </MagLink>
          </div>
        </div>
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
    <section className="py-14 md:py-20 overflow-hidden" style={{ background: "#fdf8f4" }}>
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
        <YogaSection />
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
