"use client";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "wouter";
import { ZodiacGlyph } from "./ZodiacGlyphs";

const signs = [
  { sign: "Aries",       dates: "Mar 21 – Apr 19", crystal: "Carnelian",     latin: "The Ram",          element: "Fire",  color: "#e07a52" },
  { sign: "Taurus",      dates: "Apr 20 – May 20", crystal: "Rose Quartz",   latin: "The Bull",         element: "Earth", color: "#7aad78" },
  { sign: "Gemini",      dates: "May 21 – Jun 20", crystal: "Tiger Eye",     latin: "The Twins",        element: "Air",   color: "#c8a951" },
  { sign: "Cancer",      dates: "Jun 21 – Jul 22", crystal: "Moonstone",     latin: "The Crab",         element: "Water", color: "#8fa8d0" },
  { sign: "Leo",         dates: "Jul 23 – Aug 22", crystal: "Citrine",       latin: "The Lion",         element: "Fire",  color: "#e07a52" },
  { sign: "Virgo",       dates: "Aug 23 – Sep 22", crystal: "Amazonite",     latin: "The Maiden",       element: "Earth", color: "#7aad78" },
  { sign: "Libra",       dates: "Sep 23 – Oct 22", crystal: "Lapis Lazuli",  latin: "The Scales",       element: "Air",   color: "#c8a951" },
  { sign: "Scorpio",     dates: "Oct 23 – Nov 21", crystal: "Black Obsidian",latin: "The Scorpion",     element: "Water", color: "#8fa8d0" },
  { sign: "Sagittarius", dates: "Nov 22 – Dec 21", crystal: "Turquoise",     latin: "The Archer",       element: "Fire",  color: "#e07a52" },
  { sign: "Capricorn",   dates: "Dec 22 – Jan 19", crystal: "Garnet",        latin: "The Sea Goat",     element: "Earth", color: "#7aad78" },
  { sign: "Aquarius",    dates: "Jan 20 – Feb 18", crystal: "Amethyst",      latin: "The Water Bearer", element: "Air",   color: "#c8a951" },
  { sign: "Pisces",      dates: "Feb 19 – Mar 20", crystal: "Aquamarine",    latin: "The Fish",         element: "Water", color: "#8fa8d0" },
];

export default function ShopByAstrologyCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    loop: false,
  });
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
    <section
      className="py-16 md:py-24 overflow-hidden bg-[#fcf8f4]"
      data-testid="section-astrology-carousel"
    >
      {/* Section header */}
      <div className="px-5 md:px-14 mb-10 md:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#c8a951]/60" />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#a5762a]">Cosmic Alignment</span>
            <div className="h-px w-8 bg-[#c8a951]/60" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2a1f1a] leading-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
          >
            Shop by <em className="italic text-[#a5762a]">Astrology</em>
          </h2>
          <p className="text-xs md:text-sm text-[#6b5645] mt-3 max-w-sm leading-relaxed font-light">
            Each celestial sign resonates with a sacred crystal ally. Select your sign below.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="w-11 h-11 border border-[#c8a951]/40 flex items-center justify-center text-[#a5762a] disabled:opacity-20 hover:bg-[#c8a951]/10 transition-colors"
            aria-label="Previous"
            data-cursor="hover"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="w-11 h-11 border border-[#c8a951]/40 flex items-center justify-center text-[#a5762a] disabled:opacity-20 hover:bg-[#c8a951]/10 transition-colors"
            aria-label="Next"
            data-cursor="hover"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef} data-cursor="drag">
        <div className="flex gap-4 pl-5 md:pl-14">
          {signs.map((sign, idx) => (
            <Link key={sign.sign} href={`/shop?zodiac=${sign.sign.toLowerCase()}`}>
              <motion.div
                className="flex-none cursor-pointer group select-none"
                style={{ width: "clamp(180px, 16vw, 240px)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ y: -6 }}
                data-cursor="hover"
              >
                <div className="border border-[#c8a951]/30 bg-white/90 p-6 flex flex-col items-center text-center rounded-sm shadow-md hover:border-[#c8a951] hover:shadow-xl transition-all duration-300">
                  {/* Element Tag */}
                  <span
                    className="text-[8px] font-bold uppercase tracking-[0.25em] px-2.5 py-0.5 border rounded-full mb-6"
                    style={{ borderColor: `${sign.color}50`, color: sign.color, backgroundColor: `${sign.color}10` }}
                  >
                    {sign.element}
                  </span>

                  {/* Handcrafted Golden Zodiac Glyph */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#fdf8f4] border border-[#c8a951]/20 mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <ZodiacGlyph sign={sign.sign} size={36} strokeWidth={1.8} />
                  </div>

                  {/* Sign Name & Dates */}
                  <h3
                    className="text-xl md:text-2xl font-light text-[#2a1f1a] mb-1 group-hover:text-[#a5762a] transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {sign.sign}
                  </h3>
                  <p className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#a5762a]/70 mb-4">
                    {sign.dates}
                  </p>

                  {/* Crystal Remedy */}
                  <div className="w-full pt-3 border-t border-[#e8d9cf] flex items-center justify-between text-left">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-[#a5762a]">Crystal Ally</p>
                      <p className="text-xs font-semibold text-[#2a1f1a]">{sign.crystal}</p>
                    </div>
                    <span className="text-[#c8a951] text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          {/* Trailing spacer */}
          <div className="flex-none w-5 md:w-14" />
        </div>
      </div>
    </section>
  );
}
