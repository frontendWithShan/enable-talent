import { JSX } from "react";
import Image from "next/image";
import tic from "@/public/images/Employers/Tic.svg";
import logo from "@/public/logo/et-new.svg";

export default function EmployersSaveTime(): JSX.Element {
  return (
    <section className="bg-linear-to-b from-[#182434] to-[#2F4562] text-white p-8">
      <header className="mb-10 mt-10 text-center sm:mb-12">
        <p className="mb-6 inline-flex items-center rounded-full bg-gray-700 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
          AUTO-GENERATED EMPLOYER EMAIL TEMPLATES
        </p>
        <h2
          id="employers-how-it-works-heading"
          className="text-[2.5rem] font-bold tracking-tight text-white"
        >
          Save Time With
          <br className="md:hidden" />
          <span className="text-gradient-warm"> Smart Messaging</span>
        </h2>

        <p className="mt-10 text-base font-medium text-gray-100">
          EnabledJobs creates ready-to-send emails for your hiring process.
        </p>
      </header>

      {/* Main two-column showcase */}
      <div className="relative mx-0 md:mx-auto mt-0 max-w-360 overflow-hidden rounded-3xl px-6 py-16 md:px-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

        <div className="relative grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Glowing email card */}
          <div className="mt-12 rounded-2xl bg-linear-to-br from-[#FFC300] via-[rgb(254,254,254)] to-[#FFC300] p-8 text-gray-800 flex items-center justify-center">
            <div className="w-full lg:w-[96%]">
              <div className="flex h-full flex-col justify-between border border-gray-200/20 shadow-2xl rounded-2xl bg-white p-8 text-gray-800 md:p-10">
                {/* Top bar */}
                <div className="-mx-8 -mt-8 mb-6 w-[calc(100%+4rem)] bg-[#EFEFEF] h-10 md:-mx-10 md:-mt-10 md:w-[calc(100%+5rem)] rounded-t-2xl" />

                <div className="text-xl font-bold mb-10 mt-6">
                  <p>
                    Hi <span className="text-orange-600">Jeby,</span>
                  </p>
                  <p className="mt-10 mb-6">
                    Thanks for applying to{" "}
                    <span className="text-orange-600">Senior Manager </span>
                    role. Based on your experience in skills, we&apos;d love to move
                    you to the next stage.
                  </p>
                </div>

                {/* Bottom bar with logo */}
                <div className="-mx-8 -mb-8 mt-auto w-[calc(100%+4rem)] bg-[#EFEFEF] py-2 md:-mx-10 md:-mb-10 md:w-[calc(100%+5rem)] rounded-b-2xl flex justify-center">
                  <Image
                    src={logo}
                    alt="EnabledJobs logo"
                    className="h-10 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature list */}
          <div className="flex flex-col justify-center space-y-6">
            {[
              "Shortlist Email",
              "Interview Invite",
              "Assessment Request",
              "Follow-up / Reminder",
              "Rejection With Positive Feedback",
            ].map((text) => (
              <div key={text} className="flex items-center">
                <Image
                  src={tic}
                  alt="Check icon"
                  className="h-5 md:h-7 w-auto"
                />
                <p className="ml-4 text-xl font-medium text-white">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}