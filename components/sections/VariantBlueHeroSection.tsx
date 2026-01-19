import Image from "next/image";
import Link from "next/link";

import { VariantBlueHeader } from "@/components/layout/VariantBlueHeader";

export function VariantBlueHeroSection() {
  return (
    <section
      id="top"
      className="relative flex flex-col justify-start pb-10"
      aria-label="Hero section"
    >
      {/* Soft gradient background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#e8f0ff] via-[#f0f4ff] to-[#f8faff]" />
      
      {/* Subtle decorative shapes */}
      <div className="absolute top-20 right-10 -z-10 h-72 w-72 rounded-full bg-[#183EFA]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 -z-10 h-96 w-96 rounded-full bg-[#EDE44C]/10 blur-3xl" />

      <VariantBlueHeader variant="white" />

      <div className="wrapper relative z-10 mt-[80px] px-5 pb-20 pt-24 lg:mt-[118px] lg:px-20 lg:pt-32">
        <div className="flex flex-col items-center gap-12 overflow-hidden text-center">
          <div data-aos="fade-up" className="space-y-8">
            <div className="flex justify-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase text-[#183EFA]/80 shadow-lg shadow-[#183EFA]/5 backdrop-blur-sm">
                <span className="block size-2 animate-pulse rounded-full bg-[#EDE44C]" aria-hidden="true" />
                First & Only Listed Trustee in India
              </p>
            </div>

            <h1
              className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.1] tracking-tight text-[#183EFA] lg:text-8xl"
            >
              Paving a smooth road for <span className="bg-gradient-to-r from-[#EDE44C] to-[#f5ed8a] bg-clip-text text-transparent">debt fund raising</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#183EFA]/60 lg:text-xl">
              Beacon Trusteeship Limited delivers institutional-grade trustee, security, 
              and escrow solutions that safeguard stakeholders and keep transactions moving.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay={400} className="flex flex-col gap-4 sm:flex-row">
            <Link 
              href="/contact" 
              className="group relative overflow-hidden rounded-2xl bg-[#183EFA] px-10 py-5 text-sm font-bold tracking-widest text-white shadow-xl shadow-[#183EFA]/25 transition-all hover:shadow-2xl hover:shadow-[#183EFA]/30 hover:-translate-y-0.5"
            >
              GET STARTED
            </Link>
            <Link 
              href="/#services" 
              className="group relative overflow-hidden rounded-2xl bg-white px-10 py-5 text-sm font-bold tracking-widest text-[#183EFA] shadow-lg shadow-gray-200/50 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              OUR SERVICES
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
