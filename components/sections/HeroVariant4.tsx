import Image from "next/image";
import Link from "next/link";
import { BricknetHeader } from "@/components/layout/BricknetHeader";

export function HeroVariant4() {
  return (
    <section 
      className="relative min-h-screen overflow-hidden bg-white" 
      aria-label="Hero section - Anchor Variant"
    >
      {/* Swiss Grid Background */}
      <div className="swiss-grid absolute inset-0 opacity-[0.03]" />

      <BricknetHeader variant="white" />

      {/* Large Geometric Anchor Element (The Gold Circle) */}
      <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 lg:-right-48">
        <div className="relative flex h-[400px] w-[400px] items-center justify-center rounded-full border-[40px] border-accent-gold/10 lg:h-[800px] lg:w-[800px] lg:border-[80px]">
          {/* Inner solid arc/circle */}
          <div className="absolute h-[80%] w-[80%] rounded-full border-2 border-accent-gold/20" />
          
          {/* Central founding year text */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-xs font-black uppercase tracking-[0.5em] text-accent-gold/40 lg:text-sm">
              Established
            </span>
            <span className="font-serif text-6xl font-medium text-accent-gold/20 lg:text-[160px]">
              2015
            </span>
          </div>
        </div>
      </div>

      <div className="wrapper relative z-10 flex min-h-screen flex-col justify-center px-5 pt-20 lg:px-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div data-aos="fade" className="mb-8">
            <span className="inline-flex items-center gap-3 rounded-sm border border-accent-gold/20 bg-accent-gold/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent-gold">
              <span className="h-2 w-2 rounded-full bg-accent-gold animate-pulse" />
              First & Only Listed Trustee in India
            </span>
          </div>

          {/* Headline */}
          <h1 
            data-aos="fade-up" 
            className="font-serif text-5xl font-medium leading-[0.95] tracking-tight text-primary-navy lg:text-8xl xl:text-[110px]"
          >
            Stability in <br />
            <span className="italic text-accent-gold">Capital Markets</span>
          </h1>

          <p 
            data-aos="fade-up" 
            data-aos-delay={100}
            className="mt-10 max-w-xl text-lg leading-relaxed text-secondary-light-navy lg:text-xl"
          >
            Beacon Trusteeship Limited provides institutional-grade fiduciary 
            solutions, ensuring transparency and security for every transaction 
            across India&apos;s financial landscape.
          </p>

          {/* CTA Group */}
          <div 
            data-aos="fade-up" 
            data-aos-delay={200}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <Link 
              href="/contact" 
              className="rounded-sm bg-primary-navy px-10 py-5 text-[12px] font-bold tracking-[0.2em] text-white transition-all hover:bg-accent-gold"
            >
              START PARTNERSHIP
            </Link>
            <Link 
              href="/#services" 
              className="group flex items-center gap-4 text-[12px] font-bold tracking-[0.2em] text-primary-navy"
            >
              OUR SERVICES
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-navy/10 transition-all group-hover:bg-primary-navy group-hover:text-white">
                →
              </span>
            </Link>
          </div>

          {/* Floating SEBI Badge Card */}
          <div 
            data-aos="fade-left" 
            data-aos-delay={400}
            className="mt-16 inline-flex items-center gap-6 border border-black/5 bg-white/50 p-6 backdrop-blur-xl lg:mt-24 lg:p-8"
          >
            <div className="relative h-14 w-14 lg:h-20 lg:w-20">
              <Image
                src="https://beacontrustee.co.in/assets/images/sebi-certificate-latest.png"
                alt="SEBI Logo"
                fill
                className="object-contain grayscale brightness-0"
              />
            </div>
            <div className="border-l border-black/10 pl-6 lg:pl-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-gold">
                Governance
              </p>
              <h3 className="mt-1 text-lg font-medium text-primary-navy lg:text-2xl">
                SEBI Registered <br />
                <span className="text-secondary-light-navy/60">Debenture Trustee</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Accent - Bottom corner */}
      <div className="absolute bottom-0 left-0 h-32 w-32 border-l-2 border-b-2 border-accent-gold/20 lg:h-48 lg:w-48" />
    </section>
  );
}
