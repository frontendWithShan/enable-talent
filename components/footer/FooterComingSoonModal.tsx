"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import FancyButton from "@/components/FancyButton";

type FooterComingSoonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
};

export default function FooterComingSoonModal({
  isOpen,
  onClose,
  title,
  description,
}: FooterComingSoonModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];
    return Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute("disabled"));
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
          return;
        }

        if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [getFocusableElements, onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      previousActiveElement.current?.focus();
    };
  }, [handleKeyDown, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-coming-soon-title"
            aria-describedby="footer-coming-soon-description"
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3541] focus-visible:ring-offset-2"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0D3541]">
              Coming Soon
            </p>
            <h2
              id="footer-coming-soon-title"
              className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900"
            >
              {title}
            </h2>
            <p
              id="footer-coming-soon-description"
              className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base"
            >
              {description}
            </p>

            <div className="mt-6">
              <FancyButton
                label="Close"
                color="orange"
                onClick={onClose}
                aria-label="Close coming soon dialog"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
