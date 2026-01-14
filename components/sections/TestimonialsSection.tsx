"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { bricknetTestimonials } from "@/lib/constants/bricknet";

export function TestimonialsSection() {
  const testimonials = useMemo(() => [...bricknetTestimonials], []);
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % testimonials.length);

  const active = testimonials[activeIndex];

  if (!active) return null;

  return (
    <section className="bg-base-white" aria-label="Testimonials">
      <div className="wrapper px-5 py-10 lg:p-20">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-10">
            <span className="label label-solid-orange">Testimonials</span>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-1 flex-col gap-6">
                <h2 data-aos="fade" className="text-4xl font-medium leading-tight text-secondary-navy">
                  What Our Clients Say
                </h2>
                <p className="text-lg leading-relaxed text-base-grey">
                  Hear from those who&apos;ve built with us and see how we brought
                  their visions to life.
                </p>
              </div>

              <nav className="flex gap-6" aria-label="Testimonial navigation">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex items-center justify-center border border-secondary-navy px-6 py-3.5 text-secondary-navy transition-colors hover:border-primary-orange hover:bg-primary-orange hover:text-base-white"
                  aria-label="Previous testimonial"
                >
                  <span aria-hidden="true" className="text-xl">
                    ←
                  </span>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center justify-center border border-secondary-navy px-6 py-3.5 text-secondary-navy transition-colors hover:border-primary-orange hover:bg-primary-orange hover:text-base-white"
                  aria-label="Next testimonial"
                >
                  <span aria-hidden="true" className="text-xl">
                    →
                  </span>
                </button>
              </nav>
            </div>
          </div>

          <div>
            <blockquote data-aos="fade-up" className="flex flex-col gap-10 bg-primary-light-orange p-10">
              <Image
                src="/bricknet/images/icon-quote.svg"
                alt=""
                width={60}
                height={46}
                aria-hidden="true"
              />

              <div className="flex flex-1 flex-col gap-4">
                <p className="text-xl font-medium leading-normal text-secondary-navy">
                  {active.quote}
                </p>
                <p className="mt-auto text-base leading-relaxed text-base-grey">
                  {active.body}
                </p>
              </div>

              <footer className="text-xl">
                <cite className="not-italic">
                  <span className="font-semibold text-secondary-navy">
                    {active.name},
                  </span>{" "}
                  <span className="text-base-grey">{active.role}</span>
                </cite>
              </footer>
            </blockquote>

            <div
              className="mt-8 flex justify-center gap-3"
              aria-label="Testimonial pagination"
            >
              {testimonials.map((t, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={t.name + t.role}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={
                      "h-3 w-3 rounded-full transition-opacity " +
                      (isActive ? "bg-primary-orange" : "bg-secondary-navy/30")
                    }
                    aria-label={`Go to testimonial ${idx + 1}`}
                    aria-current={isActive}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
