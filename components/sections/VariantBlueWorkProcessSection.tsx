import { bricknetWorkSteps } from "@/lib/constants/bricknet";

export function VariantBlueWorkProcessSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#f8faff] to-white py-24 lg:py-32 overflow-hidden" aria-label="How We Work">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#183EFA]/3 blur-3xl" />
      <div className="absolute bottom-20 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#EDE44C]/10 blur-3xl" />
      
      <div className="wrapper px-5 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <div data-aos="fade-right" className="sticky top-32 space-y-8">
              <span className="inline-block bg-gradient-to-r from-[#EDE44C] to-[#f5ed8a] px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase text-[#183EFA] rounded-full shadow-lg shadow-[#EDE44C]/20">
                Our Process
              </span>
              <h2 className="text-4xl font-semibold leading-[1.1] text-[#183EFA] lg:text-6xl">
                A disciplined <br /> engagement <br /> process
              </h2>
              <p className="text-lg text-[#183EFA]/50">
                We align documentation, security creation, and monitoring 
                to safeguard stakeholders through the entire deal lifecycle.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6">
              {bricknetWorkSteps.map((step, idx) => (
                <article
                  key={step.number}
                  className="group relative rounded-3xl bg-white p-10 shadow-xl shadow-[#183EFA]/5 transition-all hover:shadow-2xl hover:-translate-y-1 lg:p-12"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="font-serif text-5xl italic text-[#EDE44C]/30 transition-all group-hover:text-[#EDE44C]">
                      {step.number}
                    </span>
                    <div className="h-1 w-16 rounded-full bg-[#183EFA]/10 transition-all group-hover:w-24 group-hover:bg-[#EDE44C]" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-[#183EFA] lg:text-3xl">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-[#183EFA]/50 lg:text-lg">
                      {step.description}
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
