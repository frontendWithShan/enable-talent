import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function CareerCoachingHighlight() {
  return (
    <section
      aria-labelledby="career-coaching-title"
      className={`${plusJakartaSans.className} relative overflow-hidden bg-white px-4 py-12 sm:py-20 lg:py-35`}
    >
      <div className="absolute inset-y-0 right-[0.5%] hidden w-[40%] sm:block">
        <Image
          src="/images/students/Career%20coaching/orange%20swirly.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="flex justify-center lg:justify-start">
          <Image
            src="/images/students/Career%20coaching/woman.png"
            alt="Career coaching conversation"
            width={240}
            height={320}
            className="h-auto w-[200px] sm:w-[240px] rounded-[18px] sm:rounded-[20px] object-cover"
            priority
          />
        </div>

        <h2
          id="career-coaching-title"
          className="space-y-4 text-center text-[30px] font-extrabold leading-[1.2] text-slate-900 sm:text-[52px] lg:text-[60px] lg:text-left"
        >
          <span className="block">Career coaching helps</span>
          <span className="block">students feel confident</span>
          <span className="block">and helps employers see</span>
          <span className="block">better outcomes.</span>
        </h2>
      </div>
    </section>
  );
}
