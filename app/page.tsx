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
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const avatarRef = useRef(null);

  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // HERO TEXT ANIMATION
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(avatarRef.current, { scale: 0, opacity: 0, duration: 0.6 })
      .from(nameRef.current, { y: 100, opacity: 0, duration: 1 }, "-=0.3")
      .from(titleRef.current, { y: 100, opacity: 0, duration: 1 }, "-=0.7")
      .from(descRef.current, { y: 50, opacity: 0, duration: 0.8 }, "-=0.5");
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

    if (targetRef.current) {
      gsap.to(window, {
        scrollTo: {
          y: targetRef.current,
          autoKill: true,
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

      <div ref={projectsRef}>
        <ProjectSection />
      </div>

      <div ref={servicesRef}>
        <ExperienceSection />
      </div>

      <div ref={aboutRef}>{/* About section content can be added here */}</div>

      <div ref={contactRef}>
        <ContactForm />
      </div>
    </div>
  );
}
