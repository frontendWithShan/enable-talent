import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import FancyButton from "@/components/FancyButton";
import heroWoman from "@/public/images/hero-section-pivot/woman.png";
import heroDots from "@/public/images/hero-section-pivot/dots.png";

export default function Hero(): JSX.Element {
  return (
    <section
      aria-labelledby="hero-heading"
      aria-describedby="hero-subtitle"
      className="home-hero-bg relative bg-white pb-10 pt-10 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14"
      suppressHydrationWarning
    >
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/65 to-transparent" />
      <div className="relative z-10 mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full hero-no-drag">
          <div className="grid h-full gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <header className="order-1 flex flex-col items-center pt-14 text-center text-slate-900 sm:pt-16 lg:pt-18">
              <Image
                src={heroDots}
                alt=""
                width={260}
                height={60}
                priority
                className="mb-4 w-92 max-w-[95%] select-none sm:mb-6 sm:w-110 lg:w-170"
                draggable={false}
              />
              <h1
                id="hero-heading"
                className="text-4xl font-semibold leading-[1.12] text-slate-900 sm:text-5xl lg:text-6xl"
              >
                Where Ability Meets
                <br />
                Opportunity
              </h1>

              <p
                id="hero-subtitle"
                className="mt-7 max-w-xl text-sm leading-relaxed text-black sm:text-base lg:text-[1rem]"
              >
                We connect people of all abilities with inclusive employers
                worldwide, providing jobs, training, and support to help you
                grow your career.
              </p>

              <nav
                aria-label="Primary calls to action"
                className="mt-7 flex flex-col items-center justify-center gap-3 lg:flex-row lg:items-center lg:justify-start"
              >
                <Link
                  href="https://app.enabledtalent.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg:-translate-x-13"
                >
                  <FancyButton label="Find Your Next Job" as="span" />
                </Link>

                <Link
                  href="https://app.enabledtalent.com/signup-employer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg:-translate-x-4"
                >
                  <FancyButton label="Post a Job" color="orange" as="span" />
                </Link>
              </nav>

              <p className="mt-12 max-w-sm text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-xs">
                Trusted by talents, employers, and partners across the globe.
              </p>
            </header>

            <figure className="relative order-2 flex items-start justify-center lg:justify-end select-none">
              <div className="relative lg:translate-y-12">
                <Image
                  src={heroWoman}
                  alt="Professional woman wearing assistive smart glasses."
                  width={720}
                  height={860}
                  priority
                  className="h-auto w-[min(76vw,520px)] max-w-none select-none object-contain sm:w-[560px] lg:w-[630px] xl:w-[690px]"
                  draggable={false}
                />
                <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white/65 to-transparent" />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
