import React, { useEffect, useRef, FC } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Types
interface Experience {
  company: string;
  role: string;
  experience: string;
  dates: string;
}

const ExperienceSection: FC = () => {
  // Refs
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const experienceRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current && sectionRef.current) {
        gsap.from(titleRef.current, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Experience items animation
      experienceRefs.current.forEach((item) => {
        if (!item) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

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

        if (companyEl) {
          tl.from(companyEl, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (roleEl) {
          tl.from(
            roleEl,
            {
              y: 30,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }

        if (textEl) {
          tl.from(
            textEl,
            {
              y: 30,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }

        if (datesEl) {
          tl.from(
            datesEl,
            {
              y: 20,
              opacity: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }

        if (dotEl) {
          tl.from(
            dotEl,
            {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            "-=0.5"
          );
        }

        if (lineEl) {
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
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences: Experience[] = [
    {
      company: "Prishusoft",
      role: "Software Engineer",
      experience:
        "Developing and maintaining web applications using the PEAN stack. Collaborating with cross-functional teams to deliver high-quality software solutions.",
      dates: "July 2024 - Present",
    },
    {
      company: "Prishusoft",
      role: "MERN Stack Developer Intern",
      experience:
        "Developed multiple minor projects and one major project. Gained hands-on experience in building full-stack web applications.",
      dates: "Jan 2024 - June 2024",
    },
    {
      company: "Cantech Networks Private Limited",
      role: "Cloud Intern",
      experience:
        "Worked on cloud infrastructure projects and gained experience with cloud technologies and deployment strategies.",
      dates: "Sep 2023 - Dec 2023",
    },
    {
      company: "Tech Solutions Ltd",
      role: "Frontend Developer Intern",
      experience:
        "Built responsive web interfaces and collaborated with design team to implement user-friendly features.",
      dates: "May 2023 - Aug 2023",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="w-full bg-neutral-800 px-6 md:px-12 lg:px-16 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-20 tracking-tight"
        >
          MY EXPERIENCE
        </h1>

        <div className="relative max-w-6xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) experienceRefs.current[index] = el;
              }}
              className="relative mb-24 last:mb-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Left side */}
                {index % 2 === 0 && (
                  <div className="lg:text-right">
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
                      Dates: {exp.dates}
                    </p>
                  </div>
                )}

                {/* Timeline */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 hidden lg:flex flex-col items-center h-full">
                  <div className="timeline-dot w-6 h-6 rounded-full bg-red-500 border-4 border-neutral-800 z-10"></div>
                  <div className="timeline-line w-0.5 flex-1 bg-gray-700 mt-2"></div>
                </div>

                {/* Right side */}
                {index % 2 !== 0 && (
                  <div className="lg:col-start-2">
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
                      Dates: {exp.dates}
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile Timeline */}
              <div className="lg:hidden flex items-start gap-4">
                <div className="flex flex-col items-center pt-1">
                  <div className="timeline-dot w-5 h-5 rounded-full bg-red-500 shrink-0"></div>
                  <div className="timeline-line w-0.5 flex-1 bg-gray-700 mt-2 min-h-[200px]"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h2 className="company-name text-3xl md:text-4xl font-bold text-white mb-3">
                    {exp.company}
                  </h2>
                  <p className="role text-lg md:text-xl text-gray-300 mb-3">
                    Role: {exp.role}
                  </p>
                  <p className="experience-text text-sm md:text-base text-gray-400 leading-relaxed mb-3">
                    <span className="font-semibold">Experience:</span>{" "}
                    {exp.experience}
                  </p>
                  <p className="dates text-base text-gray-500 font-medium">
                    Dates: {exp.dates}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
