"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Portfolio() {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const avatarRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate elements from bottom
    tl.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        avatarRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        nameRef.current,
        {
          y: 100,
          opacity: 0,
          duration: 1,
        },
        "-=0.3"
      )
      .from(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
          duration: 1,
        },
        "-=0.7"
      )
      .from(
        descRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      );
  }, []);

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const overlay = target.querySelector(".text-overlay");

    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleNavLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const overlay = target.querySelector(".text-overlay");

    gsap.to(overlay, {
      yPercent: 0,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between py-8 px-4 overflow-hidden">
      {/* Navigation */}
      <nav ref={navRef} className="w-full max-w-6xl flex justify-center mb-8">
        <div className="flex items-center gap-8 bg-zinc-900 rounded-sm px-8 py-4 border border-zinc-800">
          <a
            href="#projects"
            className="relative overflow-hidden inline-block cursor-pointer"
            onMouseEnter={handleNavHover}
            onMouseLeave={handleNavLeave}
          >
            <span className="text-zinc-400">Projects</span>
            <span className="text-overlay absolute inset-0 text-white translate-y-full">
              Projects
            </span>
          </a>
          <span className="text-zinc-600">|</span>
          <a
            href="#resume"
            className="relative overflow-hidden inline-block cursor-pointer"
            onMouseEnter={handleNavHover}
            onMouseLeave={handleNavLeave}
          >
            <span className="text-zinc-400">Resume</span>
            <span className="text-overlay absolute inset-0 text-white translate-y-full">
              Resume
            </span>
          </a>
          <span className="text-zinc-600">|</span>
          <a
            href="#about"
            className="relative overflow-hidden inline-block cursor-pointer"
            onMouseEnter={handleNavHover}
            onMouseLeave={handleNavLeave}
          >
            <span className="text-zinc-400">About</span>
            <span className="text-overlay absolute inset-0 text-white translate-y-full">
              About
            </span>
          </a>
          <span className="text-zinc-600">|</span>
          <a
            href="#contact"
            className="relative overflow-hidden inline-block cursor-pointer"
            onMouseEnter={handleNavHover}
            onMouseLeave={handleNavLeave}
          >
            <span className="text-zinc-400">Contact</span>
            <span className="text-overlay absolute inset-0 text-white translate-y-full">
              Contact
            </span>
          </a>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors ml-4">
            Let&apos;s work 💻
          </button>
        </div>
      </nav>
    </div>
  );
}
