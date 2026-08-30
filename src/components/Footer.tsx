"use client";
import { Link } from "wouter";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Best Sellers", href: "/shop?filter=best" },
      { label: "Bracelets", href: "/shop?category=bracelets" },
      { label: "Pendants", href: "/shop?category=pendants" },
      { label: "Rings", href: "/shop?category=rings" },
      { label: "Ear Studs", href: "/shop?category=ear-studs" },
      { label: "Raw Gemstones", href: "/shop?category=gemstones" },
      { label: "Necklaces", href: "/shop?category=necklaces" },
    ],
  },
  {
    heading: "Sanctuary Services",
    links: [
      { label: "Vedic Kundali", href: "/kundali" },
      { label: "Tarot Arcana Reading", href: "/tarot" },
      { label: "Numerology Matrix", href: "/numerology" },
      { label: "Active Offers & Coupons", href: "/offers" },
      { label: "Live Order Tracking", href: "/orders" },
      { label: "Seeker Account Dashboard", href: "/account" },
    ],
  },
  {
    heading: "Shop by Concern",
    links: [
      { label: "Love & Harmony", href: "/shop?concern=love" },
      { label: "Wealth & Abundance", href: "/shop?concern=money" },
      { label: "Inner Peace & Calming", href: "/shop?concern=peace" },
      { label: "Vitality & Healing", href: "/shop?concern=health" },
      { label: "Aura & Protection", href: "/shop?concern=protection" },
    ],
  },
  {
    heading: "Sanctuary Support",
    links: [
      { label: "About Our Craft", href: "/about" },
      { label: "Contact Sanctuary", href: "/contact" },
      { label: "Seeker FAQ", href: "/faq" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Returns & Guarantee", href: "/shipping#returns" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  if (
    typeof window !== "undefined" &&
    (window.location.pathname === "/payment-success" || window.location.pathname.startsWith("/checkout"))
  ) {
    return null;
  }

  return (
    <footer className="bg-[#f5ede4] text-[#2a1f1a] pt-16 md:pt-20 pb-8 px-6 overflow-hidden border-t border-[#e8d9cf]">
      <div className="max-w-[1400px] mx-auto">
        {/* Top CTA strip */}
        <ScrollReveal
          direction="up"
          className="bg-white/85 border border-[#c8a951]/35 p-6 md:p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm shadow-sm"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a]">
                Free Kundali Reading
              </span>
            </div>
            <p className="text-lg md:text-xl font-serif font-light text-[#2a1f1a]">
              Discover your cosmic crystal prescription
            </p>
          </div>
          <Link href="/kundali">
            <motion.span
              className="flex items-center gap-2 bg-[#c8a951] text-[#1a0e05] px-6 py-3 text-[11px] font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap shadow-md"
              whileHover={{ scale: 1.03, backgroundColor: "#d4b565" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              Get My Kundali <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </ScrollReveal>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {footerLinks.map((section) => (
            <div key={section.heading}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-4">
                {section.heading}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-xs text-[#4a382e]/80 hover:text-[#a5762a] transition-colors cursor-pointer block py-0.5">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter & Brand */}
        <div className="pt-8 border-t border-[#e8d9cf] flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <Link href="/">
              <span
                className="text-2xl font-normal text-[#2a1f1a] cursor-pointer"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Selenite Soul
              </span>
            </Link>
            <p className="text-xs text-[#4a382e]/70 mt-1 font-light max-w-sm">
              Ethically sourced healing crystals & authentic Vedic Jyotish wisdom. Energized under lunar cycles.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-2">
              Receive Celestial Ephemeris
            </p>
            {subscribed ? (
              <p className="text-xs text-[#558253] font-semibold">Thank you for joining our sanctuary.</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-80">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#e8d9cf] px-3 py-2 text-xs text-[#2a1f1a] outline-none focus:border-[#c8a951] rounded-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#2a1f1a] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#3d2d25] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-6 border-t border-[#e8d9cf] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4a382e]/60">
          <p>© {new Date().getFullYear()} Selenite Soul Sanctuary. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[#4a382e]/60 hover:text-[#a5762a] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
