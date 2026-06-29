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
  title: "Sheersh Atrishi · Engineer & Builder",
  description:
    "The cinematic portfolio of Sheersh Atrishi, software developer and AI strategist. Built across Audena, Cavebeat, and beyond.",
  metadataBase: new URL("https://sheersh03.github.io/sheersh-portfolio"),
  openGraph: {
    title: "Sheersh Atrishi · Engineer & Builder",
    description:
      "A cinematic, Marvel-homage portfolio. Intro sequence, character reels, an Infinity-Stone scroll, and a full post-credits scene. Built, not generated.",
    type: "website",
    url: "https://sheersh03.github.io/sheersh-portfolio/",
    images: [
      {
        url: "https://sheersh03.github.io/sheersh-portfolio/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sheersh Atrishi, cinematic portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheersh Atrishi · Engineer & Builder",
    description:
      "A cinematic, Marvel-homage portfolio with a post-credits scene. Built, not generated.",
    images: ["https://sheersh03.github.io/sheersh-portfolio/og.jpg"],
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
