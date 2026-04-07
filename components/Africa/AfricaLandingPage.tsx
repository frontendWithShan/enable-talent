import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import FancyButton from "@/components/FancyButton";
import AfricaLatestRolesTopEmployers from "@/components/Africa/AfricaLatestRolesTopEmployers";

type WhyCard = {
  label: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  bgColor: string;
};

type EmployerItem = {
  region: string;
  stats: string;
  description: string;
  bgColor: string;
  src: string;
  alt: string;
};

const whyCards: WhyCard[] = [
  {
    label: "Pan-African Reach",
    title: "Connect Across Borders",
    body: "Reach talent, employers, and opportunity across multiple African markets through one platform.",
    image: "/images/africa/image 1.png",
    alt: "Professional portrait for Enabled Africa",
    bgColor: "bg-[#f4ece0]",
  },
  {
    label: "Skills First Matching",
    title: "Match With Intent",
    body: "Make stronger connections between capability, ambition, and the roles or partnerships that fit best.",
    image: "/images/africa/image 2.png",
    alt: "Candidate using technology for work",
    bgColor: "bg-[#dfeaff]",
  },
  {
    label: "Inclusive By Design",
    title: "Support Diverse Talent",
    body: "Champion accessible, inclusive hiring and create more pathways for underrepresented professionals.",
    image: "/images/africa/image 3.png",
    alt: "Inclusive team working together",
    bgColor: "bg-[#f4ece0]",
  },
  {
    label: "Beyond Jobs",
    title: "Build Long-Term Growth",
    body: "Go beyond listings with a platform designed to support skills, innovation, and sustainable opportunity.",
    image: "/images/africa/image 4.png",
    alt: "Professional in conversation",
    bgColor: "bg-[#dfeaff]",
  },
];

const employerItems: EmployerItem[] = [
  {
    region: "Pan-African Reach",
    stats: "Access Talent Across Markets",
    description:
      "Connect with skilled professionals from across Africa and widen your hiring pipeline with confidence.",
    bgColor: "bg-[#f4ece0]",
    src: "/images/africa/diverse-multiracial-group-people-giving-high-five-modern-office-teamwork-concept.png",
    alt: "Team celebrating together in an office",
  },
  {
    region: "Faster Hiring",
    stats: "Find Better-Fit Candidates",
    description:
      "Reduce time to hire with a platform built to surface talent that matches your team, goals, and culture.",
    bgColor: "bg-[#dfeaff]",
    src: "/images/africa/645bd6210b74564994a286d7_MicrosoftTeams-image (1).png",
    alt: "Professional candidate portrait",
  },
  {
    region: "Inclusive Workforces",
    stats: "Build Stronger Teams",
    description:
      "Bring together people with varied perspectives, experiences, and strengths to create resilient organizations.",
    bgColor: "bg-[#f4ece0]",
    src: "/images/africa/istock-2160995080.png",
    alt: "Professional working at a computer",
  },
  {
    region: "Long-Term Growth",
    stats: "Hire for Sustainable Impact",
    description:
      "Invest in talent strategies that strengthen retention, expand opportunity, and support long-term business growth.",
    bgColor: "bg-[#dfeaff]",
    src: "/images/africa/financial-businesswomen-analyze-the-graph-of-the-c-2025-02-22-17-12-16-utc.png",
    alt: "Team reviewing business data together",
  },
];

function CtaLink({
  children,
  color = "orange",
  href = "/role-selection"
}: {
  children: ReactNode;
  color?: "orange" | "navy";
  href?: string;
}) {
  return (
    <Link href={href} className="inline-flex" aria-label={String(children)}>
      <FancyButton label={String(children)} color={color} as="span" />
    </Link>
  );
}

export default function AfricaLandingPage() {
  const whatYouGetItems = [
    "Jobs That Matter|Discover opportunities across industries, from startups to multinationals.",
    "One Profile, Many Matches|Build your profile once, and let employers find you.",
    "Growth Beyond Work|Access training and learning programs to upgrade your skills.",
    "Support Along the Way|Career advice, mentorship, and resources to help you succeed.",
  ];

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fffdf8] text-slate-900"
    >
      <section
        className="relative w-full overflow-hidden bg-[#FFF8E1]"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <img
          src="/images/africa/hero-image.png"
          alt="Enabled Africa hero showing African professionals"
          className="h-[430px] w-full md:h-[545px] lg:h-[640px]"
          style={{
            display: "block",
            width: "100vw",
            objectFit: "cover",
            objectPosition: "center",
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
          }}
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-8 md:px-16 md:-translate-y-4 lg:-translate-y-6">
          <div className="max-w-xl">
            <h1 className="mb-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-white drop-shadow-sm sm:text-[2.5rem] md:mb-6 md:text-[4.5rem] lg:text-[4.7rem]">
              Africa&apos;s
              <br />
              Largest Talent
              <br />
              Bank
            </h1>
            <div className="mt-3">
              <p className="mb-6 max-w-xs text-sm font-medium leading-relaxed text-white/95 sm:max-w-lg sm:text-base md:mb-8 md:max-w-xl md:text-[1.35rem] lg:text-[1.55rem]">
                Building accessible futures
                <br />
                through jobs, skills, and innovation
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
                <Link href="https://app.enabledtalent.com/signup" target="_blank" rel="noopener noreferrer">
                  <FancyButton label="Find Your Next Job" color="navy" as="span" />
                </Link>
                <Link href="https://app.enabledtalent.com/signup-employer" target="_blank" rel="noopener noreferrer">
                  <FancyButton label="Post a Job" color="orange" as="span" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AfricaLatestRolesTopEmployers />

      <section
        id="who-we-are"
        className="bg-white overflow-hidden py-10 sm:py-14 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-2">
            {/* Left copy */}
            <div className="space-y-6 sm:space-y-4 lg:pr-6 order-2 lg:order-1">
              <div className="flex justify-center sm:justify-start">
                <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 shadow-sm">
                  Who We Are
                </div>
              </div>

              <h2 className="text-[30px] font-black leading-[1.05] tracking-tight text-slate-900 text-center sm:text-left sm:text-[40px] lg:text-[44px]">
                Connecting Talent
                <br className="hidden sm:block" />
                Across Africa
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-slate-600 text-center sm:text-left">
                <p>
                  We believe that talent exists everywhere in Africa, and everyone
                  deserves a fair chance to succeed.
                </p>
                <p>
                  We connect individuals across the continent with forward-thinking
                  employers, helping them secure meaningful roles.
                </p>
                <p>
                  We work closely with employers to understand their hiring needs
                  and match them with highly skilled candidates ready for success.
                </p>
              </div>
            </div>

            {/* Right visual stack */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative h-[350px] w-full max-w-[500px] sm:h-[450px] lg:h-[600px] lg:max-w-[600px]">
                <div className="absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/images/africa/transparent africa map.png"
                    alt="Map of Africa"
                    width={1500}
                    height={1500}
                    className="h-[780px] w-[780px] max-w-none object-contain sm:h-[950px] sm:w-[950px] md:h-[1100px] md:w-[1100px] lg:h-[1350px] lg:w-[1350px]"
                  />
                </div>
                {[
                  { src: "Ellipse 4344.png", pos: "top-[32%] left-[38%] sm:top-[35%] sm:left-[42%] lg:top-[38%] lg:left-[45%]", mClass: "h-[40px] w-[40px]", dClass: "md:h-[75px] md:w-[75px]", size: 75 },
                  { src: "Ellipse 4342.png", pos: "top-[30%] left-[10%] sm:top-[32%] sm:left-[15%] lg:top-[35%] lg:left-[18%]", mClass: "h-[40px] w-[40px]", dClass: "md:h-[75px] md:w-[75px]", size: 75 },
                  { src: "Ellipse 4345.png", pos: "top-[70%] left-[45%] sm:top-[70%] sm:left-[50%] lg:top-[72%] lg:left-[55%]", mClass: "h-[50px] w-[50px]", dClass: "md:h-[95px] md:w-[95px]", size: 95 },
                  { src: "Ellipse 4346.png", pos: "top-[55%] left-[55%] sm:top-[50%] sm:left-[60%] lg:top-[50%] lg:left-[65%]", mClass: "h-[40px] w-[40px]", dClass: "md:h-[75px] md:w-[75px]", size: 75 },
                ].map((item) => (
                  <div key={item.src} className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 ${item.pos}`}>
                    <Image
                      src={`/images/africa/${item.src}`}
                      alt="Featured talent profile"
                      width={item.size}
                      height={item.size}
                      className={`rounded-full max-w-none ${item.mClass} ${item.dClass}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-enabled-africa" className="bg-[#fffaf1] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[36px] md:text-[42px]">
              Why Enabled Africa?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className={`flex flex-col rounded-[32px] ${card.bgColor} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="relative mb-4 h-40 overflow-hidden rounded-3xl sm:h-44 lg:h-48">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-grow flex-col">
                  <h3 className="text-[1.2rem] font-bold leading-tight text-slate-900 sm:text-[1.35rem]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-6 text-slate-700">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-16 pb-32 sm:pt-20 sm:pb-40 lg:pt-24 lg:pb-52">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] shadow-[0_28px_70px_-35px_rgba(15,23,42,0.4)]">
            <Image src="/images/africa/banner-background.png" alt="Enabled Africa community banner" width={1400} height={400} className="h-[280px] w-full object-cover sm:h-[320px] lg:h-[400px]" />
            <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4 lg:px-6">
              <div className="mx-auto max-w-lg text-center">
                <div className="mb-4">
                  <Image src="/images/africa/Group 1171276407.png" alt="Enabled Africa icon" width={48} height={48} className="mx-auto h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                </div>
                <div className="mb-6 px-4 lg:w-[593px] lg:px-0">
                  <h2 className="text-center text-[20px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[26px] md:text-[34px] lg:text-[42px]">
                    Join as Talent or Employer
                    <br />
                    and be part of Africa&apos;s future
                  </h2>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="https://app.enabledtalent.com/signup" target="_blank" rel="noopener noreferrer">
                    <FancyButton label="Find Your Next Job" color="navy" as="span" />
                  </Link>
                  <Link href="https://app.enabledtalent.com/signup-employer" target="_blank" rel="noopener noreferrer">
                    <FancyButton label="Post a Job" color="orange" as="span" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="what-you-get"
        className="overflow-visible bg-[#f7f7f7] px-4 pt-16 pb-8 sm:pt-24 sm:pb-10 lg:pt-32 lg:pb-12"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="relative z-10 space-y-4 text-center sm:text-left lg:-translate-y-24">
            <div>
              <h2 className="text-[34px] font-extrabold leading-[1] tracking-tight text-slate-900 sm:text-[48px] lg:text-[56px]">
                Your Skills.
                <br />
                Your Future.
                <br />
                Your Africa.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[18px] leading-[1.45] text-slate-600 sm:mx-0">
                Find opportunities that match your potential and support your long-term growth.
              </p>
            </div>

            <div className="relative flex justify-center sm:hidden">
              <div className="relative h-[240px] w-full max-w-[320px] overflow-visible">
                <Image
                  src="/images/africa/Group 1171276411.png"
                  alt="What you get feature collage"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>

            <ul className="space-y-3 text-left">
              {whatYouGetItems.map((item) => {
                const [title, body] = item.split("|");
                return (
                  <li key={title} className="flex items-start gap-3 text-slate-800">
                    <Image
                      src="/images/students/accessibility/checkmarks.svg"
                      alt=""
                      width={22}
                      height={22}
                      className="mt-[2px] h-[22px] w-[22px]"
                    />
                    <div>
                      <h3 className="text-[18px] font-medium leading-[1.35] text-slate-900 sm:text-[20px]">
                        {title}
                      </h3>
                      <p className="mt-1 text-[15px] leading-[1.5] text-slate-600 sm:text-[16px]">
                        {body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="pt-2 flex justify-center sm:justify-start">
              <CtaLink color="navy" href="https://app.enabledtalent.com/signup">Find your next job</CtaLink>
            </div>
          </div>

          <div className="relative hidden justify-end sm:flex lg:-translate-y-16">
            <div className="relative h-[260px] w-full max-w-[620px] overflow-visible sm:h-[430px] lg:h-[500px]">
              <Image
                src="/images/africa/Group 1171276411.png"
                alt="What you get feature collage"
                fill
                className="object-contain object-center scale-[1.02] sm:scale-[1.08]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-12 lg:mb-16">
            <h2 className="mb-3 px-4 text-3xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[3.1rem]">
              Why Employers Choose Us
            </h2>
            <p className="mx-auto max-w-4xl px-4 text-base leading-7 text-slate-600 sm:text-lg lg:text-[1.2rem]">
              Hire Africa&apos;s Best Talent. Build Stronger Teams.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>A trusted way to connect with
              skilled and motivated candidates.
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {employerItems.map((item, index) => (
                <article
                  key={`${item.region}-${index}`}
                  className={`flex flex-col rounded-[32px] ${item.bgColor} p-4 shadow-sm`}
                >
                  <div className="relative mb-4 h-32 overflow-hidden rounded-3xl sm:h-36 lg:h-40">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex flex-grow flex-col">
                    <h3 className="text-[1.2rem] font-bold leading-tight text-slate-900 sm:text-[1.35rem]">
                      {item.stats}
                    </h3>

                    <p className="mt-2 text-[0.9rem] leading-6 text-slate-700">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="about-us"
        className="bg-white px-4 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-24">
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 shadow-sm">
              About Enabled Africa
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]">
                Building access to
              </h2>
              <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]">
                <span className="bg-gradient-to-r from-[#d85b3b] via-[#e19a45] to-[#e8c26c] bg-clip-text text-transparent">
                  opportunity across Africa.
                </span>
              </p>
            </div>
          </div>

          <div className="relative space-y-12">
            <div className="pointer-events-none absolute left-1/2 top-6 hidden h-[calc(100%-12px)] w-px -translate-x-1/2 bg-gradient-to-b from-[#e1a65a] via-[#f0c27b] to-[#e1a65a] opacity-70 lg:block" />

            {[
              {
                title: "About Enabled Africa",
                body: [
                  "Ability is everywhere. Opportunity should be too.",
                  "EnabledAfrica is building a continent-wide platform that connects people with opportunities and helps organizations grow stronger through talent.",
                ],
                image: "/images/africa/Group 1171276405.png",
                alt: "Enabled Africa team portrait",
              },
              {
                title: "Our Vision",
                body: [
                  "An Africa where everyone regardless of background, gender, age, or ability has the chance to build a meaningful career and contribute to their community.",
                ],
                image: "/images/africa/Subtract.png",
                alt: "Enabled Africa vision",
              },
              {
                title: "Our Mission",
                body: [
                  "To unlock Africa's full potential by making access to work, skills, and growth opportunities simple, fair, and inclusive for all.",
                ],
                image: "/images/africa/Group 1171276409.png",
                alt: "Enabled Africa mission",
              },
            ].map((item, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={item.title}
                  className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
                >
                  <div
                    className="pointer-events-none absolute left-1/2 top-[30%] z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                  >
                    <Image
                      src="/images/academy/how-works/circle checkpoint.png"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>

                  <div className={`flex justify-center ${isEven ? "lg:order-2" : ""}`}>
                    <div className="relative w-full max-w-[420px]">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={520}
                        height={520}
                        className="h-auto w-full max-h-[520px] rounded-[18px] object-cover"
                        priority={idx === 0}
                      />
                    </div>
                  </div>

                  <div
                    className={`space-y-4 text-center sm:text-left ${isEven ? "lg:order-1 lg:text-right" : ""}`}
                  >
                    <h3 className="text-[32px] font-bold text-slate-900">{item.title}</h3>
                    <div
                      className={`space-y-3 text-base leading-7 text-slate-700 sm:text-lg ${isEven ? "lg:text-right" : ""}`}
                    >
                      {item.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
