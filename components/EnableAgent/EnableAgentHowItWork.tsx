import { JSX } from "react";
import Image, { type StaticImageData } from "next/image";

import AgentWhat from "@/public/images/EmployerAgent/AgentWhat.png";
import AgentUnderstands from "@/public/images/EmployerAgent/AgentUnderstands.png";
import AgentFinds from "@/public/images/EmployerAgent/AgentFinds.png";
import AgentGenerates from "@/public/images/EmployerAgent/AgentGenerates.png";
import ReachOut from "@/public/images/EmployerAgent/ReachOut.png";

type Step = {
  id: string;
  stepLabel: string;
  title: string;
  description: string;
  icon: StaticImageData;
  iconAlt: string;
  tone: "cream" | "blue";
  isCoted?: boolean;
};

const steps: Step[] = [
  {
    id: "Agent-what-you-need",
    stepLabel: "STEP 1",
    title: "Tell Enabled Agent What You Need",
    description:
      'Paste a full job description or type: "I need a junior designer familiar with Canva and social media."',
    icon: AgentWhat,
    iconAlt: "Agent taking your role requirements",
    tone: "cream",
    isCoted: true,
  },
  {
    id: "Agent-understands-role",
    stepLabel: "STEP 2",
    title: "Enabled Agent Understands the Role Instantly",
    description:
      "It extracts skills, tools, seniority level, responsibilities, accessibility needs.",
    icon: AgentUnderstands,
    iconAlt: "Agent extracting skills and responsibilities",
    tone: "blue",
    isCoted: false,
  },
  {
    id: "Agent-finds-and-ranks-candidates",
    stepLabel: "STEP 3",
    title: "Enabled Agent Finds and Ranks Candidates",
    description:
      "It searches your talent pool (or external sources you integrate with) and sorts matches from highest to lowest.",
    icon: AgentFinds,
    iconAlt: "Agent ranking best-matching candidates",
    tone: "cream",
    isCoted: false,
  },
  {
    id: "Agent-generates-fit-report",
    stepLabel: "STEP 4",
    title: "Enabled Agent Generates a Fit Report",
    description:
      "You receive a clear breakdown of why each candidate is a match or not.",
    icon: AgentGenerates,
    iconAlt: "Agent producing a candidate fit report",
    tone: "blue",
    isCoted: false,
  },
  {
    id: "Agent-reach-out-instantly",
    stepLabel: "STEP 5",
    title: "Reach Out Instantly",
    description:
      "You receive a clear breakdown of why each candidate is a match or not.",
    icon: ReachOut,
    iconAlt: "Agent sending outreach to candidates",
    tone: "cream",
    isCoted: false,
  },
];

export default function EnableAgentHowItWork(): JSX.Element {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14 container mx-auto "
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center sm:mb-12">
          <span className="inline-flex mb-10 w-fit items-center rounded-full bg-[#F3F4F6] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1F2937]">
            How it works
          </span>

          <h2
            id="how-it-works-heading"
            className="text-[2.5rem] font-bold tracking-tight text-[#8C4A0E]"
          >
            Hiring Made Simple. <br />
            <span className="text-[#1A202C]">No Job Posting Needed.</span>
          </h2>
        </header>

        <div className="grid-lines-bg rounded-[32px] p-6 sm:p-8 lg:p-10">
          <ol className="flex flex-col gap-10 sm:gap-12" role="list">
            {steps.map((step, index) => {
              const isEvenIndex = index % 2 === 0;

              const cardDesktopClasses = isEvenIndex
                ? "md:order-2 md:justify-end"
                : "md:order-1 md:justify-start";

              const textDesktopClasses = isEvenIndex
                ? "md:order-1 md:pr-6 lg:pr-2"
                : "md:order-2 md:pl-6 lg:pl-2";

              const quotedParts =
                step.isCoted && step.description
                  ? step.description.match(/^(.*?):\s*\"(.*)\"/)
                  : null;
              const introText = quotedParts?.[1];
              const quotedText = quotedParts?.[2];

              return (
                <li
                  key={step.id}
                  aria-labelledby={`${step.id}-title`}
                  className="grid lg:gap-0 rounded-[28px] p-8 md:grid-cols-2 md:items-center sm:p-10"
                >
                  <div
                    className={`order-1 flex justify-center ${cardDesktopClasses}`}
                  >
                    <figure className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-[28px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] sm:h-64 sm:w-64">
                      <Image
                        src={step.icon}
                        alt={step.iconAlt}
                        className="h-full w-full object-cover"
                      />
                    </figure>
                  </div>

                  <div
                    className={`order-2 max-w-xl text-center md:text-left ${textDesktopClasses}`}
                  >
                    <p className="inline-flex mt-6 items-center rounded-full bg-[#8A4A12] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:text-xs">
                      {step.stepLabel}
                    </p>
                    <h3
                      id={`${step.id}-title`}
                      className="mt-6 text-[1.5rem] font-bold text-[#1A202C]"
                    >
                      {step.title}
                    </h3>
                    <p className="mt-6 text-base leading-[1.6] text-[#49566b]">
                      {step.isCoted && introText && quotedText ? (
                        <>
                          {`${introText}:`}
                          <br />
                          <span className="text-black">&quot;{quotedText}&quot;</span>
                        </>
                      ) : (
                        step.description
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
