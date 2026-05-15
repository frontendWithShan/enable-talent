"use client";

import { motion, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

export const Backgroundshadow2 = (props: SVGMotionProps<SVGSVGElement>) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={400}
      height={171}
      viewBox="0 0 400 171"
      fill="none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      {...props}
    >
      <g filter="url(#Background+Shadow_(2)_svg__a)">
        <motion.rect
          width={395}
          height={167}
          x={2}
          y={1}
          fill="#182434"
          rx={16}
          shapeRendering="crispEdges"
          variants={itemVariants}
        />
        <motion.rect
          width={32}
          height={36}
          x={26}
          y={25}
          fill="#fff"
          fillOpacity={0.1}
          rx={4}
          variants={itemVariants}
        />
        <motion.path
          fill="#FECE6C"
          d="m40.55 49.2 5.175-6.2h-4l.725-5.675L37.825 44H41.3zM38 53l1-7h-5l9-13h2l-1 8h6L40 53z"
          variants={itemVariants}
        />
        
        <motion.text
          x={380}
          y={36}
          fill="#FECE6C"
          fontSize="11"
          fontWeight="600"
          textAnchor="end"
          variants={itemVariants}
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
        >
          EFFICIENCY GAIN
        </motion.text>

        {/* "60%" path — completely hidden, counter overlaid below */}
        <path fill="#fff" visibility="hidden" d="M34.85 107.24c-4.86 0-8.19-3.18-8.19-6.78 0-2.49.6-4.14 2.64-6.54l6.12-7.2h5.82l-5.7 6.81h.33c4.32 0 7.23 2.79 7.23 6.57 0 3.93-3.33 7.14-8.25 7.14m.06-4.32c1.44 0 2.82-.78 2.82-2.64 0-1.95-1.38-2.7-2.82-2.7s-2.85.75-2.85 2.7c0 1.86 1.41 2.64 2.85 2.64m10.134-6.03c0-6.72 2.97-10.47 8.16-10.47s8.16 3.75 8.16 10.47c0 6.69-2.91 10.41-8.16 10.41s-8.16-3.72-8.16-10.41m5.31 0c0 3.75.96 5.79 2.85 5.79 1.83 0 2.85-2.04 2.85-5.79 0-3.78-1.02-5.85-2.85-5.85s-2.85 2.1-2.85 5.85M70 99.14c-3.84 0-6.81-2.85-6.81-6.3 0-3.48 2.97-6.3 6.81-6.3s6.81 2.82 6.81 6.3c0 3.45-2.97 6.3-6.81 6.3m5.58 7.86h-4.05l11.58-20.28h4.05zm-5.58-11.49c1.41 0 2.64-.84 2.64-2.67s-1.23-2.67-2.64-2.67c-1.38 0-2.67.84-2.67 2.67s1.29 2.67 2.67 2.67m19.32 11.76c-3.84 0-6.81-2.85-6.81-6.3 0-3.48 2.97-6.3 6.81-6.3s6.81 2.82 6.81 6.3c0 3.45-2.97 6.3-6.81 6.3m0-3.63c1.41 0 2.64-.84 2.64-2.67s-1.23-2.67-2.64-2.67c-1.38 0-2.67.84-2.67 2.67s1.29 2.67 2.67 2.67" />
        
        {/* Counter fades in with card bg — opacity-only so no dark box flashes */}
        <motion.g variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}>
          <AnimatedCounter
            value={60}
            suffix="%"
            x="55"
            y="107"
            textAnchor="middle"
            fontSize="26"
            fontWeight="800"
            fill="#fff"
            duration={1.8}
          />
        </motion.g>

        <motion.text
          x={27}
          y={140}
          fill="#fff"
          fillOpacity={0.7}
          fontSize="11"
          fontWeight="400"
          variants={itemVariants}
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}
        >
          REDUCED ADMIN OVERHEAD
        </motion.text>
      </g>
      <defs>
        <filter
          id="Background+Shadow_(2)_svg__a"
          width={400}
          height={171}
          x={0}
          y={0}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1363_1618"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1363_1618"
            result="shape"
          />
        </filter>
      </defs>
    </motion.svg>
  );
};

