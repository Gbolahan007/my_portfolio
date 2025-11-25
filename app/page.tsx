"use client";

import { useRef, useState } from "react";
import Navbar from "./ui/Navbar";
import MobileMenu from "./ui/MobileMenu";
import HeroSection from "./ui/HeroSection";
import ProjectSection from "./ui/ProjectSection";
import ExperienceSection from "./ui/ExperienceSection ";
import ContactForm from "./ui/ContactForm";

export default function Portfolio() {
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

    const element = targetRef?.current;

    // if (element) {
    //   element.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }

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

      {/* Sections with refs */}
      <section id="projects" ref={projectsRef}>
        <ProjectSection />
      </section>

      <section id="services" ref={servicesRef}>
        <ExperienceSection />
      </section>

      <section id="about" ref={aboutRef}>
        {/* About section content */}
      </section>

      <section id="contact" ref={contactRef}>
        <ContactForm />
      </section>
    </div>
  );
}
