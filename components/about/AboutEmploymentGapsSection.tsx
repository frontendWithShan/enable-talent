"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion } from "framer-motion";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const cards = [
  {
    region: "Europe",
    stats: "2-3x higher",
    description: "unemployment rates for people with disabilities",
    bgColor: "bg-[#f4ece0]",
    image: "/images/about-us/employment-gaps/europe.png",
  },
  {
    region: "Africa & Latin America",
    stats: "80-90%",
    description: "unemployment rates",
    bgColor: "bg-[#dfeaff]",
    image: "/images/about-us/employment-gaps/africa.png",
  },
  {
    region: "North America",
    stats: "Only 35%",
    description: "employment rate vs. 78% for people without disabilities",
    bgColor: "bg-[#f4ece0]",
    image: "/images/about-us/employment-gaps/north-america.png",
  },
  {
    region: "Asia-Pacific",
    stats: "Over 370M",
    description: "face unemployment rates exceeding 80%",
    bgColor: "bg-[#dfeaff]",
    image: "/images/about-us/employment-gaps/asia-pacific.png",
  },
];

export default function AboutEmploymentGapsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h3
            className={`${plusJakartaSans.className} mb-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl`}
          >
            The Employment Gaps <br />
            <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
              Persist Across Regions
            </span>
          </h3>
          <p className="mx-auto max-w-none text-lg leading-relaxed text-slate-600">
            What these statistics represent isn&apos;t just missed opportunities or unrealized creativity,
            <br />
            it&apos;s resilience and problem-solving approaches that could strengthen organizations and drive innovation across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <motion.article
              key={card.region}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col rounded-[32px] ${card.bgColor} p-6 shadow-sm`}
            >
              <div className="relative mb-5 h-48 overflow-hidden rounded-3xl sm:h-56 lg:h-60">
                <Image
                  src={card.image}
                  alt={card.region}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="flex flex-grow flex-col">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  {card.region}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  {card.stats}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {card.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex justify-center px-4"
        >
          <p className="mx-auto w-full max-w-none text-center text-[18px] font-bold leading-relaxed whitespace-normal sm:text-[22px] lg:whitespace-nowrap lg:text-[28px] lg:-translate-x-15">
            <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
              This represents an opportunity to unlock one of the workforce&apos;s most underutilized talent pools.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
