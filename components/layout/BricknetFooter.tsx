import Image from "next/image";
import Link from "next/link";

import { bricknetFooterColumns } from "@/lib/constants/bricknet";

export function BricknetFooter() {
  return (
    <footer id="contact" className="bg-secondary-navy" aria-label="Site footer">
      <div className="wrapper flex flex-col gap-8 px-5 pb-8 pt-[120px] lg:px-20 lg:pb-12 lg:pt-28">
        <div className="flex flex-col items-start justify-between gap-20 lg:flex-row">
          <div className="w-full lg:max-w-96">
            <div className="flex flex-col items-center gap-14 lg:items-start">
              <Link href="/" className="transition-opacity hover:opacity-75">
                <Image
                  src="/bricknet/images/logo-multi-color.svg"
                  alt="Bricknet Logo"
                  width={208}
                  height={40}
                  priority={false}
                />
              </Link>

              <div data-aos="fade-up" className="w-full">
                <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
                  <h2 className="text-2xl font-medium leading-tight text-base-white lg:text-xl">
                    Subscribe for Updates
                  </h2>
                  <p className="text-base leading-tight text-base-white-background/80">
                    Get updates, tips, and industry news delivered to your inbox
                  </p>
                </div>

                <form
                  className="mt-8 w-full"
                  aria-label="Newsletter subscription"
                  action="#"
                  method="post"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="w-full bg-base-white px-5 pb-[19px] pt-[17px] pr-[120px] text-base font-normal leading-tight text-secondary-navy placeholder:text-base-grey"
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <button type="submit" className="btn btn-solid-orange px-4 py-2.5">
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <div className="sr-only">Enter your email to receive updates and news</div>
                </form>
              </div>
            </div>
          </div>

          <nav
            className="flex w-full flex-col items-center justify-start gap-20 lg:w-auto lg:flex-row lg:items-start lg:gap-28"
            aria-label="Footer navigation"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            {bricknetFooterColumns.map((col) => (
              <div
                key={col.title}
                className="flex flex-col items-center gap-8 lg:items-start"
              >
                <h3 className="text-2xl font-medium leading-tight text-base-white lg:text-xl">
                  {col.title}
                </h3>
                <ul className="flex flex-col items-center gap-4 lg:items-start">
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    return (
                      <li
                        key={link.href + link.label}
                        className={
                          isExternal
                            ? "text-base font-normal leading-tight text-base-grey-stroke"
                            : "text-base font-normal leading-tight text-base-grey-stroke"
                        }
                      >
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-75"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="transition-opacity hover:opacity-75"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="h-px w-full bg-base-white/20" aria-hidden="true" />

        <div className="flex w-full flex-col items-center justify-between gap-4 text-center text-base-white-background/80 lg:flex-row lg:text-left">
          <p>© 2025 Bricknet. All Rights Reserved</p>
          <a href="#" className="transition-opacity hover:opacity-75">
            Privacy Policy &amp; Term of Use
          </a>
        </div>
      </div>
    </footer>
  );
}
