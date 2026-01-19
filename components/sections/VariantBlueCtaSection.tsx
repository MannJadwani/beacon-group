import Link from "next/link";

export function VariantBlueCtaSection() {
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden" aria-label="Call to action">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDE44C] via-[#f5ed8a] to-[#EDE44C]" />
      
      {/* Decorative blobs */}
      <div className="absolute top-10 right-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-10 left-20 h-80 w-80 rounded-full bg-[#183EFA]/10 blur-3xl" />
      
      <div className="wrapper relative z-10 px-5 lg:px-20 text-center">
        <div data-aos="fade-up" className="space-y-12">
          <h2
            className="mx-auto max-w-4xl font-serif text-4xl font-semibold leading-[1.1] text-[#183EFA] lg:text-7xl"
            id="cta-title"
          >
            Ready to partner with a <br /> <span className="italic text-[#183EFA]/60">trusted</span> trustee?
          </h2>

          <div className="pt-8">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-[#183EFA] px-12 py-6 text-sm font-bold tracking-[0.2em] text-white shadow-2xl shadow-[#183EFA]/30 transition-all hover:shadow-[#183EFA]/40 hover:-translate-y-1"
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
