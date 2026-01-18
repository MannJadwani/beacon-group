"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { bricknetFeaturedProjects } from "@/lib/constants/bricknet";

export function FeaturedProjectsSection() {
  const projects = useMemo(() => [...bricknetFeaturedProjects], []);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const syncActiveIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(
      track.querySelectorAll<HTMLElement>("[data-slide='true']"),
    );

    const currentLeft = track.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, idx) => {
      const distance = Math.abs(slide.offsetLeft - currentLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => syncActiveIndexFromScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [syncActiveIndexFromScroll]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(
      track.querySelectorAll<HTMLElement>("[data-slide='true']"),
    );
    const slide = slides[index];
    if (!slide) return;

    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section id="media" className="bg-primary-navy py-24 text-white lg:py-32" aria-label="Beacon in Media">
      <div className="wrapper px-5 lg:px-20">
        <div className="mb-20 space-y-6 lg:mb-24">
          <span className="inline-block bg-accent-gold px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
            Perspective
          </span>
          <h2 className="text-4xl font-medium leading-[1.1] lg:text-6xl">
            Beacon in Media
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <article
              key={project.title}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="group space-y-6"
            >
              <div className="relative aspect-[4/5] overflow-hidden grayscale transition-all duration-700 group-hover:grayscale-0">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary-navy/40 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="inline-block bg-white px-3 py-1 text-[10px] font-black tracking-widest text-primary-navy">
                    {project.year}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-serif text-2xl leading-tight text-white lg:text-3xl">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {project.description}
                </p>
                <a
                  href="https://beacontrustee.co.in/press"
                  className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-accent-gold hover:text-white transition-colors"
                >
                  READ COVERAGE →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
