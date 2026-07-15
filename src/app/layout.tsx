import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Selenite Soul — Vedic Kundali & Healing Crystals",
  description:
    "Discover your Vedic birth chart, planetary positions, Vimshottari Dasha, yogas, and personalized crystal remedies aligned for your soul. Ancient Jyotish wisdom, beautifully designed.",
  keywords: [
    "vedic astrology",
    "kundali",
    "birth chart",
    "jyotish",
    "crystals",
    "healing stones",
    "selenite",
    "gemstone",
    "horoscope",
    "nakshatra",
    "dasha",
  ],
  authors: [{ name: "Selenite Soul" }],
  creator: "Selenite Soul",
  openGraph: {
    title: "Selenite Soul — Vedic Kundali & Healing Crystals",
    description:
      "Generate your accurate sidereal Vedic birth chart and discover crystal remedies aligned with your planetary positions.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Selenite Soul — Vedic Kundali & Healing Crystals",
    description:
      "Generate your accurate sidereal Vedic birth chart and discover crystal remedies.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0a0618",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
