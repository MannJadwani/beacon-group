import { bricknetServices } from "@/lib/constants/bricknet";
import { ArrowUpRight } from "lucide-react";

export function CleanServices() {
  return (
    <section className="bg-white py-24">
      <div className="wrapper px-5 lg:px-20">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[var(--color-clean-blue)] font-bold uppercase tracking-widest text-xs">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-black text-[var(--color-clean-navy)] tracking-tight">
            Comprehensive <br />
            Trustee Solutions.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bricknetServices.map((service, idx) => (
            <div 
              key={service.title}
              className="group clean-card p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
            >
              {/* Hover Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-clean-navy)] to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors">
                  <span className="font-bold text-[var(--color-clean-navy)] group-hover:text-white transition-colors">
                    {service.number}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-[var(--color-clean-navy)] group-hover:text-white transition-colors mb-4">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 pt-8 mt-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-sm font-bold text-[var(--color-clean-yellow)] uppercase tracking-wider">Learn more</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-clean-yellow)]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
