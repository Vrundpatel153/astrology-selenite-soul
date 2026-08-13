/**
 * useLenis — upgraded with GSAP ScrollTrigger sync.
 * Replaces the old hook so the entire app gets smooth scroll + ScrollTrigger working together.
 */
import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),  // quartic ease-out — silky feel
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Sync GSAP ScrollTrigger to Lenis scroll position
    lenis.on("scroll", () => ScrollTrigger.update());

    // Wire Lenis into GSAP ticker (avoids double RAF)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
      lenis.destroy();
    };
  }, []);
}
