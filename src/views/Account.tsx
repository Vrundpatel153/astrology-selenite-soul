"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Link, useLocation } from "wouter";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  Sparkles,
  Truck,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function Account() {
  const [, navigate] = useLocation();
  const {
    user,
    isAuthenticated,
    setLoginModalOpen,
    logout,
    updateProfile,
    addresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    userOrders,
    refreshOrders,
    wishlistIds,
    toggleWishlist,
  } = useAuth();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "wishlist" | "settings">("overview");

  // Address modal
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  // Settings form
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    sunSign: "",
    moonSign: "",
    lifePathNumber: 7,
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        birthTime: user.birthTime || "",
        birthPlace: user.birthPlace || "",
        sunSign: user.sunSign || "Leo",
        moonSign: user.moonSign || "Cancer",
        lifePathNumber: user.lifePathNumber || 7,
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6 py-24">
          <div className="max-w-md w-full bg-white border border-[#c8a951]/40 p-8 sm:p-10 text-center shadow-xl rounded-sm">
            <div className="w-16 h-16 rounded-full bg-[#c8a951]/15 border border-[#c8a951] flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-8 h-8 text-[#a5762a]" />
            </div>
            <h2
              className="text-3xl font-light text-[#2a1f1a] mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Sign In to Your Soul Sanctuary
            </h2>
            <p className="text-sm text-[#4a382e]/80 mb-8 font-light leading-relaxed">
              Access your order timeline, saved delivery addresses, personalized crystal prescriptions, and loyalty rewards.
            </p>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="w-full bg-[#c8a951] text-[#1a0e05] py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] shadow-md hover:shadow-[#c8a951]/30 transition-all rounded-sm cursor-pointer"
            >
              Sign In or Register
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.addressLine || !newAddr.pincode) {
      toast.error("Please fill in all address details");
      return;
    }
    addAddress(newAddr);
    setNewAddr({ fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: "", isDefault: false });
    setAddressModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f4] text-[#2a1f1a]">
      <Header />

      {/* Top Welcome Strip */}
      <section className="pt-20 pb-10 px-4 sm:px-6 bg-[#f7efe6] border-b border-[#e8d9cf]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#c8a951]/20 border-2 border-[#c8a951] flex items-center justify-center text-2xl font-light font-serif text-[#a5762a] shadow-inner">
              {user?.name?.charAt(0) || "S"}
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {user?.loyaltyTier || "Initiate Seeker"}
              </span>
              <h1
                className="text-2xl sm:text-3xl font-light text-[#2a1f1a]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Welcome, {user?.name || "Beloved Seeker"}
              </h1>
              <p className="text-xs text-[#4a382e]/70 font-mono mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/kundali")}
              className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] border border-[#c8a951] text-[#a5762a] bg-white hover:bg-[#c8a951]/10 rounded-sm transition-colors"
            >
              My Kundali Chart
            </button>
            <button
              onClick={logout}
              className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4a382e]/70 hover:text-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-[#e8d9cf] sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1200px] mx-auto flex items-center overflow-x-auto select-none no-scrollbar">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "orders", label: `Orders (${userOrders.length})`, icon: Package },
            { id: "addresses", label: `Addresses (${addresses.length})`, icon: MapPin },
            { id: "wishlist", label: `Wishlist (${wishlistIds.size})`, icon: Heart },
            { id: "settings", label: "Profile & Vedic Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "border-[#c8a951] text-[#a5762a] bg-[#fdf8f4]"
                    : "border-transparent text-[#4a382e]/70 hover:text-[#2a1f1a]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        {/* ── 1. OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Soul Profile Banner */}
            <div className="p-6 sm:p-8 bg-white border border-[#c8a951]/35 rounded-sm shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:border-r border-[#e8d9cf] md:pr-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a] mb-1">
                  Cosmic Vibration
                </p>
                <h3
                  className="text-2xl font-light text-[#2a1f1a] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sun in {user?.sunSign || "Leo"} · Life Path {user?.lifePathNumber || 7}
                </h3>
                <p className="text-xs text-[#4a382e]/70 leading-relaxed font-light">
                  Your energetic aura resonates strongly with Solar charisma and deep intuitive channelling.
                </p>
              </div>

              <div className="md:border-r border-[#e8d9cf] md:pr-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#a5762a] mb-1">
                  Primary Crystal Remedy
                </p>
                <h4 className="text-lg font-semibold text-[#2a1f1a]">Selenite & Pyrite</h4>
                <p className="text-xs text-[#4a382e]/70 font-light mt-1">
                  Clear emotional fog and attract executive manifestation.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Link href="/shop">
                  <span className="w-full inline-flex items-center justify-center gap-2 bg-[#c8a951] text-[#1a0e05] py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm cursor-pointer">
                    Shop Aligned Crystals <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
                <Link href="/tarot#book">
                  <span className="w-full inline-flex items-center justify-center gap-2 border border-[#c8a951]/60 text-[#a5762a] py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#c8a951]/10 cursor-pointer">
                    Book 1-on-1 Reading
                  </span>
                </Link>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Active Orders", value: userOrders.filter((o) => o.orderStatus !== "Delivered").length },
                { label: "Completed Orders", value: userOrders.filter((o) => o.orderStatus === "Delivered").length },
                { label: "Saved Addresses", value: addresses.length },
                { label: "Wishlist Items", value: wishlistIds.size },
              ].map((s) => (
                <div key={s.label} className="p-5 bg-white border border-[#e8d9cf] rounded-sm text-center shadow-xs">
                  <span
                    className="text-3xl font-light text-[#a5762a]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.value}
                  </span>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#4a382e]/60 mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Order Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-light text-[#2a1f1a]">Latest Order Status</h3>
                <button onClick={() => setActiveTab("orders")} className="text-xs text-[#a5762a] font-bold underline">
                  View All Orders →
                </button>
              </div>

              {userOrders.length > 0 ? (
                <div className="bg-white border border-[#e8d9cf] p-6 rounded-sm shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8d9cf]">
                    <div>
                      <span className="text-xs font-bold text-[#2a1f1a]">Order #{userOrders[0].id}</span>
                      <p className="text-xs text-[#4a382e]/60 mt-0.5">
                        Placed on {new Date(userOrders[0].createdAt).toLocaleDateString()} · Total: ₹{userOrders[0].total}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#558253]/15 text-[#558253] border border-[#558253]/30 text-[9px] font-bold uppercase tracking-wider rounded-full self-start">
                      <Truck className="w-3.5 h-3.5" /> {userOrders[0].orderStatus}
                    </span>
                  </div>

                  <div className="py-4 flex flex-wrap gap-4 items-center">
                    {userOrders[0].items.map((it, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={it.image} alt={it.name} className="w-12 h-12 object-contain bg-[#f7f1ec] p-1 border border-[#e8d9cf]" />
                        <div>
                          <p className="text-xs font-medium text-[#2a1f1a]">{it.name}</p>
                          <p className="text-[10px] text-[#4a382e]/60">Qty: {it.quantity} · ₹{it.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-[#e8d9cf] p-8 text-center rounded-sm">
                  <Package className="w-10 h-10 text-[#c8a951]/40 mx-auto mb-2" />
                  <p className="text-sm text-[#4a382e]/80">No orders placed yet.</p>
                  <Link href="/shop">
                    <span className="inline-block mt-3 text-xs font-bold text-[#a5762a] underline cursor-pointer">
                      Explore Sacred Crystal Shop →
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 2. ORDERS ── */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-light font-serif text-[#2a1f1a]">My Orders History</h2>
              <button
                onClick={refreshOrders}
                className="text-xs text-[#a5762a] font-bold uppercase tracking-wider"
              >
                Refresh Orders ⟳
              </button>
            </div>

            {userOrders.length > 0 ? (
              userOrders.map((order) => (
                <div key={order.id} className="bg-white border border-[#e8d9cf] p-6 rounded-sm shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8d9cf]">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#2a1f1a]">Order #{order.id}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-[#f5ede4] text-[#a5762a] border border-[#e8d9cf] rounded-full">
                          {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                        </span>
                      </div>
                      <p className="text-xs text-[#4a382e]/60 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} · Est. Delivery: {order.estimatedDelivery}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-[#2a1f1a]">₹{order.total}</span>
                      <p className="text-[10px] text-[#558253] font-semibold">{order.orderStatus}</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="py-4 divide-y divide-[#f7f1ec]">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-[#fdf8f4] p-1 border border-[#e8d9cf]" />
                          <div>
                            <p className="text-xs font-semibold text-[#2a1f1a]">{item.name}</p>
                            <p className="text-[10px] text-[#4a382e]/60">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#2a1f1a]">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer & Tracking */}
                  <div className="pt-4 border-t border-[#e8d9cf] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-[#4a382e]/70">
                      <Truck className="w-4 h-4 text-[#a5762a]" />
                      <span>Tracking: <strong>{order.trackingNumber}</strong> ({order.courier})</span>
                    </div>

                    <Link href={`/orders`}>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#a5762a] hover:text-[#2a1f1a] cursor-pointer">
                        Live Tracking Timeline →
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-[#e8d9cf] p-12 text-center rounded-sm">
                <Package className="w-12 h-12 text-[#c8a951]/40 mx-auto mb-3" />
                <h3 className="text-lg font-serif font-light text-[#2a1f1a]">No Orders Placed Yet</h3>
                <p className="text-xs text-[#4a382e]/70 mt-1 max-w-sm mx-auto font-light">
                  When you acquire crystals or sacred malas, your tracking timeline and consecrated invoice will appear here.
                </p>
                <Link href="/shop">
                  <span className="inline-block mt-5 bg-[#c8a951] text-[#1a0e05] px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm cursor-pointer">
                    Explore Shop
                  </span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── 3. ADDRESSES ── */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-light font-serif text-[#2a1f1a]">Saved Delivery Addresses</h2>
              <button
                onClick={() => setAddressModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-[#c8a951] text-[#1a0e05] px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-6 bg-white border rounded-sm relative shadow-xs ${
                    addr.isDefault ? "border-[#c8a951]" : "border-[#e8d9cf]"
                  }`}
                >
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 text-[8px] font-bold uppercase tracking-widest bg-[#c8a951]/15 text-[#a5762a] border border-[#c8a951]/40 px-2 py-0.5 rounded-full">
                      Default Delivery
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-[#2a1f1a] mb-1">{addr.fullName}</h4>
                  <p className="text-xs text-[#4a382e]/80 leading-relaxed font-light mb-2">
                    {addr.addressLine}, {addr.city}, {addr.state} — {addr.pincode}
                  </p>
                  <p className="text-xs text-[#4a382e]/70 mb-4">Phone: {addr.phone}</p>

                  <div className="flex items-center gap-3 pt-3 border-t border-[#e8d9cf]">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[10px] font-bold text-[#a5762a] hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-[10px] font-bold text-red-600/80 hover:text-red-700 ml-auto flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {addresses.length === 0 && (
              <div className="bg-white border border-[#e8d9cf] p-12 text-center rounded-sm">
                <MapPin className="w-12 h-12 text-[#c8a951]/40 mx-auto mb-3" />
                <p className="text-sm text-[#4a382e]">No addresses saved yet.</p>
                <button
                  onClick={() => setAddressModalOpen(true)}
                  className="mt-4 text-xs font-bold text-[#a5762a] underline cursor-pointer"
                >
                  + Add Your Primary Delivery Address
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── 4. WISHLIST ── */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-light font-serif text-[#2a1f1a]">Sacred Wishlist</h2>
            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="bg-white border border-[#e8d9cf] p-4 rounded-sm flex flex-col group shadow-xs">
                    <div className="relative aspect-square mb-3 bg-[#fdf8f4] overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 border border-[#e8d9cf] flex items-center justify-center text-red-500 shadow-sm"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                    <h4 className="text-xs font-normal uppercase tracking-wider text-[#2a1f1a] truncate mb-1">{p.name}</h4>
                    <p className="text-sm font-bold text-[#2a1f1a] mb-4">₹{p.price}</p>
                    <button
                      onClick={() => { addToCart(p); toggleWishlist(p.id); }}
                      className="w-full mt-auto bg-[#c8a951] text-[#1a0e05] py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-xs"
                    >
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#e8d9cf] p-12 text-center rounded-sm">
                <Heart className="w-12 h-12 text-[#c8a951]/40 mx-auto mb-3" />
                <p className="text-sm text-[#4a382e]">Your wishlist is currently empty.</p>
                <Link href="/shop">
                  <span className="inline-block mt-3 text-xs font-bold text-[#a5762a] underline cursor-pointer">
                    Browse Sacred Crystals →
                  </span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── 5. SETTINGS & VEDIC PROFILE ── */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white border border-[#e8d9cf] p-6 sm:p-10 rounded-sm shadow-xs">
            <h3 className="text-xl font-serif font-light text-[#2a1f1a] mb-6">Personal & Vedic Profile Settings</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    value={profileForm.birthDate}
                    onChange={(e) => setProfileForm((f) => ({ ...f, birthDate: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm [color-scheme:light]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">Time of Birth</label>
                  <input
                    type="time"
                    value={profileForm.birthTime}
                    onChange={(e) => setProfileForm((f) => ({ ...f, birthTime: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm [color-scheme:light]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">Place of Birth</label>
                  <input
                    type="text"
                    value={profileForm.birthPlace}
                    onChange={(e) => setProfileForm((f) => ({ ...f, birthPlace: e.target.value }))}
                    placeholder="e.g. Pune, India"
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 bg-[#c8a951] text-[#1a0e05] px-8 py-3 text-[10px] font-bold uppercase tracking-[0.22em] rounded-sm shadow-md hover:shadow-[#c8a951]/30 transition-all cursor-pointer"
              >
                Save Cosmic Profile Updates
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Address Modal */}
      <AnimatePresence>
        {addressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setAddressModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg bg-white border border-[#c8a951]/40 p-6 sm:p-8 rounded-sm shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#e8d9cf] mb-4">
                <h3 className="text-lg font-serif font-light text-[#2a1f1a]">Add Delivery Address</h3>
                <button onClick={() => setAddressModalOpen(false)} className="text-[#4a382e]/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    placeholder="Recipient Full Name *"
                    required
                    value={newAddr.fullName}
                    onChange={(e) => setNewAddr((a) => ({ ...a, fullName: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                  />
                  <input
                    placeholder="Mobile Phone *"
                    required
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr((a) => ({ ...a, phone: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                  />
                </div>
                <input
                  placeholder="Street Address, House/Flat No., Landmark *"
                  required
                  value={newAddr.addressLine}
                  onChange={(e) => setNewAddr((a) => ({ ...a, addressLine: e.target.value }))}
                  className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                />
                <div className="grid grid-cols-3 gap-3.5">
                  <input
                    placeholder="City *"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr((a) => ({ ...a, city: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                  />
                  <input
                    placeholder="State *"
                    required
                    value={newAddr.state}
                    onChange={(e) => setNewAddr((a) => ({ ...a, state: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                  />
                  <input
                    placeholder="Pincode *"
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr((a) => ({ ...a, pincode: e.target.value }))}
                    className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-3.5 py-2 text-xs text-[#2a1f1a] outline-none rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-[#c8a951] text-[#1a0e05] py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm"
                >
                  Save Address
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
