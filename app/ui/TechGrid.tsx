/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import gsap from "gsap";
import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import {
  SiFramer,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

const techItems: {
  id: string;
  label: string;
  Icon: React.ComponentType<any>;
  color: string;
}[] = [
  { id: "next", label: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { id: "ts", label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { id: "js", label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { id: "html", label: "HTML5", Icon: SiHtml5, color: "#E34C26" },
  { id: "react", label: "React", Icon: SiReact, color: "#61DAFB" },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    Icon: SiTailwindcss,
    color: "#06B6D4",
  },
  { id: "framer", label: "Framer", Icon: SiFramer, color: "#FFFFFF" },
  { id: "redux", label: "Redux Toolkit", Icon: SiRedux, color: "#764ABC" },
  { id: "gsap", label: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { id: "supabase", label: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  {
    id: "reactquery",
    label: "React Query",
    Icon: SiReactquery,
    color: "#FF4154",
  },
  { id: "vite", label: "Vite", Icon: SiVite, color: "#646CFF" },
];

export default function TechGrid() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      // The track renders the list twice, so a -50% shift loops seamlessly.
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: 46,
        ease: "none",
        repeat: -1,
        force3D: true,
      });
    },
    { scope: rootRef },
  );

  const slow = () =>
    tweenRef.current &&
    gsap.to(tweenRef.current, { timeScale: 0.22, duration: 0.6 });
  const resume = () =>
    tweenRef.current &&
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8 });

  const row = [...techItems, ...techItems];

  return (
    <div ref={rootRef} className="w-full">
      <div className="mb-4 flex items-center gap-4 sm:mb-5">
        <span className="text-xs font-medium tracking-[0.02em] text-gray-600">
          Tech stack
        </span>
        <span
          aria-hidden
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.12), transparent 65%)",
          }}
        />
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        }}
        onMouseEnter={slow}
        onMouseLeave={resume}
        onFocusCapture={slow}
        onBlurCapture={resume}
      >
        <ul
          ref={trackRef as any}
          className="flex w-max items-center gap-8 sm:gap-11"
        >
          {row.map(({ id, label, Icon, color }, i) => (
            <li
              key={`${id}-${i}`}
              tabIndex={0}
              aria-hidden={i >= techItems.length}
              className="group flex shrink-0 items-center gap-2.5 rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#10120f]"
            >
              <span className="shrink-0 opacity-50 grayscale transition duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0">
                <Icon size={20} color={color} />
              </span>
              <span className="whitespace-nowrap text-sm text-gray-500 transition-colors duration-500 ease-out group-hover:text-gray-200 group-focus-visible:text-gray-200">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
