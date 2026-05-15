"use client";

import { motion, type SVGMotionProps } from 'framer-motion';

export const MatchPreviewGraphic = (props: SVGMotionProps<SVGSVGElement>) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const, staggerChildren: 0.08 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const candidates = [
    { name: 'Ava Johnson',    sub: 'Toronto, ON',    skills: 92, acc: 88, match: '90%', flag: 'Strong match',           flagColor: '#22C55E', flagBg: '#14532D' },
    { name: 'Liam Chen',      sub: 'Vancouver, BC',  skills: 88, acc: 42, match: '71%', flag: 'Accommodation gap',      flagColor: '#F97316', flagBg: '#431407' },
    { name: 'Maya Patel',     sub: 'Calgary, AB',    skills: 76, acc: 71, match: '73%', flag: 'Minor gap',              flagColor: '#FECE6C', flagBg: '#422006' },
    { name: 'Noah Thompson',  sub: 'Ottawa, ON',     skills: 64, acc: 80, match: '84%', flag: 'Lower match',            flagColor: '#9CA3AF', flagBg: '#1F2937' },
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={618}
      height={412}
      viewBox="0 0 618 412"
      fill="none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      {...props}
    >
      {/* No outer background — transparent */}

      {/* No sidebar background */}

      {/* Sidebar: company icon */}
      <motion.rect x={14} y={14} width={28} height={28} rx={6} fill="#1E3A5F" variants={itemVariants} />
      <motion.text x={28} y={33} fill="#FECE6C" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="inherit" variants={itemVariants}>SYSTEM</motion.text>

      {/* Sidebar: company name */}
      <motion.text x={14} y={60} fill="white" fontSize="9" fontWeight="700" fontFamily="inherit" variants={itemVariants}>Customer Support</motion.text>
      <motion.text x={14} y={72} fill="#6B7280" fontSize="7.5" fontFamily="inherit" variants={itemVariants}>Full-time • Remote</motion.text>

      {/* Sidebar steps */}
      {[
        { label: 'Create Role',     y: 100, done: true },
        { label: 'Role Details',    y: 120, done: true },
        { label: 'Accessibility',   y: 140, done: true },
        { label: 'Review & Publish',y: 160, active: true },
        { label: 'Live',            y: 180, done: false },
      ].map((step) => (
        <motion.g key={step.label} variants={itemVariants}>
          <circle cx={22} cy={step.y} r={5}
            fill={step.active ? '#FECE6C' : step.done ? '#22C55E' : '#1E3A5F'}
          />
          <text x={32} y={step.y + 4} fill={step.active ? '#FECE6C' : step.done ? '#D1FAE5' : '#6B7280'}
            fontSize="8" fontFamily="inherit" fontWeight={step.active ? '700' : '400'}
          >{step.label}</text>
        </motion.g>
      ))}

      {/* Sidebar: bottom note */}
      <motion.text x={14} y={340} fill="#6B7280" fontSize="7" fontFamily="inherit" variants={itemVariants}>Review matches before</motion.text>
      <motion.text x={14} y={350} fill="#6B7280" fontSize="7" fontFamily="inherit" variants={itemVariants}>going live. Gap flags</motion.text>
      <motion.text x={14} y={360} fill="#6B7280" fontSize="7" fontFamily="inherit" variants={itemVariants}>highlight where a</motion.text>
      <motion.text x={14} y={370} fill="#6B7280" fontSize="7" fontFamily="inherit" variants={itemVariants}>conversation is</motion.text>
      <motion.text x={14} y={380} fill="#6B7280" fontSize="7" fontFamily="inherit" variants={itemVariants}>recommended.</motion.text>

      {/* ── Main content area ── */}

      {/* Header row */}
      <motion.text x={144} y={32} fill="white" fontSize="14" fontWeight="700" fontFamily="inherit" variants={itemVariants}>Review and Publish</motion.text>
      <motion.text x={144} y={46} fill="#6B7280" fontSize="8" fontFamily="inherit" variants={itemVariants}>Here's how candidates are estimated to match with this role.</motion.text>

      {/* PRE PUBLISH MATCH PREVIEW badge */}
      <motion.rect x={430} y={14} width={174} height={18} rx={4} fill="#FECE6C" variants={itemVariants} />
      <motion.text x={517} y={26} fill="#111827" fontSize="7.5" fontWeight="800" fontFamily="inherit" textAnchor="middle" letterSpacing="0.5" variants={itemVariants}>PRE PUBLISH MATCH PREVIEW</motion.text>

      {/* Section header */}
      <motion.text x={144} y={68} fill="white" fontSize="10" fontWeight="600" fontFamily="inherit" variants={itemVariants}>Top Estimated Matches</motion.text>

      {/* Legend dots */}
      <motion.circle cx={340} cy={64} r={3} fill="#22C55E" variants={itemVariants} />
      <motion.text x={346} y={68} fill="#9CA3AF" fontSize="7.5" fontFamily="inherit" variants={itemVariants}>Skills Score</motion.text>
      <motion.circle cx={410} cy={64} r={3} fill="#FECE6C" variants={itemVariants} />
      <motion.text x={416} y={68} fill="#9CA3AF" fontSize="7.5" fontFamily="inherit" variants={itemVariants}>Accommodation Score</motion.text>

      {/* Table header */}
      <motion.rect x={136} y={74} width={474} height={1} fill="#1E3A5F" variants={itemVariants} />
      {['Candidate','Skills Score','Accommodation Score','Match','Gap Flags'].map((h, i) => (
        <motion.text key={h} x={[144, 290, 370, 460, 505][i]} y={88} fill="#6B7280" fontSize="7.5" fontFamily="inherit" variants={itemVariants}>{h}</motion.text>
      ))}
      <motion.rect x={136} y={92} width={474} height={1} fill="#1E3A5F" variants={itemVariants} />

      {/* Candidate rows */}
      {candidates.map((c, i) => {
        const y = 105 + i * 58;
        return (
          <motion.g key={c.name} variants={rowVariants}>
            {/* Row bg for active */}
            {i === 0 && <rect x={136} y={y - 10} width={474} height={52} rx={6} fill="#0F2236" />}
            {/* Avatar circle */}
            <circle cx={160} cy={y + 16} r={14} fill="#1E3A5F" />
            <text x={160} y={y + 21} fill="#FECE6C" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="inherit">
              {c.name.split(' ').map(n => n[0]).join('')}
            </text>
            {/* Name + location */}
            <text x={182} y={y + 13} fill="white" fontSize="9" fontWeight="600" fontFamily="inherit">{c.name}</text>
            <text x={182} y={y + 25} fill="#6B7280" fontSize="7.5" fontFamily="inherit">{c.sub}</text>
            {/* Skills score circle */}
            <circle cx={312} cy={y + 16} r={14} fill="#1E3A5F" />
            <text x={312} y={y + 21} fill="white" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="inherit">{c.skills}</text>
            {/* Acc score circle */}
            <circle cx={400} cy={y + 16} r={14} fill="#1E3A5F" />
            <text x={400} y={y + 21} fill="white" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="inherit">{c.acc}</text>
            {/* Match % */}
            <text x={470} y={y + 21} fill="#FECE6C" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="inherit">{c.match}</text>
            {/* Gap flag badge */}
            <rect x={498} y={y + 6} width={102} height={20} rx={4} fill={c.flagBg} />
            <text x={549} y={y + 20} fill={c.flagColor} fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="inherit">{c.flag}</text>
            {/* Row divider */}
            {i < 3 && <rect x={136} y={y + 42} width={474} height={1} fill="#1E3A5F" />}
          </motion.g>
        );
      })}

      {/* No bottom bar background */}
      <motion.text x={144} y={393} fill="#6B7280" fontSize="8" fontFamily="inherit" variants={itemVariants}>Full visibility. Confident decisions.</motion.text>
      <motion.text x={144} y={404} fill="#6B7280" fontSize="7" fontFamily="inherit" variants={itemVariants}>You can edit scores anytime before publishing.</motion.text>

      {/* Back button */}
      <motion.rect x={440} y={374} width={48} height={24} rx={6} fill="#1E3A5F" variants={itemVariants} />
      <motion.text x={464} y={390} fill="white" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="inherit" variants={itemVariants}>Back</motion.text>

      {/* Publish Role button */}
      <motion.rect x={496} y={374} width={100} height={24} rx={6} fill="#FECE6C" variants={itemVariants} />
      <motion.text x={546} y={390} fill="#111827" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="inherit" variants={itemVariants}>↑ Publish Role</motion.text>
    </motion.svg>
  );
};
