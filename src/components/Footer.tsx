import { Link } from "wouter";
import { Instagram, Twitter, Facebook, Youtube, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "All Products",        href: "/shop" },
      { label: "New Arrivals",        href: "/shop?filter=new" },
      { label: "Best Sellers",        href: "/shop?filter=best" },
      { label: "Bracelets",           href: "/shop?category=bracelets" },
      { label: "Pendants",            href: "/shop?category=pendants" },
      { label: "Rings",               href: "/shop?category=rings" },
      { label: "Necklaces & Mala",    href: "/shop?category=necklaces" },
      { label: "Gemstones & Crystals",href: "/shop?category=gemstones" },
      { label: "Gifting",             href: "/shop" },
    ],
  },
  {
    heading: "Astrology",
    links: [
      { label: "Kundali Calculator",    href: "/kundali" },
      { label: "Tarot Reading",         href: "/tarot" },
      { label: "Numerology",            href: "/numerology" },
      { label: "Shop by Zodiac",        href: "/shop" },
      { label: "Shop by Concern",       href: "/shop" },
      { label: "Crystal Healing Guide", href: "/about" },
      { label: "Book Consultation",     href: "/tarot" },
      { label: "About Selenite Soul",   href: "/about" },
    ],
  },
  {
    heading: "Account & Orders",
    links: [
      { label: "My Cart",      href: "/cart" },
      { label: "My Wishlist",  href: "/wishlist" },
      { label: "Track Order",  href: "/orders" },
      { label: "Returns",      href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "FAQ",          href: "/faq" },
      { label: "Contact Us",   href: "/contact" },
    ],
  },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href}>
      <motion.span
        className="block text-sm text-[#4a382e]/80 cursor-pointer w-fit relative overflow-hidden group font-light"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <span className="group-hover:text-[#a5762a] transition-colors duration-200">{label}</span>
      </motion.span>
    </Link>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  }

  return (
    <footer className="bg-[#f5ede4] text-[#2a1f1a] pt-16 md:pt-20 pb-8 px-6 overflow-hidden border-t border-[#e8d9cf]">
      <div className="max-w-[1400px] mx-auto">

        {/* Top CTA strip */}
        <ScrollReveal direction="up" className="bg-white/85 border border-[#c8a951]/35 p-6 md:p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-[#a5762a]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a]">Free Kundali Reading</span>
            </div>
            <p className="text-lg md:text-xl font-serif font-light text-[#2a1f1a]">Discover your cosmic crystal prescription</p>
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

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand column */}
          <ScrollReveal direction="up" delay={0} className="lg:col-span-2">
            <Link href="/">
              <span
                className="block text-3xl font-normal tracking-normal cursor-pointer mb-4 hover:opacity-80 transition-opacity text-[#2a1f1a]"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Selenite Soul
              </span>
            </Link>
            <p className="font-mono text-sm text-[#4a382e]/80 max-w-[260px] leading-relaxed mb-6">
              Ethically sourced crystals aligned with your energy — cleansed under the full moon and delivered with love.
            </p>
            <div className="flex gap-4 mb-8">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Twitter,   href: "#" },
                { Icon: Facebook,  href: "#" },
                { Icon: Youtube,   href: "#" },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-[#e8d9cf] bg-white flex items-center justify-center text-[#4a382e]"
                  whileHover={{ borderColor: "#c8a951", color: "#a5762a", scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#a5762a] mb-3">Join Our List</p>
            <form onSubmit={handleSubscribe} className="flex gap-0 max-w-sm">
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-[#a5762a] font-medium"
                >
                  Thank you for joining.
                </motion.p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-white border border-[#e8d9cf] px-3.5 py-2.5 text-xs text-[#2a1f1a] placeholder:text-[#2a1f1a]/40 outline-none focus:border-[#c8a951] transition-colors rounded-l-sm"
                  />
                  <motion.button
                    type="submit"
                    className="bg-[#c8a951] text-[#1a0e05] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-r-sm"
                    whileHover={{ backgroundColor: "#d4b565" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join
                  </motion.button>
                </>
              )}
            </form>
          </ScrollReveal>

          {/* Link columns */}
          {footerLinks.map((col, ci) => (
            <ScrollReveal key={col.heading} direction="up" delay={0.08 + ci * 0.06}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a5762a] mb-5">{col.heading}</h4>
              <div className="flex flex-col gap-3">
                {col.links.map(link => (
                  <FooterLink key={link.label} label={link.label} href={link.href} />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust badges row */}
        <ScrollReveal direction="none" className="border-t border-b border-[#e8d9cf] py-5 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4a382e]/70">
            <span>✦ 100% Certified Crystals</span>
            <span>✦ Full Moon Energised</span>
            <span>✦ Free Shipping ₹999+</span>
            <span>✦ Pan-India 4-7 Days Delivery</span>
            <span>✦ 1.5L+ Lives Guided</span>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4a382e]/60 font-light">
          <p>© {new Date().getFullYear()} Selenite Soul by Ekta. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/shipping"><span className="hover:text-[#a5762a] cursor-pointer">Shipping & Returns</span></Link>
            <Link href="/faq"><span className="hover:text-[#a5762a] cursor-pointer">Privacy Policy</span></Link>
            <Link href="/faq"><span className="hover:text-[#a5762a] cursor-pointer">Terms of Service</span></Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
