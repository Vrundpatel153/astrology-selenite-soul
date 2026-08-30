"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal({ onGuestContinue }: { onGuestContinue?: () => void }) {
  const { loginModalOpen, setLoginModalOpen, login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup" | "otp">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!loginModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await login(email, password, name);
    setLoading(false);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    await signup({ name, email, phone, passwordHash: password });
    setLoading(false);
  };

  const handleOtpSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone && !email) return;
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 600);
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    const identifier = phone || email;
    await login(identifier.includes("@") ? identifier : `${identifier}@seeker.selenitesoul.com`, undefined, name || "Valued Seeker");
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLoginModalOpen(false)}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-white border border-[#c8a951]/40 rounded-sm shadow-2xl overflow-hidden text-[#2a1f1a]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top Banner */}
          <div className="bg-[#fcf8f4] border-b border-[#e8d9cf] p-6 text-center relative">
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 text-[#4a382e]/60 hover:text-[#2a1f1a] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center mb-1 text-[#a5762a]">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em]">
                Selenite Soul Sanctuary
              </span>
            </div>
            <h3
              className="text-2xl font-light text-[#2a1f1a]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {mode === "login"
                ? "Sign in to Your Soul Sanctuary"
                : mode === "signup"
                ? "Create Sacred Account"
                : "Quick Mobile OTP Sign In"}
            </h3>
            <p className="text-xs text-[#4a382e]/70 mt-1 font-light">
              Track orders, earn celestial rewards & save your Vedic birth chart.
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-3 border-b border-[#e8d9cf] text-[10px] font-bold uppercase tracking-widest">
            <button
              onClick={() => { setMode("login"); setOtpSent(false); }}
              className={`py-3 text-center border-b-2 transition-colors ${
                mode === "login"
                  ? "border-[#c8a951] text-[#a5762a] bg-[#fdf8f4]"
                  : "border-transparent text-[#4a382e]/60 hover:text-[#2a1f1a]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setOtpSent(false); }}
              className={`py-3 text-center border-b-2 transition-colors ${
                mode === "signup"
                  ? "border-[#c8a951] text-[#a5762a] bg-[#fdf8f4]"
                  : "border-transparent text-[#4a382e]/60 hover:text-[#2a1f1a]"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => { setMode("otp"); setOtpSent(false); }}
              className={`py-3 text-center border-b-2 transition-colors ${
                mode === "otp"
                  ? "border-[#c8a951] text-[#a5762a] bg-[#fdf8f4]"
                  : "border-transparent text-[#4a382e]/60 hover:text-[#2a1f1a]"
              }`}
            >
              Instant OTP
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {mode === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[#4a382e]/40" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya@gmail.com"
                      className="w-full bg-[#fdf8f4] border border-[#e8d9cf] pl-10 pr-4 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                    Password (Optional)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-[#4a382e]/40" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#fdf8f4] border border-[#e8d9cf] pl-10 pr-4 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#c8a951] text-[#1a0e05] py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] shadow-md hover:shadow-[#c8a951]/30 transition-all rounded-sm flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Authenticating..." : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                </motion.button>
              </form>
            )}

            {mode === "signup" && (
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-[#4a382e]/40" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-[#fdf8f4] border border-[#e8d9cf] pl-10 pr-4 py-2 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[#4a382e]/40" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya@gmail.com"
                      className="w-full bg-[#fdf8f4] border border-[#e8d9cf] pl-10 pr-4 py-2 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1">
                    Mobile Phone (For Order SMS)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 text-[#4a382e]/40" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#fdf8f4] border border-[#e8d9cf] pl-10 pr-4 py-2 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#c8a951] text-[#1a0e05] py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] shadow-md hover:shadow-[#c8a951]/30 transition-all rounded-sm flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Creating Soul Profile..." : <>Create Account & Claim 10% Off <ArrowRight className="w-4 h-4" /></>}
                </motion.button>
              </form>
            )}

            {mode === "otp" && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleOtpSend} className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#a5762a] mb-1.5">
                        Mobile Number or Email
                      </label>
                      <input
                        type="text"
                        required
                        value={phone || email}
                        onChange={(e) => { setPhone(e.target.value); setEmail(e.target.value); }}
                        placeholder="+91 98765 43210 or email"
                        className="w-full bg-[#fdf8f4] border border-[#e8d9cf] px-4 py-2.5 text-sm text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#c8a951] text-[#1a0e05] py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] shadow-md rounded-sm cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? "Sending OTP..." : "Get Instant Login OTP"}
                    </motion.button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpVerify} className="space-y-4">
                    <div>
                      <p className="text-xs text-[#4a382e] mb-2 font-light">
                        Enter 4-digit OTP sent to <strong>{phone || email}</strong>:
                      </p>
                      <input
                        type="text"
                        maxLength={4}
                        autoFocus
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="1 2 3 4"
                        className="w-full bg-[#fdf8f4] border border-[#c8a951] text-center text-xl tracking-[0.5em] font-mono py-2.5 outline-none rounded-sm"
                      />
                      <p className="text-[10px] text-[#a5762a] mt-1 text-center font-mono">
                        (Demo mode: Any 4 digits will log you in instantly)
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#c8a951] text-[#1a0e05] py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] shadow-md rounded-sm cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? "Verifying..." : "Verify & Continue"}
                    </motion.button>
                  </form>
                )}
              </div>
            )}

            {/* Guest Checkout Option */}
            {onGuestContinue && (
              <div className="mt-5 pt-4 border-t border-[#e8d9cf] text-center">
                <button
                  onClick={() => { setLoginModalOpen(false); onGuestContinue(); }}
                  className="text-xs font-semibold text-[#4a382e] hover:text-[#a5762a] transition-colors underline cursor-pointer"
                >
                  Continue as Guest Seeker →
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
