"use client";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { zodiacSigns } from "@/data/products";

export default function ShopByAstrologyCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    loop: true,
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
    <section className="py-12 md:py-20 bg-[#2a1f1a] overflow-hidden" data-testid="section-astrology-carousel">
      {/* Header */}
      <div className="px-4 md:px-14 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">Cosmic Alignment</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white">Shop by Astrology</h2>
          <p className="text-sm text-white/40 mt-2 max-w-xs">
            Discover the perfect crystal companion for your zodiac sign.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev}
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/60 disabled:opacity-25 hover:border-[#c8a951] hover:text-[#c8a951] transition-colors"
            aria-label="Previous">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext}
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/60 disabled:opacity-25 hover:border-[#c8a951] hover:text-[#c8a951] transition-colors"
            aria-label="Next">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3 pl-4 md:pl-14 pr-4">
          {zodiacSigns.map((sign, idx) => (
            <motion.div
              key={sign.sign}
              className="flex-none cursor-pointer group"
              style={{ width: "clamp(140px, 16vw, 210px)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
              whileHover={{ y: -6 }}
            >
              <div className="border border-white/10 p-5 flex flex-col items-center text-center group-hover:border-[#c8a951]/50 group-hover:bg-[#c8a951]/05 transition-all duration-300 h-full">
                <motion.div
                  className="text-4xl md:text-5xl mb-3"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3 }}
                >
                  {sign.emoji}
                </motion.div>
                <h3 className="font-serif text-white text-base md:text-lg mb-0.5">{sign.sign}</h3>
                <p className="text-[9px] text-white/35 uppercase tracking-wider mb-3">{sign.dates}</p>
                <div className="mt-auto pt-3 border-t border-white/10 w-full">
                  <p className="text-[10px] font-medium text-[#c8a951]">{sign.crystal}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
