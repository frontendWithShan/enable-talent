import type { ReactNode } from "react";
import { TocItem } from "@/components/legal/LegalToc";

interface LegalContentProps {
  text: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const boldString = (text: string, search: string) => {
  if (!text.includes(search)) return text;
  const parts = text.split(search);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-bold">{search}</span>}
        </span>
      ))}
    </>
  );
};

export const buildLegalContent = (text: string) => {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const tocItems: TocItem[] = [];
  const contentNodes: ReactNode[] = [];
  let lastWasSection = false;
  let inNumberedSection = false;
  let inSubSection = false;
  let lastWasHeading = false;
  let lastLineEndsWithPeriod = false;
  let lastWasH3 = false;
  let lastMargin = "ml-0";
  let lastWasBullet = false;
  const isResponsibleAi = text.startsWith("RESPONSIBLE AI");

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const hasLeadingSpace = line.startsWith(" ");
    const currentEndsWithPeriod = trimmed.endsWith(".");
    const isExtraBoldLine =
      trimmed === "ENABLED HR LABS INC." ||
      trimmed === "accessibility@enabledtalent.com";
    const isBoldLine = trimmed === "Email: jeby@enabledtalent.com";

    if (!trimmed) {
      contentNodes.push(
        <div key={`spacer-${index}`} className="h-4" aria-hidden="true" />,
      );
      lastLineEndsWithPeriod = false;
      lastWasH3 = false;
      lastMargin = "ml-0";
      lastWasBullet = false;
      return;
    }

    const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (match) {
      const [, number, title] = match;
      const id = `section-${number}-${slugify(title)}`;
      tocItems.push({ id, label: `${number}. ${title}` });
      inNumberedSection = true;
      inSubSection = false;
      contentNodes.push(
        <h3
          key={`heading-${index}`}
          id={id}
          className="scroll-mt-28 mt-12 mb-3 text-[30px] font-semibold leading-tight text-slate-900"
        >
          <span className="font-bold">{number}.</span> {title}
        </h3>,
      );
      lastWasSection = false;
      lastWasHeading = true;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = true;
      lastMargin = "ml-0";
      lastWasBullet = false;
      return;
    }

    if (trimmed.toUpperCase() === "PRIVACY POLICY") {
      lastWasH3 = false;
      return;
    }
    if (trimmed.toUpperCase() === "ACCESSIBILITY POLICY") {
      lastWasH3 = false;
      return;
    }
    if (trimmed.toUpperCase() === "RESPONSIBLE AI") {
      lastWasH3 = false;
      return;
    }

    if (
      trimmed ===
      "PRIVACY POLICY, AI TRANSPARENCY NOTICE & REGULATORY READINESS MEMORANDUM"
    ) {
      contentNodes.push(
        <p
          key={`line-${index}`}
          className="mt-6 text-base font-bold uppercase tracking-tight text-slate-900"
        >
          {line}
        </p>,
      );
      lastWasSection = false;
      inNumberedSection = false;
      inSubSection = false;
      lastWasHeading = false;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      return;
    }

    if (
      trimmed.startsWith("Legal Entity:") ||
      trimmed.startsWith("Operating Name:")
    ) {
      contentNodes.push(
        <p key={`line-${index}`} className="mt-1 text-base text-slate-700">
          {line}
        </p>,
      );
      lastWasHeading = false;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false;
      return;
    }

    if (trimmed.startsWith("SECTION ")) {
      const sectionMatch = trimmed.match(/^SECTION\s+(\d+)/i);
      const sectionId = sectionMatch ? `section-${sectionMatch[1]}` : undefined;
      contentNodes.push(
        <p
          key={`line-${index}`}
          id={sectionId}
          className="scroll-mt-28 mt-14 text-[30px] font-bold uppercase tracking-wide text-slate-900"
        >
          {line}
        </p>,
      );
      lastWasSection = true;
      inNumberedSection = false;
      inSubSection = false;
      lastWasHeading = true;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false;
      return;
    }

    if (lastWasSection) {
      contentNodes.push(
        <p key={`line-${index}`} className="mt-2 text-base font-bold text-slate-900">
          {line}
        </p>,
      );
      lastWasSection = false;
      lastWasHeading = true;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false;
      lastWasBullet = false;
      return;
    }

    const isSubNumbered = /^\d+\.\d+/.test(trimmed);
    const isLettered = /^\([a-z]\)/i.test(trimmed);
    const isHeadingPhrase =
      /^[A-Za-z][A-Za-z\s–-]{0,100}$/.test(trimmed) &&
      !trimmed.endsWith(".") &&
      !trimmed.includes(":") &&
      (!isResponsibleAi || trimmed.split(/\s+/).length <= 4) &&
      (isResponsibleAi || trimmed !== "Safeguards");
    const isColonLead = trimmed.endsWith(":");

    if (isSubNumbered) {
      inNumberedSection = true;
      inSubSection = true;
      contentNodes.push(
        <p
          key={`line-${index}`}
          className="mt-4 mb-3 ml-32 text-[20px] font-semibold text-slate-900"
        >
          {line}
        </p>,
      );
      lastWasHeading = true;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false;
      return;
    }

    if (isLettered) {
      contentNodes.push(
        <p
          key={`line-${index}`}
          className="mt-3 mb-2 ml-32 text-base leading-relaxed sm:text-lg"
        >
          {line}
        </p>,
      );
      lastWasHeading = false;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false;
      return;
    }

    if (trimmed.startsWith("The Company does not sell or rent")) {
      contentNodes.push(
        <p
          key={`line-${index}`}
          className="mt-3 ml-20 text-base leading-relaxed sm:text-lg"
        >
          {line}
        </p>,
      );
      lastWasHeading = false;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false;
      return;
    }

    if (isColonLead) {
      let margin = "ml-0";
      if (inNumberedSection) {
        margin = inSubSection ? "ml-32" : "ml-20";
      } else if (!lastWasHeading) {
        margin = "ml-20";
      }

      contentNodes.push(
        <p
          key={`line-${index}`}
          className={`mt-3 mb-2 ${margin} text-base leading-relaxed sm:text-lg`}
        >
          {line}
        </p>,
      );
      lastWasHeading = false;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false;
      return;
    }

    if (hasLeadingSpace) {
      let margin = "ml-32";
      let spacing = "mt-3";
      let isBullet = false;
      if (isResponsibleAi) {
        if (lastWasHeading) {
          // Move bullets left to ml-20 and space them out to mt-4
          margin = "ml-20";
          spacing = "mt-4";
          if (lastWasH3) isBullet = true;
        } else {
          // Maintain bullet state at ml-20/mt-4
          if (lastWasBullet) {
            margin = "ml-20";
            isBullet = true;
            spacing = "mt-4";
          } else if (lastLineEndsWithPeriod) {
            margin = "ml-20";
            spacing = "mt-4";
          } else {
            margin = "ml-20";
            isBullet = true;
            spacing = "mt-4";
          }
        }
      }

      contentNodes.push(
        <p
          key={`line-${index}`}
          className={`${spacing} ${margin} text-base leading-relaxed sm:text-lg ${isExtraBoldLine ? "font-extrabold" : ""}`}
        >
          {isBoldLine ? (
            <>
              Email: <span className="font-extrabold">jeby@enabledtalent.com</span>
            </>
          ) : (
            <>
              {isBullet && <span className="mr-2">{"\u2022"}</span>}
              {line}
            </>
          )}
        </p>,
      );
      lastWasHeading = false;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastMargin = margin;
      lastWasBullet = isBullet;
      return;
    }

    if (isHeadingPhrase) {
      const margin = inNumberedSection ? "ml-20" : "ml-0";
      const isOurMission = trimmed === "Our Mission";
      contentNodes.push(
        <p
          key={`line-${index}`}
          className={`mt-12 mb-2 ${margin} ${isOurMission ? "text-[24px]" : "text-[20px]"} font-bold text-slate-900`}
        >
          {line}
        </p>,
      );
      lastWasHeading = true;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false; // Added reset
      return;
    }

    if (inSubSection) {
      let margin = "ml-32";
      let isBullet = false;
      if (isResponsibleAi && lastWasH3) {
        margin = "ml-20";
        isBullet = true;
      }

      contentNodes.push(
        <p
          key={`line-${index}`}
          className={`mt-3 ${margin} text-base leading-relaxed sm:text-lg ${isExtraBoldLine ? "font-extrabold" : ""}`}
        >
          {isBoldLine ? (
            <>
              Email: <span className="font-extrabold">jeby@enabledtalent.com</span>
            </>
          ) : (
            <>
              {isBullet && <span className="mr-2">{"\u2022"}</span>}
              {line}
            </>
          )}
        </p>,
      );
      lastWasHeading = false;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false; // Added reset
      lastWasBullet = isBullet;
      return;
    }

    if (inNumberedSection || (isResponsibleAi && lastWasHeading)) {
      // Determine margin for bulleting if applicable
      let margin = "ml-20";
      let isBullet = false;
      let spacing = "mt-3";
      if (isResponsibleAi && (lastWasH3 || lastWasBullet)) {
        margin = "ml-20";
        isBullet = true;
        spacing = "mt-4";
      }

      contentNodes.push(
        <p
          key={`line-${index}`}
          className={`${spacing} ${margin} text-base leading-relaxed sm:text-lg ${isExtraBoldLine ? "font-extrabold" : ""}`}
        >
          {isBoldLine ? (
            <>
              Email: <span className="font-extrabold">jeby@enabledtalent.com</span>
            </>
          ) : (
            <>
              {isBullet && <span className="mr-2">{"\u2022"}</span>}
              {line}
            </>
          )}
        </p>,
      );
      lastWasHeading = false;
      lastLineEndsWithPeriod = currentEndsWithPeriod;
      lastWasH3 = false; // Added reset
      lastWasBullet = isBullet;
      return;
    }

    let margin = "ml-0";
    let isBullet = false;
    let spacing = "mt-4";
    if (isResponsibleAi && lastWasH3) {
      margin = "ml-20";
      isBullet = true;
    }

    contentNodes.push(
      <p
        key={`line-${index}`}
        className={`${spacing} ${margin} text-base leading-relaxed sm:text-lg ${isExtraBoldLine ? "font-extrabold" : ""}`}
      >
        {isBoldLine ? (
          <>
            Email: <span className="font-extrabold">jeby@enabledtalent.com</span>
          </>
        ) : (
          <>
            {isBullet && <span className="mr-2">{"\u2022"}</span>}
            {line}
          </>
        )}
      </p>,
    );
    lastWasHeading = false;
    lastLineEndsWithPeriod = currentEndsWithPeriod;
    lastWasH3 = false; // Added reset
    lastMargin = "ml-0";
    lastWasBullet = isBullet;
  });

  return { contentNodes, tocItems };
};

export default function LegalContent({ text }: LegalContentProps) {
  const { contentNodes } = buildLegalContent(text);

  return <div className="min-w-0">{contentNodes}</div>;
}
