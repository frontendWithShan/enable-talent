"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type PageState =
  | "loading"       // reading hash, establishing session
  | "set_password"  // session ready, show password form
  | "success"       // password set, redirecting
  | "error";        // invalid/expired token or other error

export default function AcceptInvitePage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const sessionEstablished = useRef(false);

  useEffect(() => {
    if (sessionEstablished.current) return;
    sessionEstablished.current = true;

    const supabase = createBrowserSupabaseClient();

    // Supabase JS automatically parses the hash fragment and fires
    // SIGNED_IN when it finds a valid access_token.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setPageState("set_password");
      } else if (event === "TOKEN_REFRESHED" && session) {
        setPageState("set_password");
      }
    });

    // Also check if there's already a session (e.g. page reloaded after hash cleared)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setPageState("set_password");
      } else if (!window.location.hash.includes("access_token")) {
        // No token in hash and no session — invalid landing
        setErrorMessage(
          "This invite link is invalid or has already been used. Ask your admin to send a new invitation.",
        );
        setPageState("error");
      }
      // else: hash present, wait for onAuthStateChange to fire
    });

    // Timeout fallback — if nothing fires after 6s, show error
    const timeout = setTimeout(() => {
      setPageState((current) => {
        if (current === "loading") {
          setErrorMessage(
            "The invite link timed out. It may have expired. Ask your admin to send a new invitation.",
          );
          return "error";
        }
        return current;
      });
    }, 6000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSetPassword(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldError("");

    if (password.length < 8) {
      setFieldError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setFieldError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setFieldError(error.message);
      setIsSubmitting(false);
      return;
    }

    setPageState("success");
    setTimeout(() => router.replace("/admin"), 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold tracking-tight text-slate-950">
            Enabled Talent
          </p>
          <p className="mt-1 text-sm text-slate-500">Admin Portal</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Loading */}
          {pageState === "loading" && (
            <div className="text-center">
              <div
                aria-hidden="true"
                className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900"
              />
              <p className="mt-4 text-base font-semibold text-slate-900">
                Verifying your invitation...
              </p>
              <p className="mt-1 text-sm text-slate-500">Just a moment.</p>
            </div>
          )}

          {/* Set password form */}
          {pageState === "set_password" && (
            <>
              <h1 className="text-xl font-bold text-slate-900">
                Set your password
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Your invite has been accepted. Choose a strong password to
                secure your admin account.
              </p>

              <form onSubmit={handleSetPassword} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    New password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    autoFocus
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>

                {fieldError && (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {fieldError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl bg-slate-950 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Setting password..." : "Set password & sign in"}
                </button>
              </form>
            </>
          )}

          {/* Success */}
          {pageState === "success" && (
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
              <p className="mt-4 text-base font-semibold text-slate-900">
                Password set!
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Redirecting you to the admin portal...
              </p>
            </div>
          )}

          {/* Error */}
          {pageState === "error" && (
            <div className="text-center">
              <div
                aria-hidden="true"
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
              >
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="mt-4 text-base font-semibold text-slate-900">
                Invite link invalid
              </p>
              <p className="mt-2 text-sm text-slate-600">{errorMessage}</p>
              <a
                href="/admin/login"
                className="mt-4 inline-block text-sm font-medium text-slate-700 underline hover:text-slate-900"
              >
                Go to login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
