import Link from "next/link";

import { bricknetStats } from "@/lib/constants/bricknet";

export function AboutSection() {
  return (
    <section id="about" className="bg-base-white" aria-label="About Us">
      <div className="wrapper px-5 py-10 lg:px-20 lg:py-20">
        <div className="flex flex-col items-center gap-20 lg:items-start">
          <div className="flex w-full flex-col items-center gap-10 lg:items-start">
            <span className="label label-solid-orange">About Us</span>

            <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-y-0">
              <h2
                data-aos="fade"
                className="w-full max-w-[800px] text-center text-3xl font-medium leading-tight text-secondary-navy lg:text-left"
              >
                With decades of experience, we specialize in turning ideas into{" "}
                <span className="text-primary-orange">well-designed structures</span>
                {" "}that stand the test of time.
              </h2>

              <Link href="/about" className="btn btn-outline-dark" aria-label="Get to Know Us">
                Get to Know Us
                <span aria-hidden="true" className="text-xl">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div
            className="grid w-full grid-cols-1 gap-y-20 lg:grid-cols-4 lg:gap-y-0"
            aria-label="Company statistics"
          >
            {bricknetStats.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-4 border-t border-base-grey-stroke pt-8"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="text-center text-6xl font-medium leading-tight text-secondary-navy">
                  {stat.value}
                </div>
                <div className="text-center text-lg leading-tight text-base-grey">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
