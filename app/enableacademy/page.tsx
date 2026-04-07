import AcademyHero from "../../components/academy/academy-hero";
import AcademyAbout from "../../components/academy/academy-about";
import AcademyTalentValue from "../../components/academy/academy-talent-value";
import AcademyWhoFor from "../../components/academy/academy-who-for";
import AcademySupportEmployers from "../../components/academy/academy-support-employers";
import AcademyRolesSupport from "../../components/academy/academy-roles-support";
import AcademyHowWorks from "../../components/academy/academy-how-works";
import AcademySuccessStories from "../../components/academy/academy-success-stories";
import ScrollToTop from "@/components/shared/ScrollToTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enabled Academy | Enabled Talent",
  description:
    "Learn about Enabled Academy programs that prepare talent and support employers with job-ready candidates.",
};

export default function Page() {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="academy-page">
        <ScrollToTop />
        <AcademyHero />
        <AcademyAbout />
        <AcademyTalentValue />
        <AcademyWhoFor />
        <AcademySupportEmployers />
        <AcademyRolesSupport />
        <AcademyHowWorks />
        <AcademySuccessStories />
      </main>
    </>
  );
}
