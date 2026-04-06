import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Microfyxd - Your Personal AI Assistant",
    description:
          "Microfyxd handles the tasks you don't have time for. Phone calls, appointments, paperwork, emails, complaints, and more. Your life, handled.",
    openGraph: {
          title: "Microfyxd - Your Personal AI Assistant",
          description:
                  "Phone calls, appointments, paperwork, emails - handled. Free up your time with Microfyxd.",
          url: "https://microfyxd.com",
          siteName: "Microfyxd",
          type: "website",
    },
    robots: {
          index: true,
          follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly>{
    children: React.ReactNode;
}>) {
    return (
          >html lang="en">
            >body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
{children}
      >/body>
    >/html>
  );
}
