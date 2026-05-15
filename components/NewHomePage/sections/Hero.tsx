'use client';

import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ConnectivityMesh } from '@/components/NewHomePage/graphics';
import { HeroTooltip, HeroMatchStrength, HeroDashboardCard, HeroSkillMatch } from '@/components/NewHomePage/ui/HeroSVGs';
import DemoRequestModal from '@/components/DemoRequestModal';

const GlassCard = ({ style, children, delay = 0 }: { style?: React.CSSProperties; children?: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, backdropFilter: 'blur(0px) saturate(100%)' }}
    animate={{ opacity: 1, backdropFilter: 'blur(2px) saturate(20%)' }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="absolute pointer-events-none"
    style={{
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.03)',
      overflow: 'hidden',
      ...style,
    }}
  >
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
    }} />
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '1px', height: '100%',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent, rgba(255,255,255,0.15))',
    }} />
    {children}
  </motion.div>
);

const Hero = () => {
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState(false);

  return (
    <section
      aria-labelledby="nh-hero-heading"
      className="relative transition-colors duration-1000 overflow-hidden min-h-screen flex items-center pt-32 md:pt-40 lg:pt-20 bg-[#0a0f18]"
    >

      <ConnectivityMesh />

      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 lg:pl-16 relative z-10 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center py-12 lg:py-16">

          <motion.div
            className="max-w-2xl 2xl:max-w-3xl text-center lg:text-left mx-auto lg:mx-0"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { staggerChildren: 0.1, duration: 0.6 }
              }
            }}
          >
            <motion.div
              className="inline-block px-3 py-1.5 mb-7 rounded-full bg-[#183457] text-white font-medium text-[10px] tracking-wide uppercase"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              Now live in Northern Ontario
            </motion.div>

            <motion.h1
              id="nh-hero-heading"
              className="text-[28px] md:text-[42px] lg:text-[34px] xl:text-[52px] 2xl:text-[64px] font-medium leading-[1.1] mb-5 tracking-[-0.025em] font-sans transition-colors duration-1000 text-white"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              The Employment <br className="hidden lg:block" aria-hidden="true" />
              Infrastructure Layer for Workforce <span className="text-orange-400">Inclusion.</span>
            </motion.h1>

            <motion.p
              className="text-[15px] md:text-[17px] lg:text-[14px] xl:text-[19px] 2xl:text-[20px] mb-8 leading-relaxed mx-auto lg:mx-0 font-normal transition-colors duration-1000 text-slate-400"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              Universities, NGOs, and governments deploy Enabled Talent as
              the system connecting disability services, employers, and talent
              into one accountable workflow.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <button 
                onClick={() => setIsDemoRequestOpen(true)}
                className="bg-[#fdcd6b] hover:bg-[#FBBF24] text-[#111827] font-bold text-[16px] sm:text-[16px] pl-4 pr-2 h-[50px] md:h-[52px] rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-orange-200/40 group whitespace-nowrap cursor-pointer w-full sm:w-fit"
              >
                Deploy Enabled Talent
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/10 group-hover:bg-[#111827] group-hover:text-white transition-colors">
                  <FiArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                </div>
              </button>
              <a href="#nh-how-it-works" className="border-2 border-white text-white hover:bg-white hover:text-[#111827] font-bold text-[16px] sm:text-[16px] px-6 h-[50px] md:h-[52px] rounded-full transition-all duration-300 flex items-center justify-center bg-transparent w-full sm:w-fit whitespace-nowrap shadow-sm">
                See how it works
              </a>
            </motion.div>
          </motion.div>

          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[650px] flex items-center justify-end w-full mt-4 lg:mt-0">
            <div className="relative w-full max-w-[600px] aspect-[600/550] scale-[1.1] sm:scale-[1.0] lg:scale-[0.8] xl:scale-[1.1] 2xl:scale-[1.2] origin-center transition-all duration-500 z-30">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute left-[-8%] top-[27%] w-[23%] h-auto z-20 opacity-80 blur-[0.2px]"
              >
                <HeroSkillMatch className="w-full h-auto" aria-hidden="true" />
              </motion.div>

              <GlassCard
                delay={1.2}
                style={{
                  left: '4.8%',
                  top: '12.9%',
                  width: '74%',
                  height: '63.4%',
                  zIndex: 30,
                  boxShadow: 'rgba(0, 0, 0, 0.4)',
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute left-[10%] top-[11.8%] w-[64%] h-auto z-40"
              >
                <HeroDashboardCard className="w-full h-auto" aria-hidden="true" />
              </motion.div>

              <GlassCard
                delay={1.4}
                style={{
                  left: '-5%',
                  top: '38.2%',
                  width: '54.3%',
                  height: '40%',
                  zIndex: 36,
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255,255,255,0.1),
                    inset 0 -1px 0 rgba(255,255,255,0.05)
                  `,
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute left-[3.3%] top-[56.4%] w-[35%] h-auto z-50 drop-shadow-2xl"
              >
                <HeroTooltip className="w-full h-auto" aria-hidden="true" />
              </motion.div>

              <GlassCard
                delay={1.6}
                style={{
                  left: '31.8%',
                  top: '47.8%',
                  width: '47.2%',
                  height: '42.5%',
                  zIndex: 39,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: `
                    0 8px 32px rgba(251, 191, 36, 0.15),
                    inset 0 1px 0 rgba(255,255,255,0.1),
                    inset 0 -1px 0 rgba(255,255,255,0.05)
                  `,
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="absolute left-[40%] top-[55.5%] w-[41.7%] h-auto z-50 drop-shadow-2xl"
              >
                <HeroMatchStrength className="w-full h-auto" aria-hidden="true" />
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      <DemoRequestModal 
        isOpen={isDemoRequestOpen} 
        onClose={() => setIsDemoRequestOpen(false)} 
        source="new-hero-deploy"
        title="Request a Sales Demo"
      />
    </section>
  );
};

export default Hero;
