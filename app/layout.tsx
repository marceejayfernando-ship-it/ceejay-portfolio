import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const SITE_URL = "https://ceejay-portfolio.vercel.app";
const TITLE = "Ceejay Fernando | Quality Engineering & Automation";
const DESCRIPTION =
  "Quality Engineering Analyst specializing in manual and functional testing, Playwright, Tricentis Tosca, and AI-powered automation workflows.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Chona Fernando",
  },
  description: DESCRIPTION,
  keywords: [
    "Quality Engineering Analyst",
    "Manual Testing",
    "Functional Testing",
    "Regression Testing",
    "UAT",
    "Test Automation",
    "Playwright",
    "Tricentis Tosca",
    "SAP Testing",
    "PeopleSoft Testing",
    "AI Automation",
    "n8n",
    "GoHighLevel",
    "QA Analyst",
  ],
  authors: [{ name: "Chona \"CJ\" Fernando" }],
  creator: "Chona \"CJ\" Fernando",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Ceejay Fernando Portfolio",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 1200,
        alt: "Chona Fernando",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/profile.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
