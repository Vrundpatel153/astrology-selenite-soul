"use client";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Gem, Compass } from "lucide-react";

// ─── Journey milestones ───────────────────────────────────────────────────────
const journey = [
  { year: "2012", title: "The Sacred Awakening in Haridwar", desc: "A spontaneous encounter with an Himalayan sage in Haridwar sparks a decade-long spiritual immersion into Vedic Jyotish and the mineral kingdom." },
  { year: "2015", title: "Formal Mastery of Jyotish & Numerology", desc: "Intensive classical training in Pune and Varanasi, mastering Lahiri Ayanamsa, Dasha calculations, and Pythagorean number matrices." },
  { year: "2017", title: "Intuitive Tarot Channelling", desc: "Bridging Western Major Arcana archetypal psychology with Vedic astrological house lords to create a multi-dimensional guidance modality." },
  { year: "2019", title: "Birth of Selenite Soul", desc: "Founded with the sacred mission to provide ethically sourced, full-moon charged gemstone remedies and grounded, non-alarmist spiritual consultations." },
  { year: "Today", title: "1.5L+ Lives Illuminated", desc: "Guiding a global community of seekers, executives, and spiritual practitioners toward sovereign clarity and alignment." },
];

const modalities = [
  { numeral: "I", title: "Vedic Kundali", desc: "Deep astrological blueprint decoding your dharma, karma, dashas, and planetary remedies.", href: "/kundali" },
  { numeral: "II", title: "Tarot Channelling", desc: "Intuitive oracle channelling to illuminate present energetic crossroads with clarity.", href: "/tarot" },
  { numeral: "III", title: "Pythagorean Numerology", desc: "Mathematical vibrations hidden in your birth date and full given name.", href: "/numerology" },
  { numeral: "IV", title: "Crystal Energetics", desc: "Ethically sourced, full-moon energized gemstones tailored to your auric signature.", href: "/shop" },
];

const beliefs = [
  { numeral: "01", title: "Ethical Sourcing & Purity", desc: "Every crystal is lab-tested, 100% natural, and sourced from conflict-free generational mines." },
  { numeral: "02", title: "Full-Moon Consecration", desc: "All stones and sacred items undergo ceremonial cleansing and energetic charging under full-moon cycles." },
  { numeral: "03", title: "Empowerment Over Fatalism", desc: "We reject alarmist predictions; our readings honor your sovereign free will and innate wisdom." },
  { numeral: "04", title: "Holistic Integration", desc: "True healing combines spiritual insight, emotional grounding, and practical somatic action." },
  { numeral: "05", title: "Sacred Confidentiality", desc: "Every consultation is held in strict, consecrated privacy with unconditional compassion." },
  { numeral: "06", title: "Ancestral Honor", desc: "Deep reverence for ancient Vedic lineage, passed down through masters of sacred sciences." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a] overflow-x-hidden">
      <Header />

      {/* ── HERO ────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#fdf8f4]">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] bg-[#c8a951]/15" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 bg-[#c8a951]/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#a5762a]">The Selenite Soul Sanctuary</span>
            <div className="h-px w-10 bg-[#c8a951]/60" />
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-[#2a1f1a] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Where Ancient Wisdom<br />
            <span className="italic text-[#a5762a]">Meets the Modern Soul</span>
          </h1>
          <p className="text-[#4a382e]/80 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Selenite Soul is Ekta's life's devotion — a sacred bridge between Vedic astrology, intuitive Tarot, Pythagorean numerology, and the healing intelligence of crystals.
          </p>
        </motion.div>
      </section>

      {/* ── THE SELENITE SOUL PHILOSOPHY ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#fdf8f4]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center gap-3 justify-center mb-3">
                <div className="h-px w-8 bg-[#c8a951]/60" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a]">Sacred Pillars</span>
                <div className="h-px w-8 bg-[#c8a951]/60" />
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                The Selenite Soul Philosophy
              </h2>
            </div>

            {/* Editorial 3-Column Monolith */}
            <div className="grid grid-cols-1 md:grid-cols-3 border border-[#c8a951]/30 bg-white/80 divide-y md:divide-y-0 md:divide-x divide-[#c8a951]/25 rounded-sm shadow-xl">
              {[
                { numeral: "I", label: "Ancient Vedic Wisdom", desc: "Jyotish, Tarot, and Numerology — three ancient sciences aligned to decode your cosmic blueprint with mathematical precision." },
                { numeral: "II", label: "Earth's Crystal Resonance", desc: "100% natural, lab-tested gemstones ethically sourced from generational mines and energized under sacred full-moon rituals." },
                { numeral: "III", label: "Ekta's Sovereign Intention", desc: "Every reading and crystal carries the personal devotion of over a decade of continuous study and client service." },
              ].map((item) => (
                <div key={item.label} className="p-8 md:p-10 flex flex-col justify-between group hover:bg-[#fcf5ed] transition-colors">
                  <div>
                    <span className="text-3xl md:text-4xl font-light text-[#a5762a] leading-none mb-6 block" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {item.numeral}
                    </span>
                    <h3 className="text-xl font-light text-[#2a1f1a] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.label}</h3>
                    <p className="text-xs md:text-sm text-[#4a3020]/75 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 p-8 border-l-2 border-[#c8a951] bg-[#f7ebe1]">
              <p className="text-base md:text-lg text-[#2a1f1a] leading-relaxed italic font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                "I believe every person carries a unique cosmic blueprint written in the stars, in numbers, and in the crystals that call to them. My mission is to help you remember your own innate truth and live from sovereign clarity."
              </p>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#a5762a]">— Ekta, Founder of Selenite Soul</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EKTA'S STORY ─────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#f7ebe1]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#c8a951]/60" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a5762a]">Ekta's Origin</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a] mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  A Journey from Seeking to Guiding
                </h2>
                <p className="text-sm text-[#4a3020]/80 leading-relaxed mb-4 font-light">
                  Ekta's path to becoming a healer began not in a classroom, but in a moment of profound personal stillness. In 2012, during a pilgrimage to Haridwar, a sage placed a raw amethyst in her hands and said: <em className="italic text-[#2a1f1a]">"The Earth already knows your answer."</em>
                </p>
                <p className="text-sm text-[#4a3020]/80 leading-relaxed mb-4 font-light">
                  That moment cracked something open. Over the next decade, Ekta immersed herself in Vedic astrology (Jyotish), Pythagorean Numerology, intuitive Tarot reading, and crystal healing — studying formally in Pune, and privately with masters across India.
                </p>
                <p className="text-sm text-[#4a3020]/80 leading-relaxed font-light">
                  In 2019, Selenite Soul was born — not as a commercial entity, but as a sacred sanctuary. To bring these ancient tools into the hands of every modern seeker looking for grounded clarity and emotional restoration.
                </p>
              </div>

              <div className="relative" data-cursor="view">
                <div className="overflow-hidden rounded-sm border border-[#c8a951]/40 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=85&fm=webp&fit=crop&crop=top"
                    alt="Ekta — Founder of Selenite Soul"
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EKTA'S JOURNEY TIMELINE ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#1a0e08] text-white">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8a951] mb-2">Chronology</p>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>The Milestones of Mastery</h2>
          </ScrollReveal>

          <div className="space-y-6">
            {journey.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.06}>
                <div className="p-8 bg-[#24150c]/80 border border-[#c8a951]/25 rounded-sm hover:border-[#c8a951]/60 transition-all flex flex-col md:flex-row md:items-center gap-6">
                  <span className="text-3xl font-light text-[#c8a951] md:w-28 shrink-0" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {item.year}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl font-light text-white mb-1.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</h3>
                    <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUR DISCIPLINES ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#fdf8f4]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a5762a] mb-2">Sacred Services</p>
            <h2 className="text-3xl md:text-5xl font-light text-[#2a1f1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Explore the Four Disciplines</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((mod) => (
              <Link key={mod.title} href={mod.href}>
                <motion.div
                  className="border border-[#c8a951]/30 p-8 bg-white/90 rounded-sm group cursor-pointer h-full flex flex-col justify-between hover:border-[#c8a951] hover:shadow-xl transition-all"
                  whileHover={{ y: -4 }}
                >
                  <div>
                    <span className="text-3xl font-light text-[#a5762a] mb-4 block" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {mod.numeral}
                    </span>
                    <h4 className="text-xl font-light text-[#2a1f1a] mb-2 group-hover:text-[#a5762a] transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {mod.title}
                    </h4>
                    <p className="text-xs text-[#4a3020]/75 leading-relaxed font-light">{mod.desc}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#e8d9cf] flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#a5762a]">
                    <span>Explore Discipline</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND BELIEFS / SACRED COMMITMENTS ──────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-[#1a0e08] text-white">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a951] mb-2">Ethics & Vows</p>
            <h2 className="text-3xl md:text-5xl font-light text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Our Sacred Commitments</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#c8a951]/25 bg-[#22130a]/80 divide-y md:divide-y-0 divide-[#c8a951]/20 rounded-sm">
            {beliefs.map((v) => (
              <div key={v.title} className="p-8 md:p-10 flex flex-col justify-between group hover:bg-[#2c180e] transition-colors border-r-0 md:border-r border-[#c8a951]/20 last:border-r-0">
                <div>
                  <span className="text-2xl font-light text-[#c8a951] mb-4 block" style={{ fontFamily: "'Playfair Display', serif" }}>{v.numeral}</span>
                  <h3 className="text-lg font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{v.title}</h3>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#f7ebe1] text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-light text-[#2a1f1a] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Begin Your Journey with Ekta</h2>
          <p className="text-xs md:text-sm text-[#4a3020]/75 mb-8 max-w-md mx-auto leading-relaxed font-light">
            Whether you seek clarity through the stars, the cards, numbers, or healing crystals — Ekta is here to guide you home to yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kundali">
              <span className="inline-flex items-center gap-2 bg-[#c8a951] text-[#1a0e05] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-lg hover:shadow-[#c8a951]/30 transition-all">
                Free Kundali Reading <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/tarot">
              <span className="inline-flex items-center gap-2 border border-[#2a1f1a] text-[#2a1f1a] px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:bg-[#2a1f1a] hover:text-[#fdf8f4] transition-all">
                Book a Tarot Reading
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
