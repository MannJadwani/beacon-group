import Link from "next/link";

import { bricknetStats } from "@/lib/constants/bricknet";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 lg:py-32" aria-label="About Us">
      <div className="swiss-grid absolute inset-0 opacity-[0.03]" />
      
      <div className="wrapper relative z-10 px-5 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-8">
            <div data-aos="fade-right" className="space-y-8">
              <span className="inline-block bg-[var(--color-accent-gold)] px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
                Our Foundation
              </span>
              
              <h2 className="text-4xl font-medium leading-[1.1] text-[var(--color-primary-navy)] lg:text-6xl">
                Our people are what sets us apart. We blend customer-centric 
                trustee services with <span className="text-[var(--color-accent-gold)]">integrity and expertise</span>.
              </h2>
              
              <p className="max-w-2xl text-xl leading-relaxed text-secondary-light-navy">
                As India&apos;s first listed trustee company, we&apos;ve set the standard for 
                regulatory rigor and proactive execution in capital markets.
              </p>

              <div className="pt-4">
                <Link href="/who-we-are" className="group inline-flex items-center gap-4 text-sm font-bold tracking-widest text-primary-navy">
                  <span className="relative">
                    COMPANY OVERVIEW
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-accent-gold transition-transform group-hover:scale-x-100" />
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center border border-primary-navy transition-colors group-hover:bg-primary-navy group-hover:text-white">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
              {bricknetStats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="group relative border-l-2 border-[var(--color-accent-gold)]/20 pl-8 transition-colors hover:border-[var(--color-accent-gold)]"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="mb-1 text-5xl font-medium tracking-tight text-[var(--color-primary-navy)] lg:text-6xl">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wider text-secondary-light-navy">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
