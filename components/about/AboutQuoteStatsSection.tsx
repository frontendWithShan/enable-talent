"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AboutQuoteStatsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} className="flex w-full flex-col items-center justify-center overflow-hidden bg-white py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-32 flex flex-col items-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-6 h-28 w-28 overflow-hidden rounded-full bg-[#a5c7f7de] shadow-lg md:h-32 md:w-32"
        >
          <Image
            src="/images/about-us/quote-stats/Amandipp%27s-words.png"
            alt="Amandipp Singh"
            width={128}
            height={128}
            className="h-full w-full object-cover"
            priority
          />
        </motion.div>
        <blockquote className={`${plusJakartaSans.className} mb-4 max-w-4xl px-4 text-center text-2xl font-medium italic text-gray-800 md:text-3xl`}>
          &quot;Every great hire starts with seeing potential others miss.
          <br />
          That&apos;s what we help companies do every day.&quot;
        </blockquote>
        <span className="text-lg font-semibold text-gray-500 md:text-xl">Amandipp Singh</span>
      </motion.div>

      <div className="mx-auto mb-12 mt-[6.5rem] flex w-full max-w-6xl flex-col items-center gap-10 px-4 md:flex-row md:items-start md:gap-14 md:px-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex w-full flex-shrink-0 justify-center md:w-auto md:justify-start"
        >
          <div className="rounded-[40px] bg-[#f4ece0] px-5 pb-8 pt-8 shadow-sm sm:px-12 sm:pb-14 sm:pt-12">
            <div className="relative h-[395px] w-[275px] sm:w-[495px]">
              <motion.div
                style={{ y: imgY }}
                className="absolute left-0 top-0 z-10 h-[415px] w-[275px] overflow-hidden rounded-3xl shadow-2xl"
              >
                <Image
                  src="/images/about-us/quote-stats/younger-female-employee-looking.png"
                  alt="Younger Female Employee"
                  fill
                  className="h-full w-full object-cover"
                  sizes="310px"
                  priority
                />
              </motion.div>

              <motion.div
                style={{ y: statsY }}
                className="absolute right-6 top-[11rem] z-10 hidden h-[255px] w-[195px] overflow-hidden rounded-3xl shadow-2xl sm:block"
              >
                <Image
                  src="/images/about-us/quote-stats/business-person-in-modern-office.png"
                  alt="Business Person in Modern Office"
                  fill
                  className="h-full w-full object-cover"
                  sizes="210px"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 18 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                className="absolute right-1 top-[9.5rem] z-20 flex h-[132px] w-[132px] items-center justify-center rounded-3xl bg-[#C3D8F6C7] shadow-xl backdrop-blur-sm sm:right-[-16px] sm:top-[64px] sm:h-[152px] sm:w-[152px]"
              >
                <span className="text-4xl font-bold text-slate-800 sm:text-5xl">1.3B</span>
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: -18 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
                className="absolute right-3 top-[-24px] z-20 flex h-[132px] w-[132px] items-center justify-center rounded-3xl bg-[#FFD071] shadow-xl backdrop-blur-sm sm:right-[158px] sm:top-[-38px] sm:h-[152px] sm:w-[152px]"
              >
                <span className="text-4xl font-bold text-slate-800 sm:text-5xl">16%</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex max-w-xl flex-1 flex-col items-start justify-center px-6 md:px-0"
        >
          <h3
            className={`${plusJakartaSans.className} mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl`}
          >
            Unlocking
            <br />
            <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent whitespace-nowrap">
              Workforce Potential
            </span>
          </h3>
          <p className="text-lg leading-relaxed text-gray-800 sm:text-xl md:text-2xl">
            <span className="font-bold">1.3 billion</span> people worldwide live with disabilities.{" "}
            <span className="font-bold">16%</span> of our global population. Despite their qualifications and
            capabilities, most face significant barriers accessing meaningful employment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
