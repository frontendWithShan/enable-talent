import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AboutOurStorySection() {
  return (
    <section className={`${plusJakartaSans.className} relative w-full overflow-hidden py-10 md:py-20`}>
      {/* SVG ClipPath Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="ourStoryClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 H 1 V 0.52 C 1,0.58 0.96,0.58 0.92,0.58 H 0.76 C 0.7,0.58 0.7,0.58 0.7,0.64 V 0.94 C 0.7,1 0.64,1 0.58,1 H 0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Mobile layout (desktop remains unchanged) */}
      <div className="relative z-10 mx-auto w-full px-4 sm:px-8 lg:px-12 md:hidden">
        <div className="mx-auto w-full max-w-[420px]">
          {/* Image "puzzle" block (mobile only) */}
          <div className="relative h-[390px] w-full">
            <div
              className="absolute left-0 top-0 h-[360px] w-[320px] overflow-hidden rounded-[40px]"
              style={{ clipPath: "url(#ourStoryClip)" }}
            >
              <Image
                src="/images/about-us/story/adult-amandipp.png"
                alt="Amandipp Singh"
                fill
                className="h-full w-full object-cover"
                sizes="320px"
                priority
              />
            </div>

            <div className="absolute left-[232px] top-[242px] z-20 h-[104px] w-[104px] overflow-hidden rounded-3xl">
              <Image
                src="/images/about-us/story/toddler-amandipp-v2.png"
                alt="Amandipp as a toddler"
                fill
                className="h-full w-full object-cover"
                sizes="104px"
                quality={100}
                unoptimized
                priority
              />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
                Story
              </span>
            </h2>
            <p className="mb-5 text-base leading-relaxed text-gray-700 sm:text-lg">
              Enabled Talent started with a simple realization: exceptional
              talent exists everywhere, but traditional hiring systems only look
              in familiar places.
            </p>
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              Our founder,{" "}
              <span className="font-semibold text-slate-900">
                Amandipp Singh
              </span>
              , learned this through lived experience. Born with partial vision,
              he consistently encountered systems that focused on what he
              couldn&apos;t do rather than recognizing what he could accomplish.
              But instead of accepting these limitations, he chose to build
              something better.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop/tablet layout (unchanged) */}
      <div className="relative z-10 mx-auto hidden w-full max-w-6xl flex-col items-center gap-0 px-4 sm:px-8 lg:px-12 md:flex md:flex-row md:items-start">
        <div className="relative min-h-[460px] w-full md:min-h-[540px] md:w-1/2 lg:min-h-[600px]">
          {/* Adult Image with Curvy Cutout */}
          <div
            className="absolute left-0 top-0 h-[280px] w-[240px] overflow-hidden rounded-[40px] sm:h-[320px] sm:w-[280px] md:h-[480px] md:w-[440px]"
            style={{ clipPath: "url(#ourStoryClip)" }}
          >
            <Image
              src="/images/about-us/story/adult-amandipp.png"
              alt="Amandipp Singh"
              fill
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 240px, 440px"
              priority
            />
          </div>

          {/* Toddler Image nested in the notch area */}
          <div className="absolute left-[160px] top-[182px] z-20 h-[80px] w-[80px] overflow-hidden rounded-3xl sm:left-[200px] sm:top-[220px] sm:h-[100px] sm:w-[100px] md:left-[315px] md:top-[298px] md:h-[170px] md:w-[150px]">
            <Image
              src="/images/about-us/story/toddler-amandipp-v2.png"
              alt="Amandipp as a toddler"
              fill
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 130px, 200px"
              quality={100}
              unoptimized
              priority
            />
          </div>
        </div>

        <div className="mt-[380px] w-full pl-0 md:mt-0 md:w-1/2 md:pl-10 lg:pl-16">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
              Story
            </span>
          </h2>
          <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
            Enabled Talent started with a simple realization: exceptional talent exists everywhere, but traditional
            hiring systems only look in familiar places.
          </p>
          <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
            Our founder, <span className="font-semibold text-slate-900">Amandipp Singh</span>, learned this through lived experience.
            Born with partial vision, he consistently encountered systems that focused on what he couldn&apos;t do rather
            than recognizing what he could accomplish. But instead of accepting these limitations, he chose to build
            something better.
          </p>
        </div>
      </div>
    </section>
  );
}
