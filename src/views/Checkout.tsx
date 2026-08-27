"use client";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, CreditCard, Smartphone, Landmark, Banknote, ShieldCheck, Tag, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { toast } from "sonner";

type PayMethod = "card" | "upi" | "netbanking" | "cod";
type Step = "info" | "payment";

export default function Checkout() {
  const [, navigate] = useLocation();
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated, setLoginModalOpen, refreshOrders } = useAuth();

  const [step, setStep] = useState<Step>("info");
  const [payMethod, setPayMethod] = useState<PayMethod>("upi");
  const [processing, setProcessing] = useState(false);
  const [guestProceeded, setGuestProceeded] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    bank: "HDFC Bank",
  });

  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; message: string } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Auto-fill from user profile
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  // Prompt AuthModal if unauthenticated and haven't chosen guest
  useEffect(() => {
    if (!isAuthenticated && !guestProceeded && items.length > 0) {
      setLoginModalOpen(true);
    }
  }, [isAuthenticated, guestProceeded, items.length, setLoginModalOpen]);

  const discount = appliedCoupon?.discount || 0;
  const shipping = totalPrice - discount >= 999 ? 0 : 99;
  const codFee = payMethod === "cod" ? 99 : 0;
  const total = Math.max(0, totalPrice - discount + shipping + codFee);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(couponInput)}&subtotal=${totalPrice}`);
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({ code: data.coupon.code, discount: data.discount, message: data.message });
        toast.success(data.message);
      } else {
        toast.error(data.message || "Invalid coupon code");
      }
    } catch {
      toast.error("Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.address || !form.pincode) {
      toast.error("Please fill in all delivery details");
      setStep("info");
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: form.email,
          userName: form.name,
          userPhone: form.phone,
          items: items.map((it) => ({
            id: it.id,
            name: it.name,
            price: it.price,
            quantity: it.quantity,
            image: it.image,
            selectedColor: it.selectedColor,
          })),
          subtotal: totalPrice,
          discount,
          couponCode: appliedCoupon?.code || "",
          shipping,
          total,
          paymentMethod: payMethod,
          shippingAddress: {
            fullName: form.name,
            phone: form.phone,
            addressLine: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        await refreshOrders();
        clearCart();
        navigate(`/payment-success?orderId=${data.order.id}`);
      } else {
        toast.error(data.error || "Order placement failed");
        setProcessing(false);
      }
    } catch {
      toast.error("Network error while creating order");
      setProcessing(false);
    }
  };

  if (items.length === 0 && !processing) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a]">
      <Header />
      <AuthModal onGuestContinue={() => setGuestProceeded(true)} />

      {/* Progress Header */}
      <div className="bg-white border-b border-[#e8d9cf] px-4 py-4">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <button
            onClick={() => (step === "payment" ? setStep("info") : navigate("/cart"))}
            className="flex items-center gap-1.5 text-xs text-[#4a382e]/70 hover:text-[#2a1f1a]"
          >
            <ChevronLeft className="w-4 h-4" /> {step === "payment" ? "Back to Delivery" : "Back to Cart"}
          </button>

          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <span className={step === "info" ? "text-[#a5762a]" : "text-green-600"}>
              1. Delivery Details
            </span>
            <span className="text-[#e8d9cf]">•</span>
            <span className={step === "payment" ? "text-[#a5762a]" : "text-[#4a382e]/40"}>
              2. Payment & Blessing
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          {/* Left Form Area */}
          <div>
            {step === "info" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-white border border-[#e8d9cf] p-6 sm:p-8 rounded-sm shadow-sm">
                  <h3 className="text-xl font-serif font-light text-[#2a1f1a] mb-6">Delivery Address</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="e.g. Priya Sharma"
                          className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                          Email Address (for Invoice & Updates) *
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="e.g. priya@gmail.com"
                          className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                        Mobile Phone Number (for Courier SMS Tracking) *
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                        Flat / House No., Apartment, Street Address *
                      </label>
                      <input
                        required
                        value={form.address}
                        onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                        placeholder="e.g. B-402, Lotus Residency, MG Road"
                        className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                          City *
                        </label>
                        <input
                          required
                          value={form.city}
                          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                          placeholder="Mumbai"
                          className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                          State *
                        </label>
                        <input
                          required
                          value={form.state}
                          onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                          placeholder="Maharashtra"
                          className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                          Pincode *
                        </label>
                        <input
                          required
                          value={form.pincode}
                          onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
                          placeholder="400001"
                          className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!form.name || !form.email || !form.address || !form.pincode) {
                        toast.error("Please fill in all delivery details");
                        return;
                      }
                      setStep("payment");
                    }}
                    className="w-full mt-8 bg-[#c8a951] text-[#1a0e05] py-4 text-[10px] font-bold uppercase tracking-[0.22em] rounded-sm shadow-md hover:shadow-[#c8a951]/30 transition-all cursor-pointer"
                  >
                    Continue to Payment & Review →
                  </button>
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-white border border-[#e8d9cf] p-6 sm:p-8 rounded-sm shadow-sm">
                  <h3 className="text-xl font-serif font-light text-[#2a1f1a] mb-6">Select Payment Method</h3>

                  <div className="space-y-3 mb-6">
                    {[
                      { id: "upi", label: "UPI Instant (Google Pay, PhonePe, Paytm)", icon: Smartphone },
                      { id: "card", label: "Credit / Debit Card (Visa, Mastercard, RuPay)", icon: CreditCard },
                      { id: "netbanking", label: "Net Banking (All Indian Banks)", icon: Landmark },
                      { id: "cod", label: "Cash on Delivery (₹99 handling fee)", icon: Banknote },
                    ].map((p) => {
                      const Icon = p.icon;
                      const isSel = payMethod === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setPayMethod(p.id as any)}
                          className={`p-4 border rounded-sm flex items-center justify-between cursor-pointer transition-colors ${
                            isSel ? "border-[#c8a951] bg-[#fdf8f4]" : "border-[#e8d9cf] hover:border-[#c8a951]/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-[#a5762a]" />
                            <span className="text-xs font-semibold text-[#2a1f1a]">{p.label}</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSel ? "border-[#c8a951] bg-[#c8a951]" : "border-[#e8d9cf]"}`}>
                            {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Payment Details Input */}
                  {payMethod === "upi" && (
                    <div className="p-4 bg-[#fcf8f4] border border-[#e8d9cf] rounded-sm mb-6">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                        Your UPI ID / VPA
                      </label>
                      <input
                        value={form.upiId}
                        onChange={(e) => setForm((f) => ({ ...f, upiId: e.target.value }))}
                        placeholder="yourname@okhdfcbank"
                        className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none rounded-sm"
                      />
                    </div>
                  )}

                  {payMethod === "card" && (
                    <div className="p-4 bg-[#fcf8f4] border border-[#e8d9cf] rounded-sm mb-6 space-y-3">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1">
                          Card Number
                        </label>
                        <input
                          value={form.cardNumber}
                          onChange={(e) => setForm((f) => ({ ...f, cardNumber: e.target.value }))}
                          placeholder="4532 •••• •••• 8842"
                          className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          placeholder="MM/YY"
                          value={form.expiry}
                          onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))}
                          className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                        />
                        <input
                          placeholder="CVV"
                          type="password"
                          maxLength={4}
                          value={form.cvv}
                          onChange={(e) => setForm((f) => ({ ...f, cvv: e.target.value }))}
                          className="w-full bg-white border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    className="w-full bg-[#c8a951] text-[#1a0e05] py-4 text-[10px] font-bold uppercase tracking-[0.24em] rounded-sm shadow-lg hover:shadow-[#c8a951]/40 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {processing ? "Blessing & Confirming Order..." : `Place Sacred Order (₹${total})`}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Order Summary & Coupon Engine */}
          <div className="space-y-6">
            <div className="bg-white border border-[#e8d9cf] p-6 rounded-sm shadow-sm">
              <h3 className="text-lg font-serif font-light text-[#2a1f1a] mb-4">Order Summary</h3>

              {/* Items List */}
              <div className="divide-y divide-[#f7f1ec] max-h-60 overflow-y-auto mb-4 pr-1">
                {items.map((it) => (
                  <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="w-10 h-10 object-contain bg-[#fdf8f4] p-1 border border-[#e8d9cf]" />
                      <div>
                        <p className="font-medium text-[#2a1f1a] line-clamp-1">{it.name}</p>
                        <p className="text-[10px] text-[#4a382e]/60">Qty: {it.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#2a1f1a]">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-4 border-t border-[#e8d9cf] mb-4">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="e.g. SELENITE10"
                    className="flex-1 bg-[#fdf8f4] border border-[#e8d9cf] px-3 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm uppercase font-mono"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading || !couponInput.trim()}
                    className="bg-[#2a1f1a] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-sm disabled:opacity-40"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>

                {appliedCoupon && (
                  <p className="text-[10px] text-[#558253] font-semibold mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> {appliedCoupon.code} applied (-₹{appliedCoupon.discount})
                  </p>
                )}
              </form>

              {/* Cost Calculations */}
              <div className="space-y-2 pt-4 border-t border-[#e8d9cf] text-xs">
                <div className="flex justify-between text-[#4a382e]">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#558253] font-semibold">
                    <span>Blessing Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#4a382e]">
                  <span>Pan-India Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-[#558253]">FREE</strong> : `₹${shipping}`}</span>
                </div>
                {payMethod === "cod" && (
                  <div className="flex justify-between text-[#4a382e]">
                    <span>COD Convenience Fee</span>
                    <span>₹99</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#2a1f1a] pt-3 border-t border-[#e8d9cf]">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-4 bg-[#f7efe6] border border-[#e8d9cf] rounded-sm text-center text-[10px] text-[#4a382e]/80 space-y-1">
              <p className="font-bold flex items-center justify-center gap-1 text-[#a5762a]">
                <ShieldCheck className="w-4 h-4" /> 100% Encrypted & Safe Checkout
              </p>
              <p>Lab-Certified Genuine Crystals · Energized Under Full Moon</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
