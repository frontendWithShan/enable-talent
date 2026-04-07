import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AwardsOverview() {
  return (
    <section
      aria-labelledby="awards-overview-title"
      className={`${plusJakartaSans.className} bg-white`}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="flex justify-center sm:justify-start">
              <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-800 shadow-sm">
                About
              </div>
            </div>
            <h2
              id="awards-overview-title"
              className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 text-center sm:text-left sm:text-4xl lg:text-5xl"
            >
              About the <span className="text-[#d67a3a]">Awards</span>
            </h2>
            <div className="space-y-4 text-base leading-7 text-slate-800 sm:text-lg">
              <p>
                The Enabled Talent Awards honor individuals and organizations that go beyond compliance, creating workplaces that celebrate diversity, empower people of all abilities, and champion equitable access to meaningful work.
              </p>
              <p>
                Through these awards, we shine a light on leaders who inspire change across Canada and beyond, in business, education, technology, and community development.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/awards/about/about the awards image.png"
              alt="Portraits representing Enabled Talent Awards honorees"
              width={654}
              height={750}
              className="w-full max-w-[560px] rounded-[32px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
