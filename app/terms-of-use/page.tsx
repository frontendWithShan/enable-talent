import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalContent, { buildLegalContent } from "@/components/legal/LegalContent";
import { termsOfUseText } from "@/components/legal/legal-content";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Terms of Use | Enabled Talent",
  description: "Enabled Talent terms of use and platform service conditions.",
};

export default function TermsOfUsePage() {
  const { tocItems } = buildLegalContent(termsOfUseText);

  return (
    <LegalLayout
      title="Terms of Use"
      activeHref="/terms-of-use"
      effectiveDate="February 2026 - Last updated: February 2026"
      tocItems={tocItems}
      hideHero
    >
      <ScrollToTop />
      <LegalContent text={termsOfUseText} />
    </LegalLayout>
  );
}
