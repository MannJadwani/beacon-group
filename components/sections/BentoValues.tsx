import { bricknetValues } from "@/lib/constants/bricknet";
import { Shield, Zap, Layers, Users, TrendingUp, Lock } from "lucide-react";

const iconMap: Record<string, any> = {
  "Customer-Centric Solutions": Users,
  "Integrity": Shield,
  "Simplicity": Zap,
  "Resourcefulness": Layers,
  "Mission Orientation": TrendingUp,
  "Industry Expertise": Lock,
};

export function BentoValues() {
  return (
    <section className="bg-white py-24 px-5 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Main Value Proposition - 6 cols */}
          <div className="lg:col-span-6 lg:row-span-2 bg-[#F0FDFA] rounded-[40px] p-12 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary-navy)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             
             <h2 className="font-sans text-5xl lg:text-7xl font-black tracking-tighter text-[var(--color-primary-navy)] mb-8">
               Values that <br />
               <span className="text-slate-900">Build Trust.</span>
             </h2>
             <p className="text-xl font-medium text-slate-600 max-w-md leading-relaxed">
               We don't just manage assets; we steward relationships with transparency and speed.
             </p>
          </div>

          {/* Value Cards */}
          {bricknetValues.slice(0, 4).map((value, idx) => {
            const Icon = iconMap[value.title] || Shield;
            // Alternate colors for visual interest
            const isYellow = idx === 1;
            
            return (
              <div 
                key={value.title}
                className={`lg:col-span-3 rounded-[32px] p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 ${
                  isYellow ? 'bg-[var(--color-accent-gold)]' : 'bg-slate-50 border border-slate-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  isYellow ? 'bg-white text-slate-900' : 'bg-white shadow-sm text-[var(--color-primary-navy)]'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{value.title}</h3>
                  <p className={`text-sm leading-relaxed ${isYellow ? 'text-slate-800' : 'text-slate-500'}`}>
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Stats / Proof - 6 cols */}
          <div className="lg:col-span-6 rounded-[40px] bg-[var(--color-primary-navy)] p-10 flex items-center justify-between text-white overflow-hidden relative group">
            <div className="relative z-10">
               <h3 className="text-3xl font-bold mb-2">500+</h3>
               <p className="text-teal-100 font-medium">Institutional Clients</p>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div className="relative z-10">
               <h3 className="text-3xl font-bold mb-2">₹8L Cr</h3>
               <p className="text-teal-100 font-medium">Assets Under Trusteeship</p>
            </div>
            
            {/* Hover effect circle */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
          </div>

        </div>
      </div>
    </section>
  );
}
