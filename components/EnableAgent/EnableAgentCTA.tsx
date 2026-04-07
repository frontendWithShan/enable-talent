"use client";

import Image from "next/image";
import { JSX, useState } from "react";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";
import etLogo from "@/public/images/EmployerAgent/EnableAgentLogo.svg";

export default function EnableAgentCTA(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  const handleButtonClick = (title: string, description: string) => {
    setModalContent({ title, description });
    setIsModalOpen(true);
  };

  return (
    <section
      aria-labelledby="enable-agent-cta-heading"
      aria-describedby="enable-agent-cta-copy"
      className="bg-[#1B2130] py-20 sm:py-24"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <figure
          className="flex items-center justify-center"
          aria-label="Enable Talent"
        >
          <Image
            src={etLogo}
            alt="Enable Talent logo"
            className="h-20 w-auto"
            priority
          />
        </figure>

        <header className="mt-8">
          <h2
            id="employers-cta-heading"
            className="text-4xl font-bold leading-tight  text-gradient-warm sm:text-5xl"
          >
            Ready to Hire Smarter<br/>
            <span className="text-white">
              
              With Just One Message?
            </span>
            
          </h2>
        </header>

        

        <nav
          aria-label="Employer calls to action"
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
        >
          <FancyButton
            label="Try Enable Agent"
            color="orange"
            className="text-black"
            onClick={() => handleButtonClick(
              'Try Enable Agent',
              "We're preparing the Enabled AI Agent platform for launch. Early access will be available soon - sign up to be notified!"
            )}
          />
          <FancyButton
            label="Talk to our Team"
            color="navy"
            className="text-white shadow-none bg-none bg-[#374151] hover:bg-[#4B5563] [&_span:last-child]:bg-transparent [&_span:last-child]:ring-1 [&_span:last-child]:ring-white/50 [&_span:last-child]:text-white"
            style={{ backgroundImage: "none", backgroundColor: "#374151" }}
            onClick={() => handleButtonClick(
              'Talk to Our Team',
              "We're setting up our team consultation system to provide you with personalized AI Agent demos. Team consultations will be available soon!"
            )}
          />
        </nav>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
      />
    </section>
  );
}
