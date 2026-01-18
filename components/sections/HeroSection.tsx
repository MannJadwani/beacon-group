import Image from "next/image";
import Link from "next/link";

import { BricknetHeader } from "@/components/layout/BricknetHeader";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex flex-col justify-start pb-10"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg"
          alt="Beacon Trusteeship leadership banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[var(--color-primary-navy)]/60" aria-hidden="true" />

      <BricknetHeader variant="overlay" />

      <div className="wrapper relative z-10 mt-[80px] px-5 pb-20 pt-20 lg:mt-[118px] lg:px-20">
        <div className="flex flex-col items-center gap-10 overflow-hidden text-center">
          <div data-aos="fade-up" className="space-y-6">
            <div className="flex justify-center">
              <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                <span className="block size-1.5 animate-pulse rounded-full bg-[var(--color-accent-gold)]" aria-hidden="true" />
                First & Only Listed Trustee in India
              </p>
            </div>

            <h1
              className="mx-auto max-w-5xl text-5xl font-medium leading-[1.1] tracking-tight text-white lg:text-8xl"
            >
              Paving a smooth road for <span className="text-[var(--color-accent-gold)]">debt fund raising</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70 lg:text-xl">
              Beacon Trusteeship Limited delivers institutional-grade trustee, security, 
              and escrow solutions that safeguard stakeholders and keep transactions moving.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay={400} className="flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="group relative overflow-hidden rounded-full bg-white px-10 py-5 text-sm font-bold tracking-widest text-primary-navy transition-all hover:bg-accent-gold hover:text-white">
              GET STARTED
            </Link>
            <Link href="/#services" className="glass group relative overflow-hidden rounded-full px-10 py-5 text-sm font-bold tracking-widest text-white transition-all hover:bg-white/10">
              OUR SERVICES
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
