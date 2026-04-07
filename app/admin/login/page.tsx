"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { canAccessAdminPath, getAdminHomePath } from "@/lib/auth/roles";
import { getAdminViewerWithClient } from "@/lib/auth/viewer";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

function AdminLoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const viewer = await getAdminViewerWithClient(supabase);

      if (!viewer) {
        router.replace("/admin/forbidden");
        return;
      }

      const destination =
        nextPath && canAccessAdminPath(viewer.role, nextPath)
          ? nextPath
          : getAdminHomePath(viewer.role);

      router.replace(destination);
      router.refresh();
    } catch (error) {
      console.error("Admin sign-in failed:", error);
      setErrorMessage("Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col bg-slate-50"
    >
      <a
        href="#admin-login-form"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to sign-in form
      </a>

      <div className="absolute left-4 top-4 z-10">
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
        >
          <svg
            aria-hidden="true"
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Back to main page
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-slate-300 bg-slate-100">
              <svg
                aria-hidden="true"
                className="h-8 w-8 text-slate-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Admin sign in
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Sign in with your invited admin account to access the protected
              workspace.
            </p>
          </div>

          {errorMessage ? (
            <div
              aria-live="assertive"
              className="mt-6 rounded-md border border-red-700 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
              role="alert"
            >
              {errorMessage}
            </div>
          ) : null}

          <form
            id="admin-login-form"
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-semibold text-slate-900"
              >
                Email address
              </label>
              <input
                autoComplete="email"
                aria-required="true"
                className="block w-full rounded-md border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-semibold text-slate-900"
              >
                Password
              </label>
              <input
                autoComplete="current-password"
                aria-required="true"
                className="block w-full rounded-md border border-slate-400 bg-white px-4 py-3 text-slate-950 shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  checked={showPassword}
                  className="h-4 w-4 rounded border-slate-400 text-slate-950 focus:ring-slate-950"
                  onChange={(event) => setShowPassword(event.target.checked)}
                  type="checkbox"
                />
                Show password
              </label>
            </div>

            <button
              className="inline-flex w-full items-center justify-center rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-slate-700">
            Admin access is invitation-based and restricted to authorized staff.
          </p>
        </div>
      </div>
    </main>
  );
}

function AdminLoginFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-base font-semibold text-slate-900">Loading sign-in</p>
        <p className="mt-2 text-sm text-slate-700">
          Preparing the admin authentication flow.
        </p>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AdminLoginFallback />}>
      <AdminLoginPageContent />
    </Suspense>
  );
}
