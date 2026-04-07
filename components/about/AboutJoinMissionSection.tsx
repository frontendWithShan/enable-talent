import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AboutJoinMissionSection() {
  return (
    <section className="w-full overflow-x-hidden bg-white px-4 pb-28 pt-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-20">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2
            className={`${plusJakartaSans.className} text-[56px] font-extrabold leading-tight tracking-tight text-slate-900`}
          >
            Join Our{" "}
            <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
        </div>

        <div className="relative space-y-24">
          {/* Divider is helpful on larger screens; on mobile it adds clutter. */}
          <div className="pointer-events-none absolute left-1/2 top-6 hidden h-[calc(100%-40px)] w-px -translate-x-1/2 bg-gradient-to-b from-[#e1a65a] via-[#f0c27b] to-[#e1a65a] opacity-70 md:block" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" style={{ top: "24%" }}>
              <Image
                src="/images/academy/how-works/circle checkpoint.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            <div className="flex justify-center lg:order-1">
              <div className="relative w-full max-w-[520px]">
                <Image src="/images/about-us/join-mission/Laptop.png" alt="Laptop" width={520} height={320} className="h-auto w-full object-contain" />
              </div>
            </div>
            <div className="space-y-4 text-center sm:text-left lg:order-2 lg:text-left">
              <h3 className="text-[32px] font-bold text-slate-900">Recognize True Potential</h3>
              <p className="text-lg text-black md:text-xl">
                We&apos;re building solutions that help organizations recognize talent in all its forms. Where hiring
                decisions are based on capabilities and potential rather than assumptions.
              </p>
              <p className="text-lg text-black md:text-xl">
                The future of work benefits everyone when we expand how we identify and develop talent.
              </p>
            </div>
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" style={{ top: "28%" }}>
              <Image
                src="/images/academy/how-works/circle checkpoint.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            <div className="flex justify-center lg:order-2">
              <div className="relative w-full max-w-[360px]">
                <Image
                  src="/images/about-us/join-mission/join-our-mission.png"
                  alt="Join Our Mission Illustration"
                  width={360}
                  height={280}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-4 text-center sm:text-left lg:order-1 lg:text-right">
              <h3 className="text-[32px] font-bold text-slate-900">Build Better Systems</h3>
              <p className="text-lg text-black md:text-xl">
                This starts with creating better systems for connecting qualified professionals with opportunities.
                Building tools that help employers make more informed hiring decisions. Designing processes that work
                for everyone.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center px-4">
          <p className="mx-auto max-w-[1600px] text-center text-[20px] font-bold leading-[1.2] whitespace-normal sm:text-[24px] lg:whitespace-nowrap lg:text-[28px] xl:text-[32px]">
            <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
              The next chapter depends on the partners, employers, and professionals who join us.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

