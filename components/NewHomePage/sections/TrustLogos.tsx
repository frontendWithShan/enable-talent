"use client";

import { motion } from 'framer-motion';

const logos = [
  { key: "unicef", src: "/images/SectionPartners/unicef.png", name: "UNICEF Startup Lab" },
  { key: "aws", src: "/images/SectionPartners/AWS.png", name: "AWS Startup Programs" },
  { key: "nvidia", src: "/images/SectionPartners/Nvidia.png", name: "NVIDIA Inception Program" },
  { key: "microsoft", src: "/images/SectionPartners/Microsoft.png", name: "Microsoft For Startups" },
];

const TrustLogos = () => {
  const repeated = [...logos, ...logos, ...logos, ...logos];
  return (
    <section className="bg-white border-y border-[#DFDFDF] overflow-hidden">
      <div className="max-w-[1920px] mx-auto py-16 md:h-[365px] flex flex-col justify-center items-center px-4 md:px-8">
        <h2 className="text-2xl md:text-[36px] font-normal text-[#111827] mb-12 text-center leading-[1.43] tracking-[0.08em]">
          Trusted by organizations building the <br className="hidden md:block" /> future of work
        </h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex w-max gap-12 md:gap-24 items-center opacity-90 hover:opacity-100"
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
            style={{ x: 0 }}
          >
            {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
              <div key={`${logo.key}-${idx}`} className="flex-shrink-0">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-10 md:h-14 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
