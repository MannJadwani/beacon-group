"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { bricknetFeaturedProjects } from "@/lib/constants/bricknet";

export function VariantBlueFeaturedProjectsSection() {
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
    <section id="media" className="relative py-24 text-white lg:py-32 overflow-hidden bg-gradient-to-br from-[#183EFA] via-[#2952ff] to-[#183EFA]" aria-label="Beacon in Media">
      {/* Soft decorative elements */}
      <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-[#EDE44C]/10 blur-3xl" />
      
      <div className="wrapper relative z-10 px-5 lg:px-20">
        <div className="mb-20 space-y-6 lg:mb-24">
          <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase text-white rounded-full">
            Perspective
          </span>
          <h2 className="text-4xl font-semibold leading-[1.1] lg:text-6xl">
            Beacon in Media
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <article
              key={project.title}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="group space-y-6"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183EFA]/80 via-[#183EFA]/20 to-transparent transition-opacity group-hover:opacity-60" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="inline-block bg-white px-4 py-2 text-[10px] font-bold tracking-widest text-[#183EFA] rounded-full shadow-lg">
                    {project.year}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <h3 className="font-serif text-2xl leading-tight text-white lg:text-3xl">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {project.description}
                </p>
                <a
                  href="https://beacontrustee.co.in/press"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#EDE44C] hover:text-white transition-colors"
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
