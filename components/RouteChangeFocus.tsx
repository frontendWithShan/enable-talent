"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteChangeFocus() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const main = document.getElementById("main-content") as HTMLElement | null;
    if (main) {
      main.focus();
    }
  }, [pathname]);

  return null;
}
