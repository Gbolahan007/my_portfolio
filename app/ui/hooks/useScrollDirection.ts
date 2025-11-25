"use client";

import { useEffect, useState, useRef } from "react";

interface UseScrollDirectionReturn {
  isVisible: boolean;
  scrollY: number;
}

export function useScrollDirection(): UseScrollDirectionReturn {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show navbar when scrolling up
          if (currentScrollY < lastScrollY.current - 10) {
            setIsVisible(true);
          }
          // Hide navbar when scrolling down (but keep visible at top)
          else if (
            currentScrollY > lastScrollY.current + 10 &&
            currentScrollY > 50
          ) {
            setIsVisible(false);
          }

          setScrollY(currentScrollY);
          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isVisible, scrollY };
}
