import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function BuiltToBeSimple() {
  return (
    <section
      aria-labelledby="built-to-be-simple-title"
      className={`${plusJakartaSans.className} bg-white px-4 py-12 sm:py-20 lg:py-55`}
    >
      <div className="relative mx-auto max-w-6xl flex flex-col gap-8 sm:block">
        {/* Orange swirl */}
        <div className="absolute inset-0 -left-24 -translate-y-6 sm:-left-223 sm:-translate-y-30">
          <Image
            src="/images/students/Built%20to%20be%20simple%20section/orange%20swirl.png"
            alt=""
            fill
            className="object-contain scale-[1.6] sm:scale-[2.5]"
            priority
          />
        </div>

        {/* Stickman logo — ABOVE woman */}
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 z-20 opacity-90 hidden sm:block">
          <Image
            src="/images/students/Built%20to%20be%20simple%20section/stickman%20logo.png"
            alt=""
            width={180}
            height={180}
            className="object-contain"
            priority
          />
        </div>

        {/* Woman image */}
        <div className="relative z-10 flex justify-end sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
          <Image
            src="/images/students/Built%20to%20be%20simple%20section/woman.png"
            alt="Woman talking with student"
            width={260}
            height={320}
            className="rounded-[20px] object-cover w-[220px] sm:w-[300px] lg:w-[360px] sm:translate-x-[-24px] lg:translate-x-[-40px]"
            priority
          />
        </div>

        {/* Text */}
        <div className="relative z-20 max-w-3xl pr-0">
          <h2
            id="built-to-be-simple-title"
            className="font-extrabold leading-[1.05] text-slate-900 text-[34px] sm:text-[52px] lg:text-[64px]"
          >
            <span className="block">Built to be simple,</span>
            <span className="block">
              accessible, and easy to use for everyone.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}

