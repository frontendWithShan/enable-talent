"use client";

import { useId, useRef, useState } from "react";

import type { JobPosting } from "./types";

const RESUME_ACCEPT_ATTRIBUTE =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const RESUME_MAX_MB = 15;

type CareerApplicationFormProps = {
  job: JobPosting;
};

type CareerApplicationFormValues = {
  coverLetter: string;
  email: string;
  fullName: string;
  linkedinUrl: string;
  phone: string;
  portfolioUrl: string;
  resumeFile: File | null;
};

const INITIAL_VALUES: CareerApplicationFormValues = {
  coverLetter: "",
  email: "",
  fullName: "",
  linkedinUrl: "",
  phone: "",
  portfolioUrl: "",
  resumeFile: null,
};

type FieldErrors = Partial<Record<keyof CareerApplicationFormValues, string>>;

export default function CareerApplicationForm({
  job,
}: CareerApplicationFormProps) {
  const [values, setValues] = useState<CareerApplicationFormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success" | "";
  }>({
    text: "",
    type: "",
  });
  const statusRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const helperId = useId();

  function focusMessage() {
    window.setTimeout(() => {
      statusRef.current?.focus();
    }, 0);
  }

  function updateValue<K extends keyof CareerApplicationFormValues>(
    field: K,
    nextValue: CareerApplicationFormValues[K],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: FieldErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Enter your email address.";
    }

    if (!values.coverLetter.trim()) {
      nextErrors.coverLetter = "Tell us why you are interested in this role.";
    }

    if (!values.resumeFile) {
      nextErrors.resumeFile = "Choose a resume file before submitting.";
    } else if (values.resumeFile.size > RESUME_MAX_MB * 1024 * 1024) {
      nextErrors.resumeFile = "Resume files must be 15 MB or smaller.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage({ text: "", type: "" });

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setMessage({
        text: "Please fix the highlighted fields before you submit your application.",
        type: "error",
      });
      focusMessage();
      return;
    }

    const formData = new FormData();
    formData.set("coverLetter", values.coverLetter);
    formData.set("email", values.email);
    formData.set("fullName", values.fullName);
    formData.set("jobId", job.id);
    formData.set("jobSlug", job.slug ?? "");
    formData.set("linkedinUrl", values.linkedinUrl);
    formData.set("phone", values.phone);
    formData.set("portfolioUrl", values.portfolioUrl);
    formData.set("resume", values.resumeFile as File);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/careers/apply", {
        body: formData,
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as
        | {
            error?: string;
            fieldErrors?: FieldErrors;
            message?: string;
            ok?: boolean;
          }
        | null;

      if (!response.ok || !payload?.ok) {
        setFieldErrors(payload?.fieldErrors ?? {});
        setMessage({
          text:
            payload?.error ??
            "We could not submit your application right now. Please try again.",
          type: "error",
        });
        focusMessage();
        return;
      }

      setFieldErrors({});
      setMessage({
        text:
          payload.message ??
          "Your application has been submitted. Our team will review it and contact you if there is a match.",
        type: "success",
      });
      setValues(INITIAL_VALUES);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      focusMessage();
    } catch {
      setMessage({
        text: "We could not submit your application right now. Please try again.",
        type: "error",
      });
      focusMessage();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="apply-for-role-heading"
      className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8"
      id="apply-for-role"
    >
      <div className="max-w-3xl">
        <h2
          className="text-2xl font-semibold tracking-tight text-slate-950"
          id="apply-for-role-heading"
        >
          Apply for this role
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Fill in the form below and upload your resume. Required fields are marked clearly.
        </p>
      </div>

      {message.text ? (
        <div
          aria-live={message.type === "success" ? "polite" : "assertive"}
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-green-300 bg-green-50 text-green-950"
              : "border-red-300 bg-red-50 text-red-950"
          }`}
          ref={statusRef}
          role={message.type === "success" ? "status" : "alert"}
          tabIndex={-1}
        >
          {message.text}
        </div>
      ) : null}

      <form className="mt-6 space-y-6" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-900" htmlFor="fullName">
              Full name
            </label>
            <input
              aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              aria-invalid={fieldErrors.fullName ? true : undefined}
              className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              id="fullName"
              name="fullName"
              onChange={(event) => updateValue("fullName", event.target.value)}
              required
              type="text"
              value={values.fullName}
            />
            {fieldErrors.fullName ? (
              <p className="mt-2 text-sm text-red-700" id="fullName-error">
                {fieldErrors.fullName}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900" htmlFor="email">
              Email address
            </label>
            <input
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              aria-invalid={fieldErrors.email ? true : undefined}
              className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              id="email"
              name="email"
              onChange={(event) => updateValue("email", event.target.value)}
              required
              type="email"
              value={values.email}
            />
            {fieldErrors.email ? (
              <p className="mt-2 text-sm text-red-700" id="email-error">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900" htmlFor="phone">
              Phone number
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              id="phone"
              name="phone"
              onChange={(event) => updateValue("phone", event.target.value)}
              type="tel"
              value={values.phone}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900" htmlFor="linkedinUrl">
              LinkedIn profile
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              id="linkedinUrl"
              name="linkedinUrl"
              onChange={(event) => updateValue("linkedinUrl", event.target.value)}
              type="url"
              value={values.linkedinUrl}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900" htmlFor="portfolioUrl">
            Portfolio or website
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
            id="portfolioUrl"
            name="portfolioUrl"
            onChange={(event) => updateValue("portfolioUrl", event.target.value)}
            type="url"
            value={values.portfolioUrl}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900" htmlFor="resume">
            Resume
          </label>
          <p className="mt-2 text-sm text-slate-700" id={`${helperId}-resume-help`}>
            Upload a PDF, DOC, or DOCX file up to 15 MB.
          </p>
          <input
            accept={RESUME_ACCEPT_ATTRIBUTE}
            aria-describedby={
              fieldErrors.resumeFile
                ? `${helperId}-resume-help resume-error`
                : `${helperId}-resume-help`
            }
            aria-invalid={fieldErrors.resumeFile ? true : undefined}
            className="mt-2 block w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950"
            id="resume"
            name="resume"
            onChange={(event) =>
              updateValue("resumeFile", event.target.files?.[0] ?? null)
            }
            ref={fileInputRef}
            required
            type="file"
          />
          {values.resumeFile ? (
            <p className="mt-2 text-sm text-slate-700">
              Selected file: <span className="font-semibold">{values.resumeFile.name}</span>
            </p>
          ) : null}
          {fieldErrors.resumeFile ? (
            <p className="mt-2 text-sm text-red-700" id="resume-error">
              {fieldErrors.resumeFile}
            </p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900" htmlFor="coverLetter">
            Why are you interested in this role?
          </label>
          <textarea
            aria-describedby={
              fieldErrors.coverLetter
                ? "coverLetter-help coverLetter-error"
                : "coverLetter-help"
            }
            aria-invalid={fieldErrors.coverLetter ? true : undefined}
            className="mt-2 min-h-40 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
            id="coverLetter"
            name="coverLetter"
            onChange={(event) => updateValue("coverLetter", event.target.value)}
            required
            value={values.coverLetter}
          />
          <p className="mt-2 text-sm text-slate-700" id="coverLetter-help">
            Share a short note about your experience, motivation, or what makes this role a fit for you.
          </p>
          {fieldErrors.coverLetter ? (
            <p className="mt-2 text-sm text-red-700" id="coverLetter-error">
              {fieldErrors.coverLetter}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-700">
            You are applying for <span className="font-semibold">{job.title}</span>.
          </p>
          <button
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFD071] to-[#EFB745] px-8 py-3 text-base font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#EFB745] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit application"}
          </button>
        </div>
      </form>
    </section>
  );
}
