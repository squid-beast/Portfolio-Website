import type { Metadata, Viewport } from "next";
import { DM_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { profile, siteUrl } from "@/content/site";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const title = `${profile.name} · Software Engineer`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  openGraph: {
    type: "profile",
    title,
    description: profile.description,
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    firstName: "Lohith Kumar",
    lastName: "Neerukonda",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
    creator: "@startwithleo",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3ecdd",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hanken.variable} ${dmMono.variable}`}>
      <body className="bg-sky text-fg font-body antialiased">{children}</body>
    </html>
  );
}
