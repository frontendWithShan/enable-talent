"use client";

import { motion, type SVGMotionProps } from 'framer-motion';

export const GovernmentGraphic3 = (props: SVGMotionProps<SVGSVGElement>) => {
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
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const checkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 15 }
    }
  };

  return (
    <motion.svg 
      width="618" height="589" viewBox="0 60 420 400" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.text x="16" y="70" fontSize="13" fontWeight="700" fill="#ffffff" variants={itemVariants}>Compliance Status</motion.text>
      <motion.text x="16" y="85" fontSize="10" fill="#94a3b8" variants={itemVariants}>Auto-detected by deployment region</motion.text>

      {[
        { y: 100, label: "WCAG 2.1 AA Accessibility", sub: "Global", badge: "Compliant" },
        { y: 160, label: "GDPR / PIPEDA Data Privacy", sub: "EU / Canada", badge: "Compliant" },
        { y: 220, label: "AODA Employment Standard", sub: "Ontario", badge: "Compliant" },
        { y: 280, label: "ADA Title I Compliance", sub: "United States", badge: "Compliant" },
        { y: 340, label: "Program Outcome Reporting", sub: "All regions", badge: "On track", icon: "◉" }
      ].map((row, i) => (
        <motion.g key={i} variants={itemVariants}>
          <rect x="16" y={row.y} width="388" height="55" rx="10" fill="#030e1d" stroke="#1e293b" />
          <motion.text x="26" y={row.y + 22} fontSize="12" fill="#4ade80" variants={checkVariants}>{row.icon || "✓"}</motion.text>
          <text x="40" y={row.y + 22} fontSize="12" fontWeight="600" fill="#ffffff">{row.label}</text>
          <text x="40" y={row.y + 36} fontSize="9" fill="#94a3b8">{row.sub}</text>
          <rect x="300" y={row.y + 10} width="90" height="20" rx="4" fill="#064e3b" />
          <text x="345" y={row.y + 24} textAnchor="middle" fontSize="10" fontWeight="700" fill="#4ade80">{row.badge}</text>
        </motion.g>
      ))}

      <motion.g variants={itemVariants}>
        <rect x="16" y="405" width="388" height="40" rx="10" fill="#1e1b4b" stroke="#a78bfa" strokeOpacity={0.15} />
        <text x="26" y="430" fontSize="11" fill="#ffffff">🛡 Region-aware data sovereignty. SOC 2 Type II in progress.</text>
      </motion.g>
    </motion.svg>
  );
};
