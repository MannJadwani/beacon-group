"use client";

import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { MiniHeroCtaSection } from "@/components/sections/MiniHeroCtaSection";
import { bricknetPartnerLogos } from "@/lib/constants/bricknet";

const companyStats = [
  { value: "2015", label: "Incorporated" },
  { value: "1st", label: "Listed Trustee in India" },
  { value: "20+", label: "Locations Nationwide" },
  { value: "ISO 27001", label: "Certified" },
] as const;

const coreValues = [
  {
    number: "01",
    title: "Fiduciary Excellence",
    description:
      "Upholding the highest standards of trust and responsibility in every mandate we undertake.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Regulatory Expertise",
    description:
      "Deep knowledge across SEBI, RBI, and IFSCA frameworks ensuring compliant and seamless execution.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Technology-Driven",
    description:
      "Leveraging cutting-edge platforms for transparency, efficiency, and real-time stakeholder reporting.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Client Partnership",
    description:
      "Building lasting relationships through dedicated support, clear communication, and tailored solutions.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
] as const;

const milestones = [
  { year: "2015", event: "Incorporated as SEBI Registered Debenture Trustee" },
  { year: "2017", event: "First major PFC mandate - INR 9,991 Crores" },
  { year: "2019", event: "Expanded to REC with INR 48,000 Crores mandate" },
  { year: "2020", event: "NHAI partnership - INR 50,000 Crores" },
  { year: "2022", event: "Listed on stock exchange - India's first listed trustee" },
  { year: "2023", event: "Crossed INR 8,00,000+ Crores in cumulative mandates" },
  { year: "2024", event: "ISO 27001:2022 Certified & expanded to 20+ locations" },
] as const;

const serviceHighlights = [
  {
    title: "Debenture Trustee",
    description: "Protecting debenture holder interests with rigorous oversight",
    link: "/services",
  },
  {
    title: "Security Trustee",
    description: "Holding and administering security for lenders",
    link: "/services",
  },
  {
    title: "Escrow Services",
    description: "Enabling responsible transactions with tailored solutions",
    link: "/services",
  },
  {
    title: "Securitization",
    description: "Processing $3B+ monthly in DA, PTC, and SDI mandates",
    link: "/services",
  },
] as const;

export default function WhoWeArePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden" aria-label="Hero section">
        <BricknetHeader variant="white" />

        {/* Swiss Grid Background */}
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" />

        <div className="relative mt-[80px] px-5 pb-0 pt-20 lg:mt-[118px] lg:px-20 lg:pt-28">
          <div className="wrapper">
            {/* Badge */}
            <p
              data-aos="fade"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-navy/10 bg-primary-navy/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-primary-navy"
            >
              <span className="block size-1.5 rounded-full bg-accent-gold" />
              Who We Are
            </p>

            {/* Two Column Hero */}
            <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:gap-20">
              {/* Left: Title & Description */}
              <div className="flex-1">
                <h1
                  data-aos="fade-up"
                  className="mb-6 text-4xl font-medium leading-[1.1] tracking-tight text-primary-navy lg:text-6xl xl:text-7xl"
                >
                  Value Addition Beyond{" "}
                  <span className="text-accent-gold">Conventional Trusteeship</span>
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-delay={100}
                  className="max-w-xl text-lg leading-relaxed text-secondary-light-navy"
                >
                  India&apos;s first and only listed trustee company, offering technology-enabled
                  solutions backed by decades of experience from industry veterans.
                </p>

                {/* CTA Buttons */}
                <div
                  data-aos="fade-up"
                  data-aos-delay={200}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 rounded-full bg-primary-navy px-8 py-4 text-sm font-bold tracking-wider text-white transition-all hover:bg-accent-gold"
                  >
                    Meet Our Team
                    <span className="text-lg">&#8594;</span>
                  </Link>
                  <Link
                    href="https://beacontrustee.co.in/wp-content/uploads/company_profile.pdf"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-primary-navy/20 px-8 py-4 text-sm font-bold tracking-wider text-primary-navy transition-all hover:border-accent-gold hover:text-accent-gold"
                  >
                    Company Profile
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right: Stats Grid */}
              <div
                data-aos="fade-left"
                data-aos-delay={300}
                className="grid grid-cols-2 gap-px bg-primary-navy/10 lg:w-[400px]"
              >
                {companyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center bg-white p-6 text-center lg:p-8"
                  >
                    <span className="text-3xl font-medium tracking-tight text-primary-navy lg:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-xs font-medium uppercase tracking-wider text-secondary-light-navy">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div
          data-aos="fade-up"
          data-aos-delay={400}
          className="relative mt-16 h-[400px] w-full lg:mt-20 lg:h-[500px]"
        >
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg"
            alt="Beacon Trusteeship office"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent" />

          {/* SEBI Badge */}
          <div className="absolute bottom-8 left-5 lg:bottom-12 lg:left-20">
            <div className="glass flex items-center gap-4 rounded-lg px-6 py-4">
              <Image
                src="https://beacontrustee.co.in/assets/images/sebi-certificate-latest.png"
                alt="SEBI Registered"
                width={60}
                height={60}
                className="rounded bg-white p-1"
              />
              <div>
                <p className="text-sm font-bold text-white">SEBI Registered</p>
                <p className="text-xs text-white/70">Debenture Trustee since 2015</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="bg-white" aria-labelledby="about-title">
        <div className="wrapper px-5 py-20 lg:px-20 lg:py-32">
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
            {/* Left: Sticky Content */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <span
                  data-aos="fade"
                  className="mb-6 inline-block bg-accent-gold px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white"
                >
                  Our Story
                </span>
                <h2
                  id="about-title"
                  data-aos="fade-up"
                  className="mb-6 text-3xl font-medium leading-tight text-primary-navy lg:text-4xl"
                >
                  A Legacy Built on Trust & Expertise
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-delay={100}
                  className="text-secondary-light-navy"
                >
                  Formed by ex-bankers and industry professionals with decades of
                  trusteeship experience.
                </p>
              </div>
            </div>

            {/* Right: Content Blocks */}
            <div className="flex-1 space-y-12">
              {/* Block 1 */}
              <div data-aos="fade-up" className="border-l-2 border-accent-gold/30 pl-8">
                <h3 className="mb-4 text-xl font-medium text-primary-navy">
                  Founded by Industry Veterans
                </h3>
                <p className="leading-relaxed text-secondary-light-navy">
                  Beacon Trusteeship was incorporated in 2015 by a group of ex-bankers and
                  professionals from the trusteeship domain. With extensive experience from
                  leading institutions like IDBI, Axis Bank, ICICI, and JM Morgan Stanley,
                  our founders brought deep expertise in handling complex trusteeship activities.
                </p>
              </div>

              {/* Block 2 */}
              <div data-aos="fade-up" data-aos-delay={100} className="border-l-2 border-accent-gold/30 pl-8">
                <h3 className="mb-4 text-xl font-medium text-primary-navy">
                  One-Stop Solution Philosophy
                </h3>
                <p className="leading-relaxed text-secondary-light-navy">
                  Value addition beyond conventional trusteeship is our greatest differentiator.
                  We take pride in ensuring our comprehensive range of trustee services addresses
                  every client need. Our offerings are backed by expert opinions and advice from
                  reputed agencies empanelled with us, continuously enhancing service quality.
                </p>
              </div>

              {/* Block 3 */}
              <div data-aos="fade-up" data-aos-delay={200} className="border-l-2 border-accent-gold/30 pl-8">
                <h3 className="mb-4 text-xl font-medium text-primary-navy">
                  India&apos;s First Listed Trustee
                </h3>
                <p className="leading-relaxed text-secondary-light-navy">
                  In 2022, Beacon Trusteeship achieved a historic milestone by becoming
                  India&apos;s first and only listed trustee company. This listing reflects
                  our commitment to transparency, governance, and building long-term
                  stakeholder confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-primary-navy" aria-labelledby="vision-title">
        <div className="wrapper px-5 py-20 lg:px-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Vision */}
            <div
              data-aos="fade-right"
              className="relative overflow-hidden border border-white/10 bg-white/5 p-8 lg:p-12"
            >
              {/* Large Number Background */}
              <span className="absolute -right-4 -top-8 font-serif text-[200px] font-medium leading-none text-white/[0.03]">
                V
              </span>

              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-gold/20">
                  <svg className="h-7 w-7 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                <h3 className="mb-4 text-2xl font-medium text-white lg:text-3xl">
                  Our Vision
                </h3>
                <p className="text-lg leading-relaxed text-white/70">
                  Endeavour to be the fiduciary in the most responsible and productive
                  manner by providing our clients with the most effective solutions.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div
              data-aos="fade-left"
              data-aos-delay={100}
              className="relative overflow-hidden border border-white/10 bg-white/5 p-8 lg:p-12"
            >
              {/* Large Number Background */}
              <span className="absolute -right-4 -top-8 font-serif text-[200px] font-medium leading-none text-white/[0.03]">
                M
              </span>

              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-gold/20">
                  <svg className="h-7 w-7 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>

                <h3 className="mb-4 text-2xl font-medium text-white lg:text-3xl">
                  Our Mission
                </h3>
                <p className="text-lg leading-relaxed text-white/70">
                  To be the preferred trustee for our clients through operational
                  excellence and international service quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white" aria-labelledby="values-title">
        <div className="wrapper px-5 py-20 lg:px-20 lg:py-32">
          {/* Section Header */}
          <header className="mb-16 flex flex-col items-center gap-6 text-center">
            <span className="inline-block bg-accent-gold px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
              What Drives Us
            </span>
            <h2
              id="values-title"
              data-aos="fade"
              className="max-w-2xl text-3xl font-medium leading-tight text-primary-navy lg:text-5xl"
            >
              Core Values That Define{" "}
              <span className="text-accent-gold">Our Approach</span>
            </h2>
          </header>

          {/* Values Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, idx) => (
              <article
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={idx * 75}
                className="group relative flex flex-col border border-primary-navy/5 bg-white p-8 transition-all duration-500 hover:border-accent-gold/30 hover:shadow-2xl"
              >
                {/* Number */}
                <span className="mb-4 font-serif text-4xl italic text-accent-gold/30 transition-colors group-hover:text-accent-gold">
                  {value.number}
                </span>

                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-navy/5 text-primary-navy transition-colors group-hover:bg-accent-gold group-hover:text-white">
                  {value.icon}
                </div>

                {/* Content */}
                <h3 className="mb-3 text-lg font-medium text-primary-navy">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary-light-navy">
                  {value.description}
                </p>

                {/* Expanding Line */}
                <div className="mt-6 h-px w-12 bg-primary-navy/10 transition-all duration-300 group-hover:w-full group-hover:bg-accent-gold" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-primary-navy/[0.02]" aria-labelledby="timeline-title">
        <div className="wrapper px-5 py-20 lg:px-20 lg:py-32">
          {/* Section Header */}
          <header className="mb-16 flex flex-col items-center gap-6 text-center">
            <span className="inline-block bg-primary-navy px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
              Our Journey
            </span>
            <h2
              id="timeline-title"
              data-aos="fade"
              className="max-w-2xl text-3xl font-medium leading-tight text-primary-navy lg:text-5xl"
            >
              Key Milestones in Our{" "}
              <span className="text-accent-gold">Growth Story</span>
            </h2>
          </header>

          {/* Timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 h-full w-px bg-accent-gold/20 lg:left-1/2 lg:-translate-x-px" />

            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                  className={`relative flex items-start gap-8 ${
                    idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-2 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-accent-gold lg:left-1/2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-12 flex-1 lg:ml-0 lg:w-1/2 ${
                      idx % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                    }`}
                  >
                    <div className="inline-block border border-primary-navy/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                      <span className="mb-2 block text-2xl font-medium text-accent-gold">
                        {milestone.year}
                      </span>
                      <p className="text-secondary-light-navy">{milestone.event}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-primary-navy" aria-labelledby="services-preview-title">
        <div className="wrapper px-5 py-20 lg:px-20 lg:py-32">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
            {/* Left: Content */}
            <div className="lg:w-1/3">
              <span
                data-aos="fade"
                className="mb-6 inline-block bg-accent-gold px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white"
              >
                Our Services
              </span>
              <h2
                id="services-preview-title"
                data-aos="fade-up"
                className="mb-6 text-3xl font-medium leading-tight text-white lg:text-4xl"
              >
                Comprehensive Trustee Solutions
              </h2>
              <p
                data-aos="fade-up"
                data-aos-delay={100}
                className="mb-8 text-white/60"
              >
                From debenture trusteeship to securitization, we offer end-to-end
                solutions tailored to your specific requirements.
              </p>
              <Link
                href="/#services"
                data-aos="fade-up"
                data-aos-delay={200}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-sm font-bold tracking-wider text-white transition-all hover:bg-white hover:text-primary-navy"
              >
                Explore All Services
                <span className="text-lg">&#8594;</span>
              </Link>
            </div>

            {/* Right: Service Cards */}
            <div className="flex-1">
              <div className="grid gap-4 sm:grid-cols-2">
                {serviceHighlights.map((service, idx) => (
                  <Link
                    key={service.title}
                    href={service.link}
                    data-aos="fade-up"
                    data-aos-delay={idx * 75}
                    className="group flex flex-col border border-white/10 bg-white/5 p-6 transition-all hover:border-accent-gold/30 hover:bg-white/10"
                  >
                    <h3 className="mb-2 text-lg font-medium text-white transition-colors group-hover:text-accent-gold">
                      {service.title}
                    </h3>
                    <p className="flex-1 text-sm text-white/50">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent-gold opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <span>&#8594;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white" aria-labelledby="partners-title">
        <div className="wrapper px-5 py-20 lg:px-20 lg:py-24">
          <header className="mb-12 text-center">
            <h2
              id="partners-title"
              data-aos="fade"
              className="text-sm font-bold uppercase tracking-widest text-secondary-light-navy"
            >
              Trusted by India&apos;s Leading Institutions
            </h2>
          </header>

          <div
            data-aos="fade-up"
            className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
          >
            {bricknetPartnerLogos.map((partner) => (
              <div
                key={partner.alt}
                className="flex h-16 w-24 items-center justify-center grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100 lg:w-32"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <MiniHeroCtaSection
        title="Ready to Partner with India's Leading Trustee?"
        description="Connect with our team to discuss how Beacon can support your trusteeship and compliance needs."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        imageSrc="https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
        imageAlt="Beacon Trusteeship partnership"
      />

      <BricknetFooter />
    </main>
  );
}
