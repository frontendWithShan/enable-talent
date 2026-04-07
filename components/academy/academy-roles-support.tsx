import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const roles = [
  { label: "Customer Service & Call Centre", chip: "#f8e9c3", circle: "#f4c15d", check: "#c0412c" },
  { label: "HR & Recruitment", chip: "#d9e9f8", circle: "#3b6ca8", check: "#ffffff" },
  { label: "Administrative & Office Support", chip: "#f8e9c3", circle: "#f4c15d", check: "#c0412c" },
  { label: "Operations & Logistics", chip: "#d9e9f8", circle: "#3b6ca8", check: "#ffffff" },
  { label: "Data & Digital Roles", chip: "#e2e6ee", circle: "#4b5563", check: "#ffffff" },
  { label: "Sales & Retail", chip: "#f8e9c3", circle: "#f4c15d", check: "#c0412c" },
  { label: "Business Analyst & Project Coordinator", chip: "#e2e6ee", circle: "#4b5563", check: "#ffffff" },
  { label: "Marketing & Social Media", chip: "#f8e9c3", circle: "#f4c15d", check: "#c0412c" },
  { label: "Software & Technical Roles", chip: "#f8e9c3", circle: "#f4c15d", check: "#c0412c" },
  { label: "IT Support", chip: "#d9e9f8", circle: "#3b6ca8", check: "#ffffff" },
];

export default function AcademyRolesSupport() {
  return (
    <section
      aria-labelledby="academy-roles-support-title"
      className={`${plusJakartaSans.className} bg-gradient-to-r from-[#fff7eb] via-[#fffaf2] to-[#fff7eb] px-4 py-16 sm:py-20 lg:py-24`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <h2
          id="academy-roles-support-title"
          className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[56px]"
        >
          We Support{" "}
          <span className="bg-gradient-to-r from-[#d85b3b] via-[#e19a45] to-[#e8c26c] bg-clip-text text-transparent">
            All Types of Roles
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-5xl">
          {roles.map((role) => (
            <span
              key={role.label}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm"
              style={{ backgroundColor: role.chip }}
            >
              <span
                className="inline-flex h-4 w-4 items-center justify-center rounded-full"
                style={{ backgroundColor: role.circle }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-3 w-3"
                >
                  <path
                    d="M5 10.5L8.5 14L15 6"
                    stroke={role.check}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                style={{
                  color: "rgba(18, 20, 29, 0.7)",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "-0.2px",
                  fontWeight: 600,
                }}
              >
                {role.label}
              </span>
            </span>
          ))}
        </div>

        <p className="text-lg font-semibold text-[#c05a2e] sm:text-xl">
          ...and more — we customize based on your staffing needs.
        </p>
      </div>
    </section>
  );
}
