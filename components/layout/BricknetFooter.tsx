import Image from "next/image";
import Link from "next/link";

import { bricknetFooterColumns } from "@/lib/constants/bricknet";

export function BricknetFooter() {
  return (
    <footer id="contact" className="bg-primary-navy py-24 text-white lg:py-32" aria-label="Site footer">
      <div className="wrapper px-5 lg:px-20">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-12">
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="https://beacontrustee.co.in/assets/images/logo_1.png"
                  alt="Beacon Trusteeship Logo"
                  width={240}
                  height={50}
                  priority={false}
                  className="brightness-0 invert"
                />
              </Link>
              <div className="space-y-6">
                <h2 className="text-2xl font-medium tracking-tight">Stay in the loop</h2>
                <p className="text-lg text-white/50">
                  Sign up for trustee insights, regulatory updates, and Beacon news.
                </p>
                <form className="relative max-w-md">
                   <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full border-b border-white/20 bg-transparent py-4 text-white placeholder:text-white/20 focus:border-accent-gold focus:outline-none"
                    />
                    <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 font-black tracking-widest text-accent-gold hover:text-white">
                      JOIN
                    </button>
                </form>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 lg:col-span-7 lg:grid-cols-3">
            {bricknetFooterColumns.map((col) => (
              <div key={col.title} className="space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                  {col.title}
                </h3>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                       <Link
                          href={link.href}
                          className="text-sm font-bold tracking-tight text-white/70 hover:text-accent-gold transition-colors"
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

        <div className="mt-24 border-t border-white/10 pt-12">
          <div className="flex flex-col justify-between gap-6 text-[10px] font-black tracking-widest text-white/20 lg:flex-row">
            <p>© 2026 BEACON TRUSTEESHIP LIMITED. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-accent-gold transition-colors">PRIVACY POLICY</Link>
              <Link href="/terms" className="hover:text-accent-gold transition-colors">TERMS OF SERVICE</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
