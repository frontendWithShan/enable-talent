"use client";

import { motion, type SVGMotionProps } from 'framer-motion';

const barVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export const UniversityBars = (props: SVGMotionProps<SVGSVGElement>) => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 554 234"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      whileInView="visible"
      preserveAspectRatio="none"
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    >
      {/* Grid Lines (Full Width) */}
      <g opacity="0.1">
        <line x1="0" y1="40" x2="554" y2="40" stroke="#182434" strokeDasharray="4 4" />
        <line x1="0" y1="80" x2="554" y2="80" stroke="#182434" strokeDasharray="4 4" />
        <line x1="0" y1="120" x2="554" y2="120" stroke="#182434" strokeDasharray="4 4" />
        <line x1="0" y1="160" x2="554" y2="160" stroke="#182434" strokeDasharray="4 4" />
        <line x1="0" y1="200" x2="554" y2="200" stroke="#182434" strokeDasharray="4 4" />
      </g>

      {/* Bars anchored to the very bottom (y=234) - Shifted Right */}
      <motion.g variants={barVariants} style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}>
        {/* NGO Bar */}
        <rect x="130" y="80" width="85" height="154" fill="#182434" rx="4" />
        {/* Government Bar */}
        <rect x="240" y="140" width="85" height="94" fill="#182434" rx="4" />
        {/* University Bar (Highlighted - TARGET) */}
        <rect x="350" y="20" width="85" height="214" fill="#FECE6C" rx="4" />
        {/* Talent Bar */}
        <rect x="460" y="130" width="85" height="104" fill="#182434" rx="4" />
      </motion.g>

      {/* "TARGET" label centered over yellow bar */}
      <motion.text
        x="392.5"
        y="12"
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="#030E1D"
        variants={itemVariants}
      >
        TARGET
      </motion.text>

      {/* User Provided Line Graph Path - Horizontally Scaled and Vertically Constrained */}
      <motion.g>
        <motion.path
          d="M1.5 182.794C5.54005 179.87 15.6712 178.895 23.8756 198.388C34.1311 222.755 51.8786 223.188 55.5744 206.186C60.236 184.741 58.3714 115.54 72.3562 117.489C79.805 118.528 81.6794 141.856 81.6794 161.349C81.6794 180.843 86.2175 206.186 100.326 206.186C112.446 206.186 115.243 185.716 118.972 168.172C122.701 150.628 134.821 152.577 134.821 174.02C134.821 200.263 134.821 232.5 149.739 232.5C175.91 232.5 169.317 109.695 174.911 19.0499C176.535 -7.26564 199.151 -10.189 200.084 54.139C201.116 125.388 205.678 161.347 206.61 168.172C207.542 174.997 212.204 191.566 226.189 173.048C237.376 158.233 246.116 164.274 248.564 173.048C255.091 196.438 259.006 220.61 270.94 219.83C286.789 218.794 287.722 125.287 297.045 63.8824C299.413 48.2882 313.827 48.2882 313.827 73.6296C313.827 100.143 311.962 137.957 323.15 148.679C329.062 154.345 336.435 152.578 339.931 137.957C342.169 128.6 344.593 63.8824 348.322 30.7437C352.052 6.3774 366.036 11.2503 369.766 30.7437C374.987 58.0349 385.687 163.816 408.923 137.957C437.825 105.794 452.412 130.204 458.336 101.895C464.862 70.7056 466.727 48.2882 495.629 63.8824C524.244 79.3223 541.312 67.4562 552.5 63.8824"
          stroke="url(#paint0_linear_2067_432)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(172.5, 85) scale(0.69, 0.6) translate(-1.5, 0)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.g>

      <defs>
        <linearGradient id="paint0_linear_2067_432" x1="536.651" y1="64.8538" x2="29.7481" y2="295.753" gradientUnits="userSpaceOnUse">
          <stop stopColor="#01B574" />
          <stop offset="1" stopColor="#01B574" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};
