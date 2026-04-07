import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { JSX } from "react";
import LegalToc, { TocItem } from "@/components/legal/LegalToc";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const legalNavItems = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Accessibility Policy", href: "/accessibility-policy" },
  { label: "Responsible AI", href: "/responsible-ai" },
  { label: "Terms of Use", href: "/terms-of-use" },
];

interface LegalLayoutProps {
  title: string;
  activeHref: string;
  effectiveDate?: string;
  tocItems?: TocItem[];
  extraTocItems?: TocItem[];
  hideHero?: boolean;
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  activeHref,
  effectiveDate,
  tocItems = [],
  extraTocItems = [],
  hideHero = false,
  children,
}: LegalLayoutProps): JSX.Element {
  const PageTitle = hideHero ? "h1" : "h2";

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-slate-900">
      {!hideHero ? (
        <section className="bg-[#FDF6E8]">
          <div className="mx-auto flex w-full max-w-360 items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            <h1
              className={`${plusJakartaSans.className} text-center text-[82px] font-extrabold leading-none tracking-tight text-slate-900`}
            >
              Legal
            </h1>
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-360 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)_200px] lg:gap-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {tocItems.length ? <LegalToc items={tocItems} /> : null}
            {extraTocItems.length ? (
              <div className="mt-8">
                <LegalToc items={extraTocItems} />
              </div>
            ) : null}
          </aside>

          <article className="min-w-0">
            <header className="-mt-4 mb-6">
              <PageTitle className="text-[55px] font-semibold leading-tight text-slate-900">
                {title}
              </PageTitle>
              {effectiveDate ? (
                <p className="mt-6 text-[18px] font-semibold text-slate-700">
                  Effective Date: {effectiveDate}
                </p>
              ) : null}
            </header>
            <div className={plusJakartaSans.className}>{children}</div>
          </article>

          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Policy navigation" className="text-right">
              <ul className="space-y-3 text-sm text-slate-600">
                {legalNavItems.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={
                          isActive
                            ? "font-semibold text-slate-900"
                            : "text-slate-600 hover:text-slate-900"
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </section>
    </main>
  );
}
