import Hero from "./Hero";
import LatestRolesTopEmployers from "./LatestRolesTopEmployers";

import SectionPartners from "./SectionPartners";
import SectionStatement from "./SectionStatement";
import SectionCTA from "./SectionCTA";
import SectionAbout from "./SectionAbout";
import SectionTechnology from "./SectionTechnology";
import SectionBlog from "./SectionBlog";
import EmployersForwardThinking from "../Employers/EmployersForwardThinking";
import { mapJobRecordToPublicPosting } from "@/lib/careers/public";
import { listActiveJobs } from "@/lib/data/jobs";
import type { JobPosting } from "@/components/careers/types";

export default async function HomePage() {
  let latestRoles: JobPosting[] = [];

  try {
    const jobs = await listActiveJobs();
    latestRoles = jobs.map(mapJobRecordToPublicPosting);
  } catch (error) {
    console.error("Unable to load latest roles for the home page:", error);
  }

  return (
    <>
      

      <Hero />

      <LatestRolesTopEmployers initialJobPostings={latestRoles} />

      <SectionPartners heading="Trusted Partners" tagline="Trusted by organizations building the future of work" />

      <SectionStatement />

      <SectionCTA />

      <SectionAbout />

      
      <SectionTechnology />

      <SectionBlog />
      
      <EmployersForwardThinking />

      

  
      
    </>
  );
}
