// app/components/SectionAbout.tsx
"use client";

import Image from "next/image";
import { JSX, useState } from "react";
import discussion from "@/public/images/SectionAbout/discussion.png";
import FancyButtonNoIcon from "@/components/FancyButtonNoIcon";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function SectionAbout(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      aria-labelledby="about-heading"
      className=" py-2 sm:py-3 lg:py-4"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="rounded-4xl bg-[#f1f4f5] px-4 py-10 shadow-sm sm:px-10 lg:px-16 lg:py-14">
          {/* Text */}
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              <span className="text-[#A45312]">Enabled</span>{" "}
              <span className="text-slate-900">Academy</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-base mb-6">
              Learn new skills with support that fits your needs. You can join
              online or in-person coaching, take part in live sessions, and get
              one-on-one help. Our programs are designed with real industry
              needs in mind, and we give you simple tools to build your skills,
              grow your confidence, and get ready for new opportunities.
            </p>
            {/* fancybuttonwothouicon */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-block"
              type="button"
            >
              <FancyButtonNoIcon
                label="Register for free"
                className="shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform duration-150 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#182434] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              />
            </button>

            <ComingSoonModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Enabled Academy Registration"
              description="We're currently building an amazing learning experience for Enabled Academy. Registration will be available soon. Check back for updates!"
            />
          </div>

          {/* Video image */}
          <div className="mt-10 sm:mt-12">
            <div
              className="relative overflow-hidden rounded-[28px]  h-52          /* mobile */
                          sm:h-64       /* small devices (optional) */
                          md:h-80       /* TABLETS (new larger size) */
                          lg:h-96       /* desktop (optional, change as needed) */"
            >
              <Image
                src={discussion}
                alt="Coach and learner in discussion in a bright, plant-filled workspace."
                width={1200}
                height={675}
                className="h-full w-full object-cover"
                priority
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
