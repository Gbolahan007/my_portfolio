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
  border?: string;
}[] = [
  {
    id: "next",
    label: "Next.js",
    Icon: SiNextdotjs,
    color: "#000000",
    border: "1px solid #666",
  },
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
  {
    id: "framer",
    label: "Framer",
    Icon: SiFramer,
    color: "#000000",
    border: "1px solid #666",
  },
  { id: "redux", label: "Redux Toolkit", Icon: SiRedux, color: "#764ABC" },
  { id: "gsap", label: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { id: "supabase", label: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  {
    id: "reactquery",
    label: "React Query",
    Icon: SiReactquery,
    color: "#FF4154",
  },

  // ⭐ Added Vite
  { id: "vite", label: "Vite", Icon: SiVite, color: "#646CFF" },
];

export default function TechGrid() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);

    // initial state for heading
    gsap.set(headingRef.current, {
      y: -100,
      opacity: 0,
    });

    gsap.set(cards, {
      y: -200,
      opacity: 0,
      rotation: () => gsap.utils.random(-8, 8),
    });

    const handleSplashComplete = () => {
      gsap.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "bounce.out",
      });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "bounce.out",
        delay: 0.3,
      });
    };

    window.addEventListener("splashComplete", handleSplashComplete);

    return () => {
      window.removeEventListener("splashComplete", handleSplashComplete);
    };
  }, []);

  return (
    <div className="p-1">
      <h1 ref={headingRef} className="text-center pb-2.5">
        Tech Stack :
      </h1>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
        {techItems.map(({ id, label, Icon, color, border }, i) => (
          <div
            key={id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="flex items-center gap-4 rounded-md shadow-sm group-hover:scale-125 pointer"
            style={{
              background: color,
              border:
                border ||
                (color === "#F7DF1E"
                  ? "1px solid rgba(0,0,0,0.25)"
                  : undefined),
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded">
              <Icon size={28} color="#fff" />
            </div>

            <span
              className="font-semibold"
              style={{
                color: ["#F7DF1E", "#61DAFB", "#FFFCE1"].includes(color)
                  ? "#111"
                  : "#fff",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
