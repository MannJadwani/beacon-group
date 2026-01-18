"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bricknetNavLinks, type NavLink as NavLinkType } from "@/lib/constants/bricknet";

function NavItem({ 
  link, 
  pathname 
}: { 
  link: NavLinkType; 
  pathname: string;
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
          "relative flex items-center gap-1 px-4 py-2 text-[14px] font-bold tracking-widest uppercase transition-all " +
          (isActive
            ? "text-[var(--color-primary-navy)] bg-[var(--color-accent-gold)]"
            : "text-[var(--color-primary-navy)] hover:text-[var(--color-primary-navy)] hover:bg-[var(--color-accent-gold)]")
        }
      >
        {link.label}
      </Link>

      {link.children && (
        <div
          className={
            "absolute left-0 top-full w-56 origin-top transition-all duration-300 ease-out z-50 " +
            (isHovered
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0")
          }
        >
          <div className="bg-white border-2 border-[var(--color-primary-navy)] shadow-[4px_4px_0px_0px_rgba(24,62,250,1)]">
            <div className="flex flex-col">
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={
                    "block px-4 py-3 text-[12px] font-bold uppercase tracking-wider transition-colors border-b border-[var(--color-primary-navy)]/10 last:border-b-0 " +
                    (pathname === child.href
                      ? "bg-[var(--color-accent-gold)] text-[var(--color-primary-navy)]"
                      : "text-[var(--color-primary-navy)] hover:bg-[var(--color-accent-gold)]")
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

export function ElectricHeader() {
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
          ? "bg-white border-b-2 border-[var(--color-primary-navy)] py-2"
          : "bg-transparent py-5")
      }
      aria-label="Site header"
    >
      <div className="wrapper flex items-center justify-between gap-4 px-5 lg:px-20">
        <Link
          href="/"
          aria-label="Beacon Trusteeship - Return to homepage"
          className="group relative flex items-center gap-3 shrink-0"
        >
          <div className="relative h-10 w-40 overflow-hidden bg-[var(--color-primary-navy)] p-2">
            <Image
              src={logoSrc}
              alt="Beacon Trusteeship Logo"
              fill
              priority
              className="object-contain brightness-0 invert p-1"
            />
          </div>
        </Link>

        <nav
          className="hidden lg:block"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center gap-2">
            {bricknetNavLinks.map((link) => (
              <NavItem 
                key={link.label} 
                link={link} 
                pathname={pathname} 
              />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/contact"
            className="hidden lg:flex items-center justify-center px-6 py-2.5 text-[12px] font-bold tracking-widest uppercase bg-[var(--color-primary-navy)] text-white hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-primary-navy)] transition-colors border-2 border-transparent hover:border-[var(--color-primary-navy)]"
          >
            Investor Login
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center bg-[var(--color-primary-navy)] text-white lg:hidden"
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span aria-hidden="true" className="text-2xl font-bold">
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
          className="absolute inset-0 bg-[var(--color-primary-navy)]/90 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={
            "absolute inset-y-0 right-0 w-full max-w-sm border-l-4 border-[var(--color-accent-gold)] bg-white p-8 transition-transform duration-500 " +
            (isMenuOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          <div className="flex items-center justify-between mb-12">
             <div className="relative h-8 w-32 bg-[var(--color-primary-navy)] p-1">
              <Image
                src={logoSrc}
                alt="Beacon Logo"
                fill
                className="object-contain brightness-0 invert p-1"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="h-10 w-10 bg-[var(--color-primary-navy)] text-white font-bold text-xl"
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
                  className="block text-2xl font-bold uppercase tracking-tighter text-[var(--color-primary-navy)] hover:text-[var(--color-accent-gold)] transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 space-y-3 border-l-4 border-[var(--color-accent-gold)]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-sm font-bold uppercase tracking-wider text-[var(--color-primary-navy)]/70 hover:text-[var(--color-primary-navy)] hover:bg-[var(--color-accent-gold)]/20 p-2 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-12 pt-12 border-t-2 border-[var(--color-primary-navy)]/10">
            <Link
              href="/contact"
              className="block w-full bg-[var(--color-primary-navy)] py-4 text-center font-bold text-white uppercase tracking-widest text-sm hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-primary-navy)] transition-colors"
            >
              INVESTOR LOGIN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
