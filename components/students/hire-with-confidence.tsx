import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const steps = [
  {
    number: "01",
    text: "Reach the right students for open roles",
    icon: "/images/students/for%20employees/reach%20the%20right%20icon.png",
  },
  {
    number: "02",
    text: "Host info sessions and hiring events",
    icon: "/images/students/for%20employees/host%20info%20icon.png",
  },
  {
    number: "03",
    text: "Communicate clearly before and after hiring",
    icon: "/images/students/for%20employees/communicate%20clearly%20icon.png",
  },
  {
    number: "04",
    text: "Support onboarding and accommodations",
    icon: "/images/students/for%20employees/host%20info%20icon.png",
  },
  {
    number: "05",
    text: "Track early retention and progress",
    icon: "/images/students/for%20employees/communicate%20clearly%20icon.png",
  },
];

export default function HireWithConfidence() {
  return (
    <section
      aria-labelledby="hire-with-confidence-title"
      className={`${plusJakartaSans.className} bg-white px-4 py-12 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="space-y-5 max-w-[540px]">
            <div className="flex justify-center sm:justify-start">
              <div className="inline-flex items-center rounded-full bg-[#e5e5e5] px-4 py-2 text-[16px] font-semibold uppercase tracking-[0.06em] text-slate-900 sm:-translate-y-6">
                For employers
              </div>
            </div>
            <h2
              id="hire-with-confidence-title"
              className="text-[32px] font-extrabold leading-[1.05] tracking-tight text-slate-900 text-center sm:text-left sm:text-5xl lg:text-6xl"
            >
              Hire with
              <br />
              confidence. Retain
              <br />
              talent longer.
            </h2>

            <div className="mt-4 space-y-8 max-w-[540px] sm:mt-6 sm:space-y-10">
              {steps.map((step, idx) => {
                const reverse = idx % 2 === 1;
                return (
                  <div
                    key={step.number}
                    className={`flex items-center gap-6 sm:gap-8 ${reverse ? "flex-row-reverse" : ""}`}
                  >
                    <div className="text-[64px] font-extrabold text-[#6F7C92] leading-none sm:text-[90px]">
                      {step.number}
                    </div>
                    <div className="flex-1 max-w-[420px]">
                      <div className="flex items-center gap-3 rounded-[14px] border border-[#e5e5e5] bg-white px-4 py-4 shadow-sm sm:gap-4 sm:rounded-[16px] sm:px-5 sm:py-5">
                        <Image
                          src={step.icon}
                          alt=""
                          width={40}
                          height={40}
                          className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                          priority
                        />
                        <p className="text-[15px] font-semibold text-slate-900 leading-6 sm:text-base">{step.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 max-w-[520px] lg:justify-self-end lg:self-start">
            <div className="text-[16px] leading-7 font-semibold text-black/50 text-center sm:text-[24px] sm:leading-[36px] sm:text-right sm:-translate-y-7">
              Enabled Talent helps employers
              <br />
              connect with student talent and
              <br />
              support them through onboarding
              <br />
              and early employment.
            </div>
            <div className="flex justify-center sm:justify-end">
              <Link href="/foremployers">
                <FancyButton label="Hire early-career talent" color="navy" as="span" />
              </Link>
            </div>

            <div className="flex flex-col items-center gap-6 pt-6 sm:flex-row sm:items-end sm:gap-5 sm:pt-8">
              <div className="flex flex-col items-start gap-3">
                <Image
                  src="/images/students/for%20employees/man%20sitting.png"
                  alt="Man sitting at desk"
                  width={220}
                  height={460}
                  className="h-[320px] w-[200px] -translate-y-2 rounded-[18px] object-cover sm:h-[430px] sm:-translate-y-25"
                  priority
                />
                <Image
                  src="/images/students/for%20employees/10k%2Bicon.png"
                  alt="10k+ job seekers"
                  width={200}
                  height={72}
                  className="h-auto w-[180px] object-contain sm:w-[200px] sm:translate-x-12 sm:-translate-y-20"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <Image
                  src="/images/students/for%20employees/blonde%20woman.png"
                  alt="Blonde woman working"
                  width={280}
                  height={560}
                  className="h-[360px] w-[240px] rounded-[18px] object-cover sm:h-[640px] sm:w-[290px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
