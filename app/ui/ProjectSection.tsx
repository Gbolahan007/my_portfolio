/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioSect from "./PortfolioSect";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current?.querySelectorAll(".title-line") || [], {
        y: 200,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          linkRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Stacking cards animation
      const cards = gsap.utils.toArray(".project-card");

      cards.forEach((card: any, index) => {
        const isLast = index === cards.length - 1;

        ScrollTrigger.create({
          trigger: card,
          start: "top 20%",
          end: isLast ? "bottom top" : "bottom 20%",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const scale = 1 - (1 - 0.9) * self.progress;
            const brightness = 1 - 0.3 * self.progress;
            gsap.to(card, {
              scale: scale,
              filter: `brightness(${brightness})`,
              ease: "none",
              duration: 0,
            });
          },
        });

        // Initial reveal animation
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-neutral-900">
      <div
        ref={sectionRef}
        className="bg-neutral-800 px-6 md:px-12 lg:px-16 py-24 relative "
      >
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div ref={titleRef} className="mb-6 overflow-hidden">
            <div className="title-line">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-none tracking-tight">
                SELECTED
              </h1>
            </div>
            <div className="title-line">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-none tracking-tight">
                PROJECTS<span className="text-neutral-500"> (4)</span>
              </h1>
            </div>
          </div>
          {/* Subtitle */}
          <div
            ref={subtitleRef}
            className="text-neutral-400 text-lg md:text-xl mb-8 uppercase tracking-wider"
          >
            (MY PORTFOLIO)
          </div>
          {/* Description */}
          <p
            ref={descRef}
            className="text-neutral-300 text-base md:text-lg max-w-2xl mb-12 leading-relaxed"
          >
            Previous projects that I have worked on in my 3+ years
            <br />
            of being a front-end web developer.
          </p>
          {/* All Projects Link */}
          <div ref={linkRef} className="">
            <a
              href="#"
              className="inline-flex items-center gap-3 text-white text-2xl md:text-3xl font-medium hover:text-neutral-300 transition-colors group"
            >
              All Projects
              <svg
                className="w-12 h-12 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </a>
          </div>
          <PortfolioSect />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
