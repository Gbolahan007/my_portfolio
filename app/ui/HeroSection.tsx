"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TechGrid from "./TechGrid";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const greetingRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
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

      const greeting = greetingRef.current;
      const name = nameRef.current;
      const description = descriptionRef.current;
      const rule = ruleRef.current;
      const rail = railRef.current;
      const bloom = bloomRef.current;

      if (!greeting || !name || !description || !rule || !rail || !bloom)
        return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");

      if (prefersReduced) {
        gsap.set(lines, { yPercent: 0, opacity: 1 });
        gsap.set([rule, rail], { opacity: 1, scaleX: 1 });
        return;
      }

      gsap.set(lines, {
        yPercent: 115,
        opacity: 0,
        force3D: true,
        willChange: "transform, opacity",
      });
      gsap.set(rule, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(rail, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.15 },
        delay: 0.15,
      });

      tl.to(greeting.querySelectorAll(".hero-line"), {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
      })
        .to(
          name.querySelectorAll(".hero-line"),
          { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.08 },
          "-=0.62",
        )
        .to(rule, { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, "-=0.95")
        .to(
          description.querySelectorAll(".hero-line"),
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.06,
            onComplete: () => {
              gsap.set(lines, { willChange: "auto" });
            },
          },
          "-=1.05",
        )
        .to(
          rail,
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "-=0.8",
        );

      gsap.to(bloom, {
        xPercent: 6,
        yPercent: -4,
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true,
      });
    },
    { scope: containerRef, dependencies: [canAnimate] },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-svh w-full overflow-hidden bg-[#10120f] text-white"
    >
      {/* ---- depth layer 1: hairline grid ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "clamp(56px, 7vw, 104px) clamp(56px, 7vw, 104px)",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 30% 35%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 30% 35%, #000 20%, transparent 78%)",
        }}
      />

      {/* ---- depth layer 2: neutral blooms ---- */}
      <div
        ref={bloomRef}
        aria-hidden
        className="pointer-events-none absolute -top-[18%] left-[-10%] h-[70vh] w-[70vw] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 42%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-25%] right-[-12%] h-[60vh] w-[55vw] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 68%)",
        }}
      />

      {/* ---- depth layer 3: floor vignette the rail drifts through ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh]"
        style={{
          background:
            "linear-gradient(to top, #10120f 18%, rgba(16,18,15,0.72) 55%, transparent 100%)",
        }}
      />

      {/* ---- content ---- */}
      <div
        className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1400px] flex-col justify-between px-6 sm:px-10 lg:px-16"
        style={{
          paddingTop: "clamp(7rem, 16vh, 11rem)",
          paddingBottom: "clamp(1.5rem, 4vh, 3rem)",
        }}
      >
        <div className="flex flex-col">
          {/* greeting */}
          <div ref={greetingRef} className="overflow-hidden pb-[0.35em]">
            <h2 className="hero-line text-lg font-medium tracking-[-0.01em] text-gray-500 sm:text-xl">
              Hi,
            </h2>
          </div>

          {/* name — the one loud element */}
          <h1
            ref={nameRef}
            className="font-bold tracking-[-0.045em]"
            style={{
              fontSize: "clamp(2.85rem, 10.5vw, 9.5rem)",
              lineHeight: 0.88,
            }}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line block text-gray-500">I&apos;m</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line block bg-linear-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                Lawal
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line block bg-linear-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                Omogbolahan
              </span>
            </span>
          </h1>

          {/* rule + description — stepped off the headline, not stacked under it */}
          <div
            className="mt-[clamp(1.75rem,4.5vh,3.25rem)] flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10"
            style={{ paddingLeft: "clamp(0px, 1.5vw, 28px)" }}
          >
            <div
              ref={ruleRef}
              aria-hidden
              className="hidden h-px w-[clamp(90px,14vw,220px)] shrink-0 lg:mt-[0.85em] lg:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.38), rgba(255,255,255,0.12) 65%, transparent)",
              }}
            />

            <p
              ref={descriptionRef}
              className="max-w-[52ch] text-[clamp(1.02rem,1.55vw,1.3rem)] leading-[1.65] text-gray-400"
            >
              <span className="block overflow-hidden">
                <span className="hero-line block">
                  Front-end developer with 4 years of experience turning ideas
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block">
                  into real, scalable applications. I help teams and founders
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block">
                  build fast, reliable web solutions, crafted for smooth and
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block">
                  meaningful user experiences.
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* tech rail, anchored to the floor */}
        <div ref={railRef} className="mt-[clamp(2.5rem,7vh,5rem)] w-full">
          <TechGrid />
        </div>
      </div>
    </section>
  );
}
