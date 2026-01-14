import Image from "next/image";

import { bricknetPartnerLogos } from "@/lib/constants/bricknet";

export function PartnersSection() {
  return (
    <section className="bg-base-white" aria-label="Partners">
      <div className="wrapper px-5 py-20 lg:px-20 lg:pb-32">
        <div
          className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-0"
          aria-label="Partner logos"
        >
          {bricknetPartnerLogos.map((logo, idx) => (
            <div
              key={logo.src}
              className="mx-5 h-9"
              aria-label={logo.alt}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={36}
                className="h-full w-auto object-contain"
                sizes="(min-width: 1024px) 140px, 120px"
                priority={idx < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
