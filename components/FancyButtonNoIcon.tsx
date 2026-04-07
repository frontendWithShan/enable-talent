import { HTMLAttributes, JSX } from "react";

type ColorVariant = "navy" | "orange";
type BorderRadiusVariant = "full" | "lg" | "md" | "sm" | "none";

interface FancyButtonNoIconProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  color?: ColorVariant;
  borderRadius?: BorderRadiusVariant;
}

const GRADIENT_BY_COLOR: Record<ColorVariant, string> = {
  navy: "from-[#183457] to-[#0D3541]",
  orange: "from-[#FFD071] to-[#EFB745]",
};

const TEXT_COLOR_BY_COLOR: Record<ColorVariant, string> = {
  navy: "text-white",
  orange: "text-black",
};

const BORDER_RADIUS: Record<BorderRadiusVariant, string> = {
  full: "rounded-full",
  lg: "rounded-lg",
  md: "rounded-md",
  sm: "rounded-sm",
  none: "rounded-none",
};

export default function FancyButtonNoIcon({
  label,
  color = "navy",
  borderRadius = "full",
  className = "",
  ...props
}: FancyButtonNoIconProps): JSX.Element {
  const gradient = GRADIENT_BY_COLOR[color];
  const textColor = TEXT_COLOR_BY_COLOR[color];
  const radius = BORDER_RADIUS[borderRadius];

  return (
    <span
      {...props}
      className={`group cursor-pointer inline-flex items-center justify-center gap-3 ${radius} px-6 py-3 text-sm font-semibold ${textColor} bg-linear-to-r ${gradient} shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform duration-150 group-hover:-translate-y-px ${className} transition hover:-translate-y-0.5 hover:shadow-md`}
    >
      {label}
    </span>
  );
}

// Usage example:
// <Link href="/get-started" className="group">
//   <FancyButtonNoIcon label="Get Started" />
// </Link>
//
// <Link href="/learn-more" className="group">
//   <FancyButtonNoIcon label="Learn More" color="orange" borderRadius="lg" />
// </Link>
