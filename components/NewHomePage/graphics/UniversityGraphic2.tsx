"use client";

import { motion, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

export const UniversityGraphic2 = (props: SVGMotionProps<SVGSVGElement>) => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <motion.svg 
      width="618" height="353" viewBox="0 60 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.text x="16" y="70" fontSize="13" fontWeight="700" fill="#ffffff" variants={itemVariants}>NACE First-Destination Survey</motion.text>
      <motion.text x="16" y="88" fontSize="11" fill="#94a3b8" variants={itemVariants}>Auto-populated from platform activity</motion.text>
      
      <motion.g variants={itemVariants}>
        <rect x="16" y="100" width="120" height="70" rx="10" fill="#0f172a" stroke="#1e293b" />
        <AnimatedCounter value={92} suffix="%" x="76" y="130" textAnchor="middle" fontSize="18" fontWeight="800" fill="#4ade80" />
        <text x="76" y="148" textAnchor="middle" fontSize="9" fill="#94a3b8">Knowledge rate</text>
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="150" y="100" width="120" height="70" rx="10" fill="#0f172a" stroke="#1e293b" />
        <AnimatedCounter value={67} suffix="%" x="210" y="130" textAnchor="middle" fontSize="18" fontWeight="800" fill="#60a5fa" />
        <text x="210" y="148" textAnchor="middle" fontSize="9" fill="#94a3b8">Employed</text>
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="284" y="100" width="120" height="70" rx="10" fill="#0f172a" stroke="#1e293b" />
        <AnimatedCounter value={52} prefix="$" suffix="K" x="344" y="130" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fbbf24" />
        <text x="344" y="148" textAnchor="middle" fontSize="9" fill="#94a3b8">Avg. salary</text>
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="16" y="190" width="388" height="40" rx="8" fill="#1e3a8a" stroke="#3b82f6" />
        <text x="26" y="215" fontSize="12">📊</text>
        <text x="46" y="215" fontSize="11" fill="#ffffff" fontWeight="500">Compliant with NACE Class of 2026 standards</text>
      </motion.g>
    </motion.svg>
  );
};


