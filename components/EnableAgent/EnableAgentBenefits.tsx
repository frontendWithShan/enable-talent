import { JSX } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import AgentRobot from "@/public/images/EmployerAgent/AgentRobot .png";

const benefits = [
  "Eliminates manual screening",
  "Saves hours per role",
  "Produces recruiter-level insights",
  "Ensures consistent, unbiased decisions",
  "Handles multiple roles at once",
  "Works 24/7 without supervision",
];

export default function EnableAgentBenefits(): JSX.Element {
  return (
    <section className="flex items-center justify-center bg-gray-100 px-4 py-12 md:py-16">
      <div className="flex w-full max-w-360 flex-col overflow-hidden rounded-4xl bg-linear-to-br from-[#fcf1d8] to-[#ffffff] shadow-xl ring-1 ring-orange-100 md:flex-row">
        {/* Illustration */}
        <div className="relative w-full md:w-5/12 ">
          <div className="absolute bottom-0 left-0 z-10 p-4 sm:p-6 backdrop-blur ">
            <Image
              src={AgentRobot}
              width={320}
              height={320}
              alt="Floating AI agent robot illustration"
              className="w-[120px] h-[120px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-80 object-contain rounded-4xl"
              priority
            />
          </div>
        </div>

        {/* Copy */}
        <div className="flex w-full flex-col gap-6 px-6 py-10 md:w-7/12 md:px-14 md:py-12">
          <div className="inline-flex w-fit items-center rounded-full bg-[#E7DED0] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-900">
            Benefits for hiring teams
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Why Teams Choose <br />
              <span className="text-gradient-warm">Enabled AI Agent</span>
            </h2>
          </div>

          <ul className="space-y-4">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#D97706] shadow-[0_8px_18px_-8px_rgba(217,119,6,0.8)]">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </span>
                <span className="text-base font-medium text-gray-900 md:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
