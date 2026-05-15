"use client";

import { motion, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

const barVariants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: width,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.4 }
  })
};

const bars = [
  { label: 'ESG Disclosure', y: 70, trackY: 82, fill: 180 },
  { label: 'Accessibility (ADA/AODA/EAA)', y: 115, trackY: 127, fill: 160 },
  { label: 'DEI Commitment', y: 160, trackY: 172, fill: 130 },
];

export const ComplianceReportingGraphic = (props: SVGMotionProps<SVGSVGElement>) => (
  <motion.svg
    width="625" height="387" viewBox="0 0 625 387" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial="hidden" whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={containerVariants}
    {...props}
  >
    {/* Left Cards */}
    <motion.g variants={itemVariants}>
      {/* Card 1 — 100% Accessibility */}
      <rect x={25} y={5} width={215} height={110} rx={14} fill="#1E2E44" />
      <AnimatedCounter value={100} suffix="%" x={132} y={72} textAnchor="middle" fontSize="48" fontWeight="800" fill="#FDCD6C" duration={1.8} />
      <text x={132} y={96} textAnchor="middle" fill="#9CA3AF" fontSize="12" fontWeight="400">Accessibility</text>
    </motion.g>

    <motion.g variants={itemVariants}>
      {/* Card 2 — 94% Avg Retention */}
      <rect x={25} y={125} width={215} height={110} rx={14} fill="#1E2E44" />
      <AnimatedCounter value={94} suffix="%" x={132} y={192} textAnchor="middle" fontSize="48" fontWeight="800" fill="#FDCD6C" duration={1.8} />
      <text x={132} y={216} textAnchor="middle" fill="#9CA3AF" fontSize="12" fontWeight="400">Avg Retention</text>
    </motion.g>

    {/* Right Section */}
    <motion.g variants={itemVariants}>
      {/* Header — Aligned with card top, increased size and weight */}
      <text x={270} y={30} fill="white" fontSize="22" fontWeight="800">Compliance Report</text>

      {/* Decorative Dots — Staggered as in image */}
      <circle cx="515" cy="20" r="8" fill="#FDCD6C" />
      <circle cx="545" cy="50" r="6" fill="#FDCD6C" opacity="0.6" />
      <circle cx="500" cy="65" r="5" fill="#FDCD6C" opacity="0.4" />
    </motion.g>

    {/* Progress bars */}
    {bars.map((bar) => (
      <motion.g key={bar.label} variants={itemVariants}>
        <text x={270} y={bar.y} fill="#9CA3AF" fontSize="10" fontWeight="400">{bar.label}</text>
        <rect x={270} y={bar.trackY} width={220} height={7} rx={3.5} fill="#2A3B52" />
        <motion.rect
          x={270} y={bar.trackY} height={7} rx={3.5} fill="#FDCD6C"
          variants={barVariants}
          custom={bar.fill}
        />
      </motion.g>
    ))}

    {/* Auto Reports Card */}
    <motion.g variants={itemVariants}>
      <rect x={270} y={215} width={280} height={70} rx={12} fill="#1E2E44" />
      <text x={295} y={247} fill="white" fontSize="15" fontWeight="700">Auto Reports</text>
      <text x={295} y={267} fill="#9FB3C8" fontSize="11" fontWeight="400">Quarterly • Export Ready</text>
    </motion.g>
  </motion.svg>
);






