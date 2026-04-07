import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AboutHeroSection() {
  return (
    <section
      className={`${plusJakartaSans.className} relative w-full overflow-hidden bg-[#FDF6E8] pb-12 pt-28 md:pb-20 md:pt-[7.5rem]`}
    >
      <h1 className="sr-only">Connecting Talent with Opportunity</h1>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-0 lg:px-0">
        <div className="relative h-[260px] w-full overflow-hidden rounded-3xl bg-[#FDF6E8] sm:h-[320px] md:h-[420px] lg:h-[440px]">
          <Image
            src="/images/about-us/hero/About-page-HeroSection.png"
            alt="Connecting Talent with Opportunity Hero"
            fill
            priority
            className="h-full w-full rounded-3xl object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 z-20 h-14 w-40 rounded-tr-[1.75rem] bg-[#FDF6E8] md:hidden"
          />
          <div aria-hidden="true" className="absolute left-1 top-[6.5rem] z-10 hidden h-full items-center md:flex">
            <span className="block text-xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-2xl md:text-5xl">
              Connecting
            </span>
          </div>
        </div>
        <div aria-hidden="true" className="absolute top-48 z-10 hidden h-full items-center md:flex">
          <span className="block text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-5xl">
            Talent with Opportunity
          </span>
        </div>

        <div className="md:hidden">
          <div className="px-5 pt-4 text-slate-900">
            <p className="text-[2.75rem] font-extrabold leading-[1.04] tracking-tight">
              Connecting
            </p>
            <p className="text-[2.75rem] font-extrabold leading-[1.04] tracking-tight">
              Talent with
            </p>
            <p className="text-[2.75rem] font-extrabold leading-[1.04] tracking-tight">
              Opportunity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

