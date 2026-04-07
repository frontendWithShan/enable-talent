import Link from "next/link";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function LetsSupport() {
  return (
    <section
      aria-labelledby="lets-support-title"
      className={`${plusJakartaSans.className} relative z-20 bg-[#0f1f36] px-4 py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center text-white">
        <Image
          src="/images/students/lets%20support%20section/stickman%20logo.svg"
          alt=""
          width={72}
          height={72}
          className="h-16 w-16"
          priority
        />

        <h2
          id="lets-support-title"
          className="text-3xl font-extrabold leading-tight tracking-tight text-transparent bg-gradient-to-r from-[#c0412c] to-[#f4c15d] bg-clip-text sm:text-4xl lg:text-[40px]"
        >
          Let&apos;s support students from classroom to career
        </h2>

        <p className="max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
          Enabled Talent helps students find opportunities, get guidance, and succeed at work while
          helping career centres and employers do more with confidence.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 pt-2">
          <Link
            href="https://app.enabledtalent.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <FancyButton label="Try Enabled Talent" color="orange" as="span" />
          </Link>

          <Link
            href="/foremployers"
            className="inline-flex items-center justify-center"
          >
            <FancyButton label="Talk to our team" color="navy" as="span" />
          </Link>
        </div>
      </div>
    </section>
  );
}
