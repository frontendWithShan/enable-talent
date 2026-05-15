import CareersHeroSection from "@/components/careers/CareersHeroSection";
import CareersListingsSection from "@/components/careers/CareersListingsSection";
import { mapJobRecordToPublicPosting } from "@/lib/careers/public";
import { listActiveJobs } from "@/lib/data/jobs";

export const revalidate = 300;

export default async function CareersPage() {
  let jobPostings: any[] = [];

  try {
    const jobs = await listActiveJobs();
    jobPostings = jobs.map(mapJobRecordToPublicPosting);
  } catch (error) {
    console.error("Error fetching careers:", error);
  }

  return (
    <main className="min-h-screen bg-gray-50" id="main-content" tabIndex={-1}>
      <CareersHeroSection jobPostings={jobPostings} />
      <CareersListingsSection jobPostings={jobPostings} />
    </main>
  );
}

