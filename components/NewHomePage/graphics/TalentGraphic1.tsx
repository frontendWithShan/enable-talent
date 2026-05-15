"use client";

import { motion, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const TalentGraphic1 = (props: SVGMotionProps<SVGSVGElement>) => (
  <motion.svg
    width="618" height="456" viewBox="0 50 420 310" xmlns="http://www.w3.org/2000/svg" {...props}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
  >
    <motion.g transition={{ staggerChildren: 0.15 }}>
      <motion.g variants={cardVariants}>
        <rect x="16" y="56" width="90" height="20" rx="10" fill="#451a03" stroke="#f5a623" />
        <text x="22" y="70" fontSize="10" fill="#fbbf24">✓ Remote-first</text>
      </motion.g>

      <motion.g variants={cardVariants}>
        <rect x="110" y="56" width="90" height="20" rx="10" fill="#451a03" stroke="#f5a623" />
        <text x="116" y="70" fontSize="10" fill="#fbbf24">✓ Low-sensory</text>
      </motion.g>

      <motion.g variants={cardVariants} transition={{ duration: 0.5 }}>
        <rect x="16" y="90" width="388" height="60" rx="12" fill="none" stroke="#f5a623" />
        <text x="24" y="110" fontSize="13" fontWeight="bold" fill="#ffffff">UX Researcher</text>
        <text x="24" y="124" fontSize="11" fill="#94a3b8">Meridian Tech</text>
        <AnimatedCounter value={94} suffix="%" x="350" y="115" fontSize="20" fontWeight="bold" fill="#4ade80" textAnchor="end" />
        <text x="350" y="130" fontSize="9" fill="#94a3b8" textAnchor="end">match</text>
      </motion.g>

      <motion.g variants={cardVariants} transition={{ duration: 0.5 }}>
        <rect x="16" y="160" width="388" height="60" rx="12" fill="#0f172a" stroke="#1e293b" />
        <text x="24" y="180" fontSize="13" fontWeight="bold" fill="#ffffff">Data Analyst</text>
        <text x="24" y="194" fontSize="11" fill="#94a3b8">Lakeshore Financial</text>
        <AnimatedCounter value={87} suffix="%" x="350" y="185" fontSize="20" fontWeight="bold" fill="#60a5fa" textAnchor="end" />
        <text x="350" y="200" fontSize="9" fill="#94a3b8" textAnchor="end">match</text>
      </motion.g>

      <motion.g variants={cardVariants} transition={{ duration: 0.5 }}>
        <rect x="16" y="230" width="388" height="60" rx="12" fill="#0f172a" stroke="#1e293b" />
        <text x="24" y="250" fontSize="13" fontWeight="bold" fill="#ffffff">Content Writer</text>
        <text x="24" y="264" fontSize="11" fill="#94a3b8">NorthPoint Capital</text>
        <AnimatedCounter value={82} suffix="%" x="350" y="255" fontSize="20" fontWeight="bold" fill="#fbbf24" textAnchor="end" />
        <text x="350" y="270" fontSize="9" fill="#94a3b8" textAnchor="end">match</text>
      </motion.g>
    </motion.g>
  </motion.svg>
);

