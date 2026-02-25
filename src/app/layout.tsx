import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/elements/Hero";
import { Footer } from "@/components/footer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rice Leaf Disease Detection | AI-Powered Crop Health Analysis",
  description: "Upload rice leaf images and get instant AI-powered disease detection with detailed reports, confidence scores, and preventive recommendations for smarter farming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} dark antialiased`}>
        <Header />
        {children}
        <div className="mt-20">
        <Footer />
      </div>
      </body>
    </html>
  );
}