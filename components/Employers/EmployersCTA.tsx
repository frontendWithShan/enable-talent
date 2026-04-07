"use client";

import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";
import etLogo from "@/public/logo/ET Logo-01.webp";

export default function EmployersCTA(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      aria-labelledby="employers-cta-heading"
      aria-describedby="employers-cta-copy"
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
            className="text-4xl font-bold leading-tight text-white sm:text-5xl"
          >
            Start Building Your
            <span className="bg-linear-to-r from-[#F97316] via-[#F97316] to-[#EAB308] bg-clip-text text-transparent">
              {" "}
              Talent Pipeline{" "}
            </span>
            Today
          </h2>
        </header>

        <p
          id="employers-cta-copy"
          className="mt-6  text-lg leading-[1.6] text-gray-400"
        >
          Continue to grow with AI-driven resumé optimization and personalized
          interview coaching.
        </p>
        <p className="mt-4 md:mt-0 text-lg leading-[1.6] text-gray-400">
          Connect with a community of peers who have navigated similar journeys
          for support and mentorship.
        </p>

        <nav
          aria-label="Employer calls to action"
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
        >
          <Link
            href="https://app.enabledtalent.com/signup-employer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <FancyButton
              label="Create Employer Profile"
              color="orange"
              className="text-black"
              as="span"
            />
          </Link>
          <FancyButton
            label="Talk to our Team"
            color="navy"
            className="text-white shadow-none bg-none bg-[#374151] hover:bg-[#4B5563] [&_span:last-child]:bg-transparent [&_span:last-child]:ring-1 [&_span:last-child]:ring-white/50 [&_span:last-child]:text-white"
            style={{ backgroundImage: "none", backgroundColor: "#374151" }}
            onClick={() => setIsModalOpen(true)}
          />
        </nav>
      </div>

      <ComingSoonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Talk to Our Team"
        description="We're setting up our team consultation system to provide you with personalized support. Team consultations will be available soon!"
      />
    </section>
  );
}
