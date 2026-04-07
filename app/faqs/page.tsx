import type { Metadata } from "next";
import FaqAccordion from "@/components/faqs/FaqAccordion";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
    title: "FAQ | Enabled Talent",
    description: "Frequently Asked Questions about Enabled Talent.",
};

export default function FaqPage() {
    return (
        <main id="main-content" tabIndex={-1} className="bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
            <ScrollToTop />
            <FaqAccordion />
        </main>
    );
}
