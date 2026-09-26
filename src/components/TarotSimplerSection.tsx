"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ReadingType {
  id: string;
  title: string;
  desc: string;
  image: string;
}

const READING_TYPES: ReadingType[] = [
  {
    id: "love",
    title: "Love & Relationships",
    desc: "Gain clarity on your current relationship, a new connection or your heart's next chapter.",
    image: "/tarot-icon-love.jpg",
  },
  {
    id: "career",
    title: "Career & Work",
    desc: "Explore opportunities, make confident decisions and align your work with your purpose.",
    image: "/tarot-icon-career.jpg",
  },
  {
    id: "general",
    title: "General Guidance",
    desc: "Ask anything. Get intuitive insights and guidance for where you are right now.",
    image: "/tarot-icon-guidance.jpg",
  },
  {
    id: "year-ahead",
    title: "Year Ahead Reading",
    desc: "A broader look at the energy, opportunities and themes for the year ahead.",
    image: "/tarot-icon-year.jpg",
  },
];

const PROCESS_STEPS = [
  {
    step: "1. BOOK",
    desc: "Choose your reading and preferred time.",
    image: "/tarot-step-book.jpg",
  },
  {
    step: "2. CONNECT",
    desc: "You'll receive details on WhatsApp / email.",
    image: "/tarot-step-connect.jpg",
  },
  {
    step: "3. YOUR READING",
    desc: "Join your session (online) at the scheduled time.",
    image: "/tarot-step-reading.jpg",
  },
  {
    step: "4. INTEGRATE",
    desc: "Receive guidance and simple next steps.",
    image: "/tarot-step-integrate.jpg",
  },
];

export default function TarotSimplerSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "11:30 AM - 12:30 PM (IST)",
    readingType: "Love & Relationships",
    message: "",
  });

  const handleOpenBooking = (readingTitle?: string) => {
    if (readingTitle) {
      setForm((prev) => ({ ...prev, readingType: readingTitle }));
    }
    setBookingSuccess(false);
    setIsModalOpen(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) {
      toast.error("Please enter your name, email, and preferred date.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingSuccess(true);
      toast.success("Consultation scheduled! Ektaz will confirm on WhatsApp / Email.");
    }, 1000);
  };

  return (
    <div className="w-full bg-[#fdfaf6] text-[#2a1f1a]">
      {/* ─────────────────────────────────────────────────────────────
          1. CHOOSE A READING (4 Cards)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-[#8c6b4b] mb-2">
            CHOOSE A READING
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2
              className="text-3xl sm:text-4xl md:text-[44px] font-light text-[#1a0e05] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Read the Signs. Find Your Clarity.
            </h2>
            <div className="flex items-center gap-3">
              <div className="hidden lg:block w-16 h-px bg-[#d8c5b4]" />
              <span className="text-[9.5px] md:text-[10.5px] font-medium tracking-[0.25em] text-[#7d6554] uppercase">
                YOUR STORY. THE CARDS. A CLEARER YOU.
              </span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {READING_TYPES.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-[#e8dcd0] p-7 md:p-8 flex flex-col items-center text-center rounded-sm shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#c8a951]/70 transition-all"
            >
              {/* Exact Circular Watercolor Icon */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden mb-6 flex items-center justify-center select-none pointer-events-none bg-white">
                <img
                  src={`${item.image}?v=2`}
                  alt={item.title}
                  className="w-full h-full object-cover object-center scale-135"
                />
              </div>

              {/* Title */}
              <h3
                className="text-lg md:text-[20px] font-serif font-light text-[#1a0e05] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[12.5px] md:text-[13px] text-[#5c4a3e] leading-relaxed mb-6 font-light flex-1">
                {item.desc}
              </p>

              {/* Exact Book Now Button */}
              <button
                type="button"
                onClick={() => handleOpenBooking(item.title)}
                className="px-6 py-2.5 border border-[#c2a278] text-[#8c6b4b] hover:border-[#1a0e05] hover:bg-[#1a0e05] hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] rounded-xs cursor-pointer inline-flex items-center gap-2"
              >
                <span>BOOK NOW</span>
                <span>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. HOW IT WORKS & QUOTE CARD
         ───────────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto border-t border-[#ede0d4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Left: 4-Step Process (7 cols) */}
          <div className="lg:col-span-7 bg-[#fbf7f2] border border-[#e8dcd0] p-6 sm:p-8 md:p-10 flex flex-col justify-between rounded-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8c6b4b] mb-2">
                HOW IT WORKS
              </p>
              <h3
                className="text-2xl sm:text-3xl font-light text-[#1a0e05] mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                A Simple, Soulful Process
              </h3>

              {/* 4 Process Items */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative">
                {PROCESS_STEPS.map((step, idx) => (
                  <div key={step.step} className="flex flex-col items-center text-center relative px-1">
                    {/* Circle icon with exact image */}
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3.5 shadow-xs select-none pointer-events-none bg-[#f2e6dc]">
                      <img
                        src={`${step.image}?v=2`}
                        alt={step.step}
                        className="w-full h-full object-cover object-center scale-135"
                      />
                    </div>

                    {/* Step label */}
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1a0e05] mb-1.5">
                      {step.step}
                    </h4>

                    {/* Step subtitle */}
                    <p className="text-[11.5px] text-[#5c4a3e] leading-relaxed font-light">
                      {step.desc}
                    </p>

                    {/* Desktop divider arrow between steps */}
                    {idx < PROCESS_STEPS.length - 1 && (
                      <div className="hidden sm:block absolute top-6 -right-2 text-[#bfa48e] text-xs font-light pointer-events-none">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Exact Blush Watercolor Quote Card (5 cols) */}
          <div
            className="lg:col-span-5 border border-[#e8dcd0] p-8 md:p-10 flex flex-col justify-between text-center relative overflow-hidden rounded-sm shadow-xs min-h-[360px]"
            style={{
              backgroundImage: "url('/tarot-quote-bg.jpg?v=2')",
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
          >
            {/* Top quote glyph */}
            <div className="mb-2">
              <span
                className="text-4xl text-[#a5762a] font-serif leading-none block"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                “
              </span>
            </div>

            {/* Quote content */}
            <blockquote className="my-auto py-2">
              <p
                className="text-[16px] sm:text-[17px] md:text-[18px] font-serif italic text-[#1a0e05] leading-relaxed max-w-sm mx-auto"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "Tarot doesn't predict your future — it helps you see your possibilities more clearly."
              </p>
              <div className="w-8 h-px bg-[#c2a278] mx-auto my-3.5" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#1a0e05]">
                — EKTA
              </p>
            </blockquote>

            {/* Bottom Mantra */}
            <div className="mt-4 pt-3 border-t border-[#d8c5b4]/50">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#7d6554]">
                TRUST THE CARDS.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#7d6554] mt-0.5">
                TRUST YOURSELF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. GUIDED WITH INTENTION (Banner with Exact Altar Image)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        <div className="bg-[#fbf7f2] border border-[#e8dcd0] rounded-sm overflow-hidden shadow-xs flex flex-col lg:flex-row items-center">
          {/* Left Altar Image with Amethyst & Smoke */}
          <div className="w-full lg:w-[42%] h-[260px] sm:h-[320px] lg:h-[380px] relative overflow-hidden shrink-0">
            <img
              src="/tarot-sacred-altar.jpg"
              alt="Raw amethyst crystal cluster with sacred herbal incense bowl and gentle rising smoke"
              className="w-full h-full object-cover object-center select-none"
              draggable={false}
            />
          </div>

          {/* Right Banner Content */}
          <div className="p-7 sm:p-10 lg:p-12 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8c6b4b] mb-2.5">
                A SAFE, SACRED SPACE
              </p>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1a0e05] mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Guided with Intention
              </h3>
              <p className="text-xs sm:text-[13.5px] text-[#5c4a3e] leading-relaxed font-light mb-7">
                Every reading is a space for honest conversations, intuitive insights and compassionate guidance. You're welcome to ask anything — with an open heart and an open mind.
              </p>
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="bg-[#a5762a] hover:bg-[#8c6020] text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-2 rounded-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>BOOK YOUR TAROT READING</span>
                <span>→</span>
              </button>
            </div>

            {/* Vertical Accent Glyphs & Mantra Words */}
            <div className="hidden sm:flex flex-col items-center justify-center border-l border-[#e2d0c2] pl-8 shrink-0 text-center">
              {/* Moon glyph */}
              <svg className="w-5 h-5 stroke-[#b88c3a] fill-none mb-1.5" viewBox="0 0 24 24" strokeWidth="1.4">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              {/* Four-point Sparkle */}
              <svg className="w-4 h-4 fill-[#b88c3a]/75 mb-4" viewBox="0 0 24 24">
                <path d="M12 2l2.2 7.8 7.8 2.2-7.8 2.2-2.2 7.8-2.2-7.8-7.8-2.2 7.8-2.2z" />
              </svg>

              <div className="flex flex-col gap-2.5 text-[9px] font-mono tracking-[0.35em] text-[#7d6554] uppercase">
                <span>CLARITY</span>
                <span>PEACE</span>
                <span>PERSPECTIVE</span>
                <span>YOU</span>
              </div>
              <div className="w-6 h-0.5 bg-[#b88c3a]/60 mx-auto mt-3" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM HIGHLIGHT STRIP (3 Highlights)
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e8dcd0] bg-white py-8 md:py-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8dcd0]">
            {/* Feature 1: Lotus Flower */}
            <div className="flex flex-col items-center text-center px-6 py-4 md:py-0">
              <svg className="w-9 h-9 stroke-[#a5762a] fill-none mb-2.5" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4c-1.5 3-3 6.5-3 10a3 3 0 0 0 6 0c0-3.5-1.5-7-3-10z" />
                <path d="M9 14c-2.5-1-5-1-7 1 2 3.5 5 4 7 2" />
                <path d="M15 14c2.5-1 5-1 7 1-2 3.5-5 4-7 2" />
                <path d="M12 17c-2 2-5 2-8 1 2 2 5 2 8 0" />
                <path d="M12 17c2 2 5 2 8 1-2 2-5 2-8 0" />
              </svg>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a0e05] mb-1">
                INTUITIVE GUIDANCE
              </h4>
              <p className="text-xs text-[#5c4a3e] font-light">
                Messages that resonate
              </p>
            </div>

            {/* Feature 2: Botanical Leaf */}
            <div className="flex flex-col items-center text-center px-6 py-4 md:py-0">
              <svg className="w-9 h-9 stroke-[#a5762a] fill-none mb-2.5" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V3" />
                <path d="M12 6c3 0 6 2 6 5s-3 5-6 5" />
                <path d="M12 11c-3 0-6 2-6 5s3 5 6 5" />
                <path d="M12 16c3 0 6 1.5 6 4s-3 4-6 4" />
              </svg>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a0e05] mb-1">
                A JUDGEMENT-FREE SPACE
              </h4>
              <p className="text-xs text-[#5c4a3e] font-light">
                Be open, be yourself
              </p>
            </div>

            {/* Feature 3: 4-Point Star */}
            <div className="flex flex-col items-center text-center px-6 py-4 md:py-0">
              <svg className="w-9 h-9 stroke-[#a5762a] fill-none mb-2.5" viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
              </svg>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a0e05] mb-1">
                TOOLS FOR REAL LIFE
              </h4>
              <p className="text-xs text-[#5c4a3e] font-light">
                Practical insights, deeper clarity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. BOOKING MODAL
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-xl bg-[#fdfaf6] border border-[#c8a951]/50 p-6 sm:p-8 rounded-sm shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#e8d9cf] flex items-center justify-center text-[#2a1f1a] hover:bg-[#2a1f1a] hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#c8a951]/20 border border-[#c8a951] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-[#a5762a]" />
                  </div>
                  <h3
                    className="text-2xl font-serif text-[#2a1f1a] mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Booking Request Confirmed
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6b5645] leading-relaxed max-w-md mx-auto mb-6 font-light">
                    Thank you, {form.name}. Ektaz will personally confirm your session details and WhatsApp / Zoom link within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-[#2a1f1a] text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xs"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  <div className="text-center mb-5">
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-[#a5762a] mb-1">
                      SACRED CONSULTATION
                    </p>
                    <h3
                      className="text-2xl font-serif text-[#2a1f1a]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Book Your Reading with Ektaz
                    </h3>
                  </div>

                  {/* Reading Type Selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5762a] mb-1.5">
                      Type of Reading
                    </label>
                    <select
                      name="readingType"
                      value={form.readingType}
                      onChange={handleFormChange}
                      className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#a5762a] rounded-xs"
                    >
                      {READING_TYPES.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5762a] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        required
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#a5762a] rounded-xs placeholder:text-[#2a1f1a]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5762a] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleFormChange}
                        required
                        placeholder="priya@example.com"
                        className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#a5762a] rounded-xs placeholder:text-[#2a1f1a]/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5762a] mb-1.5">
                        WhatsApp / Phone *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#a5762a] rounded-xs placeholder:text-[#2a1f1a]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5762a] mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#a5762a] rounded-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5762a] mb-1.5">
                      Preferred Time Window
                    </label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleFormChange}
                      className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#a5762a] rounded-xs"
                    >
                      <option>10:00 AM - 11:00 AM (IST)</option>
                      <option>11:30 AM - 12:30 PM (IST)</option>
                      <option>02:00 PM - 03:00 PM (IST)</option>
                      <option>04:30 PM - 05:30 PM (IST)</option>
                      <option>07:00 PM - 08:00 PM (IST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5762a] mb-1.5">
                      Question or Intention (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      rows={2}
                      placeholder="Share what area of life you seek clarity on..."
                      className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#a5762a] rounded-xs resize-none placeholder:text-[#2a1f1a]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2a1f1a] hover:bg-[#43322b] text-white py-3.5 text-[10.5px] font-bold uppercase tracking-widest rounded-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <span>Reserving...</span>
                    ) : (
                      <>
                        <span>Confirm & Schedule</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[9.5px] text-center text-[#6b5645] font-light">
                    Private and 100% confidential. Ektaz ensures personal 1-on-1 focus.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
