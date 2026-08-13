"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import { concerns } from "@/data/products";

export default function ShopByConcernCarousel() {
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
    <section className="py-12 md:py-20 bg-[#fdf3ec] overflow-hidden" data-testid="section-shop-by-concern">
      {/* Header */}
      <div className="px-4 md:px-14 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">Shop By</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2a1f1a]">Concern</h2>
          <p className="text-sm text-[#2a1f1a]/55 mt-2 max-w-xs">
            Find the right crystal for what you want to invite into your life.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev}
            className="w-10 h-10 border border-[#e8d9cf] flex items-center justify-center text-[#2a1f1a] disabled:opacity-30 hover:border-[#c8a951] hover:text-[#c8a951] transition-colors"
            aria-label="Previous">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext}
            className="w-10 h-10 border border-[#e8d9cf] flex items-center justify-center text-[#2a1f1a] disabled:opacity-30 hover:border-[#c8a951] hover:text-[#c8a951] transition-colors"
            aria-label="Next">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3 pl-4 md:pl-14 pr-4">
          {concerns.map((concern, idx) => (
            <Link key={concern.id} href={`/shop?filter=${concern.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group cursor-pointer overflow-hidden flex-none"
                style={{ width: "clamp(240px, 28vw, 380px)", aspectRatio: "3/4" }}
                data-testid={`card-concern-${concern.id}`}
              >
                <img
                  src={concern.image}
                  alt={concern.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-1.5">{concern.name}</h3>
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-3">{concern.subtitle}</p>
                  <motion.span
                    className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#c8a951] border-b border-[#c8a951]/40 pb-0.5 group-hover:border-[#c8a951] transition-colors"
                  >
                    Shop {concern.name} →
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
