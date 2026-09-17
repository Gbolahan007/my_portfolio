"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TechGrid from "./TechGrid";

export default function HeroSection() {
  const containerRef = useRef(null);
  const copyRef = useRef(null);
  const gridWrapRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const handleSplashComplete = () => setCanAnimate(true);
    window.addEventListener("splashComplete", handleSplashComplete);
    return () =>
      window.removeEventListener("splashComplete", handleSplashComplete);
  }, []);

  useGSAP(
    () => {
      if (!canAnimate) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set([greetingRef.current, nameRef.current, descriptionRef.current], {
        force3D: true,
        willChange: "transform, opacity",
        opacity: 0,
        y: 80,
        scale: 0.95,
      });

      if (prefersReduced) {
        gsap.set(
          [greetingRef.current, nameRef.current, descriptionRef.current],
          { opacity: 1, y: 0, scale: 1, willChange: "auto" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.2,
      });

      tl.to(greetingRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.4)",
      })
        .to(
          nameRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power4.out" },
          "-=0.8",
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            onComplete: () => {
              gsap.set(
                [greetingRef.current, nameRef.current, descriptionRef.current],
                { willChange: "auto" },
              );
            },
          },
          "-=0.9",
        );

      // Organic float for the tech grid — different periods for y vs rotation
      const floatTl = gsap.timeline({ repeat: -1, delay: 2 });
      floatTl
        .to(
          gridWrapRef.current,
          {
            y: -10,
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
            force3D: true,
          },
          0,
        )
        .to(
          gridWrapRef.current,
          {
            rotation: 0.6,
            duration: 4.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
            transformOrigin: "50% 50%",
            force3D: true,
          },
          0,
        );
    },
    { scope: containerRef, dependencies: [canAnimate] },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-svh flex flex-col  bg-[#10120f] text-white px-4 relative overflow-hidden"
      style={{
        paddingTop: "clamp(6rem, 12vh, 9rem)",
        paddingBottom: "clamp(2rem, 6vh, 4rem)",
        gap: "clamp(1.5rem, 4vh, 3rem)",
      }}
    >
      <div
        ref={copyRef}
        className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center p-3 md:pb-9 md:mb-12 pb-2 mb-5"
      >
        <h2
          ref={greetingRef}
          className="text-4xl md:text-5xl font-bold"
          style={{ opacity: 0 }}
        >
          <span className="text-gray-500">Hi,</span>
        </h2>

        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl font-bold mb-8"
          style={{ opacity: 0 }}
        >
          I&apos;m{" "}
          <span className="bg-linear-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Lawal Omogbolahan
          </span>
        </h1>

        <p
          ref={descriptionRef}
          className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
          style={{ opacity: 0 }}
        >
          Front-end developer with 4 years of experience turning ideas into
          real, scalable applications. I help teams and founders build fast,
          reliable web solutions, crafted for smooth and meaningful user
          experiences.
        </p>
      </div>

      <div ref={gridWrapRef} className="relative z-10 w-full">
        <TechGrid />
      </div>
    </div>
  );
}
