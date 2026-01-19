import Image from "next/image";
import Link from "next/link";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { ArrowUpRight } from "lucide-react";

export function SwissHero() {
  return (
    <section 
      className="relative min-h-screen bg-[var(--color-primary-navy)] text-white overflow-hidden" 
      aria-label="Swiss Brutalist Hero"
    >
      {/* Heavy Swiss Grid Background */}
      <div className="absolute inset-0 opacity-[0.15]" 
           style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Dynamic Vertical Accents */}
      <div className="absolute left-1/4 top-0 h-full w-px bg-white/5 hidden lg:block" />
      <div className="absolute left-2/4 top-0 h-full w-px bg-white/5 hidden lg:block" />
      <div className="absolute left-3/4 top-0 h-full w-px bg-white/5 hidden lg:block" />

      <BricknetHeader variant="overlay" />

      <div className="wrapper relative z-10 flex min-h-screen flex-col px-5 pt-32 lg:px-20 lg:pt-48">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          
          {/* Left Side: Massive Typography */}
          <div className="lg:col-span-8">
            <div data-aos="fade-right" className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="inline-block border border-accent-gold px-3 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                  EST. 2015
                </span>
                <div className="h-px w-20 bg-white/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  NSE LISTED
                </span>
              </div>
              
              <h1 className="font-sans text-[56px] font-black leading-[0.85] tracking-tighter uppercase lg:text-[140px] xl:text-[180px]">
                TRUST <br />
                REFINED <br />
                <span className="text-accent-gold">BY RIGOR.</span>
              </h1>
            </div>

            <div data-aos="fade-up" data-aos-delay={200} className="mt-16 max-w-xl">
              <p className="border-l-4 border-accent-gold pl-8 text-xl font-medium leading-tight tracking-tight text-white/80 lg:text-3xl">
                India&apos;s first listed trustee. Delivering institutional-grade oversight with the speed of digital execution.
              </p>
              
              <div className="mt-16 flex flex-wrap gap-px bg-white/10 p-px">
                <Link 
                  href="/contact" 
                  className="bg-accent-gold px-12 py-6 text-[14px] font-black uppercase tracking-widest text-primary-navy hover:bg-white transition-all flex items-center gap-3 group"
                >
                  Get Started
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
                <Link 
                  href="/#services" 
                  className="bg-primary-navy px-12 py-6 text-[14px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Sharp Metrics & Info */}
          <div className="lg:col-span-4 flex flex-col justify-end lg:pb-32">
            <div data-aos="fade-left" className="divide-y divide-white/10 border-y border-white/10">
              {[
                { label: "Asset Protection", value: "₹8L CR+" },
                { label: "Presence", value: "20+ CITIES" },
                { label: "Status", value: "NSE: BEACON" },
              ].map((stat, idx) => (
                <div key={stat.label} className="py-8 group transition-all">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-accent-gold transition-colors">{stat.label}</p>
                  <p className="mt-2 text-4xl font-black tracking-tighter text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex items-center gap-6">
               <div className="relative h-16 w-16 grayscale brightness-200 opacity-50">
                  <Image
                    src="https://beacontrustee.co.in/assets/images/sebi-certificate-latest.png"
                    alt="SEBI Logo"
                    fill
                    className="object-contain"
                  />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 leading-relaxed">
                 Regulated by the <br />
                 Securities and Exchange <br />
                 Board of India
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative vertical text */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <p className="rotate-90 origin-right text-[10px] font-black uppercase tracking-[1.5em] text-white/5 whitespace-nowrap">
          BEACON TRUSTEESHIP LIMITED // INSTITUTIONAL EXCELLENCE
        </p>
      </div>
      
      {/* Bottom corner visual */}
      <div className="absolute bottom-0 right-0 p-10 opacity-10">
        <div className="size-32 border-r border-b border-white" />
      </div>
    </section>
  );
}
