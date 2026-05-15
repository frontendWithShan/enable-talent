"use client";

import { motion, type SVGMotionProps } from 'framer-motion';

export const UniversityGraphic3 = (props: SVGMotionProps<SVGSVGElement>) => {
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

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 15 }
    }
  };

  return (
    <motion.svg
      width="618" height="441" viewBox="0 60 420 300" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.text x="16" y="70" fontSize="13" fontWeight="700" fill="#ffffff" variants={itemVariants}>Employer Gateway</motion.text>
      <motion.text x="16" y="88" fontSize="11" fill="#94a3b8" variants={itemVariants}>Invite-only. No open sign-up.</motion.text>
      <motion.text x="16" y="102" fontSize="11" fill="#94a3b8" variants={itemVariants}>You decide who reaches your students.</motion.text>

      {/* Row 1 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="120" width="388" height="50" rx="10" fill="#0f172a" stroke="#1e293b" />
        <rect x="24" y="130" width="28" height="28" rx="8" fill="#334155" />
        <text x="38" y="147" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">M</text>
        <text x="60" y="142" fontSize="12" fontWeight="600" fill="#ffffff">Meridian Tech</text>
        <text x="60" y="155" fontSize="9" fill="#4ade80">✓ Accessibility verified</text>
        <motion.g variants={badgeVariants}>
          <rect x="320" y="130" width="70" height="18" rx="4" fill="#14532d" />
          <text x="355" y="143" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4ade80">Active</text>
        </motion.g>
      </motion.g>

      {/* Row 2 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="176" width="388" height="50" rx="10" fill="#0f172a" stroke="#1e293b" />
        <rect x="24" y="186" width="28" height="28" rx="8" fill="#334155" />
        <text x="38" y="203" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">C</text>
        <text x="60" y="198" fontSize="12" fontWeight="600" fill="#ffffff">Clearbridge Advisory</text>
        <motion.g variants={badgeVariants}>
          <rect x="300" y="186" width="100" height="18" rx="4" fill="#fbbf24" />
          <text x="350" y="199" textAnchor="middle" fontSize="9" fontWeight="700" fill="#451a03">Pending review</text>
        </motion.g>
      </motion.g>

      {/* Row 3 */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="232" width="388" height="50" rx="10" fill="#0f172a" stroke="#1e293b" />
        <rect x="24" y="242" width="28" height="28" rx="8" fill="#334155" />
        <text x="38" y="259" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">S</text>
        <text x="60" y="254" fontSize="12" fontWeight="600" fill="#ffffff">Sentinel Cyber</text>
        <text x="60" y="267" fontSize="9" fill="#4ade80">✓ Accessibility verified</text>
        <motion.g variants={badgeVariants}>
          <rect x="320" y="242" width="70" height="18" rx="4" fill="#14532d" />
          <text x="355" y="255" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4ade80">Active</text>
        </motion.g>
      </motion.g>

      <motion.text x="210" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="#60a5fa" variants={itemVariants}>+ Invite new employer</motion.text>
    </motion.svg>
  );
};
