"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { bricknetNavLinks, type NavLink as NavLinkType } from "@/lib/constants/bricknet";

type BricknetHeaderVariant = "overlay" | "white";

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
          "relative flex items-center gap-1 rounded-sm px-3 py-1.5 text-[14px] font-semibold tracking-tight transition-all " +
          (isActive
            ? "text-accent-gold"
            : (dark && !isElevated)
              ? "text-primary-navy/80 hover:text-primary-navy hover:bg-black/5"
              : "text-white/80 hover:text-white hover:bg-white/10")
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
            "absolute left-0 top-full pt-1 w-56 origin-top transition-all duration-300 ease-out " +
            (isHovered
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0")
          }
        >
          <div className={
            "border border-white/10 shadow-xl " +
            ((dark && !isElevated)
              ? "bg-white/95 backdrop-blur-xl border-black/5" 
              : "glass-dark")
          }>
            <div className="flex flex-col p-1">
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={
                    "block px-4 py-2 text-[13px] font-medium transition-colors " +
                    (pathname === child.href
                      ? "text-accent-gold bg-black/[0.03]"
                      : (dark && !isElevated)
                        ? "text-primary-navy/70 hover:text-primary-navy hover:bg-black/5"
                        : "text-white/70 hover:text-white hover:bg-white/10")
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

export function BricknetHeader({
  variant = "overlay",
}: {
  variant?: BricknetHeaderVariant;
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
          ? "bg-[var(--color-primary-navy)] border-b border-white/10 py-3 shadow-2xl"
          : variant === "white" 
            ? "bg-white/40 backdrop-blur-xl border-b border-black/5 py-4"
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
              className={
                "object-contain transition-all duration-300 " +
                (variant === "white" && !isElevated ? "brightness-0" : "brightness-0 invert")
              }
            />
          </div>
        </Link>

        <nav
          className="hidden lg:block"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center gap-1">
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
            className={
              "group relative hidden items-center justify-center overflow-hidden rounded-sm px-6 py-2.5 text-[12px] font-bold tracking-widest transition-all lg:flex " +
              ((variant === "white" && !isElevated)
                ? "bg-[var(--color-primary-navy)] text-white hover:bg-[var(--color-accent-gold)]"
                : "bg-[var(--color-accent-gold)] text-white hover:bg-white hover:text-[var(--color-primary-navy)]")
            }
          >
            <span className="relative z-10 uppercase">Start Onboarding</span>
          </Link>

          <button
            type="button"
            className={
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden " +
              ((variant === "white" && !isElevated)
                ? "bg-black/5 text-primary-navy hover:bg-black/10"
                : "bg-white/10 text-white hover:bg-white/20")
            }
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
          className="absolute inset-0 bg-secondary-navy/95 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={
            "absolute inset-y-0 right-0 w-full max-w-sm border-l border-white/10 bg-secondary-navy p-8 transition-transform duration-500 " +
            (isMenuOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          <div className="flex items-center justify-between mb-12">
            <div className="relative h-8 w-32">
              <Image
                src={logoSrc}
                alt="Beacon Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="h-10 w-10 rounded-full border border-white/10 text-white"
            >
              ×
            </button>
          </div>

          <nav className="space-y-4">
            {bricknetNavLinks.map((link) => (
              <div key={link.label} className="space-y-4">
                <Link
                  href={link.href}
                  onClick={() => !link.children && setIsMenuOpen(false)}
                  className="block text-2xl font-serif text-white hover:text-accent-gold transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 space-y-3 border-l border-white/10">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-lg text-white/60 hover:text-accent-gold transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-12 pt-12 border-t border-white/10">
            <Link
              href="/contact"
              className="block w-full rounded-full bg-accent-gold py-4 text-center font-bold text-white uppercase tracking-widest text-sm"
            >
              START ONBOARDING
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
