"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function GuidanceCareerCentres() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      aria-labelledby="guidance-career-title"
      className={`${plusJakartaSans.className} bg-white px-4 py-12 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.1fr] lg:items-start">
          <div className="space-y-6 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="inline-flex items-center rounded-full bg-[#e5e5e5] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-900">
              Career coaching for students
            </div>
            <h2
              id="guidance-career-title"
              className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-[68px]"
            >
              Guidance when it
              <br />
              matters most
            </h2>
            <p className="max-w-md text-[16px] leading-7 font-semibold text-black/70 sm:text-[20px] sm:leading-[36px]">
              Enabled Talent includes access to a career coach who helps students make sense of their options and prepare for the workplace.
            </p>
            <span className="inline-flex w-full items-center justify-center sm:w-auto">
              <FancyButton
                label="Support your students"
                color="navy"
                as="button"
                onClick={() => setIsModalOpen(true)}
              />
            </span>
          </div>

          {/* Right side cards */}
          <div className="mt-6 flex flex-col gap-4 pl-0 sm:mt-1 sm:pl-16">
            <h3 className="text-xl font-bold text-slate-900 text-center sm:text-left sm:text-2xl">What Career Centres Can Do</h3>
            <div className="flex gap-4">
              <div className="relative hidden flex-col gap-3 pt-4 sm:flex">
                <Image
                  src="/images/students/Guidance%20when%20it%20matters%20most/divider%20for%20guidance.png"
                  alt=""
                  width={12}
                  height={260}
                  className="h-73 w-3"
                  priority
                />
                <Image
                  src="/images/students/Guidance%20when%20it%20matters%20most/red%20part%20of%20divider.png"
                  alt=""
                  width={12}
                  height={80}
                  className="absolute left-0 top-0 h-24 w-3"
                  priority
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="relative w-full overflow-hidden rounded-[20px] sm:w-[118%] sm:max-w-none">
                  <Image
                    src="/images/students/Guidance%20when%20it%20matters%20most/share-pink-block-background.jpeg"
                    alt=""
                    width={900}
                    height={280}
                    className="h-auto w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6 py-5 sm:px-8">
                    <p className="text-[16px] font-bold text-slate-900 sm:text-[18px]">
                      Share jobs, internships, and events with students
                    </p>
                    <p className="text-[14px] leading-[1.4] text-slate-600 sm:text-[15px]">
                      Our comprehensive selection of medications, supplements, and healthcare products.
                    </p>
                  </div>
                </div>
                <div className="relative w-full overflow-hidden rounded-[20px] sm:w-[118%] sm:max-w-none">
                  <Image
                    src="/images/students/Guidance%20when%20it%20matters%20most/host-employer-white-block-background.jpeg"
                    alt=""
                    width={900}
                    height={280}
                    className="h-auto w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 flex flex-col justify-center gap-2 px-6 py-5 sm:px-8">
                    <p className="text-[16px] font-bold text-slate-900 sm:text-[18px]">
                      Host employer sessions and workshops
                    </p>
                    <p className="text-[14px] leading-[1.4] text-slate-600 sm:text-[15px]">
                      From advanced imaging technology such as MRI and CT scanners to precision surgical tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[24px] leading-[32px] font-bold bg-gradient-to-r from-[#c0412c] to-[#f4c15d] bg-clip-text text-transparent text-center">
            One platform to support students from campus to career.
          </p>
        </div>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Support Your Students"
        description="Career-centre support tools are coming soon. We're preparing onboarding for institutions."
      />
    </section>
  );
}

