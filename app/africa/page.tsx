import type { Metadata } from "next";
import AfricaLandingPage from "@/components/Africa/AfricaLandingPage";

export const metadata: Metadata = {
  title: "Enabled Africa | Enabled Talent",
  description:
    "Enabled Africa connects talent, employers, skills, and inclusive opportunity across the continent.",
};

export default function AfricaPage() {
  return <AfricaLandingPage />;
}
