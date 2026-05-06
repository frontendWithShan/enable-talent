import { requireAdminAccess } from "@/lib/auth/admin";

import { AccountChangePasswordClient } from "./AccountChangePasswordClient";

export default async function AccountPage() {
  const viewer = await requireAdminAccess("/admin/account");

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          Account settings
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage your password and account information.
        </p>
      </header>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Change password
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Choose a strong password you don&apos;t use elsewhere. Signed in as{" "}
            <span className="font-medium text-slate-900">{viewer.email}</span>.
          </p>
        </div>

        <AccountChangePasswordClient email={viewer.email} />
      </section>
    </div>
  );
}
