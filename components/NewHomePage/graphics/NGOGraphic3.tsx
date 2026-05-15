"use client";

import { motion, type SVGMotionProps } from 'framer-motion';

export const NGOGraphic3 = (props: SVGMotionProps<SVGSVGElement>) => {
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

  return (
    <motion.svg 
      width="618" height="353" viewBox="0 60 420 240" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* Title */}
      <motion.text x="16" y="70" fontSize="13" fontWeight="700" fill="#ffffff" variants={itemVariants}>Direct Employer Pipeline</motion.text>
      <motion.text x="16" y="85" fontSize="11" fill="#94a3b8" variants={itemVariants}>Manage relationships without spreadsheets</motion.text>

      {/* Row 1 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="100" width="388" height="55" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="120" fontSize="12" fontWeight="700" fill="#ffffff">City of Lakeview</text>
        <text x="26" y="135" fontSize="10" fill="#94a3b8">3 open · 7 placed</text>
        <rect x="320" y="110" width="60" height="20" rx="4" fill="#064e3b" />
        <text x="350" y="124" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4ade80">Strong</text>
      </motion.g>

      {/* Row 2 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="160" width="388" height="55" rx="10" fill="#030e1d" stroke="#1e293b" />
        <text x="26" y="180" fontSize="12" fontWeight="700" fill="#ffffff">Clearbridge Advisory</text>
        <text x="26" y="195" fontSize="10" fill="#94a3b8">1 open · 4 placed</text>
        <rect x="320" y="170" width="60" height="20" rx="4" fill="#064e3b" />
        <text x="350" y="184" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4ade80">Strong</text>
      </motion.g>

      {/* Row 3 - Additional data if needed, but I'll stick to the viewed ones */}
    </motion.svg>
  );
};
