import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const teamMembers = [
  {
    name: "Amandipp Singh",
    title: "Chief Executive Officer",
    image: "/images/about-us/team/Amandipp-ourTeam.png",
    bio:
      "Inclusive innovation leader with 12+ years building systems for accessibility, inclusion, and employment. Amandipp's lived experience and strategic vision drive our mission to unlock human potential at scale.",
  },
  {
    name: "Chitwan Mallhi",
    title: "Chief People Officer",
    image: "/images/about-us/team/female-in-red-outfit.png",
    bio:
      "7+ years in banking operations with expertise in HR and inclusive workforce development. Chitwan ensures our platform creates meaningful pathways for both talent and employers.",
  },
  {
    name: "Swathi Shekar",
    title: "Chief Operating Officer",
    image: "/images/about-us/team/Swathi_Shekar.jpg",
    bio:
      "10+ years in education, research, and stakeholder alignment for social impact. Swathi transforms vision into sustainable operations that scale.",
  },
  {
    name: "Jeby James",
    title: "Chief Technology Officer",
    image: "/images/about-us/team/Jeby_James.jpg",
    bio:
      "Tech architect behind scalable, AI-powered hiring systems. Previously at BReady and LilyHire, Jeby builds technology that puts human potential first.",
  },
];

export default function AboutTeamSection() {
  return (
    <section id="team" className="flex w-full flex-col items-center justify-center bg-white py-16 md:py-24">
      <h2
        className={`${plusJakartaSans.className} mb-2 text-center text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl`}
      >
        Our{" "}
        <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
          Team
        </span>
      </h2>
      <h3 className="mb-10 text-center text-xl font-semibold text-gray-700 md:text-2xl">Leadership</h3>
      <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 sm:px-6 md:flex-row md:px-2">
        {teamMembers.map((member) => (
          <div key={member.name} className="group relative h-[298px] w-[265px] cursor-pointer [perspective:1000px]">
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#FFD071]">
                  <Image src={member.image} alt={member.name} fill className="rounded-2xl object-cover" priority />
                </div>
              </div>
              <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl bg-[#FFD071] p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="max-w-full text-left text-slate-900">
                  <h4
                    className={`${plusJakartaSans.className} mb-3 text-lg font-extrabold leading-tight tracking-tight text-slate-900`}
                  >
                    {member.name}
                    <span className="mt-1 block text-sm font-medium text-gray-600">{member.title}</span>
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-700">{member.bio}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

