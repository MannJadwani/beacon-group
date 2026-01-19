import Image from "next/image";
import Link from "next/link";

import { bricknetFooterColumns } from "@/lib/constants/bricknet";

export function VariantBlueFooter() {
  return (
    <footer id="contact" className="relative py-24 text-white lg:py-32 overflow-hidden" aria-label="Site footer">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#183EFA] via-[#2952ff] to-[#183EFA]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#EDE44C]/10 blur-3xl" />
      
      <div className="wrapper relative z-10 px-5 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="space-y-10">
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="https://beacontrustee.co.in/assets/images/logo_1.png"
                  alt="Beacon Trusteeship Logo"
                  width={200}
                  height={42}
                  priority={false}
                  className="brightness-0 invert"
                />
              </Link>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight">Stay in the loop</h2>
                <p className="text-base text-white/50">
                  Sign up for trustee insights, regulatory updates, and Beacon news.
                </p>
                <form className="relative max-w-md">
                   <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm px-6 py-4 text-white placeholder:text-white/30 focus:border-[#EDE44C]/50 focus:outline-none transition-colors"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[#EDE44C] px-6 py-2.5 font-bold tracking-widest text-[#183EFA] text-sm hover:bg-white transition-colors shadow-lg">
                      JOIN
                    </button>
                </form>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:grid-cols-3">
            {bricknetFooterColumns.map((col) => (
              <div key={col.title} className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                       <Link
                          href={link.href}
                          className="text-sm font-medium tracking-tight text-white/60 hover:text-[#EDE44C] transition-colors"
                          {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {link.label}
                        </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
          <div className="flex flex-col justify-between gap-6 text-[10px] font-bold tracking-widest text-white/30 lg:flex-row lg:items-center">
            <p>© 2026 BEACON TRUSTEESHIP LIMITED. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-[#EDE44C] transition-colors">PRIVACY POLICY</Link>
              <Link href="/terms" className="hover:text-[#EDE44C] transition-colors">TERMS OF SERVICE</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
