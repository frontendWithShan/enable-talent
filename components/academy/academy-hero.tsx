import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AcademyHero() {
  return (
    <section
      aria-labelledby="academy-hero-title"
      className={`${plusJakartaSans.className} relative overflow-hidden bg-[#FDF6E8] min-h-[90vh] flex items-center`}
    >
      <div className="relative mx-auto max-w-7xl px-4 py-8 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Illustration Stack */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-center items-center pointer-events-none select-none">
            <div className="relative w-full max-w-[550px] aspect-square">
              {/* Yellow glow overlay on left side */}
              <div className="absolute bottom-[6%] left-[40%] w-[78%] z-40 opacity-75">
                <Image
                  src="/images/academy/hero/yellow glow.svg"
                  alt=""
                  aria-hidden="true"
                  width={520}
                  height={200}
                  className="h-auto w-full"
                  draggable={false}
                />
              </div>

              {/* Blue rectangle backdrop */}
              <div className="absolute top-[30%] left-[15%] w-[41%] z-10">
                <Image
                  src="/images/academy/hero/blue rectangle.svg"
                  alt=""
                  aria-hidden="true"
                  width={220}
                  height={320}
                  className="h-auto w-full"
                  draggable={false}
                />
              </div>

              {/* Yellow background shape */}
              <div className="absolute top-[6%] left-[18%] w-[70%] z-20">
                <Image
                  src="/images/academy/hero/academy-hero-bg-shape.svg"
                  alt=""
                  aria-hidden="true"
                  width={500}
                  height={500}
                  className="h-auto w-full"
                  priority
                  draggable={false}
                />
              </div>

              {/* White accent on yellow */}
              <div className="absolute top-[20%] left-[68%] w-[10%] z-25">
                <Image
                  src="/images/academy/hero/white thing on yellow.svg"
                  alt=""
                  aria-hidden="true"
                  width={200}
                  height={200}
                  className="h-auto w-full"
                  draggable={false}
                />
              </div>

              {/* Black swirly accent */}
              <div className="absolute top-[58%] left-[68%] w-[23%] z-26">
                <Image
                  src="/images/academy/hero/black swirly middle.svg"
                  alt=""
                  aria-hidden="true"
                  width={80}
                  height={80}
                  className="h-auto w-full"
                  draggable={false}
                />
              </div>

              {/* Star + pink accent */}
              <div className="absolute top-[4%] right-[6%] w-[16%] z-40">
                <Image
                  src="/images/academy/hero/academy-hero-star-accent.svg"
                  alt=""
                  aria-hidden="true"
                  width={120}
                  height={120}
                  className="h-auto w-full"
                  draggable={false}
                />
              </div>

              {/* Union shape behind illustration */}
              <div className="absolute bottom-[8%] left-[20%] w-[60%] z-0">
                <Image
                  src="/images/academy/hero/Union.svg"
                  alt=""
                  aria-hidden="true"
                  width={300}
                  height={300}
                  className="h-auto w-full"
                  draggable={false}
                />
              </div>

              {/* Black top-left accent */}
              <div className="absolute top-[24%] left-[11%] w-[10%] z-30">
                <Image
                  src="/images/academy/hero/black top left.svg"
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="h-auto w-full"
                  draggable={false}
                />
              </div>

              {/* White circle accent behind wheelchair */}
              <div className="absolute bottom-[20%] left-[-10%] w-[55%] z-10">
                <Image
                  src="/images/academy/hero/white circle behind wheelchair.svg"
                  alt=""
                  aria-hidden="true"
                  width={250}
                  height={250}
                  className="h-auto w-full"
                  draggable={false}
                />
              </div>

              <div className="relative z-30 w-full h-full flex items-end justify-center lg:justify-center pb-10 lg:-translate-x-14">
                <Image
                  src="/images/academy/hero/academy-hero-illustration.png"
                  alt="A professional woman in a wheelchair smiling, representing the talent empowered by the Academy"
                  width={500}
                  height={500}
                  className="h-[85%] w-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="order-1 lg:order-2 z-30 relative pb-12">
            <div className="flex items-center justify-center sm:justify-start relative z-10">
              <span
                aria-hidden="true"
                className="mr-3 inline-block h-7 w-1.5 bg-[#C0412C]"
              />
              <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent text-[20px] font-bold uppercase tracking-[0.2em]">
                Enabled Academy
              </span>
            </div>

            <h1
              id="academy-hero-title"
              className="relative z-10 mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 text-center sm:text-left sm:text-6xl"
            >
              Learn. Train. Grow.
              <br />
              Get Ready for Opportunity.
            </h1>

            <p className="relative z-10 mt-6 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
              Enabled Academy is a training and job-readiness program that helps
              people build real skills while supporting employers with
              qualified, prepared, and confident talent. Whether you're an
              individual looking to grow your career, or an employer looking for
              trained talent, Enabled Academy is here to support your journey.
            </p>

            <div className="relative z-10 mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="https://app.enabledtalent.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sign up as a talent"
                className="inline-flex"
              >
                <FancyButton label="For Talents" color="navy" as="span" />
              </Link>

              <Link
                href="https://app.enabledtalent.com/login-employer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sign up as an employer"
                className="inline-flex"
              >
                <FancyButton label="For Employers" color="orange" as="span" />
              </Link>
            </div>

            <div className="absolute bottom-0 left-[37%] w-[95%] z-0 pointer-events-none">
              <Image
                src="/images/academy/hero/gray dots.svg"
                alt=""
                aria-hidden="true"
                width={480}
                height={64}
                className="h-auto w-full max-w-[520px]"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Accent (Far Right Swirly) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-16 opacity-40 pointer-events-none">
        <Image
          src="/images/academy/hero/swirly right.svg"
          alt=""
          aria-hidden="true"
          width={60}
          height={300}
          draggable={false}
        />
      </div>
    </section>
  );
}
