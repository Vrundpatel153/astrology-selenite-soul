import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const messages = [
  "Every order comes with tiered gifts & cashback — because your energy deserves a reward.",
  "Free shipping on orders above ₹999.",
  "100% Natural · Lab Testing Certificate Included"
];

export default function TopBar() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + messages.length) % messages.length);
  const next = () => setIdx((i) => (i + 1) % messages.length);

  return (
    <div className="flex flex-col w-full" data-testid="top-bar">
      <div className="hidden md:flex h-10 items-center justify-center gap-4 font-mono text-[12px] tracking-wider relative text-white" style={{ background: "linear-gradient(90deg, #c8517a 0%, #a3336b 35%, #7b2d8b 65%, #c8517a 100%)" }}>
        <button onClick={prev} className="hover:opacity-70 transition-opacity absolute left-4" aria-label="Previous announcement">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span>{messages[idx]}</span>
        <button onClick={next} className="hover:opacity-70 transition-opacity absolute right-4" aria-label="Next announcement">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
