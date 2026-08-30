"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Package, Search, Truck, CheckCircle, Clock, MapPin, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/lib/db/types";
import { Link } from "wouter";

const TRACKING_STAGES = [
  { stage: "Order Confirmed", desc: "Order placed & sacred invoice generated" },
  { stage: "Full Moon Consecration", desc: "Cleansed with singing bowls & moonlight" },
  { stage: "Lab Tested & Certified", desc: "Mineral authentication verified" },
  { stage: "Dispatched", desc: "Picked up by BlueDart Express / DTDC" },
  { stage: "In Transit", desc: "On the way to your destination city" },
  { stage: "Delivered", desc: "Received at your sacred doorstep" },
];

export default function Orders() {
  const { user, userOrders } = useAuth();
  const [trackId, setTrackId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async (idToTrack?: string) => {
    const searchId = (idToTrack || trackId).trim();
    if (!searchId) return;
    setLoading(true);
    setNotFound(false);
    setTrackedOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(searchId)}`);
      const data = await res.json();
      if (data.success && data.order) {
        setTrackedOrder(data.order);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const getStageIndex = (status: string) => {
    switch (status) {
      case "Order Confirmed": return 0;
      case "Full Moon Consecration": return 1;
      case "Lab Tested & Certified": return 2;
      case "Dispatched": return 3;
      case "In Transit": return 4;
      case "Delivered": return 5;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a]">
      <Header />

      {/* Header Banner */}
      <section className="pt-20 pb-12 px-4 sm:px-6 text-center bg-[#f7efe6] border-b border-[#e8d9cf]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 justify-center text-[#a5762a] mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Sacred Logistics</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-light text-[#2a1f1a] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Track Your Sacred Order
          </h1>
          <p className="text-sm text-[#4a382e]/80 font-light">
            Enter your Order ID (e.g. SS-2026-XXXX), tracking number, or mobile phone to track your package live.
          </p>
        </motion.div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-[1000px] mx-auto">
        {/* Track Form Box */}
        <div className="bg-white border border-[#c8a951]/40 p-6 sm:p-10 rounded-sm shadow-md mb-12">
          <h2 className="text-xl font-serif font-light text-[#2a1f1a] mb-4">Live Order Tracker</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleTrack(); }} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. SS-2026-4821 or 9876543210"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              className="flex-1 bg-[#fdf8f4] border border-[#e8d9cf] px-4 py-3 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#c8a951] text-[#1a0e05] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.22em] rounded-sm shadow-sm hover:shadow-[#c8a951]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Locating..." : <><Search className="w-4 h-4" /> Track Package</>}
            </button>
          </form>

          {/* Not found notice */}
          {notFound && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>No order found matching "{trackId}". Please double-check your Order ID or contact support.</span>
            </div>
          )}

          {/* Tracked Result Details */}
          <AnimatePresence>
            {trackedOrder && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-[#e8d9cf]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#e8d9cf]">
                  <div>
                    <span className="text-xs font-bold text-[#a5762a] uppercase tracking-widest">
                      Order #{trackedOrder.id}
                    </span>
                    <h3 className="text-2xl font-serif font-light text-[#2a1f1a] mt-0.5">
                      Status: {trackedOrder.orderStatus}
                    </h3>
                    <p className="text-xs text-[#4a382e]/70 mt-1">
                      Courier: <strong>{trackedOrder.courier}</strong> (AWB: {trackedOrder.trackingNumber})
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-[#a5762a] font-bold">Estimated Delivery</p>
                    <p className="text-base font-bold text-[#2a1f1a]">{trackedOrder.estimatedDelivery}</p>
                  </div>
                </div>

                {/* Visual 6-Stage Progress Stepper */}
                <div className="space-y-6 mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a5762a]">
                    Cosmic Journey Timeline
                  </p>
                  <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-[#c8a951]/40">
                    {TRACKING_STAGES.map((s, idx) => {
                      const currentIdx = getStageIndex(trackedOrder.orderStatus);
                      const isComplete = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={s.stage} className="relative">
                          {/* Dot Badge */}
                          <div
                            className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isComplete
                                ? "bg-[#c8a951] text-[#1a0e05] shadow-sm"
                                : "bg-[#fdf8f4] border border-[#e8d9cf] text-[#4a382e]/40"
                            }`}
                          >
                            {isComplete ? "✓" : idx + 1}
                          </div>

                          <div>
                            <h4
                              className={`text-sm font-semibold ${
                                isCurrent ? "text-[#a5762a]" : isComplete ? "text-[#2a1f1a]" : "text-[#4a382e]/40"
                              }`}
                            >
                              {s.stage}
                            </h4>
                            <p className="text-xs text-[#4a382e]/70 font-light mt-0.5">{s.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="p-4 bg-[#fcf8f4] border border-[#e8d9cf] rounded-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#a5762a] mb-3">
                    Items in this Package
                  </p>
                  <div className="space-y-2">
                    {trackedOrder.items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#2a1f1a]">• {it.name} (Qty: {it.quantity})</span>
                        <span className="font-bold text-[#2a1f1a]">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Authenticated User's Orders Section */}
        {user && userOrders.length > 0 && (
          <div>
            <h3 className="text-xl font-serif font-light text-[#2a1f1a] mb-6">Your Recent Sanctuary Orders</h3>
            <div className="space-y-4">
              {userOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-[#e8d9cf] p-5 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div>
                    <span className="text-xs font-bold text-[#2a1f1a]">Order #{order.id}</span>
                    <p className="text-xs text-[#4a382e]/60">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""} · Total: ₹{order.total} · Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => { setTrackId(order.id); handleTrack(order.id); }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#a5762a] hover:text-[#2a1f1a] underline cursor-pointer self-start sm:self-auto"
                  >
                    View Live Tracking →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
