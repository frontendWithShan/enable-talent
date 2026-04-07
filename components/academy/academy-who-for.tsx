"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useState } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AcademyWhoFor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      aria-labelledby="academy-who-for-title"
      className={`${plusJakartaSans.className} bg-white px-4 py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[28px] bg-[#0f1d2d] px-6 py-14 sm:px-10 sm:py-16 lg:px-14 shadow-2xl">
          {/* Subtle grid pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
              backgroundSize: "42px 42px",
            }}
          />

          {/* Glow overlays */}
          <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full bg-[#f2b163]/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 -bottom-12 h-48 w-48 rounded-full bg-[#6b7aff]/15 blur-3xl" />

          <div className="relative flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.05em] text-white/85 backdrop-blur">
              Who We Support
            </div>

            <h2
              id="academy-who-for-title"
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[56px]"
            >
              Who{" "}
              <span className="bg-gradient-to-r from-[#d85b3b] via-[#e19a45] to-[#e8c26c] bg-clip-text text-transparent">
                This Is For
              </span>
            </h2>

            <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              Anyone looking to improve skills, start a career, restart a career, or grow into new opportunities, including students, newcomers, career-changers, and people facing barriers.
            </p>

            <FancyButton
              label="Join Enabled Academy"
              color="orange"
              onClick={() => setIsModalOpen(true)}
              aria-label="Join Enabled Academy"
              className="mt-4"
            />
          </div>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Enabled Academy Registration"
        description="We're building an amazing learning experience for Enabled Academy. Registration will be available soon. Check back for updates!"
      />
    </section>
  );
}
