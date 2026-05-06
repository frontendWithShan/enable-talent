"use client";

import { useState } from "react";
import Link from "next/link";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type PageStatus = "idle" | "submitting" | "sent";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<PageStatus>("idle");

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen items-center justify-center bg-slate-50 px-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {status === "sent" ? (
          <div className="text-center">
            <div
              aria-hidden="true"
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
            >
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-base font-semibold text-slate-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              If an account exists for that email, we&apos;ve sent a password
              reset link. It expires in 1 hour.
            </p>
            <Link
              href="/admin/login"
              className="mt-4 inline-block text-sm font-medium text-slate-700 underline hover:text-slate-900"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold text-slate-900">
              Forgot your password?
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Enter your admin email and we&apos;ll send you a reset link.
            </p>

            <form
              onSubmit={async (event) => {
                event.preventDefault();
                setStatus("submitting");

                const supabase = createBrowserSupabaseClient();

                await supabase.auth.resetPasswordForEmail(email, {
                  redirectTo: `${window.location.origin}/admin/reset-password`,
                });

                setStatus("sent");
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  aria-required="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 w-full rounded-xl bg-slate-950 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link
                href="/admin/login"
                className="text-sm font-medium text-slate-700 underline hover:text-slate-900"
              >
                Back to sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
