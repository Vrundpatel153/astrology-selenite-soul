"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, ArrowRight, Check } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useCart } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import ShopByConcernCarousel from "@/components/ShopByConcernCarousel";
import ShopByAstrologyCarousel from "@/components/ShopByAstrologyCarousel";
import TabbedProductCarousel from "@/components/TabbedProductCarousel";
import InteractiveTarotDeck from "@/components/InteractiveTarotDeck";
import TarotSimplerSection from "@/components/TarotSimplerSection";
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
  const items = ["100% Natural Crystals", "Full Moon Energised", "Lab Tested & Certified", "1.5L+ Lives Guided", "Ethically Sourced", "Vedic Wisdom", "Handpicked by Ektaz"];
  return (
    <div className="bg-[#c8a951] overflow-hidden py-3.5 select-none shadow-md">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1a0e05] whitespace-nowrap">
            {item}<span className="opacity-40 font-mono">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. EKTAZ SHAH'S STORY
// ─────────────────────────────────────────────────────────────────────────────
function EktaStory() {
  const sectionRef = useGSAPReveal({ staggerSelector: ".ekta-reveal", staggerDelay: 0.13, from: { opacity: 0, y: 60 }, start: "top 80%" });
  const imgRef = useParallax(0.12);

  const stats = [
    { target: 10, suffix: "+", label: "Years Guided" },
    { target: 150000, suffix: "+", label: "Lives Touched" },
    { target: 4, suffix: "", label: "Healing Arts" },
  ];
  const c1 = useCounter(stats[0].target, stats[0].suffix);
  const c2 = useCounter(stats[1].target, stats[1].suffix);
  const c3 = useCounter(stats[2].target, stats[2].suffix);
  const counters = [c1, c2, c3];

  return (
    <section ref={sectionRef} className="bg-[#fcf8f4] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[53%_47%] min-h-[460px] lg:min-h-[540px]">
        {/* Responsive Image Column */}
        <div className="relative overflow-hidden h-[440px] sm:h-[500px] md:h-[560px] lg:h-auto lg:min-h-0" data-cursor="hover">
          <motion.img
            ref={imgRef as any}
            src="/ekta-founder.webp"
            alt="Ektaz Shah, Founder of Selenite Soul"
            className="w-full h-full object-cover object-[center_8%] sm:object-[center_12%] lg:object-[center_18%] scale-105"
            loading="eager"
          />
          {/* Ethereal blend gradient: right fade on desktop, bottom fade on mobile */}
          <div
            className="absolute inset-0 hidden lg:block pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent 65%, #fcf8f4 100%)" }}
          />
          <div
            className="absolute inset-0 lg:hidden pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 60%, #fcf8f4 98%)" }}
          />

          {/* Animated credential badge */}
          <motion.div
            className="ekta-reveal absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-5 sm:py-4 border-l-2 border-[#c8a951] shadow-xl max-w-[calc(100%-2rem)]"
            whileHover={{ x: 4, borderLeftWidth: "4px" }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.28em] text-[#a5762a] mb-0.5 sm:mb-1">Founder · Selenite Soul</p>
            <p className="text-sm sm:text-lg text-[#2a1f1a] leading-snug" style={serif}>Ektaz Shah</p>
            <p className="text-[8.5px] sm:text-[10px] text-[#4a3020]/60 mt-0.5">Tarot · Reiki · Pranic Healing · Crystals</p>
          </motion.div>
        </div>

        {/* Story Text Column */}
        <div className="flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-14 xl:px-20 py-8 sm:py-10 lg:py-12">
          <div className="ekta-reveal flex items-center gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-10 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Meet Ektaz Shah</span>
          </div>

          <h2 className="ekta-reveal text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-light text-[#2a1f1a] leading-[1.15] mb-5 sm:mb-6" style={serif}>
            Some journeys begin<br />
            <em className="italic text-[#a5762a]">long before we realise we're on them</em>
          </h2>

          <div className="ekta-reveal space-y-3 mb-5 max-w-lg">
            <p className="text-xs sm:text-sm text-[#4a3020]/80 leading-[1.8] font-light">
              Growing up, astrology and spirituality were simply a part of my life. My father would take us to meet astrologers across Kerala, and our home was filled with little rituals, remedies and practices believed to invite good luck, open doors and bring positive energy into our lives. Of all of us, I was always the ardent follower.
            </p>
            <p className="text-xs sm:text-sm text-[#4a3020]/80 leading-[1.8] font-light">
              While building my career in the corporate world, I began learning Tarot on the side. Curiosity slowly became a calling: I trained in Reiki and Pranic Healing under wonderful gurus, and immersed myself in the fascinating world of crystals.
            </p>

            {/* The Faith Highlight Box */}
            <div className="p-4 bg-white/90 border border-[#c8a951]/40 border-l-2 border-l-[#c8a951] rounded-sm shadow-sm backdrop-blur-sm">
              <p className="text-xs text-[#2a1f1a] font-light leading-relaxed italic" style={serif}>
                "I ask for just one thing from you: Faith. Faith in the process. Faith in your intention. And most importantly, faith in yourself."
              </p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mt-2">
                Ektaz Shah · Founder
              </p>
            </div>
          </div>

          {/* Animated counters */}
          <div className="ekta-reveal flex flex-wrap sm:flex-nowrap gap-5 sm:gap-8 mb-6 pb-6 border-b border-[#e8d9cf]">
            {stats.map((stat, i) => (
              <div key={stat.label} className="min-w-[90px]">
                <p ref={counters[i]} className="text-xl sm:text-2xl text-[#a5762a] font-light" style={serif}>
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
              Read Ektaz's Full Story
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
// ─────────────────────────────────────────────────────────────────────────────
// 3. SACRED OFFERINGS & PHILOSOPHY: Guidance, Healing & Higher Living
// ─────────────────────────────────────────────────────────────────────────────
const sacredOfferings = [
  {
    num: "01",
    numColor: "#a8785a",
    title: "Tarot Guidance",
    body: "Insights for love, career, relationships and life's big (and small) questions - to help you make more aligned choices.",
    image: "/offerings-tarot.jpg",
    href: "/tarot",
    actionLabel: "Explore Tarot Guidance",
  },
  {
    num: "02",
    numColor: "#b86850",
    title: "Crystal Healing",
    body: "Authentic, high-quality crystals chosen with intention to support protection, clarity, love, abundance and emotional balance.",
    image: "/offerings-crystals.jpg",
    href: "/shop",
    actionLabel: "Explore Crystal Healing",
  },
  {
    num: "03",
    numColor: "#8a805c",
    title: "Numerology Insights",
    body: "Decode your numbers to understand your strengths, life path and opportunities - and live in greater alignment with your true self.",
    image: "/offerings-numerology.jpg",
    href: "/numerology",
    actionLabel: "Explore Numerology",
  },
  {
    num: "04",
    numColor: "#a8645a",
    title: "Reiki & Pranic Healing",
    body: "Gentle yet powerful energy healing to restore balance across your mind, body and spirit, helping you release blocks and invite positive energy.",
    image: "/offerings-reiki.jpg",
    href: "/tarot",
    actionLabel: "Explore Energy Healing",
  },
];

function BrandPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".offering-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
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
    <section ref={sectionRef} className="relative py-12 md:py-16 overflow-hidden bg-[#faf6f0]">
      {/* High-Resolution Luxury Sacred Geometry Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/brand-philosophy-luxury.webp"
          alt="Sacred Geometry Sri Yantra"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf6f0] via-transparent to-[#faf6f0]" />
        <div className="absolute inset-0 bg-[#faf6f0]/50" />
      </div>

      <div className="relative z-10 px-5 md:px-14 max-w-[1420px] mx-auto">
        {/* Header matching exact user reference image */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.45em] text-[#7a5c43] uppercase mb-2">
            S E L E N I T E &nbsp; S O U L
          </p>

          <div className="flex items-center justify-center gap-3 my-2.5 text-[#c8a951]">
            <div className="h-px w-14 sm:w-20 bg-[#c8a951]/60" />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
            <div className="h-px w-14 sm:w-20 bg-[#c8a951]/60" />
          </div>

          <p className="text-[8.5px] sm:text-[10px] font-bold tracking-[0.32em] text-[#a5762a] uppercase mt-2.5 mb-3">
            GUIDANCE &nbsp;+&nbsp; HEALING &nbsp;+&nbsp; HIGHER LIVING
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2a1f1a] leading-tight" style={serif}>
            Ancient Wisdom for <em className="italic text-[#a5762a]">Modern Life</em>
          </h2>
        </div>

        {/* 4 Interactive Offering Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {sacredOfferings.map((offering) => {
            const { ref, handleMouseMove, handleMouseLeave } = useTilt(4);
            return (
              <Link key={offering.num} href={offering.href} className="block group h-full">
                <div
                  ref={ref}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="offering-card h-full bg-[#fdfbf7] border border-[#e8d9cf] p-6 sm:p-7 rounded-sm shadow-sm hover:shadow-xl hover:border-[#c8a951] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group-hover:-translate-y-1.5"
                  data-cursor="hover"
                >
                  {/* Top: Number & Floating Botanical Artwork */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-3xl sm:text-4xl font-light" style={{ ...serif, color: offering.numColor }}>
                        {offering.num}
                      </span>
                      <div className="w-20 h-20 sm:w-24 sm:h-24 -mt-2 -mr-2 shrink-0 overflow-hidden">
                        <img
                          src={offering.image}
                          alt={offering.title}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Small Divider Line */}
                    <div className="w-7 h-0.5 bg-[#d9bfa8] mb-3.5" />

                    {/* Title */}
                    <h3
                      className="text-xl sm:text-[22px] font-light text-[#2a1f1a] leading-snug mb-3 group-hover:text-[#a5762a] transition-colors"
                      style={serif}
                    >
                      {offering.title}
                    </h3>

                    {/* Body */}
                    <p className="text-xs sm:text-[13px] text-[#4a382e]/85 leading-relaxed font-light mb-6">
                      {offering.body}
                    </p>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-3 border-t border-[#e8d9cf]/60 flex items-center justify-between mt-auto text-[#a5762a] group-hover:text-[#2a1f1a] transition-colors">
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.2em]">
                      {offering.actionLabel}
                    </span>
                    <span className="text-sm font-light text-[#c8a951] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* "A MORE ALIGNED YOU" Divider */}
        <div className="flex items-center justify-center gap-4 my-9 md:my-11">
          <div className="h-px flex-1 max-w-[100px] sm:max-w-[180px] bg-[#c8a951]/45" />
          <span className="text-[10px] sm:text-[11px] font-light tracking-[0.38em] text-[#7a5c43] uppercase">
            A &nbsp;M O R E &nbsp;A L I G N E D &nbsp;Y O U
          </span>
          <div className="h-px flex-1 max-w-[100px] sm:max-w-[180px] bg-[#c8a951]/45" />
        </div>

        {/* Exact Quote from Ektaz Shah */}
        <motion.div
          className="mx-auto max-w-3xl text-center bg-white/85 border border-[#e8d9cf] hover:border-[#c8a951]/60 p-7 sm:p-10 rounded-sm shadow-sm backdrop-blur-xs transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-lg sm:text-xl md:text-2xl text-[#2a1f1a] leading-relaxed mb-5 font-light"
            style={{ ...serif, fontStyle: "italic" }}
          >
            "I believe the universe is always guiding us through signs, energies and little nudges. Sometimes, all we need is the faith to listen."
          </p>
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-px w-8 bg-[#c8a951]" />
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">
              Ektaz Shah, Founder of Selenite Soul
            </p>
            <span className="h-px w-8 bg-[#c8a951]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. KUNDALI: Luxury Vedic Birth Chart & Astrological Mandala (Light)
// ─────────────────────────────────────────────────────────────────────────────
function KundaliSection() {
  const bgRef = useParallax(0.12);
  const sectionRef = useGSAPReveal({ staggerSelector: ".k-reveal", staggerDelay: 0.12, start: "top 80%" });
  const headRef = useSplitReveal();

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[460px] lg:min-h-[520px] flex items-center bg-[#fdf8f4]">
      {/* High-Resolution Luxury Vedic Astrology Mandala Artwork Backdrop */}
      <div className="absolute inset-0 scale-105 pointer-events-none">
        <img
          ref={bgRef as any}
          src="/kundali-blueprint-luxury.webp"
          alt="Vedic Kundali Celestial Mandala"
          className="w-full h-full object-cover object-right lg:object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdf8f4] via-[#fdf8f4]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdf8f4] via-transparent to-[#fdf8f4]/60" />
      </div>

      <div className="relative z-10 px-6 md:px-14 lg:px-20 py-10 md:py-12 max-w-[860px]">
        <div>
          <div className="k-reveal flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Free Vedic Reading</span>
          </div>
          <h2 ref={headRef as any}
            className="k-reveal text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[#2a1f1a] leading-[1.04] mb-6"
            style={serif}
          >
            Your Kundali: The Blueprint of Your Soul
          </h2>
          <p className="k-reveal text-sm md:text-base text-[#4a382e]/85 leading-[1.85] mb-8 max-w-[520px] font-light">
            Your birth chart is a precise cosmic map, revealing dharma, karma, relationships, health, wealth, and spiritual path. Computed free, instantly.
          </p>
          <div className="k-reveal flex flex-wrap gap-y-2 gap-x-6 mb-10 text-[#4a382e]/70 text-[10px] uppercase tracking-widest font-bold">
            {["Lahiri Ayanamsa", "9 Grahas", "27 Nakshatras", "Dasha Timeline", "Crystal Remedies"].map(f => (
              <span key={f} className="flex items-center gap-1.5">
                <motion.span className="w-1.5 h-1.5 rounded-full bg-[#a5762a]"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
                {f}
              </span>
            ))}
          </div>
          <MagLink href="/kundali" className="k-reveal">
            <motion.span
              className="inline-flex items-center gap-3 bg-[#c8a951] text-[#1a0e05] px-8 md:px-10 py-4 text-[10px] font-bold uppercase tracking-[0.24em] relative overflow-hidden shadow-xl hover:shadow-[#c8a951]/40 transition-shadow"
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
// 5. NUMEROLOGY: with Interactive Live Decoder (Light Theme)
// ─────────────────────────────────────────────────────────────────────────────
function NumerologySection() {
  const sectionRef = useGSAPReveal({ staggerSelector: ".num-reveal", staggerDelay: 0.1, start: "top 80%" });

  return (
    <section ref={sectionRef} className="py-10 md:py-14 overflow-hidden bg-[#f9f4ee]">
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Pythagorean Numerology</span>
            <div className="h-px w-8 bg-[#c8a951]/60" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={serif}>
            Numbers Are the <em className="italic text-[#a5762a]">Language of the Universe</em>
          </h2>
          <p className="text-xs md:text-sm text-[#4a382e]/80 font-light leading-relaxed">
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
// 6. ASTROLOGY & ZODIAC: with Interactive Celestial Wheel (Light Theme)
// ─────────────────────────────────────────────────────────────────────────────
function AstrologyZodiacSection() {
  return (
    <section className="py-10 md:py-14 overflow-hidden bg-[#fcf8f4]">
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Cosmic Alignment</span>
            <div className="h-px w-8 bg-[#c8a951]/60" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={serif}>
            Interactive <em className="italic text-[#a5762a]">Zodiac & Astrology</em> Explorer
          </h2>
          <p className="text-xs md:text-sm text-[#4a382e]/80 font-light leading-relaxed">
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
// 7. CRYSTALS: full bleed with Light Parallax
// ─────────────────────────────────────────────────────────────────────────────
function CrystalsSection() {
  const bgRef = useParallax(0.15);
  const sectionRef = useGSAPReveal({ staggerSelector: ".cr-reveal", staggerDelay: 0.12, start: "top 80%" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[460px] lg:min-h-[520px] flex items-stretch bg-[#f5ede4]">
      <div className="absolute inset-0 scale-110">
        <img ref={bgRef as any} src="/crystal-collection.webp" alt="Healing Crystals"
          className="w-full h-full object-cover object-center" data-cursor="view" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(253,248,244,0.95) 0%, rgba(253,248,244,0.85) 48%, rgba(253,248,244,0.40) 100%)" }} />
      </div>

      <div className="relative z-10 flex items-center px-6 md:px-14 lg:px-20 py-10 md:py-12 max-w-[780px]">
        <div className="w-full">
          <div className="cr-reveal flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Healing Crystals</span>
          </div>
          <h2 className="cr-reveal text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[#2a1f1a] leading-[1.04] mb-6" style={serif}>
            Discover Your<br /><em className="italic text-[#a5762a]">Healing Crystal</em>
          </h2>
          <p className="cr-reveal text-sm md:text-base text-[#4a382e]/85 leading-[1.85] mb-8 max-w-[480px] font-light">
            Every crystal at Selenite Soul is personally selected by Ektaz, ethically sourced, lab-tested, and energised under the full moon.
          </p>

          {/* Animated stats */}
          <div className="cr-reveal flex gap-8 mb-8 pb-8 border-b border-[#e8d9cf]">
            {[["222+", "Unique Products"], ["100%", "Natural & Tested"], ["Full Moon", "Energised"]].map(([num, label]) => (
              <motion.div key={label} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <p className="text-2xl text-[#a5762a] font-light" style={serif}>{num}</p>
                <p className="text-[9px] text-[#4a382e]/70 uppercase tracking-widest mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          <div className="cr-reveal flex flex-wrap gap-4">
            <MagLink href="/kundali">
              <motion.span
                className="inline-flex items-center gap-2.5 border border-[#c8a951] text-[#a5762a] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] bg-white/80 shadow-sm"
                whileHover={{ backgroundColor: "rgba(200,169,81,0.12)", borderColor: "#a5762a" }}
                transition={{ duration: 0.18 }}
              >
                Know Your Crystal
              </motion.span>
            </MagLink>
            <MagLink href="/shop">
              <motion.span
                className="inline-flex items-center gap-2.5 bg-[#c8a951] text-[#1a0e05] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] relative overflow-hidden shadow-xl"
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
// 8. TAROT: with 3D Interactive Oracle Deck (Light Theme)
// ─────────────────────────────────────────────────────────────────────────────
function TarotSection() {
  return (
    <section className="py-10 md:py-14 overflow-hidden bg-[#f9f4ee]">
      <div className="px-5 md:px-14 max-w-[1400px] mx-auto mb-8 md:mb-12">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Intuitive Oracle</span>
            <div className="h-px w-8 bg-[#c8a951]/60" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={serif}>
            Interactive <em className="italic text-[#a5762a]">Tarot Reading</em> Suite
          </h2>
          <p className="text-xs md:text-sm text-[#4a382e]/80 font-light leading-relaxed">
            Draw a daily oracle card or lay a sacred 3-card spread to receive intuitive clarity for love, career, and spiritual evolution.
          </p>
        </div>

        {/* Live 3D Tarot Deck Component - The Game */}
        <InteractiveTarotDeck />
      </div>

      {/* Simpler Tarot Section: Type of Reading, How to Book, Guided with Intention, Highlights */}
      <TarotSimplerSection />
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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", containScroll: "trimSnaps", dragFree: true },
    [WheelGesturesPlugin()]
  );
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
    <section className="py-10 md:py-14 overflow-hidden bg-[#fcf8f4]">
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
              className="w-11 h-11 border border-[#e0cdb8] flex items-center justify-center text-[#4a3020] disabled:opacity-20 bg-white shadow-sm cursor-pointer"
              whileHover={{ borderColor: "#c8a951", backgroundColor: "rgba(200,169,81,0.06)" }}
              whileTap={{ scale: 0.93 }}
              data-cursor="hover"
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative group">
        {/* PC Thin Left End Button */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#2a1f1a] border border-[#e8d9cf] hover:border-[#c8a951] items-center justify-center shadow-md transition-all duration-200 cursor-pointer disabled:opacity-0 disabled:pointer-events-none hover:scale-105 active:scale-95"
          aria-label="Previous products"
        >
          <ChevronLeft className="w-4 h-4 stroke-[1.25]" />
        </button>

        {/* PC Thin Right End Button */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#2a1f1a] border border-[#e8d9cf] hover:border-[#c8a951] items-center justify-center shadow-md transition-all duration-200 cursor-pointer disabled:opacity-0 disabled:pointer-events-none hover:scale-105 active:scale-95"
          aria-label="Next products"
        >
          <ChevronRight className="w-4 h-4 stroke-[1.25]" />
        </button>

        <div className="overflow-hidden border-t border-b border-[#e8d9cf] select-none" ref={emblaRef}>
          <div className="flex select-none touch-pan-y cursor-grab active:cursor-grabbing">
            {shopByProductItems.map(product => (
              <motion.div
                key={product.id}
                className="flex-none w-[56vw] sm:w-[40vw] md:w-[280px] lg:w-[300px] border-r border-[#e8d9cf] bg-[#f9f4ef] group cursor-pointer relative overflow-hidden select-none"
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
                <div className="relative aspect-square w-full p-6 md:p-8 bg-[#f9f4ef] overflow-hidden select-none">
                  <motion.img
                    src={product.image} alt={product.name}
                    draggable={false}
                    onDragStart={e => e.preventDefault()}
                    className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none"
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
                          ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="w-4 h-4 stroke-[2.5]" /></motion.span>
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
