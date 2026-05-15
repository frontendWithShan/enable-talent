import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { listPublishedPosts } from "@/lib/data/posts";
import { listActiveJobs } from "@/lib/data/jobs";

export default async function DemoPage() {
  const env = getSupabasePublicEnv();
  
  let blogsCount = 0;
  let blogsError = null;
  try {
    const blogs = await listPublishedPosts();
    blogsCount = blogs.length;
  } catch (e: any) {
    blogsError = e.message;
  }

  let jobsCount = 0;
  let jobsError = null;
  try {
    const jobs = await listActiveJobs();
    jobsCount = jobs.length;
  } catch (e: any) {
    jobsError = e.message;
  }

  const isPlaceholder = env.url.includes("placeholder-project");

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Supabase Connection Demo</h1>
      
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Environment Status</h2>
        <div className="space-y-2">
          <p><strong>URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{env.url}</code></p>
          <p><strong>Status:</strong> {isPlaceholder ? (
            <span className="text-yellow-600 font-bold">⚠️ Using Demo Placeholders</span>
          ) : (
            <span className="text-green-600 font-bold">✅ Custom URL Detected</span>
          )}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Blogs Data</h2>
          <p className="text-3xl font-bold text-blue-600">{blogsCount}</p>
          <p className="text-sm text-gray-500">Published posts found</p>
          {blogsError && <p className="text-red-500 mt-2 text-sm">Error: {blogsError}</p>}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Careers Data</h2>
          <p className="text-3xl font-bold text-green-600">{jobsCount}</p>
          <p className="text-sm text-gray-500">Active jobs found</p>
          {jobsError && <p className="text-red-500 mt-2 text-sm">Error: {jobsError}</p>}
        </div>
      </section>

      <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Build Stability Fix</h2>
        <p className="text-blue-800">
          The application is now configured to handle missing Supabase environment variables gracefully. 
          Instead of crashing the build, it will:
        </p>
        <ul className="list-disc list-inside mt-2 text-blue-800 space-y-1">
          <li>Use safe placeholder values for Supabase configuration.</li>
          <li>Log warnings instead of throwing errors during data fetching.</li>
          <li>Catch fetching errors in page components to ensure prerendering succeeds.</li>
        </ul>
      </section>
    </div>
  );
}
