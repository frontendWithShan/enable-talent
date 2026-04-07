"use client";

import Image from "next/image";
import Link from "next/link";
import type { KeyboardEvent } from "react";
import { JSX, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import ComingSoonModal from "@/components/ComingSoonModal";
import DemoRequestModal from "@/components/DemoRequestModal";

import logo from "@/public/logo/et-new.svg";
import EnabledAgentIcon from "@/public/images/EmployerAgent/EnableAgentLogo.svg";
import EnableJobLogo from "@/public/images/Employers/EnableJobsLogo.svg";

const isPathActive = (
  href: string,
  pathname: string,
  exact = false,
): boolean => {
  const current = pathname || "";
  if (href === "/") return current === "/";
  return exact
    ? current === href
    : current === href || current.startsWith(`${href}/`);
};

const getNavLinkClasses = (
  href: string,
  pathname: string,
  exact = false,
): string => {
  const active = isPathActive(href, pathname, exact);
  return active
    ? "transition-colors font-semibold text-amber-600 underline decoration-2 underline-offset-4"
    : "transition-colors font-medium text-gray-700 hover:text-amber-600";
};

type ComingSoonModalContent = {
  title: string;
  description: string;
};

type GlobalMenuOption = {
  label: string;
  href?: string;
  comingSoonTitle?: string;
  comingSoonDescription?: string;
};

const isExternalHref = (href?: string): boolean =>
  typeof href === "string" && /^(https?:)?\/\//.test(href);

const GLOBAL_MENU_OPTIONS: GlobalMenuOption[] = [
  { label: "Canada", href: "/" },
  {
    label: "United States",
    comingSoonTitle: "United States - Coming Soon",
    comingSoonDescription:
      "We are preparing our United States page with regional partners and opportunities. Coming soon.",
  },
  { label: "Africa", href: "/africa" },
  {
    label: "Spain",
    comingSoonTitle: "Spain - Coming Soon",
    comingSoonDescription:
      "We are preparing our Spain page with regional partners and opportunities. Coming soon.",
  },
  {
    label: "Saudi Arabia",
    comingSoonTitle: "Saudi Arabia - Coming Soon",
    comingSoonDescription:
      "We are preparing our Saudi Arabia page with regional partners and opportunities. Coming soon.",
  },
  {
    label: "Qatar",
    comingSoonTitle: "Qatar - Coming Soon",
    comingSoonDescription:
      "We are preparing our Qatar page with regional partners and opportunities. Coming soon.",
  },
];

const isAfricaRoute = (pathname: string): boolean =>
  pathname === "/africa" || pathname.startsWith("/africa/");

export default function Header(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [globalsOpen, setGlobalsOpen] = useState<boolean>(false);
  const [employersOpen, setEmployersOpen] = useState<boolean>(false);
  const [comingSoonModalContent, setComingSoonModalContent] =
    useState<ComingSoonModalContent | null>(null);
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState<boolean>(false);
  const isComingSoonModalOpen = comingSoonModalContent !== null;
  const pathname = usePathname() || "";
  const onAfricaRoute = isAfricaRoute(pathname);
  const visibleGlobalMenuOptions = GLOBAL_MENU_OPTIONS.filter(
    (option) => !(onAfricaRoute && option.label === "Africa"),
  );
  const regionIcon = onAfricaRoute
    ? "/images/Header/orange africa map.png"
    : "/images/Header/canada-flag.png";
  const regionAlt = onAfricaRoute ? "Africa icon" : "Canada flag";
  const regionCode = onAfricaRoute ? "AF" : "CA";
  const employersTriggerDesktopRef = useRef<HTMLButtonElement | null>(null);
  const employersTriggerMobileRef = useRef<HTMLButtonElement | null>(null);
  const globalsTriggerDesktopRef = useRef<HTMLButtonElement | null>(null);
  const globalsTriggerMobileRef = useRef<HTMLButtonElement | null>(null);
  const employersMenuRef = useRef<HTMLDivElement | null>(null);
  const globalsMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileEmployersMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileGlobalsMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      // Keep dropdowns open while a "Coming Soon" modal is active so focus can return to the menu item.
      if (isComingSoonModalOpen) return;

      const target = event.target as Node | null;
      if (!target) return;

      if (
        employersOpen &&
        !employersTriggerDesktopRef.current?.contains(target) &&
        !employersTriggerMobileRef.current?.contains(target) &&
        !employersMenuRef.current?.contains(target) &&
        !mobileEmployersMenuRef.current?.contains(target)
      ) {
        setEmployersOpen(false);
      }

      if (
        globalsOpen &&
        !globalsTriggerDesktopRef.current?.contains(target) &&
        !globalsTriggerMobileRef.current?.contains(target) &&
        !globalsMenuRef.current?.contains(target) &&
        !mobileGlobalsMenuRef.current?.contains(target)
      ) {
        setGlobalsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [employersOpen, globalsOpen, isComingSoonModalOpen]);

  const focusMenuItem = (
    menu: HTMLDivElement | null,
    index: number,
    focusLast = false,
  ) => {
    if (!menu) return;
    const items = menu.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (!items.length) return;
    const targetIndex = focusLast ? items.length - 1 : index;
    const clamped = Math.max(0, Math.min(targetIndex, items.length - 1));
    items[clamped].focus();
  };

  const handleMenuTriggerKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    isOpen: boolean,
    setOpenState: (open: boolean) => void,
    menuRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) setOpenState(true);
      requestAnimationFrame(() => {
        focusMenuItem(menuRef.current, 0, event.key === "ArrowUp");
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isOpen) {
        setOpenState(true);
        requestAnimationFrame(() => {
          focusMenuItem(menuRef.current, 0);
        });
      } else {
        setOpenState(false);
      }
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpenState(false);
    }
  };

  const handleMenuKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    setOpenState: (open: boolean) => void,
    triggerRef: React.RefObject<HTMLButtonElement | null>,
  ) => {
    const items =
      event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (!items.length) return;

    const currentIndex = Array.from(items).indexOf(
      document.activeElement as HTMLElement,
    );

    const isNextKey = event.key === "ArrowDown";
    const isPrevKey = event.key === "ArrowUp";

    if (isNextKey) {
      event.preventDefault();
      const nextIndex =
        currentIndex === -1 ? 0 : Math.min(items.length - 1, currentIndex + 1);
      items[nextIndex].focus();
    } else if (isPrevKey) {
      event.preventDefault();
      if (currentIndex <= 0) {
        // Up on the first item returns focus to the trigger.
        setOpenState(false);
        triggerRef.current?.focus();
        return;
      }
      const prevIndex = Math.max(0, currentIndex - 1);
      items[prevIndex].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1].focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpenState(false);
      triggerRef.current?.focus();
    }
  };

  const handleMenuItemKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    setOpenState: (open: boolean) => void,
    triggerRef: React.RefObject<HTMLButtonElement | null>,
  ) => {
    const menu = event.currentTarget.closest(
      '[role="menu"]',
    ) as HTMLDivElement | null;
    if (!menu) return;
    const items = menu.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (!items.length) return;
    const currentIndex = Array.from(items).indexOf(
      document.activeElement as HTMLElement,
    );

    // These events bubble to the menu container; stop propagation to avoid double-handling.
    const isNextKey = event.key === "ArrowDown";
    const isPrevKey = event.key === "ArrowUp";

    if (isNextKey) {
      event.preventDefault();
      event.stopPropagation();
      const nextIndex =
        currentIndex === -1 ? 0 : Math.min(items.length - 1, currentIndex + 1);
      items[nextIndex].focus();
    } else if (isPrevKey) {
      event.preventDefault();
      event.stopPropagation();
      if (currentIndex <= 0) {
        // Up on the first item returns focus to the trigger.
        setOpenState(false);
        triggerRef.current?.focus();
        return;
      }
      const prevIndex = Math.max(0, currentIndex - 1);
      items[prevIndex].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      event.stopPropagation();
      items[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      event.stopPropagation();
      items[items.length - 1].focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setOpenState(false);
      triggerRef.current?.focus();
    }
  };

  const isMenuVisible = (menu: HTMLDivElement | null) => {
    if (!menu) return false;
    const style = window.getComputedStyle(menu);
    return style.display !== "none" && style.visibility !== "hidden";
  };

  const focusFirstVisibleMenuItem = (menus: Array<HTMLDivElement | null>) => {
    for (const menu of menus) {
      if (isMenuVisible(menu)) {
        focusMenuItem(menu, 0);
        return;
      }
    }
  };

  const scrollToTopOnNavigate = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const openComingSoonModal = (option: GlobalMenuOption) => {
    if (option.href) return;
    setComingSoonModalContent({
      title: option.comingSoonTitle ?? `${option.label} - Coming Soon`,
      description:
        option.comingSoonDescription ??
        `We are preparing our ${option.label} page with regional partners and opportunities. Coming soon.`,
    });
  };

  useEffect(() => {
    if (!employersOpen) return;
    const timer = window.setTimeout(() => {
      focusFirstVisibleMenuItem([
        employersMenuRef.current,
        mobileEmployersMenuRef.current,
      ]);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [employersOpen]);

  useEffect(() => {
    if (!globalsOpen) return;
    const timer = window.setTimeout(() => {
      focusFirstVisibleMenuItem([
        globalsMenuRef.current,
        mobileGlobalsMenuRef.current,
      ]);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [globalsOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <nav
        className="bg-white shadow-sm"
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="relative text-black max-w-360 mx-auto px-4 sm:px-6 xl:px-8 flex justify-between items-center h-16">
          <Link
            href="/"
            className="shrink-0 flex items-center"
            aria-label="Go to home page"
            onClick={() => setOpen(false)}
          >
            <Image
              src={logo}
              alt="Enable Talent"
              width={160}
              height={46}
              priority
            />
          </Link>

          <button
            type="button"
            className="xl:hidden flex flex-col space-y-1 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close main menu" : "Open main menu"}
            aria-expanded={open}
            aria-controls="primary-navigation"
          >
            {!open ? (
              <>
                <span
                  className="h-1 w-7 bg-gray-600 rounded"
                  aria-hidden="true"
                />
                <span
                  className="h-1 w-7 bg-gray-600 rounded"
                  aria-hidden="true"
                />
                <span
                  className="h-1 w-7 bg-gray-600 rounded"
                  aria-hidden="true"
                />
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center justify-between flex-1 ml-10">
            <ul className="flex space-x-6 text-base font-medium">
              <li>
                <Link
                  href="/fortalents"
                  className={getNavLinkClasses("/fortalents", pathname)}
                  aria-current={
                    isPathActive("/fortalents", pathname) ? "page" : undefined
                  }
                >
                  For Talent
                </Link>
              </li>

              {/* For Employers dropdown (desktop) */}
              <li className="relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-700 hover:text-amber-600 transition-colors font-medium"
                  aria-haspopup="true"
                  aria-expanded={employersOpen}
                  aria-controls="employers-menu"
                  onClick={() => setEmployersOpen((prev) => !prev)}
                  onKeyDown={(event) =>
                    handleMenuTriggerKeyDown(
                      event,
                      employersOpen,
                      setEmployersOpen,
                      employersMenuRef,
                    )
                  }
                  ref={employersTriggerDesktopRef}
                >
                  <span
                    className={getNavLinkClasses("/foremployers", pathname)}
                  >
                    For Employers
                  </span>
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </button>
                <div
                  id="employers-menu"
                  role="menu"
                  aria-label="For Employers"
                  onKeyDown={(event) =>
                    handleMenuKeyDown(
                      event,
                      setEmployersOpen,
                      employersTriggerDesktopRef,
                    )
                  }
                  ref={employersMenuRef}
                  className={`absolute -left-8 mt-5 border-6 border-gray-200 min-w-64 bg-white rounded-2xl shadow-lg whitespace-nowrap transition-all duration-150 ${
                    employersOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div className="w-full py-2">
                    <Link
                      href="/foremployers"
                      role="menuitem"
                      onClick={() => {
                        scrollToTopOnNavigate();
                        setEmployersOpen(false);
                      }}
                      onKeyDown={(event) =>
                        handleMenuItemKeyDown(
                          event,
                          setEmployersOpen,
                          employersTriggerDesktopRef,
                        )
                      }
                      className={
                        "flex items-center gap-3 px-4 py-3 text-base " +
                        getNavLinkClasses("/foremployers", pathname, true)
                      }
                    >
                      <Image
                        src={EnableJobLogo}
                        alt="Enable Jobs logo"
                        width={20}
                        height={20}
                        priority
                      />
                      <span className="font-medium">Enabled Jobs</span>
                    </Link>
                    <div className="mx-4 h-px bg-gray-100" aria-hidden="true" />
                    <Link
                      href="/foremployers/agent"
                      role="menuitem"
                      onClick={() => {
                        scrollToTopOnNavigate();
                        setEmployersOpen(false);
                      }}
                      onKeyDown={(event) =>
                        handleMenuItemKeyDown(
                          event,
                          setEmployersOpen,
                          employersTriggerDesktopRef,
                        )
                      }
                      className={
                        "flex items-center gap-3 px-4 py-3 text-base " +
                        getNavLinkClasses("/foremployers/agent", pathname, true)
                      }
                    >
                      <Image
                        src={EnabledAgentIcon}
                        alt="Enable Agent logo"
                        width={20}
                        height={20}
                        priority
                      />
                      <span className="flex flex-col leading-tight">
                        <span>Enabled Recruiter AI</span>
                        <span className="mt-0.5 text-xs font-normal text-gray-500">
                          AI matching assistant
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/enableacademy"
                  className={getNavLinkClasses("/enableacademy", pathname)}
                  aria-current={
                    isPathActive("/enableacademy", pathname)
                      ? "page"
                      : undefined
                  }
                >
                  Enabled Academy
                </Link>
              </li>

            </ul>

            {/* Right: globals + auth */}
            <div className="flex items-center space-x-4 text-base font-medium">
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center text-gray-700 hover:text-amber-600 px-2 py-1"
                  aria-haspopup="true"
                  aria-expanded={globalsOpen}
                  aria-controls="globals-menu"
                  onClick={() => setGlobalsOpen((prev) => !prev)}
                  onKeyDown={(event) =>
                    handleMenuTriggerKeyDown(
                      event,
                      globalsOpen,
                      setGlobalsOpen,
                      globalsMenuRef,
                    )
                  }
                  ref={globalsTriggerDesktopRef}
                >
                  <Image
                    src={regionIcon}
                    alt={regionAlt}
                    width={29}
                    height={29}
                    priority
                    className="mr-1"
                  />
                  <span>{regionCode}</span>
                  <ChevronDown className="w-5 h-5 ml-1" aria-hidden="true" />
                </button>

                <div
                  id="globals-menu"
                  role="menu"
                  aria-label="Global options"
                  onKeyDown={(event) =>
                    handleMenuKeyDown(
                      event,
                      setGlobalsOpen,
                      globalsTriggerDesktopRef,
                    )
                  }
                  ref={globalsMenuRef}
                  className={`absolute left-0 top-full mt-2 w-52 border-6 border-gray-200 bg-white shadow-lg rounded-2xl transition-all duration-150 ${
                    globalsOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  {visibleGlobalMenuOptions.map((option) =>
                    option.href ? (
                      <Link
                        key={option.label}
                        href={option.href}
                        target={isExternalHref(option.href) ? "_blank" : undefined}
                        rel={
                          isExternalHref(option.href)
                            ? "noopener noreferrer"
                            : undefined
                        }
                        role="menuitem"
                        onClick={() => {
                          setGlobalsOpen(false);
                          scrollToTopOnNavigate();
                        }}
                        onKeyDown={(event) =>
                          handleMenuItemKeyDown(
                            event,
                            setGlobalsOpen,
                            globalsTriggerDesktopRef,
                          )
                        }
                        className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-50"
                      >
                        {option.label}
                      </Link>
                    ) : (
                      <button
                        key={option.label}
                        type="button"
                        role="menuitem"
                        onClick={() => openComingSoonModal(option)}
                        onKeyDown={(event) =>
                          handleMenuItemKeyDown(
                            event,
                            setGlobalsOpen,
                            globalsTriggerDesktopRef,
                          )
                        }
                        className="block w-full px-4 py-2 text-left text-base text-gray-700 hover:bg-gray-50"
                      >
                        {option.label}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <span className="text-black" aria-hidden="true">
                |
              </span>

              <Link
                href="https://app.enabledtalent.com/"
                className="px-4 py-1.5 border rounded-4xl text-base font-medium text-slate-900 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center"
              >
                Login
              </Link>

              <button
                type="button"
                onClick={() => setIsDemoRequestOpen(true)}
                className="px-4 py-1.5 rounded-4xl text-base font-medium bg-slate-800 text-white hover:bg-white hover:border-slate-900 hover:text-slate-900 transition-colors cursor-pointer inline-flex items-center justify-center border border-transparent"
              >
                Get a demo
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="primary-navigation"
          className={`xl:hidden transition-all duration-300 overflow-hidden bg-white shadow-md ${
            open ? "max-h-[520px] py-4" : "max-h-0"
          }`}
        >
          <div className="px-6 space-y-4">
            <Link
              href="/fortalents"
              onClick={() => setOpen(false)}
              className={
                "block py-2 text-center " +
                getNavLinkClasses("/fortalents", pathname)
              }
              aria-current={
                isPathActive("/fortalents", pathname) ? "page" : undefined
              }
            >
              For Talent
            </Link>

            {/* Mobile: employers dropdown styled like desktop */}
            <div>
              <button
                type="button"
                className={
                  "w-full flex items-center justify-center gap-2 py-2 " +
                  getNavLinkClasses("/foremployers", pathname)
                }
                aria-haspopup="true"
                aria-expanded={employersOpen}
                aria-controls="mobile-employers-menu"
                onClick={() => setEmployersOpen((prev) => !prev)}
                onKeyDown={(event) =>
                  handleMenuTriggerKeyDown(
                    event,
                    employersOpen,
                    setEmployersOpen,
                    mobileEmployersMenuRef,
                  )
                }
                ref={employersTriggerMobileRef}
              >
                <span>For Employers</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    employersOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id="mobile-employers-menu"
                role="menu"
                aria-label="For Employers"
                onKeyDown={(event) =>
                  handleMenuKeyDown(
                    event,
                    setEmployersOpen,
                    employersTriggerMobileRef,
                  )
                }
                ref={mobileEmployersMenuRef}
                className={`transition-[max-height] duration-300 overflow-hidden ${
                  employersOpen ? "max-h-48" : "max-h-0"
                }`}
              >
                <div className="mt-2  border-6 border-gray-200 w-auto bg-white rounded-2xl shadow-md ">
                  <Link
                    href="/foremployers"
                    role="menuitem"
                    onClick={() => {
                      scrollToTopOnNavigate();
                      setOpen(false);
                      setEmployersOpen(false);
                    }}
                    onKeyDown={(event) =>
                      handleMenuItemKeyDown(
                        event,
                        setEmployersOpen,
                        employersTriggerMobileRef,
                      )
                    }
                    className={
                      "flex items-center justify-center gap-3 px-4 py-3 " +
                      getNavLinkClasses("/foremployers", pathname, true)
                    }
                    aria-current={
                      isPathActive("/foremployers", pathname, true)
                        ? "page"
                        : undefined
                    }
                  >
                    <Image
                      src={EnableJobLogo}
                      alt="Enable Jobs logo"
                      width={22}
                      height={22}
                      priority
                    />

                    <span className="text-base font-medium">Enabled Jobs</span>
                  </Link>
                  <div className="h-px bg-gray-100" aria-hidden="true" />
                  <Link
                    href="/foremployers/agent"
                    role="menuitem"
                    onClick={() => {
                      scrollToTopOnNavigate();
                      setOpen(false);
                      setEmployersOpen(false);
                    }}
                    onKeyDown={(event) =>
                      handleMenuItemKeyDown(
                        event,
                        setEmployersOpen,
                        employersTriggerMobileRef,
                      )
                    }
                    className={
                      "flex items-center justify-center gap-3 px-4 py-3 " +
                      getNavLinkClasses("/foremployers/agent", pathname, true)
                    }
                    aria-current={
                      isPathActive("/foremployers/agent", pathname, true)
                        ? "page"
                        : undefined
                    }
                  >
                    <Image
                      src={EnabledAgentIcon}
                      alt="Enabled Recruiter AI logo"
                      width={22}
                      height={22}
                      priority
                    />
                    <span className="flex flex-col items-center leading-tight">
                      <span className="text-base font-medium">
                        Enabled Recruiter AI
                      </span>
                      <span className="mt-0.5 text-xs font-normal text-gray-500">
                        AI matching assistant
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/enableacademy"
              onClick={() => setOpen(false)}
              className={
                "block py-2 text-center " +
                getNavLinkClasses("/enableacademy", pathname)
              }
              aria-current={
                isPathActive("/enableacademy", pathname) ? "page" : undefined
              }
            >
              Enabled Academy
            </Link>

            {/* Mobile: globals dropdown */}
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 text-gray-700 hover:text-amber-600 transition-colors"
                aria-haspopup="true"
                aria-expanded={globalsOpen}
                aria-controls="mobile-globals-menu"
                onClick={() => setGlobalsOpen((prev) => !prev)}
                onKeyDown={(event) =>
                  handleMenuTriggerKeyDown(
                    event,
                    globalsOpen,
                    setGlobalsOpen,
                    mobileGlobalsMenuRef,
                  )
                }
                ref={globalsTriggerMobileRef}
              >
                <Image
                  src={regionIcon}
                  alt={regionAlt}
                  width={20}
                  height={20}
                  priority
                  className="mr-1"
                />
                <span>{regionCode}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    globalsOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id="mobile-globals-menu"
                role="menu"
                aria-label="Global options"
                onKeyDown={(event) =>
                  handleMenuKeyDown(
                    event,
                    setGlobalsOpen,
                    globalsTriggerMobileRef,
                  )
                }
                ref={mobileGlobalsMenuRef}
                className={`transition-[max-height] duration-300 overflow-hidden   ${
                  globalsOpen ? "max-h-80" : "max-h-0"
                }`}
              >
                <div className="mt-2  border-6 border-gray-200 w-auto bg-white rounded-2xl shadow-md">
                  {visibleGlobalMenuOptions.map((option, index) => (
                    <div key={option.label}>
                      {option.href ? (
                        <Link
                          href={option.href}
                          target={
                            isExternalHref(option.href) ? "_blank" : undefined
                          }
                          rel={
                            isExternalHref(option.href)
                              ? "noopener noreferrer"
                              : undefined
                          }
                          role="menuitem"
                          onClick={() => {
                            setOpen(false);
                            setGlobalsOpen(false);
                            scrollToTopOnNavigate();
                          }}
                          onKeyDown={(event) =>
                            handleMenuItemKeyDown(
                              event,
                              setGlobalsOpen,
                              globalsTriggerMobileRef,
                            )
                          }
                          className="flex justify-center px-4 py-3 text-base text-gray-700 hover:bg-gray-50"
                        >
                          {option.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => openComingSoonModal(option)}
                          onKeyDown={(event) =>
                            handleMenuItemKeyDown(
                              event,
                              setGlobalsOpen,
                              globalsTriggerMobileRef,
                            )
                          }
                          className="flex w-full justify-center px-4 py-3 text-base text-gray-700 hover:bg-gray-50"
                        >
                          {option.label}
                        </button>
                      )}
                      {index < visibleGlobalMenuOptions.length - 1 ? (
                        <div className="h-px bg-gray-100" aria-hidden="true" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="pt-3 flex justify-center items-center gap-3">
              <Link
                href="https://app.enabledtalent.com/"
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 rounded-4xl text-base font-medium text-slate-900 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center"
              >
                Login
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setIsDemoRequestOpen(true);
                }}
                className="px-4 py-1.5 rounded-4xl text-base font-medium bg-slate-800 text-white hover:bg-white hover:border hover:text-slate-900 transition-colors cursor-pointer inline-flex items-center justify-center border border-transparent"
              >
                Get a demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      <ComingSoonModal
        isOpen={isComingSoonModalOpen}
        onClose={() => setComingSoonModalContent(null)}
        title={comingSoonModalContent?.title}
        description={comingSoonModalContent?.description}
      />
      <DemoRequestModal
        isOpen={isDemoRequestOpen}
        onClose={() => setIsDemoRequestOpen(false)}
        source="header-sign-up"
        title="Request a Sales Demo"
      />
    </header>
  );
}
