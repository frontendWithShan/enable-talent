"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { ContentSourceType } from "@/lib/data/types";

import NewPostTypeChooser, { getNewPostHref } from "./NewPostTypeChooser";

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

export default function NewPostTypeModal({
  buttonLabel,
}: {
  buttonLabel: string;
}) {
  const router = useRouter();
  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] =
    useState<ContentSourceType>("internal_article");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const firstOption = dialogRef.current?.querySelector<HTMLInputElement>(
        'input[name="new-post-type"]',
      );

      if (firstOption) {
        firstOption.focus();
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);
      focusableElements[0]?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  function handleContinue() {
    // Clear any saved local draft for this type so the new form always starts blank.
    try {
      window.localStorage.removeItem(`admin.blogs.local-draft.new.${selectedType}`);
    } catch {
      // ignore — localStorage may be unavailable
    }
    router.push(getNewPostHref(selectedType));
    setIsOpen(false);
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[linear-gradient(90deg,#7c2d12_0%,#9a3412_100%)] px-4 py-3 text-sm font-semibold text-white hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {buttonLabel}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6">
          <div
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            aria-modal="true"
            className="w-full max-w-3xl rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-2xl sm:p-8"
            ref={dialogRef}
            role="dialog"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <h2
                  id={titleId}
                  className="text-2xl font-semibold tracking-tight text-slate-950"
                >
                  What do you want to create?
                </h2>
                <p id={descriptionId} className="max-w-2xl text-sm leading-6 text-slate-700">
                  Choose the option that matches your post.
                </p>
              </div>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm font-semibold text-[#1e293b] hover:bg-[#f1f5f9] hover:border-[#cbd5e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Cancel
              </button>
            </div>

            <div className="mt-6">
              <NewPostTypeChooser
                describedById={descriptionId}
                onSelect={setSelectedType}
                selectedType={selectedType}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[#e2e8f0] bg-white px-5 py-3 text-sm font-semibold text-[#1e293b] hover:bg-[#f1f5f9] hover:border-[#cbd5e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[linear-gradient(90deg,#7c2d12_0%,#9a3412_100%)] px-5 py-3 text-sm font-semibold text-white hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
                onClick={handleContinue}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
