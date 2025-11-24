import React, { useEffect, useRef, FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Types
export interface Experience {
  company: string;
  role: string;
  experience: string;
  dates: string;
}

const experiences: Experience[] = [
  {
    company: "SeemlyProfessions",
    role: "Frontend Developer Intern → Lead Frontend Developer",
    experience:
      "Joined as a Frontend Developer Intern where I built responsive interfaces and optimized UI components. Due to my performance, I was promoted to Lead Frontend Developer. I led the frontend architecture, improved website performance, and introduced modern UI patterns that significantly enhanced user experience. My contributions helped reduce bounce rates, improved conversion flow, and increased overall client satisfaction.",
    dates: "2023 – 2024",
  },
  {
    company: "Eni’s Restaurant & Lounge",
    role: "Freelance Frontend Developer",
    experience:
      "Designed and developed a complete digital menu system for both the restaurant and lounge. Built a clean, modern UI and added category-based filtering for meals and drinks. My work improved staff workflow, made customer ordering faster, and strengthened the brand’s online presence.",
    dates: "2024",
  },
  {
    company: "Sisicaro Marketing Firm",
    role: "Freelance Frontend Developer",
    experience:
      "Worked with the marketing team to build high-converting landing pages, optimized website speed, and implemented designs that aligned with their brand strategy. My contributions improved lead generation and helped the company present a more professional digital image to clients.",
    dates: "2024",
  },
  {
    company: "Commodores Hotel & Bar",
    role: "Frontend Developer",
    experience:
      "Developed the company’s main website and built a custom inventory management web application tailored specifically for hotel and bar operations. The system allowed staff to manage stock, track sales, monitor product usage, and generate real-time insights. This significantly reduced stock wastage, improved transparency, and saved the business time and money by eliminating manual record-keeping.",
    dates: "2024 – Present",
  },
];

const ExperienceSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const experienceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileCardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      // Desktop timeline item animation
      experienceRefs.current.forEach((item) => {
        if (!item) return;

        const companyEl = item.querySelector(
          ".company-name"
        ) as HTMLElement | null;
        const roleEl = item.querySelector(".role") as HTMLElement | null;
        const textEl = item.querySelector(
          ".experience-text"
        ) as HTMLElement | null;
        const datesEl = item.querySelector(".dates") as HTMLElement | null;
        const dotEl = item.querySelector(".timeline-dot") as HTMLElement | null;
        const lineEl = item.querySelector(
          ".timeline-line"
        ) as HTMLElement | null;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        });

        if (companyEl)
          tl.from(companyEl, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });

        if (roleEl)
          tl.from(
            roleEl,
            { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" },
            "-=0.4"
          );

        if (textEl)
          tl.from(
            textEl,
            { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" },
            "-=0.3"
          );

        if (datesEl)
          tl.from(
            datesEl,
            { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
            "-=0.4"
          );

        if (dotEl)
          tl.from(
            dotEl,
            { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(1.7)" },
            "-=0.5"
          );

        if (lineEl)
          tl.from(
            lineEl,
            {
              scaleY: 0,
              transformOrigin: "top",
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.3"
          );
      });

      // Mobile card animations (text reveal similar to project section)
      mobileCardRefs.current.forEach((card) => {
        if (!card) return;

        const companyEl = card.querySelector(
          ".mobile-company-name"
        ) as HTMLElement | null;
        const roleEl = card.querySelector(".mobile-role") as HTMLElement | null;
        const textEl = card.querySelector(
          ".mobile-experience-text"
        ) as HTMLElement | null;
        const datesEl = card.querySelector(
          ".mobile-dates"
        ) as HTMLElement | null;

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        if (companyEl)
          mobileTl.from(companyEl, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });

        if (roleEl)
          mobileTl.from(
            roleEl,
            { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
            "-=0.5"
          );

        if (textEl)
          mobileTl.from(
            textEl,
            { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );

        if (datesEl)
          mobileTl.from(
            datesEl,
            { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-neutral-800 px-6 md:px-12 lg:px-16 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-20 tracking-tight text-center"
        >
          MY EXPERIENCE
        </h1>

        <div className="relative max-w-6xl mx-auto">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={exp.company + index}
                ref={(el) => {
                  if (el) experienceRefs.current[index] = el;
                }}
                className="relative mb-24 last:mb-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                  {/* Desktop LEFT content */}
                  {isLeft && (
                    <div className="hidden lg:block lg:text-right">
                      <h2 className="company-name text-4xl md:text-5xl font-bold text-white mb-4">
                        {exp.company}
                      </h2>
                      <p className="role text-xl md:text-2xl text-gray-300 mb-4">
                        Role: {exp.role}
                      </p>
                      <p className="experience-text text-base md:text-lg text-gray-400 leading-relaxed mb-4">
                        <span className="font-semibold">Experience:</span>{" "}
                        {exp.experience}
                      </p>
                      <p className="dates text-lg text-gray-500 font-medium">
                        {exp.dates}
                      </p>
                    </div>
                  )}

                  {/* Desktop timeline center */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 hidden lg:flex flex-col items-center h-full">
                    <div className="timeline-dot w-6 h-6 rounded-full bg-red-500 border-4 border-neutral-800 z-10"></div>

                    {index < experiences.length - 1 && (
                      <div className="timeline-line w-0.5 flex-1 bg-gray-700 mt-2"></div>
                    )}
                  </div>

                  {/* Desktop RIGHT content */}
                  {!isLeft && (
                    <div className="hidden lg:block lg:col-start-2">
                      <h2 className="company-name text-4xl md:text-5xl font-bold text-white mb-4">
                        {exp.company}
                      </h2>
                      <p className="role text-xl md:text-2xl text-gray-300 mb-4">
                        Role: {exp.role}
                      </p>
                      <p className="experience-text text-base md:text-lg text-gray-400 leading-relaxed mb-4">
                        <span className="font-semibold">Experience:</span>{" "}
                        {exp.experience}
                      </p>
                      <p className="dates text-lg text-gray-500 font-medium">
                        {exp.dates}
                      </p>
                    </div>
                  )}
                </div>

                {/* MOBILE TIMELINE + CONTENT */}
                <div className="lg:hidden flex items-start gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className="timeline-dot w-5 h-5 rounded-full bg-red-500 shrink-0"></div>

                    {index < experiences.length - 1 && (
                      <div className="timeline-line w-0.5 flex-1 bg-gray-700 mt-2 min-h-40"></div>
                    )}
                  </div>

                  <div
                    ref={(el) => {
                      if (el) mobileCardRefs.current[index] = el;
                    }}
                    className="flex-1 pb-12"
                  >
                    <h2 className="mobile-company-name text-3xl font-bold text-white mb-3">
                      {exp.company}
                    </h2>
                    <p className="mobile-role text-lg text-gray-300 mb-3">
                      Role: {exp.role}
                    </p>
                    <p className="mobile-experience-text text-sm text-gray-400 leading-relaxed mb-3">
                      <span className="font-semibold">Experience:</span>{" "}
                      {exp.experience}
                    </p>
                    <p className="mobile-dates text-base text-gray-500 font-medium">
                      {exp.dates}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
