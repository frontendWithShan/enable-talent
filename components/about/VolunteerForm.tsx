"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { submitVolunteerApplicationAction } from "@/app/admin/volunteer-applications/actions";

type VolunteerFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const VolunteerForm = ({ isOpen, onClose }: VolunteerFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    availability: "",
    motivation: "",
    linkedinProfile: "",
    portfolioWebsite: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const firstFocusableRef = useRef<HTMLInputElement>(null);

  // Focus trap - get all focusable elements within modal
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];
    return Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled"));
  }, []);

  // Handle keyboard events for focus trap and escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [getFocusableElements, onClose]
  );

  // Manage focus and body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen, handleKeyDown]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = new FormData();
      payload.set("fullName", formData.fullName);
      payload.set("email", formData.email);
      payload.set("phone", formData.phone);
      payload.set("skills", formData.skills);
      payload.set("experience", formData.experience);
      payload.set("availability", formData.availability);
      payload.set("motivation", formData.motivation);
      payload.set("linkedinProfile", formData.linkedinProfile);
      payload.set("portfolioWebsite", formData.portfolioWebsite);

      const result = await submitVolunteerApplicationAction(payload);
      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          skills: "",
          experience: "",
          availability: "",
          motivation: "",
          linkedinProfile: "",
          portfolioWebsite: "",
        });
        window.setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting volunteer application:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="volunteer-modal-title"
        aria-describedby="volunteer-modal-description"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white"
      >
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2
              id="volunteer-modal-title"
              className={`${plusJakartaSans.className} text-2xl font-extrabold tracking-tight text-slate-900`}
            >
              Join Our Volunteer Network
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#CD7F32] focus:ring-offset-2"
              aria-label="Close volunteer application form"
              type="button"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p id="volunteer-modal-description" className="mt-2 text-gray-600">
            Help us build a more inclusive future by volunteering your time and talent with Enabled Talent.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
                Full Name <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                ref={firstFocusableRef}
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                aria-required="true"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email Address <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-required="true"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="linkedinProfile" className="mb-2 block text-sm font-medium text-gray-700">
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedinProfile"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <div>
            <label htmlFor="portfolioWebsite" className="mb-2 block text-sm font-medium text-gray-700">
              Portfolio/Website
            </label>
            <input
              type="url"
              id="portfolioWebsite"
              name="portfolioWebsite"
              value={formData.portfolioWebsite}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label htmlFor="skills" className="mb-2 block text-sm font-medium text-gray-700">
              Skills &amp; Expertise <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              required
              aria-required="true"
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
              placeholder="e.g., Web Development, Graphic Design, Content Writing, User Research, Marketing, Project Management..."
            />
          </div>

          <div>
            <label htmlFor="experience" className="mb-2 block text-sm font-medium text-gray-700">
              Relevant Experience <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
              aria-required="true"
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
              placeholder="Tell us about your professional background, projects you've worked on, or volunteer experience..."
            />
          </div>

          <div>
            <label htmlFor="availability" className="mb-2 block text-sm font-medium text-gray-700">
              Availability <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              required
              aria-required="true"
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
              placeholder="e.g., 5-10 hours per week, weekends only, flexible schedule, specific days..."
            />
          </div>

          <div>
            <label htmlFor="motivation" className="mb-2 block text-sm font-medium text-gray-700">
              Why do you want to volunteer with Enabled Talent? <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              required
              aria-required="true"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-[#CD7F32] focus:outline-none focus:ring-2 focus:ring-[#CD7F32]"
              placeholder="Share what motivates you to contribute to our mission of building a more inclusive workplace..."
            />
          </div>

          {submitStatus === "success" && (
            <div role="alert" aria-live="polite" className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium text-green-700">
                  Thank you for your application! We&apos;ll be in touch soon.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div role="alert" aria-live="assertive" className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium text-red-700">
                  There was an error submitting your application. Please try again.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CD7F32] focus:ring-offset-2 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-lg bg-[#CD7F32] px-6 py-3 font-medium text-white transition-colors hover:bg-[#B56F2A] focus:outline-none focus:ring-2 focus:ring-[#CD7F32] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
