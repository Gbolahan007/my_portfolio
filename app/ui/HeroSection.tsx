"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TechGrid from "./TechGrid";

export default function HeroSection() {
  const containerRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const handleSplashComplete = () => {
      setCanAnimate(true);
    };

    window.addEventListener("splashComplete", handleSplashComplete);

    return () => {
      window.removeEventListener("splashComplete", handleSplashComplete);
    };
  }, []);

  useGSAP(
    () => {
      if (!canAnimate) return;

      // Force GPU acceleration for all animated elements
      gsap.set(
        [
          containerRef.current,
          greetingRef.current,
          nameRef.current,
          descriptionRef.current,
        ],
        {
          force3D: true,
          willChange: "transform, opacity",
        }
      );

      gsap.set([greetingRef.current, nameRef.current, descriptionRef.current], {
        opacity: 0,
        y: 80,
        scale: 0.95,
      });

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
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            // Clear willChange after animation completes
            onComplete: () => {
              gsap.set(
                [greetingRef.current, nameRef.current, descriptionRef.current],
                {
                  willChange: "auto",
                }
              );
            },
          },
          "-=0.9"
        );

      // Reduce or disable continuous animations on mobile
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // Floating animation - desktop only
        gsap.to(containerRef.current, {
          y: -12,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2,
          force3D: true,
        });

        // Glow pulse - desktop only
        gsap.to(nameRef.current, {
          textShadow: "0 0 20px rgba(255,255,255,0.3)",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2,
        });
      } else {
        // Clear willChange on mobile after intro animation
        setTimeout(() => {
          gsap.set(containerRef.current, { willChange: "auto" });
        }, 2500);
      }
    },
    { scope: containerRef, dependencies: [canAnimate] }
  );

  return (
    <div className="lg:min-h-screen mb-14 pb-8 lg:my-0 bg-[#10120f] text-white px-4 relative overflow-hidden">
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto text-center relative z-10 pt-32"
      >
        <h2
          ref={greetingRef}
          className="text-4xl md:text-5xl font-bold mb-4"
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
          Front-end developer with 3 years of experience turning ideas into
          real, scalable applications. I help teams and founders build fast,
          reliable web solutions, crafted for smooth and meaningful user
          experiences.
        </p>
      </div>

      <TechGrid />
    </div>
  );
}
