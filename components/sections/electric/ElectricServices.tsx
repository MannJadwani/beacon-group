import { bricknetServices } from "@/lib/constants/bricknet";

export function ElectricServices() {
  return (
    <section id="services" className="bg-white py-24 lg:py-32 relative overflow-hidden" aria-label="Our Services">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--color-primary-navy)]/5 -skew-x-12 transform origin-top-right"></div>
      
      <div className="wrapper px-5 lg:px-20 relative z-10">
        <div className="mb-20 flex flex-col lg:flex-row items-end justify-between gap-10">
          <div data-aos="fade-right" className="max-w-2xl">
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-[var(--color-primary-navy)] mb-6">
              SOLUTIONS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-navy)] to-[var(--color-secondary-light-navy)]">LIFECYCLE</span>
            </h2>
             <span className="inline-block bg-[var(--color-primary-navy)] text-white px-4 py-2 text-sm font-bold tracking-widest uppercase transform -skew-x-12">
              Core Expertise
            </span>
          </div>
          <p data-aos="fade-left" className="text-xl font-light text-[var(--color-primary-navy)]/70 max-w-md border-l-4 border-[var(--color-accent-gold)] pl-6">
            From debenture trusteeship to securitization and escrow, 
            Beacon delivers institutional-grade oversight for global markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bricknetServices.map((service, idx) => (
            <div
              key={service.number}
              className="group relative bg-[var(--color-primary-navy)] text-white p-8 hover:-translate-y-2 transition-transform duration-300"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-accent-gold)] transition-transform duration-300 transform scale-0 group-hover:scale-100 origin-top-right"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-[var(--color-accent-gold)] text-xs font-bold tracking-[0.2em] mb-4 border-b border-white/20 pb-4 inline-block">
                     {service.number}
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-[var(--color-accent-gold)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end">
                   <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
