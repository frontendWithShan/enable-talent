"use client";

import { useState } from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type FormStatus = "idle" | "submitting" | "success";

interface AccountChangePasswordClientProps {
  email: string;
}

export function AccountChangePasswordClient({
  email,
}: AccountChangePasswordClientProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (newPassword.length < 8) {
          setErrorMessage("New password must be at least 8 characters.");
          return;
        }

        if (newPassword !== confirmPassword) {
          setErrorMessage("New passwords do not match.");
          return;
        }

        if (currentPassword === newPassword) {
          setErrorMessage(
            "New password must be different from your current password.",
          );
          return;
        }

        setStatus("submitting");

        const supabase = createBrowserSupabaseClient();

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: currentPassword,
        });

        if (signInError) {
          setErrorMessage("Current password is incorrect.");
          setStatus("idle");
          return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateError) {
          setErrorMessage(updateError.message);
          setStatus("idle");
          return;
        }

        const { error: signOutOthersError } = await supabase.auth.signOut({
          scope: "others",
        });

        if (signOutOthersError) {
          console.error(
            "Password updated but failed to sign out other sessions:",
            signOutOthersError,
          );
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setStatus("success");
      }}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="currentPassword"
          className="block text-sm font-medium text-slate-700"
        >
          Current password
        </label>
        <input
          id="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
        />
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-slate-700"
        >
          New password
        </label>
        <input
          id="newPassword"
          type="password"
          required
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 8 characters"
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-slate-700"
        >
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
        />
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      {status === "success" && (
        <p
          role="status"
          className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-800"
        >
          Password updated. Sessions on other devices have been signed out.
          You&apos;ll stay signed in here.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-slate-950 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
      >
        {isSubmitting ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
