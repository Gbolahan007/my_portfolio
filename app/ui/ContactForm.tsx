"use client";

import { useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { handleSubmit } from "../data/data-service";

gsap.registerPlugin(ScrollTrigger);

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-4 px-8 font-bold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 cursor-pointer"
    >
      {pending ? "SENDING..." : "SEND MESSAGE"}
    </button>
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subheaderRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formElementsRef = useRef<
    Array<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>
  >([]);
  const contactInfoRef = useRef<Array<HTMLDivElement | HTMLAnchorElement>>([]);

  // GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [headerRef.current, subheaderRef.current, descriptionRef.current],
        { autoAlpha: 0, y: 60 }
      );

      gsap.set(formElementsRef.current, { autoAlpha: 0, y: 60 });
      gsap.set(contactInfoRef.current, { autoAlpha: 0, x: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      tl.to(headerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          subheaderRef.current,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        )
        .to(
          descriptionRef.current,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );

      formElementsRef.current.forEach((el, i) => {
        tl.to(
          el,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          `-=${0.4 - i * 0.05}`
        );
      });

      contactInfoRef.current.forEach((el, i) => {
        tl.to(
          el,
          { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" },
          `-=${0.6 - i * 0.1}`
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const addToFormElements = (
    el: HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null
  ) => {
    if (el && !formElementsRef.current.includes(el)) {
      formElementsRef.current.push(el);
    }
  };

  const addToContactInfo = (el: HTMLDivElement | HTMLAnchorElement | null) => {
    if (el && !contactInfoRef.current.includes(el)) {
      contactInfoRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#E8E8E3] p-8 md:p-16"
    >
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1
            ref={headerRef}
            className="text-6xl md:text-9xl font-black mb-2 leading-tight text-black"
          >
            GET IN TOUCH
            <br />
            WITH ME
          </h1>
          <p
            ref={subheaderRef}
            className="text-sm font-semibold mb-8 text-black"
          >
            (CONTACT ME)
          </p>
          <p ref={descriptionRef} className="text-2xl text-black">
            Want to discuss your project with me? Send me a message.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-black">
          {/* Contact Info */}
          <div className="order-1 md:order-2 flex flex-col space-y-8">
            <a
              ref={addToContactInfo}
              href="https://www.linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-70 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <span className="text-lg font-medium">LinkedIn</span>
            </a>

            {/* Location */}
            <div ref={addToContactInfo} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-medium">Location</div>
                <div className="text-gray-600">Remote</div>
              </div>
            </div>

            {/* Phone */}
            <a
              ref={addToContactInfo}
              href="tel:08063480560"
              className="flex items-center gap-4 hover:opacity-70 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.72 11.72 0 003.67.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.26.2 2.49.59 3.67a1 1 0 01-.24 1l-2.23 2.12z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-medium">Phone</div>
                <div className="text-gray-600">08063480560</div>
              </div>
            </a>

            {/* Email */}
            <a
              ref={addToContactInfo}
              href="mailto:lawalomogbolahan08@gmail.com"
              className="flex items-center gap-4 hover:opacity-70 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-medium">Email</div>
                <div className="text-gray-600">
                  lawalomogbolahan08@gmail.com
                </div>
              </div>
            </a>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            action={handleSubmit}
            className="order-2 md:order-1 space-y-6"
          >
            <div ref={addToFormElements}>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="What's your name"
                className="w-full px-4 py-3 bg-white/50 border-none rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div ref={addToFormElements}>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="What's your email"
                className="w-full px-4 py-3 bg-white/50 border-none rounded-none focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div ref={addToFormElements}>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Your message"
                className="w-full px-4 py-3 bg-white/50 border-none rounded-none focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <div ref={addToFormElements}>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
