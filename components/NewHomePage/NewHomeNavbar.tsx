'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiArrowRight, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import DemoRequestModal from '@/components/DemoRequestModal';
import ComingSoonModal from '@/components/ComingSoonModal';

type GlobalMenuOption = {
  label: string;
  href?: string;
  comingSoonTitle?: string;
  comingSoonDescription?: string;
};

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

const NewHomeNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState(false);
  const [isGlobalsOpen, setIsGlobalsOpen] = useState(false);
  const [comingSoonContent, setComingSoonContent] = useState<{ title: string; description: string } | null>(null);
  const globalsMenuRef = useRef<HTMLDivElement>(null);

  const isAfrica = pathname === '/africa' || pathname.startsWith('/africa/');
  const currentRegion = isAfrica ? 'AF' : 'CA';
  const regionIcon = isAfrica 
    ? "/images/Header/orange africa map.png" 
    : "/images/Header/canada-flag.png";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (globalsMenuRef.current && !globalsMenuRef.current.contains(event.target as Node)) {
        setIsGlobalsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openComingSoon = (option: GlobalMenuOption) => {
    setComingSoonContent({
      title: option.comingSoonTitle || `${option.label} - Coming Soon`,
      description: option.comingSoonDescription || `We are preparing our ${option.label} page. Coming soon.`
    });
    setIsGlobalsOpen(false);
  };

  const openServiceComingSoon = (service: string) => {
    setComingSoonContent({
      title: `${service} - Coming Soon`,
      description: `We are currently developing specialized solutions for ${service.toLowerCase()}. This feature will be available soon.`
    });
    setIsOpen(false);
  };

  return (
    <div className="absolute left-0 right-0 w-full z-50 px-4 md:px-6" style={{ top: '30px' }}>
      <nav
        className="max-w-[1120px] mx-auto bg-white/95 backdrop-blur-md rounded-[33px] shadow-[0_4px_20.4px_rgba(0,0,0,0.08)] border border-[#E2E2E2]/80 pl-[12px] pr-[6px] flex justify-between items-center h-[57px] relative"
        aria-label="New home page navigation"
      >
        {/* Skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-60 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        {/* Logo and Navigation */}
        <div className="flex-shrink-0 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 md:gap-2.5 hover:opacity-90 transition-opacity" aria-label="Go to home page">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M16 0C24.8365 0 31.9999 7.1636 32 16C32 24.8365 24.8365 32 16 32C7.16354 31.9999 0 24.8365 0 16C8.17349e-05 7.1636 7.1636 3.64927e-05 16 0ZM16 2.14062C8.34571 2.14066 2.14071 8.34577 2.14062 16C2.14062 23.6543 8.34566 29.8593 16 29.8594C16.6371 29.8594 17.2641 29.8154 17.8783 29.7321C16.9491 29.293 16.1582 28.7347 15.4917 28.0843C13.9939 26.6226 13.215 24.7866 12.8259 23.0586C12.4371 21.3317 12.4239 19.653 12.5017 18.4225C12.5264 18.0313 12.5606 17.6815 12.596 17.385C11.6334 17.0437 10.831 16.5815 10.1691 16.0307C9.07 15.1161 8.41726 14.0106 8.03737 12.9659C7.66006 11.9282 7.5472 10.9398 7.52566 10.2199C7.51486 9.85749 7.52697 9.55549 7.5424 9.33931C7.55017 9.23097 7.55869 9.1432 7.56583 9.07977C7.56943 9.04811 7.5728 9.02217 7.57531 9.0028C7.57657 8.99326 7.57777 8.98526 7.57869 8.9788C7.57914 8.97554 7.57943 8.97229 7.57977 8.96989C7.57994 8.96874 7.58023 8.96749 7.58034 8.96651L7.58091 8.96543C7.5852 8.96543 7.65211 8.97491 8.72377 9.13503L9.8672 9.30469L9.86326 9.33931C9.85943 9.37343 9.85354 9.42931 9.84823 9.50389C9.83749 9.65377 9.82829 9.87691 9.83651 10.1507C9.85303 10.7037 9.94 11.4337 10.2098 12.1758C10.4772 12.911 10.9196 13.6473 11.6479 14.2534C12.3735 14.8571 13.4441 15.3826 15.0502 15.6049L15.207 15.6273C18.4833 16.116 20.515 17.5481 21.7294 18.9353C22.3381 19.6307 22.7288 20.3004 22.9699 20.8053C23.0905 21.0578 23.1745 21.2705 23.2299 21.4269C23.2577 21.5051 23.2788 21.5699 23.2935 21.6183C23.3008 21.6423 23.3063 21.6626 23.3108 21.6786C23.3131 21.6866 23.3154 21.6939 23.317 21.6998C23.3177 21.7026 23.3186 21.7053 23.3192 21.7076C23.3195 21.7087 23.3195 21.7099 23.3198 21.7109L23.3203 21.7126C23.3193 21.7137 23.283 21.7235 22.202 22.0039C21.1124 22.2866 21.0837 22.2949 21.0831 22.2958L21.0837 22.2969C21.0839 22.2977 21.0841 22.2985 21.0843 22.2991C21.0845 22.3001 21.0841 22.3012 21.0843 22.3019C21.0837 22.2997 21.083 22.2957 21.0815 22.2907C21.0765 22.2743 21.0668 22.2433 21.0513 22.1998C21.0203 22.1122 20.9666 21.9745 20.8839 21.8013C20.7182 21.4543 20.4377 20.9697 19.9899 20.4582C19.1243 19.4693 17.5818 18.3185 14.8633 17.9135C14.8429 18.1114 14.8236 18.3312 14.8086 18.5686C14.7393 19.6669 14.7569 21.1093 15.0815 22.5508C15.4058 23.9914 16.0223 25.3721 17.106 26.4297C18.1472 27.4458 19.7071 28.2472 22.0971 28.4481C26.6942 26.1922 29.8594 21.4663 29.8594 16C29.8593 8.34571 23.6543 2.14062 16 2.14062ZM16.1043 4.86328C17.8044 4.86331 19.2904 5.77583 20.101 7.1328L20.1774 7.2656L20.1881 7.28514L20.1981 7.30526L20.2243 7.3616C20.3467 7.64549 20.3233 7.92229 20.2606 8.11829C20.2002 8.30686 20.0703 8.52766 19.8354 8.68583L19.7869 8.71651L19.7433 8.74274L16.7823 10.1574L15.8594 8.22543L17.5129 7.43583C17.1107 7.16303 16.626 7.00394 16.1043 7.00389C14.3766 7.00389 13.0306 8.74846 13.8321 10.6429L13.8717 10.7333V10.7338L13.9124 10.817C14.1105 11.2019 14.4301 11.5185 14.8209 11.7159L14.9057 11.7561L14.9062 11.7567L14.9871 11.7918C16.6913 12.5061 18.2648 11.4841 18.5642 10.0223L20.6613 10.4514C20.0933 13.2254 17.0635 15.0759 14.0274 13.7082C13.1026 13.2921 12.3505 12.552 11.9258 11.6239C10.3759 8.24023 12.831 4.86328 16.1043 4.86328ZM9.86777 9.30354L9.8672 9.30469L9.86777 9.30189C9.86771 9.30229 9.86783 9.30297 9.86777 9.30354Z" fill="url(#paint0_linear_nh)" />
              <defs>
                <linearGradient id="paint0_linear_nh" x1="2.89128" y1="12.7703" x2="34.1432" y2="20.1796" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C0412C" />
                  <stop offset="1" stopColor="#F4C15D" />
                </linearGradient>
              </defs>
            </svg>

            <span className="font-sans font-bold text-[16px] tracking-[0.06em] text-[#111827]">
              Enabled<span className="font-normal text-slate-500">Talent</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => openServiceComingSoon("Universities")}
              className="text-[#111827] hover:text-[#E96623] font-medium text-[14px] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              For Universities
            </button>
            <button 
              onClick={() => openServiceComingSoon("Governments")}
              className="text-[#111827] hover:text-[#E96623] font-medium text-[14px] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              For Governments
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="hidden lg:flex items-center" ref={globalsMenuRef}>
            <button 
              onClick={() => setIsGlobalsOpen(!isGlobalsOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors cursor-pointer group"
              aria-haspopup="true"
              aria-expanded={isGlobalsOpen}
            >
              <img 
                src={regionIcon} 
                alt={`${currentRegion} flag`} 
                className="w-[24px] h-auto object-contain rounded-sm shadow-sm"
              />
              <span className="font-bold text-[14px] text-[#111827]">{currentRegion}</span>
              <FiChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isGlobalsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isGlobalsOpen && (
              <div className="absolute top-full right-[200px] mt-2 w-52 bg-white rounded-[20px] shadow-2xl border border-slate-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {GLOBAL_MENU_OPTIONS.map((option) => (
                  option.href ? (
                    <Link
                      key={option.label}
                      href={option.href}
                      onClick={() => setIsGlobalsOpen(false)}
                      className="block px-5 py-3 text-[14px] font-bold text-slate-600 hover:text-[#E96623] hover:bg-slate-50 transition-colors"
                    >
                      {option.label}
                    </Link>
                  ) : (
                    <button
                      key={option.label}
                      onClick={() => openComingSoon(option)}
                      className="block w-full text-left px-5 py-3 text-[14px] font-bold text-slate-600 hover:text-[#E96623] hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {option.label}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden lg:block mx-1"></div>

          <div className="hidden lg:flex items-center">
            <button 
              onClick={() => setIsDemoRequestOpen(true)}
              className="w-[190px] h-[45px] bg-gradient-to-r from-[#183457] to-[#0D3541] hover:opacity-90 text-white font-medium text-[16px] rounded-[31px] transition-all duration-300 flex items-center justify-between pl-6 pr-1 shadow-md hover:shadow-lg active:scale-95 group cursor-pointer"
            >
              Contact Sales
              <div className="w-[39px] h-[39px] bg-black/20 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <FiArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} aria-hidden="true" />
              </div>
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#111827] p-2 focus:outline-none cursor-pointer"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="nh-mobile-menu"
              aria-haspopup="true"
            >
              {isOpen ? <FiX className="w-6 h-6" aria-hidden="true" /> : <FiMenu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <div
              id="nh-mobile-menu"
              className="absolute top-[65px] left-0 right-0 bg-white rounded-[24px] shadow-2xl border border-slate-100 p-6 flex flex-col gap-6 lg:hidden z-[60] origin-top overflow-y-auto max-h-[80vh]"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Navigation</span>
                <button 
                  onClick={() => openServiceComingSoon("Universities")}
                  className="text-left text-[#111827] font-bold text-lg py-3 px-2 border-b border-slate-50 bg-transparent"
                >
                  For Universities
                </button>
                <button 
                  onClick={() => openServiceComingSoon("Governments")}
                  className="text-left text-[#111827] font-bold text-lg py-3 px-2 border-b border-slate-50 bg-transparent"
                >
                  For Governments
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Regions</span>
                <div className="grid grid-cols-2 gap-2">
                  {GLOBAL_MENU_OPTIONS.map((option) => (
                    option.href ? (
                      <Link
                        key={option.label}
                        href={option.href}
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4 bg-slate-50 rounded-xl text-[14px] font-bold text-slate-700 hover:bg-[#E96623]/10 hover:text-[#E96623] transition-colors"
                      >
                        {option.label}
                      </Link>
                    ) : (
                      <button
                        key={option.label}
                        onClick={() => {
                          setIsOpen(false);
                          openComingSoon(option);
                        }}
                        className="py-3 px-4 bg-slate-50 rounded-xl text-left text-[14px] font-bold text-slate-700 hover:bg-[#E96623]/10 hover:text-[#E96623] transition-colors"
                      >
                        {option.label}
                      </button>
                    )
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsDemoRequestOpen(true);
                }}
                className="w-full h-[56px] bg-gradient-to-r from-[#183457] to-[#0D3541] hover:opacity-90 text-white font-bold text-lg rounded-[31px] flex items-center justify-between pl-8 pr-2 transition-all active:scale-95 group cursor-pointer mt-4"
              >
                Contact Sales
                <div className="w-[44px] h-[44px] bg-black/20 rounded-full flex items-center justify-center">
                  <FiArrowRight className="w-6 h-6" aria-hidden="true" />
                </div>
              </button>
            </div>
          </>
        )}

      </nav>

      <DemoRequestModal 
        isOpen={isDemoRequestOpen} 
        onClose={() => setIsDemoRequestOpen(false)} 
        source="new-navbar-sales"
        title="Request a Sales Demo"
      />

      <ComingSoonModal 
        isOpen={!!comingSoonContent} 
        onClose={() => setComingSoonContent(null)}
        title={comingSoonContent?.title}
        description={comingSoonContent?.description}
      />
    </div>
  );
};

export default NewHomeNavbar;
