"use client";

import { useState } from "react";
import VolunteerForm from "@/components/about/VolunteerForm";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutOurStorySection from "@/components/about/AboutOurStorySection";
import AboutThreeColumnSection from "@/components/about/AboutThreeColumnSection";
import AboutFoundingSection from "@/components/about/AboutFoundingSection";
import AboutQuoteStatsSection from "@/components/about/AboutQuoteStatsSection";
import AboutEmploymentGapsSection from "@/components/about/AboutEmploymentGapsSection";
import AboutTeamSection from "@/components/about/AboutTeamSection";
import AboutBoardAdvisorySection from "@/components/about/AboutBoardAdvisorySection";
import AboutVolunteerSection from "@/components/about/AboutVolunteerSection";
import AboutJoinMissionSection from "@/components/about/AboutJoinMissionSection";
import AboutFinalCtaSection from "@/components/about/AboutFinalCtaSection";

export default function AboutUsPage() {
  const [isVolunteerFormOpen, setIsVolunteerFormOpen] = useState(false);

  const handleOpenVolunteerForm = () => {
    setIsVolunteerFormOpen(true);
  };

  const handleCloseVolunteerForm = () => {
    setIsVolunteerFormOpen(false);
  };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-hidden">
      <AboutHeroSection />
      <AboutOurStorySection />
      <AboutThreeColumnSection />
      <AboutFoundingSection />
      <AboutQuoteStatsSection />
      <AboutEmploymentGapsSection />
      <AboutTeamSection />
      <AboutBoardAdvisorySection />
      <AboutVolunteerSection onOpenVolunteerForm={handleOpenVolunteerForm} />
      <AboutJoinMissionSection />
      <AboutFinalCtaSection />
      <VolunteerForm isOpen={isVolunteerFormOpen} onClose={handleCloseVolunteerForm} />
    </main>
  );
}
