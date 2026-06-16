import type { Metadata } from "next";
import { Inter, Heebo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eytan Turgeman | AI Solutions Developer & Marketing Strategist",
  description:
    "AI Solutions Developer with marketing strategy background. Python, JavaScript, GCP, PPC, and team leadership.",
  openGraph: {
    title: "Eytan Turgeman | CV",
    description: "AI · Marketing · Leadership",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" className={`${inter.variable} ${heebo.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-[#0a0a0f] font-sans antialiased">{children}</body>
    </html>
  );
}
