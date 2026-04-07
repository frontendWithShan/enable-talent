"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  placeholderSrc: string;
  unoptimized?: boolean;
};

export function BlogImage({ src, alt, placeholderSrc, unoptimized }: Props) {
  const [failed, setFailed] = useState(false);
  const finalSrc = failed || !src ? placeholderSrc : src;
  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill
      className="object-cover"
      unoptimized={unoptimized}
      onError={() => setFailed(true)}
    />
  );
}
