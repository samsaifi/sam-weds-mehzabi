import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Dancing_Script,
  Great_Vibes,
  Lora,
  Noto_Nastaliq_Urdu,
  Noto_Serif_Devanagari,
  Playfair_Display,
} from "next/font/google";
import { loadInvitationConfig } from "./data/load-config";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const dancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dancing",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-calligraphic",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-urdu",
});

const notoHindi = Noto_Serif_Devanagari({
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari"],
  variable: "--font-hindi",
});

export function generateMetadata(): Metadata {
  const config = loadInvitationConfig();
  return {
    title: config.meta.title,
    description: config.meta.description,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${dancingScript.variable} ${cormorantGaramond.variable} ${playfairDisplay.variable} ${lora.variable} ${notoUrdu.variable} ${notoHindi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f9f7f1] text-[#27331f]">
        {children}
      </body>
    </html>
  );
}
