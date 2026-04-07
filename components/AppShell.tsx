"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import FooterGate from "@/components/FooterGate";
import Header from "@/components/HomePage/Header";
import RouteChangeFocus from "@/components/RouteChangeFocus";
import ScrollToTop from "@/components/shared/ScrollToTop";

type AppShellProps = {
  children: ReactNode;
};

const STANDALONE_PATHS = new Set(["/role-selection"]);

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
  const isStandalonePage = isAdminPath || STANDALONE_PATHS.has(pathname);

  return (
    <>
      {isStandalonePage ? null : <Header />}
      <RouteChangeFocus />
      <ScrollToTop />
      {children}
      {isStandalonePage ? null : <FooterGate />}
    </>
  );
}
