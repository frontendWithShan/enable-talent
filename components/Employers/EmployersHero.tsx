"use client";

import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import FancyButton from "@/components/FancyButton";
import DemoRequestModal from "@/components/DemoRequestModal";
import heroEmployers from "@/public/images/Employers/heroForEmployers.png";
import brail from "@/public/images/SectionHeader/Brail-Pattern.svg";

export default function EmployersHero(): JSX.Element {
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState(false);
  return (
    <div>
      <section
        aria-labelledby="employers-hero-heading"
        className="py-10 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className=" relative rounded-4xl px-6 py-10 sm:px-10 lg:px-14 lg:py-14 min-h-[30vh]  bg-linear-to-br from-[#FFF0D2] to-[#FFE8BA]">
            <div className="grid h-full gap-10 lg:grid-cols-2 lg:items-center">
              <figure className="relative order-1 lg:order-2">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl  bg-white shadow-[0_12px_35px_-12px_rgba(0,0,0,0.25)]">
                  <div className="relative aspect-14/13 w-full">
                    <Image
                      src={heroEmployers}
                      alt="Candidate profile and match score preview"
                      fill
                      className="object-fit"
                      sizes="(min-width: 1280px) 800px, (min-width: 1024px) 70vw, 100vw"
                      priority
                    />
                  </div>
                </div>
              </figure>

              <header className="order-2 text-black lg:order-1">
                <h1
                  id="employers-hero-heading"
                  className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl text-black"
                >
                  Hire Better.
                  <br />
                  Hire Inclusively.
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-700">
                  EnableJobs helps employers find qualified talent faster.
                  Create a company profile, post roles, and instantly see
                  top-matched candidates with ranking, match scores, and
                  auto-generated outreach messages.
                </p>

                <nav
                  aria-label="Primary calls to action"
                  className="mt-8 flex flex-wrap gap-3 lg:flex-row flex-col"
                >
                  <Link
                    href="https://app.enabledtalent.com/signup-employer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <FancyButton label="Create Employer Account" as="span" />
                  </Link>
                  <FancyButton
                    label="Book a Demo"
                    color="orange"
                    onClick={() => setIsDemoRequestOpen(true)}
                  />
                </nav>

                <Image
                  src={brail}
                  alt="Hero Banner Background"
                  width={400}
                  height={150}
                  className="absolute bottom-2 w-60 lg:top-10 left-8 sm:w-28 md:w-100 max-w-[90%] "
                />
              </header>
            </div>
          </div>
        </div>
      </section>

      <DemoRequestModal
        isOpen={isDemoRequestOpen}
        onClose={() => setIsDemoRequestOpen(false)}
        source="foremployers-hero-book-demo"
        title="Book a Demo"
      />
    </div>
  );
}
