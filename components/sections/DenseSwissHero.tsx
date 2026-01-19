import Image from "next/image";
import Link from "next/link";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { ChevronRight } from "lucide-react";

export function DenseSwissHero() {
  return (
    <section
      className="relative min-h-screen bg-[#0B1230] text-white overflow-hidden flex flex-col"
      aria-label="Institutional Swiss Hero"
    >
      {/* Background Image with Corporate Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg"
          alt="Beacon Trusteeship Institutional background"
          fill
          priority
          className="object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1230]/90 via-[#0B1230]/60 to-[#0B1230]" />
      </div>

      {/* Swiss Grid Structure Lines - Centered Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="wrapper h-full grid grid-cols-4 lg:grid-cols-12">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-x border-white h-full" />
          ))}
        </div>
      </div>

      <BricknetHeader variant="overlay" />

      {/* Main Content: Centered and Balanced */}
      <div className="wrapper relative z-10 flex-1 flex flex-col justify-center items-center px-5 pt-32 pb-4 lg:px-20">
        <div className="max-w-5xl w-full text-center space-y-10">
          <div
            data-aos="fade"
            className="inline-flex items-center gap-4 border border-[#D6B26E] px-4 py-2"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D6B26E]">
              First & Only Listed Trustee in India
            </span>
          </div>

          <h1
            data-aos="fade-up"
            className="font-sans text-[52px] md:text-[80px] lg:text-[120px] font-black leading-[0.85] tracking-tighter uppercase"
          >
            Reliability <br />
            <span className="text-[#D6B26E]">at Scale.</span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-delay={200}
            className="mx-auto max-w-3xl space-y-12"
          >
            <p className="text-xl md:text-2xl font-medium leading-tight tracking-tight text-white/80">
              Institutional-grade fiduciary oversight for global capital
              markets. Blending regulatory rigor with the speed of digital
              execution.
            </p>

            <div className="flex flex-col sm:flex-row gap-px bg-white/20 p-px justify-center mx-auto w-full max-w-xl">
              <Link
                href="/contact"
                className="bg-[#D6B26E] px-10 py-6 text-[12px] font-black uppercase tracking-widest text-[#0B1230] hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                Start Onboarding
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/#services"
                className="bg-white/5 backdrop-blur-md px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Our Mandates
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Data Strip: High Density Swiss Layout - Relative to Flex */}
      <div className="relative z-20 border-t border-white/10 bg-[#0B1230]/90 backdrop-blur-xl">
        <div className="wrapper grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { label: "Assets Under Trusteeship", value: "₹8L CR+" },
            { label: "Operational Presence", value: "20+ CITIES" },
            { label: "Public Status", value: "NSE: BEACON" },
            { label: "Regulatory Body", value: "SEBI REGISTERED" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="px-8 py-8 lg:px-12 lg:py-12 flex flex-col items-center text-center group"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D6B26E]/60 group-hover:text-[#D6B26E] transition-colors mb-2">
                {stat.label}
              </p>
              <p className="text-2xl lg:text-3xl font-black tracking-tighter uppercase">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
