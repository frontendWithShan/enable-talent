"use client";

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
interface AnimatedCounterTextProps extends HTMLMotionProps<'span'> {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  formatter?: (value: number) => string;
}

export const AnimatedCounterText = ({ 
  value, 
  prefix = "", 
  suffix = "", 
  duration = 1.5,
  decimals = 0,
  formatter,
  ...props 
}: AnimatedCounterTextProps) => {
  const count = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  
  // Determine decimals based on final value if not explicitly provided
  const targetDecimals = decimals > 0 ? decimals : (value.toString().includes('.') ? value.toString().split('.')[1].length : 0);

  const display = useTransform(count, (latest) => {
    if (formatter) {
      const formattedValue = targetDecimals === 0 ? Math.round(latest) : latest.toFixed(targetDecimals);
      return formatter(Number(formattedValue));
    }
    return `${prefix}${latest.toFixed(targetDecimals)}${suffix}`;
  });
  
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      if (shouldReduceMotion) {
        count.set(value);
        return;
      }
      const controls = animate(count, value, { duration, ease: "easeOut", delay: 0.3 });
      return controls.stop;
    }
  }, [count, value, isInView, duration, shouldReduceMotion]);

  return <motion.span ref={ref} {...props}>{display}</motion.span>;
};
