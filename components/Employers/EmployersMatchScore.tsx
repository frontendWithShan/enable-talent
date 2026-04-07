import Image from "next/image";
import { JSX } from "react";
import CandidatePhoto from "@/public/images/Employers/CandidateProfile.png";

export default function EmployersMatchScore(): JSX.Element {
  return (
    <section className="py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid-lines-bg rounded-4xl border border-[#E5E7EB] bg-[#E3E3E3]/10 p-6 sm:p-8 lg:p-10">
          <header className="mb-10 text-center sm:mb-12">
            <p className="mb-6 inline-flex items-center rounded-full bg-neutral-200 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700">
              MATCH SCORE & RANKING PREVIEW
            </p>
            <h2
              id="employers-how-it-works-heading"
              className="text-[2.5rem] font-bold tracking-tight text-[#1A202C]"
            >
              See Your
              <br className="md:hidden" />
              <span className="text-[#8C4A0E]"> Best Candidates</span>
              <span className="text-[#1A202C]"> Instantly</span>
            </h2>

            <p className="mt-10 text-base font-medium text-gray-600">
              Our matching system compares your job requirements with each applicant’s skills,
              experience, and preferences<br/>
 — then ranks them automatically.

            </p>
          </header>

          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl md:rounded-t-3xl md:rounded-b-none bg-white shadow-[0_12px_35px_-12px_rgba(0,0,0,0.25)]">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={CandidatePhoto}
                  alt="Candidate profile and match score preview"
                  fill
                  className="object-fit"
                  sizes="(min-width: 1280px) 800px, (min-width: 1024px) 70vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
          <div className=" w-full  bg-[#E3E3E3]/10 p-6">
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { title: "Match Score", value: "0% to 100%" },
                { title: "Top 3 Candidates", value: "Highlights" },
                { title: "Accessibility", value: "Notes" },
                { title: "Skill Alignment ", value: "Tags" },
                {
                  title: "Work Experience",
                  value: "Snapshot",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="border-t-4 border-[#8C4A0E] bg-white/80 p-4"
                >
                  <p className="text-2xl font-bold text-[#8C4A0E]">
                    {card.title}
                    <br />
                    <span className="text-[#1A202C]">{card.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
