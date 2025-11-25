"use client";

import { useState } from "react";
import Navbar from "./ui/Navbar";
import MobileMenu from "./ui/MobileMenu";
import HeroSection from "./ui/HeroSection";
import ProjectSection from "./ui/ProjectSection";
import ExperienceSection from "./ui/ExperienceSection ";
import ContactForm from "./ui/ContactForm";

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    const target = document.querySelector(`.section-${section}`);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#10120f] text-white overflow-x-hidden">
      {/* NAVIGATION */}
      <Navbar
        onMenuOpen={() => setMobileMenuOpen(true)}
        onNavClick={handleNavClick}
      />

      {/* MOBILE MENU */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavClick={handleNavClick}
      />

      {/* HERO CONTENT */}
      <HeroSection />

      {/* Sections without refs and ids */}
      <section className="section-projects">
        <ProjectSection />
      </section>

      <section className="section-services">
        <ExperienceSection />
      </section>

      <section className="section-about">{/* About section content */}</section>

      <section className="section-contact">
        <ContactForm />
      </section>
    </div>
  );
}
