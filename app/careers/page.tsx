import CareersHeroSection from "@/components/careers/CareersHeroSection";
import CareersListingsSection from "@/components/careers/CareersListingsSection";
import { mapJobRecordToPublicPosting } from "@/lib/careers/public";
import { listActiveJobs } from "@/lib/data/jobs";

export const revalidate = 300;

export default async function CareersPage() {
  const jobs = await listActiveJobs();
  const jobPostings = jobs.map(mapJobRecordToPublicPosting);

  return (
    <main className="min-h-screen bg-gray-50" id="main-content" tabIndex={-1}>
      <CareersHeroSection jobPostings={jobPostings} />
      <CareersListingsSection jobPostings={jobPostings} />
    </main>
  );
}
