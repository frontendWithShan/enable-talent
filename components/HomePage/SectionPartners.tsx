import Image from "next/image";
import { JSX } from "react";

const partnerLogos = [
  { src: "/images/SectionPartners/AWS.png", alt: "AWS Startup Programs" },
  {
    src: "/images/SectionPartners/Microsoft.png",
    alt: "Microsoft for Startups",
  },
  {
    src: "/images/SectionPartners/Nvidia.png",
    alt: "NVIDIA Inception Program",
  },
  {
    src: "/images/SectionPartners/unicef.png",
    alt: "UNICEF Startup Lab",
    scale: 1.7,
  },
];

export default function SectionPartners({
  heading,
  tagline,
}: {
  heading?: string;
  tagline: string;
}): JSX.Element {
  return (
    <section
      aria-labelledby="partners-heading"
      className="bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1920px]  px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill label */}
        {heading && (
          <p className="mb-8 inline-flex items-center rounded-full  bg-gray-200 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-800">
            {heading}
          </p>
        )}

        {/* Main heading */}
        <h2
          id="partners-heading"
          className={`${heading ? "mt-6" : "mt-2"
            } mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900`}
        >
          {tagline}
        </h2>

        {/* Logo carousel */}
        <div className="mt-20">
          {/* BLUE DOTTED BOX – transparent + clipping */}
          <div
            className="group relative mx-auto max-w-6xl rounded-md px-4 py-4 overflow-hidden"
            aria-label="Logos of trusted partner organizations"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-32 z-50"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 55%, rgba(255,255,255,0) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-32 z-50"
              style={{
                background:
                  "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 55%, rgba(255,255,255,0) 100%)",
              }}
            />
            <div className="flex w-max animate-marquee gap-20 group-hover:[animation-play-state:paused]">
              {partnerLogos.concat(partnerLogos).map((logo, index) => (
                <div
                  key={`${logo.src}-${index}`}
                  className="flex h-12 w-32 items-center justify-center sm:h-14 sm:w-40"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={56}
                    className="h-full w-full object-contain"
                    style={
                      logo.scale
                        ? { transform: `scale(${logo.scale})` }
                        : undefined
                    }
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
