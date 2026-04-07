import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AwardsHero() {
  return (
    <section
      aria-labelledby="awards-hero-title"
      className={`${plusJakartaSans.className} relative overflow-hidden bg-[#FDF6E8] flex items-start`}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-2 pb-0 sm:pt-4 sm:pb-6 lg:pt-6 lg:pb-8">
        {/* Top Header Section - Centered */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="text-xl sm:text-2xl font-semibold text-slate-800">Enabled Talent Awards</div>
          <h1
            id="awards-hero-title"
            className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Celebrating Inclusive
            <br />
            Leadership and Barrier-Free Workplaces
          </h1>
          <p className="text-base font-semibold text-slate-700 sm:text-lg">
            Where inclusion meets innovation.
          </p>
        </div>

        {/* Target Text Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2">
          <div className="flex justify-start lg:ml-0">
            <div className="space-y-4">
              <p className="max-w-[440px] text-left text-base leading-[1.6] font-bold text-slate-900 sm:text-lg">
                The Enabled Talent Awards recognize employers, community partners, and changemakers who are redefining what accessibility and opportunity mean in today&apos;s workforce.
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/awards/hero section/swirly under description.png"
                  alt=""
                  width={80}
                  height={80}
                  className="h-auto w-14"
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:block"></div>
        </div>

        {/* Visual stack centered below text */}
        <div className="mt-4 flex justify-center">
          <div className="relative w-full max-w-[520px] -translate-y-10">
            <div className="relative h-[320px] w-full">
              <img
                src="/images/awards/hero section/yellow block behind woman kissing trophy.png"
                alt=""
                className="absolute bottom-[30] left-1/2 z-0 h-auto w-[64%] max-w-[340px] -translate-x-1/2"
              />
              <img
                src="/images/awards/hero section/woman kissing trophy.png"
                alt="Woman holding a trophy"
                className="absolute bottom-[-15] left-1/2 z-10 h-auto w-[60%] max-w-[320px] -translate-x-1/2 -translate-y-12"
              />
              <img
                src="/images/awards/hero%20section/200%20%2B%20programs.png"
                alt="200+ programs"
                className="absolute bottom-35 left-[-16%] z-20 h-auto w-[41%] max-w-[240px] sm:left-[-16%] sm:translate-x-0 translate-x-10"
              />
              <div className="absolute bottom-60 right-[-15.7%] z-30 w-[41.5%] max-w-[210px] translate-x-[-25px] sm:w-[55%] sm:max-w-[240px] sm:translate-x-0">
                <img
                  src="/images/awards/hero section/white block.png"
                  alt=""
                  className="h-auto w-full"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-4">
                  <div className="text-lg font-extrabold text-slate-900">75k+</div>
                  <div className="text-sm font-medium text-slate-700 mt-1">Students Enrolled with us</div>
                  <div className="mt-0 sm:mt-3">
                    <img
                      src="/images/awards/hero%20section/icons%20in%2075k%2B.png"
                      alt="Student avatars"
                      className="h-auto w-18 sm:w-28"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex justify-end pr-[-350]">
          <img
            src="/images/awards/hero section/gray dots.png"
            alt=""
            className="h-auto w-full max-w-2xl -translate-y-10"
          />
        </div>
      </div>
    </section>
  );
}
