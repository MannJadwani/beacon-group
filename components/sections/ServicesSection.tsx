import Image from "next/image";

import { bricknetServices } from "@/lib/constants/bricknet";

export function ServicesSection() {
  return (
    <section id="services" className="bg-base-white" aria-label="Our Services">
      <div className="wrapper px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-20">
          <div className="flex flex-col items-center gap-10">
            <span className="label label-solid-orange">Our Services</span>
            <div className="flex flex-col items-center gap-6">
              <h2 data-aos="fade" className="text-center text-4xl font-medium leading-tight text-secondary-navy">
                We Build Everything You Need
              </h2>
              <p className="max-w-[850px] text-center text-lg leading-relaxed text-base-grey">
                We provide tailored construction solutions, designed to meet your
                needs and executed with precision and expertise.
              </p>
            </div>
          </div>

          <ul
            className="grid w-full list-none grid-cols-1 gap-10 p-0 lg:grid-cols-3 lg:gap-y-20"
            aria-label="Service offerings"
          >
            {bricknetServices.map((service, idx) => (
              <li
                key={service.number}
                className="flex w-full flex-col gap-8"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="text-xl leading-tight text-primary-orange">
                  {service.number}
                </div>
                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl font-medium leading-tight text-base-black">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-base-grey">
                    {service.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    width={400}
                    height={340}
                    className="h-auto w-full max-h-[340px] object-cover"
                    sizes="(min-width: 1024px) 360px, 100vw"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
