

export type AudienceId =
  | "employers"
  | "talents"
  | "educators"
  | "ngos"
  | "governments";

export type AudienceBenefit = {
  title: string;
  body: string;
};

export type AudienceConfig = {
  id: AudienceId;
  label: string;
  badge: string;
  headingHighlight: string;
  headingRest: string;
  description: string;
  benefits: AudienceBenefit[];
  footer: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
};

export const TECHNOLOGY_AUDIENCE_ORDER: AudienceId[] = [
  "talents",
  "employers",
  "educators",
  "ngos",
  "governments",
];

export const TECHNOLOGY_AUDIENCES: Record<AudienceId, AudienceConfig> = {
  employers: {
    id: "employers",
    label: "For Employers",
    badge: "How our partners are getting the benefits",
    headingHighlight: "Inclusive Hiring",
    headingRest: "into Your Edge",
    description:
      "AI-supported insights help you find candidates whose skills and strengths align with your roles, while keeping accessibility at the center.",
    benefits: [
      {
        title: "Better Matches, Faster",
        body: "Smart screening highlights candidates with the skills and accommodations your team needs.",
      },
      {
        title: "Expert Guidance Included",
        body: "Get support on inclusive job design, interviews, onboarding, and workplace adjustments.",
      },
      {
        title: "Network Advantage",
        body: "Your access grows as more organizations and institutions join the platform.",
      },
    ],
    footer:
      "Work with rigorously vetted professionals who bring diverse perspectives and adaptive thinking. From job design to onboarding, we guide you at every step.",
    ctaLabel: "Get Started",
    imageSrc: "/images/SectionTechnology/meeting.png", // put file in /public
    imageAlt: "Employer reviewing information on a tablet.",
  },
  talents: {
    id: "talents",
    label: "For Talents",
    badge: "How talents use our platform",
    headingHighlight: "Inclusive Careers",
    headingRest: "built around you",
    description:
      "Discover roles that fit your skills, access needs, and growth goals — with real people to support you along the way.",
    benefits: [
      {
        title: "Smarter Job Matches",
        body: "Share your skills and support needs; we highlight roles that match both.",
      },
      {
        title: "Skill-Building Support",
        body: "Access micro-courses, coaching, and interview prep tailored to your goals.",
      },
      
      {
        title: "Global Opportunities",
        body: "Connect with organizations around the world open to remote and flexible work.",
      },
    ],
    footer:
      "Turn your lived experience and skills into a career on your terms, with clear pathways and human support at key moments.",
    ctaLabel: "Explore Opportunities",
    imageSrc: "/images/SectionTechnology/people.png",
    imageAlt: "Job seeker using a laptop in a modern workspace.",
  },
  educators: {
    id: "educators",
    label: "For Educators",
    badge: "How our partners are getting the benefits",
    headingHighlight: "Accessible Learning",
    headingRest: "with real-world outcomes",
    description:
      "Connect your learners to inclusive employers, and track how skills translate into meaningful work.",
    benefits: [
      {
        title: "Industry-Aligned Paths",
        body: "Map your curriculum to the skills hiring partners are actively seeking.",
      },
      {
        title: "Inclusive Program Design",
        body: "Get guidance on accessible learning experiences and accommodations.",
      },
      
      {
        title: "Partner Network",
        body: "Co-create pathways with NGOs, employers, and governments on the platform.",
      },
    ],
    footer:
      "Bridge the gap between classroom and career with accessible, data-informed pathways for your learners.",
    ctaLabel: "Partner with Us",
    imageSrc: "/images/SectionTechnology/student.jpg",
    imageAlt: "Educator presenting to learners in a classroom.",
  },
  ngos: {
    id: "ngos",
    label: "For NGO's",
    badge: "How our partners are getting the benefits",
    headingHighlight: "Scalable Support",
    headingRest: "for the people you serve",
    description:
      "Give your participants tools to build skills, find work, and stay connected to local and global opportunities.",
    benefits: [
      {
        title: "Program-Friendly Tools",
        body: "Embed our platform into your existing coaching and case management.",
      },
      {
        title: "Accessible Resources",
        body: "Offer bite-sized learning and job search support in inclusive formats.",
      },
      
      {
        title: "Collaborative Ecosystem",
        body: "Work alongside governments, educators, and employers on shared pathways.",
      },
    ],
    footer:
      "Scale your impact without losing the human relationships at the heart of your work.",
    ctaLabel: "Explore NGO Solutions",
    imageSrc: "/images/SectionTechnology/volunteer.jpg",
    imageAlt: "NGO staff member meeting with a participant.",
  },
  governments: {
    id: "governments",
    label: "For Governments",
    badge: "How our partners are getting the benefits",
    headingHighlight: "Inclusive Growth",
    headingRest: "at policy scale",
    description:
      "Turn policy commitments into practical, trackable pathways from skills to sustainable employment.",
    benefits: [
      {
        title: "Policy-to-Practice",
        body: "Connect public programs with employers and NGOs on a single platform.",
      },
      {
        title: "Evidence-Based Planning",
        body: "Use real-time insights to refine supports and funding decisions.",
      },
      {
        title: "Accessible by Design",
        body: "Ensure workforce initiatives work for people with diverse abilities and needs.",
      },
    ],
    footer:
      "Create pathways that are fair, future-ready, and grounded in the lived experience of citizens and employers.",
    ctaLabel: "Talk to Our Team",
    imageSrc: "/images/SectionTechnology/startup.jpg",
    imageAlt: "Government professionals in a meeting.",
  },
};

export function getAudienceConfig(id: AudienceId): AudienceConfig {
  return TECHNOLOGY_AUDIENCES[id];
}

export function getAudienceTabs(): AudienceConfig[] {
  return TECHNOLOGY_AUDIENCE_ORDER.map((id) => TECHNOLOGY_AUDIENCES[id]);
}
