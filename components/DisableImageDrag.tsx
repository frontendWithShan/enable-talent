"use client";

import { useEffect } from "react";

type DisableImageDragProps = {
  selector: string;
};

export default function DisableImageDrag({
  selector,
}: DisableImageDragProps) {
  useEffect(() => {
    const root = document.querySelector(selector);
    if (!root) return;
    root.querySelectorAll("img").forEach((img) => {
      img.setAttribute("draggable", "false");
    });
  }, [selector]);

  return null;
}
