"use client";
import { ArrowRight, Menu, ArrowDownLeft } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className=" top-0 w-full z-50 px-6 md:px-12 py-6 md:py-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo/Arrow */}
          <button className="text-stone-300 hover:text-white transition-colors">
            <ArrowDownLeft size={28} strokeWidth={1.5} />
          </button>
          {/* Book a Call Button */}
          <div className="flex items-center gap-4">
            <button className="border border-stone-400 text-stone-300 hover:bg-stone-900 hover:text-white rounded-full px-6 py-2 text-sm font-medium bg-transparent transition-colors">
              BOOK A CALL
            </button>
            {/* Menu Icon */}
            <button className="text-stone-300 hover:text-white transition-colors p-2 border border-stone-700 rounded-full">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 md:px-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Curved line - left side */}
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-30"
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
          >
            <path
              d="M 200 50 Q 300 200 200 350"
              stroke="currentColor"
              strokeWidth="40"
              fill="none"
              className="text-stone-700"
            />
          </svg>
          {/* Gradient overlay shapes */}
          <div className="absolute bottom-20 left-12 w-80 h-80 bg-linear-to-tr from-stone-900 to-black rounded-3xl opacity-50 blur-3xl" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image/Visual */}
          <div className="relative h-96 md:h-[500px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-black rounded-3xl overflow-hidden">
              <img
                src="/professional-portrait-portfolio.jpg"
                alt="Designer Developer Creator"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Main Heading */}
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold leading-tight tracking-tighter text-balance">
                <span className="text-stone-200">DESIGNER,</span>
                <br />
                <span className="text-stone-200">DEVELOPER,</span>
                <br />
                <span className="text-stone-200">CREATOR</span>
                <span className="text-stone-500"> /</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-stone-400 leading-relaxed max-w-md text-balance">
              With a passion for design and development, I take projects from
              ideation to launch, ensuring a seamless journey that leaves a
              lasting positive impact on the digital landscape and your
              business.
            </p>

            {/* CTA Button */}
            <div>
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-stone-200 text-black font-semibold rounded-full hover:bg-white transition-all duration-300 hover:gap-4">
                Explore My Work
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            {/* Stats or Secondary Info */}
            <div className="pt-8 border-t border-stone-800 flex gap-12">
              <div>
                <p className="text-sm text-stone-500 mb-2">EXPERIENCE</p>
                <p className="text-2xl font-bold text-stone-200">8+ Years</p>
              </div>
              <div>
                <p className="text-sm text-stone-500 mb-2">PROJECTS</p>
                <p className="text-2xl font-bold text-stone-200">150+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-stone-600 text-sm">
            <span>SCROLL</span>
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
