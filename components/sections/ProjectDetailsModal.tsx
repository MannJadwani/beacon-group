"use client";

import { useEffect, useState } from "react";

export function ProjectDetailsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="btn btn-solid-orange"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Modal Title"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-base-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-secondary-navy">Modal Title</h2>
            <p className="mt-4 text-base text-base-grey">
              This is a modal cloned from DaisyUI but written with pure TailwindCSS.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-solid-orange"
                onClick={() => setIsOpen(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
