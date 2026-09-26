"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import InteractiveTarotDeck from "@/components/InteractiveTarotDeck";
import TarotSimplerSection from "@/components/TarotSimplerSection";
import {
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// ─── Floating Gold Ambient Dust Canvas ─────────────────────────────────────────
function TarotAmbientDust({ count = 20 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#c8a951]"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.15, 0.75, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: (i * 0.35) % 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── FAQ accordion ─────────────────────────────────────────────────────────────
const faqs = [
  { q: "How long is a Tarot reading session?", a: "Each reading is 45 to 60 minutes, conducted via private high-definition video call or in person. Ektaz ensures dedicated time for in-depth questions and custom spread interpretations." },
  { q: "Do I need prior knowledge of Tarot?", a: "Not at all. You only need an open heart and a willingness to explore your path. Ektaz translates the archetypal symbolism into clear, grounded guidance." },
  { q: "Is Tarot fortune-telling or deterministic?", a: "Ektaz's philosophy honors your sovereign free will. Tarot serves as an intuitive mirror reflecting present energetic trajectories, empowering you to make aligned choices." },
  { q: "What is included with my session?", a: "In addition to your live consultation, Ektaz provides a personalized crystal prescription and a recap of key affirmations to anchor your session's energy." },
  { q: "Can I record or take notes during the reading?", a: "Yes, you are warmly encouraged to record or take notes so you can revisit the insights whenever you need guidance." },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8d9cf] last:border-none">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group cursor-pointer"
      >
        <span className="text-sm md:text-base font-normal text-[#2a1f1a] group-hover:text-[#a5762a] transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-[#a5762a]">
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-xs md:text-sm text-[#4a382e]/80 leading-relaxed font-light">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Tarot() {
  return (
    <div className="min-h-screen bg-[#fcf8f4] text-[#2a1f1a] overflow-x-hidden">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#fdf8f4] py-10 md:py-14">
        <TarotAmbientDust count={28} />
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(200,169,81,0.15) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(220,180,150,0.15) 0%, transparent 70%)" }} />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-6 md:py-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#a5762a]">Sacred Intuitive Oracle</span>
            <div className="h-px w-10 bg-[#c8a951]/60" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-[#2a1f1a] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Tarot Reading<br />
            <span className="italic text-[#a5762a]">with Ektaz</span>
          </h1>
          <p className="text-[#4a382e]/80 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Not fortune-telling, but a sacred mirror reflecting your soul's highest wisdom. Draw from the 3D deck below or schedule an intimate consultation with Ektaz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#interactive-deck">
              <motion.span
                className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1a0e05] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-lg"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Draw Cards Online <ArrowRight className="w-4 h-4" />
              </motion.span>
            </a>
            <a href="#book">
              <motion.span
                className="inline-flex items-center gap-2 border border-[#c8a951] text-[#a5762a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:bg-[#c8a951]/10 bg-white/80"
                transition={{ duration: 0.2 }}
              >
                Book Personal Session
              </motion.span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── INTERACTIVE 3D TAROT DECK SUITE ────────────────────────────────────────── */}
      <section id="interactive-deck" className="py-10 md:py-14 px-4 sm:px-6 bg-[#f9f4ee] border-t border-b border-[#e8d9cf]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a] mb-2">Live Oracle Deck</p>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Experience the <em className="italic text-[#a5762a]">Sacred Spread</em>
            </h2>
            <p className="text-xs md:text-sm text-[#4a382e]/80 font-light leading-relaxed">
              Click cards directly from the fanned deck to deal and unveil your Major Arcana archetype.
            </p>
          </div>

          <InteractiveTarotDeck />
        </div>
      </section>

      {/* ── SIMPLER TAROT EXPERIENCE: TYPE OF READING, HOW TO BOOK, GUIDED WITH INTENTION, HIGHLIGHTS ── */}
      <div id="book">
        <TarotSimplerSection />
      </div>

      {/* ── FAQ SECTION ─────────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 bg-[#f9f4ee]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-8 md:mb-10">
            <div className="flex items-center gap-3 justify-center mb-3">
              <div className="h-px w-8 bg-[#c8a951]/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Sacred Inquiries</span>
              <div className="h-px w-8 bg-[#c8a951]/60" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="bg-white p-8 md:p-10 border border-[#e8d9cf] rounded-sm shadow-md">
            {faqs.map((faq) => (
              <FAQ key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
