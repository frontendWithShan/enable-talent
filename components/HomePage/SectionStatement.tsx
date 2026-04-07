// app/components/SectionStatement.tsx
import { JSX } from "react";
import Link from "next/link";

export default function SectionStatement(): JSX.Element {
  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          {/* Pill label */}
          <p className="inline-flex items-center rounded-full bg-neutral-200 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
            Mission Statement
          </p>

          {/* Main heading */}
          <h2
            id="mission-heading"
            className="mt-8 text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Our mission is to build a fair and
            <br className="hidden sm:block" />
            inclusive global platform.
          </h2>
        </header>

        {/* Body copy */}
        <p className="mt-8 text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-8 text-center max-w-3xl mx-auto">
          Whether you’re searching for your first job, growing your career, or
          looking for talented professionals to join your team, we’re here to
          help. Through simple tools and a supportive global community, we break
          down barriers, connect people with opportunity, and help everyone move
          forward.
        </p>

        {/* Learn more link */}
        {/* <div className="mt-10 text-center">
          <Link
            href="/mission"
            className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
          >
            Link to learn more
          </Link>
        </div> */}
      </div>
    </section>
  );
}
