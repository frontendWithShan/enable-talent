'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/NewHomePage/sections/Hero';
import TrustLogos from '@/components/NewHomePage/sections/TrustLogos';
import Solutions from '@/components/NewHomePage/sections/Solutions';
import HowItWorks from '@/components/NewHomePage/sections/HowItWorks';
import CTA from '@/components/NewHomePage/sections/CTA';
import TrustFoundation from '@/components/NewHomePage/sections/TrustFoundation';
import PartnersScroll from '@/components/NewHomePage/sections/PartnersScroll';
import FinalCTA from '@/components/NewHomePage/sections/FinalCTA';
import NewHomeNavbar from '@/components/NewHomePage/NewHomeNavbar';
import NewFooter from '@/components/NewHomePage/sections/NewFooter';
import ScrollButtons from '@/components/NewHomePage/ui/ScrollButtons';

export default function NewHomePage() {

  useEffect(() => {
    // Only scroll to top if there is no hash in the URL
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Global intersection observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-600 selection:bg-[#FFC82C]/30 selection:text-[#111827]">
      <NewHomeNavbar />

      <main id="main-content">
        <Hero />
        <TrustLogos />
        <Solutions />
        <HowItWorks />
        <PartnersScroll />
        <FinalCTA />
        <CTA />
        <TrustFoundation />
      </main>
      <NewFooter />
      <ScrollButtons />
    </div>
  );
}
