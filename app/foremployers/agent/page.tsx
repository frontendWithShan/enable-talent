import EnableAgentBenefits from '@/components/EnableAgent/EnableAgentBenefits';
import EnableAgentCoreFeatures from '@/components/EnableAgent/EnableAgentCoreFeatures';
import EnableAgentCTA from '@/components/EnableAgent/EnableAgentCTA';
import EnableAgentHero from '@/components/EnableAgent/EnableAgentHero';
import EnableAgentHeroAbout from '@/components/EnableAgent/EnableAgentHeroAbout';
import EnableAgentHeroIntro from '@/components/EnableAgent/EnableAgentHeroIntro';
import EnableAgentHowItWork from '@/components/EnableAgent/EnableAgentHowItWork';
import EnableAgentSignatureFeature from '@/components/EnableAgent/EnableAgentSignatureFeature';
import { JSX } from 'react';
export default function EnableAgentPage(): JSX.Element {
  return (
    <main id="main-content" tabIndex={-1}>
      <EnableAgentHero />
      <EnableAgentHeroAbout />
      <EnableAgentHeroIntro />
      <EnableAgentHowItWork />
      <EnableAgentSignatureFeature />
      <EnableAgentCoreFeatures />
      <EnableAgentBenefits />
      <EnableAgentCTA />
    </main>
  );
}
