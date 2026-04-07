import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalContent, { buildLegalContent } from "@/components/legal/LegalContent";
import { accessibilityPolicyText } from "@/components/legal/legal-content";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Accessibility Policy | Enabled Talent",
  description: "Enabled Talent accessibility policy and statement.",
};

export default function AccessibilityPolicyPage() {
  const { tocItems } = buildLegalContent(accessibilityPolicyText);

  return (
    <LegalLayout
      title="Accessibility Policy"
      activeHref="/accessibility-policy"
      effectiveDate="January 27, 2026"
      tocItems={tocItems}
      hideHero
    >
      <ScrollToTop />
      <LegalContent text={accessibilityPolicyText} />
    </LegalLayout>
  );
}
