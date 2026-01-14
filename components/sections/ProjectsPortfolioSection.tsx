"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type PortfolioGroup =
  | "all"
  | "architectural-planning"
  | "residential-construction"
  | "renovation-remodeling"
  | "commercial-construction";

export type PortfolioItem = {
  title: string;
  group: Exclude<PortfolioGroup, "all">;
  imageSrc: string;
  detailsHref: string;
};

const groups: { id: PortfolioGroup; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "architectural-planning", label: "Architectural Planning" },
  { id: "residential-construction", label: "Residential Construction" },
  { id: "renovation-remodeling", label: "Renovation & Remodeling" },
  { id: "commercial-construction", label: "Commercial Construction" },
];

const groupToLabel: Record<Exclude<PortfolioGroup, "all">, string> = {
  "architectural-planning": "Architectural Planning",
  "residential-construction": "Residential Construction",
  "renovation-remodeling": "Renovation & Remodeling",
  "commercial-construction": "Commercial Construction",
};

export function ProjectsPortfolioSection({ items }: { items: PortfolioItem[] }) {
  const [activeGroup, setActiveGroup] = useState<PortfolioGroup>("all");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleCount = useMemo(() => {
    return items.filter((item) => {
      const matchesGroup = activeGroup === "all" || item.group === activeGroup;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery);
      return matchesGroup && matchesQuery;
    }).length;
  }, [activeGroup, items, normalizedQuery]);

  return (
    <section className="bg-base-white" aria-labelledby="our-projects-title">
      <div className="wrapper flex flex-col items-center gap-10 px-5 pb-10 pt-28 lg:gap-20 lg:px-20 lg:pb-20">
        <header className="flex w-full flex-col items-start gap-10">
          <span className="label label-solid-orange">Our Projects</span>
          <h2
            id="our-projects-title"
            data-aos="fade"
            className="text-4xl font-medium leading-tight text-secondary-navy"
          >
            Our Diverse Project Portfolio
          </h2>
        </header>

        <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row">
          <div className="flex flex-wrap items-center gap-4 lg:gap-2">
            {groups.map((g) => {
              const isActive = g.id === activeGroup;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveGroup(g.id)}
                  className={
                    "border-b px-1 py-2 text-base font-medium leading-tight transition-opacity hover:opacity-75 lg:px-3 " +
                    (isActive
                      ? "border-primary-orange text-secondary-navy"
                      : "border-transparent text-base-grey")
                  }
                >
                  {g.label}
                </button>
              );
            })}
          </div>

          <div className="-mt-1 flex w-full items-center gap-2 border-b border-base-grey px-1 py-2 lg:w-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Project..."
              className="w-full bg-transparent text-base font-medium leading-tight text-secondary-navy outline-none placeholder:text-base-grey"
              aria-label="Search projects"
            />
            {query.length > 0 ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xl text-base-grey transition-opacity hover:opacity-50"
                aria-label="Clear search"
              >
                ×
              </button>
            ) : null}
          </div>
        </div>

        <div className="w-full" data-aos="fade-up">
          {visibleCount === 0 ? (
            <p className="text-base text-base-grey" role="status">
              No projects match your search.
            </p>
          ) : null}

          <ul
            className="grid w-full grid-cols-1 gap-14 lg:grid-cols-2"
            aria-label="Project list"
          >
            {items.map((item, idx) => {
              const matchesGroup =
                activeGroup === "all" || item.group === activeGroup;
              const matchesQuery =
                normalizedQuery.length === 0 ||
                item.title.toLowerCase().includes(normalizedQuery);
              const isVisible = matchesGroup && matchesQuery;

              return (
                <li
                  key={item.title}
                  className={isVisible ? "" : "hidden"}
                  data-aos="fade-up"
                  data-aos-delay={idx * 60}
                >
                  <div className="flex flex-col gap-6">
                    <div className="relative aspect-[35/40] w-full lg:aspect-[62/40]">
                      <Image
                        src={item.imageSrc}
                        alt="Blog article cover image"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>

                    <div className="flex flex-col gap-6">
                      <h3 className="text-2xl font-medium leading-tight text-secondary-navy">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <span className="label label-outline-dark">
                          {groupToLabel[item.group]}
                        </span>
                        <Link
                          href={item.detailsHref}
                          className="inline-flex items-center gap-3 text-base font-medium leading-tight text-primary-orange transition-opacity hover:opacity-75"
                        >
                          See Details
                          <span aria-hidden="true" className="text-xl">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
