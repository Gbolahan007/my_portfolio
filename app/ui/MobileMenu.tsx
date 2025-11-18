"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!isOpen || !mobileMenuRef.current) return;

      const menu = mobileMenuRef.current;

      // Smooth slide + fade-in
      gsap.fromTo(
        menu,
        {
          x: "100%",
          scale: 0.95,
          opacity: 0,
        },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: "power4.out",
        }
      );

      // Close button animation
      const closeBtn = menu.querySelector(".close-btn");
      gsap.fromTo(
        closeBtn,
        { opacity: 0, scale: 0.6, rotate: -20 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "back.out(1.7)",
        }
      );

      // Stagger menu items
      const items = menu.querySelectorAll("a");
      gsap.fromTo(
        items,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          delay: 0.1,
          ease: "power3.out",
        }
      );
    },
    { dependencies: [isOpen] }
  );

  const handleClose = () => {
    if (!mobileMenuRef.current) return;

    gsap.to(mobileMenuRef.current, {
      x: "100%",
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={mobileMenuRef}
      className="md:hidden fixed inset-0 bg-zinc-900 border-l border-zinc-800 p-10 z-50 h-screen w-full flex flex-col"
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={handleClose}
        className="close-btn absolute cursor-pointer top-6 right-6 text-white text-5xl font-bold hover:scale-110 transition-transform duration-200"
        aria-label="Close menu"
      >
        ×
      </button>

      {/* MENU ITEMS */}
      <div className="flex flex-col justify-center h-full">
        {["Projects", "Services", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-zinc-300 text-3xl mb-8"
            onClick={handleClose}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
