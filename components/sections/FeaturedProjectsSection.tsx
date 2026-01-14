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
    <section id="projects" className="bg-secondary-navy" aria-label="Featured Projects">
      <div className="wrapper px-5 py-20 lg:p-20">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-start lg:text-left">
            <h2 data-aos="fade" className="flex-1 text-4xl font-medium leading-tight text-base-white">
              Featured Projects
            </h2>
            <p data-aos="fade" data-aos-delay={200} className="flex-1 text-lg leading-relaxed text-base-white-background">
              A closer look at our craftsmanship, showcasing quality in every
              project.
            </p>
          </div>

          <div className="relative">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth pb-6"
              aria-label="Project carousel"
            >
              {projects.map((project) => (
                <div
                  key={project.title}
                  data-slide="true"
                  className="w-full shrink-0 snap-start"
                >
                  <div className="flex flex-col gap-10 lg:flex-row lg:gap-0">
                    <div className="relative aspect-[35/52] w-full lg:aspect-[15/8] lg:w-[71%]">
                      <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-3 rounded-full bg-base-white px-4 py-1.5 text-sm font-medium text-secondary-navy">
                        <span
                          className="block size-3 rounded-full bg-primary-orange"
                          aria-hidden="true"
                        />
                        {project.category}
                      </div>

                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 70vw, 100vw"
                      />

                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 from-[17%] to-black/0" />
                      <div className="absolute inset-0 z-20 flex items-end p-6 text-base leading-relaxed text-base-white [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]">
                        {project.description}
                      </div>
                    </div>

                    <div className="flex w-full flex-col items-center lg:w-[26%] lg:items-start lg:pl-10">
                      <div className="flex w-full flex-col items-center gap-10 text-center lg:items-start lg:text-left">
                        <div>
                          <h3 className="line-clamp-2 text-2xl font-medium leading-tight text-base-white">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-base text-base-grey-stroke">
                            {project.year}
                          </p>
                          <p className="text-base text-base-grey-stroke">
                            {project.client}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 lg:justify-start" aria-label="Carousel pagination">
              {projects.map((p, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => scrollToIndex(idx)}
                    className={
                      "h-3 w-3 rounded-full transition-opacity " +
                      (isActive ? "bg-primary-orange" : "bg-base-white/40")
                    }
                    aria-label={`Go to ${p.title}`}
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
