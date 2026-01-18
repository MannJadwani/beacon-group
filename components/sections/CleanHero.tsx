import Link from "next/link";
import Image from "next/image";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { ArrowUpRight, PlayCircle, ShieldCheck, PieChart, Users } from "lucide-react";

export function CleanHero() {
  return (
    <section className="relative min-h-[90vh] bg-[#F6F9FC] overflow-hidden pt-32 pb-20">
      <BricknetHeader variant="white" />
      
      <div className="wrapper px-5 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-[var(--color-clean-blue)] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-clean-navy)] opacity-70">
                SEBI Registered Trustee
              </span>
            </div>

            <h1 className="font-sans text-6xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight text-[var(--color-clean-navy)]">
              Secure. <br />
              Compliant. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-clean-blue)] to-blue-600">
                Trusted.
              </span>
            </h1>

            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
              India&apos;s first listed trustee company. We provide institutional-grade security with the speed of modern digital infrastructure.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link 
                href="/contact"
                className="bg-[var(--color-clean-navy)] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
              >
                Get Started
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <button className="px-8 py-4 rounded-full bg-white text-[var(--color-clean-navy)] font-bold border border-slate-200 hover:border-slate-300 flex items-center gap-3 transition-all hover:bg-slate-50">
                <PlayCircle className="w-5 h-5 text-[var(--color-clean-yellow)] fill-[var(--color-clean-yellow)]" />
                <span>Watch Video</span>
              </button>
            </div>

            <div className="pt-8 flex items-center gap-8 border-t border-slate-200/60">
               <div>
                  <div className="text-3xl font-black text-[var(--color-clean-navy)]">₹8L+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Crores AUM</div>
               </div>
               <div className="w-px h-10 bg-slate-200" />
               <div>
                  <div className="text-3xl font-black text-[var(--color-clean-navy)]">500+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Clients</div>
               </div>
            </div>
          </div>

          {/* Right Visual - Abstract Tech/Finance Composition */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Main floating card */}
            <div className="absolute top-10 right-10 w-[400px] h-[500px] bg-white rounded-[32px] shadow-2xl p-8 z-20 animate-[float_6s_ease-in-out_infinite]">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[var(--color-clean-blue)]" />
                 </div>
                 <div>
                   <div className="font-bold text-[var(--color-clean-navy)]">Security Trustee</div>
                   <div className="text-xs text-slate-400">Active Monitoring</div>
                 </div>
               </div>
               
               {/* Mock Graph */}
               <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-clean-blue)]/20 to-transparent" />
                  <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M0,100 C50,80 100,120 150,60 S250,40 350,20 L350,192 L0,192 Z" fill="none" stroke="var(--color-clean-blue)" strokeWidth="3" />
                  </svg>
               </div>

               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-[var(--color-clean-yellow)]" />
                     <div className="h-2 w-24 bg-slate-100 rounded-full" />
                     <div className="h-2 w-12 bg-slate-100 rounded-full ml-auto" />
                   </div>
                 ))}
               </div>
            </div>

            {/* Secondary floating elements */}
            <div className="absolute bottom-20 left-0 w-64 h-32 bg-[var(--color-clean-navy)] rounded-2xl shadow-xl z-30 p-6 flex items-center gap-4 animate-[float_8s_ease-in-out_infinite_1s]">
               <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                 <Users className="w-6 h-6 text-white" />
               </div>
               <div>
                 <div className="text-2xl font-bold text-white">20+</div>
                 <div className="text-xs text-white/60 uppercase tracking-wider">Locations</div>
               </div>
            </div>

            {/* Decorative Background Blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
