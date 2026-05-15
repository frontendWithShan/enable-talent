"use client";

import { motion } from 'framer-motion';

const partners = [
  { name: "UNICEF", src: "/images/SectionPartners/unicef.png" },
  { name: "AWS", src: "/images/SectionPartners/AWS.png" },
  { name: "NVIDIA", src: "/images/SectionPartners/Nvidia.png" },
  { name: "Microsoft", src: "/images/SectionPartners/Microsoft.png" },
];

const PartnersScroll = () => {
  const repeatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="bg-white py-24 border-t border-slate-100 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 text-center mb-12 md:mb-16">
        <motion.h2
          className="text-2xl md:text-[36px] font-bold text-[#111827] mb-4 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          Trusted by organizations building the future of work
        </motion.h2>
        <motion.p
          className="text-slate-400 text-base md:text-lg font-medium"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Universities, governments, and partners across the world
        </motion.p>
      </div>

      <div
        className="relative w-full overflow-hidden py-8"
      >
        <motion.div 
          className="flex w-max gap-12 md:gap-32 items-center opacity-90 hover:opacity-100"
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 70,
              ease: "linear",
            },
          }}
          style={{ x: 0 }}
        >
          {[...partners, ...partners, ...partners, ...partners].map((partner, idx) => (
            <div key={`${partner.name}-${idx}`} className="flex-shrink-0">
              <img
                src={partner.src}
                alt={partner.name}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default PartnersScroll;
