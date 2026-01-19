import React from 'react';
import { ArrowRight, ChevronDown, Activity, Globe, Shield } from 'lucide-react';
import { BricknetHeader } from "@/components/layout/BricknetHeader";

export function NeoSwissHero() {
  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-[#FFFFFF] font-sans overflow-hidden border-[12px] border-[#FFFFFF]">
      {/* 1px Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-4 lg:grid-cols-12 pointer-events-none opacity-10">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-[#FFFFFF] h-full" />
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-6 pointer-events-none opacity-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border-b border-[#FFFFFF] w-full" />
        ))}
      </div>

      <BricknetHeader variant="overlay" />

      {/* Main Content Area */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-20">
        
        {/* Left Column: Typography */}
        <div className="lg:col-span-8 border-r border-[#FFFFFF] flex flex-col justify-center p-8 lg:p-16">
          <div data-aos="fade" className="flex items-center gap-3 mb-8">
            <Activity size={16} className="text-[#FF3E00]" />
            <span className="text-[#FF3E00] text-xs font-black tracking-[0.4em] uppercase">System Operational // NSE: BEACON</span>
          </div>
          <h1 data-aos="fade-right" className="text-5xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black leading-[0.85] tracking-tighter uppercase mb-10">
            Precision <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #FFFFFF' }}>Fiduciary</span> <br /> 
            Architecture
          </h1>
          <p data-aos="fade-up" data-aos-delay={200} className="max-w-xl text-lg md:text-xl font-medium leading-tight tracking-tight text-white/70 mb-12 border-l-4 border-[#FF3E00] pl-6">
            India's first listed trustee. Blending institutional-grade stability with 
            mathematical precision across the global capital markets landscape.
          </p>
          <div data-aos="fade-up" data-aos-delay={400} className="flex flex-col sm:flex-row gap-px bg-[#FFFFFF] max-w-2xl">
            <button className="group flex-1 bg-[#FF3E00] text-[#FFFFFF] p-8 text-sm font-black uppercase tracking-widest flex justify-between items-center hover:bg-[#CC3200] transition-all">
              Start Partnership
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="flex-1 bg-[#000000] text-[#FFFFFF] p-8 text-sm font-black uppercase tracking-widest flex justify-between items-center hover:bg-[#111111] transition-all">
              Core Services
              <ChevronDown />
            </button>
          </div>
        </div>

        {/* Right Column: Technical Visuals */}
        <div className="lg:col-span-4 flex flex-col">
          <div data-aos="fade-left" className="flex-1 p-8 border-b border-[#FFFFFF] flex flex-col justify-between group hover:bg-[#FFFFFF] hover:text-[#000000] transition-colors">
            <Globe size={48} strokeWidth={1} className="text-[#FF3E00]" />
            <div>
              <span className="block text-4xl font-black mb-2 tracking-tighter">₹8L CR+</span>
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">Asset Protection</span>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-delay={200} className="flex-1 p-8 border-b border-[#FFFFFF] bg-[#FFFFFF] text-[#000000] flex flex-col justify-between group hover:bg-[#FF3E00] hover:text-[#FFFFFF] transition-colors">
            <Shield size={48} strokeWidth={1} />
            <div>
              <span className="block text-4xl font-black mb-2 tracking-tighter">LISTED</span>
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">NSE: BEACON</span>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-delay={400} className="flex-1 p-8 flex items-center justify-center relative group cursor-crosshair overflow-hidden">
            <div className="absolute inset-4 border border-[#FFFFFF] opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase rotate-90 origin-center whitespace-nowrap opacity-30 group-hover:opacity-100 transition-opacity">
              SCROLL TO AUDIT
            </span>
          </div>
        </div>
      </main>

      {/* Footer Accent */}
      <div className="absolute bottom-6 left-12 z-20 hidden md:block">
        <div className="flex gap-8 items-center opacity-30 text-[10px] font-mono tracking-widest">
          <span>LAT: 18.9226° N</span>
          <span>LNG: 72.8333° E</span>
          <span>SYSTEM: STABLE</span>
        </div>
      </div>
    </div>
  );
}
