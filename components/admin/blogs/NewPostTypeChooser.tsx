"use client";

import Link from "next/link";

import type { ContentSourceType } from "@/lib/data/types";

type NewPostTypeChooserProps = {
  describedById?: string;
  mode?: "modal" | "page";
  onSelect: (value: ContentSourceType) => void;
  selectedType: ContentSourceType;
};

const OPTIONS: Array<{
  description: string;
  id: ContentSourceType;
  label: string;
}> = [
  {
    description: "Create a full post that lives on your website.",
    id: "internal_article",
    label: "Write on this site",
  },
  {
    description: "Add a short summary and send readers to another website.",
    id: "external_link",
    label: "Share a link",
  },
];

export function getNewPostHref(sourceType: ContentSourceType) {
  return `/admin/blogs/new?type=${sourceType}`;
}

export default function NewPostTypeChooser({
  describedById,
  mode = "modal",
  onSelect,
  selectedType,
}: NewPostTypeChooserProps) {
  return (
    <fieldset
      aria-describedby={describedById}
      className={`grid gap-4 ${mode === "page" ? "md:grid-cols-2" : ""}`}
    >
      <legend className="sr-only">Choose a post type</legend>
      {OPTIONS.map((option) => {
        const isSelected = selectedType === option.id;

        return (
          <label
            key={option.id}
            className={`block rounded-[28px] border bg-white p-5 shadow-sm transition focus-within:ring-2 focus-within:ring-slate-950 focus-within:ring-offset-2 ${
              isSelected
                ? "border-slate-950 ring-2 ring-slate-950 ring-offset-2"
                : "border-slate-300 hover:border-slate-500"
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                checked={isSelected}
                className="mt-1 h-5 w-5 border-slate-400 text-slate-950 focus:ring-slate-950"
                name="new-post-type"
                onChange={() => onSelect(option.id)}
                type="radio"
                value={option.id}
              />
              <div className="space-y-2">
                <p className="text-lg font-semibold text-slate-950">{option.label}</p>
                <p className="text-sm leading-6 text-slate-700">
                  {option.description}
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {isSelected ? "Selected" : "Not selected"}
                </p>
              </div>
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}

export function NewPostTypePageActions({
  selectedType,
}: {
  selectedType: ContentSourceType;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href={getNewPostHref(selectedType)}
        className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
      >
        Continue
      </Link>
      <Link
        href="/admin/blogs"
        className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
      >
        Go back
      </Link>
    </div>
  );
}
