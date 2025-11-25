"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import ContactForm from "./ui/ContactForm";
import ExperienceSection from "./ui/ExperienceSection ";
import HeroSection from "./ui/HeroSection";
import MobileMenu from "./ui/MobileMenu";
import Navbar from "./ui/Navbar";
import ProjectSection from "./ui/ProjectSection";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Portfolio() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Refresh ScrollTrigger when page becomes visible again
  useGSAP(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page is visible again, refresh ScrollTrigger
        ScrollTrigger.refresh();
      }
    };

    // Refresh on focus (when user returns to tab)
    const handleFocus = () => {
      ScrollTrigger.refresh();
    };

    // Refresh on resize (including mobile orientation change)
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Initial refresh on mount
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

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

    const targetElement = targetRef?.current;

    if (targetElement) {
      // Refresh ScrollTrigger before scrolling to ensure accurate positions
      ScrollTrigger.refresh();

      // Kill any existing scroll animations
      gsap.killTweensOf(window);

      // Small delay to ensure refresh completes
      setTimeout(() => {
        gsap.to(window, {
          scrollTo: {
            y: targetElement,
            autoKill: false,
            offsetY: 80,
          },
          duration: 0.8,
          ease: "power2.out",
        });
      }, 10);
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

      {/* Sections with proper refs */}
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
