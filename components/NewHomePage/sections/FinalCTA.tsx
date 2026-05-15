"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Vector, Dots } from '@/components/NewHomePage/graphics';
import DemoRequestModal from '@/components/DemoRequestModal';

const FinalCTA = () => {
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState(false);

  return (
    <section
      className="relative min-h-[500px] md:min-h-screen bg-[#0F172A] overflow-hidden flex items-center justify-center md:justify-end px-4 sm:px-6 lg:px-24 py-20 md:py-0"
      aria-labelledby="nh-final-cta-heading"
    >
      <div className="absolute inset-0 z-0 opacity-50 md:opacity-100 flex items-center justify-center pointer-events-none overflow-hidden">
        <Vector className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true" />
      </div>

      <Dots
        aria-hidden="true"
        className="absolute top-10 -right-10 w-[65%] md:w-[45%] opacity-100 z-1 pointer-events-none"
        style={{
          filter: 'brightness(0) saturate(100%) invert(21%) sepia(13%) saturate(1900%) hue-rotate(178deg) brightness(95%) contrast(91%)'
        }}
      />

      <div className="absolute left-0 top-1/4 w-[300px] h-[400px] rounded-full opacity-15 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)', filter: 'blur(80px)' }} aria-hidden="true" />
      <div className="absolute right-0 top-1/4 w-[300px] h-[400px] rounded-full opacity-15 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, #06b6d4 0%, transparent 70%)', filter: 'blur(80px)' }} aria-hidden="true" />

      <div className="absolute top-0 left-0 right-0 h-[2px] nh-shimmer-bar opacity-40" aria-hidden="true" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col items-center md:items-end text-center md:text-right">
        <motion.h2
          id="nh-final-cta-heading"
          className="text-3xl md:text-[48px] font-extrabold text-[#FBBF24] leading-[1.1] mb-10 tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          Ready to upgrade your<br />
          inclusion infrastructure?
        </motion.h2>

        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button 
            onClick={() => setIsDemoRequestOpen(true)}
            className="bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0F172A] px-6 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl flex items-center gap-4 transition-all hover:scale-105 shadow-xl group cursor-pointer"
          >
            Schedule a Demo
            <div className="bg-[#0F172A] text-[#FBBF24] rounded-full p-2 group-hover:translate-x-1 transition-transform">
              <FiArrowRight className="w-5 md:w-6 h-5 md:h-6" aria-hidden="true" />
            </div>
          </button>
        </motion.div>
      </div>

      <DemoRequestModal 
        isOpen={isDemoRequestOpen} 
        onClose={() => setIsDemoRequestOpen(false)} 
        source="new-final-cta-sales"
        title="Request a Sales Demo"
      />
    </section>
  );
};

export default FinalCTA;
