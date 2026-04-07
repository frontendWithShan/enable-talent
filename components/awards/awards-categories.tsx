import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type Category = {
  title: string;
  description: string;
  icon: string;
};

const categories: Category[] = [
  {
    title: "Barrier-Free Workplace of the Year",
    description:
      "Recognizing an employer that has demonstrated exceptional leadership in creating accessible, inclusive, and supportive work environments.",
    icon: "/images/awards/categories/barrier-free workplace of the year.png",
  },
  {
    title: "Inclusive Partnership of the Year",
    description:
      "Recognizing a partnership between NGOs, government bodies, and educational institutions that has created measurable employment opportunities for people with disabilities.",
    icon: "/images/awards/categories/inclusive partnership of the year.png",
  },
  {
    title: "Inclusive Employer of the Year",
    description:
      "Honoring organizations that integrate accessibility into hiring, onboarding, and workplace culture, setting new standards for inclusion.",
    icon: "/images/awards/categories/inclusive employer of the year.png",
  },
  {
    title: "Innovative Learning & Upskilling Program",
    description:
      "Highlighting programs that have successfully trained, mentored, or upskilled job seekers through inclusive design and accessible technology.",
    icon: "/images/awards/categories/innovative learning & upskilling program.png",
  },
  {
    title: "Talent Leader of the Year",
    description:
      "Celebrating an individual who has overcome barriers to employment and continues to advocate for greater inclusion in their field.",
    icon: "/images/awards/categories/talent leader of the year.png",
  },
  {
    title: "Emerging Talent Award",
    description:
      "For early-career professionals or students who exemplify resilience, creativity, and commitment to an inclusive future.",
    icon: "/images/awards/categories/emerging talent award.png",
  },
];

export default function AwardsCategories() {
  return (
    <section
      aria-labelledby="awards-categories-title"
      className={`${plusJakartaSans.className} bg-[#FDFCFB]`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-20 lg:py-24">
        <h2
          id="awards-categories-title"
          className="text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]"
        >
          Award <span className="text-[#d67a3a]">Categories</span>
        </h2>

        <div className="mt-8 grid gap-10 sm:mt-12 lg:grid-cols-3 lg:gap-12">
          {[
            { items: [categories[0], categories[1]], offset: "pt-0" },
            { items: [categories[2], categories[3]], offset: "pt-4" },
            { items: [categories[4], categories[5]], offset: "pt-8" },
          ].map(({ items, offset }, colIdx) => (
            <div
              key={colIdx}
              className={`flex flex-col gap-10 ${offset} ${colIdx > 0 ? "lg:border-l lg:border-dashed lg:border-slate-200 lg:pl-10" : ""}`}
            >
              {items.map(({ title, description, icon }) => (
                <div key={title} className="flex flex-col items-center gap-3 text-center sm:gap-4 sm:items-start sm:text-left">
                  <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                    <Image
                      src="/images/awards/categories/square block for award categories.png"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="56px"
                      priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={icon}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 sm:h-10 sm:w-10"
                        priority
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[17px] font-extrabold text-slate-900 leading-tight sm:text-lg">{title}</h3>
                    <p className="text-[14px] leading-6 text-slate-700 sm:text-sm">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
