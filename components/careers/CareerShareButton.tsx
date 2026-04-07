"use client";

import { useState } from "react";

type CareerShareButtonProps = {
  title: string;
  url: string;
};

export default function CareerShareButton({
  title,
  url,
}: CareerShareButtonProps) {
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success" | "";
  }>({
    text: "",
    type: "",
  });

  async function handleShare() {
    const absoluteUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;

    try {
      if (navigator.share) {
        await navigator.share({
          text: `Check out this role at EnabledTalent: ${title}`,
          title,
          url: absoluteUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(absoluteUrl);
      setMessage({
        text: "The role link has been copied to your clipboard.",
        type: "success",
      });
      window.setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    } catch {
      setMessage({
        text: "We could not share this page right now. You can copy the page address from your browser.",
        type: "error",
      });
    }
  }

  return (
    <div className="space-y-3">
      {message.text ? (
        <div
          aria-live={message.type === "success" ? "polite" : "assertive"}
          className={`rounded-xl border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-green-300 bg-green-50 text-green-950"
              : "border-red-300 bg-red-50 text-red-950"
          }`}
          role={message.type === "success" ? "status" : "alert"}
        >
          {message.text}
        </div>
      ) : null}

      <button
        className="inline-flex items-center rounded-full bg-gradient-to-r from-[#183457] to-[#0D3541] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
        onClick={() => void handleShare()}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        Share
      </button>
    </div>
  );
}
