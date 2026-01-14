"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { bricknetNavLinks } from "@/lib/constants/bricknet";

type BricknetHeaderVariant = "overlay" | "white";

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

  const isSolid = variant === "white" || isElevated;
  const showShadow = variant === "overlay" ? isSolid : isElevated;

  const logoSrc = isSolid
    ? "/bricknet/images/logo-color.svg"
    : "/bricknet/images/logo-white.svg";

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors " +
        (isSolid
          ? "bg-base-white/95 text-secondary-navy"
          : "bg-transparent text-base-white") +
        (showShadow ? " shadow" : "")
      }
      aria-label="Site header"
    >
      <div className="wrapper relative flex items-center justify-between gap-6 px-5 py-5 lg:px-20">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className={
              (variant === "overlay" ? "inline-flex" : "inline-flex lg:hidden") +
              " items-center justify-center text-3xl leading-none transition-opacity hover:opacity-75 " +
              (isSolid ? "text-secondary-navy" : "text-base-white")
            }
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span aria-hidden="true">{isMenuOpen ? "×" : "≡"}</span>
          </button>

          <Link href="/" aria-label="Bricknet - Return to homepage" className="shrink-0">
            {variant === "overlay" ? (
              <span className="text-3xl font-semibold tracking-tight">Bricknet</span>
            ) : (
              <Image
                src={logoSrc}
                alt="Bricknet Logo"
                width={164}
                height={32}
                priority
              />
            )}
          </Link>
        </div>

        {variant === "overlay" ? (
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
            aria-label="Primary navigation"
          >
            <div
              className={
                "rounded-full border px-8 py-2 backdrop-blur-md " +
                (isSolid
                  ? "border-secondary-navy/15 bg-secondary-navy/5"
                  : "border-base-white/35 bg-base-white/15")
              }
            >
              <ul className="flex items-center gap-2">
                {bricknetNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const baseClasses =
                    "rounded-full px-6 py-2 text-base font-medium transition-colors";
                  const idleColor = isSolid
                    ? " text-secondary-navy/80 hover:text-secondary-navy"
                    : " text-base-white/80 hover:text-base-white";
                  const activeColor = isSolid
                    ? " bg-secondary-navy/10 text-secondary-navy"
                    : " bg-base-white/20 text-base-white";

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={baseClasses + idleColor + (isActive ? activeColor : "")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        ) : (
          <nav className="hidden lg:block" aria-label="Primary navigation">
            <ul className="flex items-center gap-10">
              {bricknetNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={
                        "border-b-2 pb-1 text-base font-medium transition-opacity hover:opacity-75 " +
                        (isActive
                          ? "border-primary-orange text-secondary-navy"
                          : "border-transparent text-secondary-navy")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {variant === "overlay" && !isSolid ? (
          <div className="hidden lg:flex flex-col items-end">
            <Link
              href="/contact"
              className="text-lg font-semibold text-base-white transition-opacity hover:opacity-75"
              aria-label="Contact us for a quote"
            >
              Let&apos;s Talk!
            </Link>
            <div className="mt-4 h-px w-56 bg-base-white/60" aria-hidden="true" />
          </div>
        ) : (
          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/contact" className="btn btn-cta" aria-label="Contact us for a quote">
              Let&apos;s Talk!
            </Link>
          </div>
        )}
      </div>

      {isMenuOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-base-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setIsMenuOpen(false)} aria-label="Home">
                <Image
                  src="/bricknet/images/logo-color.svg"
                  alt="Bricknet Logo"
                  width={164}
                  height={32}
                />
              </Link>
              <button
                type="button"
                className="rounded-md border border-secondary-navy/20 px-3 py-2 text-secondary-navy"
                aria-label="Close mobile menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  ×
                </span>
              </button>
            </div>

            <nav className="mt-10" aria-label="Primary navigation">
              <ul className="flex flex-col gap-6">
                {bricknetNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={
                          "text-lg font-medium " +
                          (isActive
                            ? "text-primary-orange"
                            : "text-secondary-navy")
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-10">
              <Link
                href="/contact"
                className="btn btn-solid-orange w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Let&apos;s Talk!
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
