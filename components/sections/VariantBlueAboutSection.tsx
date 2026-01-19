import Link from "next/link";

import { bricknetStats } from "@/lib/constants/bricknet";

export function VariantBlueAboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 lg:py-32" aria-label="About Us">
      {/* Soft decorative elements */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#183EFA]/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#EDE44C]/10 blur-3xl" />
      
      <div className="wrapper relative z-10 px-5 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-8">
            <div data-aos="fade-right" className="space-y-8">
              <span className="inline-block bg-gradient-to-r from-[#EDE44C] to-[#f5ed8a] px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase text-[#183EFA] rounded-full shadow-lg shadow-[#EDE44C]/20">
                Our Foundation
              </span>
              
              <h2 className="text-4xl font-semibold leading-[1.1] text-[#183EFA] lg:text-6xl">
                Our people are what sets us apart. We blend customer-centric 
                trustee services with <span className="bg-gradient-to-r from-[#EDE44C] to-[#f5ed8a] bg-clip-text text-transparent">integrity and expertise</span>.
              </h2>
              
              <p className="max-w-2xl text-xl leading-relaxed text-[#183EFA]/50">
                As India&apos;s first listed trustee company, we&apos;ve set the standard for 
                regulatory rigor and proactive execution in capital markets.
              </p>

              <div className="pt-4">
                <Link href="/who-we-are" className="group inline-flex items-center gap-4 text-sm font-bold tracking-widest text-[#183EFA]">
                  <span className="relative">
                    COMPANY OVERVIEW
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-[#EDE44C] transition-transform group-hover:scale-x-100 rounded-full" />
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#183EFA]/5 transition-all group-hover:bg-[#183EFA] group-hover:text-white shadow-lg shadow-[#183EFA]/10">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {bricknetStats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="group relative rounded-2xl bg-gradient-to-br from-white to-[#f8faff] p-8 shadow-xl shadow-[#183EFA]/5 transition-all hover:shadow-2xl hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#EDE44C]" />
                  <div className="mb-2 text-5xl font-semibold tracking-tight text-[#183EFA] lg:text-6xl">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wider text-[#183EFA]/40">
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
