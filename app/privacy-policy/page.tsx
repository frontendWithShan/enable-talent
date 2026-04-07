import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalContent, { buildLegalContent } from "@/components/legal/LegalContent";
import { privacyPolicyText } from "@/components/legal/legal-content";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Privacy Policy | Enabled Talent",
  description: "Enabled Talent privacy policy and AI transparency notice.",
};

export default function PrivacyPolicyPage() {
  const { tocItems } = buildLegalContent(privacyPolicyText);
  const tocItemsWithSections = [
    ...tocItems,
    { id: "section-2", label: "Section 2: AI Transparency Notice" },
    { id: "section-3", label: "Section 3: Regulatory Readiness Memorandum" },
  ];

  return (
    <LegalLayout
      title="Privacy Policy"
      activeHref="/privacy-policy"
      effectiveDate="January 27, 2026"
      tocItems={tocItemsWithSections}
      hideHero
    >
      <ScrollToTop />
      <LegalContent text={privacyPolicyText} />
    </LegalLayout>
  );
}
