import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "../components/SmoothScrolling";
import ThemeContextProvider from "../context/theme-context";
import ActiveSectionContextProvider from "../context/active-section-context";
import CustomCursor from "../components/CustomCursor";
import ThemeToggle from "../components/ThemeToggle";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "muralidharan.io",
  description:
    "Muralidharan K - Full Stack Developer / SharePoint Developer | Microsoft 365, SPFx & Power Platform Specialist",
  icons: {
    icon: [
      { url: "/tablogo.png?v=4", type: "image/png" },
      { url: "/favicon.ico?v=4" },
    ],
    shortcut: "/tablogo.png?v=4",
    apple: "/tablogo.png?v=4",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <CustomCursor />
            <SmoothScrolling>{children}</SmoothScrolling>
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
