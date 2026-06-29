import type { Metadata } from "next";
import {
  Saira_Condensed,
  Bebas_Neue,
  Cinzel,
  Manrope,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const title = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

// Tall condensed poster face — closest free stand-in for the trademarked MCU
// title font (taller/narrower than Anton, heavy 700/800 for blockbuster weight)
const impact = Saira_Condensed({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-impact",
  display: "swap",
});

const serif = Cinzel({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sheersh Atrishi — Engineer & Builder",
  description:
    "The cinematic portfolio of Sheersh Atrishi — software developer and AI strategist. Built across Audena, Cavebeat, and beyond.",
  metadataBase: new URL("https://sheersh03.github.io/sheersh-portfolio"),
  openGraph: {
    title: "Sheersh Atrishi — Engineer & Builder",
    description:
      "Software developer + AI strategist. A career in Phases — from foundations to Cavebeat to Audena.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${title.variable} ${impact.variable} ${serif.variable} ${body.variable} ${display.variable}`}
    >
      <body className="grain">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
