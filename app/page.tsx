"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./ui/Navbar";
import MobileMenu from "./ui/MobileMenu";
import HeroSection from "./ui/HeroSection";
import ProjectSection from "./ui/ProjectSection";
import ExperienceSection from "./ui/ExperienceSection ";
import ContactForm from "./ui/ContactForm";

export default function Portfolio() {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const avatarRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // HERO TEXT ANIMATION
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(avatarRef.current, { scale: 0, opacity: 0, duration: 0.6 })
      .from(nameRef.current, { y: 100, opacity: 0, duration: 1 }, "-=0.3")
      .from(titleRef.current, { y: 100, opacity: 0, duration: 1 }, "-=0.7")
      .from(descRef.current, { y: 50, opacity: 0, duration: 0.8 }, "-=0.5");
  }, []);

  return (
    <div className=" bg-[#10120f] text-white overflow-hidden ">
      {/* NAVIGATION */}
      <Navbar onMenuOpen={() => setMobileMenuOpen(true)} />

      {/* MOBILE MENU */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* HERO CONTENT */}
      <HeroSection />

      <ProjectSection />
      <ExperienceSection />
      <ContactForm />
    </div>
  );
}
