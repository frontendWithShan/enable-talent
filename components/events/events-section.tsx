"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";

import FancyButton from "@/components/FancyButton";
import ComingSoonModal from "@/components/ComingSoonModal";

const events = [
  {
    title: "Creative Skills Workshop",
    host: "Hosted by Enabled Talent",
    date: "March 14, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Online",
    image: "/images/events/events section/woman in creative skills.png",
  },
  {
    title: "Creative Skills Workshop",
    host: "Hosted by Enabled Talent",
    date: "March 14, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Online",
    image: "/images/events/events section/woman in creative skills.png",
  },
];

export default function EventsSection() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedFilterIndex, setFocusedFilterIndex] = useState(0);
  const filterItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    workshops: true,
    networking: false,
    launch: false,
  });
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState("");

  const toggleFilter = (key: keyof typeof selectedFilters) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const focusFilterItem = (index: number) => {
    const clamped = Math.max(0, Math.min(index, filterItemRefs.current.length - 1));
    setFocusedFilterIndex(clamped);
    // Focus after state updates have applied tabIndex changes.
    requestAnimationFrame(() => filterItemRefs.current[clamped]?.focus());
  };

  useEffect(() => {
    if (!isDropdownOpen) return;
    focusFilterItem(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownOpen]);

  const handleFilterTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsDropdownOpen(true);
      requestAnimationFrame(() => {
        focusFilterItem(event.key === "ArrowUp" ? filterItemRefs.current.length - 1 : 0);
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsDropdownOpen((prev) => !prev);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsDropdownOpen(false);
    }
  };

  const handleFilterMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const count = filterItemRefs.current.length;
    if (!count) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusFilterItem((focusedFilterIndex + 1) % count);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusFilterItem(focusedFilterIndex <= 0 ? count - 1 : focusedFilterIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusFilterItem(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusFilterItem(count - 1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsDropdownOpen(false);
    }
  };

  const handleRegisterClick = (eventTitle: string) => {
    setSelectedEventTitle(eventTitle);
    setIsRegisterModalOpen(true);
  };

  return (
    <section
      aria-labelledby="events-section-title"
      className="relative bg-white py-16 sm:py-20"
    >
      

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <h2
            id="events-section-title"
            className="text-[56px] font-bold text-slate-800"
          >
            Events
          </h2>

          <div className="relative mt-6">
            <button
              type="button"
              className="flex items-center gap-3 rounded-full bg-[#2B3F5C] px-6 py-2.5 text-sm font-normal text-white shadow-[0_10px_22px_rgba(26,32,44,0.2)]"
              aria-expanded={isDropdownOpen}
              aria-controls="events-filter-dropdown"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              onKeyDown={handleFilterTriggerKeyDown}
              aria-haspopup="menu"
            >
              Pending
              <svg
                viewBox="0 0 20 12"
                aria-hidden="true"
                className="h-3.5 w-4 text-white"
              >
                <path
                  d="M2 2.2 10 10l8-7.8"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>

            {isDropdownOpen ? (
              <div
                id="events-filter-dropdown"
                role="menu"
                aria-label="Event filters"
                onKeyDown={handleFilterMenuKeyDown}
                className="absolute right-0 top-12 z-20 w-[280px]"
              >
                <div className="relative rounded-2xl shadow-[0_14px_40px_rgba(15,23,42,0.18)]">
                  <img
                    src="/images/events/events section/white block.jpeg"
                    alt=""
                    className="h-full w-full rounded-2xl object-cover"
                  />
                  <div className="absolute inset-0 p-4 text-sm text-slate-600">
                    <p className="text-xs text-slate-500">
                      Filter sales by Status
                    </p>
                    <div className="mt-3 space-y-3 font-medium text-slate-700">
                      <button
                        type="button"
                        role="menuitemcheckbox"
                        aria-checked={selectedFilters.workshops}
                        tabIndex={focusedFilterIndex === 0 ? 0 : -1}
                        ref={(el) => {
                          filterItemRefs.current[0] = el;
                        }}
                        className="flex w-full items-center gap-3 text-left"
                        onClick={() => toggleFilter("workshops")}
                      >
                        {selectedFilters.workshops ? (
                          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2563EB]">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 text-white"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M9.55 16.2 4.9 11.55l1.4-1.4 3.25 3.25 8.15-8.15 1.4 1.4-9.55 9.55Z"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="h-7 w-7 rounded-md border border-slate-300 bg-white" />
                        )}
                        <span>Workshops &amp; Training</span>
                      </button>
                      <button
                        type="button"
                        role="menuitemcheckbox"
                        aria-checked={selectedFilters.networking}
                        tabIndex={focusedFilterIndex === 1 ? 0 : -1}
                        ref={(el) => {
                          filterItemRefs.current[1] = el;
                        }}
                        className="flex w-full items-center gap-3 text-left"
                        onClick={() => toggleFilter("networking")}
                      >
                        {selectedFilters.networking ? (
                          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2563EB]">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 text-white"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M9.55 16.2 4.9 11.55l1.4-1.4 3.25 3.25 8.15-8.15 1.4 1.4-9.55 9.55Z"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="h-7 w-7 rounded-md border border-slate-300 bg-white" />
                        )}
                        <span>Networking &amp; Community</span>
                      </button>
                      <button
                        type="button"
                        role="menuitemcheckbox"
                        aria-checked={selectedFilters.launch}
                        tabIndex={focusedFilterIndex === 2 ? 0 : -1}
                        ref={(el) => {
                          filterItemRefs.current[2] = el;
                        }}
                        className="flex w-full items-center gap-3 text-left"
                        onClick={() => toggleFilter("launch")}
                      >
                        {selectedFilters.launch ? (
                          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2563EB]">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 text-white"
                              aria-hidden="true"
                            >
                              <path
                                fill="currentColor"
                                d="M9.55 16.2 4.9 11.55l1.4-1.4 3.25 3.25 8.15-8.15 1.4 1.4-9.55 9.55Z"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="h-7 w-7 rounded-md border border-slate-300 bg-white" />
                        )}
                        <span>Launch &amp; Expansion</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {events.map((event, index) => (
            <article
              key={`${event.title}-${index}`}
              className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)]"
            >
              <img
                src="/images/events/events section/white block.jpeg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="relative z-10">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-[240px] w-full rounded-[22px] object-cover"
                />

                <h3 className="mt-6 text-[36px] font-extrabold text-slate-900">
                  {event.title}
                </h3>
                <p className="mt-1 text-[20px] font-medium text-slate-500">
                  {event.host}
                </p>

                <div className="mt-5 space-y-3 text-[16px] text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 items-center justify-center">
                      <img
                        src="/images/events/events%20section/background%20for%20icons.svg"
                        alt=""
                        className="absolute inset-0 h-full w-full"
                      />
                      <img
                        src="/images/events/events%20section/march%2014%20icon.svg"
                        alt=""
                        className="relative h-5 w-5"
                      />
                    </span>
                    <span>
                      {event.date}; {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 items-center justify-center">
                      <img
                        src="/images/events/events%20section/background%20for%20icons.svg"
                        alt=""
                        className="absolute inset-0 h-full w-full"
                      />
                      <img
                        src="/images/events/events%20section/online%20icon.svg"
                        alt=""
                        className="relative h-5 w-5"
                      />
                    </span>
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="mt-6 inline-flex">
                  <FancyButton
                    label="Register Now"
                    color="navy"
                    className="px-5 py-2 text-xs [&>span:last-child]:h-8 [&>span:last-child]:w-8 [&>span:last-child>svg]:h-4 [&>span:last-child>svg]:w-4"
                    onClick={() => handleRegisterClick(event.title)}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ComingSoonModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Event Registration"
        description={`Registration for ${selectedEventTitle || "this event"} will open soon. Please check back for updates.`}
      />
    </section>
  );
}
