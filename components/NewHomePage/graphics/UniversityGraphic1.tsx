"use client";

import { motion, type SVGMotionProps } from 'framer-motion';

export const UniversityGraphic1 = (props: SVGMotionProps<SVGSVGElement>) => {
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <motion.svg
      width="618" height="441" viewBox="0 60 420 300" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      {...props}
    >
      {/* Header */}
      <motion.g variants={itemVariants}>
        <text x="16" y="70" fontSize="13" fontWeight="700" fill="#ffffff">Job Moderation Queue</text>
        <text x="16" y="88" fontSize="11" fill="#94a3b8">3 postings awaiting review</text>
      </motion.g>

      {/* Card 1: Junior Developer */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="100" width="388" height="60" rx="10" fill="#0f172a" stroke="#1e293b" />
        <text x="24" y="120" fontSize="12" fontWeight="700" fill="#ffffff">Junior Developer</text>
        <text x="150" y="120" fontSize="12" fill="#94a3b8">· Bridgepoint Software</text>
        <rect x="320" y="108" width="70" height="18" rx="4" fill="#fbbf24" />
        <text x="355" y="121" textAnchor="middle" fontSize="9" fontWeight="700" fill="#451a03">Pending</text>
        <text x="24" y="142" fontSize="10" fill="#fbbf24">⚠ Missing accessibility info</text>
      </motion.g>

      {/* Card 2: Marketing Intern */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="170" width="388" height="44" rx="10" fill="#0f172a" stroke="#1e293b" />
        <text x="24" y="190" fontSize="12" fontWeight="700" fill="#ffffff">Marketing Intern</text>
        <text x="140" y="190" fontSize="12" fill="#94a3b8">· Greenline Ventures</text>
        <rect x="320" y="178" width="70" height="18" rx="4" fill="#14532d" />
        <text x="355" y="191" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4ade80">Approved</text>
      </motion.g>

      {/* Card 3: Research Assistant */}
      <motion.g variants={itemVariants}>
        <rect x="16" y="220" width="388" height="60" rx="10" fill="#0f172a" stroke="#1e293b" />
        <text x="24" y="240" fontSize="12" fontWeight="700" fill="#ffffff">Research Assistant</text>
        <text x="150" y="240" fontSize="12" fill="#94a3b8">· Pinnacle Research</text>
        <rect x="320" y="228" width="70" height="18" rx="4" fill="#7f1d1d" />
        <text x="355" y="241" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f87171">Rejected</text>
        <text x="24" y="262" fontSize="10" fill="#f87171">⚠ No accommodation plan</text>
      </motion.g>
    </motion.svg>
  );
};

