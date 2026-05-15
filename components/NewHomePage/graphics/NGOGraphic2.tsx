"use client";

import { motion, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

export const NGOGraphic2 = (props: SVGMotionProps<SVGSVGElement>) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <motion.svg
      width="618" height="354" viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* Title */}
      <motion.text x="16" y="15" fontSize="13" fontWeight="700" fill="#ffffff" variants={itemVariants}>Quarterly Outcomes Report</motion.text>
      <motion.text x="16" y="30" fontSize="11" fill="#94a3b8" variants={itemVariants}>Auto-generated for Grant #4821</motion.text>

      {/* Grid Cards */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="45" width="188" height="60" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="65" fontSize="10" fill="#94a3b8">Clients served</text>
        <AnimatedCounter value={48} x="26" y="85" fontSize="18" fontWeight="800" fill="#4ade80" />
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="216" y="45" width="188" height="60" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="226" y="65" fontSize="10" fill="#94a3b8">Placed in jobs</text>
        <AnimatedCounter value={31} x="226" y="85" fontSize="18" fontWeight="800" fill="#60a5fa" />
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="16" y="110" width="188" height="60" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="130" fontSize="10" fill="#94a3b8">Avg. time to place</text>
        <AnimatedCounter value={22} suffix="d" x="26" y="150" fontSize="18" fontWeight="800" fill="#fbbf24" />
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="216" y="110" width="188" height="60" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="226" y="130" fontSize="10" fill="#94a3b8">Employer partners</text>
        <AnimatedCounter value={14} x="226" y="150" fontSize="18" fontWeight="800" fill="#a78bfa" />
      </motion.g>

      {/* Footer Note */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="185" width="388" height="40" rx="8" fill="#064e3b" stroke="#4ade80" strokeOpacity={0.15} />
        <text x="24" y="210" fontSize="11" fill="#ffffff">✓ Report meets standard quarterly funder reporting requirements</text>
      </motion.g>
    </motion.svg>
  );
};

