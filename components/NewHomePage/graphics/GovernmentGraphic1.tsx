"use client";

import { motion, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

export const GovernmentGraphic1 = (props: SVGMotionProps<SVGSVGElement>) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
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

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" as const, delay: 0.8 }
    }
  };


  return (
    <motion.svg
      width="618" height="471" viewBox="0 0 420 330" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.text x="16" y="20" fontSize="13" fontWeight="700" fill="#ffffff" variants={itemVariants}>Program Overview</motion.text>
      <motion.text x="16" y="36" fontSize="11" fill="#94a3b8" variants={itemVariants}>Youth Workforce Inclusion Pilot · Region: Select ▾</motion.text>

      <motion.g variants={itemVariants}>
        <rect x="16" y="55" width="120" height="70" rx="10" fill="#030e1d" stroke="#1e293b" />
        <AnimatedCounter value={2} prefix="$" suffix="M" x="76" y="83" textAnchor="middle" fontSize="18" fontWeight="800" fill="#a78bfa" />
        <text x="76" y="103" textAnchor="middle" fontSize="9" fill="#94a3b8">Budget allocated</text>
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="150" y="55" width="120" height="70" rx="10" fill="#030e1d" stroke="#1e293b" />
        <AnimatedCounter value={340} x="210" y="83" textAnchor="middle" fontSize="18" fontWeight="800" fill="#60a5fa" />
        <text x="210" y="103" textAnchor="middle" fontSize="9" fill="#94a3b8">Participants</text>
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="284" y="55" width="120" height="70" rx="10" fill="#030e1d" stroke="#1e293b" />
        <AnimatedCounter value={186} x="344" y="83" textAnchor="middle" fontSize="18" fontWeight="800" fill="#4ade80" />
        <text x="344" y="103" textAnchor="middle" fontSize="9" fill="#94a3b8">Placed</text>
      </motion.g>

      <defs>
        <linearGradient id="govGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C4DFF" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#7C4DFF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.g
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.path 
          d="M16,230 Q56,220 96,210 Q136,200 176,190 Q216,180 256,170 Q296,165 336,160 Q376,155 416,150"
          fill="none" stroke="#a78bfa" strokeWidth={3.5}
          strokeLinecap="round"
          variants={pathVariants}
        />
        <motion.path 
          d="M16,230 Q56,220 96,210 Q136,200 176,190 Q216,180 256,170 Q296,165 336,160 Q376,155 416,150 L416,250 L16,250 Z"
          fill="url(#govGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        />
      </motion.g>

      <motion.text x="210" y="290" textAnchor="middle" fontSize="10" fill="#94a3b8" variants={itemVariants}>
        Placement rate trending upward — 54.7% vs 33% national baseline
      </motion.text>
    </motion.svg>
  );
};

