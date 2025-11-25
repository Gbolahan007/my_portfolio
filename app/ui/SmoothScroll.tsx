"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // Adjust breakpoint as needed

    if (isMobile) {
      const handleScroll = () => {
        ScrollTrigger.update();
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    // Request animation frame loop for desktop
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
