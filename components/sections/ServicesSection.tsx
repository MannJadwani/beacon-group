import Image from "next/image";

import { bricknetServices } from "@/lib/constants/bricknet";

export function ServicesSection() {
  return (
    <section id="services" className="bg-primary-navy py-24 text-white lg:py-32" aria-label="Our Services">
      <div className="wrapper px-5 lg:px-20">
        <div className="mb-20 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:mb-24">
          <div data-aos="fade-right" className="space-y-6">
            <div className="flex">
              <p className="inline-flex items-center gap-2 bg-accent-gold px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <span className="block size-1.5 bg-white" aria-hidden="true" />
                Core Expertise
              </p>
            </div>
            <h2 className="text-4xl font-medium leading-[1.1] lg:text-6xl text-white">
              Solutions across the <br /> <span className="text-accent-gold">capital markets</span> lifecycle
            </h2>
          </div>
          <p data-aos="fade-left" className="text-lg leading-relaxed text-white/60 lg:max-w-md lg:ml-auto">
            From debenture trusteeship to securitization and escrow, 
            Beacon delivers institutional-grade oversight for global markets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 lg:grid-cols-3">
          {bricknetServices.map((service, idx) => (
            <div
              key={service.number}
              className="group relative overflow-hidden bg-primary-navy p-10 transition-colors hover:bg-white/5 lg:p-12"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="text-sm font-black tracking-widest text-accent-gold">
                  {service.number}
                </span>
                <span className="h-px w-12 bg-white/20 transition-all group-hover:w-20 group-hover:bg-accent-gold" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-medium tracking-tight lg:text-3xl">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-white/50">
                  {service.description}
                </p>
              </div>

              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-10">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  fill
                  className="object-cover grayscale"
                />
              </div>

              <div className="mt-12">
                <button className="flex h-12 w-12 items-center justify-center border border-white/20 transition-all group-hover:border-accent-gold group-hover:bg-accent-gold group-hover:text-white">
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
