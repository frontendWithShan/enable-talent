import { JSX } from "react";
import EmployersHero from "@/components/Employers/EmployersHero";
import EmployersHowItWorks from "@/components/Employers/EmployersHowItWorks";
import EmployersChooseUs from "@/components/Employers/EmployersChooseUs";
import EmployersMatchScore from "@/components/Employers/EmployersMatchScore";
import EmployersSaveTime from "@/components/Employers/EmployersSaveTime";
import EmployersPricingTeaser from "@/components/Employers/EmployersPricingTeaser";
import EmployersCTA from "@/components/Employers/EmployersCTA";
export default function ProgramsAwardsPage(): JSX.Element {
  return (
    <main id="main-content" tabIndex={-1}>
      <EmployersHero />
      <EmployersHowItWorks />
      <EmployersChooseUs />
      <EmployersMatchScore />
      <EmployersSaveTime />

      <EmployersPricingTeaser />
      <EmployersCTA />
    </main>
  );
}
