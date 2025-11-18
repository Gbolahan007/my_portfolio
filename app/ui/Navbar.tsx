"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface NavbarProps {
  onMenuOpen: () => void;
}

export default function Navbar({ onMenuOpen }: NavbarProps) {
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -50,
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

  return (
    <nav ref={navRef} className="w-full max-w-7xl flex justify-center mb-8">
      <div className="flex items-center justify-between w-full md:justify-center md:w-auto gap-8 bg-zinc-900 rounded-sm px-8 py-4 border border-zinc-800">
        <div className="md:hidden text-zinc-400 text-xl font-mono">
          &lt;/&gt;
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center text-xl gap-8">
          {["Projects", "Services", "About", "Contact"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <a
                href={`#${item.toLowerCase()}`}
                className="relative overflow-hidden inline-block cursor-pointer"
                onMouseEnter={handleNavHover}
                onMouseLeave={handleNavLeave}
              >
                <span className="text-normal block text-zinc-400">{item}</span>
                <span
                  className="text-overlay absolute top-0 left-0 translate-y-full"
                  style={{
                    WebkitTextStroke: "1px white",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item}
                </span>
              </a>

              {item !== "Contact" && <span className="text-zinc-600">|</span>}
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
