"use client";

import { motion } from 'framer-motion';
import { FiLock, FiRefreshCw } from 'react-icons/fi';
import { HiBadgeCheck } from 'react-icons/hi';
import { GoLaw } from 'react-icons/go';

const iconItems = [
  { Icon: FiLock, label: 'Single sign on' },
  { Icon: HiBadgeCheck, label: 'AODA and WCAG 2.1 AA', large: true },
  { Icon: GoLaw, label: 'PIPEDA compliant' },
  { Icon: FiRefreshCw, label: 'Real time sync' },
];

const CTA = () => {
  return (
    <section className="bg-white py-24 border-t border-slate-100" aria-labelledby="nh-cta-heading">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <motion.div
          className="bg-[#151E2D] rounded-[2rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl section-bloom"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundSize: '32px 32px' }}
            aria-hidden="true"
          ></div>

          {/* Shimmer accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] nh-shimmer-bar opacity-60" aria-hidden="true" />

          <div className="relative z-10 mx-auto">
            <motion.p
              id="nh-cta-heading"
              className="text-2xl md:text-[36px] font-normal text-white mb-6 md:leading-[46px] tracking-[-0.45px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Powered by the Workforce Inclusion Network (WIN)
            </motion.p>
            <motion.p
              className="text-slate-400 text-sm md:text-lg font-medium mb-12 md:mb-20 mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Enterprise grade shared data layer with role based access, deployed for your institution.<br className="hidden md:block" />
              Our architectural foundation ensures security and cross-functional intelligence.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
              {iconItems.map(({ Icon, label, large }, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <Icon
                    className={`${large ? 'w-11 h-11 md:w-14 md:h-14 mb-3' : 'w-10 h-10 md:w-12 md:h-12 mb-4'} text-white`}
                    aria-hidden="true"
                  />
                  <span className="text-slate-400 text-[10px] md:text-xs font-medium uppercase tracking-wider">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
