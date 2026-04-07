import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const benefits = [
  "Role-based industry training",
  "One-on-one coaching & prep",
  "Resume & profile guidance",
  "Workplace readiness training",
  "Accessibility & accommodations",
  "Direct employer connections",
  "Supportive success-focused environment",
];

export default function AcademyTalentValue() {
  return (
    <section
      aria-labelledby="academy-talent-value-title"
      className={`${plusJakartaSans.className} bg-[#FBFBFB] overflow-hidden`}
    >
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:pb-22 sm:pt-12 lg:pb-32 lg:pt-14">
        <div className="grid items-center gap-6 lg:gap-8 lg:grid-cols-2">

          {/* Left visual stack */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px] translate-x-5 sm:translate-x-0">
              <Image
                src="/images/academy/talent-value/woman for talent section.png"
                alt="A smiling woman in a wheelchair, representing successful talent at Enabled Academy"
                width={420}
                height={520}
                className="h-auto w-full max-w-[320px] object-contain sm:max-w-[420px]"
                priority
              />
            </div>
          </div>

          {/* Right copy */}
          <div className="space-y-6 sm:space-y-4 lg:pl-6">
            <div className="flex justify-center sm:justify-start">
              <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 shadow-sm">
                For Talent
              </div>
            </div>

            <h2
              id="academy-talent-value-title"
              className="text-[30px] font-bold leading-[1.08] tracking-tight text-slate-900 text-center sm:text-left sm:text-[40px] lg:text-[44px]"
            >
              <span className="whitespace-nowrap bg-gradient-to-r from-[#c5523a] via-[#d69245] to-[#e4b85b] bg-clip-text text-transparent">
                What Is Enabled Academy?
              </span>
              <br />
              Become Job-Ready.
            </h2>

            <p className="text-[15px] leading-7 text-[#6b6b6b] sm:text-lg max-w-2xl text-center sm:text-left">
              Enabled Academy helps you learn practical skills, prepare for interviews, and become confident in your career journey. Our programs are designed for all skill levels and support a wide range of career interests.
            </p>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 text-center sm:text-left sm:text-lg">
                What You&apos;ll Receive
              </h3>
              <ul className="grid gap-3 pl-3 sm:gap-3 sm:pl-0 sm:grid-cols-2 text-[13px] leading-6 text-slate-800 sm:text-base">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Image
                      src="/images/academy/talent-value/plus sign.png"
                      alt=""
                      width={16}
                      height={16}
                      className="mt-1 h-4 w-4 flex-shrink-0"
                    />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
