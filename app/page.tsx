"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Portfolio() {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const avatarRef = useRef(null);
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between py-8 px-4 overflow-hidden">
      {/* Navigation */}
      <nav ref={navRef} className="w-full max-w-6xl flex justify-center mb-8">
        <div className="flex items-center justify-between w-full md:justify-center md:w-auto gap-8 bg-zinc-900 rounded-sm px-8 py-4 border border-zinc-800">
          {/* Mobile: Code icon */}
          <div className="md:hidden text-zinc-400 text-xl font-mono">
            &lt;/&gt;
          </div>

          {/* Desktop: Nav items */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#projects"
              className="relative overflow-hidden inline-block cursor-pointer"
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              <span className="text-normal block text-zinc-400">Projects</span>
              <span
                className="text-overlay absolute top-0 left-0 translate-y-full"
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "transparent",
                }}
              >
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
              <span className="text-normal block text-zinc-400">Services</span>
              <span
                className="text-overlay absolute top-0 left-0 translate-y-full"
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Services
              </span>
            </a>
            <span className="text-zinc-600">|</span>
            <a
              href="#about"
              className="relative overflow-hidden inline-block cursor-pointer"
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              <span className="text-normal block text-zinc-400">About</span>
              <span
                className="text-overlay absolute top-0 left-0 translate-y-full"
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "transparent",
                }}
              >
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
              <span className="text-normal block text-zinc-400">Contact</span>
              <span
                className="text-overlay absolute top-0 left-0 translate-y-full"
                style={{
                  WebkitTextStroke: "1px white",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Contact
              </span>
            </a>
          </div>

          {/* Mobile: Hamburger menu */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-zinc-400 transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-zinc-400 transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-zinc-400 transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-24 left-4 right-4 bg-zinc-900 border border-zinc-800 rounded-sm p-6 z-50">
          <div className="flex flex-col gap-4">
            <a
              href="#projects"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </a>
            <div className="h-px bg-zinc-800"></div>
            <a
              href="#resume"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <div className="h-px bg-zinc-800"></div>
            <a
              href="#about"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <div className="h-px bg-zinc-800"></div>
            <a
              href="#contact"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
