"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";
import { useRef, useState } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const guidanceCards = [
  {
    src: "/images/students/Guidance%20when%20it%20matters%20most/career%20guidance%20and%20goal%20setting.png",
    title: (
      <>
        Career Guidance And
        <br />
        Goal Setting
      </>
    ),
  },
  {
    src: "/images/students/Guidance%20when%20it%20matters%20most/help%20preparing%20for%20interviews.jpeg",
    title: (
      <>
        Help Preparing For
        <br />
        Interviews And
        <br />
        Onboarding
      </>
    ),
  },
];

function PerspectiveCard({ src, title, delay = 0 }: { src: string; title: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Depth effect for text
  const textX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: 50, rotateY: 20 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative mx-auto w-full max-w-[280px] cursor-pointer overflow-hidden rounded-[20px] bg-transparent sm:mx-0 sm:max-w-full sm:rounded-[24px]"
    >
      <motion.div
        style={{ transform: "translateZ(0px)" }}
        className="relative shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_45px_100px_rgba(0,0,0,0.15)] focus:shadow-[0_45px_100px_rgba(0,0,0,0.15)]"
      >
        <Image
          src={src}
          alt="Guidance Card"
          width={520}
          height={720}
          className="h-auto w-full scale-[1.01] transition-transform duration-700 group-hover:scale-110"
        />

        {/* Animated Glow Aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#f2b163]/0 via-[#f2b163]/10 to-[#6b7aff]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <motion.div
          style={{
            x: textX,
            y: textY,
            translateZ: "60px",
            transformStyle: "preserve-3d"
          }}
          className="absolute right-4 top-4 text-right text-[15px] font-bold capitalize leading-[1.2] text-slate-900 sm:right-6 sm:top-6 sm:text-[18px]"
        >
          {title}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function GuidanceWhenItMatters() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handlePrev = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + guidanceCards.length) % guidanceCards.length,
    );
  };

  const handleNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % guidanceCards.length);
  };

  return (
    <section
      aria-labelledby="guidance-when-title"
      className={`${plusJakartaSans.className} bg-[#f7eedd] px-4 py-12 sm:py-20 lg:py-32 overflow-hidden`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.2fr] lg:items-start">
          {/* Left column */}
          <div className="flex flex-col items-center space-y-7 text-center sm:items-start sm:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex w-full justify-center sm:w-auto sm:justify-start"
            >
              <span className="rounded-full bg-[#e5d8c5] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-900">
                Career coaching for students
              </span>
            </motion.div>

            <motion.h2
              id="guidance-when-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-full text-center text-[34px] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-left sm:text-[60px]"
            >
              Guidance When It
              <br />
              Matters Most
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-md text-[16px] leading-7 font-semibold text-black/50 sm:text-lg"
            >
              Enabled Talent includes access to a career coach who helps students
              make sense of their options and prepare for the workplace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-full flex justify-center sm:justify-start"
            >
              <span className="inline-flex w-full items-center justify-center sm:w-auto">
                <FancyButton
                  label="Get career support"
                  color="navy"
                  as="button"
                  onClick={() => setIsSupportModalOpen(true)}
                />
              </span>
            </motion.div>

            <div className="hidden items-center gap-4 pt-6 sm:flex">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="cursor-pointer" aria-label="Previous" onClick={handlePrev}>
                <Image
                  src="/images/students/Guidance%20when%20it%20matters%20most/left%20button.svg"
                  alt=""
                  width={45}
                  height={45}
                />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="cursor-pointer" aria-label="Next" onClick={handleNext}>
                <Image
                  src="/images/students/Guidance%20when%20it%20matters%20most/right%20button.svg"
                  alt=""
                  width={45}
                  height={45}
                />
              </motion.button>
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-6 items-center sm:grid-cols-2 sm:justify-items-end [perspective:1000px]">
            <PerspectiveCard
              src={guidanceCards[currentCardIndex].src}
              title={guidanceCards[currentCardIndex].title}
              delay={0.4}
            />
            <PerspectiveCard
              src={guidanceCards[(currentCardIndex + 1) % guidanceCards.length].src}
              title={guidanceCards[(currentCardIndex + 1) % guidanceCards.length].title}
              delay={0.5}
            />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="mt-8 flex items-center justify-center gap-4 sm:hidden">
          <button type="button" className="cursor-pointer" aria-label="Previous" onClick={handlePrev}>
            <Image
              src="/images/students/Guidance%20when%20it%20matters%20most/left%20button.svg"
              alt=""
              width={40}
              height={40}
            />
          </button>
          <button type="button" className="cursor-pointer" aria-label="Next" onClick={handleNext}>
            <Image
              src="/images/students/Guidance%20when%20it%20matters%20most/right%20button.svg"
              alt=""
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        title="Career Support"
        description="Student career coaching access is launching soon. We'll share updates as soon as registration opens."
      />
    </section>
  );
}

