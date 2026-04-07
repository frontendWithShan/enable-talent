"use client";

import { JSX, useState } from 'react';
import FancyButton from '../FancyButton';
import ComingSoonModal from '@/components/ComingSoonModal';
import DemoRequestModal from '@/components/DemoRequestModal';

export default function EnableAgentHero(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState(false);

  const handleButtonClick = (title: string, description: string) => {
    setModalContent({ title, description });
    setIsModalOpen(true);
  };

  return (
    <>
      <section
        aria-labelledby="for-talents-heading"
        className="pt-8 pb-10 sm:pt-12 sm:pb-14  "
      >
        <div className="mx-auto  max-w-360 px-4 sm:px-6 lg:px-8  ">
          <div className="relative w-full overflow-hidden rounded-3xl shadow-sm  talentHero  bg-cover bg-center bg-no-repeat">
            {/* Background image */}

            <div className="relative flex flex-col items-center justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16">

              <h1
                id="for-talents-heading"
                className="mt-10 mb-6 max-w-xl text-center text-2xl upper font-bold tracking-tight text-[#1A1A1A] sm:text-3xl md:text-4xl lg:text-[2.5rem]"
              >
              Hiring Made Simple.<br />
              Talent Made Visible.
              </h1>
              <p className="text-base  tracking-[0.16em] text-gray-600 mt-8 text-center">
                No more digging through hundreds of profiles.
            </p>
            <p className="text-base  tracking-[0.16em] text-gray-600 text-center">
              The Enabled AI Agent finds the best matches for you based on skills and support needs.</p>

              <div className="mt-8 flex flex-col sm:flex-row sm:gap-4 gap-3 mb-6">
                <FancyButton
                  label='Book a Demo'
                  onClick={() => setIsDemoRequestOpen(true)}
                />
                <FancyButton
                  label='Try for Free'
                  color='orange'
                  style={{
                    backgroundImage: "linear-gradient(90deg, #F97316, #EAB308)",
                  }}
                  onClick={() => handleButtonClick(
                    'Try Enable Agent',
                    "We're preparing the Enabled AI Agent platform for early access. Free trial will be available soon!"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
      />
      <DemoRequestModal
        isOpen={isDemoRequestOpen}
        onClose={() => setIsDemoRequestOpen(false)}
        source="foremployers-agent-hero-book-demo"
        title="Book a Demo"
      />
    </>
  );
}
