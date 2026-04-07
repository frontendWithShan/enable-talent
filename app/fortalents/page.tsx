import { JSX } from "react";
import TalentSupport from "@/components/Talents/TalentSupport";
import TalentHero from "@/components/Talents/TalentHero";
import TalentWorks from "@/components/Talents/TalentWorks";
import TalentCTA from "@/components/Talents/TalentCTA";
import ScrollToTop from "@/components/shared/ScrollToTop";
// import SectionFooter from "@/components/SectionFooter";

export default function ForTalentsPage(): JSX.Element {
  return (
    <>
      <ScrollToTop />
      <main id="main-content" tabIndex={-1}>
        <TalentHero />
        <TalentSupport />
        <TalentWorks />
        <TalentCTA />
      </main>
    </>
  );
}
