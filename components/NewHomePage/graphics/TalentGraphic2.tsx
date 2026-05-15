"use client";

import { motion, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export const TalentGraphic2 = (props: SVGMotionProps<SVGSVGElement>) => (
  <motion.svg
    width="618" height="692" viewBox="0 50 420 470" xmlns="http://www.w3.org/2000/svg" {...props}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
  >
    <motion.g transition={{ staggerChildren: 0.1 }}>
      <motion.text variants={itemVariants} x="16" y="70" fontSize="14" fontWeight="700" fill="#ffffff">Senior Product Designer</motion.text>
      <motion.text variants={itemVariants} x="16" y="88" fontSize="11" fill="#94a3b8">Maplewood Inc. · Remote</motion.text>

      <motion.g variants={itemVariants} className="flex gap-2">
        <rect x="16" y="100" width="130" height="20" rx="4" fill="#0f172a" stroke="#1e293b" />
        <text x="20" y="114" fontSize="9" fill="#94a3b8">Remote, flexible hours</text>
        <rect x="150" y="100" width="90" height="20" rx="4" fill="#0f172a" stroke="#1e293b" />
        <text x="154" y="114" fontSize="9" fill="#94a3b8">2-3 years exp</text>
        <rect x="244" y="100" width="140" height="20" rx="4" fill="#0f172a" stroke="#1e293b" />
        <text x="248" y="114" fontSize="9" fill="#94a3b8">CAD 2,500 - 3,800/mo</text>
      </motion.g>

      <motion.g variants={itemVariants} className="flex gap-4">
        <rect x="16" y="140" width="120" height="70" rx="10" fill="#0f172a" stroke="#1e293b" />
        <AnimatedCounter value={94} suffix="%" x="76" y="170" textAnchor="middle" fontSize="20" fontWeight="800" fill="#4ade80" />
        <text x="76" y="185" textAnchor="middle" fontSize="9" fill="#94a3b8">Overall match</text>

        <rect x="150" y="140" width="120" height="70" rx="10" fill="#0f172a" stroke="#1e293b" />
        <AnimatedCounter value={88} suffix="%" x="210" y="170" textAnchor="middle" fontSize="20" fontWeight="800" fill="#60a5fa" />
        <text x="210" y="185" textAnchor="middle" fontSize="9" fill="#94a3b8">Skills fit</text>

        <rect x="284" y="140" width="120" height="70" rx="10" fill="#0f172a" stroke="#1e293b" />
        <AnimatedCounter value={94} suffix="%" x="344" y="170" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fbbf24" />
        <text x="344" y="185" textAnchor="middle" fontSize="9" fill="#94a3b8">Workplace fit</text>
      </motion.g>

      <motion.g variants={itemVariants}>
        <rect x="16" y="230" width="388" height="200" rx="10" fill="none" stroke="none" />
        <text x="24" y="250" fontSize="12" fontWeight="700" fill="#ffffff">How this role fits your needs</text>
        <AnimatedCounter value={94} suffix="%" x="380" y="250" fontSize="14" fontWeight="800" fill="#fbbf24" textAnchor="end" />

        {[
          { y: 270, text: "Fully flexible hours — fits your schedule" },
          { y: 295, text: "Async communication — no video calls" },
          { y: 320, text: "Focused work — minimal task switching" },
          { y: 345, text: "Screen-reader compatible tools" },
          { y: 370, text: "Open to accommodation discussion" }
        ].map((item, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <circle cx="26" cy={item.y} r="6" fill="#14532d" />
            <text x="26" y={item.y + 3} fontSize="8" textAnchor="middle" fill="#4ade80">✓</text>
            <text x="40" y={item.y + 3} fontSize="11" fill="#ffffff">{item.text}</text>
          </motion.g>
        ))}
      </motion.g>

      <motion.text variants={itemVariants} x="16" y="460" fontSize="9" fill="#94a3b8" fontStyle="italic">Match is based on your profile. Update to improve.</motion.text>
    </motion.g>
  </motion.svg>
);

