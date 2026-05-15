"use client";

import { FiUsers, FiBookOpen, FiBriefcase, FiHeart } from 'react-icons/fi';
import { RiGovernmentLine } from 'react-icons/ri';
import {
  Backgroundshadow1,
  Backgroundshadow2,
  Backgroundshadow3,
  Background,
  Background1,
  Overlay,
  UniversityBars,
  BackgroundverticalBordershadow
} from '@/components/NewHomePage/graphics';

const Solutions = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8" id="nh-solutions" aria-labelledby="nh-solutions-heading">
      <div className="max-w-[1280px] mx-auto">
        <div className="relative mb-16">
          <h2 id="nh-solutions-heading" className="text-4xl md:text-5xl font-extrabold text-[#111827] text-center mb-4">
            Solutions for Every Stakeholder
          </h2>
          <p className="text-slate-500 text-center text-lg max-w-2xl mx-auto">
            Enabled Talent connects the entire ecosystem into one accountable workflow.
          </p>
        </div>

        <div className="relative">

          {/* Asymmetrical Staggered Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-start">

            {/* Row 1 */}
            {/* For Employers (4/12) */}
            <div className="lg:col-span-4 bg-[#E8F1FF] rounded-[32px] p-8 md:p-10 flex flex-col reveal reveal-left">
              <div className="mb-4">
                <div className="w-10 h-10 bg-white/60 backdrop-blur rounded-xl flex items-center justify-center mb-6">
                  <FiBriefcase className="w-5 h-5 text-slate-700" aria-hidden="true" />
                </div>
                <span className="text-slate-600 font-bold text-sm tracking-tight block mb-2">For Employers</span>
                <h3 className="text-3xl font-extrabold text-[#111827] leading-[1.1] mb-6">
                  Hire inclusively without guessing what support looks like.
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-10">
                  Every candidate arrives with a completed accommodation profile and a connected support team. Your HR team receives pre matched candidates, onboarding guidance, and built in compliance reporting.
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-[#1E293B] rounded-lg flex items-center justify-center shrink-0">
                    <FiUsers className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-[#1E293B] font-bold text-sm">Candidate Match Index</span>
                </div>
                <div className="flex flex-col gap-4">
                  <BackgroundverticalBordershadow className="w-full h-auto drop-shadow-xl" preserveAspectRatio="none" aria-hidden="true" />
                  <Overlay className="w-full h-auto drop-shadow-lg" preserveAspectRatio="none" aria-hidden="true" />
                  <Background1 className="w-full h-auto drop-shadow-md" preserveAspectRatio="none" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* For Universities (8/12) */}
            <div className="lg:col-span-8 bg-[#F3F4F6] rounded-[32px] p-8 md:p-12 pb-6 md:pb-0 flex flex-col justify-between reveal reveal-right self-end">
              <div className="max-w-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <FiBookOpen className="w-5 h-5 text-slate-700" aria-hidden="true" />
                </div>
                <span className="text-slate-600 font-bold text-sm tracking-tight block mb-2">For Universities</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111827] leading-[1.1] mb-6">
                  Close the employment gap your campus is already accountable for.
                </h3>
                <p className="text-slate-600 text-base font-medium leading-snug mb-8 md:mb-4 max-w-none md:max-w-[50%]">
                  Enabled Talent connects your career centre and disability services office into one gated system where your institution controls employer access and owns its data.
                </p>
              </div>

              <div className="mt-auto relative w-[85%] mx-auto h-auto">
                <UniversityBars className="w-full h-auto" aria-hidden="true" />
              </div>
            </div>

            {/* Row 2 */}
            {/* For NGOs (8/12) */}
            <div className="lg:col-span-8 bg-[#0D121C] rounded-[32px] p-8 md:p-12 flex flex-col reveal reveal-left">
              <div className="max-w-2xl mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur">
                  <FiHeart className="w-5 h-5 text-[#FF9900]" aria-hidden="true" />
                </div>
                <span className="text-white/70 font-bold text-sm tracking-tight block mb-2">For NGOs</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.1] mb-6">
                  Replace spreadsheets with a system that connects clients directly.
                </h3>
                <p className="text-white/70 text-base font-medium leading-relaxed">
                  Manage caseloads, track employer relationships, and report to funders from one platform. Each client's status is visible in real time across your team.
                </p>
              </div>

              <div className="mt-auto w-full max-w-4xl">
                <div className="flex flex-col gap-4 w-full scale-95 origin-bottom">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Backgroundshadow1 className="w-full h-auto drop-shadow-md" aria-hidden="true" />
                    <Backgroundshadow2 className="w-full h-auto drop-shadow-md" aria-hidden="true" />
                  </div>
                  <Backgroundshadow3 className="w-full h-auto drop-shadow-md" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* For Governments (4/12) */}
            <div className="lg:col-span-4 bg-[#FFC661] rounded-[32px] p-8 md:p-10 flex flex-col reveal reveal-right">
              <div className="mb-4">
                <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur">
                  <RiGovernmentLine className="w-5 h-5 text-slate-800" aria-hidden="true" />
                </div>
                <span className="text-slate-800 font-bold text-sm tracking-tight block mb-2">For Governments</span>
                <h3 className="text-3xl font-extrabold text-[#111827] leading-[1.1] mb-6">
                  Fund employment programs and see exactly where every dollar goes.
                </h3>
                <p className="text-slate-700 text-sm font-medium leading-relaxed mb-10">
                  Deploy regional or national inclusion strategies with built in program accountability. Track outcomes across every service provider.
                </p>
              </div>

              <div className="mt-auto">
                <Background className="w-full h-auto max-h-[400px] object-contain drop-shadow-2xl mx-auto" aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
