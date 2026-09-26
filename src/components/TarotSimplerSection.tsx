"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle, Calendar, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface ReadingType {
  id: string;
  title: string;
  desc: string;
  bgColor: string;
  iconColor: string;
  icon: (color: string) => React.ReactNode;
}

const READING_TYPES: ReadingType[] = [
  {
    id: "love",
    title: "Love & Relationships",
    desc: "Gain clarity on your current relationship, a new connection or your heart's next chapter.",
    bgColor: "bg-[#faece7]",
    iconColor: "#c27464",
    icon: (color) => (
      <svg className="w-8 h-8 fill-none" style={{ stroke: color }} viewBox="0 0 24 24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "career",
    title: "Career & Work",
    desc: "Explore opportunities, make confident decisions and align your work with your purpose.",
    bgColor: "bg-[#fbf1db]",
    iconColor: "#b28637",
    icon: (color) => (
      <svg className="w-8 h-8 fill-none" style={{ stroke: color }} viewBox="0 0 24 24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </svg>
    ),
  },
  {
    id: "general",
    title: "General Guidance",
    desc: "Ask anything. Get intuitive insights and guidance for where you are right now.",
    bgColor: "bg-[#f3ebf6]",
    iconColor: "#8f6ea8",
    icon: (color) => (
      <svg className="w-8 h-8 fill-none" style={{ stroke: color }} viewBox="0 0 24 24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    id: "year-ahead",
    title: "Year Ahead Reading",
    desc: "A broader look at the energy, opportunities and themes for the year ahead.",
    bgColor: "bg-[#eaf1ea]",
    iconColor: "#5f8563",
    icon: (color) => (
      <svg className="w-8 h-8 fill-none" style={{ stroke: color }} viewBox="0 0 24 24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V11" />
        <path d="M12 11C12 6 7 4 2 5c0 5 3 9 10 9" />
        <path d="M12 11c0-5 5-7 10-6 0 5-3 9-10 9" />
        <circle cx="12" cy="4" r="1.8" />
      </svg>
    ),
  },
];

const PROCESS_STEPS = [
  {
    step: "1. BOOK",
    desc: "Choose your reading and preferred time.",
    icon: <Calendar className="w-5 h-5 text-[#8c6b4b] stroke-[1.5]" />,
  },
  {
    step: "2. CONNECT",
    desc: "You'll receive details on WhatsApp / email.",
    icon: <MessageCircle className="w-5 h-5 text-[#8c6b4b] stroke-[1.5]" />,
  },
  {
    step: "3. YOUR READING",
    desc: "Join your session (online) at the scheduled time.",
    icon: (
      <svg className="w-5 h-5 stroke-[#8c6b4b] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="10" height="15" rx="1" transform="rotate(-9 8 12.5)" />
        <rect x="11" y="4" width="10" height="15" rx="1" transform="rotate(7 16 11.5)" />
      </svg>
    ),
  },
  {
    step: "4. INTEGRATE",
    desc: "Receive guidance and simple next steps.",
    icon: (
      <svg className="w-5 h-5 stroke-[#8c6b4b] fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V10" />
        <path d="M12 10c-3 0-6 2-6 5s3 5 6 5" />
        <path d="M12 6c3 0 6 2 6 5s-3 5-6 5" />
      </svg>
    ),
  },
];

export default function TarotSimplerSection() {
  const [selectedReading, setSelectedReading] = useState<string | null>(null);
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        <div className="mb-10 md:mb-14">
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-[#a5762a] mb-2.5">
            CHOOSE A READING
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2
              className="text-3xl sm:text-4xl md:text-[44px] font-light text-[#2a1f1a] leading-tight"
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
              className="bg-white border border-[#e8d9cf] p-7 md:p-8 flex flex-col items-center text-center rounded-sm shadow-xs hover:shadow-md hover:border-[#c8a951]/70 transition-all"
            >
              {/* Soft Circular Icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xs ${item.bgColor}`}
              >
                {item.icon(item.iconColor)}
              </div>

              {/* Title */}
              <h3
                className="text-lg md:text-[19px] font-serif font-light text-[#2a1f1a] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] md:text-[12.5px] text-[#6b5645] leading-relaxed mb-6 font-light flex-1">
                {item.desc}
              </p>

              {/* Book Now Button */}
              <button
                type="button"
                onClick={() => handleOpenBooking(item.title)}
                className="px-5 py-2 border border-[#d8c5b4] text-[#2a1f1a] hover:border-[#2a1f1a] hover:bg-[#2a1f1a] hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest rounded-xs cursor-pointer inline-flex items-center gap-1.5"
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
          <div className="lg:col-span-7 bg-[#fbf7f2] border border-[#e8d9cf] p-6 sm:p-8 md:p-10 flex flex-col justify-between rounded-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a5762a] mb-2">
                HOW IT WORKS
              </p>
              <h3
                className="text-2xl sm:text-3xl font-light text-[#2a1f1a] mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                A Simple, Soulful Process
              </h3>

              {/* 4 Process Items */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative">
                {PROCESS_STEPS.map((step, idx) => (
                  <div key={step.step} className="flex flex-col items-center text-center relative px-1">
                    {/* Circle icon */}
                    <div className="w-13 h-13 rounded-full bg-[#f2e6dc] border border-[#e8d9cf]/60 flex items-center justify-center mb-3.5 shadow-xs">
                      {step.icon}
                    </div>

                    {/* Step label */}
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2a1f1a] mb-1.5">
                      {step.step}
                    </h4>

                    {/* Step subtitle */}
                    <p className="text-[11px] text-[#6b5645] leading-relaxed font-light">
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

          {/* Right: Quote Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#f8ece2] via-[#f5e6da] to-[#ecdcd0] border border-[#e8d9cf] p-8 md:p-10 flex flex-col justify-between text-center relative overflow-hidden rounded-sm shadow-xs">
            {/* Subtle botanical branch background watermark */}
            <div className="absolute right-0 bottom-0 pointer-events-none opacity-20">
              <svg className="w-44 h-44 stroke-[#8c6b4b] fill-none" viewBox="0 0 100 100" strokeWidth="1">
                <path d="M20 90 Q 60 70 80 20" />
                <path d="M45 75 Q 35 60 40 50 Q 55 58 45 75" />
                <path d="M60 55 Q 75 45 70 35 Q 55 45 60 55" />
                <path d="M70 38 Q 85 28 80 18 Q 68 28 70 38" />
              </svg>
            </div>

            {/* Top quote glyph */}
            <div className="mb-4">
              <svg className="w-8 h-8 fill-[#a5762a]/40 mx-auto" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote content */}
            <blockquote className="my-auto py-2">
              <p
                className="text-[15px] sm:text-[16px] md:text-[17px] font-serif italic text-[#2a1f1a] leading-relaxed max-w-sm mx-auto"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "Tarot doesn't predict your future - it helps you see your possibilities more clearly."
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a5762a] mt-4">
                - EKTAZ
              </p>
            </blockquote>

            {/* Bottom Mantra */}
            <p className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-[#7d6554] mt-6 border-t border-[#e2d0c2] pt-4">
              TRUST THE CARDS. TRUST YOURSELF.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. GUIDED WITH INTENTION (Banner with Image)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        <div className="bg-[#f7efe6] border border-[#e8d9cf] rounded-sm overflow-hidden shadow-xs flex flex-col lg:flex-row items-center">
          {/* Left Altar Image with Amethyst & Smoke */}
          <div className="w-full lg:w-[45%] h-[260px] sm:h-[320px] lg:h-[380px] relative overflow-hidden shrink-0">
            <img
              src="/tarot-intention-altar.jpg"
              alt="Raw amethyst crystal cluster with sacred herbal incense bowl and gentle rising smoke"
              className="w-full h-full object-cover object-center select-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Banner Content */}
          <div className="p-7 sm:p-10 lg:p-12 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a5762a] mb-2.5">
                A SAFE, SACRED SPACE
              </p>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2a1f1a] mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Guided with Intention
              </h3>
              <p className="text-xs sm:text-[13.5px] text-[#5a483e] leading-relaxed font-light mb-7">
                Every reading is a space for honest conversations, intuitive insights and compassionate guidance. You're welcome to ask anything with an open heart and an open mind.
              </p>
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="bg-[#9e6d44] hover:bg-[#885a33] text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-2 rounded-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM HIGHLIGHT STRIP (3 Highlights)
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e8d9cf] bg-white/70 py-8 md:py-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8d9cf]">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
              <svg className="w-8 h-8 stroke-[#a5762a] fill-none mb-2" viewBox="0 0 24 24" strokeWidth="1.3">
                <path d="M12 4c-1.5 3-3 6.5-3 10a3 3 0 0 0 6 0c0-3.5-1.5-7-3-10z" />
                <path d="M9 14c-2.5-1-5-1-7 1 2 3.5 5 4 7 2" />
                <path d="M15 14c2.5-1 5-1 7 1-2 3.5-5 4-7 2" />
              </svg>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2a1f1a] mb-1">
                INTUITIVE GUIDANCE
              </h4>
              <p className="text-xs text-[#6b5645] font-light">
                Messages that resonate
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
              <svg className="w-8 h-8 stroke-[#a5762a] fill-none mb-2" viewBox="0 0 24 24" strokeWidth="1.3">
                <path d="M12 22V2" />
                <path d="M12 6c3 0 6 2 6 5s-3 5-6 5" />
                <path d="M12 11c-3 0-6 2-6 5s3 5 6 5" />
              </svg>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2a1f1a] mb-1">
                A JUDGEMENT-FREE SPACE
              </h4>
              <p className="text-xs text-[#6b5645] font-light">
                Be open, be yourself
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center px-4 py-4 md:py-0">
              <svg className="w-8 h-8 stroke-[#a5762a] fill-none mb-2" viewBox="0 0 24 24" strokeWidth="1.3">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 3 14.5 9.5 21 12 14.5 14.5 12 21 9.5 14.5 3 12 9.5 9.5" />
              </svg>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2a1f1a] mb-1">
                TOOLS FOR REAL LIFE
              </h4>
              <p className="text-xs text-[#6b5645] font-light">
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
