"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useState } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const supportPoints = [
  "We train them specifically for your roles",
  "We source and identify potential candidates",
  "We provide one-on-one coaching and readiness support",
  "We support inclusive hiring practices across all departments",
  "We reduce onboarding challenges and help improve retention",
  "We prepare candidates to fully understand your workflows, tools, and expectations",
];

export default function AcademySupportEmployers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      aria-labelledby="academy-support-employers-title"
      className={`${plusJakartaSans.className} relative overflow-hidden bg-white`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left illustration */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[520px]">
              {/* Bottom-left watermark icon beneath the figure */}
              <div className="pointer-events-none absolute -left-35 -bottom-56 w-40 opacity-70 sm:w-48 sm:-bottom-60">
                <Image
                  src="/images/academy/support-employers/icon for support section.svg"
                  alt=""
                  width={240}
                  height={240}
                  className="h-auto w-full"
                />
              </div>

              <div className="relative">
                <Image
                  src="/images/academy/support-employers/woman for support section.png"
                  alt="Woman holding notebooks and backpack"
                  width={520}
                  height={520}
                  className="h-auto w-full max-w-[320px] -translate-y-2 sm:max-w-[420px] sm:-translate-y-40"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right copy */}
          <div className="space-y-6 lg:pl-6">
            <div className="flex justify-center sm:justify-start">
              <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 shadow-sm">
                For Employers
              </div>
            </div>

            <h2
              id="academy-support-employers-title"
              className="text-[32px] font-extrabold leading-[1.15] tracking-tight text-slate-900 text-center sm:text-left sm:text-5xl"
            >
              <span className="text-slate-900">Your Workforce</span>{" "}
              <span className="text-[#A45A14]">Training &</span>{" "}
              <span className="text-[#C0412C]">Talent Partner</span>
            </h2>

            <div className="space-y-4 text-[15px] leading-7 text-slate-700 sm:text-lg max-w-2xl sm:space-y-4">
              <p>
                Enabled Academy helps employers build a stronger and more prepared workforce by training candidates based on real job requirements.
              </p>
              <p>
                We support you with a flexible, inclusive, and job-ready talent pipeline.
              </p>
            </div>

            <div className="pt-1 flex justify-center sm:justify-start">
              <FancyButton
                label="Book a Call Now"
                color="navy"
                onClick={() => setIsModalOpen(true)}
                aria-label="Book a call now"
              />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl text-center sm:text-left">
                How We Support Employers
              </h3>
              <ul className="space-y-3 text-[15px] leading-7 text-slate-800 sm:text-lg">
                {supportPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Image
                      src="/images/academy/talent-value/plus sign.png"
                      alt=""
                      width={16}
                      height={16}
                      className="mt-1 h-4 w-4 flex-shrink-0"
                    />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book a Call"
        description="We're setting up our scheduling system to make it easy for you to connect with our team. Call booking will be available soon!"
      />
    </section>
  );
}
