import { Manrope } from "next/font/google";
import Image from "next/image";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function EventsHero() {
  return (
    <section
      aria-labelledby="events-hero-title"
      className="relative overflow-hidden bg-[#FDF6E8]"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div className="text-left sm:-translate-y-4 lg:-translate-y-6 lg:-translate-x-6">
          <div className="flex items-center justify-start">
            <span
              aria-hidden="true"
              className="mr-3 inline-block h-6 w-1 bg-[#C0412C]"
            />
            <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent text-[14px] font-bold uppercase tracking-[0.2em] sm:text-[20px]">
              Enabled Events
            </span>
          </div>
          <h1
            id="events-hero-title"
            className="mt-4 text-[34px] font-extrabold leading-tight text-slate-900 sm:text-[56px] sm:whitespace-nowrap"
          >
            EnabledTalent Events
          </h1>
          <p className={`${manrope.className} mt-4 text-[16px] font-medium leading-relaxed text-[#373737] sm:text-[18px] lg:max-w-[520px]`}>
            These events focus on inclusive hiring, training and community
            building for people with disabilities.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] sm:max-w-[620px] lg:max-w-none">
          <Image
            src="/images/events/hero section/hero section image.jpeg"
            alt="Featured speaker at an Enabled Talent event"
            width={620}
            height={480}
            className="h-auto w-full sm:-translate-y-2 lg:w-[125%] lg:-translate-y-6 lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
