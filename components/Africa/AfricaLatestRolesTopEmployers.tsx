"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FancyButtonNoIcon from "@/components/FancyButtonNoIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import peopleIcons from "@/public/images/latest-roles-top-employers/3 people icons together.svg";

// African Employer Logos
import mtnIcon from "@/public/images/africa/employers/mtn-icon.png";
import standardBankIcon from "@/public/images/africa/employers/standardbank-icon.png";
import safaricomIcon from "@/public/images/africa/employers/safaricom-icon.png";
import dangoteIcon from "@/public/images/africa/employers/dangote-icon.png";
import shopriteIcon from "@/public/images/africa/employers/shoprite-icon.png";
import flutterwaveIcon from "@/public/images/africa/employers/flutterwave-icon.png";

type AfricaJobPosting = {
  id: string;
  title: string;
  employer: string;
  location: string;
  salary: string;
};

export default function AfricaLatestRolesTopEmployers() {
  const [activeTab, setActiveTab] = useState<"latest-roles" | "top-employers">("latest-roles");
  const [startIndex, setStartIndex] = useState(0);

  const allRoles: AfricaJobPosting[] = useMemo(
    () => [
      { id: "job-af-1", title: "Senior Software Engineer", employer: "Flutterwave", location: "Nairobi, Kenya", salary: "$40,000 - $60,000 USD" },
      { id: "job-af-2", title: "Product Manager", employer: "Stanbic Bank", location: "Accra, Ghana", salary: "GHS 400,000 - 600,000" },
      { id: "job-af-3", title: "Data Analyst", employer: "Safaricom", location: "Nairobi, Kenya", salary: "KES 2,500,000 - 3,500,000" },
      { id: "job-af-4", title: "Supply Chain Director", employer: "Dangote Cement", location: "Tema, Ghana", salary: "$35,000 - $55,000 USD" },
      { id: "job-af-5", title: "Retail Operations Manager", employer: "Shoprite", location: "Mombasa, Kenya", salary: "KES 1,800,000 - 2,500,000" },
      { id: "job-af-6", title: "Network Architect", employer: "MTN Ghana", location: "Accra, Ghana", salary: "GHS 350,000 - 550,000" },
      { id: "job-af-7", title: "Marketing Director", employer: "Safaricom", location: "Kisumu, Kenya", salary: "KES 4,000,000 - 6,000,000" },
      { id: "job-af-8", title: "Cloud Infrastructure Engineer", employer: "AWS Africa", location: "Nairobi, Kenya", salary: "$50,000 - $70,000 USD" },
      { id: "job-af-9", title: "Investment Banking Analyst", employer: "Stanbic Bank", location: "Nairobi, Kenya", salary: "KES 3,000,000 - 4,500,000" },
      { id: "job-af-10", title: "UX/UI Designer", employer: "Flutterwave", location: "Accra, Ghana", salary: "$25,000 - $45,000 USD" },
      { id: "job-af-11", title: "Renewable Energy Consultant", employer: "M-KOPA", location: "Eldoret, Kenya", salary: "$30,000 - $45,000 USD" },
      { id: "job-af-12", title: "Cybersecurity Analyst", employer: "MTN Ghana", location: "Kumasi, Ghana", salary: "GHS 250,000 - 400,000" },
      { id: "job-af-13", title: "Mobile App Developer", employer: "Safaricom", location: "Nairobi, Kenya", salary: "KES 2,200,000 - 3,000,000" },
      { id: "job-af-14", title: "Logistics Operations Manager", employer: "Shoprite", location: "Accra, Ghana", salary: "GHS 200,000 - 350,000" },
      { id: "job-af-15", title: "Senior Financial Analyst", employer: "Stanbic Bank", location: "Takoradi, Ghana", salary: "GHS 300,000 - 450,000" },
      { id: "job-af-16", title: "Content Strategy Lead", employer: "Safaricom", location: "Nairobi, Kenya", salary: "KES 2,200,000 - 3,000,000" },
      { id: "job-af-17", title: "Business Development Executive", employer: "Flutterwave", location: "Mombasa, Kenya", salary: "$30,000 - $50,000 USD" },
      { id: "job-af-18", title: "Health Tech Product Manager", employer: "mPharma", location: "Accra, Ghana", salary: "$40,000 - $60,000 USD" },
      { id: "job-af-19", title: "Backend Engineer", employer: "MTN Ghana", location: "Tema, Ghana", salary: "GHS 350,000 - 500,000" },
      { id: "job-af-20", title: "Technical Account Manager", employer: "Microsoft Africa", location: "Nairobi, Kenya", salary: "KES 4,500,000 - 6,000,000" },
      { id: "job-af-21", title: "ESG Sustainability Lead", employer: "Dangote Cement", location: "Takoradi, Ghana", salary: "GHS 400,000 - 600,000" },
      { id: "job-af-22", title: "Growth Marketing Manager", employer: "M-KOPA", location: "Kisumu, Kenya", salary: "$35,000 - $50,000 USD" },
      { id: "job-af-23", title: "AI Research Scientist", employer: "Google Research", location: "Accra, Ghana", salary: "$80,000 - $120,000 USD" },
      { id: "job-af-24", title: "Agritech Data Scientist", employer: "Twiga Foods", location: "Nairobi, Kenya", salary: "KES 3,000,000 - 4,500,000" },
    ],
    [],
  );

  const topEmployers = useMemo(
    () => [
      { company: "MTN Ghana", location: "Ghana", openings: "45 Current Job Openings", icon: mtnIcon },
      { company: "Stanbic Bank", location: "Kenya & Ghana", openings: "32 Current Job Openings", icon: standardBankIcon },
      { company: "Safaricom", location: "Kenya", openings: "28 Current Job Openings", icon: safaricomIcon },
      { company: "Dangote Cement", location: "Ghana", openings: "18 Current Job Openings", icon: dangoteIcon },
      { company: "Shoprite", location: "Kenya & Ghana", openings: "56 Current Job Openings", icon: shopriteIcon },
      { company: "Flutterwave", location: "Kenya & Ghana", openings: "24 Current Job Openings", icon: flutterwaveIcon },
    ],
    [],
  );

  const isLatestRoles = activeTab === "latest-roles";

  const latestRoles = useMemo(() => {
    const total = allRoles.length;
    if (total === 0) return [];
    const visibleCount = Math.min(6, total);

    return Array.from({ length: visibleCount }, (_, index) => {
      return allRoles[(startIndex + index) % total];
    });
  }, [allRoles, startIndex]);

  const handlePrev = () => {
    if (!isLatestRoles || allRoles.length === 0) return;
    setStartIndex((prev) => {
      const total = allRoles.length;
      return (prev - 6 + total) % total;
    });
  };

  const handleNext = () => {
    if (!isLatestRoles || allRoles.length === 0) return;
    setStartIndex((prev) => {
      const total = allRoles.length;
      return (prev + 6) % total;
    });
  };

  return (
    <section
      aria-labelledby="africa-roles-heading"
      className="bg-white py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <h2 id="africa-roles-heading" className="sr-only">
          Latest Africa roles and top employers
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              aria-pressed={isLatestRoles}
              className="group inline-block"
              onClick={() => setActiveTab("latest-roles")}
            >
              <FancyButtonNoIcon
                label="Latest Roles"
                color="orange"
                borderRadius="full"
                className={
                  isLatestRoles
                    ? "px-5 py-2 text-xs sm:text-sm shadow-[0_6px_16px_rgba(0,0,0,0.15)] ring-2 ring-slate-900 ring-offset-1"
                    : "bg-white px-5 py-2 text-xs text-slate-900 shadow-none sm:text-sm from-white to-white"
                }
              />
            </button>

            <button
              type="button"
              aria-pressed={!isLatestRoles}
              className="group inline-block"
              onClick={() => setActiveTab("top-employers")}
            >
              <FancyButtonNoIcon
                label="Top Employers"
                color="orange"
                borderRadius="full"
                className={
                  isLatestRoles
                    ? "bg-white px-5 py-2 text-xs text-slate-900 shadow-none sm:text-sm from-white to-white"
                    : "px-5 py-2 text-xs sm:text-sm shadow-[0_6px_16px_rgba(0,0,0,0.15)] ring-2 ring-slate-900 ring-offset-1"
                }
              />
            </button>
          </div>

          <div className="mr-2 flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous roles"
              onClick={handlePrev}
              disabled={allRoles.length === 0}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next roles"
              onClick={handleNext}
              disabled={allRoles.length === 0}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLatestRoles
            ? latestRoles.map((role) => (
                <article
                  key={role.id}
                  className="flex min-h-[220px] flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                >
                  <h3 className="text-lg font-bold text-slate-800">
                    {role.title}
                  </h3>
                  {role.employer && (
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {role.employer}
                    </p>
                  )}
                  {role.location && (
                    <p className="mt-0.5 text-sm font-medium text-slate-400">
                      {role.location}
                    </p>
                  )}
                  {role.salary && (
                    <p className="mt-1 text-sm font-medium text-slate-400">
                      {role.salary}
                    </p>
                  )}

                  <div className="mt-auto">
                    <div className="my-6 h-px w-full bg-slate-100/80" />

                    <div className="flex items-center justify-between gap-3">
                      <Image
                        src={peopleIcons}
                        alt="Recently hired candidates"
                        width={72}
                        height={28}
                        className="h-7 w-auto select-none opacity-90"
                        draggable={false}
                      />
                      <Link
                        href="https://app.enabledtalent.com/login-talent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap text-sm font-bold text-[#8C4A0E] transition hover:text-[#6F390B]"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            : topEmployers.map((employer) => (
                <article
                  key={employer.company}
                  className="flex min-h-[220px] flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={employer.icon}
                      alt={`${employer.company} logo`}
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded object-contain"
                      draggable={false}
                    />
                    <h3 className="text-lg font-bold text-slate-800">
                      {employer.company}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    {employer.location}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-400">
                    {employer.openings}
                  </p>

                  <div className="mt-auto">
                    <div className="my-6 h-px w-full bg-slate-100/80" />

                    <div className="flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="text-transparent text-xs"
                      >
                        Spacer
                      </span>
                      <Link
                        href="https://app.enabledtalent.com/login-talent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap text-sm font-bold text-[#8C4A0E] transition hover:text-[#6F390B]"
                      >
                        See more
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
