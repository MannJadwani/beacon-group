import Image from "next/image";
import Link from "next/link";

import { bricknetValues } from "@/lib/constants/bricknet";

export function ValuesSection() {
  return (
    <section className="bg-white py-24 lg:py-32" aria-label="Why Beacon">
      <div className="wrapper px-5 lg:px-20">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          <div className="lg:w-1/3">
            <div data-aos="fade-right" className="sticky top-32 space-y-8">
              <span className="inline-block bg-primary-navy px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
                Our Values
              </span>
              <h2 className="text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                Why Beacon <br /> Trusteeship?
              </h2>
              <p className="text-lg text-secondary-light-navy">
                Institutional governance meets <br /> entrepreneurial speed.
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div
              className="grid grid-cols-1 gap-12 sm:grid-cols-2"
              aria-label="Company values"
            >
              {bricknetValues.map((value, idx) => (
                <article
                  key={value.title}
                  className="group relative flex flex-col space-y-6 bg-white border border-primary-navy/5 p-10 transition-all hover:shadow-2xl hover:border-accent-gold/20"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-accent-gold/10 text-accent-gold transition-colors group-hover:bg-accent-gold group-hover:text-white">
                    <span className="text-xl font-black">0{idx + 1}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-medium tracking-tight text-primary-navy">
                      {value.title}
                    </h3>
                    <p className="text-base leading-relaxed text-secondary-light-navy">
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
