import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import AppShell from "@/components/AppShell";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Enabled Talent",
  description:
    "Enabled Talent is an inclusive career platform connecting people with disabilities to accessible jobs, skills training, and supportive employers worldwide.",
  icons: {
    icon: "/logo/ET-Logo-01.ico",
    apple: "/logo/ET-Logo-01.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable}  antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
