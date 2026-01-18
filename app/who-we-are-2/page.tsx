"use client";

import Image from "next/image";
import Link from "next/link";
import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { MiniHeroCtaSection } from "@/components/sections/MiniHeroCtaSection";

const stats = [
  { value: "₹8L+", label: "Crores in Mandates" },
  { value: "20+", label: "Pan-India Offices" },
  { value: "1st", label: "Listed Trustee" },
];

const pillars = [
  {
    title: "Governance",
    desc: "Uncompromising fiduciary standards and regulatory compliance across all mandates.",
    image: "https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg",
  },
  {
    title: "Innovation",
    desc: "Pioneering digital trusteeship with real-time reporting and tech-driven oversight.",
    image: "https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg",
  },
  {
    title: "Scale",
    desc: "Managing high-volume securitization and complex debt structures with ease.",
    image: "https://beacontrustee.co.in/assets/images/banners/head-banner-6.jpg",
  },
];

const journey = [
  { year: "2015", text: "Founded by ex-bankers with a vision for modern trusteeship." },
  { year: "2017", text: "Secured first major INR 10,000 Cr mandate from PFC." },
  { year: "2020", text: "Crossed INR 50,000 Cr mandates with NHAI partnership." },
  { year: "2022", text: "Became India's first listed trustee company." },
  { year: "2024", text: "Achieved ISO 27001 certification and nationwide expansion." },
];

export default function WhoWeAreVariant2() {
  return (
    <main className="bg-primary-navy">
      <BricknetHeader variant="overlay" />

      {/* Hero: Split Screen Editorial Style */}
      <section className="relative min-h-screen w-full pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Content */}
          <div className="relative z-10 flex flex-col justify-center px-5 py-20 lg:w-1/2 lg:px-20 lg:py-32">
            <span 
              data-aos="fade"
              className="mb-8 inline-block text-xs font-bold uppercase tracking-[0.3em] text-accent-gold"
            >
              Who We Are
            </span>
            
            <h1 
              data-aos="fade-up"
              className="font-serif text-5xl font-light leading-[1.1] text-white lg:text-7xl xl:text-8xl"
            >
              Beyond <br />
              <span className="italic text-white/50">Conventional</span> <br />
              Trusteeship
            </h1>

            <p 
              data-aos="fade-up" 
              data-aos-delay={100}
              className="mt-8 max-w-md text-lg leading-relaxed text-white/70"
            >
              We are Beacon Trusteeship — India&apos;s first listed trustee company. 
              We blend decades of banking expertise with modern technology to protect stakeholder interests.
            </p>

            <div 
              data-aos="fade-up"
              data-aos-delay={200}
              className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-medium text-white">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-accent-gold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[50vh] lg:h-auto lg:w-1/2">
            <Image
              src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg"
              alt="Beacon Trusteeship architecture"
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
            <div className="absolute inset-0 bg-primary-navy/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>
      </section>

      {/* Philosophy: Large Typography Section */}
      <section className="relative overflow-hidden bg-white px-5 py-24 lg:px-20 lg:py-40">
        <div className="wrapper">
          <div className="relative z-10 max-w-4xl">
            <p className="mb-6 font-serif text-2xl italic text-accent-gold">Our Philosophy</p>
            <h2 
              data-aos="fade-up"
              className="font-serif text-4xl font-light leading-snug text-primary-navy lg:text-6xl"
            >
              &quot;To be the fiduciary in the most responsible and productive manner by providing our clients with the most effective solutions.&quot;
            </h2>
            
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px w-20 bg-primary-navy/20" />
              <p className="text-sm font-bold uppercase tracking-widest text-primary-navy/60">Vision Statement</p>
            </div>
          </div>

          {/* Decorative watermark */}
          <span className="absolute right-0 top-20 font-serif text-[30rem] leading-none text-primary-navy/[0.03] select-none pointer-events-none">
            &
          </span>
        </div>
      </section>

      {/* Pillars: Dark Cards with Image Reveal */}
      <section className="bg-secondary-navy px-5 py-24 lg:px-20 lg:py-32">
        <div className="wrapper">
          <div className="mb-16 border-b border-white/10 pb-8">
            <h2 className="text-3xl text-white lg:text-4xl">Core Pillars</h2>
          </div>

          <div className="grid gap-px bg-white/10 lg:grid-cols-3">
            {pillars.map((pillar, idx) => (
              <div 
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group relative h-96 overflow-hidden bg-primary-navy p-8 transition-colors hover:bg-transparent"
              >
                {/* Background Image (Reveals on Hover) */}
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">0{idx + 1}</span>
                    <h3 className="mt-4 font-serif text-3xl text-white">{pillar.title}</h3>
                  </div>
                  
                  <div>
                    <p className="text-white/70 transition-colors group-hover:text-white">
                      {pillar.desc}
                    </p>
                    <div className="mt-6 h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-full group-hover:bg-accent-gold" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline: Horizontal Scroll Style */}
      <section className="bg-white px-5 py-24 lg:px-20 lg:py-32 overflow-hidden">
        <div className="wrapper">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="lg:w-1/3">
              <h2 className="font-serif text-4xl text-primary-navy lg:text-5xl">Our <br />Journey</h2>
              <p className="mt-6 text-secondary-light-navy">
                From inception to market leadership, marking key milestones in India&apos;s financial ecosystem.
              </p>
            </div>

            <div className="flex-1 lg:pl-12">
              <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide lg:gap-12">
                {journey.map((item, idx) => (
                  <div 
                    key={item.year}
                    className="min-w-[280px] flex-shrink-0 border-l border-primary-navy/10 pl-6 transition-all hover:border-accent-gold"
                  >
                    <span className="block font-serif text-4xl text-primary-navy/20 transition-colors hover:text-accent-gold">
                      {item.year}
                    </span>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-secondary-light-navy">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="relative h-[80vh] w-full bg-primary-navy">
        <Image
          src="https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
          alt="Team meeting"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-5 py-24 lg:px-20 lg:py-32">
          <div className="wrapper flex flex-col items-end text-right">
            <h2 className="font-serif text-5xl text-white lg:text-7xl">
              Led by <span className="italic text-accent-gold">Veterans</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Our leadership team comprises ex-bankers and industry experts from IDBI, Axis, and JM Morgan Stanley.
            </p>
            <Link 
              href="/team"
              className="mt-8 inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-primary-navy"
            >
              Meet the Board
            </Link>
          </div>
        </div>
      </section>

      <MiniHeroCtaSection
        title="Experience the Beacon Difference"
        description="Partner with a trustee that values transparency, technology, and trust."
        buttonLabel="Contact Us"
        buttonHref="/contact"
        imageSrc="https://beacontrustee.co.in/assets/images/banners/head-banner-3.jpg"
        imageAlt="Contact Beacon"
      />

      <BricknetFooter />
    </main>
  );
}
