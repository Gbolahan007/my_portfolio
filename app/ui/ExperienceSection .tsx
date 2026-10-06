"use client";

import React, { useRef, FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface Experience {
  company: string;
  role: string;
  experience: string;
  dates: string;
}

const experiences: Experience[] = [
  {
    company: "Beaders Africa",
    role: "Lead Frontend Engineer (Freelance)",
    experience:
      "Led end-to-end engineering of a pan-African e-commerce marketplace connecting bead artisans with buyers. Architected the platform from the ground up — product listings, buyer and seller flows, transactions — and led a cross-functional team of a designer and a data analyst.",
    dates: "2025 — Present",
  },
  {
    company: "Sisicaro Marketing Firm",
    role: "Freelance Frontend Developer",
    experience:
      "Built high-converting landing pages with the marketing team and optimised site speed, implementing designs aligned to their brand strategy. The work improved lead generation and sharpened how the company presents itself to clients.",
    dates: "2024",
  },
  {
    company: "Eni's Restaurant & Lounge",
    role: "Freelance Frontend Developer",
    experience:
      "Designed and built a complete digital menu system for the restaurant and lounge, with category-based filtering across meals and drinks. It streamlined staff workflow and made ordering faster for customers.",
    dates: "2024",
  },
  {
    company: "SeemlyProfessions",
    role: "Frontend Developer Intern → Lead Frontend Developer",
    experience:
      "Joined building responsive interfaces and optimising UI components, then was promoted to lead the frontend architecture. Introduced modern UI patterns and performance improvements that reduced bounce rates and tightened the conversion flow.",
    dates: "2023 — 2024",
  },
];

const ExperienceSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const heading = sectionRef.current?.querySelectorAll(".exp-heading-line");
      const rows = gsap.utils.toArray<HTMLElement>(".exp-row");

      if (prefersReduced) return;

      if (heading?.length) {
        gsap.set(heading, { yPercent: 110 });
        gsap.to(heading, {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }

      // One reveal per row — the rule draws itself, then the content settles.
      rows.forEach((row) => {
        const rule = row.querySelector(".exp-rule");
        const content = row.querySelectorAll(".exp-fade");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 85%" },
        });

        if (rule) {
          gsap.set(rule, { scaleX: 0, transformOrigin: "0% 50%" });
          tl.to(rule, { scaleX: 1, duration: 1.1, ease: "power3.inOut" });
        }

        gsap.set(content, { y: 18, opacity: 0 });
        tl.to(
          content,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.07,
          },
          "-=0.85",
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#10120f] px-6 py-[clamp(5rem,14vh,9rem)] text-white sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading — matched to the hero's scale language, not competing with it */}
        <header className="mb-[clamp(3rem,9vh,6rem)] max-w-3xl">
          <h2
            className="font-bold tracking-[-0.04em]"
            style={{
              fontSize: "clamp(2.25rem, 6.5vw, 5rem)",
              lineHeight: 0.95,
            }}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="exp-heading-line block">Where I&apos;ve</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="exp-heading-line block text-gray-500">
                worked
              </span>
            </span>
          </h2>
        </header>

        {/* One render path — layout is CSS, not duplicated markup */}
        <ol className="list-none">
          {experiences.map((exp) => (
            <li key={exp.company} className="exp-row relative">
              <div
                aria-hidden
                className="exp-rule h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0.22), rgba(255,255,255,0.06) 60%, transparent)",
                }}
              />

              <div className="grid grid-cols-1 gap-x-10 gap-y-3 py-[clamp(2rem,5vh,3.5rem)] md:grid-cols-[minmax(7rem,10rem)_minmax(0,1fr)] lg:grid-cols-[minmax(8rem,12rem)_minmax(0,22rem)_minmax(0,1fr)]">
                <p className="exp-fade text-sm text-gray-500 md:pt-1.5 md:text-base">
                  {exp.dates}
                </p>

                <div className="exp-fade lg:pt-0">
                  <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight tracking-[-0.02em]">
                    {exp.company}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-gray-400 md:text-base">
                    {exp.role}
                  </p>
                </div>

                <p className="exp-fade max-w-[62ch] text-[0.975rem] leading-[1.7] text-gray-400 md:text-base">
                  {exp.experience}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div
          aria-hidden
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.12), transparent 55%)",
          }}
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
