import Link from "next/link";
import { notFound } from "next/navigation";

import CareerApplicationForm from "@/components/careers/CareerApplicationForm";
import CareerShareButton from "@/components/careers/CareerShareButton";
import Container from "@/components/layout/Container";
import { formatCareerTokenLabel } from "@/lib/careers/options";
import { mapJobRecordToPublicPosting } from "@/lib/careers/public";
import { getActiveJobBySlug } from "@/lib/data/jobs";

export const revalidate = 300;

type CareerDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPostedDate(value?: string | null) {
  if (!value) {
    return "Recently posted";
  }

  return new Date(value).toLocaleDateString("en-CA", {
    dateStyle: "medium",
  });
}

function formatDeadline(value?: string | null) {
  if (!value) {
    return "No deadline set";
  }

  return new Date(value).toLocaleDateString("en-CA", {
    dateStyle: "medium",
  });
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { slug } = await params;
  const jobRecord = await getActiveJobBySlug(slug);

  if (!jobRecord) {
    notFound();
  }

  const job = mapJobRecordToPublicPosting(jobRecord);
  const detailUrl = `/careers/${job.slug ?? job.id}`;

  return (
    <main className="min-h-screen bg-gray-50" id="main-content" tabIndex={-1}>
      <section className="bg-white px-4 py-8 sm:py-12">
        <Container className="max-w-[1240px]">
          <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-[#FFF0D2] to-[#FFE8BA] shadow-xl">
            <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center space-x-2 text-sm">
                  <li>
                    <Link
                      className="text-black/80 transition-colors hover:text-black focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                      href="/careers"
                    >
                      Careers
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-black/60">
                    /
                  </li>
                  <li className="truncate font-semibold text-black">{job.title}</li>
                </ol>
              </nav>

              <div className="max-w-4xl">
                <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm font-semibold text-black/80">
                        Open role
                      </span>
                      {job.workMode ? (
                        <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm font-semibold text-black/80">
                          {formatCareerTokenLabel(job.workMode)}
                        </span>
                      ) : null}
                    </div>

                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-black sm:text-4xl lg:text-5xl">
                      {job.title}
                    </h1>

                    {job.summary ? (
                      <p className="max-w-3xl text-base leading-7 text-black/80 sm:text-lg">
                        {job.summary}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-3">
                    <CareerShareButton title={job.title} url={detailUrl} />
                    <a
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFD071] to-[#EFB745] px-6 py-3 text-base font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#EFB745] focus:ring-offset-2"
                      href="#apply-for-role"
                    >
                      Apply for this role
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-2xl border border-black/5 bg-black/5 p-4">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-black/70">
                      Location
                    </div>
                    <div className="font-semibold text-black">
                      {job.location ?? "Location shared during hiring"}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-black/5 bg-black/5 p-4">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-black/70">
                      Type
                    </div>
                    <div className="font-semibold text-black">
                      {job.jobType ? formatCareerTokenLabel(job.jobType) : "Not set"}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-black/5 bg-black/5 p-4">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-black/70">
                      Experience
                    </div>
                    <div className="font-semibold text-black">
                      {job.experienceLevel
                        ? formatCareerTokenLabel(job.experienceLevel)
                        : "Not set"}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-black/5 bg-black/5 p-4">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-black/70">
                      Posted
                    </div>
                    <div className="font-semibold text-black">
                      {formatPostedDate(job.publishedAt ?? (job.createdAt as string))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <section className="lg:col-span-2">
              <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Role description
                </h2>

                <div
                  className="prose prose-gray max-w-none prose-headings:text-gray-950 prose-p:leading-7"
                  dangerouslySetInnerHTML={{
                    __html:
                      job.descriptionHtml ??
                      "<p>More information about this role will be shared soon.</p>",
                  }}
                />
              </div>
            </section>

            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {job.salaryRange ? (
                  <section className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                      Compensation
                    </h2>
                    <div className="flex items-center rounded-lg border border-green-200 bg-green-50 p-4">
                      <svg
                        aria-hidden="true"
                        className="mr-3 h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      <span className="font-semibold text-green-700">
                        {job.salaryRange}
                      </span>
                    </div>
                  </section>
                ) : null}

                <section className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Role details
                  </h2>
                  <dl className="space-y-4">
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-600">Position type</dt>
                      <dd className="font-medium text-right text-gray-900">
                        {job.jobType ? formatCareerTokenLabel(job.jobType) : "Not set"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-600">Work mode</dt>
                      <dd className="font-medium text-right text-gray-900">
                        {job.workMode ? formatCareerTokenLabel(job.workMode) : "Not set"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-600">Experience level</dt>
                      <dd className="font-medium text-right text-gray-900">
                        {job.experienceLevel
                          ? formatCareerTokenLabel(job.experienceLevel)
                          : "Not set"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-600">Location</dt>
                      <dd className="font-medium text-right text-gray-900">
                        {job.location ?? "Not set"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-600">Posted</dt>
                      <dd className="font-medium text-right text-gray-900">
                        {formatPostedDate(job.publishedAt ?? (job.createdAt as string))}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-600">Application deadline</dt>
                      <dd className="font-medium text-right text-gray-900">
                        {formatDeadline(job.applicationDeadline)}
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>
            </aside>
          </div>

          <CareerApplicationForm job={job} />
        </div>
      </Container>
    </main>
  );
}
