"use client";

import { useRef, useEffect } from 'react';
import { motion, animate, useInView, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

export const Backgroundshadow1 = (props: SVGMotionProps<SVGSVGElement>) => {
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

  // trackRef: sentinel for inView (full-width track, always has real dimensions)
  const trackRef = useRef<SVGRectElement>(null);
  // progressBarRef: the animated fill bar
  const progressBarRef = useRef<SVGRectElement>(null);
  const isInView = useInView(trackRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && progressBarRef.current) {
      animate(0, 210, {
        duration: 1.2,
        ease: 'easeOut',
        delay: 0.6,
        onUpdate: (v) => {
          if (progressBarRef.current) {
            progressBarRef.current.setAttribute('width', String(v));
          }
        },
      });
    }
  }, [isInView]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={400}
      height={163}
      viewBox="0 0 400 163"
      fill="none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      {...props}
    >
      <g filter="url(#Background+Shadow_(1)_svg__a)">
        <motion.rect
          width={395}
          height={159}
          x={2}
          y={1}
          fill="#fff"
          rx={16}
          shapeRendering="crispEdges"
          variants={itemVariants}
        />
        <motion.rect
          width={40}
          height={28}
          x={26}
          y={25}
          fill="#FECE6C"
          fillOpacity={0.2}
          rx={4}
          variants={itemVariants}
        />
        <motion.path
          fill="#7A5900"
          d="M34 45v-1.575q0-1.075 1.1-1.75T38 41q.325 0 .625.013t.575.062q-.35.525-.525 1.1a4.1 4.1 0 0 0-.175 1.2V45zm6 0v-1.625q0-.8.438-1.462.437-.663 1.237-1.163.799-.5 1.913-.75 1.111-.25 2.412-.25 1.325 0 2.438.25 1.112.25 1.912.75.8.499 1.225 1.163.425.662.425 1.462V45zm13.5 0v-1.625q0-.65-.163-1.225a4 4 0 0 0-.487-1.075q.274-.05.563-.062Q53.7 41 54 41q1.8 0 2.9.663 1.1.662 1.1 1.762V45zm-11.375-2H49.9q-.251-.5-1.387-.875-1.138-.375-2.513-.375t-2.513.375-1.362.875M38 40q-.824 0-1.413-.587A1.93 1.93 0 0 1 36 38q0-.85.587-1.425A1.95 1.95 0 0 1 38 36q.85 0 1.425.575T40 38q0 .824-.575 1.413A1.91 1.91 0 0 1 38 40m16 0q-.824 0-1.413-.587A1.93 1.93 0 0 1 52 38q0-.85.587-1.425A1.95 1.95 0 0 1 54 36q.85 0 1.425.575T56 38q0 .824-.575 1.413A1.91 1.91 0 0 1 54 40m-8-1a2.9 2.9 0 0 1-2.125-.875A2.9 2.9 0 0 1 43 36q0-1.275.875-2.138Q44.75 33 46 33q1.275 0 2.138.862Q49 34.726 49 36q0 1.25-.862 2.125Q47.275 39 46 39m0-2q.424 0 .712-.288A.97.97 0 0 0 47 36a.97.97 0 0 0-.288-.712A.97.97 0 0 0 46 35a.97.97 0 0 0-.712.288A.97.97 0 0 0 45 36q0 .424.288.712.287.288.712.288"
          variants={itemVariants}
        />
        <g transform="translate(180, 0)">
          <motion.path
            fill="#7A5900"
            d="M84.839 36l-.44-1.33h-2.52l-.45 1.33h-1.91l2.66-7.18h2.07l2.63 7.18zm-1.68-5.1-.77 2.28h1.52zm7.31 5.25c-2.04 0-3.65-1.64-3.65-3.75 0-2.1 1.61-3.73 3.65-3.73 1.97 0 3.49 1.31 3.72 3.21h-2c-.15-.9-.82-1.52-1.7-1.52-1.06 0-1.73.82-1.73 2.04 0 1.23.67 2.06 1.73 2.06.87 0 1.54-.62 1.7-1.53h2c-.24 1.92-1.75 3.22-3.72 3.22M98.61 36h-1.89v-5.47h-2.2v-1.71h6.29v1.71h-2.2zm4.941 0h-1.89v-7.18h1.89zm7.871-7.18-2.56 7.18h-2.06l-2.54-7.18h2.05l1.58 4.97 1.63-4.97zm5.788 5.54V36h-5.08v-7.18h5.01v1.64h-3.12v1.03h2.83v1.64h-2.83v1.23zm6.402 1.79c-2.04 0-3.65-1.64-3.65-3.75 0-2.1 1.61-3.73 3.65-3.73 1.97 0 3.49 1.31 3.72 3.21h-2c-.15-.9-.82-1.52-1.7-1.52-1.06 0-1.73.82-1.73 2.04 0 1.23.67 2.06 1.73 2.06.87 0 1.54-.62 1.7-1.53h2c-.24 1.92-1.75 3.22-3.72 3.22m8.979-.15-.44-1.33h-2.52l-.45 1.33h-1.91l2.66-7.18h2.07l2.63 7.18zm-1.68-5.1-.77 2.28h1.52zm10.036 2.75c0 1.48-1.18 2.45-3.05 2.45s-3.07-.99-3.2-2.58h1.91c.02.68.47 1.11 1.25 1.11.65 0 1.08-.25 1.08-.7 0-.31-.31-.54-.73-.62l-1.31-.25c-1.15-.22-1.91-.89-1.91-2.05 0-1.34 1.18-2.28 2.79-2.28 1.71 0 2.94.98 3.05 2.53h-1.91c-.05-.65-.49-1.07-1.12-1.07-.56 0-.9.3-.9.69 0 .32.32.51.7.58l1.39.27c1.28.25 1.96.88 1.96 1.92m6.048.71V36h-5.08v-7.18h5.01v1.64h-3.12v1.03h2.83v1.64h-2.83v1.23zm5.992 1.64h-4.91v-7.18h1.89v5.47h3.02zm3.683.15c-2.07 0-3.7-1.57-3.7-3.75s1.63-3.73 3.7-3.73c2.08 0 3.71 1.55 3.71 3.73s-1.63 3.75-3.71 3.75m0-1.69c1.13 0 1.76-.93 1.76-2.06s-.63-2.04-1.76-2.04-1.76.91-1.76 2.04.63 2.06 1.76 2.06m8.968 1.54-.44-1.33h-2.52l-.45 1.33h-1.91l2.66-7.18h2.07l2.63 7.18zm-1.68-5.1-.77 2.28h1.52zm7.281 5.1h-2.8v-7.18h2.8c2.27 0 3.7 1.46 3.7 3.55s-1.48 3.63-3.7 3.63m-.91-5.55v3.92h.8c1.25 0 1.87-.65 1.87-2 0-1.27-.64-1.92-1.87-1.92z"
            variants={itemVariants}
          />
        </g>
        {/* "1,248" path — completely hidden; counter overlaid below */}
        <path
          fill="#030E1D"
          visibility="hidden"
          d="M35.54 99h-5.19V83.19H26.6v-4.47h8.94zm9.204-1.92c0 4.26-3.54 6.78-7.74 6.78v-2.67c2.43 0 4.11-.99 4.38-2.73-.27.06-.42.06-.6.06-1.53 0-2.7-1.29-2.7-2.85 0-1.83 1.35-3.06 3.12-3.06 2.16 0 3.54 1.44 3.54 4.47m17.412-2.7V99h-15.09v-2.94l6.03-5.82c2.25-2.19 3.3-3.33 3.3-5.01 0-1.38-.84-2.19-2.31-2.19-1.71 0-2.67.99-2.67 2.7h-5.01c0-4.29 3.27-7.32 7.95-7.32 4.26 0 7.44 2.64 7.44 6.15 0 2.55-.93 4.08-4.68 7.71l-2.16 2.1zm18.842 1.02h-2.91V99h-5.13v-3.6h-9.54v-3.87l10.47-12.81h4.2V90.9h2.91zm-12-4.5h3.96v-4.98zm29.852 2.07c0 3.63-3.21 6.3-8.1 6.3-4.98 0-8.19-2.67-8.19-6.3 0-2.04 1.29-3.54 3.12-4.5-1.47-.93-2.49-2.22-2.49-4.05 0-3.39 2.94-6 7.56-6 4.53 0 7.5 2.61 7.5 6 0 1.83-1.02 3.12-2.49 4.05 1.8.96 3.09 2.46 3.09 4.5M88.5 84.6c0 1.17.81 1.92 2.25 1.92 1.38 0 2.19-.75 2.19-1.92 0-1.32-.81-2.13-2.19-2.13-1.44 0-2.25.81-2.25 2.13m-.6 8.25c0 1.47.99 2.37 2.85 2.37 1.77 0 2.82-.9 2.82-2.37 0-1.32-1.05-2.28-2.82-2.28-1.86 0-2.85.96-2.85 2.28"
        />

        {/* Counter + progress bar: fade in with card bg, never a white overlay on transparent card */}
        <motion.g variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}>
          <AnimatedCounter
            value={1248}
            formatter={(v) => v.toLocaleString()}
            x="62"
            y="99"
            textAnchor="middle"
            fontSize="26"
            fontWeight="800"
            fill="#030E1D"
            duration={1.8}
          />
          {/* Progress bar track — used as inView sentinel */}
          <rect ref={trackRef} width={340} height={4} x={26} y={121} fill="#E6EEFF" rx={2} />
          {/* Progress bar fill — width animates 0 → 200 via useEffect */}
          <rect ref={progressBarRef} width={0} height={4} x={26} y={121} fill="#7A5900" rx={2} />
        </motion.g>
      </g>
      <defs>
        <filter
          id="Background+Shadow_(1)_svg__a"
          width={400}
          height={163}
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
            result="effect1_dropShadow_1363_1609"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1363_1609"
            result="shape"
          />
        </filter>
      </defs>
    </motion.svg>
  );
};

