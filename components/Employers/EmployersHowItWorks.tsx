import { JSX } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import ConnectCandidate from "@/public/images/Employers/ConnectCandidate.png";
import CreateProfile from "@/public/images/Employers/CreateProfile.png";
import PostJobs from "@/public/images/Employers/PostJobs.png";
import RankedCandidates from "@/public/images/Employers/RankedCandidates.png";
import FancyButtonNoIcon from "../FancyButtonNoIcon";

type SupportItem = {
  id: string;
  step: string;
  title: string;
  description: string;
  tone: "cream" | "blue";
  icon: StaticImageData;
  iconAlt: string;
  features: string[];
  button?: string;
  footerNote?: string;
};

const items: SupportItem[] = [
  {
    id: "create-profile",
    step: "STEP 1",
    title: "Create Your Company Profile",
    description:
      "Add your company details, logo, team size, hiring goals, and accessibility preferences.",
    tone: "cream",
    icon: CreateProfile,
    iconAlt: "Icon representing profile creation",
    features: [
      "Takes less than 5 minutes",
      "Build trust and transparency with candidates",
      "All employer accounts include accessibility support options",
    ],
    button: "Create Profile",
  },
  {
    id: "post-job",
    step: "STEP 2",
    title: "Post Your Jobs",
    description:
      "Publish openings with clear requirements and accessibility notes.",
    tone: "blue",
    icon: PostJobs,
    iconAlt: "Icon representing job posting",
    features: [
      "Add job title, responsibilities, salary range, location",
      "Mention workplace accommodations and flexibility options",
      "Jobs appear instantly to matching candidates",
    ],
    button: "Post a Job",
  },
  {
    id: "review-candidates",
    step: "STEP 3",
    title: "Review Ranked Candidates",
    description: "Every applicant is automatically analyzed and ranked.",
    tone: "blue",
    icon: RankedCandidates,
    iconAlt: "Icon representing candidate review",
    features: [
      "Candidates displayed with a Match Percentage",
      "Ranking factors include skills, experience, accessibility needs, and alignment",
      "View key details without opening every resume",
    ],
    footerNote: "Top Matches Rise to the Top",
  },
  {
    id: "connect",
    step: "STEP 4",
    title: "Connect With Candidates Easily",
    description:
      "Send messages directly inside the platform — or use auto-generated email templates.",
    tone: "cream",
    icon: ConnectCandidate,
    iconAlt: "Icon representing candidate connection",
    features: [
      "System writes personalized employer outreach emails",
      "You can edit, customize, or send with one click",
      "Keep communication consistent and fast",
    ],
  },
];

export default function EmployersHowItWorks(): JSX.Element {
  return (
    <section
      aria-labelledby="employers-how-it-works-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-6 inline-flex items-center rounded-full bg-neutral-200 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
            HOW ENABLED JOBS WORKS
          </p>
          <h2
            id="employers-how-it-works-heading"
            className="text-[2.5rem] font-bold tracking-tight text-[#1A202C]"
          >
            Simple, Fast & <br />
            <span className="text-[#8C4A0E]">Designed for Real Hiring</span>
          </h2>
        </header>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {items.map((item) => {
            const isCream = item.tone === "cream";
            const baseColor = isCream ? "#FFFBF0" : "#EAF4FF";
            const overlay = isCream
              ? "card-bg-grid-cream"
              : "card-bg-grid-blue";

            return (
              <article
                key={item.id}
                aria-labelledby={`${item.id}-title`}
                className={`relative min-h-[260px] rounded-[32px] ${overlay} p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg`}
                style={{
                  backgroundColor: baseColor,

                  backgroundSize: "18px 18px",
                }}
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="space-y-5">
                    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                      {/* Step badge */}
                      <div className="flex mb-10 mt-10 w-max items-center justify-center rounded-full bg-[#8A4A12] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white mx-auto sm:mx-0 sm:justify-start">
                        {item.step}
                      </div>

                      {/* Icon on its own row */}
                      <div className="flex h-30 w-30 items-center justify-center rounded-[20px] bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),0_8px_10px_-6px_rgba(0,0,0,0.1)] ring-4 ring-white mx-auto sm:mx-0">
                        <Image
                          src={item.icon}
                          alt={item.iconAlt}
                          className="h-[90%] w-[90%] object-contain rounded-4xl"
                        />
                      </div>

                      {/* Title + description */}
                      <div>
                        <h3
                          id={`${item.id}-title`}
                          className="text-2xl font-bold text-[#0F172A] mb-6 mt-12"
                        >
                          {item.title}
                        </h3>
                        <p className="mt-3 text-base leading-[1.6] text-[#4B5563]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-3">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2 text-base text-[#4B5563]"
                        >
                          <span className="text-[#C27835] font-extrabold">
                            →
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Button only for STEP 1 & STEP 2 */}
                    {item.button ? (
                      <div>
                        <Link
                          href={
                            item.button === "Post a Job"
                              ? "https://app.enabledtalent.com/login-employer"
                              : "https://app.enabledtalent.com/signup-employer"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FancyButtonNoIcon label={item.button} />
                        </Link>
                      </div>
                    ) : null}

                    {/* Footer note only for STEP 3 (or others if provided) */}
                    {item.footerNote ? (
                      <p className="text-base font-semibold italic text-[#1F2937]">
                        {item.footerNote}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
