import { bricknetValues } from "@/lib/constants/bricknet";

export function ElectricValues() {
  return (
    <section className="bg-[var(--color-primary-navy)] py-24 lg:py-32 text-white relative" aria-label="Why Beacon">
      {/* Background decoration */}
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-[var(--color-primary-navy-dark)] skew-y-3 transform origin-bottom-left -z-0"></div>

      <div className="wrapper px-5 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div data-aos="fade-right" className="space-y-8">
              <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                WHY <br/> 
                <span className="text-[var(--color-accent-gold)]">BEACON?</span>
              </h2>
              <p className="text-2xl font-light text-white/80 border-l-2 border-[var(--color-accent-gold)] pl-6 py-2">
                Institutional governance meets <br /> entrepreneurial speed.
              </p>
              
              <div className="hidden lg:block pt-12">
                 <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center animate-spin-slow">
                    <span className="text-xs font-bold tracking-widest">TRUST</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-0 border border-white/20 bg-[var(--color-primary-navy)]">
              {bricknetValues.map((value, idx) => (
                <article
                  key={value.title}
                  className="group relative flex flex-col md:flex-row gap-6 p-8 border-b border-white/20 last:border-b-0 hover:bg-white hover:text-[var(--color-primary-navy)] transition-colors duration-300"
                  data-aos="fade-left"
                  data-aos-delay={idx * 100}
                >
                  <div className="text-4xl font-bold text-[var(--color-accent-gold)] group-hover:text-[var(--color-primary-navy)] opacity-50">
                    0{idx + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-base opacity-70 group-hover:opacity-100 max-w-md">
                      {value.description}
                    </p>
                  </div>
                  <div className="md:ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                     <span className="text-4xl">↗</span>
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
