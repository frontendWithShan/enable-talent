"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useState } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AwardsWhoWeSupport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      aria-labelledby="awards-who-support-title"
      className={`${plusJakartaSans.className} bg-white px-4 py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[28px] bg-[#0f1d2d] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24 shadow-2xl">
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
          {/* Stickman accents */}
          <div className="pointer-events-none absolute -right-6 bottom-0 h-60 w-60">
            <img
              src="/images/awards/who we support/stickman asset.png"
              alt=""
              className="h-full w-full object-contain opacity-70"
            />
          </div>

          <div className="relative flex flex-col items-center text-center gap-5">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.05em] text-white/85 backdrop-blur">
              Who We Support
            </div>

            <h2
              id="awards-who-support-title"
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[56px]"
            >
              Join the{" "}
              <span className="bg-gradient-to-r from-[#e7b155] via-[#e6a14d] to-[#d67a3a] bg-clip-text text-transparent">
                Movement
              </span>
            </h2>

            <div className="space-y-4 text-base leading-7 text-slate-200 sm:text-lg lg:text-[24px]">
              <p>Nominate. Celebrate. Inspire.</p>
              <p className="pt-2">
                Together, we can spotlight those shaping a world of work that includes everyone.
              </p>
            </div>

            <FancyButton
              label="Nominate Now"
              color="orange"
              onClick={() => setIsModalOpen(true)}
              aria-label="Nominate for awards"
              className="mt-8"
            />
          </div>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Award Nominations"
        description="We're finalizing our nominations process to recognize outstanding individuals and organizations making a difference. Nominations will open soon!"
      />
    </section>
  );
}
