import { JSX } from "react";
import {
  Accessibility,
  AlertTriangle,
  Award,
  BarChart3,
  CheckCircle2,
  Dumbbell,
  Lightbulb,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

type FeatureItem = {
  label: string;
  icon: LucideIcon;
};

const features: FeatureItem[] = [
  { label: "Match Score", icon: BarChart3 },
  { label: "Skills Alignment", icon: Lightbulb },
  { label: "Experience Summary", icon: Award },
  { label: "Culture Fit", icon: Accessibility },
  { label: "Strengths Overview", icon: Dumbbell },
  { label: "Gaps & Risks", icon: AlertTriangle },
  { label: "Recommended Fit Level", icon: UserCheck },
  { label: "Why Fit / Not Fit", icon: CheckCircle2 },
];

export default function EnableAgentSignatureFeature(): JSX.Element {
  return (
    <section
      aria-labelledby="signature-feature-heading"
      className="text-white mx-auto max-w-360 rounded-3xl"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.038) 1px, transparent 1px), linear-gradient(135deg, #0F172A, #172554)",
        backgroundSize: "80px 80px, 80px 80px, 100% 100%",
        backgroundPosition: "0 0, 0 0, center",
      }}
    >
      <div className=" px-6 py-14 sm:px-10 sm:py-16">
        <header className="text-center">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Signature Feature
          </span>

          <h2
            id="signature-feature-heading"
            className="mt-10 text-4xl font-bold leading-tight text-white mb-10  "
          >
            The Candidate Fit Report
            <br />
            <span className="text-4xl font-bold text-[#D97706]">
              Your Hiring Superpower
            </span>
          </h2>

          <p className="mt-4 text-base font-medium text-slate-300 sm:text-base">
            Understand who to prioritize and why at a glance.
          </p>
          <p className="mt-10 mb-10 text-xl font-medium text-slate-50">
            This brings transparency to hiring decisions — with no bias, no
            guesswork.
          </p>
        </header>

        <ul
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 mb-18"
          aria-label="Candidate fit report features"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <li
                key={feature.label}
                className="group flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform duration-200 motion-safe:group-hover:scale-105">
                  <Icon
                    aria-hidden="true"
                    className="h-12 w-12 text-blue-400"
                    strokeWidth={1.75}
                  />
                  <span className="sr-only">{feature.label}</span>
                </div>
                <p className="mt-4 text-sm text-white">{feature.label}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
