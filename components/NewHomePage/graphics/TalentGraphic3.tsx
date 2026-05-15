"use client";

import { motion, type SVGMotionProps } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export const TalentGraphic3 = (props: SVGMotionProps<SVGSVGElement>) => (
  <motion.svg 
    width="618" height="456" viewBox="0 50 420 310" xmlns="http://www.w3.org/2000/svg" {...props}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
  >
    <motion.g transition={{ staggerChildren: 0.1 }}>
      <motion.text variants={itemVariants} x="16" y="70" fontSize="13" fontWeight="700" fill="#ffffff">Disclosure Control</motion.text>
      <motion.text variants={itemVariants} x="16" y="88" fontSize="11" fill="#94a3b8">You decide what employers see. Always.</motion.text>
      
      {[
        { y: 110, title: "Accommodation needs", desc: "Share types of support you need", active: true },
        { y: 164, title: "Disability type", desc: "Specific diagnosis or category", active: false },
        { y: 218, title: "Support history", desc: "Previous workplace adjustments", active: true },
        { y: 272, title: "Medical details", desc: "Clinical documentation", active: false }
      ].map((item, i) => (
        <motion.g key={i} variants={itemVariants}>
          <rect 
            x="16" y={item.y} width="388" height="48" rx="10" 
            fill={item.active ? "#14532d" : "#0f172a"} 
            stroke={item.active ? "#4ade80" : "#1e293b"} 
          />
          <text x="24" y={item.y + 20} fontSize="12" fontWeight="600" fill="#ffffff">{item.title}</text>
          <text x="24" y={item.y + 34} fontSize="10" fill="#94a3b8">{item.desc}</text>
          
          <rect x="360" y={item.y + 14} width="36" height="20" rx="10" fill={item.active ? "#4ade80" : "#475569"} />
          <motion.circle 
            cx={item.active ? 386 : 368} cy={item.y + 24} r="8" fill={item.active ? "#ffffff" : "#cbd5e1"} 
            initial={false}
            animate={{ cx: item.active ? 386 : 368 }}
            transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
          />
        </motion.g>
      ))}
    </motion.g>
  </motion.svg>
);
