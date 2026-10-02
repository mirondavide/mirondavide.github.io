import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

const description = "Founder & CEO of Searchbase · turning data into intelligence.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mirondavide.com"),
  title: "Davide Miron",
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Davide Miron",
    description,
    url: "https://mirondavide.com",
    siteName: "Davide Miron",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Davide Miron",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <head>
        {/* Progressive enhancement: with JS disabled, hide the empty canvas and
            render the name as chrome text so nothing is lost. */}
        <noscript>
          <style>{`.particles{display:none!important}.name .ln{background:linear-gradient(174deg,#fff 0%,#a8acb9 40%,#f5f6f9 55%,#999dac 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.nav,.eyebrow,.tagline,.link,.status,.rail{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
