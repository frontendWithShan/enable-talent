"use client";

import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { FiUser, FiBriefcase, FiBookOpen, FiUsers, FiAward } from 'react-icons/fi';
import {
  TalentGraphic1,
  TalentGraphic2,
  TalentGraphic3,
  MatchPreviewGraphic,
  ComplianceReportingGraphic,
  UniversityGraphic1,
  UniversityGraphic2,
  UniversityGraphic3,
  NGOGraphic1,
  NGOGraphic2,
  NGOGraphic3,
  GovernmentGraphic1,
  GovernmentGraphic2,
  GovernmentGraphic3,
  EmployerAccessibilityGraphic
} from '@/components/NewHomePage/graphics';

const tabs = [
  { id: 'talent', label: 'For Talent', icon: FiUser },
  { id: 'employers', label: 'For Employers', icon: FiBriefcase },
  { id: 'universities', label: 'For Universities', icon: FiBookOpen },
  { id: 'ngos', label: 'For NGOs', icon: FiUsers },
  { id: 'governments', label: 'For Governments', icon: FiAward },
];

const HowItWorks = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 1000 : 100,
    damping: shouldReduceMotion ? 100 : 30
  });

  const totalSteps = 15;
  const activeStep = useTransform(smoothProgress, [0, 1], [0, totalSteps - 1]);

  const [activeTab, setActiveTab] = useState('talent');
  useEffect(() => {
    return smoothProgress.on('change', (p) => {
      const index = Math.max(0, Math.min(Math.floor(p * 5), tabs.length - 1));
      setActiveTab(tabs[index].id);
    });
  }, [smoothProgress]);

  const bgColor = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#030e1d", "#0F141A", "#030e1d", "#0F141A", "#030e1d", "#030e1d"]
  );

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (id: string) => {
    const index = tabs.findIndex(tab => tab.id === id);
    const targetP = index / 5;
    const container = containerRef.current;
    if (container) {
      const scrollTarget = container.offsetTop + (container.offsetHeight * targetP);
      window.scrollTo({ top: scrollTarget, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }

    if (newIndex !== index) {
      handleTabClick(tabs[newIndex].id);
      tabRefs.current[newIndex]?.focus();
    }
  };

  const stakeholderData = [
    {
      id: 'talent',
      blocks: [
        {
          tag: 'Smart Job Feed',
          title: <>Jobs filtered by what you<br className="hidden md:block" /> actually need, not just keywords</>,
          desc: 'Filter by remote-first, low-sensory environments, flexible scheduling, or screen reader compatibility before you read a single job description.',
          graphic: TalentGraphic1
        },
        {
          tag: 'Transparent Matching',
          title: <>Three scores, plain language.<br className="hidden md:block" /> No black boxes.</>,
          desc: 'Every job shows an Overall match, Skills fit, and Workplace fit score. Candidates make informed decisions, not hopeful guesses.',
          graphic: TalentGraphic2,
        },
        {
          tag: 'Disclosure Control',
          title: <>You decide what employers<br className="hidden md:block" /> see. Always.</>,
          desc: 'Toggle exactly which accommodation details are shared. Your diagnosis is never disclosed.',
          graphic: TalentGraphic3
        }
      ]
    },
    {
      id: 'employers',
      blocks: [
        {
          tag: 'Readiness Score',
          title: <>Know your inclusion readiness<br className="hidden md:block" /> before you post</>,
          desc: 'A 2-minute questionnaire scores your workplace across physical setup, assistive technology, and process.',
          graphic: EmployerAccessibilityGraphic
        },
        {
          tag: 'Match Preview',
          title: <>See who matches before<br className="hidden md:block" /> you go live</>,
          desc: 'Gap flags warn you when a strong skills match has a low accommodation fit. Hire with visibility.',
          graphic: MatchPreviewGraphic,
        },
        {
          tag: 'Compliance',
          title: <>Accessibility and DEI<br className="hidden md:block" /> reporting automated</>,
          desc: 'Quarterly reports for ESG disclosures and regional accessibility obligations are auto-generated.',
          graphic: ComplianceReportingGraphic
        }
      ]
    },
    {
      id: 'universities',
      blocks: [
        {
          tag: 'Job Moderation',
          title: <>Every posting reviewed by<br className="hidden md:block" /> your team first</>,
          desc: 'Reject non-compliant postings and maintain full editorial control over your campus job feed.',
          graphic: UniversityGraphic1
        },
        {
          tag: 'NACE Reporting',
          title: <>First-destination data<br className="hidden md:block" /> populated automatically</>,
          desc: 'Employment outcomes and salary data are captured directly from the matching workflow.',
          graphic: UniversityGraphic2,
        },
        {
          tag: 'Employer Gating',
          title: <>Invite-only access.<br className="hidden md:block" /> Your campus, your rules.</>,
          desc: 'Control which employers can interact with your student body. Zero cross-tenant data leakage.',
          graphic: UniversityGraphic3
        }
      ]
    },
    {
      id: 'ngos',
      blocks: [
        {
          tag: 'Case Management',
          title: <>Client status visible across<br className="hidden md:block" /> your entire team</>,
          desc: 'Track job readiness and placement status for your entire caseload in real-time.',
          graphic: NGOGraphic1
        },
        {
          tag: 'Funder Reporting',
          title: <>Grant reports generated<br className="hidden md:block" /> from outcomes</>,
          desc: 'Auto-populated reports for foundations and government funders. No more spreadsheets.',
          graphic: NGOGraphic2,
        },
        {
          tag: 'Employer Pipeline',
          title: <>Build direct relationships<br className="hidden md:block" /> without cold outreach</>,
          desc: 'Access a shared employer network already vetted for inclusive hiring.',
          graphic: NGOGraphic3
        }
      ]
    },
    {
      id: 'governments',
      blocks: [
        {
          tag: 'Program Dashboard',
          title: <>See every participant and<br className="hidden md:block" /> outcome in one view</>,
          desc: 'Track participant progress and provider performance against program targets.',
          graphic: GovernmentGraphic1
        },
        {
          tag: 'Accountability',
          title: <>Track every dollar from<br className="hidden md:block" /> allocation to outcome</>,
          desc: 'See exactly how service providers are deploying funds and generating outcomes.',
          graphic: GovernmentGraphic2,
        },
        {
          tag: 'Audit Readiness',
          title: <>Regional compliance<br className="hidden md:block" /> auto-verified</>,
          desc: 'Every action generates an audit trail. Deploy in any jurisdiction with confidence.',
          graphic: GovernmentGraphic3
        }
      ]
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor: shouldReduceMotion ? "#030e1d" : bgColor }}
      className="text-white border-t border-slate-800 relative h-[1500vh] snap-start"
      id="nh-how-it-works"
      aria-label="How it works for each stakeholder"
    >
      {/* Snap Points for the 15 steps */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="h-[100vh] snap-start snap-always"
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center px-4 pt-24 pb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-light text-white mb-4 tracking-tight">
          See How Each Solution Works
        </h2>
      </div>

      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* Tabs */}
        <div className="z-50 bg-[#101827]/95 backdrop-blur-md border-y border-slate-800/50 mb-8 shadow-lg">
          <div className="max-w-[1920px] mx-auto px-4 md:px-8">
            <div
              className="flex overflow-x-auto justify-start md:justify-center py-4 gap-2"
              role="tablist"
              aria-label="Stakeholder steps"
            >
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={el => { tabRefs.current[index] = el; }}
                    className={`relative flex items-center gap-3 px-8 h-[48px] text-base font-bold transition-all whitespace-nowrap rounded-full cursor-pointer ${isActive ? 'text-[#111827]' : 'text-slate-400 hover:text-white'}`}
                    onClick={() => handleTabClick(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`nh-howitworks-panel-${tab.id}`}
                    id={`nh-howitworks-tab-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nhHowItWorksActiveTab"
                        className="absolute inset-0 bg-[#fbbf24] rounded-full shadow-lg"
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <Icon className="relative z-10" aria-hidden="true" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Storyboard Container */}
        <div className="flex-1 relative w-full max-w-[1920px] mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-center">
          {stakeholderData.map((stakeholder, sIndex) => (
            <div
              key={stakeholder.id}
              id={`nh-howitworks-panel-${stakeholder.id}`}
              role="tabpanel"
              aria-labelledby={`nh-howitworks-tab-${stakeholder.id}`}
              className="absolute inset-y-0 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 flex items-center justify-center"
            >
              {stakeholder.blocks.map((block, bIndex) => {
                const globalIndex = sIndex * 3 + bIndex;
                const stepSize = 1 / 15;
                const start = globalIndex * stepSize;
                const end = (globalIndex + 1) * stepSize;
                const Graphic = block.graphic;

                return (
                  <motion.div
                    key={bIndex}
                    className="w-full"
                    style={{
                      opacity: useTransform(smoothProgress,
                        [start - 0.01, start, end - 0.01, end],
                        [0, 1, 1, 0]
                      ),
                      y: shouldReduceMotion ? 0 : useTransform(smoothProgress,
                        [start - 0.01, start, end - 0.01, end],
                        [20, 0, 0, -20]
                      ),
                      zIndex: 15 - globalIndex,
                      display: useTransform(smoothProgress, (p) => (p >= start - 0.015 && p <= end + 0.015 ? "block" : "none")),
                      position: "absolute"
                    }}
                  >
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                      <div className="flex flex-col justify-center">
                        <div className="inline-block px-4 py-1.5 bg-[#fbbf24] text-[#111827] text-[10px] font-bold rounded-full mb-6 tracking-widest uppercase self-start">
                          {block.tag}
                        </div>
                        <h3 className="text-2xl md:text-4xl font-light text-white mb-6 leading-tight">
                          {block.title}
                        </h3>
                        <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
                          {block.desc}
                        </p>
                      </div>
                      <div className="flex justify-center lg:justify-end">
                        <Graphic className="w-full max-w-[618px] h-auto" aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}

        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
