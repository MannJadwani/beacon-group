import Image from "next/image";
import Link from "next/link";
import { BricknetHeader } from "@/components/layout/BricknetHeader";

export function SwissBrightHero() {
  return (
    <section 
      className="relative min-h-screen bg-[var(--color-primary-navy)] text-white" 
      aria-label="Swiss Bright Hero"
    >
      {/* Heavy Swiss Grid */}
      <div className="swiss-grid-bold absolute inset-0 opacity-20" />

      <BricknetHeader variant="overlay" />

      <div className="wrapper relative z-10 flex min-h-screen flex-col px-5 pt-32 lg:px-20 lg:pt-48">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left: Huge Brutalist Type */}
          <div className="lg:col-span-8">
            <div data-aos="fade-right" className="space-y-4">
              <span className="inline-block border border-[var(--color-accent-gold)] px-2 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-accent-gold)]">
                EST. 2015
              </span>
              <h1 className="font-sans text-[60px] font-black leading-[0.85] tracking-tighter uppercase lg:text-[140px] xl:text-[180px]">
                TRUST <br />
                <span className="text-[var(--color-accent-gold)]">SCALED.</span>
              </h1>
            </div>

            <div data-aos="fade-up" data-aos-delay={200} className="mt-12 max-w-lg">
              <p className="text-xl font-medium leading-tight tracking-tight lg:text-2xl">
                India&apos;s first listed trustee. Blending institutional rigor with digital speed.
              </p>
              
              <div className="mt-12 flex flex-wrap gap-4">
                <Link 
                  href="/contact" 
                  className="bg-[var(--color-accent-gold)] px-10 py-5 text-[14px] font-black uppercase tracking-widest text-primary-navy hover:invert transition-all"
                >
                  Get Started
                </Link>
                <Link 
                  href="/#services" 
                  className="border-2 border-white px-10 py-5 text-[14px] font-black uppercase tracking-widest hover:bg-white hover:text-[var(--color-primary-navy)] transition-all"
                >
                  Services
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Sharp Info Blocks */}
          <div className="lg:col-span-4 lg:pt-24">
            <div data-aos="fade-left" className="space-y-px bg-white/10">
              {[
                { label: "Assets Managed", value: "₹8L CR+" },
                { label: "Locations", value: "20+" },
                { label: "Regulatory", value: "SEBI" },
              ].map((stat, idx) => (
                <div key={stat.label} className="bg-[var(--color-primary-navy)] p-8 border-l-4 border-[var(--color-accent-gold)]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">{stat.label}</p>
                  <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Side Text */}
      <div className="absolute right-8 bottom-32 hidden lg:block">
        <p className="rotate-90 origin-right text-[10px] font-black uppercase tracking-[1em] text-white/20">
          BEACON TRUSTEESHIP LIMITED
        </p>
      </div>
    </section>
  );
}
