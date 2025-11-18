"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Bebas_Neue } from "next/font/google";

// Load BEBAS font
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function SplashScreen() {
  const [hidden, setHidden] = useState(false);

  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const splashRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const barFillRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const letters = lettersRef.current.filter(Boolean);
      if (letters.length === 0) return;

      gsap.set(letters, { y: -200, opacity: 0 });
      gsap.set(barFillRef.current, { width: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(splashRef.current, {
            y: "-100%",
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: () => setHidden(true),
          });
        },
      });

      // Drop letters
      tl.to(letters, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.25,
        ease: "bounce.out",
      });

      // Loading bar fade in
      tl.fromTo(
        barRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-0.5" // starts slightly before letters finish
      );

      // Fill the loading bar
      tl.to(barFillRef.current, {
        width: "100%",
        duration: 1.8,
        ease: "power2.inOut",
      });
    },
    { scope: splashRef }
  );

  if (hidden) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#f7f6f3]"
    >
      <div
        className={`${bebas.className} flex items-center gap-4 md:gap-8 text-4xl md:text-9xl font-bold`}
      >
        {["THINK", "·", "CODE", "·", "DEPLOY"].map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            className={`text-black inline-block ${
              word === "·" ? "text-6xl md:text-8xl" : ""
            }`}
          >
            {word}
          </span>
        ))}
      </div>

      {/*  Subtle Loading Bar */}
      <div
        ref={barRef}
        className="w-[180px] md:w-[260px] h-1 bg-black/10 mt-8 rounded-full overflow-hidden opacity-0"
      >
        <div
          ref={barFillRef}
          className="h-full bg-black rounded-full"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}
