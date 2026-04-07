import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const items = [
  "Onboarding plans and milestones",
  "Early check-ins at 30, 60, and 90 days",
  "Accommodation and support tracking",
  "Early signals when someone needs help",
];

export default function OnboardingRetention() {
  return (
    <section
      aria-labelledby="onboarding-retention-title"
      className={`${plusJakartaSans.className} bg-[#0f1f36] px-4 py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto max-w-6xl text-center space-y-4">
        <div className="inline-flex items-center justify-center rounded-full bg-[#1c2c44] px-5 py-2 text-[16px] font-semibold uppercase tracking-[0.06em] text-white/85">
          Onboarding & retention
        </div>
        <h2
          id="onboarding-retention-title"
          className="text-[40px] font-extrabold leading-tight tracking-tight text-white sm:text-[48px] lg:text-[56px]"
        >
          Support students after they start working
        </h2>
        <p className="text-base leading-7 text-white/70 sm:text-lg">
          Enabled Talent continues supporting people after they&apos;re hired, when it matters most.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="flex justify-center">
          <Image
            src="/images/students/onboarding%20and%20retention/women%20laughing.png"
            alt="Students collaborating during onboarding"
            width={860}
            height={620}
            className="w-full max-w-[520px] rounded-[18px] object-cover"
            priority
          />
        </div>

        <ul className="space-y-8">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-6 text-white/85 text-lg leading-7">
              <Image
                src="/images/students/onboarding%20and%20retention/checkmarks.svg"
                alt=""
                width={34}
                height={34}
                className="h-[34px] w-[34px]"
                priority
              />
              <span className="text-[19px] font-medium leading-[1.5] text-white/85">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
