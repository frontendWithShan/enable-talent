"use client";

import { useState } from "react";

import type { ContentSourceType } from "@/lib/data/types";

import NewPostTypeChooser, { NewPostTypePageActions } from "./NewPostTypeChooser";

export default function NewPostTypePage() {
  const descriptionId = "new-post-type-page-description";
  const [selectedType, setSelectedType] =
    useState<ContentSourceType>("internal_article");

  return (
    <section className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          What do you want to create?
        </h1>
        <p
          className="max-w-2xl text-sm leading-6 text-slate-700"
          id={descriptionId}
        >
          Choose the option that matches your post.
        </p>
      </div>

      <div className="mt-8">
        <NewPostTypeChooser
          describedById={descriptionId}
          mode="page"
          onSelect={setSelectedType}
          selectedType={selectedType}
        />
      </div>

      <div className="mt-8">
        <NewPostTypePageActions selectedType={selectedType} />
      </div>
    </section>
  );
}
