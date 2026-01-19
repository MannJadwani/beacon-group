"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { bricknetNavLinks, type NavLink as NavLinkType } from "@/lib/constants/bricknet";

type VariantBlueHeaderVariant = "overlay" | "white";

function NavItem({ 
  link, 
  pathname, 
  dark = false,
  isElevated = false
}: { 
  link: NavLinkType; 
  pathname: string;
  dark?: boolean;
  isElevated?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = pathname === link.href || link.children?.some(child => pathname === child.href);

  return (
    <li 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={link.href}
        aria-current={isActive ? "page" : undefined}
        className={
          "relative flex items-center gap-1 rounded-xl px-4 py-2 text-[14px] font-semibold tracking-tight transition-all " +
          (isActive
            ? "text-[#183EFA] bg-[#183EFA]/5"
            : "text-[#183EFA]/70 hover:text-[#183EFA] hover:bg-[#183EFA]/5")
        }
      >
        {link.label}
        {link.children && (
          <span className={`text-[8px] transition-transform duration-300 ${isHovered ? "rotate-180" : ""}`}>
            ▼
          </span>
        )}
      </Link>

      {link.children && (
        <div
          className={
            "absolute left-0 top-full pt-2 w-56 origin-top transition-all duration-300 ease-out " +
            (isHovered
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0")
          }
        >
          <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-[#183EFA]/5 shadow-xl shadow-[#183EFA]/10 overflow-hidden">
            <div className="flex flex-col p-2">
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={
                    "block px-4 py-3 rounded-xl text-[13px] font-medium transition-colors " +
                    (pathname === child.href
                      ? "text-[#183EFA] bg-[#183EFA]/5"
                      : "text-[#183EFA]/60 hover:text-[#183EFA] hover:bg-[#183EFA]/5")
                  }
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export function VariantBlueHeader({
  variant = "overlay",
}: {
  variant?: VariantBlueHeaderVariant;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isElevated, setIsElevated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsElevated(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const logoSrc = "https://beacontrustee.co.in/assets/images/logo_1.png";

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (isElevated
          ? "bg-white/80 backdrop-blur-xl border-b border-[#183EFA]/5 py-3 shadow-lg shadow-[#183EFA]/5"
          : "bg-transparent py-5")
      }
      aria-label="Site header"
    >
      <div className="wrapper flex items-center justify-between gap-4 px-5 lg:px-20">
        <Link
          href="/"
          aria-label="Beacon Trusteeship - Return to homepage"
          className="group relative flex items-center gap-3 transition-transform hover:scale-[1.02] shrink-0"
        >
          <div className="relative h-8 w-32 overflow-hidden">
            <Image
              src={logoSrc}
              alt="Beacon Trusteeship Logo"
              fill
              priority
              className="object-contain brightness-0 transition-all duration-300"
              style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(89%) saturate(5765%) hue-rotate(232deg) brightness(98%) contrast(97%)" }}
            />
          </div>
        </Link>

        <nav
          className="hidden lg:block"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center gap-1 rounded-2xl bg-white/60 backdrop-blur-sm p-1.5 shadow-lg shadow-[#183EFA]/5">
            {bricknetNavLinks.map((link) => (
              <NavItem 
                key={link.label} 
                link={link} 
                pathname={pathname} 
                dark={variant === "white"}
                isElevated={isElevated}
              />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/contact"
            className="group relative hidden items-center justify-center overflow-hidden rounded-xl px-6 py-2.5 text-[12px] font-bold tracking-widest transition-all lg:flex bg-[#183EFA] text-white shadow-lg shadow-[#183EFA]/25 hover:shadow-xl hover:shadow-[#183EFA]/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10 uppercase">Investor Login</span>
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg shadow-[#183EFA]/10 text-[#183EFA] transition-all hover:shadow-xl lg:hidden"
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" className="text-2xl">
              {isMenuOpen ? "×" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={
          "fixed inset-0 z-[100] transition-all duration-500 lg:hidden " +
          (isMenuOpen ? "visible opacity-100" : "invisible opacity-0")
        }
      >
        <div
          className="absolute inset-0 bg-[#183EFA]/10 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={
            "absolute inset-y-0 right-0 w-full max-w-sm bg-white/95 backdrop-blur-xl p-8 shadow-2xl transition-transform duration-500 " +
            (isMenuOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          <div className="flex items-center justify-between mb-12">
            <div className="relative h-8 w-32">
              <Image
                src={logoSrc}
                alt="Beacon Logo"
                fill
                className="object-contain"
                style={{ filter: "brightness(0) saturate(100%) invert(15%) sepia(89%) saturate(5765%) hue-rotate(232deg) brightness(98%) contrast(97%)" }}
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="h-11 w-11 rounded-xl bg-[#183EFA]/5 text-[#183EFA] shadow-lg"
            >
              ×
            </button>
          </div>

          <nav className="space-y-3">
            {bricknetNavLinks.map((link) => (
              <div key={link.label} className="space-y-3">
                <Link
                  href={link.href}
                  onClick={() => !link.children && setIsMenuOpen(false)}
                  className="block text-2xl font-medium text-[#183EFA] hover:text-[#183EFA]/70 transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 space-y-2 border-l-2 border-[#EDE44C]/30">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-lg text-[#183EFA]/60 hover:text-[#183EFA] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-12 pt-12 border-t border-[#183EFA]/10">
            <Link
              href="/contact"
              className="block w-full rounded-2xl bg-[#183EFA] py-4 text-center font-bold text-white uppercase tracking-widest text-sm shadow-xl shadow-[#183EFA]/25"
            >
              INVESTOR LOGIN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
