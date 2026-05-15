"use client";

import { useRef, useEffect } from 'react';
import { motion, animate, useInView, type SVGMotionProps } from 'framer-motion';
import { AnimatedCounter } from '@/components/NewHomePage/graphics/AnimatedCounter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

// Bar chart: grow from x-axis (bottom) upward
const barVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' as const },
  },
};

export const Universities = (props: SVGMotionProps<SVGSVGElement>) => {
  const progressBarRef = useRef<SVGRectElement>(null);
  const isInView = useInView(progressBarRef, { once: true, margin: '-50px' });

  // Imperatively animate the SVG rect height attribute — most reliable approach
  useEffect(() => {
    if (isInView && progressBarRef.current) {
      animate(0, 32, {
        duration: 1.4,
        ease: 'easeOut',
        delay: 0.5,
        onUpdate: (v) => {
          if (progressBarRef.current) {
            progressBarRef.current.setAttribute('height', String(Math.round(v)));
          }
        },
      });
    }
  }, [isInView]);

  return (
    <motion.svg
      width={527}
      height={540}
      viewBox="0 0 527 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    >
      <motion.g filter="url(#Universities_svg__a)" variants={itemVariants}>
        <motion.g clipPath="url(#Universities_svg__b)" variants={itemVariants}>
          <motion.rect width={451} height={464} x={38} y={13} fill="#fff" rx={24} variants={itemVariants} />
          <motion.g filter="url(#Universities_svg__c)" variants={itemVariants}>
            <motion.rect width={387} height={400} x={70} y={45} fill="#fff" rx={24} variants={itemVariants} />
            {/* Header label: "CURRENT METRICS" */}
            <motion.path
              fill="#75777D"
              d="M106.716 117.18c-2.448 0-4.38-1.968-4.38-4.5 0-2.52 1.932-4.476 4.38-4.476 2.364 0 4.188 1.572 4.464 3.852h-2.4c-.18-1.08-.984-1.824-2.04-1.824-1.272 0-2.076.984-2.076 2.448 0 1.476.804 2.472 2.076 2.472 1.044 0 1.848-.744 2.04-1.836h2.4c-.288 2.304-2.1 3.864-4.464 3.864m14.292-8.796v5.184c0 2.088-1.308 3.612-3.732 3.612-2.448 0-3.744-1.524-3.744-3.612v-5.184h2.268v5.22c0 .9.324 1.548 1.476 1.548 1.14 0 1.464-.648 1.464-1.548v-5.22zm5.121 8.616h-2.268v-8.616h3.528c2.328 0 3.66 1.044 3.66 2.88 0 1.104-.66 2.016-1.824 2.508l2.112 3.228h-2.7l-1.764-2.868h-.744zm0-6.744v2.004h1.164c1.008 0 1.476-.312 1.476-.996s-.468-1.008-1.476-1.008zm9.696 6.744h-2.268v-8.616h3.528c2.328 0 3.66 1.044 3.66 2.88 0 1.104-.66 2.016-1.824 2.508l2.112 3.228h-2.7l-1.764-2.868h-.744zm0-6.744v2.004h1.164c1.008 0 1.476-.312 1.476-.996s-.468-1.008-1.476-1.008zm13.524 4.776V117h-6.096v-8.616h6.012v1.968h-3.744v1.236h3.396v1.968h-3.396v1.476zm8.007 1.968-3.432-5.376V117h-2.076v-8.616h2.436l3.18 4.98v-4.98h2.076V117zm9.315 0h-2.268v-6.564h-2.64v-2.052h7.548v2.052h-2.64zm12.47 0-1.848-4.968V117h-2.052v-8.616h2.676l2.172 5.844 2.16-5.844h2.676V117h-2.052v-5.028l-1.86 5.028zm14.763-1.968V117h-6.096v-8.616h6.012v1.968h-3.744v1.236h3.396v1.968h-3.396v1.476zm6.747 1.968h-2.268v-6.564h-2.64v-2.052h7.548v2.052h-2.64zm7.13 0h-2.268v-8.616h3.528c2.328 0 3.66 1.044 3.66 2.88 0 1.104-.66 2.016-1.824 2.508l2.112 3.228h-2.7l-1.764-2.868h-.744zm0-6.744v2.004h1.164c1.008 0 1.476-.312 1.476-.996s-.468-1.008-1.476-1.008zm9.696 6.744h-2.268v-8.616h2.268zm6.757.18c-2.448 0-4.38-1.968-4.38-4.5 0-2.52 1.932-4.476 4.38-4.476 2.364 0 4.188 1.572 4.464 3.852h-2.4c-.18-1.08-.984-1.824-2.04-1.824-1.272 0-2.076.984-2.076 2.448 0 1.476.804 2.472 2.076 2.472 1.044 0 1.848-.744 2.04-1.836h2.4c-.288 2.304-2.1 3.864-4.464 3.864"
              variants={itemVariants}
            />

            {/* Original path draws both "33%" and "68%" shapes */}
            <motion.path
              fill="#030E1D"
              d="M115.584 165.932c-7.296 0-12.528-4.272-12.528-10.272h8.064c.192 2.4 1.872 3.792 4.56 3.792 2.88 0 4.512-1.344 4.512-3.696 0-2.304-1.968-3.6-5.472-3.6h-3.648v-6.48h3.168c2.928 0 4.512-1.152 4.512-3.312 0-2.112-1.296-3.312-3.6-3.312-2.208 0-3.552 1.44-3.552 3.792h-8.016c0-5.856 5.232-10.272 12-10.272 7.296 0 11.664 3.792 11.664 9.12 0 2.784-1.584 4.992-4.512 6.72 3.84 1.344 5.952 3.792 5.952 7.152 0 6.192-5.28 10.368-13.104 10.368m27.844 0c-7.296 0-12.528-4.272-12.528-10.272h8.064c.192 2.4 1.872 3.792 4.56 3.792 2.88 0 4.512-1.344 4.512-3.696 0-2.304-1.968-3.6-5.472-3.6h-3.648v-6.48h3.168c2.928 0 4.512-1.152 4.512-3.312 0-2.112-1.296-3.312-3.6-3.312-2.208 0-3.552 1.44-3.552 3.792h-8.016c0-5.856 5.232-10.272 12-10.272 7.296 0 11.664 3.792 11.664 9.12 0 2.784-1.584 4.992-4.512 6.72 3.84 1.344 5.952 3.792 5.952 7.152 0 6.192-5.28 10.368-13.104 10.368m26.02-13.008c-6.144 0-10.896-4.56-10.896-10.08 0-5.568 4.752-10.08 10.896-10.08s10.896 4.512 10.896 10.08c0 5.52-4.752 10.08-10.896 10.08m8.928 12.576h-6.48l18.528-32.448h6.48zm-8.928-18.384c2.256 0 4.224-1.344 4.224-4.272s-1.968-4.272-4.224-4.272c-2.208 0-4.272 1.344-4.272 4.272s2.064 4.272 4.272 4.272m30.912 18.816c-6.144 0-10.896-4.56-10.896-10.08 0-5.568 4.752-10.08 10.896-10.08s10.896 4.512 10.896 10.08c0 5.52-4.752 10.08-10.896 10.08m0-5.808c2.256 0 4.224-1.344 4.224-4.272s-1.968-4.272-4.224-4.272c-2.208 0-4.272 1.344-4.272 4.272s2.064 4.272 4.272 4.272"
              variants={itemVariants}
            />
            {/* Static white mask — covers both "33%" and "68%" from path above */}
            <rect x={100} y={125} width={120} height={50} fill="#fff" />
            {/* AnimatedCounter: only "33%" shown, styled to match Figma spec */}
            <AnimatedCounter
              value={33}
              suffix="%"
              x="143"
              y="166"
              textAnchor="middle"
              fontSize="32"
              fontWeight="700"
              fill="#030E1D"
              duration={1.8}
            />

            {/* Red label: "Employment Gap..." */}
            <motion.path
              fill="#BA1A1A"
              d="M233.24 155.7v1.3h-8.62v-14.36h8.48v1.3h-6.98v5h6.38v1.3h-6.38v5.46zm4.086 1.3h-1.4v-10.54h1.3v1.98c.7-1.36 1.94-2.18 3.44-2.18 1.64 0 2.86.9 3.3 2.44.66-1.48 1.98-2.44 3.64-2.44 2.18 0 3.54 1.44 3.54 3.9V157h-1.38v-6.38c0-2-.92-3.14-2.62-3.14-1.6 0-2.9 1.4-2.9 3.34V157h-1.4v-6.38c0-2-.92-3.14-2.62-3.14-1.62 0-2.9 1.4-2.9 3.34zm26.424-5.28c0 3.26-1.82 5.48-4.62 5.48-1.58 0-2.92-.86-3.64-2.36v6.02h-1.4v-14.4h1.3v2.28c.72-1.56 2.12-2.48 3.74-2.48 2.8 0 4.62 2.24 4.62 5.46m-1.42 0c0-2.66-1.38-4.24-3.44-4.24-1.96 0-3.42 1.56-3.42 4.24 0 2.62 1.42 4.26 3.42 4.26 2.06 0 3.44-1.56 3.44-4.26m5.074 5.28h-1.4v-14.36h1.4zm7.254.2c-2.9 0-5-2.3-5-5.48 0-3.16 2.1-5.44 5-5.44 2.92 0 5.02 2.28 5.02 5.44 0 3.18-2.1 5.48-5.02 5.48m0-1.22c2.06 0 3.6-1.64 3.6-4.26 0-2.58-1.54-4.22-3.6-4.22-2.04 0-3.58 1.64-3.58 4.22 0 2.62 1.54 4.26 3.58 4.26m15.091-9.52-5.4 14.4h-1.5l1.54-4-4.18-10.4h1.5l3.4 8.72 3.22-8.72zm3.026 10.54h-1.4v-10.54h1.3v1.98c.7-1.36 1.94-2.18 3.44-2.18 1.64 0 2.86.9 3.3 2.44.66-1.48 1.98-2.44 3.64-2.44 2.18 0 3.54 1.44 3.54 3.9V157h-1.38v-6.38c0-2-.92-3.14-2.62-3.14-1.6 0-2.9 1.4-2.9 3.34V157h-1.4v-6.38c0-2-.92-3.14-2.62-3.14-1.62 0-2.9 1.4-2.9 3.34zm20.905.2c-2.96 0-4.92-2.22-4.92-5.56 0-3.08 2.04-5.38 4.84-5.38 3 0 4.96 2.42 4.72 5.8h-8.16c.12 2.5 1.44 4.04 3.5 4.04 1.76 0 2.98-.98 3.32-2.66h1.38c-.48 2.34-2.26 3.76-4.68 3.76m-.1-9.86c-1.9 0-3.24 1.46-3.42 3.76h6.7c-.12-2.36-1.34-3.76-3.28-3.76m8.453 3.52V157h-1.4v-10.54h1.3v1.98c.68-1.3 1.96-2.18 3.48-2.18 2.2 0 3.62 1.4 3.62 3.9V157h-1.4v-6.36c0-2.02-.92-3.16-2.64-3.16-1.64 0-2.96 1.42-2.96 3.38m15.348 4.8v1.24c-.54.22-1 .3-1.52.3-1.74 0-3.08-.9-3.08-3.18v-6.38h-2.48v-1.18h2.48v-3.12h1.4v3.12h3.3v1.18h-3.3v6.08c0 1.64.8 2.2 1.96 2.2.44 0 .8-.08 1.24-.26m12.937 1.64c-4.12 0-7.26-3.16-7.26-7.48 0-4.24 3-7.48 7.16-7.48 3.74 0 6.18 2.34 7 5.22h-1.7c-.62-2.18-2.44-3.88-5.34-3.88-3.3 0-5.58 2.54-5.58 6.16 0 3.54 2.3 6.16 5.76 6.16 3.12 0 5.1-1.94 5.48-4.96h-5.64v-1.22h7.2c-.04 4.54-2.84 7.48-7.08 7.48m15.877-.3v-1.92c-.62 1.32-1.9 2.12-3.54 2.12-2.18 0-3.6-1.22-3.6-3.12 0-2.06 1.64-3.14 4.84-3.14.64 0 1.12.04 2.16.12v-.88c0-1.76-.94-2.8-2.54-2.8-1.72 0-2.8 1.06-2.82 2.78h-1.28c.06-2.34 1.68-3.9 4.08-3.9 2.46 0 3.9 1.44 3.9 3.88V157zm-5.8-2.96c0 1.28.98 2.14 2.46 2.14 1.96 0 3.2-1.28 3.2-3.26v-.94c-.9-.08-1.52-.1-2.1-.1-2.4 0-3.56.7-3.56 2.16M380 151.72c0 3.26-1.82 5.48-4.62 5.48-1.58 0-2.92-.86-3.64-2.36v6.02h-1.4v-14.4h1.3v2.28c.72-1.56 2.12-2.48 3.74-2.48 2.8 0 4.62 2.24 4.62 5.46m-1.42 0c0-2.66-1.38-4.24-3.44-4.24-1.96 0-3.42 1.56-3.42 4.24 0 2.62 1.42 4.26 3.42 4.26 2.06 0 3.44-1.56 3.44-4.26"
              variants={itemVariants}
            />

            {/* Progress bar background */}
            <motion.rect width={4} height={96} x={421} y={77} fill="#E6EEFF" rx={2} variants={itemVariants} />
            {/* Progress bar red fill — imperatively animated via useInView + onUpdate */}
            <rect
              ref={progressBarRef}
              width={4}
              x={421}
              y={77}
              height={0}
              rx={2}
              fill="#BA1A1A"
            />

            {/* Bar chart bars — grow from x-axis (bottom) upward via scaleY */}
            <motion.path
              fill="#182434"
              d="M102 309a4 4 0 0 1 4-4h60.75a4 4 0 0 1 4 4v104H102zM186.75 345a4 4 0 0 1 4-4h60.75a4 4 0 0 1 4 4v68h-68.75z"
              style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
              variants={barVariants}
            />
            <motion.path
              fill="#FECE6C"
              d="M271.5 225a4 4 0 0 1 4-4h60.75a4 4 0 0 1 4 4v188H271.5z"
              style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
              variants={barVariants}
            />
            {/* "TARGET" label */}
            <motion.path
              fill="#030E1D"
              d="M291.24 212h-1.89v-5.47h-2.2v-1.71h6.29v1.71h-2.2zm7.136 0-.44-1.33h-2.52l-.45 1.33h-1.91l2.66-7.18h2.07l2.63 7.18zm-1.68-5.1-.77 2.28h1.52zm6.371 5.1h-1.89v-7.18h2.94c1.94 0 3.05.87 3.05 2.4 0 .92-.55 1.68-1.52 2.09l1.76 2.69h-2.25l-1.47-2.39h-.62zm0-5.62v1.67h.97c.84 0 1.23-.26 1.23-.83s-.39-.84-1.23-.84zm8.5 5.77c-2.09 0-3.73-1.54-3.73-3.78 0-2.12 1.56-3.7 3.67-3.7 1.8 0 3.13 1.04 3.63 2.65h-2.24c-.18-.55-.71-.96-1.44-.96-.93 0-1.68.65-1.68 2.06 0 1.2.59 2.13 1.89 2.13.82 0 1.33-.46 1.54-1.06h-1.73V208h3.75c.15 2.37-1.28 4.15-3.66 4.15m9.729-1.79V212h-5.08v-7.18h5.01v1.64h-3.12v1.03h2.83v1.64h-2.83v1.23zm4.622 1.64h-1.89v-5.47h-2.2v-1.71h6.29v1.71h-2.2z"
              variants={itemVariants}
            />
            <motion.path
              fill="#182434"
              d="M356.25 309a4 4 0 0 1 4-4H421a4 4 0 0 1 4 4v104h-68.75z"
              style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
              variants={barVariants}
            />

            {/* Line Graph Path (scaled/positioned to fit card) */}
            <motion.path
              d="M100 280C104 277 114 276 122 295C132 320 150 320 154 303C158 281 156 212 170 214C178 215 180 238 180 258C180 277 185 303 199 303C211 303 214 282 217 265C221 247 233 249 233 271C233 297 233 329 248 329C274 329 267 206 273 115C275 89 297 86 298 151C299 222 304 258 305 265C306 271 311 288 325 270C336 255 345 261 347 270C354 293 358 317 370 316C386 315 387 222 396 160C398 145 412 145 412 170C412 197 410 235 421 245C427 251 434 249 438 235C440 225 442 160 446 127C450 103 464 108 468 127C473 155 484 260 507 235C536 203 551 227 557 199C563 168 565 145 594 160C622 176 639 164 650 160"
              stroke="url(#paint0_linear_universities)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={itemVariants}
            />
          </motion.g>
        </motion.g>
      </motion.g>
      <defs>
        <filter
          id="Universities_svg__a"
          width={527}
          height={540}
          x={0}
          y={0}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feMorphology in="SourceAlpha" radius={12} result="effect1_dropShadow_1363_1563" />
          <feOffset dy={25} />
          <feGaussianBlur stdDeviation={25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1363_1563" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_1363_1563" result="shape" />
        </filter>
        <filter
          id="Universities_svg__c"
          width={463}
          height={476}
          x={32}
          y={32}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feMorphology in="SourceAlpha" radius={12} result="effect1_dropShadow_1363_1563" />
          <feOffset dy={25} />
          <feGaussianBlur stdDeviation={25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1363_1563" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_1363_1563" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_universities" x1="536.651" y1="64.8538" x2="29.7481" y2="295.753" gradientUnits="userSpaceOnUse">
          <stop stopColor="#01B574" />
          <stop offset="1" stopColor="#01B574" stopOpacity="0" />
        </linearGradient>
        <clipPath id="Universities_svg__b">
          <rect width={451} height={464} x={38} y={13} fill="#fff" rx={24} />
        </clipPath>
      </defs>
    </motion.svg>
  );
};


