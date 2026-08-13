"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { bestSellers, newArrivals, products } from "@/data/products";
import type { Product } from "@/data/products";

// "Ekta's Picks" — a curated hand-picked selection
const ektaPicks = products.filter(p =>
  [1, 5, 15, 30, 45, 68, 90, 120, 180, 215, 221].includes(p.id)
).slice(0, 12);

const tabs = [
  { id: "new",       label: "New Arrivals",      icon: "✦",  products: newArrivals.slice(0, 14)  },
  { id: "best",      label: "Bestsellers",        icon: "★",  products: bestSellers.slice(0, 14)  },
  { id: "ekta",      label: "Ekta's Picks",       icon: "♥",  products: ektaPicks                 },
];

function ProductCard({ product }: { product: Product }) {
  const [, navigate] = useLocation();
  const { addToCart } = useCart();

  return (
    <motion.div
      className="flex-none w-[58vw] sm:w-[42vw] md:w-[300px] lg:w-[320px] bg-[#f7f1ec] border-r border-[#e8d9cf] group cursor-pointer relative overflow-hidden"
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      data-testid={`card-product-${product.id}`}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-3 left-3 z-10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
            product.badge === "SALE" ? "bg-[#8b2020] text-white" :
            product.badge === "NEW" ? "bg-[#2a1f1a] text-white" :
            product.badge === "BEST SELLER" ? "bg-[#c8a951] text-[#2a1f1a]" :
            "bg-[#e8d9cf] text-[#2a1f1a]"
          }`}
        >
          {product.badge}
          {product.savePercent ? ` −${product.savePercent}%` : ""}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square w-full bg-[#f7f1ec] p-5 md:p-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-106 transition-transform duration-600"
          data-testid={`img-product-${product.id}`}
        />
        {/* Quick add */}
        <motion.button
          className="absolute bottom-3 right-3 w-9 h-9 bg-white border border-[#e8d9cf] flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          onClick={e => { e.stopPropagation(); addToCart(product); }}
          whileHover={{ backgroundColor: "#2a1f1a", borderColor: "#2a1f1a", color: "white" }}
          aria-label="Add to cart"
        >
          <Plus className="w-4 h-4 text-inherit stroke-[1.5]" />
        </motion.button>
      </div>

      {/* Info */}
      <div className="p-3 md:p-4 bg-white border-t border-[#e8d9cf]">
        <h3 className="text-[10px] md:text-[11px] font-normal uppercase tracking-widest text-[#2a1f1a] mb-1.5 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-1.5">
          <p className="text-[13px] md:text-[15px] font-bold text-[#2a1f1a]">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-[11px] text-[#2a1f1a]/40 line-through">₹{product.originalPrice}</p>
          )}
        </div>
        {product.swatches && product.swatches.length > 0 && (
          <div className="flex items-center gap-1">
            {product.swatches.slice(0, 5).map((color, i) => (
              <div key={i} className="w-3 h-3 border border-[#e8d9cf] rounded-sm" style={{ backgroundColor: color }} />
            ))}
            {product.swatches.length > 5 && (
              <span className="text-[9px] text-[#2a1f1a]/40 ml-0.5">+{product.swatches.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TabbedProductCarousel() {
  const [activeTab, setActiveTab] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);
    updateScrollState();
    return () => {
      emblaApi.off("select", updateScrollState);
      emblaApi.off("reInit", updateScrollState);
    };
  }, [emblaApi, updateScrollState]);

  // Re-init carousel when tab changes
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [activeTab, emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const currentTab = tabs[activeTab];

  return (
    <section className="py-12 md:py-20 bg-[#fdf8f4] overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-14 mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">Crystal Collection</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2a1f1a] leading-none">
            Shop Our Range
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-0 border border-[#e8d9cf] self-start md:self-auto overflow-hidden">
          {tabs.map((tab, i) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className="relative px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5"
              style={{
                color: activeTab === i ? "#fdf8f4" : "#2a1f1a",
                borderRight: i < tabs.length - 1 ? "1px solid #e8d9cf" : "none",
              }}
            >
              {activeTab === i && (
                <motion.div
                  layoutId="tabBg"
                  className="absolute inset-0 bg-[#2a1f1a]"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10 hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Nav arrows */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="w-9 h-9 border border-[#e8d9cf] flex items-center justify-center text-[#2a1f1a] disabled:opacity-30 hover:border-[#2a1f1a] transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="w-9 h-9 border border-[#e8d9cf] flex items-center justify-center text-[#2a1f1a] disabled:opacity-30 hover:border-[#2a1f1a] transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="overflow-hidden border-t border-b border-[#e8d9cf]" ref={emblaRef}>
            <div className="flex">
              {currentTab.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* View all link */}
      <div className="px-4 md:px-14 mt-8 text-center">
        <a
          href="/shop"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a] border-b border-[#2a1f1a]/40 pb-0.5 hover:border-[#c8a951] hover:text-[#c8a951] transition-colors"
        >
          View All {currentTab.label} →
        </a>
      </div>
    </section>
  );
}
