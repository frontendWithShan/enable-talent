import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AboutFoundingSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-4 pt-16 pb-16 sm:px-8 md:pt-20 lg:px-12 md:flex-row md:gap-0 md:pb-24">
      <div className="mb-8 flex w-full flex-col items-start justify-center md:mb-0 md:w-1/2">
        <h3
          className={`${plusJakartaSans.className} mb-4 text-[44px] font-extrabold tracking-tight text-slate-900`}
        >
          Why Enabled{" "}
          <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
            Talent Exists
          </span>
        </h3>
        <p className="mb-4 max-w-xl text-base text-gray-900 sm:text-lg md:text-xl">
          In <span className="font-bold">2023</span>, he partnered with a team of experienced technologists and
          workforce experts to create <span className="font-bold">Enabled Talent</span> - a platform that connects
          exceptional professionals with forward-thinking employers through{" "}
          <span className="font-bold">AI-powered matching and personalized support</span>.
        </p>
        <p className="max-w-xl text-base text-gray-900 sm:text-lg md:text-xl">
          We&apos;re working toward a future where hiring systems recognize talent in all its forms, and where the best
          candidates get opportunities based on what they can contribute.
        </p>
      </div>
      <div className="flex w-full items-center justify-center md:w-1/2 md:pl-16 lg:pl-24">
        <div className="flex h-[260px] w-[320px] items-center justify-center rounded-[32px] bg-[#FFD071] sm:h-[300px] sm:w-[360px] md:h-[320px] md:w-[400px] lg:h-[407px] lg:w-[430px]">
          <div className="relative right-3.5 mt-2 h-[160px] w-[220px] sm:h-[180px] sm:w-[260px] md:h-[220px] md:w-[300px] lg:h-[400px] lg:w-[450px]">
            <Image src="/images/about-us/founding/Tablet-Screen.png" alt="Tablet Screen" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </section>
  );
}

