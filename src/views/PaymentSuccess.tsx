"use client";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, Truck, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.6,
  duration: 1.8 + Math.random() * 1.2,
  size: 4 + Math.random() * 8,
  color: ["#c8a951", "#e8d9cf", "#f48fb1", "#9c6fc4", "#ffd54f", "#81c784"][i % 6],
}));

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const [orderId, setOrderId] = useState<string>("SS-2026-4821");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("orderId");
      if (id) setOrderId(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf8f4] flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Confetti particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: 800,
            opacity: [1, 1, 0],
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
            repeat: 1,
            repeatDelay: 0.5,
          }}
        />
      ))}

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="bg-white p-8 md:p-12 max-w-md w-full text-center relative z-10 shadow-2xl border border-[#c8a951]/40 rounded-sm"
      >
        {/* Pulsing check */}
        <div className="relative inline-flex mb-6">
          <motion.div
            className="absolute inset-0 rounded-full bg-[#c8a951]/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <CheckCircle className="w-16 h-16 text-[#558253]" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-center mb-2 text-[#a5762a]">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em]">Sacred Order Placed</p>
          </div>

          <h1
            className="text-3xl font-light text-[#2a1f1a] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Thank You, Seeker
          </h1>
          <p className="text-xs text-[#4a382e]/80 mb-6 leading-relaxed font-light">
            Your sacred order has been received and logged into our celestial records. Your crystals are now prepared for ritual consecration.
          </p>

          {/* Order ID Box */}
          <div className="bg-[#fdf8f4] border border-[#c8a951]/40 px-5 py-3.5 mb-6 flex items-center justify-between rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a5762a]">Order ID</span>
            <span className="text-sm font-mono font-bold text-[#2a1f1a]">#{orderId}</span>
          </div>

          {/* Timeline */}
          <div className="space-y-3 mb-8 text-left bg-white border border-[#e8d9cf] p-4 rounded-sm">
            {[
              { label: "Order Confirmed & Logged", time: "Just now", done: true },
              { label: "Full Moon Energy Cleansing", time: "Within 24 hrs", done: false },
              { label: "Lab Certification & Dispatch", time: "Day 2", done: false },
              { label: "Delivered to Doorstep", time: "3–5 days", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    step.done ? "bg-[#558253] border-[#558253]" : "border-[#e8d9cf]"
                  }`}
                >
                  {step.done && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <div className="flex-1 flex justify-between items-center text-xs">
                  <span className={step.done ? "text-[#2a1f1a] font-semibold" : "text-[#4a382e]/50"}>
                    {step.label}
                  </span>
                  <span className="text-[10px] text-[#4a382e]/50 font-mono">{step.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <Link href="/orders">
              <span className="w-full inline-flex items-center justify-center gap-2 bg-[#c8a951] text-[#1a0e05] py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-md hover:shadow-[#c8a951]/30 transition-all cursor-pointer">
                <Truck className="w-4 h-4" /> Live Tracking Timeline
              </span>
            </Link>
            <button
              onClick={() => navigate("/account")}
              className="w-full border border-[#e8d9cf] text-[#2a1f1a] py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#fdf8f4] transition-colors cursor-pointer"
            >
              View My Account & Orders
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="text-xs font-semibold text-[#a5762a] hover:underline pt-2 cursor-pointer"
            >
              Continue Shopping →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
