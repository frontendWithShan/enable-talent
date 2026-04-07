import type { ContentSourceType } from "@/lib/data/types";

const SOURCE_STYLES: Record<ContentSourceType, string> = {
  external_link:    "border-indigo-300 bg-indigo-50 text-indigo-950",
  internal_article: "border-blue-300   bg-blue-50   text-blue-950",
};

const SOURCE_LABELS: Record<ContentSourceType, string> = {
  external_link:    "External Link",
  internal_article: "Article",
};

function ArticleIcon() {
  return (
    <svg aria-hidden="true" className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
    </svg>
  );
}

const SOURCE_ICONS: Record<ContentSourceType, React.ReactNode> = {
  external_link:    <ExternalLinkIcon />,
  internal_article: <ArticleIcon />,
};

export default function BlogSourceBadge({
  sourceType,
}: {
  sourceType: ContentSourceType;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${SOURCE_STYLES[sourceType]}`}
    >
      {SOURCE_ICONS[sourceType]}
      {SOURCE_LABELS[sourceType]}
    </span>
  );
}
