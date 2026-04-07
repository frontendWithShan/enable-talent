"use client";

import { useEffect, useRef } from "react";

type ConfirmDeleteModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
  pending?: boolean;
  postTitle: string;
};

export default function ConfirmDeleteModal({
  onCancel,
  onConfirm,
  pending,
  postTitle,
}: ConfirmDeleteModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div
      aria-labelledby="confirm-delete-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <h2
          id="confirm-delete-title"
          className="text-lg font-semibold text-slate-950"
        >
          Delete this post?
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          <span className="font-semibold text-slate-900">{postTitle}</span> will
          be permanently deleted. This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            disabled={pending}
            onClick={onCancel}
            ref={cancelRef}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-xl border border-red-700 bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 disabled:opacity-70"
            disabled={pending}
            onClick={onConfirm}
            type="button"
          >
            {pending ? "Deleting..." : "Delete permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
