import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-secondary-light-navy" aria-label="Call to action">
      <div className="wrapper flex flex-col items-center justify-center gap-16 px-5 py-20 lg:p-20">
        <h2
          data-aos="fade"
          className="max-w-[980px] border-b border-base-white pb-16 text-center text-4xl font-medium leading-tight text-base-white lg:text-[80px]"
          id="cta-title"
        >
          Ready to Build Something Remarkable?
        </h2>

        <Link
          data-aos="fade-up"
          data-aos-delay={150}
          href="/projects"
          className="btn btn-solid-white"
          aria-label="View More Project"
        >
          View More Project
          <span aria-hidden="true" className="text-xl">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
