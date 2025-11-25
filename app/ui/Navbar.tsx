"use client";

import type React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface NavbarProps {
  onMenuOpen: () => void;
  onNavClick: (section: string) => void;
}

export default function Navbar({ onMenuOpen }: NavbarProps) {
  const navRef = useRef(null);

  // NAVBAR FADE-IN ANIMATION
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -70,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const normalText = target.querySelector(".text-normal");
    const overlay = target.querySelector(".text-overlay");

    gsap.to(normalText, {
      y: -100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(overlay, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleNavLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const normalText = target.querySelector(".text-normal");
    const overlay = target.querySelector(".text-overlay");

    gsap.to(normalText, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.in",
    });

    gsap.to(overlay, {
      y: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  const navItems = [
    { label: "Projects" },
    { label: "Services" },
    { label: "About" },
    { label: "Contact" },
  ];

  return (
    <nav
      ref={navRef}
      className="sm:max-w-7xl mt-5 flex justify-center fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center justify-between w-full mx-3 md:justify-center md:w-auto gap-8 bg-zinc-900 rounded-sm px-8 py-4 border border-zinc-800">
        {/* LOGO (MOBILE ONLY) */}
        <div className="md:hidden text-zinc-400 text-xl font-mono">
          &lt;/&gt;
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center text-2xl gap-8">
          {navItems.map((item, index) => (
            <div key={item.label} className="flex items-center gap-2">
              <a
                href="#"
                className="relative overflow-hidden inline-block cursor-pointer"
                onMouseEnter={handleNavHover}
                onMouseLeave={handleNavLeave}
              >
                <span className="text-normal block text-zinc-400">
                  {item.label}
                </span>
                <span
                  className="text-overlay absolute top-0 left-0 translate-y-full"
                  style={{
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.label}
                </span>
              </a>

              {index !== navItems.length - 1 && (
                <span className="text-zinc-600">|</span>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE BURGER BUTTON */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={onMenuOpen}
        >
          <span className="block w-6 h-0.5 bg-zinc-400" />
          <span className="block w-6 h-0.5 bg-zinc-400" />
          <span className="block w-6 h-0.5 bg-zinc-400" />
        </button>
      </div>
    </nav>
  );
}
