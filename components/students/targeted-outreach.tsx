"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion } from "framer-motion";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function TargetedOutreach() {
  return (
    <section
      aria-labelledby="targeted-outreach-title"
      className={`${plusJakartaSans.className} bg-white px-4 py-24 sm:py-20 lg:py-28 overflow-hidden`}
    >
      <div className="mx-auto max-w-6xl text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center rounded-full bg-[#ededed] px-5 py-2 text-[16px] font-semibold uppercase tracking-[0.06em] text-[#1f1f1f]"
        >
          Targeted outreach
        </motion.div>
        <motion.h2
          id="targeted-outreach-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-[#111827] sm:text-[60px] lg:text-[72px]"
        >
          Reach the Right People
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[16px] leading-7 font-semibold text-black/50 sm:text-[24px] sm:leading-[1.5]"
        >
          Share opportunities and updates with the right audience
          <br />
          without mass emails.
        </motion.p>
      </div>

      <div className="mx-auto mt-8 max-w-6xl sm:mt-12">
        <div className="relative">
          {/* Stacked white blocks - Animated Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 0.75, scale: 1, y: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 hidden sm:flex items-center justify-center"
          >
            <Image
              src="/images/students/targeted%20outreach/white%20background.png"
              alt=""
              width={1200}
              height={620}
              className="w-[92%] sm:w-[84%]"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 0.88, scale: 1, y: 16 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 hidden sm:flex items-center justify-center"
          >
            <Image
              src="/images/students/targeted%20outreach/white%20background.png"
              alt=""
              width={1200}
              height={620}
              className="w-[96%] sm:w-[90%]"
              priority
            />
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 16 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="relative mx-auto flex w-full max-w-[980px] flex-row items-center justify-center gap-4 bg-transparent px-0 shadow-none min-h-0 sm:bg-transparent sm:shadow-none sm:gap-10 sm:rounded-[26px] sm:px-8 sm:py-8 lg:px-10 lg:py-10 sm:min-h-[360px]"
          >
            {/* Main card background */}
            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              <Image
                src="/images/students/targeted%20outreach/white%20background.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Woman image - Floating Hover Effect */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10 flex-shrink-0 mt-0 mb-0 sm:-my-12 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[16px] shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:rounded-[22px] transition-shadow duration-300 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
                <Image
                  src="/images/students/targeted%20outreach/woman%20thinking.png"
                  alt="Professional reviewing candidates"
                  width={340}
                  height={500}
                  className="h-[160px] w-[130px] object-cover sm:h-[420px] sm:w-[280px] lg:h-[460px] lg:w-[300px]"
                  priority
                />
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />
              </div>
            </motion.div>

            {/* Text - Staggered Slide In */}
            <div className="relative z-10 flex-1 text-left pl-6 sm:pl-8">
              <p className="text-[20px] font-extrabold leading-[1.2] text-[#0f172a] sm:text-[42px] lg:text-[52px]">
                {["Target by skills,", "education, or", "location"].map((line, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </p>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-[-50px] left-0 right-0 flex justify-center gap-4 sm:contents">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              aria-label="Previous slide"
              className="cursor-pointer sm:absolute sm:left-[-18px] sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
            >
              <Image
                src="/images/students/targeted%20outreach/left%20button.svg"
                alt=""
                width={80}
                height={80}
                className="h-9 w-9 sm:h-14 sm:w-14"
                priority
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              aria-label="Next slide"
              className="cursor-pointer sm:absolute sm:right-[-18px] sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
            >
              <Image
                src="/images/students/targeted%20outreach/right%20button.svg"
                alt=""
                width={80}
                height={80}
                className="h-9 w-9 sm:h-14 sm:w-14"
                priority
              />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
