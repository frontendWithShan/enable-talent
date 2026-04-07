import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function WhyItMatters() {
  return (
    <section
      aria-labelledby="why-it-matters-title"
      className={`${plusJakartaSans.className} bg-white`}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex justify-center">
            <Image
              src="/images/awards/Why it matters/why it matters image.png"
              alt="Community members and award recipients"
              width={500}
              height={380}
              className="w-full max-w-[520px] rounded-[28px] object-contain"
              priority
            />
          </div>

          <div className="space-y-5">
            <h2
              id="why-it-matters-title"
              className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]"
            >
              Why It <span className="text-[#d67a3a]">Matters?</span>
            </h2>
            <p className="text-base leading-7 text-slate-800 sm:text-lg">
              Every nomination tells a story of progress, of employers who open doors, educators who empower, and individuals who prove that talent has no limits.
            </p>
            <p className="text-base leading-7 text-slate-800 sm:text-lg">
              By recognizing these achievements, we&apos;re building momentum toward a more inclusive, accessible future of work, one where every person can thrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
