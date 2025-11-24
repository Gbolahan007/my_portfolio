"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Navbar from "./ui/Navbar";
import MobileMenu from "./ui/MobileMenu";
import HeroSection from "./ui/HeroSection";
import ProjectSection from "./ui/ProjectSection";
import ExperienceSection from "./ui/ExperienceSection ";
import ContactForm from "./ui/ContactForm";

gsap.registerPlugin(ScrollToPlugin);

export default function Portfolio() {
  // Remove unused refs
  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    let targetRef;

    switch (section) {
      case "projects":
        targetRef = projectsRef;
        break;
      case "services":
        targetRef = servicesRef;
        break;
      case "about":
        targetRef = aboutRef;
        break;
      case "contact":
        targetRef = contactRef;
        break;
      default:
        return;
    }

    if (targetRef.current) {
      gsap.to(window, {
        scrollTo: {
          y: targetRef.current,
          autoKill: true,
          offsetY: 80, // Add offset for navbar height
        },
        duration: 1,
        ease: "power3.inOut",
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#10120f] text-white overflow-hidden">
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

      {/* Add proper section wrappers with IDs */}
      <section id="projects" ref={projectsRef}>
        <ProjectSection />
      </section>

      <section id="services" ref={servicesRef}>
        <ExperienceSection />
      </section>

      <section id="about" ref={aboutRef}>
        {/* About section content can be added here */}
      </section>

      <section id="contact" ref={contactRef}>
        <ContactForm />
      </section>
    </div>
  );
}
