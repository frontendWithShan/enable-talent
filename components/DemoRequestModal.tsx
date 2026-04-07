"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type DemoRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /**
   * Saved with the request as `source` so the team can track where it came from.
   * Example: "footer-sales-demo"
   */
  source?: string;
  title?: string;
};

type FormState = {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

type FieldName = keyof FormState;

const DEFAULT_FORM: FormState = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

export default function DemoRequestModal({
  isOpen,
  onClose,
  source = "website",
  title = "Request a Sales Demo",
}: DemoRequestModalProps) {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const firstFocusableRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];
    return Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute("disabled"));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
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
      firstFocusableRef.current?.focus();
    }, 50);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";

      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      previousActiveElement.current?.focus();
    };
  }, [handleKeyDown, isOpen]);

  // Reset state when opening.
  useEffect(() => {
    if (!isOpen) return;
    setStatus("idle");
    setErrorMessage("");
    setIsSubmitting(false);
    setFieldErrors({});
  }, [isOpen]);

  const closeAndReset = () => {
    setForm(DEFAULT_FORM);
    setStatus("idle");
    setErrorMessage("");
    setIsSubmitting(false);
    setFieldErrors({});
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as FieldName;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[fieldName]) return prev;
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setStatus("idle");

    const nextFieldErrors: Partial<Record<FieldName, string>> = {};
    const fullName = form.fullName.trim();
    const email = form.email.trim();
    const company = form.company.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!fullName) nextFieldErrors.fullName = "Full name is required.";
    if (!email) nextFieldErrors.email = "Work email is required.";
    if (!company) nextFieldErrors.company = "Company is required.";
    if (!message) nextFieldErrors.message = "Message is required.";

    // Optional: only validate phone if provided.
    if (phone) {
      const digitsOnly = phone.replace(/\\D/g, "");
      if (digitsOnly.length > 0 && digitsOnly.length < 7) {
        nextFieldErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setStatus("error");
      setErrorMessage("Please correct the highlighted fields.");
      setFieldErrors(nextFieldErrors);

      const firstInvalid: FieldName[] = ["fullName", "email", "company", "phone", "message"];
      const firstInvalidField = firstInvalid.find((field) => !!nextFieldErrors[field]);
      if (firstInvalidField && modalRef.current) {
        const el = modalRef.current.querySelector<HTMLElement>(`[name=\"${firstInvalidField}\"]`);
        el?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const { submitDemoRequest } = await import("@/utils/inquiriesClient");

      const result = await submitDemoRequest({
        name: fullName,
        email,
        company,
        phone,
        message,
        source,
      });

      if (!result?.success) {
        setStatus("error");
        setErrorMessage(result?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(DEFAULT_FORM);

      closeTimerRef.current = window.setTimeout(() => {
        closeAndReset();
      }, 2000);
    } catch (err) {
      setStatus("error");
      setErrorMessage((err as Error)?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAndReset}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-request-title"
            aria-describedby="demo-request-description"
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              onClick={closeAndReset}
              className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#EFB745] focus:ring-offset-2"
              aria-label="Close dialog"
              type="button"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="pr-10">
              <h2 id="demo-request-title" className="text-2xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h2>
              <p id="demo-request-description" className="mt-2 text-sm leading-relaxed text-slate-600">
                Tell us what you want to see in the demo and our team will reach out.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" autoComplete="on" noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">
                    Full name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={firstFocusableRef}
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    aria-invalid={!!fieldErrors.fullName}
                    aria-describedby={fieldErrors.fullName ? "demo-request-fullName-error" : undefined}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3541] focus-visible:ring-offset-2 focus-visible:border-[#0D3541]"
                    placeholder="Jane Doe"
                  />
                  {fieldErrors.fullName ? (
                    <p id="demo-request-fullName-error" className="mt-1 text-xs font-medium text-red-700">
                      {fieldErrors.fullName}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                    Work email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    inputMode="email"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "demo-request-email-error" : undefined}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3541] focus-visible:ring-offset-2 focus-visible:border-[#0D3541]"
                    placeholder="jane@company.com"
                  />
                  {fieldErrors.email ? (
                    <p id="demo-request-email-error" className="mt-1 text-xs font-medium text-red-700">
                      {fieldErrors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="mb-1 block text-sm font-medium text-slate-700">
                    Company <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleInputChange}
                    required
                    autoComplete="organization"
                    aria-invalid={!!fieldErrors.company}
                    aria-describedby={fieldErrors.company ? "demo-request-company-error" : undefined}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3541] focus-visible:ring-offset-2 focus-visible:border-[#0D3541]"
                    placeholder="Company Inc."
                  />
                  {fieldErrors.company ? (
                    <p id="demo-request-company-error" className="mt-1 text-xs font-medium text-red-700">
                      {fieldErrors.company}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={!!fieldErrors.phone}
                    aria-describedby={fieldErrors.phone ? "demo-request-phone-error" : undefined}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3541] focus-visible:ring-offset-2 focus-visible:border-[#0D3541]"
                    placeholder="+1 (555) 123-4567"
                  />
                  {fieldErrors.phone ? (
                    <p id="demo-request-phone-error" className="mt-1 text-xs font-medium text-red-700">
                      {fieldErrors.phone}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                  What would you like to see? <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? "demo-request-message-error" : undefined}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3541] focus-visible:ring-offset-2 focus-visible:border-[#0D3541]"
                  placeholder="Share your hiring goals, team size, roles you hire for, or accessibility needs..."
                />
                {fieldErrors.message ? (
                  <p id="demo-request-message-error" className="mt-1 text-xs font-medium text-red-700">
                    {fieldErrors.message}
                  </p>
                ) : null}
              </div>

              {status === "success" ? (
                <div role="status" aria-live="polite" className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                  Thanks, your request has been submitted. We will reach out soon.
                </div>
              ) : null}

              {status === "error" && errorMessage ? (
                <div role="alert" aria-live="assertive" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {errorMessage}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeAndReset}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3541] focus-visible:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-[#FFD071] to-[#EFB745] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3541] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Request demo"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
