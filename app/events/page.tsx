import type { Metadata } from "next";
import EventsHero from "@/components/events/events-hero";
import EventsSection from "@/components/events/events-section";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Events | Enabled Talent",
  description:
    "Discover Enabled Talent events focused on inclusive hiring, training, and community building.",
};

export default function EventsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="events-page">
      <ScrollToTop />
      <EventsHero />
      <EventsSection />
    </main>
  );
}
