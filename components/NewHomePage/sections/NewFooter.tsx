"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaTiktok, FaInstagram } from 'react-icons/fa';
import { Group2 } from '@/components/NewHomePage/graphics';
import DemoRequestModal from '@/components/DemoRequestModal';
import ContactUsModal from '@/components/footer/ContactUsModal';
import FooterComingSoonModal from '@/components/footer/FooterComingSoonModal';

const DEFAULT_COMING_SOON_DESCRIPTION = "This section is currently in progress. Please check back soon for updates.";

const NewFooter = () => {
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [comingSoonItem, setComingSoonItem] = useState<{ title: string; description: string } | null>(null);

  // Helper for consistent link styling and behavior
  const renderLink = (label: string, href?: string, target?: string) => {
    const baseClass = "hover:text-white transition-colors block text-[14px] text-left w-full bg-transparent border-none p-0 cursor-pointer font-medium";
    
    if (label === "Connect With Us") {
      return (
        <button 
          onClick={() => setIsContactUsOpen(true)}
          className={baseClass}
        >
          {label}
        </button>
      );
    }

    if (href) {
      return (
        <Link 
          href={href} 
          target={target} 
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={baseClass.replace("cursor-pointer", "")}
        >
          {label}
        </Link>
      );
    }

    // Default to coming soon behavior
    return (
      <button 
        onClick={() => setComingSoonItem({ title: `${label} - Coming Soon`, description: DEFAULT_COMING_SOON_DESCRIPTION })}
        className={baseClass}
      >
        {label}
      </button>
    );
  };

  return (
    <footer className="relative bg-[rgba(15,20,26,1)] text-white pt-24" aria-label="Site footer">
      {/* Background Image Overlay - Positioned slightly above top edge */}
      <div className="absolute -top-20 inset-x-0 bottom-0 z-0 pointer-events-none">
        <Group2 className="h-full w-full opacity-100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" />
      </div>

      <div className="max-w-[1120px] mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <Link href="/" className="flex items-center justify-center md:justify-start gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M16 0C24.8365 0 31.9999 7.1636 32 16C32 24.8365 24.8365 32 16 32C7.16354 31.9999 0 24.8365 0 16C8.17349e-05 7.1636 7.1636 3.64927e-05 16 0ZM16 2.14062C8.34571 2.14066 2.14071 8.34577 2.14062 16C2.14062 23.6543 8.34566 29.8593 16 29.8594C16.6371 29.8594 17.2641 29.8154 17.8783 29.7321C16.9491 29.293 16.1582 28.7347 15.4917 28.0843C13.9939 26.6226 13.215 24.7866 12.8259 23.0586C12.4371 21.3317 12.4239 19.653 12.5017 18.4225C12.5264 18.0313 12.5606 17.6815 12.596 17.385C11.6334 17.0437 10.831 16.5815 10.1691 16.0307C9.07 15.1161 8.41726 14.0106 8.03737 12.9659C7.66006 11.9282 7.5472 10.9398 7.52566 10.2199C7.51486 9.85749 7.52697 9.55549 7.5424 9.33931C7.55017 9.23097 7.55869 9.1432 7.56583 9.07977C7.56943 9.04811 7.5728 9.02217 7.57531 9.0028C7.57657 8.99326 7.57777 8.98526 7.57869 8.9788C7.57914 8.97554 7.57943 8.97229 7.57977 8.96989C7.57994 8.96874 7.58023 8.96749 7.58034 8.96651L7.58091 8.96543C7.5852 8.96543 7.65211 8.97491 8.72377 9.13503L9.8672 9.30469L9.86326 9.33931C9.85943 9.37343 9.85354 9.42931 9.84823 9.50389C9.83749 9.65377 9.82829 9.87691 9.83651 10.1507C9.85303 10.7037 9.94 11.4337 10.2098 12.1758C10.4772 12.911 10.9196 13.6473 11.6479 14.2534C12.3735 14.8571 13.4441 15.3826 15.0502 15.6049L15.207 15.6273C18.4833 16.116 20.515 17.5481 21.7294 18.9353C22.3381 19.6307 22.7288 20.3004 22.9699 20.8053C23.0905 21.0578 23.1745 21.2705 23.2299 21.4269C23.2577 21.5051 23.2788 21.5699 23.2935 21.6183C23.3008 21.6423 23.3063 21.6626 23.3108 21.6786C23.3131 21.6866 23.3154 21.6939 23.317 21.6998C23.3177 21.7026 23.3186 21.7053 23.3192 21.7076C23.3195 21.7087 23.3195 21.7099 23.3198 21.7109L23.3203 21.7126C23.3193 21.7137 23.283 21.7235 22.202 22.0039C21.1124 22.2866 21.0837 22.2949 21.0831 22.2958L21.0837 22.2969C21.0839 22.2977 21.0841 22.2985 21.0843 22.2991C21.0845 22.3001 21.0841 22.3012 21.0843 22.3019C21.0837 22.2997 21.083 22.2957 21.0815 22.2907C21.0765 22.2743 21.0668 22.2433 21.0513 22.1998C21.0203 22.1122 20.9666 21.9745 20.8839 21.8013C20.7182 21.4543 20.4377 20.9697 19.9899 20.4582C19.1243 19.4693 17.5818 18.3185 14.8633 17.9135C14.8429 18.1114 14.8236 18.3312 14.8086 18.5686C14.7393 19.6669 14.7569 21.1093 15.0815 22.5508C15.4058 23.9914 16.0223 25.3721 17.106 26.4297C18.1472 27.4458 19.7071 28.2472 22.0971 28.4481C26.6942 26.1922 29.8594 21.4663 29.8594 16C29.8593 8.34571 23.6543 2.14062 16 2.14062ZM16.1043 4.86328C17.8044 4.86331 19.2904 5.77583 20.101 7.1328L20.1774 7.2656L20.1881 7.28514L20.1981 7.30526L20.2243 7.3616C20.3467 7.64549 20.3233 7.92229 20.2606 8.11829C20.2002 8.30686 20.0703 8.52766 19.8354 8.68583L19.7869 8.71651L19.7433 8.74274L16.7823 10.1574L15.8594 8.22543L17.5129 7.43583C17.1107 7.16303 16.626 7.00394 16.1043 7.00389C14.3766 7.00389 13.0306 8.74846 13.8321 10.6429L13.8717 10.7333V10.7338L13.9124 10.817C14.1105 11.2019 14.4301 11.5185 14.8209 11.7159L14.9057 11.7561L14.9062 11.7567L14.9871 11.7918C16.6913 12.5061 18.2648 11.4841 18.5642 10.0223L20.6613 10.4514C20.0933 13.2254 17.0635 15.0759 14.0274 13.7082C13.1026 13.2921 12.3505 12.552 11.9258 11.6239C10.3759 8.24023 12.831 4.86328 16.1043 4.86328ZM9.86777 9.30354L9.8672 9.30469L9.86777 9.30189C9.86771 9.30229 9.86783 9.30297 9.86777 9.30354Z" fill="url(#paint0_linear_footer)" />
              <defs>
                <linearGradient id="paint0_linear_footer" x1="2.89128" y1="12.7703" x2="34.1432" y2="20.1796" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C0412C" />
                  <stop offset="1" stopColor="#F4C15D" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">EnabledTalent</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-12 mb-16 md:mb-24">
          <div>
            <h4 className="text-[18px] md:text-[20px] font-bold mb-6 md:mb-8 text-white">Products</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400 font-medium">
              <li>{renderLink("For Talent", "/fortalents")}</li>
              <li>{renderLink("For Employers", "/foremployers")}</li>
              <li>{renderLink("For Universities")}</li>
              <li>{renderLink("For Governments")}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] md:text-[20px] font-bold mb-6 md:mb-8 text-white">Our initiatives</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400 font-medium">
              <li>{renderLink("Enabled Veterans")}</li>
              <li>{renderLink("ENABLE Canada Tour", "https://enablecanada.ca/", "_blank")}</li>
              <li>{renderLink("Enabled Foundation")}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] md:text-[20px] font-bold mb-6 md:mb-8 leading-tight text-white">Research, Policy & Knowledge</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400 font-medium">
              <li>{renderLink("Case Studies")}</li>
              <li>{renderLink("Guides")}</li>
              <li>{renderLink("Reports")}</li>
              <li>{renderLink("Webinars", "/events")}</li>
              <li>{renderLink("News & Insights", "/blogs")}</li>
              <li>{renderLink("Articles & Interviews")}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] md:text-[20px] font-bold mb-6 md:mb-8 text-white">Regional Platforms</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400 font-medium">
              <li>{renderLink("United States")}</li>
              <li>{renderLink("Africa", "/africa")}</li>
              <li>{renderLink("Spain")}</li>
              <li>{renderLink("Saudi Arabia")}</li>
              <li>{renderLink("Qatar")}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[18px] md:text-[20px] font-bold mb-6 md:mb-8 text-white">Company</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400 font-medium">
              <li>{renderLink("About Enabled Talent", "/about-us")}</li>
              <li>{renderLink("Partner With Us")}</li>
              <li>{renderLink("Careers", "/careers")}</li>
              <li>{renderLink("Connect With Us")}</li>
            </ul>
          </div>
        </div>

        <div className="pt-16 md:pt-32 mt-8 pb-10">
          <nav aria-label="Social media links">
            <ul className="flex justify-center md:justify-start gap-6 mb-6 text-slate-400">
              <li><Link href="https://www.facebook.com/people/Enabled-Talent/61586279129466/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook"><FaFacebookF className="w-5 h-5" /></Link></li>
              <li><Link href="https://www.linkedin.com/company/enabledtalent/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn"><FaLinkedinIn className="w-5 h-5" /></Link></li>
              <li><Link href="https://www.tiktok.com/@enabledtalent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="TikTok"><FaTiktok className="w-5 h-5" /></Link></li>
              <li><Link href="https://www.instagram.com/enabledtalent/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram"><FaInstagram className="w-5 h-5" /></Link></li>
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-sm font-bold mb-6">
              <li><Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/accessibility-policy" className="hover:text-slate-300 transition-colors">Accessibility Policy</Link></li>
              <li><Link href="/responsible-ai" className="hover:text-slate-300 transition-colors">Responsible AI</Link></li>
              <li><Link href="/terms-of-use" className="hover:text-slate-300 transition-colors">Terms of Use</Link></li>
            </ul>
          </nav>

          <p className="text-sm text-slate-400 text-center md:text-left">© {new Date().getFullYear()} EnabledTalent. All rights reserved.</p>
        </div>
      </div>

      <FooterComingSoonModal 
        isOpen={!!comingSoonItem}
        onClose={() => setComingSoonItem(null)}
        title={comingSoonItem?.title || "Coming Soon"}
        description={comingSoonItem?.description || DEFAULT_COMING_SOON_DESCRIPTION}
      />
      <ContactUsModal 
        isOpen={isContactUsOpen} 
        onClose={() => setIsContactUsOpen(false)} 
        source="new-footer-connect"
        title="Connect With Us"
      />
      <DemoRequestModal 
        isOpen={isDemoRequestOpen} 
        onClose={() => setIsDemoRequestOpen(false)} 
        source="new-footer-sales"
        title="Request a Sales Demo"
      />
    </footer>
  );
};

export default NewFooter;
