"use client";

import { motion, type SVGMotionProps } from 'framer-motion';

export const NGOGraphic1 = (props: SVGMotionProps<SVGSVGElement>) => {
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
      width="618" height="347" viewBox="0 50 420 235" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* Title Section */}
      <motion.text x="16" y="70" fontSize="13" fontWeight="700" fill="#ffffff" variants={itemVariants}>Active Caseload</motion.text>
      <motion.text x="16" y="85" fontSize="11" fill="#94a3b8" variants={itemVariants}>24 clients · 8 pending placement</motion.text>

      {/* Live Badge */}
      <motion.g variants={itemVariants}>
        <rect x="320" y="60" width="70" height="20" rx="10" fill="#064e3b" />
        <text x="355" y="74" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4ade80">● Live</text>
      </motion.g>

      {/* Card 1 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="100" width="388" height="60" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="120" fontSize="12" fontWeight="700" fill="#ffffff">Alex R.</text>
        <text x="85" y="120" fontSize="11" fill="#94a3b8">· Matched</text>
        <text x="380" y="120" textAnchor="end" fontSize="10" fill="#4ade80" fontWeight="600">Lakeshore Financial</text>
        <rect x="26" y="135" width="360" height="4" rx="2" fill="#1e293b" />
        <motion.rect x="26" y="135" height="4" rx="2" fill="#4ade80" style={{ "--target-width": "288px" } as any} variants={barVariants} />
      </motion.g>

      {/* Card 2 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="165" width="388" height="60" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="185" fontSize="12" fontWeight="700" fill="#ffffff">Michelle S.</text>
        <text x="115" y="185" fontSize="11" fill="#94a3b8">· Interviewing</text>
        <text x="380" y="185" textAnchor="end" fontSize="10" fill="#60a5fa" fontWeight="600">Meridian Tech</text>
        <rect x="26" y="200" width="360" height="4" rx="2" fill="#1e293b" />
        <motion.rect x="26" y="200" height="4" rx="2" fill="#60a5fa" style={{ "--target-width": "216px" } as any} variants={barVariants} />
      </motion.g>

      {/* Card 3 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="230" width="388" height="60" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="250" fontSize="12" fontWeight="700" fill="#ffffff">David K.</text>
        <text x="95" y="250" fontSize="11" fill="#94a3b8">· Job-ready</text>
        <text x="380" y="250" textAnchor="end" fontSize="10" fill="#fbbf24" fontWeight="600">Seeking</text>
        <rect x="26" y="265" width="360" height="4" rx="2" fill="#1e293b" />
        <motion.rect x="26" y="265" height="4" rx="2" fill="#fbbf24" style={{ "--target-width": "144px" } as any} variants={barVariants} />
      </motion.g>
    </motion.svg>
  );
};
