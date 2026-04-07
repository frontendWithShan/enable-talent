"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import FancyButton from "@/components/FancyButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type Card = {
  id: string;
  title: ReactNode;
  altText: string;
  image: string;
  badge: string;
  bgColor: string; // Background tint for Atmospheric Sync
};

const cards: Card[] = [
  {
    id: "discover-roles",
    title: (
      <>
        <span className="block">Discover Internship, Co-</span>
        <span className="block">Op, And Entry-Level Roles</span>
      </>
    ),
    altText: "Discover internship, co-op, and entry-level roles",
    image: "/images/students/Internship%20section/1st%20internship.png",
    badge: "/images/students/Internship%20section/1st%20internship%20top%20right.png",
    bgColor: "#e8f1ff", // Default light blue
  },
  {
    id: "learn-employers",
    title: (
      <>
        <span className="block">Learn About Employers</span>
        <span className="block">Before Applying</span>
      </>
    ),
    altText: "Learn about employers before applying",
    image: "/images/students/Internship%20section/learn%20about%20employers%20image.png",
    badge: "/images/students/Internship%20section/2nd%20internship%20top%20right.png",
    bgColor: "#f0faf0", // Subtle green tint
  },
  {
    id: "join-sessions",
    title: (
      <>
        <span className="block">Join Employer Info Sessions</span>
        <span className="block">And Events</span>
      </>
    ),
    altText: "Join employer info sessions and events",
    image: "/images/students/Internship%20section/join%20employer%20info%20session.png",
    badge: "/images/students/Internship%20section/3rd%20internship%20top%20right.png",
    bgColor: "#fff5f0", // Subtle orange tint
  },
];

function InternshipCard({
  card,
  isActive,
  position
}: {
  card: Card;
  isActive: boolean;
  position: number
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  // Holographic Parallax effects
  const textX = useTransform(smoothX, [0, 1], [-15, 15]);
  const textY = useTransform(smoothY, [0, 1], [-10, 10]);
  const imageScale = useTransform(smoothY, [0, 1], [1.05, 1.15]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        scale: isActive ? 1 : 0.8,
        x: `${position * 95}%`, // Clean spread
        z: isActive ? 0 : -200,
        rotateY: position * 30, // Stronger perspective
        opacity: isActive ? 1 : 0.7, // Keep them visible
        zIndex: isActive ? 30 : 10,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ perspective: "2000px" }}
    >
      <div
        className={`relative w-full max-w-[240px] sm:max-w-[340px] h-[320px] sm:h-[480px] rounded-[24px] overflow-hidden shadow-2xl pointer-events-auto cursor-pointer transition-all duration-500 ${isActive ? "shadow-[0_45px_100px_rgba(0,0,0,0.2)]" : "shadow-md"}`}
      >
        <motion.div className="relative h-full w-full" style={{ scale: isActive ? imageScale : 1 }}>
          <Image
            src={card.image}
            alt={card.altText}
            fill
            className="object-cover"
            priority
          />
          {/* Subtle Glint Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={isActive ? { x: [-300, 300] } : {}}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>

        <motion.div
          style={{ x: textX, y: textY, translateZ: "40px" }}
          className="absolute top-6 right-6 text-right z-10"
        >
          <div className="text-[17px] sm:text-[22px] font-extrabold leading-[1.1] text-slate-900 drop-shadow-sm">
            {card.title}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function InternshipsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <motion.section
      animate={{ backgroundColor: cards[currentIndex].bgColor }}
      transition={{ duration: 1 }}
      aria-labelledby="students-internships-title"
      className={`${plusJakartaSans.className} relative overflow-hidden px-4 py-16 sm:py-24 lg:py-28 min-h-[700px] flex flex-col justify-center`}
    >
      <div className="relative mx-auto max-w-6xl w-full">
        {/* Header Section */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 pl-0 sm:pl-8 text-center sm:text-left"
          >
            <div className="inline-flex items-center justify-center sm:justify-start">
              <span className="rounded-full bg-black/5 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.06em] text-slate-900 backdrop-blur-sm">
                For Students
              </span>
            </div>

            <h2
              id="students-internships-title"
              className="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-[54px]"
            >
              Internships, Co-op, and
              <br className="hidden sm:block" /> Early Career Jobs
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:justify-self-end text-center sm:text-left"
          >
            <p className="mx-auto max-w-sm text-[16px] font-semibold leading-relaxed text-black/60 sm:mx-0 sm:text-[18px]">
              Enabled Talent helps students and recent graduates find the right
              opportunities and feel supported as they begin their careers.
            </p>

            <div className="flex justify-center sm:justify-start">
              <Link href="/fortalents">
                <FancyButton label="Browse student opportunities" color="navy" as="span" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[400px] sm:h-[550px] w-full flex items-center justify-center overflow-visible">
          <div className="relative w-full max-w-[400px] h-full">
            {cards.map((card, idx) => {
              // Exact position logic for 3 cards: -1, 0, or 1
              let position = 0;
              if (idx === currentIndex) position = 0;
              else if (idx === (currentIndex + 1) % cards.length) position = 1;
              else position = -1;

              return (
                <InternshipCard
                  key={card.id}
                  card={card}
                  isActive={idx === currentIndex}
                  position={position}
                />
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex items-center justify-center gap-6 relative z-20">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="cursor-pointer shadow-lg rounded-full"
            aria-label="Previous"
            onClick={handlePrev}
          >
            <Image
              src="/images/students/Internship%20section/left-button.svg"
              alt=""
              width={56}
              height={56}
              className="sm:h-[64px] sm:w-[64px]"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="cursor-pointer shadow-lg rounded-full"
            aria-label="Next"
            onClick={handleNext}
          >
            <Image
              src="/images/students/Internship%20section/right-button.svg"
              alt=""
              width={56}
              height={56}
              className="sm:h-[64px] sm:w-[64px]"
            />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
