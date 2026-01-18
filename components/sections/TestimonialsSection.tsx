"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { bricknetTestimonials } from "@/lib/constants/bricknet";

export function TestimonialsSection() {
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
    <section className="bg-primary-navy py-24 text-white lg:py-32" aria-label="Testimonials">
      <div className="wrapper px-5 lg:px-20">
        <div className="mb-20 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:mb-24">
          <div data-aos="fade-right" className="space-y-6">
            <span className="inline-block bg-accent-gold px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
              Trusted Partnerships
            </span>
            <h2 className="text-4xl font-medium leading-[1.1] lg:text-6xl">
              What our partners say
            </h2>
          </div>
          <div className="flex items-center gap-4 lg:ml-auto">
            <button
              onClick={goPrev}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-accent-gold hover:text-white hover:border-accent-gold"
            >
              ←
            </button>
            <button
              onClick={goNext}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-accent-gold hover:text-white hover:border-accent-gold"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <div key={safeIndex} data-aos="fade-up" className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="space-y-10">
                <Image
                  src="https://beacontrustee.co.in/assets/images/media/media-quote.png"
                  alt=""
                  width={80}
                  height={60}
                  className="opacity-20 grayscale brightness-0 invert"
                />
                <p className="font-serif text-3xl italic leading-relaxed text-white lg:text-5xl">
                  {active.quote}
                </p>
                <div className="space-y-2">
                  <p className="text-xl font-bold tracking-tight text-white">{active.name}</p>
                  <p className="text-sm font-black uppercase tracking-widest text-accent-gold">{active.role}</p>
                </div>
              </div>
            </div>
            <div className="hidden items-center justify-center lg:col-span-4 lg:flex">
              <div className="relative h-64 w-64 overflow-hidden rounded-full border border-accent-gold/20 p-4">
                 <div className="flex h-full w-full items-center justify-center rounded-full bg-accent-gold/5 text-6xl font-serif italic text-accent-gold/20">
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
