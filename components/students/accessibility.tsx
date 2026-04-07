import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const points = [
  "Screen-reader friendly",
  "Keyboard and voice navigation",
  "Captioned events and sessions",
  "Clear language and simple layouts",
];

export default function AccessibilitySection() {
  return (
    <section
      aria-labelledby="accessibility-title"
      className={`${plusJakartaSans.className} bg-[#f7f7f7] px-4 pt-14 pb-0 sm:pt-18 sm:pb-10 lg:pt-20 lg:pb-12 overflow-visible`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* LEFT: TEXT */}
        <div className="relative z-10 space-y-6 mt-10 sm:mt-16 text-center sm:text-left">
          <div className="flex justify-center sm:justify-start">
            <div className="inline-flex items-center rounded-full bg-[#f0f0f0] px-4 py-2 text-[16px] font-semibold uppercase tracking-[0.06em] text-[#111827]">
              Accessibility
            </div>
          </div>

          <h2
            id="accessibility-title"
            className="text-[48px] font-extrabold leading-[1] tracking-tight text-slate-900 sm:text-[72px]"
          >
            Designed for
            <br />
            Accessibility
          </h2>

          <p className="mx-auto max-w-xl text-[24px] leading-[1.5] text-slate-600 sm:mx-0">
            Enabled Talent is built to work for everyone.
          </p>

          <ul className="space-y-4 text-left">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-800">
                <Image
                  src="/images/students/accessibility/checkmarks.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="mt-[2px] h-[22px] w-[22px]"
                />
                <span className="text-[24px] font-medium leading-[1.5]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="relative flex justify-end">
          {/* layout stays fixed; image can bleed without cropping */}
          <div className="relative h-[300px] w-full max-w-[700px] -translate-y-6 sm:h-[600px] sm:translate-y-40 overflow-visible">
            <Image
              src="/images/students/accessibility/accessibility-asset.png"
              alt="Accessibility dashboard preview"
              fill
              className="object-contain scale-[1.25] sm:scale-[1.85] origin-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
