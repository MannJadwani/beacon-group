"use client";

import { useLayoutEffect } from "react";

type AosElement = HTMLElement & {
  dataset: {
    aos?: string;
    aosDelay?: string;
    aosDuration?: string;
    aosOnce?: string;
  };
};

export function ScrollAos() {
  useLayoutEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-aos]"),
    ) as AosElement[];

    if (elements.length === 0) return;

    elements.forEach((el) => {
      el.classList.add("aos-init");

      const delay = el.dataset.aosDelay;
      if (delay) el.style.transitionDelay = `${delay}ms`;

      const duration = el.dataset.aosDuration;
      if (duration) el.style.transitionDuration = `${duration}ms`;
    });

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      elements.forEach((el) => el.classList.add("aos-animate"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const el = entry.target as AosElement;
          el.classList.add("aos-animate");

          const once = el.dataset.aosOnce;
          const shouldUnobserve = once !== "false";
          if (shouldUnobserve) observer.unobserve(el);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
