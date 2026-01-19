import Image from "next/image";
import Link from "next/link";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { ArrowRight, ShieldCheck, TrendingUp, Landmark } from "lucide-react";

export function SleekSwissHero() {
  return (
    <section 
      className="relative min-h-screen bg-[#0B1230] text-white overflow-hidden" 
      aria-label="Corporate Swiss Hero"
    >
      {/* Background Grid - Extremely Subtle for structure */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} 
      />
      
      {/* Structural Accent Lines */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/5 hidden lg:block" />

      <BricknetHeader variant="overlay" />

      <div className="wrapper relative z-10 flex min-h-screen flex-col justify-center px-5 pt-32 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Main Messaging: Swiss Typography Principles */}
          <div className="lg:col-span-7">
            <div data-aos="fade-right" className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="inline-block border border-[#D6B26E] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.4em] text-[#D6B26E]">
                  Institutional Grade
                </span>
                <div className="h-px w-12 bg-white/20" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
                  NSE Listed: BEACON
                </span>
              </div>
              
              <h1 className="font-sans text-[48px] font-bold leading-[1.05] tracking-tight uppercase lg:text-[88px]">
                The standard of <br />
                <span className="text-[#D6B26E]">Trust & Fiduciary</span> <br />
                excellence.
              </h1>
              
              <p className="max-w-xl text-lg leading-relaxed text-white/60 lg:text-2xl lg:leading-snug">
                Beacon Trusteeship Limited delivers institutional-grade trustee, 
                escrow, and securitization solutions for India&apos;s most complex financial mandates.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <Link 
                  href="/contact" 
                  className="bg-[#D6B26E] px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] text-[#0B1230] transition-all hover:bg-white"
                >
                  Get Started
                </Link>
                <Link 
                  href="/#services" 
                  className="group flex items-center gap-4 border border-white/20 px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/5"
                >
                  Our Services
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Modular Information Column: Sharp Corporate Grid */}
          <div className="lg:col-span-5">
            <div data-aos="fade-left" className="grid grid-cols-1 gap-px bg-white/10 border border-white/10">
              {[
                { 
                  icon: <ShieldCheck className="size-6 text-[#D6B26E]" />, 
                  title: "Security Trustee", 
                  desc: "Holding and administering security for lenders with disciplined documentation." 
                },
                { 
                  icon: <TrendingUp className="size-6 text-[#D6B26E]" />, 
                  title: "AIF Trustee", 
                  desc: "Acting as pillars for fund managers with trusted governance and administration." 
                },
                { 
                  icon: <Landmark className="size-6 text-[#D6B26E]" />, 
                  title: "Debenture Trustee", 
                  desc: "India's first listed trustee company, protecting bondholder interests." 
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#0B1230] p-10 space-y-4 hover:bg-white/[0.03] transition-colors">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div data-aos="fade-up" className="mt-8 flex items-center gap-6 opacity-40">
               <div className="relative h-12 w-12 grayscale brightness-200">
                  <Image
                    src="https://beacontrustee.co.in/assets/images/sebi-certificate-latest.png"
                    alt="SEBI Logo"
                    fill
                    className="object-contain"
                  />
               </div>
               <p className="text-[9px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                 SEBI Registered <br />
                 Institutional Fiduciary
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute right-10 bottom-24 hidden xl:block">
        <p className="rotate-90 origin-right text-[10px] font-bold uppercase tracking-[1em] text-white/10">
          ESTABLISHED 2015 // MUMBAI
        </p>
      </div>
    </section>
  );
}
