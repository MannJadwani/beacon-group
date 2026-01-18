"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { MiniHeroCtaSection } from "@/components/sections/MiniHeroCtaSection";
import {
  bricknetTeamMembers,
  bricknetTeamCategories,
  type TeamMemberCategory,
  type TeamMember,
} from "@/lib/constants/bricknet";

const teamStats = [
  { value: "100+", label: "Years Combined Experience" },
  { value: "14", label: "Industry Leaders" },
  { value: "3", label: "Decades of Trust" },
] as const;

function TeamMemberCard({
  member,
  index,
  isExpanded,
  onToggle,
}: {
  member: TeamMember;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      data-aos="fade-up"
      data-aos-delay={index * 75}
      className="group relative flex flex-col bg-white border border-primary-navy/5 transition-all duration-500 hover:border-accent-gold/30 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-primary-navy/5">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 via-primary-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Quick highlights on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {member.highlights && member.highlights.slice(0, 2).map((highlight, idx) => (
            <span
              key={idx}
              className="mr-2 mb-2 inline-block rounded-full bg-accent-gold/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        {/* Name & Role */}
        <div className="mb-4">
          <h3 className="text-xl font-medium leading-tight text-primary-navy lg:text-2xl">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-medium tracking-wide text-accent-gold">
            {member.role}
          </p>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px w-12 bg-primary-navy/10 transition-all duration-300 group-hover:w-20 group-hover:bg-accent-gold" />

        {/* Bio Preview / Expanded */}
        <div className="flex-1">
          <p
            className={`text-sm leading-relaxed text-secondary-light-navy transition-all duration-300 ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {member.bio}
          </p>
        </div>

        {/* Highlights (expanded) */}
        {isExpanded && member.highlights && (
          <ul className="mt-4 space-y-2">
            {member.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-sm text-primary-navy"
              >
                <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Expand/Collapse Button */}
        <button
          onClick={onToggle}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-navy transition-colors hover:text-accent-gold"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Show less" : "Read more"}</span>
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-current transition-all duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>
    </article>
  );
}

function CategoryTab({
  category,
  isActive,
  onClick,
  count,
}: {
  category: (typeof bricknetTeamCategories)[number];
  isActive: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-start gap-2 border-l-2 py-4 pl-6 pr-8 text-left transition-all duration-300 ${
        isActive
          ? "border-accent-gold bg-accent-gold/5"
          : "border-primary-navy/10 hover:border-accent-gold/50 hover:bg-primary-navy/[0.02]"
      }`}
      aria-pressed={isActive}
    >
      <div className="flex items-center gap-3">
        <span
          className={`text-lg font-medium transition-colors ${
            isActive ? "text-primary-navy" : "text-primary-navy/70"
          }`}
        >
          {category.label}
        </span>
        <span
          className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold transition-colors ${
            isActive
              ? "bg-accent-gold text-white"
              : "bg-primary-navy/10 text-primary-navy/60"
          }`}
        >
          {count}
        </span>
      </div>
      <p
        className={`text-sm transition-colors ${
          isActive ? "text-secondary-light-navy" : "text-secondary-light-navy/60"
        }`}
      >
        {category.description}
      </p>
    </button>
  );
}

function MobileTabButton({
  category,
  isActive,
  onClick,
  count,
}: {
  category: { id: string; label: string; description: string };
  isActive: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition-all duration-300 ${
        isActive
          ? "text-accent-gold"
          : "text-primary-navy/60 hover:text-primary-navy"
      }`}
    >
      {category.label}
      <span
        className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-colors ${
          isActive ? "bg-accent-gold text-white" : "bg-primary-navy/10 text-primary-navy/60"
        }`}
      >
        {count}
      </span>
      {/* Active indicator */}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold" />
      )}
    </button>
  );
}

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState<TeamMemberCategory | "all">("all");
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());

  const filteredMembers = useMemo(() => {
    if (activeCategory === "all") return bricknetTeamMembers;
    return bricknetTeamMembers.filter((member) => member.category === activeCategory);
  }, [activeCategory]);

  const getCategoryCount = (categoryId: TeamMemberCategory) =>
    bricknetTeamMembers.filter((m) => m.category === categoryId).length;

  const toggleMemberExpanded = (memberId: string) => {
    setExpandedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(memberId)) {
        next.delete(memberId);
      } else {
        next.add(memberId);
      }
      return next;
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-primary-navy overflow-hidden" aria-label="Hero section">
        <BricknetHeader variant="overlay" />

        {/* Swiss Grid Pattern */}
        <div className="swiss-grid absolute inset-0 opacity-[0.02]" />

        {/* Gradient Orbs */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-accent-gold/5 blur-3xl" />

        <div className="relative mt-[80px] flex flex-col items-center gap-8 px-5 pb-24 pt-20 lg:mt-[118px] lg:px-20 lg:pb-32 lg:pt-28">
          {/* Badge */}
          <p
            data-aos="fade"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-white/90"
          >
            <span className="block size-1.5 animate-pulse rounded-full bg-accent-gold" />
            Leadership
          </p>

          {/* Title */}
          <div className="flex w-full flex-col items-center gap-6 text-center">
            <h1
              data-aos="fade-up"
              className="max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight text-white lg:text-7xl"
            >
              Our People Are What{" "}
              <span className="text-accent-gold">Sets Us Apart</span>
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay={200}
              className="max-w-2xl text-lg leading-relaxed text-white/60"
            >
              We shoulder a fiduciary responsibility to our Clients and Investors.
              Meet the team driving India&apos;s most trusted trusteeship services.
            </p>
          </div>

          {/* Stats Row */}
          <div
            data-aos="fade-up"
            data-aos-delay={400}
            className="mt-8 flex flex-wrap items-center justify-center gap-8 lg:gap-16"
          >
            {teamStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-1 ${
                  idx !== teamStats.length - 1 ? "lg:border-r lg:border-white/10 lg:pr-16" : ""
                }`}
              >
                <span className="text-4xl font-medium tracking-tight text-accent-gold lg:text-5xl">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Wave/Curve */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 48H1440V0C1440 0 1140 48 720 48C300 48 0 0 0 0V48Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="bg-white" aria-labelledby="team-grid-title">
        <div className="wrapper px-5 py-20 lg:px-20 lg:py-32">
          {/* Section Header */}
          <header className="mb-16 flex flex-col items-center gap-6 text-center">
            <span className="inline-block bg-accent-gold px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
              Meet The Team
            </span>
            <h2
              id="team-grid-title"
              data-aos="fade"
              className="max-w-3xl text-3xl font-medium leading-tight text-primary-navy lg:text-5xl"
            >
              Industry Veterans Driving{" "}
              <span className="text-accent-gold">Excellence</span>
            </h2>
            <p
              data-aos="fade"
              data-aos-delay={100}
              className="max-w-2xl text-lg text-secondary-light-navy"
            >
              Our leadership combines decades of experience across banking, capital markets,
              and corporate finance to deliver unparalleled trusteeship services.
            </p>
          </header>

          {/* Two Column Layout: Filters + Grid */}
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Left: Sticky Filter Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:w-72 lg:shrink-0">
              <div className="sticky top-32">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary-navy/40">
                  Filter by Role
                </h3>

                <nav className="flex flex-col" aria-label="Team category filters">
                  {/* All option */}
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={`group relative flex items-center gap-3 border-l-2 py-4 pl-6 pr-8 text-left transition-all duration-300 ${
                      activeCategory === "all"
                        ? "border-accent-gold bg-accent-gold/5"
                        : "border-primary-navy/10 hover:border-accent-gold/50 hover:bg-primary-navy/[0.02]"
                    }`}
                    aria-pressed={activeCategory === "all"}
                  >
                    <span
                      className={`text-lg font-medium transition-colors ${
                        activeCategory === "all" ? "text-primary-navy" : "text-primary-navy/70"
                      }`}
                    >
                      All Members
                    </span>
                    <span
                      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold transition-colors ${
                        activeCategory === "all"
                          ? "bg-accent-gold text-white"
                          : "bg-primary-navy/10 text-primary-navy/60"
                      }`}
                    >
                      {bricknetTeamMembers.length}
                    </span>
                  </button>

                  {bricknetTeamCategories.map((category) => (
                    <CategoryTab
                      key={category.id}
                      category={category}
                      isActive={activeCategory === category.id}
                      onClick={() => setActiveCategory(category.id)}
                      count={getCategoryCount(category.id)}
                    />
                  ))}
                </nav>
              </div>
            </aside>

            {/* Mobile: Horizontal Scrollable Tabs */}
            <nav
              className="flex gap-1 overflow-x-auto border-b border-primary-navy/10 pb-px lg:hidden scrollbar-hide"
              aria-label="Team category filters"
            >
              <MobileTabButton
                category={{ id: "all" as const, label: "All", description: "" }}
                isActive={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
                count={bricknetTeamMembers.length}
              />
              {bricknetTeamCategories.map((category) => (
                <MobileTabButton
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                  count={getCategoryCount(category.id)}
                />
              ))}
            </nav>

            {/* Right: Team Grid */}
            <div className="flex-1">
              {/* Category Label for current selection */}
              {activeCategory !== "all" && (
                <div className="mb-8" data-aos="fade">
                  <h3 className="text-2xl font-medium text-primary-navy lg:text-3xl">
                    {bricknetTeamCategories.find((c) => c.id === activeCategory)?.label}
                  </h3>
                  <p className="mt-1 text-secondary-light-navy">
                    {bricknetTeamCategories.find((c) => c.id === activeCategory)?.description}
                  </p>
                </div>
              )}

              <ul
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
                aria-label="Team members"
              >
                {filteredMembers.map((member, idx) => (
                  <li key={member.id}>
                    <TeamMemberCard
                      member={member}
                      index={idx}
                      isExpanded={expandedMembers.has(member.id)}
                      onToggle={() => toggleMemberExpanded(member.id)}
                    />
                  </li>
                ))}
              </ul>

              {/* Empty State */}
              {filteredMembers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-lg text-secondary-light-navy">
                    No team members found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Highlight Section */}
      <section className="bg-primary-navy" aria-labelledby="values-title">
        <div className="wrapper px-5 py-20 lg:px-20 lg:py-32">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">
            {/* Left: Content */}
            <div className="flex-1">
              <span
                data-aos="fade"
                className="mb-6 inline-block bg-accent-gold px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white"
              >
                Our Philosophy
              </span>
              <h2
                id="values-title"
                data-aos="fade-up"
                className="mb-6 text-3xl font-medium leading-tight text-white lg:text-5xl"
              >
                Built on Trust,{" "}
                <span className="text-accent-gold">Driven by Excellence</span>
              </h2>
              <p
                data-aos="fade-up"
                data-aos-delay={100}
                className="mb-10 max-w-xl text-lg leading-relaxed text-white/60"
              >
                Our team operates with unwavering integrity, combining deep industry
                expertise with a client-first approach. Every decision reflects our
                commitment to protecting stakeholder interests.
              </p>

              <ul className="space-y-6">
                {[
                  { number: "01", text: "Fiduciary responsibility at the core of every mandate" },
                  { number: "02", text: "Regulatory expertise across SEBI, RBI, and IFSCA frameworks" },
                  { number: "03", text: "Technology-driven transparency and reporting" },
                ].map((item, idx) => (
                  <li
                    key={item.number}
                    data-aos="fade-up"
                    data-aos-delay={150 + idx * 75}
                    className="flex items-start gap-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-gold/20 text-sm font-bold text-accent-gold">
                      {item.number}
                    </span>
                    <p className="pt-2 text-white/80">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Image Grid */}
            <div
              data-aos="fade-left"
              className="relative flex-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                    <Image
                      src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg"
                      alt="Team collaboration"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden bg-white/5">
                    <Image
                      src="https://beacontrustee.co.in/assets/images/banners/head-banner-3.jpg"
                      alt="Professional meeting"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="relative aspect-square overflow-hidden bg-white/5">
                    <Image
                      src="https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
                      alt="Office environment"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                    <Image
                      src="https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg"
                      alt="Team discussion"
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Gold Accent */}
              <div className="absolute -bottom-6 -left-6 h-24 w-24 border-4 border-accent-gold/30" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <MiniHeroCtaSection
        title="Join Our Growing Team"
        description="We're always looking for talented professionals to help shape the future of trusteeship services in India."
        buttonLabel="View Careers"
        buttonHref="/careers"
        imageSrc="https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg"
        imageAlt="Beacon Trusteeship team"
      />

      <BricknetFooter />
    </main>
  );
}
