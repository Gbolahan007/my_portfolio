"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  description: string;
  liveLink: string;
  githubLink: string;
  techStack: string[];
}

const PortfolioSect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement[]>([]);
  const numberRef = useRef<HTMLHeadingElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      image: "/urbfit.PNG",
      title: "e-commerce",
      description:
        "A modern e-commerce app with product pages, animations and clean UI.",
      liveLink: "https://urbfit.vercel.app/",
      githubLink: "https://github.com/Gbolahan007/urbfit-e-commrce",
      techStack: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    },
    {
      id: 2,
      image: "/inventory.png",
      title: "Inventory management",
      description:
        "A complete inventory tracking system with live stock updates.",
      liveLink: "https://inventory-management-ut4g.vercel.app/dashboard",
      githubLink: "https://github.com/Gbolahan007/Inventory-Management",
      techStack: ["React", "Node.js", "MongoDB", "Express"],
    },
    {
      id: 3,
      image: "/sisicaro.PNG",
      title: "Sisicaro Marketing agency",
      description:
        "A sleek agency landing page with smooth animations and branding.",
      liveLink: "https://sisicaro.com",
      githubLink: "https://github.com/Gbolahan007/sisi-caro",
      techStack: ["Next.js", "GSAP", "Framer Motion", "Javascript"],
    },
    {
      id: 4,
      image: "/portfolio-3.png",
      title: "Eni's restaurant Menu",
      description:
        "A digital restaurant menu with categories and mobile-first design.",
      liveLink: "https://eni-s-restaurant-lounge.vercel.app/",
      githubLink: "https://github.com/Gbolahan007/Eni-s-Restaurant-Lounge-",
      techStack: ["React", "Firebase", "Tailwind CSS"],
    },
  ];

  // LENIS SETUP
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.3,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  // MOBILE ANIMATIONS
  useGSAP(
    () => {
      if (window.innerWidth >= 640) return;

      const items = gsap.utils.toArray<HTMLElement>(".mobile-portfolio-item");

      items.forEach((item) => {
        const number = item.querySelector(".mobile-number");
        const imageContainer = item.querySelector(".mobile-image");
        const description = item.querySelector(".mobile-description");
        const techStack = item.querySelector(".mobile-tech-stack");
        const links = item.querySelector(".mobile-links");

        gsap.set([number, imageContainer, description, techStack, links], {
          autoAlpha: 0,
          y: 60,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        });

        tl.to(number, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" })
          .to(
            imageContainer,
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          )
          .to(
            description,
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.4"
          )
          .to(
            techStack,
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          )
          .to(
            links,
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          );
      });
    },
    { scope: mobileContainerRef, dependencies: [] }
  );

  // DESKTOP ANIMATIONS
  useGSAP(
    () => {
      if (window.innerWidth < 640) return;

      const images = imageRef.current;
      const total = images.length;
      if (!images[0]) return;

      images.forEach((img, i) => {
        gsap.set(img, { y: i === 0 ? "0%" : window.innerHeight, scale: 1 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom+=250% center",
          scrub: 1.2,
          pin: true,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        tl.to(
          images[i],
          { scale: 0.7, rotation: 5, duration: 1, ease: "none" },
          i
        ).to(images[i + 1], { y: "0%", duration: 1, ease: "none" }, i);
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom+=250% center",
        scrub: 1.2,
        onUpdate: (self) => {
          const index = Math.min(Math.floor(self.progress * total), total - 1);
          setActiveIndex(index);
        },
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <>
      {/* MOBILE VERSION */}
      <div
        ref={mobileContainerRef}
        className="block sm:hidden min-h-screen py-12"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {portfolioItems.map((item, index) => (
            <div key={item.id} className="mobile-portfolio-item space-y-4">
              <h3 className="mobile-number text-5xl font-bold text-white">
                {String(index + 1).padStart(2, "0")}.
              </h3>

              <div className="mobile-image relative w-full h-[50vh] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>

              <p className="mobile-description text-white/70 text-base leading-relaxed">
                {item.description}
              </p>

              <div className="mobile-tech-stack flex flex-wrap gap-2">
                {item.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mobile-links flex items-center gap-4">
                <a
                  href={item.liveLink}
                  target="_blank"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <span className="font-semibold tracking-wide text-sm">
                    LINK UP
                  </span>
                  <FiExternalLink size={16} />
                </a>
                <a
                  href={item.githubLink}
                  target="_blank"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaGithub size={22} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div
        ref={containerRef}
        className="hidden sm:block min-h-screen py-12 md:py-20 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* LEFT PANEL */}
          <div className="lg:w-1/3 shrink-0">
            <h2
              ref={numberRef}
              className="text-[80px] sm:text-[120px] md:text-[150px] lg:text-[200px] font-bold text-white leading-none"
            >
              {String(activeIndex + 1).padStart(2, "0")}.
            </h2>

            <p className="project-desc hidden lg:block text-white/70 text-lg leading-relaxed max-w-sm mt-6">
              {portfolioItems[activeIndex].description}
            </p>

            <div className="project-desc hidden lg:flex flex-wrap gap-2 mt-4 max-w-sm">
              {portfolioItems[activeIndex].techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-desc hidden lg:flex items-center gap-4 mt-6">
              <a
                href={portfolioItems[activeIndex].liveLink}
                target="_blank"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <span className="font-semibold tracking-wide text-sm">
                  LINK UP
                </span>
                <FiExternalLink size={16} />
              </a>
              <a
                href={portfolioItems[activeIndex].githubLink}
                target="_blank"
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaGithub size={22} />
              </a>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:w-2/3 flex flex-col items-center justify-center">
            <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] relative max-w-3xl">
              {portfolioItems.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) imageRef.current[i] = el;
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="relative w-full h-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      draggable={false}
                    />

                    <p className="project-desc lg:hidden absolute bottom-4 left-4 right-4 text-white/90 text-sm backdrop-blur-md bg-black/40 px-3 py-2 rounded-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioSect;
