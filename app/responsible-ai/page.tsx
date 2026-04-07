import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalContent, { buildLegalContent } from "@/components/legal/LegalContent";
import { responsibleAiText } from "@/components/legal/legal-content";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Responsible AI | Enabled Talent",
  description: "Enabled Talent responsible AI and accessibility commitment.",
};

export default function ResponsibleAiPage() {
  const { tocItems } = buildLegalContent(responsibleAiText);

  return (
    <LegalLayout
      title="Responsible AI"
      activeHref="/responsible-ai"
      effectiveDate="January 27, 2026"
      tocItems={tocItems}
      hideHero
    >
      <ScrollToTop />
      <LegalContent text={responsibleAiText} />
    </LegalLayout>
  );
}
