import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-accent-gold py-24 lg:py-40" aria-label="Call to action">
      <div className="wrapper px-5 lg:px-20 text-center">
        <div data-aos="fade-up" className="space-y-12">
          <h2
            className="mx-auto max-w-5xl text-5xl font-medium leading-[1.1] text-white lg:text-[100px]"
            id="cta-title"
          >
            Ready to partner <br /> with a <span className="opacity-60">trusted</span> trustee?
          </h2>

          <div className="pt-8">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center bg-white px-12 py-6 text-sm font-bold tracking-[0.2em] text-primary-navy transition-all hover:bg-primary-navy hover:text-white"
              aria-label="Contact Beacon Trusteeship"
            >
              <span className="relative z-10">SCHEDULE A CONVERSATION</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
