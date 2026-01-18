import { bricknetServices } from "@/lib/constants/bricknet";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function BentoServices() {
  return (
    <section className="bg-slate-50 py-24 px-5 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="font-sans text-4xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-4">
              Our Expertise.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl">
              Comprehensive fiduciary services tailored for the modern financial ecosystem.
            </p>
          </div>
          <Link href="/services" className="text-[var(--color-primary-navy)] font-bold uppercase tracking-wider hover:underline underline-offset-4">
            View All Services
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[380px]">
          
          {bricknetServices.map((service, idx) => (
            <div 
              key={service.title}
              className={`group relative rounded-[32px] p-10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                idx === 0 
                  ? 'bg-[var(--color-primary-navy)] text-white md:col-span-2 lg:col-span-1 shadow-lg shadow-teal-500/20' 
                  : 'bg-white text-slate-900 border border-slate-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-6xl font-black opacity-20 ${idx === 0 ? 'text-white' : 'text-slate-200'}`}>
                  {service.number}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  idx === 0 ? 'bg-white/10 group-hover:bg-white text-white group-hover:text-[var(--color-primary-navy)]' : 'bg-slate-50 group-hover:bg-[var(--color-primary-navy)] text-slate-400 group-hover:text-white'
                }`}>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="font-sans text-3xl font-bold leading-tight mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className={`font-medium leading-relaxed ${idx === 0 ? 'text-teal-50' : 'text-slate-500'}`}>
                  {service.description}
                </p>
              </div>

              {/* Decorative element for white cards */}
              {idx !== 0 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-primary-navy)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
