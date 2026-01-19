import { bricknetWorkSteps } from "@/lib/constants/bricknet";

export function WorkProcessSection() {
  return (
    <section className="bg-white py-24 lg:py-32" aria-label="How We Work">
      <div className="wrapper px-5 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <div data-aos="fade-right" className="sticky top-32 space-y-8">
              <span className="inline-block bg-accent-gold px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
                Our Process
              </span>
              <h2 className="text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                A disciplined <br /> engagement <br /> process
              </h2>
              <p className="text-lg text-secondary-light-navy">
                We align documentation, security creation, and monitoring 
                to safeguard stakeholders through the entire deal lifecycle.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px bg-primary-navy/10 border border-primary-navy/10">
              {bricknetWorkSteps.map((step, idx) => (
                <article
                  key={step.number}
                  className="group relative bg-white p-10 transition-all hover:bg-primary-navy hover:text-white lg:p-12"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-5xl font-black text-accent-gold opacity-20 transition-opacity group-hover:opacity-100">
                      {step.number}
                    </span>
                    <div className="h-px w-20 bg-primary-navy/10 transition-all group-hover:w-32 group-hover:bg-accent-gold" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium tracking-tight text-primary-navy group-hover:text-white lg:text-3xl">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-secondary-light-navy group-hover:text-white/80 lg:text-lg">
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
