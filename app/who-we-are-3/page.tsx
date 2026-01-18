"use client";

import Image from "next/image";
import Link from "next/link";
import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";

const values = [
  {
    title: "Unwavering Trust",
    desc: "Acting as the first and only listed trustee company in India, we redefine accountability.",
  },
  {
    title: "Digital Rigor",
    desc: "Seamless, technology-enabled solutions for real-time asset monitoring and reporting.",
  },
  {
    title: "Capital Markets",
    desc: "Deep-rooted expertise in NCDs, Securitization, AIF, and Escrow structures.",
  },
];

export default function WhoWeAreVariant3() {
  return (
    <main className="bg-white">
      <BricknetHeader variant="white" />

      {/* Hero: Asymmetric Grid with Floating Elements */}
      <section className="relative px-5 pt-32 lg:px-20 lg:pt-48">
        <div className="wrapper">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Main Headline */}
            <div className="lg:col-span-8">
              <span className="mb-6 block text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                The Beacon Standard
              </span>
              <h1 className="font-serif text-6xl font-medium leading-[0.9] text-primary-navy lg:text-[120px] xl:text-[140px]">
                Legacy <br />
                <span className="ml-12 lg:ml-24">Redefined</span>
              </h1>
              <p className="mt-12 max-w-lg text-xl leading-relaxed text-secondary-light-navy">
                Beacon Trusteeship is India&apos;s leading fiduciary services provider, 
                blending tradition with technical innovation to secure the future of capital markets.
              </p>
            </div>

            {/* Side Floating Image */}
            <div className="relative h-96 w-full lg:col-span-4 lg:h-[600px]">
              <div className="absolute -left-8 -top-8 z-10 hidden aspect-square w-32 items-center justify-center bg-accent-gold p-4 text-center lg:flex">
                <span className="text-xs font-bold uppercase tracking-widest text-white">Est. 2015</span>
              </div>
              <Image
                src="https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
                alt="Architecture"
                fill
                className="object-cover grayscale"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro: Full Width Text with Scroll Interaction */}
      <section className="px-5 py-24 lg:px-20 lg:py-48">
        <div className="wrapper">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="text-8xl font-serif text-primary-navy/10 lg:text-[200px] leading-none select-none">
              01
            </div>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-medium text-primary-navy lg:text-5xl">
                We take pride in ensuring our one-stop solution motto is the answer to your needs.
              </h2>
              <p className="mt-8 text-lg text-secondary-light-navy">
                Formed by a group of ex-bankers with high experience in the Trusteeship business, our offerings are based on the valued experience of our principles and expert agencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values: Brutalist Grid */}
      <section className="bg-primary-navy py-24 lg:py-40">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {values.map((v, idx) => (
              <div 
                key={v.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group relative border-l border-white/20 pb-12 pl-8 pt-4 transition-all hover:border-accent-gold"
              >
                <h3 className="font-serif text-2xl text-white lg:text-3xl">{v.title}</h3>
                <p className="mt-6 text-white/50 group-hover:text-white/80">{v.desc}</p>
                <div className="absolute bottom-0 right-0 h-12 w-12 text-white/10 transition-colors group-hover:text-accent-gold">
                  <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section: Two Columns Image Focus */}
      <section className="px-5 py-24 lg:px-20 lg:py-48">
        <div className="wrapper">
          <div className="flex flex-col gap-24 lg:flex-row">
            {/* Left Image Large */}
            <div className="relative aspect-[4/5] w-full lg:w-1/2 overflow-hidden">
              <Image
                src="https://beacontrustee.co.in/assets/images/banners/head-banner-3.jpg"
                alt="Heritage"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-8 left-8 bg-white p-6 shadow-2xl">
                <span className="text-sm font-bold uppercase tracking-widest text-primary-navy">ISO 27001 Certified</span>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-center lg:w-1/2">
              <span className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-gold">Our Legacy</span>
              <h2 className="font-serif text-4xl text-primary-navy lg:text-6xl">First & Only Listed Trustee in India</h2>
              <p className="mt-8 text-lg leading-relaxed text-secondary-light-navy">
                Value addition beyond conventional trusteeship is our differentiator. We continuous aim to enhance quality through expert opinion and advice from members and reputed empanelled agencies.
              </p>
              
              <div className="mt-12 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="h-[2px] w-12 bg-accent-gold" />
                  <span className="text-sm font-bold uppercase tracking-widest text-primary-navy">20+ Locations</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-[2px] w-12 bg-accent-gold" />
                  <span className="text-sm font-bold uppercase tracking-widest text-primary-navy">SEBI Registered</span>
                </div>
              </div>

              <Link 
                href="/contact"
                className="mt-16 group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-navy"
              >
                Start a partnership
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-navy transition-all group-hover:bg-primary-navy group-hover:text-white">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Grid: 4 Column Minimal */}
      <section className="border-y border-primary-navy/10 py-12 lg:py-20">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-medium text-primary-navy">₹8L Cr+</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-secondary-light-navy/60">Assets Under Trustee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-medium text-primary-navy">15+</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-secondary-light-navy/60">Years Domain Exp.</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-medium text-primary-navy">1st</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-secondary-light-navy/60">Listed Enterprise</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-medium text-primary-navy">2022</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-secondary-light-navy/60">IPO Launch Year</div>
            </div>
          </div>
        </div>
      </section>

      <BricknetFooter />
    </main>
  );
}
