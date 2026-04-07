import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AcademyAbout() {
  return (
    <section
      aria-labelledby="academy-about-title"
      className={`${plusJakartaSans.className} bg-white overflow-hidden py-16 lg:py-24`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Left copy */}
          <div className="space-y-6 text-center sm:text-left">
            <div className="flex justify-center sm:justify-start">
              <div className="inline-flex items-center rounded-full bg-slate-100 px-5 py-2 text-[13px] font-bold uppercase tracking-widest text-slate-700 shadow-sm">
                Who We Are
              </div>
            </div>

            <h2
              id="academy-about-title"
              className="text-[32px] sm:text-[38px] lg:text-[47px] font-bold leading-[1.05] tracking-tight text-slate-900 text-center sm:text-left"
            >
              <span className="text-slate-900">What Is </span>
              <span className="bg-gradient-to-r from-[#c5523a] via-[#d69245] to-[#e4b85b] bg-clip-text text-transparent">
                Enabled Academy?
              </span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-slate-600 text-center sm:text-left">
              <p>
                Enabled Academy is a skill-building and readiness hub that improves access to meaningful jobs.
              </p>
              <p>
                We train individuals across different career paths, help them gain confidence, and connect them with employers who need job-ready talent.
              </p>
              <p>
                We work closely with employers to understand their staffing needs and train candidates with the exact skills required for the role.
              </p>
            </div>
          </div>

          {/* Right graphic */}
          <div className="flex justify-center lg:justify-end">
            {/* The relative container for the "solar system" layout */}
            <div className="relative aspect-square w-full max-w-[500px] lg:max-w-[550px]">
              
              {/* Concentric circles (dashed) - aria-hidden for AODA */}
              <div className="absolute inset-0 rounded-full border border-dashed border-slate-200" aria-hidden="true"></div>
              <div className="absolute inset-[18%] rounded-full border border-dashed border-slate-200" aria-hidden="true"></div>

              {/* Center text bubble */}
              <div className="absolute inset-[33%] flex items-center justify-center rounded-full bg-white shadow-2xl border border-slate-50 z-30">
                <p className="text-sm font-extrabold text-slate-800 text-center leading-tight">
                  Purpose.<br/>Profit.<br/>Progress.
                </p>
              </div>

              {/* --- IMAGE CALLOUTS (Using original assets) --- */}
              
              {/* 1. Top Right: Inclusive work for all */}
              <div className="absolute right-[5%] top-[5%] z-20 translate-x-[-10px] translate-y-[60px] sm:translate-x-0 sm:translate-y-0">
                <div className="flex flex-col items-center">
                  <div className="hidden lg:block mb-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-lg border border-slate-100">
                    Inclusive work for all.
                  </div>
                  <div className="relative h-32 w-32 sm:h-44 sm:w-44 translate-x-22">
                    <Image
                      src="/images/academy/about/inclusive work for all man.svg"
                      alt="Illustration of a person representing inclusive work"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Middle Left: Value through diverse talent */}
              <div className="absolute -left-10 top-[30%] z-20">
                <div className="flex flex-col items-center">
                  <div className="relative h-32 w-32 sm:h-44 sm:w-44 translate-x-20 -translate-y-24 ">
                    <Image
                      src="/images/academy/about/value through diverse talent man.svg"
                      alt="Illustration of diverse talent contribution"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="hidden lg:block mt-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-lg border border-slate-100">
                    Value through diverse talent.
                  </div>
                </div>
              </div>

              {/* 3. Bottom Right: Equity in action */}
              <div className="absolute right-0 bottom-[5%] z-20">
                <div className="flex items-center gap-3">
                  <div className="relative h-32 w-32 sm:h-44 sm:w-44 -translate-x-40 translate-y-20">
                    <Image
                      src="/images/academy/about/equity in action man.svg"
                      alt="Illustration of equity in the workplace"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="hidden lg:block rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-lg border border-slate-100">
                    Equity in action.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
