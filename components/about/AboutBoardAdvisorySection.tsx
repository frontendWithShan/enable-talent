import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AboutBoardAdvisorySection() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-white py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-4 sm:px-8 lg:px-12 md:grid-cols-2">
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-6 h-[350px] w-[348px] overflow-hidden rounded-[40px]">
            <Image
              src="/images/about-us/board-advisory/Board-of-Directions.png"
              alt="Board of Directors"
              width={348}
              height={350}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h3
            className={`${plusJakartaSans.className} mb-3 text-[40px] font-extrabold tracking-tight text-slate-900`}
          >
            Board of Directors
          </h3>
          <p className="mb-4 text-lg text-gray-700">
            We are guided by a passionate board with deep experience in accessibility, technology, and inclusive
            workforce development. Our board ensures Enabled Talent stays accountable to our mission while scaling our
            impact responsibly.
          </p>
          <p className="text-lg text-gray-700">
            Our board members bring decades of combined experience in building accessible systems, scaling social
            ventures, and creating lasting change in how organizations think about talent.
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <h3
            className={`${plusJakartaSans.className} mb-3 text-[40px] font-extrabold tracking-tight text-slate-900`}
          >
            Advisory Council
          </h3>
          <p className="mb-4 text-lg text-gray-700">
            Our advisors are trusted experts who help shape our direction with insights from healthcare, HR, academia,
            and technology. They serve as thought partners and strategic guides, ensuring we build solutions that work
            for everyone.
          </p>
          <p className="text-lg text-gray-700">
            From former executives at leading tech companies to accessibility researchers at top universities, our
            advisors help us stay at the forefront of innovation while remaining grounded in real-world impact.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <div className="mb-6 h-[350px] w-[348px] overflow-hidden rounded-[40px]">
            <Image
              src="/images/about-us/board-advisory/What-Is-the-Difference.png"
              alt="Advisory Council"
              width={348}
              height={350}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

