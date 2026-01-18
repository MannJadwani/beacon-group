import { bricknetValues } from "@/lib/constants/bricknet";
import { Shield, Zap, Layers, Users } from "lucide-react";

const iconMap: Record<string, any> = {
  "Customer-Centric Solutions": Users,
  "Integrity": Shield,
  "Simplicity": Zap,
  "Resourcefulness": Layers,
};

export function CleanValues() {
  return (
    <section className="bg-[#F6F9FC] py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="wrapper px-5 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-clean-navy)] tracking-tight mb-8">
              The Beacon <br />
              Standard.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12">
              We operate at the intersection of traditional fiduciary responsibility and modern financial technology. Our values define how we protect your interests.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {bricknetValues.slice(0, 4).map((value) => {
                const Icon = iconMap[value.title] || Shield;
                return (
                  <div key={value.title} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--color-clean-blue)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-clean-navy)] mb-2">{value.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative lg:h-[600px] bg-[var(--color-clean-navy)] rounded-[32px] overflow-hidden p-12 flex flex-col justify-between group">
             {/* Abstract Circles */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-clean-blue)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-clean-yellow)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
             
             <div className="relative z-10">
               <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
               <p className="text-white/60 font-medium">Institutional Clients Trust Us</p>
             </div>

             <div className="relative z-10 space-y-4">
               {/* Mock Testimonial Cards */}
               <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/5 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                 <p className="text-white/90 font-medium text-lg">"Outstanding work in the REC bond issuance. Commitment to efficiency was instrumental."</p>
                 <div className="mt-4 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[var(--color-clean-yellow)]" />
                   <div>
                     <p className="text-sm font-bold text-white">Sumit Mehra</p>
                     <p className="text-xs text-white/50">REC Limited</p>
                   </div>
                 </div>
               </div>

               <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/5 transform translate-x-8 group-hover:translate-x-0 transition-transform duration-500 delay-75">
                 <p className="text-white/90 font-medium text-lg">"Beacon ensured our NTPC issuances ran smoothly. Seamless compliance."</p>
                 <div className="mt-4 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[var(--color-clean-blue)]" />
                   <div>
                     <p className="text-sm font-bold text-white">Anita Srivastava</p>
                     <p className="text-xs text-white/50">NTPC Limited</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
