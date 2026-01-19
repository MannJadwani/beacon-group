import Image from "next/image";

import { bricknetPartnerLogos } from "@/lib/constants/bricknet";

export function VariantBluePartnersSection() {
  return (
    <section className="bg-gradient-to-b from-[#f8faff] to-white py-16 lg:py-24" aria-label="Trusted issuers">
      <div className="wrapper px-5 lg:px-20">
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#183EFA]/50 bg-[#183EFA]/5 px-4 py-2 rounded-full">
              Institutional Trust
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#183EFA]/10 to-transparent" />
          </div>
          
          <div
            className="grid grid-cols-2 items-center justify-items-center gap-8 lg:grid-cols-5"
            aria-label="Partner logos"
          >
            {bricknetPartnerLogos.map((logo, idx) => (
              <div
                key={logo.src}
                className="relative h-16 w-full max-w-[160px] rounded-2xl bg-white p-4 shadow-lg shadow-[#183EFA]/5 transition-all hover:shadow-xl hover:-translate-y-1 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                aria-label={logo.alt}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain p-3"
                  sizes="(min-width: 1024px) 160px, 120px"
                  priority={idx < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
