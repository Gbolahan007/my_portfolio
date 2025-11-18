"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const particles: HTMLDivElement[] = [];
    const particleCount = 50;

    // ---------------- PARTICLES ----------------
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 4 + 2;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }

    particlesRef.current = particles;

    // ---------------- LINES ----------------
    const lineCount = 8;

    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement("div");
      line.className = "line";

      const angle = Math.random() * 360;
      const length = Math.random() * 100 + 50;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      line.style.width = `${length}px`;
      line.style.left = `${x}px`;
      line.style.top = `${y}px`;
      line.style.transform = `rotate(${angle}deg)`;

      container.appendChild(line);

      gsap.to(line, {
        x: `+=${Math.random() * 150 - 75}`,
        y: `+=${Math.random() * 150 - 75}`,
        rotation: `+=${Math.random() * 180 - 90}`,
        opacity: 0.1,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }

    // Cleanup
    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          overflow: "hidden",
        }}
      />

      <style jsx>{`
        .particle {
          position: absolute;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 0.2) 100%
          );
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }

        .line {
          position: absolute;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 100%
          );
          pointer-events: none;
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
}
