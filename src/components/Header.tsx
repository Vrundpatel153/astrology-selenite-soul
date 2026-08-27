"use client";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, MapPin, ShoppingBag, Menu, X, Heart, Sparkles, ChevronRight, Star, User as UserIcon, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const DROPDOWN_ITEMS = [
  { label: "New Arrivals",      href: "/shop?filter=new" },
  { label: "Shop by Concern",   href: "/shop?filter=concern" },
  { label: "Shop by Astrology", href: "/shop?filter=astrology" },
  { label: "Best Sellers",      href: "/shop?filter=best" },
  { label: "Exclusive Offers",  href: "/offers" },
  { label: "Gifting",           href: "/shop?filter=gifting" },
];

const SIDEBAR_SECTIONS = [
  {
    heading: "Shop",
    links: [
      { label: "All Products",             href: "/shop" },
      { label: "Exclusive Offers & Coupons", href: "/offers", gold: true },
      { label: "New Arrivals",             href: "/shop?filter=new" },
      { label: "Best Sellers",             href: "/shop?filter=best" },
      { label: "Bracelets",               href: "/shop?category=bracelets" },
      { label: "Pendants",                href: "/shop?category=pendants" },
      { label: "Rings",                   href: "/shop?category=rings" },
      { label: "Necklaces & Mala",        href: "/shop?category=necklaces" },
      { label: "Gemstones & Raw Crystals",href: "/shop?category=gemstones" },
      { label: "Gifting",                 href: "/shop?filter=gifting" },
    ],
  },
  {
    heading: "Astrology & Readings",
    links: [
      { label: "Kundali Calculator",    href: "/kundali", gold: true },
      { label: "Tarot Reading",          href: "/tarot", gold: true },
      { label: "Numerology",             href: "/numerology", gold: true },
      { label: "Shop by Zodiac",        href: "/shop?filter=astrology" },
      { label: "Shop by Concern",       href: "/shop?filter=concern" },
      { label: "Book a Consultation",   href: "/tarot#book" },
    ],
  },
  {
    heading: "My Account & Orders",
    links: [
      { label: "My Soul Profile", href: "/account" },
      { label: "Track My Order", href: "/orders" },
      { label: "My Wishlist",  href: "/wishlist" },
      { label: "My Cart",      href: "/cart" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "FAQ",          href: "/faq" },
      { label: "Contact Us",   href: "/contact" },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, setLoginModalOpen, wishlistIds } = useAuth();
  const [, navigate] = useLocation();
  const [location] = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const isHomepage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      if (isHomepage && !scrolled) {
        const isMobile = window.innerWidth < 768;
        setTopOffset(isMobile ? 0 : 40);
      } else {
        setTopOffset(0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHomepage]);

  const isActive = (href: string) => href !== "/" && location.startsWith(href);

  return (
    <>
      {/* Spacer to preserve layout flow on other pages */}
      {!isHomepage && (
        <div className="w-full h-14 md:h-[88px] bg-transparent shrink-0 pointer-events-none" />
      )}

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start pt-24 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              className="max-w-xl w-full mx-auto"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white flex items-center px-4 py-4 gap-3 rounded-t-sm">
                <Search className="w-5 h-5 text-[#2a1f1a]/40" />
                <input
                  autoFocus
                  placeholder="Search crystals, concerns, zodiac, coupons..."
                  className="flex-1 text-base text-[#2a1f1a] outline-none placeholder:text-[#2a1f1a]/30"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate("/shop");
                      setSearchOpen(false);
                    }
                  }}
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="w-5 h-5 text-[#2a1f1a]/50" />
                </button>
              </div>
              <div className="bg-[#f7f1ec] px-4 py-3 rounded-b-sm">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#2a1f1a]/40 mb-2">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Rose Quartz", "Pyrite", "Amethyst", "Offers & Coupons", "Kundali", "7 Chakra"].map((s) => (
                    <span
                      key={s}
                      onClick={() => {
                        if (s === "Offers & Coupons") navigate("/offers");
                        else if (s === "Kundali") navigate("/kundali");
                        else navigate("/shop");
                        setSearchOpen(false);
                      }}
                      className="text-xs border border-[#e8d9cf] px-3 py-1.5 text-[#2a1f1a] cursor-pointer hover:bg-[#e8d9cf] transition-colors rounded-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className="fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out flex items-center justify-center pointer-events-none bg-transparent"
        style={{
          top: `${topOffset}px`,
          height: isScrolled ? "72px" : "88px",
          paddingTop: isScrolled ? "8px" : "12px",
          paddingBottom: isScrolled ? "8px" : "12px",
        }}
        data-testid="header"
      >
        <div
          className={`
            flex items-center justify-between pointer-events-auto
            transition-all duration-500 ease-in-out
            bg-white/85 backdrop-blur-md border border-white/30
            shadow-[0_8px_32px_rgba(42,31,26,0.06)] rounded-full
            ${isScrolled
              ? "w-[92%] max-w-[1080px] h-12 md:h-13 px-4 md:px-6"
              : "w-[95%] max-w-[1400px] h-14 md:h-16 px-6 md:px-8"
            }
          `}
        >
          {/* Left */}
          <div className="flex items-center flex-1 gap-1">
            <motion.button
              className="md:hidden flex items-center justify-center w-9 h-9 -ml-1 text-[#2a1f1a]"
              onClick={() => setMenuOpen(true)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </motion.button>

            {/* Search icon — mobile */}
            <motion.button
              onClick={() => setSearchOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 text-[#2a1f1a]"
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
            </motion.button>

            <Link href="/">
              <motion.span
                className={`hidden md:inline font-normal text-[#2a1f1a] cursor-pointer transition-all duration-500 ${isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"}`}
                style={{ fontFamily: "'Pacifico', cursive" }}
                whileHover={{ opacity: 0.75 }}
                transition={{ duration: 0.2 }}
              >
                Selenite Soul
              </motion.span>
            </Link>
          </div>

          {/* Center */}
          <div className="flex-none">
            <Link href="/">
              <span
                className="md:hidden text-lg font-normal text-[#2a1f1a] cursor-pointer"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Selenite Soul
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {/* Category Dropdown */}
              <div className="relative group flex items-center h-9">
                <Link href="/shop">
                  <span
                    className={`px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase relative cursor-pointer whitespace-nowrap transition-colors duration-200 ${
                      isActive("/shop")
                        ? "text-[#a5762a] font-semibold"
                        : "text-[#2a1f1a]/80 hover:text-[#a5762a]"
                    }`}
                  >
                    Shop
                    {isActive("/shop") && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#a5762a] rounded-full" />
                    )}
                  </span>
                </Link>

                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                  <div className="bg-white border border-[#e8d9cf] shadow-xl p-2.5 w-48 flex flex-col gap-0.5 rounded-sm">
                    {DROPDOWN_ITEMS.map((item) => (
                      <Link key={item.label} href={item.href}>
                        <span className="text-[11px] font-medium text-[#2a1f1a]/80 hover:text-[#a5762a] hover:bg-[#fdf8f4] px-3 py-2 block rounded-sm transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Offers */}
              <div className="relative flex items-center h-9">
                <Link href="/offers">
                  <span
                    className={`px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase relative cursor-pointer whitespace-nowrap transition-colors duration-200 ${
                      isActive("/offers")
                        ? "text-[#a5762a] font-semibold"
                        : "text-[#2a1f1a]/80 hover:text-[#a5762a]"
                    }`}
                  >
                    Offers
                    {isActive("/offers") && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#a5762a] rounded-full" />
                    )}
                  </span>
                </Link>
              </div>

              {/* Kundali */}
              <div className="relative flex items-center h-9">
                <Link href="/kundali">
                  <span
                    className={`px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase relative cursor-pointer whitespace-nowrap transition-colors duration-200 ${
                      isActive("/kundali")
                        ? "text-[#a5762a] font-semibold"
                        : "text-[#2a1f1a]/80 hover:text-[#a5762a]"
                    }`}
                  >
                    Kundali
                    {isActive("/kundali") && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#a5762a] rounded-full" />
                    )}
                  </span>
                </Link>
              </div>

              {/* Tarot */}
              <div className="relative flex items-center h-9">
                <Link href="/tarot">
                  <span
                    className={`px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase relative cursor-pointer whitespace-nowrap transition-colors duration-200 ${
                      isActive("/tarot")
                        ? "text-[#a5762a] font-semibold"
                        : "text-[#2a1f1a]/80 hover:text-[#a5762a]"
                    }`}
                  >
                    Tarot
                    {isActive("/tarot") && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#a5762a] rounded-full" />
                    )}
                  </span>
                </Link>
              </div>

              {/* Numerology */}
              <div className="relative flex items-center h-9">
                <Link href="/numerology">
                  <span
                    className={`px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase relative cursor-pointer whitespace-nowrap transition-colors duration-200 ${
                      isActive("/numerology")
                        ? "text-[#a5762a] font-semibold"
                        : "text-[#2a1f1a]/80 hover:text-[#a5762a]"
                    }`}
                  >
                    Numerology
                    {isActive("/numerology") && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#a5762a] rounded-full" />
                    )}
                  </span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Right Icons */}
          <div className={`flex items-center justify-end transition-all duration-500 ${isScrolled ? "gap-2 md:gap-3" : "gap-3 md:gap-4"} flex-1 text-[#2a1f1a]`}>
            {/* Desktop Search */}
            <motion.button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-1 hover:opacity-70"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
            </motion.button>

            {/* Account / User Button */}
            <motion.button
              onClick={() => {
                if (isAuthenticated) navigate("/account");
                else setLoginModalOpen(true);
              }}
              className="flex items-center gap-1 hover:text-[#a5762a] transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Account"
            >
              {isAuthenticated ? (
                <div className="w-7 h-7 rounded-full bg-[#c8a951]/20 border border-[#c8a951] flex items-center justify-center text-xs font-bold text-[#a5762a]">
                  {user?.name?.charAt(0) || "U"}
                </div>
              ) : (
                <UserIcon className="w-4.5 h-4.5 stroke-[1.5]" />
              )}
            </motion.button>

            {/* Wishlist */}
            <motion.button
              className="hidden md:flex relative"
              onClick={() => navigate("/wishlist")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Wishlist"
            >
              <Heart className="w-4.5 h-4.5 stroke-[1.5]" />
              {wishlistIds.size > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#c8a951] text-[#1a0e05] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold font-mono">
                  {wishlistIds.size}
                </span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              onClick={() => navigate("/cart")}
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 stroke-[1.5]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1.5 bg-[#2a1f1a] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 z-50 w-[310px] bg-white flex flex-col md:hidden shadow-2xl overflow-hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-14 border-b border-[#e8d9cf] shrink-0 bg-[#fdf8f4]">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <span
                    className="text-xl font-normal text-[#2a1f1a] cursor-pointer"
                    style={{ fontFamily: "'Pacifico', cursive" }}
                  >
                    Selenite Soul
                  </span>
                </Link>
                <motion.button onClick={() => setMenuOpen(false)} whileTap={{ scale: 0.85 }}>
                  <X className="w-5 h-5 text-[#2a1f1a]" />
                </motion.button>
              </div>

              {/* Drawer content */}
              <div className="flex-1 overflow-y-auto">
                {SIDEBAR_SECTIONS.map((section, si) => (
                  <div key={section.heading} className="py-4 border-b border-[#f7f1ec] last:border-0">
                    <p className="px-5 mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#a5762a]">
                      {section.heading}
                    </p>
                    {section.links.map((link, li) => (
                      <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                        <motion.span
                          className={`flex items-center justify-between px-5 py-2.5 text-[13px] font-medium cursor-pointer group ${link.gold ? "text-[#a5762a]" : "text-[#2a1f1a]"}`}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.05 + si * 0.04 + li * 0.025 }}
                          whileHover={{ x: 4, backgroundColor: "#fdf8f4" }}
                        >
                          {link.label}
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-opacity" />
                        </motion.span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="p-4 border-t border-[#e8d9cf] shrink-0 space-y-2 bg-[#fcf8f4]">
                {isAuthenticated ? (
                  <motion.button
                    onClick={() => { navigate("/account"); setMenuOpen(false); }}
                    className="w-full bg-[#2a1f1a] text-white py-3 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm"
                    whileTap={{ scale: 0.97 }}
                  >
                    <UserIcon className="w-4 h-4" /> My Soul Account
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => { setLoginModalOpen(true); setMenuOpen(false); }}
                    className="w-full bg-[#c8a951] text-[#1a0e05] py-3 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm"
                    whileTap={{ scale: 0.97 }}
                  >
                    <UserIcon className="w-4 h-4" /> Sign In / Register
                  </motion.button>
                )}
                <motion.button
                  onClick={() => { navigate("/orders"); setMenuOpen(false); }}
                  className="w-full border border-[#c8a951] text-[#a5762a] py-3 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm"
                  whileTap={{ scale: 0.97 }}
                >
                  <Tag className="w-4 h-4" /> Track My Order
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
