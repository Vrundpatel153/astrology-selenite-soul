"use client";
/**
 * useGSAPReveal — attaches GSAP ScrollTrigger to a ref.
 * Usage:
 *   const ref = useGSAPReveal();
 *   <div ref={ref}>...</div>
 */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

type RevealOptions = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string; // child selector to use as trigger instead of ref
  start?: string;
  staggerSelector?: string;
  staggerDelay?: number;
};

export function useGSAPReveal(options: RevealOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const targets = options.staggerSelector
      ? el.querySelectorAll(options.staggerSelector)
      : [el];

    const from: gsap.TweenVars = options.from ?? { opacity: 0, y: 50 };
    const to: gsap.TweenVars = options.to ?? { opacity: 1, y: 0 };

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, from, {
        ...to,
        duration: 1,
        ease: "power3.out",
        stagger: options.staggerDelay ?? 0.1,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref as React.RefObject<any>;
}

/** Parallax background — moves at a fraction of scroll speed */
export function useParallax(speed = 0.25) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 * 0.5 },
        {
          yPercent: speed * 100 * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref as React.RefObject<any>;
}

/** Text character split reveal */
export function useSplitReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const originalHTML = el.innerHTML;
    const words = el.textContent?.split(" ") ?? [];
    el.innerHTML = words
      .map(w => `<span class="gsap-word" style="display:inline-block;overflow:hidden;"><span class="gsap-inner" style="display:inline-block;">${w}&nbsp;</span></span>`)
      .join("");

    const inners = el.querySelectorAll(".gsap-inner");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.75,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      el.innerHTML = originalHTML;
    };
  }, []);

  return ref as React.RefObject<any>;
}

/** Counter animation — animates a number from 0 to target */
export function useCounter(target: number, suffix = "") {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: "power2.out",
        snap: { val: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (el) el.textContent = Math.round(obj.val).toLocaleString() + suffix;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, suffix]);

  return ref as React.RefObject<any>;
}
