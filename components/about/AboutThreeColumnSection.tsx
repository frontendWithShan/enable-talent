import Image from "next/image";

export default function AboutThreeColumnSection() {
  return (
    <section className="relative w-full pb-16 pt-12 md:pb-24 md:pt-6">
      <div className="pointer-events-none absolute left-4 top-[16.25rem] z-0 -translate-y-1/2 lg:left-[calc((100%-490px)/2-600px)]">
        <Image
          src="/images/about-us/three-column/Vector%204491.svg"
          alt=""
          width={850}
          height={600}
          className="h-[375px] w-[250px] object-contain opacity-100 md:h-[600px] md:w-[400px] lg:h-[600px] lg:w-[850px]"
          priority
        />
      </div>
      <div className="pointer-events-none absolute right-4 top-[10.5rem] z-0 -translate-y-1/2 lg:right-[calc((100%-480px)/2-630px)]">
        <Image
          src="/images/about-us/three-column/Vector%204492.svg"
          alt=""
          width={850}
          height={600}
          className="h-[375px] w-[250px] object-contain opacity-100 md:h-[600px] md:w-[400px] lg:h-[600px] lg:w-[850px]"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-[4.5rem]">
          <div className="flex w-full justify-center lg:w-1/3 lg:justify-end">
            <div className="w-full max-w-[280px] lg:-translate-y-36">
              <p className="text-left text-base font-bold leading-relaxed text-gray-700 md:text-lg">
                After a decade creating employment programs and working with organizations to improve their hiring
                practices, Amandipp saw the same challenge repeatedly.
              </p>
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-1/3">
            <div className="relative h-[340px] w-[280px] overflow-hidden rounded-[32px] shadow-lg sm:h-[380px] sm:w-[320px] lg:h-[420px] lg:w-[300px]">
              <Image
                src="/images/about-us/three-column/woman-on-wheelchair.png"
                alt="Professional woman in wheelchair working on laptop"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 300px"
                priority
              />
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-1/3 lg:justify-start">
            <div className="w-full max-w-[280px] lg:translate-y-36">
              <p className="text-left text-base font-bold leading-relaxed text-gray-700 md:text-lg">
                Qualified professionals with disabilities being overlooked because recruitment systems weren&apos;t designed
                to find them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

