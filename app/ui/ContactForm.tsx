"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { handleSubmit } from "../data/data-service";
import { toast, Toaster } from "sonner";

gsap.registerPlugin(ScrollTrigger);

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-4 px-8 font-bold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
    >
      {pending ? "SENDING..." : "SEND MESSAGE"}
    </button>
  );
}

const initialState = {
  success: false,
  message: "",
};

export default function ContactForm() {
  // Setup Action State
  const [state, formAction] = useActionState(handleSubmit, initialState);

  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subheaderRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const formElementsRef = useRef<Array<HTMLElement>>([]);
  const contactInfoRef = useRef<Array<HTMLElement>>([]);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message, {
          duration: 4000,
          style: {
            background: "#10B981",
            color: "#fff",
          },
        });
        formRef.current?.reset();
      } else {
        toast.error(state.message, {
          duration: 4000,
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        });
      }
    }
  }, [state]);

  // GSAP animation
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 1. Set Initial States (Kept same)
      gsap.set(
        [headerRef.current, subheaderRef.current, descriptionRef.current],
        {
          autoAlpha: 0, // Opacity and visibility hidden
          y: 50, // Start 50px below final position
        }
      );

      gsap.set(formElementsRef.current, { autoAlpha: 0, y: 50 });
      gsap.set(contactInfoRef.current, { autoAlpha: 0, x: 50 }); // Start 50px right // 2. Create the Master Timeline with ScrollTrigger (Kept same)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Start reveal a bit sooner
          end: "top 20%",
          toggleActions: "play none none reverse", // Play once on scroll down, reverse on scroll up
        },
      }); // 3. Animate Header Elements (Staggered Introduction)

      tl.to([headerRef.current, subheaderRef.current, descriptionRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out", // Smoother easing
        stagger: 0.15, // Stagger the header elements for a sequential title reveal
      }); // 4. Animate Form Elements (Staggered Fade/Slide Up)

      tl.to(
        formElementsRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1, // Stagger each input field
        },
        "-=0.4"
      ); // Start this animation *before* the header timeline finishes // 5. Animate Contact Info (Staggered Fade/Slide Right)

      tl.to(
        contactInfoRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1, // Stagger each contact link/div
        },
        "<"
      ); // Start at the same time as the form elements (using the "<" position parameter)
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const addFormElement = (el: HTMLElement | null) => {
    if (el && !formElementsRef.current.includes(el)) {
      formElementsRef.current.push(el);
    }
  };

  const addContactInfo = (el: HTMLElement | null) => {
    if (el && !contactInfoRef.current.includes(el)) {
      contactInfoRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#E8E8E3] p-8 md:p-16"
    >
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "8px",
            fontSize: "14px",
          },
        }}
      />

      <div className="w-full mx-auto">
        {/* Header */}
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
            {/* LinkedIn Link */}
            <a
              ref={addContactInfo}
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

            {/* GitHub Link */}
            <a
              ref={addContactInfo}
              href="https://github.com/Gbolahan007"
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
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span className="text-lg font-medium">GitHub</span>
            </a>

            {/* Location Info (Not a link) */}
            <div ref={addContactInfo} className="flex items-center gap-4">
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

            {/* Phone Link */}
            <a
              ref={addContactInfo}
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

            {/* WhatsApp Link */}
            <a
              ref={addContactInfo}
              href="https://wa.me/2348161554055"
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
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-medium">WhatsApp</div>
                <div className="text-gray-600">08161554055</div>
              </div>
            </a>

            {/* Email Link */}
            <a
              ref={addContactInfo}
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
            action={formAction}
            className="order-2 md:order-1 space-y-6"
          >
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={addFormElement}
                type="text"
                id="name"
                name="name"
                required
                placeholder="What's your name"
                className="w-full px-4 py-3 bg-white/50 border-none focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                ref={addFormElement}
                type="email"
                id="email"
                name="email"
                required
                placeholder="What's your email"
                className="w-full px-4 py-3 bg-white/50 border-none focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={addFormElement}
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Your message"
                className="w-full px-4 py-3 bg-white/50 border-none focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <div ref={addFormElement}>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
