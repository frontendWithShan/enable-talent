"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  formatAdminRoleLabel,
  getAdminHomePath,
  getAllowedAdminNavItems,
  type AdminViewer,
} from "@/lib/auth/roles";
import { getAdminViewerWithClient } from "@/lib/auth/viewer";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type AdminViewerContextValue = {
  isLoading: boolean;
  refreshViewer: () => Promise<void>;
  signOut: () => Promise<void>;
  viewer: AdminViewer;
};

const AdminViewerContext = createContext<AdminViewerContextValue | null>(null);

function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-white px-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div
          aria-hidden="true"
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"
        />
        <p className="mt-4 text-base font-semibold text-[#1e293b]">
          Loading admin session
        </p>
        <p className="mt-2 text-sm text-[#334155]">
          Checking your access and preparing the admin workspace.
        </p>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [viewer, setViewer] = useState<AdminViewer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshViewer = useCallback(async () => {
    setIsLoading(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const nextViewer = await getAdminViewerWithClient(supabase);

      if (!nextViewer) {
        setViewer(null);
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      setViewer(nextViewer);
    } catch (error) {
      console.error("Failed to load admin viewer:", error);
      setViewer(null);
      router.replace("/admin/forbidden");
    } finally {
      setIsLoading(false);
    }
  }, [pathname, router]);

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    setViewer(null);
    router.replace("/admin/login");
  }

  useEffect(() => {
    void refreshViewer();
  }, [refreshViewer]);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void refreshViewer();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshViewer]);

  if (isLoading || !viewer) {
    return <LoadingState />;
  }

  const navigation = getAllowedAdminNavItems(viewer.role);
  const homePath = getAdminHomePath(viewer.role);

  return (
    <AdminViewerContext.Provider
      value={{
        isLoading,
        refreshViewer,
        signOut: handleSignOut,
        viewer,
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-3 focus-visible:top-3 focus-visible:z-60 focus-visible:rounded-md focus-visible:bg-slate-950 focus-visible:px-4 focus-visible:py-2 focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-white text-slate-950">
        <header className="border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
              <Link
                href={homePath}
                className="rounded-sm text-lg font-semibold tracking-tight text-slate-950 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
              >
                Admin Portal
              </Link>

              <nav
                aria-label="Admin navigation"
                className="hidden items-center gap-2 md:flex"
              >
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      aria-current={isActive ? "page" : undefined}
                      href={item.href}
                      className={`rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2 ${
                        isActive
                          ? "border border-[#7c2d12] bg-[linear-gradient(90deg,#7c2d12_0%,#9a3412_100%)] text-white"
                          : "border border-transparent text-[#334155] hover:border-[#e2e8f0] hover:bg-[#f1f5f9]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-950">
                  {viewer.fullName}
                </p>
                <p className="text-xs font-medium text-slate-700">
                  {formatAdminRoleLabel(viewer.role)}
                </p>
              </div>

              <button
                onClick={handleSignOut}
                type="button"
                className="rounded-md border border-slate-950 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C27803] focus-visible:ring-offset-2"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-white md:hidden">
          <nav
            aria-label="Admin sections"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6 lg:px-8"
          >
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  aria-current={isActive ? "page" : undefined}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "border border-slate-950 bg-slate-950 text-white"
                      : "border border-transparent text-slate-800 hover:border-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <main id="main-content" tabIndex={-1} className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </AdminViewerContext.Provider>
  );
}

export function useAdminViewer() {
  const context = useContext(AdminViewerContext);

  if (!context) {
    throw new Error("useAdminViewer must be used within AdminShell.");
  }

  return context;
}
