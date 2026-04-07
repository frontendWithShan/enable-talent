import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const steps = [
  {
    title: "Understand the Need",
    points: [
      "Employers share their role requirements and timelines.",
      "Talents share their career goals and interests.",
      "We align skills, expectations, accessibility needs, and growth paths.",
    ],
    image: "/images/academy/how-works/helping man in wheelchair.png",
  },
  {
    title: "Train, Coach & Prepare",
    points: [
      "We train talents based on employer needs.",
      "We provide role-specific coaching.",
      "We help talents build confidence through practice and support.",
      "We focus on soft skills and workplace readiness.",
    ],
    image: "/images/academy/how-works/woman on phone.png",
  },
  {
    title: "Match & Hire",
    points: [
      "Employers meet trained, pre-screened candidates.",
      "Talents interview with confidence.",
      "We support onboarding to ensure a smooth transition.",
    ],
    image: "/images/academy/how-works/man with cane.png",
  },
];

export default function AcademyHowWorks() {
  return (
    <section
      aria-labelledby="academy-how-works-title"
      className={`${plusJakartaSans.className} relative overflow-hidden bg-white px-4 py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-32">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 shadow-sm">
            How Enabled Academy Works
          </div>
          <div>
            <h2
              id="academy-how-works-title"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]"
            >
              A Simple, Clear Process that Supports
            </h2>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]">
              <span className="bg-gradient-to-r from-[#d85b3b] via-[#e19a45] to-[#e8c26c] bg-clip-text text-transparent">
                Both Talents and Employers.
              </span>
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative space-y-12">
          {/* Center divider line with stickman logo */}
          <div className="pointer-events-none absolute left-1/2 top-6 h-[calc(100%-12px)] w-px -translate-x-1/2 bg-gradient-to-b from-[#e1a65a] via-[#f0c27b] to-[#e1a65a] opacity-70" />
          <div className="pointer-events-none absolute left-1/2 -top-22 w-12 -translate-x-1/2 sm:w-14">
            <Image
              src="/images/academy/how-works/stickman logo.svg"
              alt=""
              width={80}
              height={80}
              className="h-auto w-full"
            />
          </div>

          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={step.title}
                className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                <div
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ top: idx === 2 ? "35%" : "30%" }}
                >
                  <Image
                    src="/images/academy/how-works/circle checkpoint.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>

                <div className={`flex justify-center ${isEven ? "lg:order-2" : ""}`}>
                  <div className="relative w-full max-w-[420px]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={520}
                      height={520}
                      className="h-auto w-full max-h-[520px] rounded-[18px] object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </div>

                <div className={`space-y-4 text-center sm:text-left ${isEven ? "lg:order-1 lg:text-right" : ""}`}>
                  <div className={`flex items-start gap-3 justify-center sm:justify-start ${isEven ? "lg:justify-end" : ""}`}>
                    <h3 className="text-[32px] font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <ul className={`space-y-2 text-base leading-7 text-slate-700 sm:text-lg text-center sm:text-left ${isEven ? "lg:text-right" : ""}`}>
                    {step.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Result footer */}
        <p className="text-center text-[20px] sm:text-[24px] lg:text-[32px] font-bold leading-[1.2]">
          <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
            The Result: Job-Ready talent and employers who hire with confidence.
          </span>
        </p>
      </div>
    </section>
  );
}
