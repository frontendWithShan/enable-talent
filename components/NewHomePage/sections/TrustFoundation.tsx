"use client";

import { motion } from 'framer-motion';
import { FiGlobe, FiUser, FiDatabase, FiShield, FiCheckCircle, FiLock, FiZap, FiShare2 } from 'react-icons/fi';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.12 }
  })
};

const TrustFoundation = () => {
  return (
    <section className="py-24 pb-45 bg-White relative overflow-hidden nh-section-bloom" aria-labelledby="nh-trust-heading">
      <div className="max-w-[1280px] mx-auto px-4 md:pl-8 md:pr-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="nh-trust-heading" className="text-3xl md:text-5xl font-extrabold text-[#111827] mb-6 tracking-tight">
            Built on Foundation of Trust
          </h2>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
            Our digital infrastructure is engineered to meet the highest global standards of accessibility,
            data sovereignty, and security, providing a seamless and secure experience for talent and enterprises alike.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Global Standards */}
          <motion.div
            className="bg-[#EFF4FF] p-8 rounded-[2rem] border border-slate-100 flex flex-col h-full"
            custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            <div className="w-12 h-12 bg-[#111827] rounded-xl flex items-center justify-center text-white mb-6">
              <FiGlobe className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-extrabold text-[#111827] mb-4">Global Standards</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-12 flex-grow">
              Harmonized compliance across jurisdictions: AODA/PIPEDA in Canada, ADA/Section 508 in the USA, and GDPR/EAA in the EU.
            </p>
            <div className="flex gap-2">
              <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-slate-400 border border-slate-100 uppercase tracking-wider">ADA</span>
              <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-slate-400 border border-slate-100 uppercase tracking-wider">GDPR</span>
              <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-slate-400 border border-slate-100 uppercase tracking-wider">AODA</span>
            </div>
          </motion.div>

          {/* Card 2: Inclusive Architecture */}
          <motion.div
            className="bg-[#151E2D] p-8 rounded-[2rem] border border-slate-800 flex flex-col h-full shadow-2xl"
            custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            <div className="w-12 h-12 bg-[#FBBF24] rounded-xl flex items-center justify-center text-[#111827] mb-6">
              <FiUser className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-extrabold mb-4 text-white">Inclusive Architecture</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-12 flex-grow">
              WCAG 2.1 AA compliant by design. Features screen reader optimization, full keyboard navigation, and adaptable high-contrast workflows.
            </p>
            <div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-[#FBBF24] h-full w-[98%]"></div>
              </div>
              <div className="text-[10px] font-extrabold text-[#FBBF24] uppercase tracking-widest text-right">98% Pass</div>
            </div>
          </motion.div>

          {/* Card 3: Data Sovereignty */}
          <motion.div
            className="bg-[#EFF6FF] p-8 rounded-[2rem] border border-slate-100 flex flex-col h-full"
            custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            <div className="w-12 h-12 bg-[#111827] rounded-xl flex items-center justify-center text-white mb-6">
              <FiDatabase className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-extrabold text-[#111827] mb-4">Data Sovereignty</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-12 flex-grow">
              In-country data residency and zero-trust access protocols. AES-256 encryption ensures regional data remains under strict jurisdiction control.
            </p>
            <div className="flex gap-4 opacity-50">
              <FiShield className="w-5 h-5 text-slate-900" aria-hidden="true" />
              <FiGlobe className="w-5 h-5 text-slate-900" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Card 4: Portable Identity */}
          <motion.div
            className="bg-[#EFF6FF] p-8 rounded-[2rem] border border-slate-100 flex flex-col h-full"
            custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            <div className="w-12 h-12 bg-[#111827] rounded-xl flex items-center justify-center text-white mb-6">
              <FiLock className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-extrabold text-[#111827] mb-4">Portable Identity</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-12 flex-grow">
              Unique Identity Protocol allows accommodation records to travel with talent globally, eliminating disclosure fatigue and accelerating onboarding.
            </p>
            <div className="border-t border-slate-200 pt-4 text-[10px] font-extrabold text-[#92400E] uppercase tracking-widest">
              Active Protocol System
            </div>
          </motion.div>
        </div>

        {/* Security Infrastructure Dark Panel */}
        <motion.div
          className="bg-[#151E2D] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-extrabold text-white mb-10 tracking-tight">Integrated Security Infrastructure</h3>
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                <div className="flex items-start gap-4">
                  <FiCheckCircle className="w-5 h-5 text-[#FBBF24] mt-1 shrink-0" aria-hidden="true" />
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">Automated compliance audits across all regional nodes.</p>
                </div>
                <div className="flex items-start gap-4">
                  <FiZap className="w-5 h-5 text-[#FBBF24] mt-1 shrink-0" aria-hidden="true" />
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">Zero third-party data sharing or external routing protocols.</p>
                </div>
                <div className="flex items-start gap-4">
                  <FiDatabase className="w-5 h-5 text-[#FBBF24] mt-1 shrink-0" aria-hidden="true" />
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">Adaptive interface scaling for diverse sensory needs.</p>
                </div>
                <div className="flex items-start gap-4">
                  <FiShare2 className="w-5 h-5 text-[#FBBF24] mt-1 shrink-0" aria-hidden="true" />
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">Securely transferred records across NGO and partner networks.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl text-center backdrop-blur-sm min-w-[200px]">
                <div className="text-4xl font-black text-[#FBBF24] mb-1">100%</div>
                <div className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest leading-tight">
                  Sovereign Control
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustFoundation;
