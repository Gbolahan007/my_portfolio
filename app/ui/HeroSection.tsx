"use client";

import React, { useEffect, useRef } from "react";
import TechGrid from "./TechGrid";

// GSAP imports (using CDN versions available in Claude artifacts)
const gsap = typeof window !== "undefined" ? window.gsap : null;

export default function HeroSection() {
  const containerRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (!gsap) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([greetingRef.current, nameRef.current, descriptionRef.current], {
        opacity: 0,
        y: 50,
      });

      // Create timeline for sequential animations
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.to(greetingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
      })
        .to(
          nameRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          },
          "-=0.6"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.7"
        );

      // Floating animation for the entire content
      gsap.to(containerRef.current, {
        y: -10,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4  relative overflow-hidden">
      {/* Main Content */}
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Greeting Text */}
        <h2 ref={greetingRef} className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gray-500">Hi,</span>
        </h2>

        {/* Name */}
        <h1 ref={nameRef} className="text-4xl md:text-6xl font-bold mb-8">
          I&apos;m{" "}
          <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Lawal Omogbolahan
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
        >
          Front-end developer with 3 years of experience turning ideas into
          real, scalable applications. I help teams and founders build fast,
          reliable web and mobile solutions—designed for smooth and meaningful
          user experiences.
        </p>
      </div>
      <TechGrid />
    </div>
  );
}
