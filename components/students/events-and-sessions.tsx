import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const items = [
  {
    number: "1",
    title: "Employer info\nsessions",
  },
  {
    number: "2",
    title: "One-to-one and\ngroup meetings",
  },
  {
    number: "3",
    title: "Virtual or in-\nperson events",
  },
  {
    number: "4",
    title: "Calendar reminders\nand follow-ups",
  },
];

export default function EventsAndSessions() {
  return (
    <section
      aria-labelledby="events-and-sessions-title"
      className={`${plusJakartaSans.className} bg-white px-4 py-12 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="pb-1 text-3xl font-extrabold leading-[1.15] tracking-tight text-transparent bg-gradient-to-r from-[#c0412c] to-[#f4c15d] bg-clip-text sm:text-[42px] lg:text-[62px]">
          Better hiring starts with better support.
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start sm:mt-30">
        <div className="space-y-6 lg:-mt-0 text-center sm:text-left">
          <div className="flex justify-center sm:justify-start">
            <div className="inline-flex items-center rounded-full bg-[#e8e8e8] px-4 py-2 text-[16px] font-semibold uppercase tracking-[0.06em] text-slate-900">
              Events & sessions
            </div>
          </div>

          <h2
            id="events-and-sessions-title"
            className="text-[32px] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[60px]"
          >
            Real conversations
            <br />
            before and after
            <br />
            hiring
          </h2>

          <div className="space-y-3">
            <p className="mx-auto max-w-xl text-[16px] leading-7 font-semibold text-black/70 sm:mx-0 sm:text-lg lg:text-[20px] mt-10">
              Enabled Talent makes it easy to host events that help students prepare and succeed.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4 sm:grid-cols-2 sm:gap-x-20 sm:gap-y-16">
            {items.map((item, idx) => (
              <div
                key={item.title}
                className={`flex flex-col items-start gap-3 ${idx > 1 ? "mt-8" : "mt-2"} sm:gap-4 sm:${idx > 1 ? "mt-16" : "mt-6"}`}
              >
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-2xl bg-[#eaf2ff] sm:h-[72px] sm:w-[72px]">
                  <span className="text-[56px] font-bold leading-[1.2] text-slate-900/15 sm:text-[72px]">
                    {item.number}
                  </span>
                </div>
                <p className="whitespace-pre-line text-[16px] font-semibold leading-[1.35] text-[#12074b] sm:text-[18px]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center sm:justify-end">
          <div className="relative w-full max-w-[300px] sm:max-w-[520px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(19,44,85,0.12)]">
            <Image
              src="/images/students/events%20and%20sessions/men%20happy.png"
              alt="Employers smiling and collaborating"
              width={900}
              height={1160}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
