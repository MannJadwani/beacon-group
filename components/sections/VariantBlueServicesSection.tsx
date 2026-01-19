import Image from "next/image";

import { bricknetServices } from "@/lib/constants/bricknet";

export function VariantBlueServicesSection() {
  return (
    <section id="services" className="relative bg-gradient-to-br from-[#183EFA] via-[#2952ff] to-[#183EFA] py-24 text-white lg:py-32 overflow-hidden" aria-label="Our Services">
      {/* Soft decorative blobs */}
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-[#EDE44C]/10 blur-3xl" />
      
      <div className="wrapper relative z-10 px-5 lg:px-20">
        <div className="mb-20 grid grid-cols-1 items-end gap-8 lg:grid-cols-2 lg:mb-24">
          <div data-aos="fade-right" className="space-y-6">
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase text-white rounded-full">
              Core Expertise
            </span>
            <h2 className="text-4xl font-semibold leading-[1.1] lg:text-6xl">
              Solutions across the capital markets lifecycle
            </h2>
          </div>
          <p data-aos="fade-left" className="text-lg leading-relaxed text-white/60 lg:max-w-md lg:ml-auto">
            From debenture trusteeship to securitization and escrow, 
            Beacon delivers institutional-grade oversight for global markets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {bricknetServices.map((service, idx) => (
            <div
              key={service.number}
              className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm p-10 transition-all hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 lg:p-12"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="text-sm font-bold tracking-widest text-[#EDE44C] bg-[#EDE44C]/10 px-3 py-1.5 rounded-lg">
                  {service.number}
                </span>
                <span className="h-px w-12 bg-white/20 transition-all group-hover:w-20 group-hover:bg-[#EDE44C] rounded-full" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-semibold tracking-tight lg:text-3xl">
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
                  className="object-cover grayscale rounded-3xl"
                />
              </div>

              <div className="mt-10 pt-10">
                <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-all group-hover:bg-[#EDE44C] group-hover:text-[#183EFA] shadow-lg">
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
