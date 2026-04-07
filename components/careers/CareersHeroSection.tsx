"use client";

import { useEffect, useState } from "react";
import type { JobPosting } from "./types";
import Container from "@/components/layout/Container";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type CareersHeroSectionProps = {
  jobPostings: JobPosting[];
};

// Sub-component for individual drifting particles
function Particle({ isEffectActive }: { isEffectActive: boolean }) {
  const [particleConfig] = useState(() => ({
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
    randomStartX: Math.random() * 100,
    randomStartY: Math.random() * 100,
    size: Math.random() * 2 + 1.5,
  }));

  return (
    <motion.div
      initial={{
        left: `${particleConfig.randomStartX}%`,
        top: `${particleConfig.randomStartY}%`,
        opacity: 0,
        scale: 0
      }}
      animate={{
        // On effect active (Intro or Hover), they pull toward the center
        left: isEffectActive ? "50%" : [`${particleConfig.randomStartX}%`, `${(particleConfig.randomStartX + 5) % 100}%`, `${particleConfig.randomStartX}%`],
        top: isEffectActive ? "45%" : [`${particleConfig.randomStartY}%`, `${(particleConfig.randomStartY + 5) % 100}%`, `${particleConfig.randomStartY}%`],
        opacity: isEffectActive ? [0, 0.8, 0.8] : [0, 0.5, 0],
        scale: isEffectActive ? [0, 1.5, 1] : 1,
      }}
      transition={{
        duration: isEffectActive ? 1.5 : particleConfig.duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: isEffectActive ? 0 : particleConfig.delay,
      }}
      className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      style={{ width: particleConfig.size, height: particleConfig.size }}
    />
  );
}

export default function CareersHeroSection({ jobPostings }: CareersHeroSectionProps) {
  const jobTypes = [...new Set(jobPostings.map((job) => job.jobType).filter(Boolean))];
  const [isHovered, setIsHovered] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Trigger the intro animation on mount
  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
    const introTimer = setTimeout(() => setIsIntroActive(false), 2500);
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(introTimer);
    };
  }, []);

  const isEffectActive = isHovered || isIntroActive;

  return (
    <section className={`${plusJakartaSans.className} bg-[#FDF6E8] px-4 py-12 sm:py-16 lg:py-20`}>
      <Container className="max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative overflow-hidden rounded-[28px] bg-[#0f1d2d] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-22 shadow-2xl"
        >
          {/* 1. Breathing Background Grid */}
          <motion.div
            animate={{ opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* 2. Particle Intelligence Field */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
            {mounted && [...Array(30)].map((_, i) => (
              <Particle key={i} isEffectActive={isEffectActive} />
            ))}
          </div>

          {/* 3. Orange Glow Pulse on Hover or Intro */}
          <AnimatePresence>
            {isEffectActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.2, 0], scale: [0.8, 1.3, 1.3] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#f2b163]/30 blur-[130px] z-0"
              />
            )}
          </AnimatePresence>

          {/* Background Gradients */}
          <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#f2b163]/10 blur-[100px]" />
          <div className="pointer-events-none absolute right-0 -bottom-12 h-80 w-80 rounded-full bg-[#6b7aff]/10 blur-[120px]" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[56px] leading-tight"
            >
              Join Our{" "}
              <motion.span
                animate={isEffectActive ? {
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(242,177,99,0.5)"
                } : {
                  scale: 1,
                  textShadow: "none"
                }}
                className="inline-block bg-gradient-to-r from-[#d85b3b] via-[#e19a45] to-[#e8c26c] bg-clip-text text-transparent transition-all duration-700"
              >
                Mission
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-4xl text-base leading-7 text-slate-200 sm:text-lg"
            >
              Be part of building the future of inclusive talent acquisition and make a real impact on people&apos;s careers.
            </motion.p>

            <div className="mt-4 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center justify-center rounded-2xl bg-[#FFD071]/90 px-6 py-3 text-black shadow-xl min-w-[160px] cursor-default transition-all"
              >
                <span className="text-2xl font-bold">{jobPostings.length}</span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">Open Positions</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center justify-center rounded-2xl bg-[#FFD071]/90 px-6 py-3 text-black shadow-xl min-w-[160px] cursor-default transition-all"
              >
                <span className="text-2xl font-bold">{jobTypes.length}</span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">Job Types</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
