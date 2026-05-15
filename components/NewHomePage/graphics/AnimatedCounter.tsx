"use client";

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion, type SVGMotionProps } from 'framer-motion';
interface AnimatedCounterProps extends SVGMotionProps<SVGTextElement> {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  formatter?: (value: number) => string;
}

export const AnimatedCounter = ({ 
  value, 
  prefix = "", 
  suffix = "", 
  duration = 1.5,
  decimals = 0,
  formatter,
  ...props 
}: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  
  // Determine decimals based on final value if not explicitly provided
  const targetDecimals = decimals > 0 ? decimals : (value.toString().includes('.') ? value.toString().split('.')[1].length : 0);

  const display = useTransform(count, (latest) => {
    if (formatter) {
      // If target is an integer, round the intermediate values to avoid decimals in toLocaleString
      const formattedValue = targetDecimals === 0 ? Math.round(latest) : latest.toFixed(targetDecimals);
      return formatter(Number(formattedValue));
    }
    return `${prefix}${latest.toFixed(targetDecimals)}${suffix}`;
  });
  const ref = useRef<SVGTextElement>(null);
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

  return <motion.text ref={ref} {...props}>{display}</motion.text>;
};

