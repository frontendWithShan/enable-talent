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

export default function AcademySuccessStories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      aria-labelledby="academy-success-stories-title"
      className={`${plusJakartaSans.className} bg-white px-4 py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10">
        <h2
          id="academy-success-stories-title"
          className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]"
        >
          <span className="bg-gradient-to-r from-[#d85b3b] via-[#e19a45] to-[#e8c26c] bg-clip-text text-transparent">
            Success
          </span>{" "}
          Stories
        </h2>

        <div className="grid w-full items-start gap-8 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative w-full overflow-hidden rounded-[18px] aspect-[539/341]">
            <Image
              src="/images/academy/success-stories/success story image.png"
              alt="Success story snapshot"
              fill
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="relative flex h-full flex-col justify-between rounded-[18px] bg-[#f7f7f5] p-6 shadow-md sm:p-8">
            <div className="pointer-events-none absolute right-24 -top-8 w-16 sm:w-20">
              <Image
                src="/images/academy/success-stories/quotation marks.svg"
                alt=""
                width={80}
                height={80}
                className="h-auto w-full"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Leslie Alexander</h3>
              <p className="text-sm font-semibold text-slate-600">
                People Operations Specialist at Clari
              </p>
              <p className="pt-2 text-base leading-7 text-slate-700 sm:text-lg">
                Enabled Academy helped me gain the confidence to return to work.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-amber-500"
                  aria-hidden="true"
                >
                  <path d="M12 2.5l2.47 5.01 5.53.8-4 3.9.94 5.49L12 15.87l-4.94 2.83.94-5.49-4-3.9 5.53-.8L12 2.5z" />
                </svg>
                4.5/5.0
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 justify-center sm:justify-end sm:translate-x-43">
          <button
            type="button"
            className="cursor-pointer"
            aria-label="Previous story"
          >
            <Image
              src="/images/academy/success-stories/success-left-navigation-button.svg"
              alt=""
              width={48}
              height={48}
              className="h-9 w-9"
              priority
            />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            aria-label="Next story"
          >
            <Image
              src="/images/academy/success-stories/success-right-navigation-button.svg"
              alt=""
              width={48}
              height={48}
              className="h-9 w-9"
              priority
            />
          </button>
          <FancyButton
            label="Read the Case Study"
            color="orange"
            onClick={() => setIsModalOpen(true)}
            aria-label="Read the case study"
          />
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Case Studies"
        description="We're compiling inspiring success stories from our Enabled Academy graduates. Case studies will be available soon to showcase their incredible journeys!"
      />
    </section>
  );
}
