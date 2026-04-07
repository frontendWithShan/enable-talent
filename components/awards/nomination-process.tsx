import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type Step = {
  id: number;
  title: string;
  description: string;
  number: string;
  background?: "yellow" | "navy";
};

const steps: Step[] = [
  {
    id: 1,
    title: "Submit Your Nomination",
    description:
      "Share your story or nominate a deserving leader, organization, or partner. (Nominations open: March 1 -- April 15, 2025)",
    number: "01",
    background: "yellow",
  },
  {
    id: 2,
    title: "Review & Shortlisting",
    description:
      "A panel of accessibility experts, HR professionals, and community advocates will review all submissions.",
    number: "02",
    background: "navy",
  },
  {
    id: 3,
    title: "Finalists Announcement",
    description:
      "(May 2025) : Finalists will be featured on the Enabled Talent website and invited to the Awards Ceremony.",
    number: "03",
    background: "navy",
  },
  {
    id: 4,
    title: "Awards Ceremony & Celebration",
    description:
      "(June 2025) : Winners will be announced live at the Enabled Talent Global Summit.",
    number: "04",
    background: "navy",
  },
];

const navyColor = "#182434";

export default function NominationProcess() {
  return (
    <section
      aria-labelledby="nomination-process-title"
      className={`${plusJakartaSans.className} bg-white`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-20 lg:py-24">
        <h2
          id="nomination-process-title"
          className="text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]"
        >
          <span className="text-[#d67a3a]">Nomination</span>{" "}
          <span className="text-slate-900">Process</span>
        </h2>

        <div className="mt-8 grid gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-900/20">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative flex min-h-[260px] flex-col justify-center px-5 py-8 sm:min-h-[360px] lg:px-8"
              style={step.background === "navy" ? { backgroundColor: navyColor } : undefined}
            >
              {/** Backgrounds */}
              {step.background === "yellow" ? (
                <Image
                  src="/images/awards/nomination process/step 1 block.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background: `linear-gradient(135deg, ${navyColor} 0%, ${navyColor} 70%, ${navyColor}00 100%)`,
                  }}
                />
              )}

              <div className="relative flex flex-col gap-4 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span
                    className={`text-[16px] font-semibold sm:text-lg ${
                      step.background === "yellow" ? "text-slate-900" : "text-white"
                    }`}
                  >
                    Step
                  </span>
                  <span
                    className={`text-5xl font-bold leading-none -ml-3 sm:text-6xl sm:-ml-3.5 ${
                      step.background === "yellow" ? "text-slate-900/30" : "text-white/15"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>
                <div className="space-y-3">
                  <p
                    className={`text-[15px] font-extrabold sm:text-base ${
                      step.background === "yellow" ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p
                    className={`text-[13px] leading-6 sm:text-sm ${
                      step.background === "yellow" ? "text-slate-900" : "text-slate-100"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
