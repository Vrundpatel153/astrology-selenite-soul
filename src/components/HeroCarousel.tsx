"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const slides = [
  {
    id: 1,
    image: "/hero.webp",
    eyebrow: "New Collection",
    heading: "Align Your\nEnergy",
    subheading: "Ethically sourced crystals, energised under the full moon for your highest self.",
    cta: { label: "Shop Healing Crystals", href: "/shop" },
    ctaSecondary: { label: "Free Kundali Reading", href: "/kundali" },
    overlay: "from-[#2a1f1a]/70 via-[#2a1f1a]/20 to-transparent",
    accent: "#c8a951",
  },
  {
    id: 2,
    image: "/concern-love.webp",
    eyebrow: "Tarot & Guidance",
    heading: "Sacred\nReadings",
    subheading: "Book a one-on-one Tarot session with Ektaz: clarity for love, career, and soul.",
    cta: { label: "Book a Reading", href: "/tarot" },
    ctaSecondary: { label: "About Tarot", href: "/tarot#guidance" },
    overlay: "from-[#2a0e3d]/80 via-[#3d1550]/30 to-transparent",
    accent: "#b07ec8",
  },
  {
    id: 3,
    image: "/concern-protection.webp",
    eyebrow: "Vedic Jyotish",
    heading: "Your Cosmic\nBlueprint",
    subheading: "Discover your planetary chart, crystal remedies, and life path in one comprehensive Kundali reading.",
    cta: { label: "Get My Kundali", href: "/kundali" },
    ctaSecondary: { label: "Explore Numerology", href: "/numerology" },
    overlay: "from-[#0d1520]/80 via-[#1a2535]/30 to-transparent",
    accent: "#7e9dbf",
  },
  {
    id: 4,
    image: "/concern-peace.webp",
    eyebrow: "Crystal Shop",
    heading: "Find Your\nCrystal",
    subheading: "From raw stones to sacred bracelets, every piece carries the earth's healing intelligence.",
    cta: { label: "Shop Crystals", href: "/shop" },
    ctaSecondary: { label: "Know Your Crystal", href: "/kundali" },
    overlay: "from-[#1a2010]/80 via-[#2a3020]/30 to-transparent",
    accent: "#7aad78",
  },
];

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Auto-advance
  useEffect(() => {
    if (!emblaApi) return;
    const start = () => {
      autoplayRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, AUTOPLAY_MS);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    start();
    emblaApi.on("pointerDown", stop);
    return () => {
      stop();
      emblaApi.off("pointerDown", stop);
    };
  }, [emblaApi]);

  const scrollTo = (idx: number) => emblaApi && emblaApi.scrollTo(idx);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#fcf8f0]"
      style={{ height: "min(92vh, 860px)", minHeight: "500px" }}
      data-testid="section-hero-carousel"
    >
      {/* PC Thin Left End Button */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/55 text-white/90 hover:text-white border border-white/20 hover:border-white/50 items-center justify-center backdrop-blur-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 stroke-[1.25]" />
      </button>

      {/* PC Thin Right End Button */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/55 text-white/90 hover:text-white border border-white/20 hover:border-white/50 items-center justify-center backdrop-blur-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 stroke-[1.25]" />
      </button>

      {/* Embla viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="relative flex-none w-full h-full select-none">
              {/* BG image */}
              <motion.img
                src={slide.image}
                alt={slide.heading.replace("\n", " ")}
                className="absolute inset-0 w-full h-full object-cover object-[center_35%] sm:object-center"
                animate={selectedIndex === idx ? { scale: 1.04 } : { scale: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              />
              {/* Colour overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/35 sm:from-black/65 sm:via-black/10 sm:to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent sm:hidden pointer-events-none" />

              {/* Slide content - Centered on mobile so main content is prominent and visible */}
              <div className="absolute inset-0 flex flex-col justify-center sm:justify-end px-5 pt-16 pb-12 sm:px-14 sm:pb-24 lg:px-20 lg:pb-28 max-w-[760px] z-10">
                <AnimatePresence mode="wait">
                  {selectedIndex === idx && (
                    <motion.div
                      key={`content-${slide.id}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.45 }}
                        className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.3em] mb-2 sm:mb-4"
                        style={{ color: slide.accent }}
                      >
                        {slide.eyebrow}
                      </motion.p>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="font-serif font-light text-white leading-[0.92] mb-3.5 sm:mb-6 whitespace-pre-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                      >
                        {slide.heading}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="text-white/80 text-xs sm:text-sm md:text-[15px] max-w-sm sm:max-w-md leading-relaxed mb-5 sm:mb-8 font-light line-clamp-2 sm:line-clamp-none"
                      >
                        {slide.subheading}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.45 }}
                        className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto max-w-[280px] sm:max-w-none"
                      >
                        <Link href={slide.cta.href}>
                          <motion.span
                            className="block sm:inline-block text-center px-5 py-3 sm:px-7 sm:py-3.5 text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e1410] cursor-pointer shadow-md rounded-xs"
                            style={{ background: slide.accent }}
                            whileHover={{ scale: 1.04, boxShadow: `0 12px 36px ${slide.accent}55` }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {slide.cta.label}
                          </motion.span>
                        </Link>
                        <Link href={slide.ctaSecondary.href}>
                          <motion.span
                            className="block sm:inline-block text-center px-5 py-3 sm:px-7 sm:py-3.5 text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white border border-white/45 bg-black/25 backdrop-blur-xs sm:bg-transparent cursor-pointer rounded-xs"
                            whileHover={{ borderColor: slide.accent, color: slide.accent }}
                            transition={{ duration: 0.18 }}
                          >
                            {slide.ctaSecondary.label}
                          </motion.span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators : bottom right */}
      <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-14 flex items-center gap-1.5 sm:gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: selectedIndex === idx ? 24 : 6,
              height: 5,
              background: selectedIndex === idx ? slides[selectedIndex].accent : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* Counter : bottom left */}
      <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-14 z-20">
        <span className="text-white/40 text-[10px] font-mono tracking-widest">
          {String(selectedIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
        <motion.div
          className="h-full"
          style={{ background: slides[selectedIndex].accent }}
          key={selectedIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
        />
      </div>
    </section>
  );
}
