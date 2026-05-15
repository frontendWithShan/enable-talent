"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-to-top button with progress indicator
 */
const ScrollButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 1000 : 100,
    damping: shouldReduceMotion ? 100 : 30,
    restDelta: 0.001
  });

  const ringOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      // Show button only after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      <AnimatePresence>
        {isVisible && (
          <div className="relative flex items-center justify-center">
            {/* Accessibility Hint (Visible on Hover/Focus) */}
            <div className="absolute right-full mr-4 px-3 py-1.5 bg-[#111827] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl hidden md:block">
              Back to Top
            </div>

            {/* Progress Ring SVG */}
            <svg 
              className="absolute w-18 h-18 -rotate-90 pointer-events-none" 
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="transparent"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#FFC82C"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  pathLength: smoothProgress,
                  opacity: ringOpacity
                }}
              />
            </svg>

            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.05,
                backgroundColor: "rgba(255, 200, 44, 1)",
                color: "#111827"
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              onClick={scrollToTop}
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#111827]/90 backdrop-blur-xl text-white shadow-2xl cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFC82C] z-10 group"
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <ChevronUp className={`w-7 h-7 transition-transform ${shouldReduceMotion ? '' : 'group-hover:-translate-y-1'}`} />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollButtons;
