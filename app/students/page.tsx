import StudentsHero from "../../components/students/students-hero";
import MoreThanJobBoard from "../../components/students/more-than-job-board";
import StudentsFeaturesOverview from "../../components/students/features-overview";
import InternshipsSection from "../../components/students/internships-section";
import BuiltToBeSimple from "../../components/students/built-to-be-simple";
import GuidanceWhenItMatters from "../../components/students/guidance-when-it-matters";
import CareerCoachingHighlight from "../../components/students/career-coaching";
import GuidanceCareerCentres from "../../components/students/guidance-career-centres";
import HireWithConfidence from "../../components/students/hire-with-confidence";
import EventsAndSessions from "../../components/students/events-and-sessions";
import TargetedOutreach from "../../components/students/targeted-outreach";
import OnboardingRetention from "../../components/students/onboarding-retention";
import AccessibilitySection from "../../components/students/accessibility";
import LetsSupport from "../../components/students/lets-support";
import type { Metadata } from "next";
import DisableImageDrag from "../../components/DisableImageDrag";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Students | Enabled Talent",
  description:
    "Enabled Talent helps students find internships, early career roles, and supportive guidance.",
};

export default function Page() {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="students-page overflow-x-hidden">
        <ScrollToTop />
        <DisableImageDrag selector=".students-page" />
        <StudentsHero />
        <MoreThanJobBoard />
        <StudentsFeaturesOverview />
        <InternshipsSection />
        <BuiltToBeSimple />
        <GuidanceWhenItMatters />
        <CareerCoachingHighlight />
        <GuidanceCareerCentres />
        <HireWithConfidence />
        <EventsAndSessions />
        <TargetedOutreach />
        <OnboardingRetention />
        <AccessibilitySection />
        <LetsSupport />
      </main>
    </>
  );
}
