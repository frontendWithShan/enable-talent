"use client";

import { useEffect, useRef } from "react";

type NoCoverImageWarningModalProps = {
  onAddCover: () => void;
  onPublishAnyway: () => void;
};

export default function NoCoverImageWarningModal({
  onAddCover,
  onPublishAnyway,
}: NoCoverImageWarningModalProps) {
  const addCoverRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    addCoverRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onAddCover();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onAddCover]);

  return (
    <div
      aria-labelledby="no-cover-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onAddCover} />

      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <h2
          id="no-cover-title"
          className="text-lg font-semibold text-slate-950"
        >
          No cover image
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Cover images make your post more attractive and help readers understand
          what it&apos;s about. Would you like to add one before publishing?
        </p>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            onClick={onPublishAnyway}
            type="button"
          >
            Publish without cover
          </button>
          <button
            className="rounded-xl border border-slate-950 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            onClick={onAddCover}
            ref={addCoverRef}
            type="button"
          >
            Add cover image
          </button>
        </div>
      </div>
    </div>
  );
}
