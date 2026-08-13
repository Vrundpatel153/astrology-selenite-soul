/**
 * GSAP + ScrollTrigger initialization.
 * Wire GSAP's ticker to Lenis so ScrollTrigger works with smooth scroll.
 * Import this ONCE at the app root.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tune GSAP defaults for luxury feel
gsap.defaults({ ease: "power3.out", duration: 0.9 });

export { gsap, ScrollTrigger };

/** Call this once inside your Lenis RAF loop to sync ScrollTrigger */
export function syncLenisToGSAP(lenis: {
  on: (event: string, cb: (e: { scroll: number }) => void) => void;
}) {
  lenis.on("scroll", () => ScrollTrigger.update());
  gsap.ticker.lagSmoothing(0);
}
