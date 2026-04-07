"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function StudentsHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "Request a Demo",
    description:
      "Student and campus demos are opening soon. Share your interest and our team will follow up.",
  });

  const openModal = (title: string, description: string) => {
    setModalContent({ title, description });
    setIsModalOpen(true);
  };

  return (
    <section
      aria-labelledby="students-hero-title"
      className={`${plusJakartaSans.className} relative overflow-hidden bg-[#FDF6E8]`}
    >
      {/* Stickman Logo */}
      <div className="absolute right-4 top-16 h-20 w-20 opacity-100 sm:-right-24 sm:top-44 sm:h-[440px] sm:w-[440px]">
        <Image
          src="/images/students/hero%20section/stickman%20logo.png"
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 640px) 80px, 440px"
          priority
        />
      </div>

      {/* Main Container: Reduced pb to 0 on mobile to end at images */}
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-0 sm:pb-0 sm:pt-16 lg:pb-0 lg:pt-20">
        <div className="flex flex-col items-center gap-4 text-center lg:-translate-y-6">
          <h1
            id="students-hero-title"
            className="text-[28px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Build{" "}
            <span className="bg-gradient-to-r from-[#C0412C] to-[#C0412C] bg-clip-text text-transparent">
              careers
            </span>{" "}
            that last.
            Not just job matches.
          </h1>
          <p className="max-w-3xl text-[15px] font-semibold leading-7 text-black/70 sm:text-lg">
            Enabled Talent helps students find internships, co-op, and early
            career jobs, and supports them with real guidance as they start
            working.
          </p>
          <p className="max-w-3xl text-[15px] font-semibold leading-7 text-black/70 sm:text-lg">
            We bring students, career centres, and employers together in one
            accessible platform.
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6 lg:mt-4">
            <span className="inline-flex w-full items-center justify-center sm:w-auto">
              <FancyButton
                label="Request a demo"
                color="navy"
                as="button"
                className="px-4 py-1.5 text-xs sm:text-[13px]"
                onClick={() =>
                  openModal(
                    "Request a Demo",
                    "Student and campus demos are opening soon. Share your interest and our team will follow up.",
                  )
                }
              />
            </span>

            <span className="inline-flex w-full items-center justify-center sm:w-auto">
              <FancyButton
                label="Talk to our team"
                color="orange"
                as="button"
                className="px-4 py-1.5 text-xs sm:text-[13px]"
                onClick={() =>
                  openModal(
                    "Talk to Our Team",
                    "We're currently scheduling student-partner conversations. Please check back soon.",
                  )
                }
              />
            </span>
          </div>
        </div>

        {/* Mobile image section */}
        <div className="mt-6 flex flex-col items-center justify-center sm:hidden select-none pointer-events-none">
          {/* Row 1: Two images, bigger and raised */}
          <div className="z-0 flex justify-center -space-x-4">
            {[
              {
                src: "/images/students/hero%20section/woman%201.png",
                alt: "Student smiling",
                rotate: "-rotate-6",
              },
              {
                src: "/images/students/hero%20section/woman%202.png",
                alt: "Student with tablet",
                rotate: "rotate-3",
              },
            ].map((card) => (
              <div
                key={card.src}
                className={`relative aspect-[3/4] w-[52vw] max-w-[200px] overflow-hidden rounded-2xl ${card.rotate}`}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="52vw"
                  priority
                />
              </div>
            ))}
          </div>

          {/* Row 2: Three images */}
          <div className="z-10 -mt-16 flex justify-center -space-x-10">
            {[
              {
                src: "/images/students/hero%20section/man.png",
                alt: "Student writing",
                rotate: "-rotate-6",
                zIndex: "z-10",
              },
              {
                src: "/images/students/hero%20section/woman%203.png",
                alt: "Student glasses",
                rotate: "rotate-0",
                zIndex: "z-20",
                scale: "scale-110",
              },
              {
                src: "/images/students/hero%20section/woman%204.png",
                alt: "Student laptop",
                rotate: "rotate-6",
                zIndex: "z-10",
              },
            ].map((card) => (
              <div
                key={card.src}
                className={`relative aspect-[3/4] w-[46vw] max-w-[170px] overflow-hidden rounded-2xl ${card.rotate} ${card.zIndex} ${card.scale || ""}`}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="46vw"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop image section, original spacing restored */}
        <div className="mt-[-25] hidden justify-center sm:flex lg:translate-y-0 lg:mb-[-56px] select-none pointer-events-none">
          <div className="relative flex items-end justify-center -space-x-10 scale-[0.99] [--hero-offset-scale:1]">
            {[
              {
                src: "/images/students/hero%20section/woman%201.png",
                alt: "Student smiling with notebook",
                rotate: "-rotate-4",
                offsetX: 165,
                offsetY: 0,
              },
              {
                src: "/images/students/hero%20section/woman%202.png",
                alt: "Student with tablet",
                rotate: "-rotate-2",
                offsetX: 80,
                offsetY: 0,
              },
              {
                src: "/images/students/hero%20section/man.png",
                alt: "Student writing notes",
                rotate: "rotate-1",
                offsetX: -11,
                offsetY: 0,
              },
              {
                src: "/images/students/hero%20section/woman%203.png",
                alt: "Student with glasses",
                rotate: "rotate-2",
                offsetX: -95,
                offsetY: 0,
              },
              {
                src: "/images/students/hero%20section/woman%204.png",
                alt: "Student holding laptop",
                rotate: "rotate-4",
                offsetX: -185,
                offsetY: 20,
              },
            ].map((card, idx) => (
              <div
                key={card.src}
                className={`relative aspect-[3/4] w-[300px] overflow-hidden rounded-[18px] ${card.rotate}`}
                style={{
                  zIndex: idx + 1,
                  transform: `translateX(calc(${card.offsetX}px * var(--hero-offset-scale))) translateY(calc(${card.offsetY}px * var(--hero-offset-scale)))`,
                }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 260px, 90vw"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
      />
    </section>
  );
}

