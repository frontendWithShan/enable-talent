import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function MoreThanJobBoard() {
  return (
    <section
      aria-labelledby="more-than-job-board-title"
      className={`${plusJakartaSans.className} bg-white px-6 pt-24 pb-40 sm:pt-28 sm:pb-48 lg:pt-32 lg:pb-56`}
    >
      <div className="mx-auto flex max-w-8xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">

        {/* TEXT COLUMN */}
        <div className="max-w-2xl space-y-5 lg:ml-6">
          <h2
            id="more-than-job-board-title"
            className="text-[50px] font-extrabold leading-tight tracking-tight text-slate-900 text-center sm:text-left"
          >
            More Than a{" "}
            <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
              Job Board
            </span>
          </h2>

          <p className="text-[24px] leading-8 font-semibold text-black/50 text-center sm:text-left">
            Most hiring platforms stop once someone is hired.
            <br />
            Enabled Talent is built to support what comes next: guidance, onboarding, and early career success.
          </p>

          <p className="text-[24px] leading-8 font-semibold text-black/50 text-center sm:text-left">
            From career discovery to the first months at work,
            <br />
            students are never left on their own.
          </p>
        </div>

        {/* IMAGE GROUP */}
        <div className="relative w-full max-w-6xl lg:translate-x-8">
          <div
            className="hidden sm:block absolute right-0 top-1/2 rounded-[36px] bg-[#e7f1ff]"
            style={{
              width: "680px",
              height: "430px",
              transform: "translateY(-45%)",
            }}
          />

          <div className="relative flex flex-col items-center justify-center gap-6 px-6 py-8 sm:flex-row sm:justify-end sm:gap-8 sm:px-6 sm:py-10">

            {/* IMAGE 1 — BIGGER */}
            <div className="w-full origin-center overflow-hidden rounded-[22px] sm:w-[285px] sm:-ml-6 sm:translate-x-[40px]">
              <Image
                src="/images/students/More%20than%20a%20job%20board%20section/1st%20happy-male.png"
                alt="Consultation"
                width={680}
                height={460}
                className="h-full w-full object-cover sm:h-[220px]"
                priority
              />
            </div>

            {/* IMAGE 2 */}
            <div className="w-full origin-center overflow-hidden rounded-[22px] sm:w-[220px] sm:-translate-y-6 sm:translate-x-[30px]">
              <Image
                src="/images/students/More%20than%20a%20job%20board%20section/2nd%20happy%20male.png"
                alt="Smiling professional"
                width={520}
                height={360}
                className="h-full w-full object-cover sm:h-[270px]"
                priority
              />
            </div>

            {/* IMAGE 3 */}
            <div className="w-full origin-center overflow-hidden rounded-[22px] sm:w-[180px] sm:translate-x-[20px]">
              <Image
                src="/images/students/More%20than%20a%20job%20board%20section/3rd%20male.png"
                alt="Handshake"
                width={520}
                height={360}
                className="h-full w-full object-cover sm:h-[220px]"
                priority
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

