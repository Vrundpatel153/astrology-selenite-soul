"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Tag, ArrowRight, ShieldCheck, Gift, Gem, Moon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { toast } from "sonner";
import { Link } from "wouter";

interface PromoOffer {
  code: string;
  title: string;
  discountBadge: string;
  description: string;
  minOrder: string;
  terms: string;
}

const OFFERS: PromoOffer[] = [
  {
    code: "SELENITE10",
    title: "Sanctuary Welcoming Grace",
    discountBadge: "10% OFF",
    description: "Enjoy 10% off your entire sacred crystal collection order. Valid on all raw stones, bracelets, and spiritual jewelry.",
    minOrder: "No minimum purchase",
    terms: "Single use per seeker · Instant checkout apply",
  },
  {
    code: "FULLMOON",
    title: "Full Moon Consecration",
    discountBadge: "₹500 OFF",
    description: "Save flat ₹500 on energizing crystal orders above ₹2,999. Includes ceremonial sage purification and velvet storage pouch.",
    minOrder: "Min order ₹2,999",
    terms: "Valid on handcrafted crystal jewels and raw geodes",
  },
  {
    code: "VEDIC15",
    title: "Planetary Alignment Discount",
    discountBadge: "15% OFF",
    description: "Receive 15% discount when ordering any personalized astrological gemstone recommended in your Vedic birth chart.",
    minOrder: "Min order ₹1,499",
    terms: "Max discount ₹600 · Applicable storewide",
  },
  {
    code: "SHIVAY20",
    title: "Maha Shivaratri Special",
    discountBadge: "20% OFF",
    description: "Receive 20% off on all Rudraksha malas, pyramid crystals, and Shiva-Shakti balancing gemstones for inner stillness.",
    minOrder: "Min order ₹3,999",
    terms: "Valid for all seekers · Limited period blessing",
  },
];

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a]">
      <Header />

      {/* Hero Strip */}
      <section className="pt-24 pb-12 px-4 sm:px-6 bg-[#f7efe6] border-b border-[#e8d9cf] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center text-[#a5762a] mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Sacred Abundance & Promo Codes
            </span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-light text-[#2a1f1a] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Exclusive Blessings & Coupons
          </h1>
          <p className="text-sm text-[#4a382e]/80 font-light leading-relaxed">
            Copy any promo code below and apply it during checkout to receive ceremonial discounts on our ethically sourced crystal collection.
          </p>
        </motion.div>
      </section>

      {/* Coupon Cards Grid */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coupons.map((coupon, idx) => (
            <ScrollReveal key={coupon.code} delay={idx * 0.08}>
              <div className="bg-white border-2 border-dashed border-[#c8a951]/60 p-6 sm:p-8 rounded-sm shadow-md flex flex-col justify-between relative overflow-hidden group hover:border-[#c8a951] hover:shadow-xl transition-all">
                {/* Background Watermark */}
                <Tag className="w-32 h-32 absolute -right-6 -bottom-6 text-[#c8a951]/8 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-[#e8d9cf]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#fdf8f4] border border-[#c8a951]/40 text-[#a5762a] px-3 py-1 rounded-full">
                      {coupon.discountType === "percent" ? `${coupon.discountValue}% OFF` : `FLAT ₹${coupon.discountValue} OFF`}
                    </span>
                    <span className="text-[10px] text-[#4a382e]/60 font-mono">
                      Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-light text-[#2a1f1a] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {coupon.description}
                  </h3>

                  <p className="text-xs text-[#4a382e]/70 leading-relaxed font-light mb-6">
                    {coupon.minOrderAmount > 0
                      ? `Valid on all purchases above ₹${coupon.minOrderAmount}.`
                      : "No minimum purchase required."}
                    {coupon.maxDiscount ? ` Maximum discount capped at ₹${coupon.maxDiscount}.` : ""}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e8d9cf] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Coupon Code Pill */}
                  <div className="bg-[#fcf8f4] border border-[#c8a951]/70 px-4 py-2.5 rounded-sm flex items-center justify-between sm:justify-start gap-4">
                    <span className="font-mono text-sm font-bold text-[#a5762a] tracking-wider">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="text-xs font-bold text-[#2a1f1a] hover:text-[#a5762a] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <Link href="/shop">
                    <span className="inline-flex items-center justify-center gap-1.5 bg-[#c8a951] text-[#1a0e05] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-xs hover:shadow-[#c8a951]/30 transition-all cursor-pointer w-full sm:w-auto">
                      Shop Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Value Prop Strip */}
        <div className="mt-14 p-8 bg-white border border-[#e8d9cf] rounded-sm shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Gift className="w-6 h-6 text-[#a5762a] mb-2" />
            <h4 className="text-sm font-bold text-[#2a1f1a]">Free Gift on ₹1,999+</h4>
            <p className="text-xs text-[#4a382e]/70 mt-0.5">Complimentary energized raw selenite wand with every qualifying order.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#a5762a] mb-2" />
            <h4 className="text-sm font-bold text-[#2a1f1a]">100% Certified Crystals</h4>
            <p className="text-xs text-[#4a382e]/70 mt-0.5">Government lab-tested and verified for authentic mineral frequency.</p>
          </div>
          <div className="flex flex-col items-center">
            <Moon className="w-6 h-6 text-[#a5762a] mb-2" />
            <h4 className="text-sm font-bold text-[#2a1f1a]">Full Moon Energized</h4>
            <p className="text-xs text-[#4a382e]/70 mt-0.5">Cleansed with Himalayan singing bowls and charged under lunar cycles.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
