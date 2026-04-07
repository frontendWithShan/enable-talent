import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function StudentsFeaturesOverview() {
  return (
    <section
      aria-labelledby="students-features-title"
      className={`${plusJakartaSans.className} relative bg-[#1b2838] px-4 py-24 sm:py-28 lg:py-32`}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="h-[480px] w-[480px] rounded-full bg-white/5 blur-[120px]" />
      </div>
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <img
          src="/images/students/hero%20section/stickman%20logo.png"
          alt=""
          className="w-[220px] max-w-[60vw] opacity-62 translate-y-13 transform"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center space-y-12">
        <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-white/85">
          Features Overview
        </div>

        <h2
          id="students-features-title"
          className="space-y-4 text-4xl font-extrabold italic leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl px-[6px] overflow-visible"
        >
          <div>Everything</div>
          <div className="inline-block px-3">
            <span className="inline-block bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent pr-2">students</span> need
          </div>
          <div>
            to <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent pr-2">start strong</span>
          </div>
        </h2>

        <p className="text-base leading-7 text-slate-200 sm:text-lg">
          Enabled Talent combines <span className="text-[#f2b75e]">opportunities</span>,{" "}
          <span className="text-[#e28b42]">guidance</span>, and <span className="text-[#FFB29F]">support</span> in one place.
        </p>
      </div>
    </section>
  );
}
