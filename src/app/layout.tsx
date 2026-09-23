import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Eytan David Turgeman",
  description: "Head of Operations, AI systems and business strategy.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Eytan David Turgeman",
    description: "Head of Operations · AI Systems · Business Strategy",
    type: "website",
    images: [{ url: "/media/eytan-hero.jpg" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${rubik.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
