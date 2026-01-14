import Image from "next/image";
import Link from "next/link";

import { BricknetHeader } from "@/components/layout/BricknetHeader";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex flex-col justify-start pb-10"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/bricknet/images/hero-01@1x.webp"
          alt="Modern city skyline with architectural structures"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#222222]/40" aria-hidden="true" />

      <BricknetHeader />

      <div className="wrapper mt-[80px] px-5 pb-20 pt-20 lg:mt-[118px] lg:px-20">
        <div className="flex flex-col items-center gap-10 overflow-hidden">
          <p className="inline-flex items-center gap-2 rounded-full border border-base-white/60 px-4 py-1.5 text-sm font-medium text-base-white">
            <span className="block size-2 rounded-full bg-base-white" aria-hidden="true" />
            Your Best-Construction Partner
          </p>

          <div className="flex w-full max-w-7xl flex-col items-center gap-6 text-center text-base-white">
            <h1
              data-aos="fade"
              className="text-4xl font-medium leading-tight lg:text-[80px] lg:leading-[88px]"
            >
              Building Your Vision from the Ground Up
            </h1>
            <p data-aos="fade" data-aos-delay={300} className="max-w-[750px] text-lg leading-relaxed">
              We offer reliable construction services with a focus on unmatched
              quality, ensuring projects are completed on time and within budget.
            </p>
          </div>

          <Link href="/contact" className="btn btn-solid-white" aria-label="Get a Free Quote">
            Get a Free Quote
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
