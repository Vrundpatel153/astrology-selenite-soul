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

  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 18, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full" data-testid="top-bar">
      <div className="bg-[#0e0a1a] border-b border-[#c8a951]/20 text-[#c8a951]/80 py-1 px-4 text-center font-light tracking-[0.18em] text-[9px] md:text-[10px]">
        <span className="opacity-60">sale ends in</span>
        {" "}
        <span className="font-medium text-[#c8a951]">{timeLeft.days}d {timeLeft.hours.toString().padStart(2, '0')}h {timeLeft.minutes.toString().padStart(2, '0')}m {timeLeft.seconds.toString().padStart(2, '0')}s</span>
        {" "}
        <span className="opacity-60 mx-1">·</span>
        {" "}
        <span className="opacity-70">upto 5 free gifts worth ₹2899</span>
      </div>
      <div className="hidden md:flex bg-[#2a1f1a] text-white h-10 items-center justify-center gap-4 font-mono text-[12px] tracking-wider relative">
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
