import { JSX } from "react";
import Link from "next/link";
import SectionPartners from "@/components/HomePage/SectionPartners";

export default function MissionPage(): JSX.Element {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
      <section
        className="relative overflow-hidden rounded-[28px] border border-[#F0E6CC] shadow-[0_22px_70px_rgba(24,59,76,0.08)] mission-hero"
        aria-labelledby="mission-title"
      >
        <div className="relative flex flex-col items-center justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="sr-only" aria-hidden="true">
            {/* Decorative background handled by CSS class */}
          </div>

          <h1
            id="mission-title"
            className="max-w-3xl text-center text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-3xl md:text-[2.35rem]"
          >
            Where Ability Meets Opportunity
          </h1>

          <p className="mt-4 max-w-2xl text-center text-base leading-relaxed text-black sm:text-lg">
            We connect talented people of all abilities with welcoming employers
            and provide the learning resources to help them thrive.
          </p>

          <nav aria-label="Primary actions" className="mt-8">
            <ul className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <li>
                <Link
                  href="https://app.enabledtalent.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find your next job with Enabled Talent"
                  className="group inline-flex items-center justify-center gap-3 rounded-lg px-7 py-3 text-sm font-semibold text-white bg-[#182434] shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform duration-150 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#182434] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Find your Next Job
                </Link>
              </li>
              <li>
                <Link
                  href="https://app.enabledtalent.com/login-employer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Post a job on Enabled Talent"
                  className="group inline-flex items-center justify-center gap-3 rounded-lg px-7 py-3 text-sm font-semibold text-black bg-[#FFD071] shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform duration-150 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#182434] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Post a Job
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <SectionPartners tagline="Trusted by organizations building the future of work" />
      <section>
        <h2>Our mission is to create a fair and inclusive job marketplace. </h2>
      </section>
    </main>
  );
}
