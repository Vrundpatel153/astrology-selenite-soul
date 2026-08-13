"use client";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "wouter";

// Each sign: use large italic serif text for symbol instead of emoji
const signs = [
  { sign: "Aries",       dates: "Mar 21–Apr 19", crystal: "Carnelian",     latin: "Aries",        sym: "T",  element: "Fire",  color: "#c8743a" },
  { sign: "Taurus",      dates: "Apr 20–May 20", crystal: "Rose Quartz",   latin: "Taurus",       sym: "♁",  element: "Earth", color: "#7aad78" },
  { sign: "Gemini",      dates: "May 21–Jun 20", crystal: "Tiger Eye",     latin: "Gemini",       sym: "II", element: "Air",   color: "#c8a951" },
  { sign: "Cancer",      dates: "Jun 21–Jul 22", crystal: "Moonstone",     latin: "Cancer",       sym: "69", element: "Water", color: "#7e9dbf" },
  { sign: "Leo",         dates: "Jul 23–Aug 22", crystal: "Citrine",       latin: "Leo",          sym: "Ω",  element: "Fire",  color: "#c8743a" },
  { sign: "Virgo",       dates: "Aug 23–Sep 22", crystal: "Amazonite",     latin: "Virgo",        sym: "M",  element: "Earth", color: "#7aad78" },
  { sign: "Libra",       dates: "Sep 23–Oct 22", crystal: "Lapis Lazuli",  latin: "Libra",        sym: "—",  element: "Air",   color: "#c8a951" },
  { sign: "Scorpio",     dates: "Oct 23–Nov 21", crystal: "Black Obsidian",latin: "Scorpio",      sym: "M̂",  element: "Water", color: "#7e9dbf" },
  { sign: "Sagittarius", dates: "Nov 22–Dec 21", crystal: "Turquoise",     latin: "Sagittarius",  sym: "↑",  element: "Fire",  color: "#c8743a" },
  { sign: "Capricorn",   dates: "Dec 22–Jan 19", crystal: "Garnet",        latin: "Capricorn",    sym: "V",  element: "Earth", color: "#7aad78" },
  { sign: "Aquarius",    dates: "Jan 20–Feb 18", crystal: "Amethyst",      latin: "Aquarius",     sym: "≈",  element: "Air",   color: "#c8a951" },
  { sign: "Pisces",      dates: "Feb 19–Mar 20", crystal: "Aquamarine",    latin: "Pisces",       sym: "X",  element: "Water", color: "#7e9dbf" },
];

const elementBg: Record<string, string> = {
  Fire:  "rgba(200,116,58,0.07)",
  Earth: "rgba(122,173,120,0.07)",
  Air:   "rgba(200,169,81,0.07)",
  Water: "rgba(126,157,191,0.07)",
};

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
      className="py-16 md:py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf3ec 0%, #f5e8d8 100%)" }}
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
            Shop by <em className="italic text-[#a5762a] not-italic" style={{ fontStyle: "italic" }}>Astrology</em>
          </h2>
          <p className="text-sm text-[#6b5645] mt-3 max-w-sm leading-relaxed">
            Each zodiac sign has a unique crystal ally. Find yours.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="w-11 h-11 border border-[#c8a951]/40 flex items-center justify-center text-[#a5762a] disabled:opacity-20 hover:bg-[#c8a951]/10 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="w-11 h-11 border border-[#c8a951]/40 flex items-center justify-center text-[#a5762a] disabled:opacity-20 hover:bg-[#c8a951]/10 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-0 pl-5 md:pl-14">
          {signs.map((sign, idx) => (
            <Link key={sign.sign} href={`/shop?zodiac=${sign.sign.toLowerCase()}`}>
              <motion.div
                className="flex-none cursor-pointer group select-none"
                style={{ width: "clamp(160px, 14vw, 220px)" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                whileHover={{ y: -8 }}
              >
                <div
                  className="mx-1 border border-[#e0cdb8] transition-all duration-300 group-hover:border-[#c8a951]/70 group-hover:shadow-lg"
                  style={{
                    background: elementBg[sign.element],
                    boxShadow: "none",
                  }}
                >
                  {/* Top: element tag */}
                  <div className="px-4 pt-4 pb-2 border-b border-[#e0cdb8]/60">
                    <span
                      className="text-[8px] font-bold uppercase tracking-[0.22em]"
                      style={{ color: sign.color }}
                    >
                      {sign.element}
                    </span>
                  </div>

                  {/* Middle: sign name as large serif text */}
                  <div className="px-4 py-6 flex flex-col items-start">
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2a1f1a]/40 mb-2"
                    >
                      {sign.dates}
                    </p>
                    <h3
                      className="text-2xl text-[#2a1f1a] leading-tight mb-1 group-hover:text-[#a5762a] transition-colors"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
                    >
                      {sign.sign}
                    </h3>
                  </div>

                  {/* Bottom: crystal */}
                  <div
                    className="px-4 py-3 border-t border-[#e0cdb8]/60 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#a5762a]/60 mb-0.5">Crystal</p>
                      <p
                        className="text-[11px] font-medium text-[#a5762a]"
                        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                      >
                        {sign.crystal}
                      </p>
                    </div>
                    <span className="text-[#c8a951]/40 text-xs group-hover:text-[#c8a951] transition-colors">→</span>
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
