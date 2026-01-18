import Image from "next/image";

import { bricknetPartnerLogos } from "@/lib/constants/bricknet";

export function PartnersSection() {
  return (
    <section className="bg-white py-16 lg:py-24" aria-label="Trusted issuers">
      <div className="wrapper px-5 lg:px-20">
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-secondary-light-navy">
              Institutional Trust
            </span>
            <div className="h-px flex-1 bg-primary-navy/10" />
          </div>
          
          <div
            className="grid grid-cols-2 items-center justify-items-center gap-12 grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100 lg:grid-cols-5"
            aria-label="Partner logos"
          >
            {bricknetPartnerLogos.map((logo, idx) => (
              <div
                key={logo.src}
                className="relative h-12 w-full max-w-[140px]"
                aria-label={logo.alt}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain transition-transform hover:scale-110"
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
