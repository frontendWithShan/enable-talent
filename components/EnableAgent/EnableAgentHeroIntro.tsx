"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import agent from "@/public/images/EmployerAgent/AgentIntroImage.png";
import FancyButton from "../FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";

export default function EnableAgentHeroIntro(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  const handleButtonClick = (title: string, description: string) => {
    setModalContent({ title, description });
    setIsModalOpen(true);
  };

  return (
    <section
      aria-labelledby="agent-intro-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center rounded-full bg-[#F3F4F6] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1F2937]">
              Hero Introduction
            </span>

            <h2
              id="agent-intro-heading"
              className="text-4xl font-extrabold leading-[1.1]  text-[#D65A31] sm:text-5xl lg:text-6xl"
            >
              Your AI Recruiter.{" "}
              <span className="text-[#111827]">Finds the Right Talent From Just One Message.</span>
            </h2>

            <p className="max-w-2xl text-lg leading-relaxed text-[#6B7280] mb-6">
              Paste a job description or describe the role in simple English and
              Enabled Agent instantly finds, ranks, and explains the best
              candidates for you.
            </p>

            <div className="flex flex-col  gap-6 items-start ">
              <FancyButton
                label="Start With Your First Role"
                onClick={() => handleButtonClick(
                  'Start Your First Role',
                  "We're finalizing the Enabled AI Agent to help you find the perfect candidates. You'll be able to post your first role and see instant matches soon!"
                )}
              />
              <FancyButton
                label="See How It Works"
                color="orange"
                onClick={() => handleButtonClick(
                  'See How It Works',
                  "We're creating an interactive walkthrough to show you how Enabled AI Agent transforms hiring. Demo videos and tutorials will be available soon!"
                )}
              />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src={agent}
              width={700}
              height={900}
              alt="AI Recruiter Dashboard Mockup"
              className="h-auto w-full max-w-[560px]"
              sizes="(min-width: 1024px) 560px, 100vw"
              priority
            />
          </div>
        </div>
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
