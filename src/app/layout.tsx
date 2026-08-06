import type { Metadata, Viewport } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Equilibrium Gaming — A Tier Above",
  description:
    "Equilibrium Gaming — Premium gaming lounge experience in Lahore (Gulberg 3 & Airline Society). Tier 1-3 competitive PC setups, PS5 arena, 24/7 non-stop gaming.",
  keywords: [
    "Equilibrium Gaming",
    "gaming lounge",
    "gaming cafe",
    "Lahore",
    "PC gaming",
    "PS5",
    "EQUI",
    "esports",
    "A Tier Above",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cyber-black text-cyber-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
