"use client";
import { useState, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import ShopByConcernCarousel from "@/components/ShopByConcernCarousel";
import ShopByAstrologyCarousel from "@/components/ShopByAstrologyCarousel";
import TabbedProductCarousel from "@/components/TabbedProductCarousel";
import { products, bestSellers, newArrivals } from "@/data/products";
import type { Product } from "@/data/products";

// ─── Shared serif style helper
const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE TRUST STRIP
// ─────────────────────────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    "100% Natural Crystals",
    "Full Moon Energised",
    "Lab Tested & Certified",
    "1.5L+ Customers Served",
    "Ethically Sourced",
    "Vedic Wisdom",
    "Handpicked by Ekta",
  ];
  return (
    <div className="bg-[#c8a951] overflow-hidden py-3">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2a1f1a]">
            {item}
            <span className="opacity-40 text-[8px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. EKTA'S STORY — editorial split
// ─────────────────────────────────────────────────────────────────────────────
function EktaStory() {
  return (
    <section className="bg-[#fdf8f4] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[600px] lg:min-h-[700px]">
        {/* Left: image with overlaid text card */}
        <div className="relative overflow-hidden min-h-[380px] lg:min-h-0">
          <motion.img
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1100&q=85&fit=crop&crop=top"
            alt="Ekta — Founder, Selenite Soul"
            className="w-full h-full object-cover object-top"
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Subtle side-fade to text panel */}
          <div className="absolute inset-0 hidden lg:block"
            style={{ background: "linear-gradient(to right, transparent 60%, #fdf8f4 100%)" }} />

          {/* Floating label — bottom left */}
          <motion.div
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-[#2a1f1a]/90 backdrop-blur-sm px-5 py-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#c8a951] mb-1">Founder · Selenite Soul</p>
            <p className="text-lg text-white leading-snug" style={serif}>Ekta</p>
            <p className="text-[10px] text-white/45 mt-0.5">
              Jyotish · Tarot · Numerology · Crystal Healing
            </p>
          </motion.div>
        </div>

        {/* Right: story */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-14 lg:py-20">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#c8a951]/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Ekta's Story</span>
            </div>

            <h2 className="text-3xl md:text-4xl xl:text-5xl font-light text-[#2a1f1a] leading-[1.1] mb-7" style={serif}>
              A Journey From<br />
              <em className="italic text-[#a5762a]">Seeking to Guiding</em>
            </h2>

            <div className="space-y-4 mb-8 max-w-lg">
              <p className="text-sm text-[#4a3020]/75 leading-[1.8]">
                In 2012, during a pilgrimage to Haridwar, a sage placed a raw amethyst in Ekta's hands and said: <span className="italic text-[#2a1f1a]">"The Earth already knows your answer."</span>
              </p>
              <p className="text-sm text-[#4a3020]/65 leading-[1.8]">
                That moment ignited a decade of immersion — Vedic Jyotish, Pythagorean Numerology, intuitive Tarot, and crystal healing. In 2019, Selenite Soul was born: a sacred mission to make ancient wisdom accessible to every modern soul seeking clarity.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mb-8 pb-8 border-b border-[#e8d9cf]">
              {[["10+", "Years of Study"], ["1.5L+", "Lives Guided"], ["3", "Sacred Disciplines"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl text-[#a5762a] font-light" style={serif}>{num}</p>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#4a3020]/50 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <Link href="/about">
              <motion.span
                className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#a5762a] cursor-pointer group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
              >
                Read Ekta's Full Story
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BRAND PHILOSOPHY — horizontal scroll, dark and luxe
// ─────────────────────────────────────────────────────────────────────────────
function BrandPhilosophy() {
  const pillars = [
    {
      num: "01",
      title: "Ancient Vedic Wisdom",
      body: "Jyotish, Tarot, and Numerology — three sacred systems that have guided humanity for millennia, now decoded for your modern path.",
    },
    {
      num: "02",
      title: "Earth's Crystal Energy",
      body: "Every stone is ethically sourced, lab-tested for authenticity, and ceremonially energised under the full moon before it reaches you.",
    },
    {
      num: "03",
      title: "Ekta's Intention",
      body: "Each reading, each recommendation carries the energy of over a decade of dedicated study and thousands of client sessions.",
    },
    {
      num: "04",
      title: "Holistic Healing",
      body: "We work across the physical, emotional, mental, and spiritual layers — because true healing is never one-dimensional.",
    },
  ];

  return (
    <section
      className="py-16 md:py-28 overflow-hidden"
      style={{ background: "#1e1410" }}
    >
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-20">
          <ScrollReveal direction="up">
            <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#c8a951] mb-4">Selenite Soul</p>
            <h2
              className="text-4xl md:text-5xl xl:text-6xl font-light text-white leading-[1.05]"
              style={serif}
            >
              Where Ancient Wisdom<br />
              <em className="italic text-[#c8a951]">Meets Modern Life</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1} className="max-w-sm">
            <p className="text-sm text-white/40 leading-[1.9]">
              We bridge the sacred knowledge of Vedic India with the rhythms of your everyday life — through crystals, astrology, Tarot, and numbers.
            </p>
          </ScrollReveal>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.num} delay={i * 0.09}>
              <motion.div
                className="bg-[#1e1410] px-7 py-10 h-full flex flex-col group"
                whileHover={{ backgroundColor: "#261a14" }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="text-[44px] md:text-[52px] font-light text-white/06 leading-none mb-8 select-none block"
                  style={serif}
                >
                  {p.num}
                </span>
                <div className="w-8 h-px bg-[#c8a951]/50 mb-6 group-hover:w-14 transition-all duration-400" />
                <h3 className="text-base md:text-lg font-light text-white leading-snug mb-4" style={serif}>
                  {p.title}
                </h3>
                <p className="text-sm text-white/38 leading-[1.85] mt-auto">{p.body}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pull quote */}
        <ScrollReveal className="mt-16 md:mt-20">
          <div className="border-l border-[#c8a951]/40 pl-8 max-w-3xl">
            <p
              className="text-lg md:text-xl text-white/65 leading-[1.8] mb-5"
              style={{ ...serif, fontStyle: "italic" }}
            >
              "I believe every person carries a cosmic blueprint — a unique energetic signature written in the stars, in numbers, and in the crystals that call to them. My work is to help you read that blueprint."
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c8a951]">
              — Ekta, Founder of Selenite Soul
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. KUNDALI — full-bleed editorial hero
// ─────────────────────────────────────────────────────────────────────────────
function KundaliSection() {
  return (
    <section className="relative overflow-hidden min-h-[580px] lg:min-h-[680px] flex items-stretch">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="/concern-protection.webp"
          alt="Vedic Kundali"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, rgba(20,10,5,0.92) 0%, rgba(20,10,5,0.75) 45%, rgba(20,10,5,0.30) 100%)"
        }} />
      </div>

      {/* Subtle mandala rings — purely decorative, right side */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block opacity-15">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="190" stroke="#c8a951" strokeWidth="0.6" strokeDasharray="3 9" className="kundali-spin-slow" />
          <circle cx="200" cy="200" r="150" stroke="#c8a951" strokeWidth="0.6" className="kundali-spin-slow-rev" />
          <circle cx="200" cy="200" r="110" stroke="#c8a951" strokeWidth="0.6" strokeDasharray="2 7" className="kundali-spin-med" />
          <circle cx="200" cy="200" r="70" stroke="#c8a951" strokeWidth="1" className="kundali-spin-med-rev" />
          <circle cx="200" cy="200" r="6" fill="#c8a951" />
          {/* 12 house lines */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line key={i}
                x1={200 + 75 * Math.cos(angle)} y1={200 + 75 * Math.sin(angle)}
                x2={200 + 185 * Math.cos(angle)} y2={200 + 185 * Math.sin(angle)}
                stroke="#c8a951" strokeWidth="0.5" opacity="0.5"
              />
            );
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center px-6 md:px-14 lg:px-20 py-16 md:py-24 max-w-[860px]">
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#c8a951]">Free Vedic Reading</span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.04] mb-6"
            style={serif}
          >
            Your Kundali
            <br />
            <em className="italic text-[#c8a951]">The Blueprint<br />of Your Soul</em>
          </h2>

          <p className="text-sm md:text-base text-white/55 leading-[1.85] mb-8 max-w-[500px]">
            In Vedic astrology, your birth chart is a precise cosmic map — revealing your dharma, karma, relationships, health, wealth, and spiritual path. Ekta's engine computes it free, instantly.
          </p>

          {/* Feature row */}
          <div className="flex flex-wrap gap-y-2 gap-x-6 mb-10 text-white/40 text-[10px] uppercase tracking-widest font-bold">
            {["Lahiri Ayanamsa", "9 Grahas", "27 Nakshatras", "Dasha Timeline", "Crystal Remedies"].map(f => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#c8a951]" />
                {f}
              </span>
            ))}
          </div>

          <Link href="/kundali">
            <motion.span
              className="inline-flex items-center gap-3 bg-[#c8a951] text-[#1a0e05] px-8 md:px-10 py-4 text-[10px] font-bold uppercase tracking-[0.24em] cursor-pointer"
              whileHover={{ boxShadow: "0 16px 48px rgba(200,169,81,0.45)", scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              Generate My Free Kundali
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. NUMEROLOGY — light, refined, editorial
// ─────────────────────────────────────────────────────────────────────────────
function NumerologySection() {
  return (
    <section className="overflow-hidden" style={{ background: "#fdf3ec" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
        {/* Text side */}
        <div className="flex flex-col justify-center px-6 md:px-14 lg:px-16 xl:px-20 py-14 lg:py-24 order-2 lg:order-1">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Free Calculator</span>
            </div>

            <h2
              className="text-3xl md:text-4xl xl:text-5xl font-light text-[#2a1f1a] leading-[1.08] mb-7"
              style={serif}
            >
              Numbers Are the<br />
              <em className="italic text-[#a5762a]">Language of the Universe</em>
            </h2>

            <p className="text-sm text-[#4a3020]/65 leading-[1.85] mb-10 max-w-md">
              Discover your Name Number, Life Path, and compatibility score. Pythagorean numerology decoded — free, instant, no signup.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { num: "01", title: "Name Number", desc: "Expression and destiny encoded in your birth name" },
                { num: "02", title: "Life Path",   desc: "Your soul's core purpose from your birthdate" },
                { num: "03", title: "Compatibility", desc: "The energetic resonance between two people" },
              ].map(feat => (
                <div key={feat.num} className="flex gap-5 items-start">
                  <span
                    className="shrink-0 text-4xl text-[#e0cdb8] leading-none select-none"
                    style={serif}
                  >
                    {feat.num}
                  </span>
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#2a1f1a] mb-1">{feat.title}</h4>
                    <p className="text-xs text-[#4a3020]/55">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/numerology">
              <motion.span
                className="inline-flex items-center gap-3 bg-[#2a1f1a] text-[#fdf8f4] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.24em] cursor-pointer"
                whileHover={{ backgroundColor: "#3d2d25" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                Calculate My Numbers
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>

        {/* Visual side — typographic number grid */}
        <div
          className="relative overflow-hidden min-h-[300px] order-1 lg:order-2 flex items-center justify-center p-10 lg:p-0"
          style={{ background: "#2a1f1a" }}
        >
          <ScrollReveal direction="left" className="w-full max-w-[440px] mx-auto px-4 lg:px-10 xl:px-14 py-12">
            {/* Pythagorean table — elegant serif numbers */}
            <div className="grid grid-cols-9 mb-8">
              {["A","B","C","D","E","F","G","H","I"].map(l => (
                <div key={l} className="aspect-square flex items-center justify-center border-b border-white/10">
                  <span className="text-[9px] font-bold text-white/25 uppercase tracking-wide">{l}</span>
                </div>
              ))}
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <div key={n} className="aspect-square flex items-center justify-center">
                  <span className="text-xl text-white/50" style={serif}>{n}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-white/10 mb-8" />
            {/* Master numbers */}
            <div className="flex gap-6 justify-center">
              {["11", "22", "33"].map(n => (
                <div key={n} className="text-center">
                  <p className="text-3xl font-light text-[#c8a951]" style={serif}>{n}</p>
                  <p className="text-[8px] text-white/30 uppercase tracking-wider mt-1">Master</p>
                </div>
              ))}
            </div>
            {/* Label */}
            <p className="text-center text-[8px] font-bold uppercase tracking-[0.25em] text-white/20 mt-8">
              Pythagorean Numerology Table
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. YOGA / ASTROLOGY — magazine editorial
// ─────────────────────────────────────────────────────────────────────────────
function YogaSection() {
  const yogas = [
    { num: "01", name: "Raj Yoga",       subtitle: "Power & Authority",       body: "When lords of trine and angular houses combine — a powerful yoga of leadership, recognition, and elevated status in society." },
    { num: "02", name: "Gaja Kesari",    subtitle: "Wisdom & Magnetism",      body: "Jupiter and Moon in angular relationship — creates tremendous wisdom, public presence, and a natural gravitational pull on others." },
    { num: "03", name: "Dhana Yoga",     subtitle: "Abundance & Wealth",      body: "Lords of the 2nd (wealth) and 11th (gains) houses unite — a reliable indicator of financial growth and material accumulation." },
    { num: "04", name: "Chandra Mangal", subtitle: "Drive & Passion",         body: "Moon and Mars in mutual angular relationship — emotional intensity, entrepreneurial courage, and fierce determination." },
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ background: "#fdf8f4" }}>
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 md:mb-20 items-end">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Vedic Jyotish</span>
            </div>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-light text-[#2a1f1a] leading-[1.04]" style={serif}>
              Sacred <em className="italic text-[#a5762a]">Yogas</em> &<br />Cosmic Patterns
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="lg:text-right">
            <p className="text-sm text-[#4a3020]/60 leading-[1.85] max-w-sm lg:ml-auto">
              Vedic astrology identifies powerful planetary combinations — called Yogas — that shape your energy, purpose, and life potential. Are any in your chart?
            </p>
            <Link href="/kundali">
              <motion.span
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a5762a] mt-6 cursor-pointer border-b border-[#c8a951]/40 pb-0.5"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
              >
                Check My Yogas <ArrowRight className="w-3 h-3" />
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>

        {/* Yoga cards — horizontal border grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[#e8d9cf] border border-[#e8d9cf]">
          {yogas.map((yoga, i) => (
            <ScrollReveal key={yoga.num} delay={i * 0.08}>
              <motion.div
                className="p-7 md:p-9 lg:p-8 xl:p-10 group h-full flex flex-col"
                whileHover={{ backgroundColor: "#2a1f1a" }}
                transition={{ duration: 0.25 }}
              >
                <span
                  className="block text-5xl text-[#e8d9cf] leading-none mb-8 group-hover:text-[#c8a951]/20 transition-colors duration-300"
                  style={serif}
                >
                  {yoga.num}
                </span>
                <h3
                  className="text-lg md:text-xl font-light text-[#2a1f1a] group-hover:text-white mb-1.5 transition-colors duration-300"
                  style={serif}
                >
                  {yoga.name}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a5762a] group-hover:text-[#c8a951]/70 mb-5 transition-colors duration-300">
                  {yoga.subtitle}
                </p>
                <p className="text-sm text-[#4a3020]/60 group-hover:text-white/45 leading-[1.8] mt-auto transition-colors duration-300">
                  {yoga.body}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CRYSTALS — full-bleed dark with two CTAs
// ─────────────────────────────────────────────────────────────────────────────
function CrystalsSection() {
  return (
    <section className="relative overflow-hidden min-h-[560px] lg:min-h-[680px] flex items-stretch">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/concern-money.webp"
          alt="Healing Crystals"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(18,10,5,0.93) 0%, rgba(18,10,5,0.80) 50%, rgba(18,10,5,0.40) 100%)"
        }} />
      </div>

      <div className="relative z-10 flex items-center px-6 md:px-14 lg:px-20 py-16 md:py-24 max-w-[780px]">
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#c8a951]">Healing Crystals</span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.04] mb-6"
            style={serif}
          >
            Discover Your<br />
            <em className="italic text-[#c8a951]">Healing Crystal</em>
          </h2>

          <p className="text-sm md:text-base text-white/55 leading-[1.85] mb-8 max-w-[480px]">
            Every crystal at Selenite Soul is personally selected by Ekta, ethically sourced, lab-tested, and energised under the full moon. From raw stones to sacred jewellery — there is a crystal aligned to your energy.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-10 pb-10 border-b border-white/10">
            {[["222+", "Unique Products"], ["100%", "Natural & Tested"], ["✦", "Full Moon Energised"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl text-[#c8a951] font-light" style={serif}>{num}</p>
                <p className="text-[9px] text-white/35 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Two CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/kundali">
              <motion.span
                className="inline-flex items-center gap-2.5 border border-[#c8a951]/70 text-[#c8a951] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] cursor-pointer"
                whileHover={{ backgroundColor: "rgba(200,169,81,0.12)" }}
                transition={{ duration: 0.18 }}
              >
                Know Your Crystal
              </motion.span>
            </Link>
            <Link href="/shop">
              <motion.span
                className="inline-flex items-center gap-2.5 bg-[#c8a951] text-[#1a0e05] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] cursor-pointer"
                whileHover={{ boxShadow: "0 12px 40px rgba(200,169,81,0.4)", scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                Shop Crystals <ArrowRight className="w-3.5 h-3.5" />
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. TAROT — dark editorial
// ─────────────────────────────────────────────────────────────────────────────
function TarotSection() {
  return (
    <section className="overflow-hidden" style={{ background: "#140810" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] min-h-[580px] lg:min-h-[680px]">
        {/* Image */}
        <div className="relative overflow-hidden min-h-[340px] lg:min-h-0">
          <motion.img
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=85&fit=crop&crop=top"
            alt="Ekta — Tarot Reader"
            className="w-full h-full object-cover object-top"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, rgba(20,8,16,0.3) 0%, rgba(20,8,16,0.95) 100%)"
          }} />
          {/* Vertical text label */}
          <div className="absolute bottom-8 left-6 lg:hidden">
            <div className="bg-[#140810]/90 px-4 py-3 border border-[#b07ec8]/20">
              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#b07ec8] mb-1">Sacred Guidance</p>
              <p className="text-sm text-white" style={serif}>Tarot with Ekta</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-14 xl:px-20 py-14 lg:py-24">
          <ScrollReveal direction="left">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#b07ec8]/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#b07ec8]">Sacred Guidance</span>
            </div>

            <h2
              className="text-3xl md:text-4xl xl:text-5xl font-light text-white leading-[1.08] mb-6"
              style={serif}
            >
              Tarot Reading<br />
              <em className="italic text-[#b07ec8]">with Ekta</em>
            </h2>

            <p className="text-sm text-white/50 leading-[1.85] mb-8 max-w-md">
              Not fortune-telling — a conversation with your inner wisdom. Ekta uses Tarot as a sacred mirror to illuminate your path and empower your choices in love, career, and life.
            </p>

            {/* Areas */}
            <div className="grid grid-cols-2 gap-3 mb-9">
              {["Love & Relationships", "Career & Purpose", "Spiritual Growth", "Life Transitions"].map(area => (
                <div key={area} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-[#b07ec8]/60 shrink-0" />
                  <span className="text-[10px] text-white/45 uppercase tracking-wider">{area}</span>
                </div>
              ))}
            </div>

            {/* Session detail */}
            <div className="flex gap-6 mb-9 pb-8 border-b border-white/8">
              {[["45–60 min", "Session Length"], ["Online & In-Person", "Format"], ["₹2,499", "Starting From"]].map(([val, label]) => (
                <div key={label}>
                  <p className="text-sm text-white font-light" style={serif}>{val}</p>
                  <p className="text-[8px] text-white/30 uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/tarot#book">
                <motion.span
                  className="inline-flex items-center gap-2.5 bg-[#b07ec8] text-white px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] cursor-pointer"
                  whileHover={{ boxShadow: "0 12px 40px rgba(176,126,200,0.4)", scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                >
                  Book a Reading <ArrowRight className="w-3.5 h-3.5" />
                </motion.span>
              </Link>
              <Link href="/tarot">
                <motion.span
                  className="inline-flex items-center gap-2.5 border border-[#b07ec8]/40 text-[#b07ec8] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] cursor-pointer"
                  whileHover={{ borderColor: "#b07ec8", backgroundColor: "rgba(176,126,200,0.08)" }}
                  transition={{ duration: 0.18 }}
                >
                  Learn More
                </motion.span>
              </Link>
            </div>
          </ScrollReveal>
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

  const update = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();
    return () => { emblaApi.off("select", update); emblaApi.off("reInit", update); };
  }, [emblaApi, update]);

  return (
    <section className="py-14 md:py-20 bg-[#fdf8f4] overflow-hidden">
      <div className="px-5 md:px-14 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Shop By</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-[#2a1f1a]" style={serif}>Product</h2>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev}
            className="w-11 h-11 border border-[#e0cdb8] flex items-center justify-center text-[#4a3020] disabled:opacity-20 hover:border-[#c8a951] transition-colors">
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext}
            className="w-11 h-11 border border-[#e0cdb8] flex items-center justify-center text-[#4a3020] disabled:opacity-20 hover:border-[#c8a951] transition-colors">
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden border-t border-b border-[#e8d9cf]" ref={emblaRef}>
        <div className="flex">
          {shopByProductItems.map(product => (
            <div
              key={product.id}
              className="flex-none w-[56vw] sm:w-[40vw] md:w-[280px] lg:w-[300px] border-r border-[#e8d9cf] bg-[#f9f4ef] group cursor-pointer relative"
              onClick={() => navigate(`/product/${product.id}`)}
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
              <div className="relative aspect-square w-full p-6 md:p-8 bg-[#f9f4ef]">
                <img src={product.image} alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-600" />
                <button
                  className="absolute bottom-3 right-3 w-9 h-9 bg-white border border-[#e8d9cf] flex items-center justify-center hover:bg-[#2a1f1a] hover:text-white hover:border-[#2a1f1a] transition-colors opacity-0 group-hover:opacity-100"
                  onClick={e => { e.stopPropagation(); addToCart(product); }}
                  aria-label="Quick add"
                >
                  <Plus className="w-4 h-4 stroke-[1.5]" />
                </button>
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
                      <div key={i} className="w-3 h-3 border border-[#e8d9cf]" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
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
        {/* 1 — Hero Carousel */}
        <HeroCarousel />

        {/* Gold marquee trust strip */}
        <TrustStrip />

        {/* 2 — Ekta's Story */}
        <EktaStory />

        {/* 3 — Brand Philosophy */}
        <BrandPhilosophy />

        {/* 4 — Kundali */}
        <KundaliSection />

        {/* 5 — Numerology */}
        <NumerologySection />

        {/* 6 — Yoga / Astrology */}
        <YogaSection />

        {/* 7 — Crystals (with 2 CTAs) */}
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
