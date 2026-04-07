import { JSX } from "react";
import Image, { type StaticImageData } from "next/image";
import MatchBased from "@/public/images/Employers/MatchBased.png";
import BiasFree from "@/public/images/Employers/BiasFree.png";
import Inclusive from "@/public/images/Employers/Inclusive.png";
import Faster from "@/public/images/Employers/FasterShortlisting.png";
import IntegratedMessaging from "@/public/images/Employers/IntegratedMessaging.png";
import EmployerAgent from "@/public/images/EmployerAgent/AgentImage.png";
import EnableAgentMobile from "@/public/images/EmployerAgent/EnableAgentMobile.svg";

type SupportItem = {
  id: string;
  title: string;
  description: string;
  icon: StaticImageData;
  iconAlt: string;
};

const items: SupportItem[] = [
  {
    id: "auto-generated-talent-searches",
    title: "Auto-generated talent searches",
    description:
      "Simply input the role, and your Agent builds a structured, high-precision search query—no Boolean or manual filtering required.",
    icon: MatchBased,
    iconAlt: "Icon representing match-based hiring",
  },
  {
    id: "intelligent-candidate-screening",
    title: "Intelligent candidate screening",
    description:
      "Your Agent automatically assesses each profile against role criteria, delivering high-signal candidates while filtering out noise.",
    icon: BiasFree,
    iconAlt: "Icon representing bias-free screening",
  },
  {
    id: "personalized-outreach-at-scale",
    title: "Personalized outreach at scale",
    description:
      "Agents send custom emails using dynamic fields and contextual cues, making outreach feel human even when fully automated.",
    icon: Inclusive,
    iconAlt: "Icon representing inclusivity",
  },
  {
    id: "continuous-talent-discovery",
    title: "Continuous talent discovery",
    description:
      "Agents rerun sourcing jobs over time, surface new talent, and keep your pipeline fresh.",
    icon: Faster,
    iconAlt: "Icon representing faster shortlisting",
  },
  {
    id: "real-time-reporting-feedback-loops",
    title: "Real-time reporting & feedback loops",
    description:
      "See candidate quality, response rates, and Agent behavior so you can adjust preferences and improve results.",
    icon: IntegratedMessaging,
    iconAlt: "Icon representing integrated messaging",
  },
  {
    id: "multi-agent-flexibility",
    title: "Multi-agent flexibility",
    description:
      "Deploy multiple Agents across openings, each with tailored search, evaluation, and outreach logic.",
    icon: IntegratedMessaging,
    iconAlt: "Icon representing integrated messaging",
  },
];

export default function EnableAgentHeroAbout(): JSX.Element {
  return (
    <section
      aria-labelledby="agent-features-heading"
      className="relative w-[90%] mx-auto min-h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden px-4 py-16 sm:py-20 rounded-3xl shadow-lg"
    >
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="z-10 flex flex-col items-center w-full text-center gap-8 pb-8">
        <header className="space-y-4">
          <p className="inline-flex items-center rounded-full bg-gray-200 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-700">
            Agent Features
          </p>
          <h2
            id="agent-features-heading"
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500 leading-tight"
          >
            Everything your AI recruiter
            <br />
            <span className="text-black">handles automatically</span>
          </h2>
        </header>

        <figure className="w-full mt-4 flex items-center justify-center">
          <Image
            src={EnableAgentMobile}
            alt="AI recruiter handling tasks automatically"
            width={900}
            height={900}
            className="w-[90vw] max-w-4xl rounded-3xl object-cover border-6 border-white sm:hidden"
            priority
          />
          <Image
            src={EmployerAgent}
            alt="AI recruiter handling tasks automatically"
            width={1600}
            height={900}
            placeholder="blur"
            className="hidden w-[90vw] max-w-4xl rounded-3xl object-cover border-6 border-white sm:block"
            priority
          />
          <figcaption className="sr-only">
            Visual of the AI recruiter handling tasks automatically
          </figcaption>
        </figure>

        <section
          aria-labelledby="capabilities-heading"
          className="grid w-[90%] max-w-6xl gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <h2 id="capabilities-heading" className="sr-only">
            Agent capabilities
          </h2>
          <ul className="contents">
            {items.map((item) => (
              <li key={item.id} className="list-none">
                <article
                  aria-labelledby={`${item.id}-title`}
                  className="relative min-h-[260px] rounded-4xl p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg bg-white/70 backdrop-blur-sm border border-gray-100 h-full"
                >
                  <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                    <div className="space-y-6">
                      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),0_8px_10px_-6px_rgba(0,0,0,0.1)] ring-4 ring-white mx-auto sm:mx-0">
                          <Image
                            src={item.icon}
                            alt={item.iconAlt}
                            className="h-[90%] w-[90%] object-contain rounded-xl"
                          />
                        </div>
                        <div>
                          <h3
                            id={`${item.id}-title`}
                            className="text-2xl font-bold text-[#0F172A] mb-4 mt-8"
                          >
                            {item.title}
                          </h3>
                          <p className="mt-2 text-base leading-[1.6] text-[#4B5563]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
