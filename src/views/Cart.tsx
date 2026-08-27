"use client";
import { useState } from "react";
import { useLocation } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag, ChevronLeft, ArrowRight, Tag, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Cart() {
  const [, navigate] = useLocation();
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const { isAuthenticated, setLoginModalOpen } = useAuth();

  const [promo, setPromo] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const discount = appliedCoupon?.discount || 0;
  const shipping = totalPrice - discount >= 999 ? 0 : 99;
  const total = Math.max(0, totalPrice - discount + shipping);

  const handleApplyPromo = async () => {
    if (!promo.trim()) return;
    setPromoLoading(true);
    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(promo)}&subtotal=${totalPrice}`);
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({ code: data.coupon.code, discount: data.discount });
        toast.success(data.message);
      } else {
        toast.error(data.message || "Invalid promo code");
      }
    } catch {
      toast.error("Failed to validate promo code");
    } finally {
      setPromoLoading(false);
    }
  };

  const handleProceedCheckout = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a]">
      <Header />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Title */}
        <ScrollReveal direction="up" className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-serif font-light tracking-wide">
            Your Sacred Bag
            {totalItems > 0 && (
              <span className="text-sm text-[#2a1f1a]/50 ml-2 font-sans">
                ({totalItems} item{totalItems !== 1 ? "s" : ""})
              </span>
            )}
          </h1>
          <motion.button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#a5762a]"
            whileHover={{ x: -3, color: "#2a1f1a" }}
            transition={{ duration: 0.18 }}
          >
            <ChevronLeft className="w-3 h-3" /> Continue Shopping
          </motion.button>
        </ScrollReveal>

        {/* Shipping progress bar */}
        {totalPrice > 0 && totalPrice < 999 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white border border-[#e8d9cf] p-4 rounded-sm"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#a5762a] mb-2">
              Add ₹{(999 - totalPrice).toLocaleString()} more for FREE Pan-India Express Delivery
            </p>
            <div className="h-1.5 bg-[#e8d9cf] overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-[#c8a951]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((totalPrice / 999) * 100, 100)}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
        {totalPrice >= 999 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-green-50 border border-green-200 p-3 text-center rounded-sm"
          >
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest">
              🎉 You've unlocked FREE Sacred Express Shipping!
            </p>
          </motion.div>
        )}

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
              <ShoppingBag className="w-16 h-16 text-[#c8a951]/40 mb-6" />
            </motion.div>
            <h2 className="text-2xl font-serif font-light text-[#2a1f1a] mb-2">Your Sacred Bag is Empty</h2>
            <p className="text-sm text-[#4a382e]/70 mb-8 font-light">
              Invite moon-energized crystals, mala beads, and astrology remedies into your aura.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={() => navigate("/shop")}
                className="bg-[#c8a951] text-[#1a0e05] px-10 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Crystals
              </motion.button>
              <motion.button
                onClick={() => navigate("/kundali")}
                className="border border-[#c8a951] text-[#a5762a] px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm"
                whileHover={{ backgroundColor: "#c8a951", color: "#1a0e05" }}
                whileTap={{ scale: 0.97 }}
              >
                ✨ Free Kundali Recommendation
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            {/* Cart Items List */}
            <div>
              <div className="hidden md:grid grid-cols-[1fr_120px_100px_40px] gap-4 pb-3 border-b border-[#e8d9cf] mb-2">
                {["Product", "Quantity", "Price", ""].map((h) => (
                  <span key={h} className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#a5762a]">
                    {h}
                  </span>
                ))}
              </div>

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_120px_100px_40px] gap-4 items-center py-5 border-b border-[#e8d9cf]"
                  >
                    {/* Product info */}
                    <div className="flex gap-4 items-start">
                      <motion.button
                        onClick={() => navigate(`/product/${item.product.id}`)}
                        className="w-20 h-20 md:w-24 md:h-24 bg-[#fdf8f4] overflow-hidden shrink-0 border border-[#e8d9cf] p-1"
                        whileHover={{ scale: 1.04 }}
                      >
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                      </motion.button>
                      <div className="flex-1 min-w-0">
                        <button onClick={() => navigate(`/product/${item.product.id}`)} className="text-left group">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-[#a5762a] mb-0.5">
                            {item.product.category}
                          </p>
                          <p className="text-sm font-medium text-[#2a1f1a] leading-tight group-hover:underline">
                            {item.product.name}
                          </p>
                        </button>
                        <p className="text-xs text-[#4a382e]/70 mt-1">{item.product.material}</p>
                        <p className="md:hidden text-sm font-medium mt-2">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                        
                        {/* Mobile Qty */}
                        <div className="md:hidden flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-[#e8d9cf] bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500/70 hover:text-red-600 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Qty */}
                    <div className="hidden md:flex items-center border border-[#e8d9cf] bg-white w-fit rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#fdf8f4]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-9 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#fdf8f4]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Desktop Price */}
                    <div className="hidden md:block">
                      <p className="text-sm font-bold text-[#2a1f1a]">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Desktop Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="hidden md:flex text-[#4a382e]/40 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary & Coupons */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="bg-white border border-[#e8d9cf] p-6 rounded-sm sticky top-24 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#a5762a] mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between text-[#4a382e]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#2a1f1a]">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#558253] font-semibold">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" /> Coupon ({appliedCoupon?.code})
                      </span>
                      <span>–₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#4a382e]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <strong className="text-[#558253]">FREE</strong> : `₹${shipping}`}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-[#a5762a]">
                      Promo Code
                    </label>
                    <Link href="/offers">
                      <span className="text-[9px] font-bold text-[#a5762a] underline cursor-pointer">
                        View Active Offers →
                      </span>
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SELENITE10"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value.toUpperCase())}
                      className="flex-1 border border-[#e8d9cf] bg-[#fdf8f4] px-3 py-2 text-xs outline-none focus:border-[#c8a951] uppercase font-mono rounded-sm"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoLoading || !promo.trim()}
                      className="px-4 py-2 bg-[#2a1f1a] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm disabled:opacity-40"
                    >
                      {promoLoading ? "..." : "Apply"}
                    </button>
                  </div>

                  {appliedCoupon && (
                    <p className="text-[10px] text-[#558253] font-semibold mt-2 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Code {appliedCoupon.code} applied (-₹{appliedCoupon.discount})
                    </p>
                  )}
                </div>

                <div className="border-t border-[#e8d9cf] pt-4 mb-6">
                  <div className="flex justify-between text-base font-bold text-[#2a1f1a]">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-[#4a382e]/60 mt-0.5">Inclusive of GST & Energization Ritual</p>
                </div>

                <motion.button
                  onClick={handleProceedCheckout}
                  className="w-full bg-[#c8a951] text-[#1a0e05] py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] rounded-sm shadow-md hover:shadow-[#c8a951]/30 transition-all cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
