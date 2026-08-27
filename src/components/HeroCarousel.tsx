"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";

const slides = [
  {
    id: 1,
    image: "/hero.webp",
    eyebrow: "New Collection",
    heading: "Align Your\nEnergy",
    subheading: "Ethically sourced crystals, energised under the full moon — for your highest self.",
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
    subheading: "Book a one-on-one Tarot session with Ekta — clarity for love, career, and soul.",
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
    subheading: "Discover your planetary chart, crystal remedies, and life path — all in one Kundali reading.",
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
    subheading: "From raw stones to sacred bracelets — every piece carries the earth's healing intelligence.",
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
      {/* Embla viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, idx) => (
            <div key={slide.id} className="relative flex-none w-full h-full select-none">
              {/* BG image */}
              <motion.img
                src={slide.image}
                alt={slide.heading.replace("\n", " ")}
                className="absolute inset-0 w-full h-full object-cover object-center"
                animate={selectedIndex === idx ? { scale: 1.04 } : { scale: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              />
              {/* Colour overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />

              {/* Slide content */}
              <div className="absolute inset-0 flex flex-col justify-end px-6 pb-20 md:px-14 md:pb-24 lg:px-20 lg:pb-28 max-w-[760px]">
                <AnimatePresence mode="wait">
                  {selectedIndex === idx && (
                    <motion.div
                      key={`content-${slide.id}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.45 }}
                        className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] mb-3 md:mb-5"
                        style={{ color: slide.accent }}
                      >
                        — {slide.eyebrow}
                      </motion.p>
                      <motion.h2
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="font-serif font-light text-white leading-[0.88] mb-4 md:mb-6 whitespace-pre-line"
                        style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
                      >
                        {slide.heading}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="hidden sm:block text-white/65 text-sm md:text-[15px] max-w-md leading-relaxed mb-7 md:mb-9 font-light"
                      >
                        {slide.subheading}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.45 }}
                        className="flex flex-wrap gap-3"
                      >
                        <Link href={slide.cta.href}>
                          <motion.span
                            className="inline-block px-7 py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-[#1e1410] cursor-pointer"
                            style={{ background: slide.accent }}
                            whileHover={{ scale: 1.04, boxShadow: `0 12px 36px ${slide.accent}55` }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {slide.cta.label}
                          </motion.span>
                        </Link>
                        <Link href={slide.ctaSecondary.href}>
                          <motion.span
                            className="inline-block px-7 py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-white border border-white/35 cursor-pointer"
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

      {/* Dot indicators — bottom right */}
      <div className="absolute bottom-7 md:bottom-10 right-6 md:right-14 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: selectedIndex === idx ? 26 : 6,
              height: 6,
              background: selectedIndex === idx ? slides[selectedIndex].accent : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* Counter — bottom left */}
      <div className="absolute bottom-7 md:bottom-10 left-6 md:left-14 z-20">
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
