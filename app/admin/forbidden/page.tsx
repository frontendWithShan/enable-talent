"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { getAdminHomePath, type AdminViewer } from "@/lib/auth/roles";
import { getAdminViewerWithClient } from "@/lib/auth/viewer";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

function AdminForbiddenPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromPath = searchParams.get("from");
  const [viewer, setViewer] = useState<AdminViewer | null>(null);

  useEffect(() => {
    async function loadViewer() {
      try {
        const supabase = createBrowserSupabaseClient();
        const nextViewer = await getAdminViewerWithClient(supabase);
        setViewer(nextViewer);
      } catch (error) {
        console.error("Failed to load admin viewer:", error);
        setViewer(null);
      }
    }

    void loadViewer();
  }, []);

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12"
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-700 bg-amber-50">
          <svg
            aria-hidden="true"
            className="h-8 w-8 text-amber-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-950">
          Access restricted
        </h1>
        <p className="mt-3 text-center text-sm leading-6 text-slate-700">
          You are signed in, but your current role does not allow access to this
          admin section.
        </p>
        {fromPath ? (
          <p className="mt-2 text-center text-sm font-medium text-slate-900">
            Requested section: {fromPath}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {viewer ? (
            <Link
              href={getAdminHomePath(viewer.role)}
              className="inline-flex flex-1 items-center justify-center rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Go to allowed admin area
            </Link>
          ) : (
            <Link
              href="/admin/login"
              className="inline-flex flex-1 items-center justify-center rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Return to sign in
            </Link>
          )}

          <Link
            href="/"
            className="inline-flex flex-1 items-center justify-center rounded-md border border-slate-400 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
          >
            Back to website
          </Link>
        </div>

        {viewer ? (
          <div className="mt-4">
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex w-full items-center justify-center rounded-md border border-slate-400 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}

function AdminForbiddenFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-base font-semibold text-slate-900">Loading access status</p>
        <p className="mt-2 text-sm text-slate-700">
          Checking the admin route you requested.
        </p>
      </div>
    </main>
  );
}

export default function AdminForbiddenPage() {
  return (
    <Suspense fallback={<AdminForbiddenFallback />}>
      <AdminForbiddenPageContent />
    </Suspense>
  );
}
