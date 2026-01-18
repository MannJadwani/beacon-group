import Image from "next/image";
import Link from "next/link";

export function ElectricHero() {
  return (
    <section
      id="top"
      className="relative flex flex-col justify-center min-h-screen pb-10 overflow-hidden bg-[var(--color-primary-navy)] pt-[120px]"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 -z-20 bg-[var(--color-primary-navy)]">
         {/* Abstract geometric shapes matching the reference */}
         {/* Large Circle Top Right */}
         <div className="absolute top-[-10%] right-[-10%] w-[60vh] h-[60vh] rounded-full bg-[var(--color-accent-gold)] blur-[100px] opacity-20"></div>
         
         {/* Dynamic diagonal shapes */}
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-[var(--color-primary-navy-dark)] to-transparent opacity-50 transform -skew-y-6 origin-bottom-left"></div>
      </div>
      
      <div className="wrapper relative z-10 px-5 lg:px-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          <div data-aos="fade-right" className="space-y-10">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm">
              <span className="block size-2.5 rounded-full bg-[var(--color-accent-gold)] animate-pulse" aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">First & Only Listed Trustee in India</span>
            </div>

            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white"
            >
              PAVING A <br/>
              <span className="text-[var(--color-accent-gold)] relative inline-block">
                SMOOTH
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-white" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span> <br/>
              ROAD FOR <br/>
              DEBT RAISING
            </h1>
            
            <p className="max-w-xl text-xl leading-relaxed text-white/80 font-light border-l-4 border-[var(--color-accent-gold)] pl-6">
              Beacon Trusteeship Limited delivers institutional-grade trustee, security, 
              and escrow solutions that safeguard stakeholders and keep transactions moving.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="/contact" className="group relative px-8 py-4 bg-[var(--color-accent-gold)] overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-white transform translate-x-full transition-transform duration-300 group-hover:translate-x-0 ease-out"></span>
                <span className="relative flex items-center justify-center gap-2 text-[var(--color-primary-navy)] font-black text-sm tracking-widest uppercase group-hover:text-[var(--color-primary-navy)]">
                   Get Started <span className="text-xl">→</span>
                </span>
              </Link>
              <Link href="/#services" className="group px-8 py-4 border-2 border-white text-white font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-[var(--color-primary-navy)] transition-colors duration-300 flex items-center justify-center">
                Our Services
              </Link>
            </div>
          </div>
          
           {/* Visual element representing the aesthetic from the reference image - geometric/abstract */}
          <div data-aos="fade-left" className="relative h-[600px] w-full hidden lg:block">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[var(--color-primary-navy)] border-2 border-[var(--color-accent-gold)] p-4 transform rotate-3 transition-transform hover:rotate-0 duration-700">
               <div className="w-full h-full relative overflow-hidden bg-[var(--color-primary-navy-dark)] grayscale hover:grayscale-0 transition-all duration-700">
                  <Image
                    src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg" 
                    alt="Beacon Trusteeship Abstract"
                    fill
                    className="object-cover opacity-80 mix-blend-luminosity"
                  />
                  {/* Overlay text or graphics */}
                  <div className="absolute bottom-8 left-8 bg-[var(--color-accent-gold)] text-[var(--color-primary-navy)] p-4 font-black text-4xl">
                     TRUST.
                  </div>
               </div>
               
               {/* Decorative floating shapes */}
               <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border-[16px] border-[var(--color-accent-gold)] opacity-30 z-[-1]"></div>
               <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[var(--color-primary-navy)] border border-white/20 z-20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
