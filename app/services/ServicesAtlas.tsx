"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

export type ServiceAtlasItem = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  imageSrc: string;
  tags: string[];
};

function ActionLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function ServicesAtlas({ items }: { items: ServiceAtlasItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  const active = useMemo(
    () => items.find((i) => i.id === activeId) ?? items[0],
    [items, activeId],
  );

  if (!active) return null;

  return (
    <section className="bg-white py-24 lg:py-32" aria-label="Service atlas">
      <div className="wrapper px-5 lg:px-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="sticky top-32">
              <div className="bg-primary-navy/10 p-px">
                <div className="relative overflow-hidden bg-white">
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <Image
                      src={active.imageSrc}
                      alt=""
                      fill
                      className="object-cover opacity-[0.10] grayscale"
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white" />
                  </div>

                  <div className="relative p-10 lg:p-12">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black tracking-widest text-accent-gold">
                          {active.number}
                        </span>
                        <span className="h-px w-16 bg-primary-navy/15" aria-hidden="true" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/45">
                          Mandate
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {active.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-sm border border-primary-navy/10 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary-navy/55"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 className="mt-10 text-3xl font-medium leading-tight text-primary-navy lg:text-5xl">
                      {active.title}
                    </h2>

                    <p className="mt-6 text-lg leading-relaxed text-primary-navy/60">
                      {active.description}
                    </p>

                    <div className="mt-12 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row">
                      <ActionLink
                        href={active.href}
                        className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                      >
                        Read more <span aria-hidden="true">→</span>
                      </ActionLink>
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                      >
                        Request a call <span aria-hidden="true">→</span>
                      </Link>
                    </div>

                    <div className="mt-10 border-t border-primary-navy/10 pt-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Quick note
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                        This is a SEBI-regulated mandate. For grievances, refer to Investor Charter and SEBI SCORES.
                      </p>
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <Link
                          href="/disclosure"
                          className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                        >
                          Disclosures <span className="text-accent-gold">→</span>
                        </Link>
                        <a
                          href="https://scores.sebi.gov.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                        >
                          SEBI SCORES <span className="text-accent-gold">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile selector */}
              <div className="mt-8 lg:hidden" aria-label="Mandate selector">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {items.map((s) => {
                    const isActive = s.id === activeId;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveId(s.id)}
                        className={
                          "shrink-0 rounded-sm border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors " +
                          (isActive
                            ? "border-primary-navy bg-primary-navy text-white"
                            : "border-primary-navy/10 bg-white text-primary-navy/60 hover:bg-primary-navy/[0.02]")
                        }
                      >
                        {s.shortTitle}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5" aria-label="Mandate list">
            <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
              <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                Mandate Atlas
              </span>
              <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-5xl">
                Browse the register
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-primary-navy/60">
                Select a mandate to preview scope, context, and next actions.
              </p>
            </div>

            <div className="mt-10 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
              <div className="divide-y divide-primary-navy/10">
                {items.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveId(s.id)}
                      className={
                        "group w-full text-left px-7 py-6 transition-colors " +
                        (isActive
                          ? "bg-primary-navy text-white"
                          : "bg-white hover:bg-primary-navy/[0.02]")
                      }
                      aria-pressed={isActive}
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div>
                          <p
                            className={
                              "text-[10px] font-black uppercase tracking-[0.3em] " +
                              (isActive ? "text-accent-gold" : "text-primary-navy/40")
                            }
                          >
                            {s.number}
                          </p>
                          <p className={"mt-3 text-lg font-medium leading-tight " + (isActive ? "text-white" : "text-primary-navy")}>
                            {s.shortTitle}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className={
                                  "rounded-sm border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] " +
                                  (isActive
                                    ? "border-white/15 bg-white/5 text-white/65"
                                    : "border-primary-navy/10 bg-white text-primary-navy/55")
                                }
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <span
                          className={
                            "mt-2 h-px w-16 shrink-0 transition-all " +
                            (isActive
                              ? "bg-accent-gold"
                              : "bg-primary-navy/15 group-hover:bg-accent-gold")
                          }
                          aria-hidden="true"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-px bg-primary-navy/10 sm:grid-cols-2" data-aos="fade-up" data-aos-delay={250}>
              <Link
                href="/other-regulated-services"
                className="group bg-white p-8 transition-colors hover:bg-primary-navy hover:text-white"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                  Next
                </p>
                <p className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                  Other regulated services
                </p>
                <p className="mt-3 text-sm text-primary-navy/55 group-hover:text-white/70">
                  RBI / IFSCA and other regulator coverage.
                </p>
                <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                  Explore <span className="text-accent-gold">→</span>
                </div>
              </Link>

              <Link
                href="/unregulated-services"
                className="group bg-white p-8 transition-colors hover:bg-primary-navy hover:text-white"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                  Also
                </p>
                <p className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                  Unregulated services
                </p>
                <p className="mt-3 text-sm text-primary-navy/55 group-hover:text-white/70">
                  Specialist mandates without SEBI investor protection.
                </p>
                <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                  Explore <span className="text-accent-gold">→</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
