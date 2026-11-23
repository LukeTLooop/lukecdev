import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lukec.dev"),
  title: "Lukeyy | Roblox scripter",
  description:
    "Lukeyy is a Roblox scripter building movement, combat and physics systems: grappling, wall climbing, custom character controllers and more.",
  openGraph: {
    title: "Lukeyy | Roblox scripter",
    description:
      "Movement, combat and physics systems for Roblox games. Available for commissions.",
    url: "https://lukec.dev",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0a1c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-strong focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
