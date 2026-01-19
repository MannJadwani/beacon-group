"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { bricknetTestimonials } from "@/lib/constants/bricknet";

export function VariantBlueTestimonialsSection() {
  const testimonials = useMemo(() => [...bricknetTestimonials], []);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasTestimonials = testimonials.length > 0;
  const safeIndex = hasTestimonials ? activeIndex % testimonials.length : 0;
  const active = testimonials[safeIndex];

  const goPrev = () => {
    if (!hasTestimonials) return;
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    if (!hasTestimonials) return;
    setActiveIndex((i) => (i + 1) % testimonials.length);
  };

  if (!active) return null;

  return (
    <section className="relative bg-gradient-to-br from-[#183EFA] via-[#2952ff] to-[#183EFA] py-24 text-white lg:py-32 overflow-hidden" aria-label="Testimonials">
      {/* Soft decorative elements */}
      <div className="absolute top-10 right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-10 left-20 h-80 w-80 rounded-full bg-[#EDE44C]/10 blur-3xl" />
      
      <div className="wrapper relative z-10 px-5 lg:px-20">
        <div className="mb-20 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:mb-24">
          <div data-aos="fade-right" className="space-y-6">
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase text-white rounded-full">
              Trusted Partnerships
            </span>
            <h2 className="text-4xl font-semibold leading-[1.1] lg:text-6xl">
              What our partners say
            </h2>
          </div>
          <div className="flex items-center gap-3 lg:ml-auto">
            <button
              onClick={goPrev}
              className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-all hover:bg-[#EDE44C] hover:text-[#183EFA] shadow-lg"
            >
              ←
            </button>
            <button
              onClick={goNext}
              className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-all hover:bg-[#EDE44C] hover:text-[#183EFA] shadow-lg"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <div key={safeIndex} data-aos="fade-up" className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl bg-white/5 backdrop-blur-sm p-10 lg:p-14 space-y-10">
                <Image
                  src="https://beacontrustee.co.in/assets/images/media/media-quote.png"
                  alt=""
                  width={60}
                  height={45}
                  className="opacity-30 grayscale brightness-0 invert"
                />
                <p className="font-serif text-2xl italic leading-relaxed text-white lg:text-4xl">
                  {active.quote}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#EDE44C]/20 to-[#EDE44C]/5 flex items-center justify-center text-2xl font-serif italic text-[#EDE44C]">
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold tracking-tight text-white">{active.name}</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#EDE44C]/80">{active.role}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden items-center justify-center lg:col-span-4 lg:flex">
              <div className="relative h-64 w-64 overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm p-6 shadow-2xl">
                 <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#EDE44C]/10 to-transparent text-7xl font-serif italic text-[#EDE44C]/30">
                    {active.name.charAt(0)}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
