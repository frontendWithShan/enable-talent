"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";

const SHELLLESS_ADMIN_PATHS = new Set([
  "/admin/login",
  "/admin/forbidden",
  "/admin/accept-invite",
]);

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (SHELLLESS_ADMIN_PATHS.has(pathname)) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
