import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type AboutVolunteerSectionProps = {
  onOpenVolunteerForm: () => void;
};

export default function AboutVolunteerSection({ onOpenVolunteerForm }: AboutVolunteerSectionProps) {
  return (
    <section className="w-full overflow-x-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative w-full overflow-hidden rounded-3xl shadow-sm talentHero bg-cover bg-center bg-no-repeat">
          <div className="flex min-h-[380px] flex-col items-center justify-center px-6 pb-12 pt-16 text-center sm:min-h-[420px] sm:px-10 sm:pb-14 sm:pt-20 lg:min-h-[440px] lg:px-16 lg:pb-20 lg:pt-24">
            <h3
              className={`${plusJakartaSans.className} mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl`}
            >
              Volunteer Network
            </h3>
            <p className="mx-auto max-w-4xl text-sm text-slate-800 sm:text-base md:text-lg">
              <span className="hidden lg:block whitespace-nowrap">
                Enabled Talent thrives through a diverse volunteer network of students, designers,
              </span>
              <span className="hidden lg:block whitespace-nowrap">
                developers, and inclusion advocates. We spotlight their work, support their professional growth,
              </span>
              <span className="hidden lg:block whitespace-nowrap">
                and amplify their contributions toward building a more inclusive, opportunity-driven future.
              </span>
              <span className="lg:hidden">
                Enabled Talent thrives through a diverse volunteer network of students, designers, developers, and
                inclusion advocates. We spotlight their work, support their professional growth, and amplify their
                contributions toward building a more inclusive, opportunity-driven future.
              </span>
            </p>
            <div className="mt-10">
              <button onClick={onOpenVolunteerForm} className="inline-flex">
                <FancyButton label="Get Started" color="navy" as="span" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
