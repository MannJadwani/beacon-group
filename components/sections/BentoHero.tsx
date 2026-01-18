import Link from "next/link";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { bricknetPartnerLogos } from "@/lib/constants/bricknet";

export function BentoHero() {
  return (
    <section className="relative min-h-screen bg-[#F0FDFA] pt-32 pb-12 px-5 lg:px-10 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(#00AFB9 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />
      
      <BricknetHeader variant="white" />
      
      <div className="mx-auto max-w-[1600px] relative z-10">
        <div className="grid grid-cols-12 gap-6 grid-rows-[auto_auto_auto] lg:grid-rows-[400px_300px_auto]">
          
          {/* 1. Main Headline - 7 Cols */}
          <div className="col-span-12 lg:col-span-7 row-span-1 bg-white rounded-[40px] p-12 flex flex-col justify-between shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-100 transition-colors duration-700" />
             
             <div className="relative">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-[var(--color-primary-navy)] text-sm font-bold tracking-wide mb-8">
                 <span className="w-2 h-2 rounded-full bg-[var(--color-primary-navy)] animate-pulse" />
                 SEBI REGISTERED TRUSTEE
               </div>
               
               <h1 className="font-sans text-6xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tight text-slate-900">
                 Trust. <br />
                 <span className="text-[var(--color-primary-navy)]">Simplified.</span>
               </h1>
             </div>

             <div className="relative mt-8 max-w-lg">
               <p className="text-xl text-slate-500 font-medium leading-relaxed">
                 India's first listed trustee company. We blend institutional rigor with modern digital infrastructure.
               </p>
             </div>
          </div>

          {/* 2. Primary CTA Card - 5 Cols */}
          <div className="col-span-12 lg:col-span-5 row-span-1 bg-[var(--color-primary-navy)] rounded-[40px] p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex justify-between items-start">
               <ArrowUpRight className="w-16 h-16 text-white/20 group-hover:text-white/40 group-hover:rotate-45 transition-all duration-500" />
               <span className="text-white/60 font-mono text-sm">EST. 2015</span>
            </div>

            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
                Start your <br/> Mandate
              </h2>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-between w-full bg-white p-2 pl-8 rounded-full group/btn hover:bg-[var(--color-accent-gold)] transition-colors duration-300"
              >
                <span className="text-[var(--color-primary-navy)] font-bold uppercase tracking-wider text-sm group-hover/btn:text-slate-900">Get in touch</span>
                <div className="w-12 h-12 bg-[var(--color-primary-navy)] rounded-full flex items-center justify-center group-hover/btn:bg-white transition-colors">
                  <ArrowRight className="w-5 h-5 text-white group-hover/btn:text-slate-900" />
                </div>
              </Link>
            </div>
          </div>

          {/* 3. Stats Strip - 12 Cols */}
          <div className="col-span-12 lg:col-span-8 row-span-1 grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Stat 1 */}
             <div className="bg-[#0F172A] rounded-[32px] p-8 flex flex-col justify-center text-white group hover:scale-[1.02] transition-transform duration-300">
               <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Assets Managed</p>
               <div className="text-5xl font-black text-[var(--color-accent-gold)]">₹8L+</div>
               <p className="text-sm text-slate-400 mt-1">Crores</p>
             </div>
             
             {/* Stat 2 */}
             <div className="bg-white rounded-[32px] p-8 flex flex-col justify-center border border-slate-100 hover:border-[var(--color-primary-navy)] transition-colors duration-300">
               <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Experience</p>
               <div className="text-5xl font-black text-slate-900">20+</div>
               <p className="text-sm text-slate-400 mt-1">Years Average</p>
             </div>

             {/* Stat 3 */}
             <div className="bg-[var(--color-accent-gold)] rounded-[32px] p-8 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full" />
               <p className="text-slate-900/60 text-sm font-bold uppercase tracking-wider mb-2">Reach</p>
               <div className="text-5xl font-black text-slate-900">20+</div>
               <p className="text-sm text-slate-900/60 mt-1">Locations</p>
             </div>
          </div>

          {/* 4. Client Ticker / Visual - 4 Cols */}
          <div className="col-span-12 lg:col-span-4 row-span-1 bg-white rounded-[40px] p-10 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary-navy)] to-[var(--color-accent-gold)]" />
             <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Trusted By</p>
             
             <div className="grid grid-cols-2 gap-6 opacity-60">
                {bricknetPartnerLogos.slice(0, 4).map((logo, i) => (
                  <div key={i} className="relative h-8 w-full grayscale hover:grayscale-0 transition-all">
                    <Image src={logo.src} alt={logo.alt} fill className="object-contain object-left" />
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
