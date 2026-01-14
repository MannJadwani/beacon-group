import Image from "next/image";
import Link from "next/link";

import { bricknetValues } from "@/lib/constants/bricknet";

export function ValuesSection() {
  return (
    <section className="bg-base-white" aria-label="Why Bricknet">
      <div className="wrapper px-5 pb-20 pt-10 lg:px-20 lg:pb-28 lg:pt-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="flex w-full flex-col justify-between lg:w-1/3">
            <div className="flex flex-col gap-10">
              <span className="label label-solid-orange">Our Great Values</span>
              <h2 data-aos="fade" className="text-4xl font-medium leading-tight text-secondary-navy">
                Why Bricknet?
              </h2>
            </div>

            <Link
              href="/about"
              className="btn btn-outline-dark hidden lg:inline-flex"
              aria-label="Get to Know Us"
            >
              Get to Know Us
              <span aria-hidden="true" className="text-xl">
                →
              </span>
            </Link>
          </div>

          <div className="flex flex-1 flex-col gap-20">
            <p data-aos="fade" className="text-2xl font-medium leading-tight text-base-grey">
              Trusted by industry leaders, built for long-lasting results, and
              designed to deliver reliable, enduring success.
            </p>

            <div
              className="grid grid-cols-1 gap-10 lg:grid-cols-2"
              aria-label="Company values"
            >
              {bricknetValues.map((value, idx) => (
                <article
                  key={value.title}
                  className="flex flex-col gap-6"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="flex size-16 items-center justify-center bg-primary-light-orange">
                    <Image
                      src={value.iconSrc}
                      alt=""
                      width={40}
                      height={40}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-medium leading-tight text-secondary-navy">
                      {value.title}
                    </h3>
                    <p className="text-base leading-relaxed text-base-grey">
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <Link
              href="/about"
              className="btn btn-outline-dark lg:hidden"
              aria-label="Get to Know Us"
            >
              Get to Know Us
              <span aria-hidden="true" className="text-xl">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
