import AwardsHero from "../../components/awards/awards-hero";
import AwardsOverview from "../../components/awards/awards-overview";
import AwardsCategories from "../../components/awards/awards-categories";
import NominationProcess from "../../components/awards/nomination-process";
import WhyItMatters from "../../components/awards/why-it-matters";
import AwardsWhoWeSupport from "../../components/awards/who-we-support";
import ScrollToTop from "@/components/shared/ScrollToTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs & Awards | Enabled Talent",
  description:
    "Explore the Enabled Talent Awards and programs celebrating inclusive, barrier-free workplaces.",
};

export default function Page() {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="awards-page">
        <ScrollToTop />
        <AwardsHero />
        <AwardsOverview />
        <AwardsCategories />
        <NominationProcess />
        <WhyItMatters />
        <AwardsWhoWeSupport />
      </main>
    </>
  );
}
