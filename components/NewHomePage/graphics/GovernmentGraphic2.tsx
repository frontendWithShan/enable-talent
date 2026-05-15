"use client";

import { motion, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

export const GovernmentGraphic2 = (props: SVGMotionProps<SVGSVGElement>) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: "var(--target-width)",
      transition: { duration: 0.8, ease: "easeInOut" as const }
    }
  };

  return (
    <motion.svg
      width="420" height="260" viewBox="0 60 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.text x="16" y="70" fontSize="13" fontWeight="700" fill="#ffffff" variants={itemVariants}>Funding Flow</motion.text>
      <motion.text x="16" y="85" fontSize="11" fill="#94a3b8" variants={itemVariants}>Track every dollar from allocation to outcome</motion.text>

      {/* Row 1 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="100" width="388" height="65" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="120" fontSize="12" fontWeight="700" fill="#ffffff">YMCA Regional</text>
        <AnimatedCounter value={48} suffix=" placed" x="380" y="120" textAnchor="end" fontSize="10" fontWeight="600" fill="#4ade80" />
        <text x="26" y="138" fontSize="10" fill="#94a3b8">$285K of $340K</text>
        <AnimatedCounter value={84} suffix="%" x="380" y="138" textAnchor="end" fontSize="10" fontWeight="600" fill="#a78bfa" />
        <rect x="26" y="150" width="360" height="4" rx="2" fill="#1e293b" />
        <motion.rect x="26" y="150" height="4" rx="2" fill="#a78bfa" style={{ "--target-width": "302px" } as any} variants={barVariants} />
      </motion.g>

      {/* Row 2 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="170" width="388" height="65" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="190" fontSize="12" fontWeight="700" fill="#ffffff">Pathways Community Services</text>
        <AnimatedCounter value={37} suffix=" placed" x="380" y="190" textAnchor="end" fontSize="10" fontWeight="600" fill="#4ade80" />
        <text x="26" y="208" fontSize="10" fill="#94a3b8">$210K of $280K</text>
        <AnimatedCounter value={75} suffix="%" x="380" y="208" textAnchor="end" fontSize="10" fontWeight="600" fill="#a78bfa" />
        <rect x="26" y="220" width="360" height="4" rx="2" fill="#1e293b" />
        <motion.rect x="26" y="220" height="4" rx="2" fill="#a78bfa" style={{ "--target-width": "270px" } as any} variants={barVariants} />
      </motion.g>

      {/* Row 3 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="240" width="388" height="65" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="260" fontSize="12" fontWeight="700" fill="#ffffff">Allied Ability Services</text>
        <AnimatedCounter value={29} suffix=" placed" x="380" y="260" textAnchor="end" fontSize="10" fontWeight="600" fill="#4ade80" />
        <text x="26" y="278" fontSize="10" fill="#94a3b8">$155K of $180K</text>
        <AnimatedCounter value={86} suffix="%" x="380" y="278" textAnchor="end" fontSize="10" fontWeight="600" fill="#a78bfa" />
        <rect x="26" y="290" width="360" height="4" rx="2" fill="#1e293b" />
        <motion.rect x="26" y="290" height="4" rx="2" fill="#a78bfa" style={{ "--target-width": "310px" } as any} variants={barVariants} />
      </motion.g>
    </motion.svg>
  );
};

