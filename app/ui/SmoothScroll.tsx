// // SmoothScroll.tsx
// "use client";

// import { useEffect, ReactNode } from "react";
// import Lenis from "lenis";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { gsap } from "gsap";

// gsap.registerPlugin(ScrollTrigger);

// interface SmoothScrollProps {
//   children: ReactNode;
// }

// export default function SmoothScroll({ children }: SmoothScrollProps) {
//   useEffect(() => {
//     const isMobile = window.innerWidth < 1024;

//     const handleResize = () => {
//       // Refresh with 'true' to force a recalculation of all triggers
//       ScrollTrigger.refresh(true);
//     };

//     // Use a slight delay for the initial refresh to ensure all DOM elements are rendered
//     const initialRefreshTimeout = setTimeout(
//       () => ScrollTrigger.refresh(true),
//       100
//     );

//     window.addEventListener("resize", handleResize);
//     window.addEventListener("orientationchange", handleResize);

//     if (isMobile) {
//       return () => {
//         // Cleanup global listeners
//         clearTimeout(initialRefreshTimeout);
//         window.removeEventListener("resize", handleResize);
//         window.removeEventListener("orientationchange", handleResize);

//         // Kill ScrollTriggers only on unmount (they are needed for native scroll)
//         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       };
//     }

//     // --- 3. Desktop/Lenis Setup ---
//     const lenis = new Lenis({
//       lerp: 0.08,
//       duration: 1.2,
//       touchMultiplier: 2,
//       wheelMultiplier: 1,
//       infinite: false,
//       orientation: "vertical",
//       gestureOrientation: "vertical",
//     });

//     lenis.on("scroll", ScrollTrigger.update);

//     // Request animation frame loop for desktop
//     let rafId: number;

//     function raf(time: number) {
//       lenis.raf(time);
//       rafId = requestAnimationFrame(raf);
//     }

//     rafId = requestAnimationFrame(raf);

//     // Cleanup function for desktop
//     return () => {
//       // Cleanup global listeners
//       clearTimeout(initialRefreshTimeout);
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("orientationchange", handleResize);

//       if (rafId) cancelAnimationFrame(rafId);
//       lenis.destroy();

//       // Remove Lenis-specific listener (only if we need more complex cleanup, but destroy is sufficient)
//       // lenis.off('scroll', ScrollTrigger.update);

//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return <>{children}</>;
// }
