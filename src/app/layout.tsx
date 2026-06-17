import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Heebo } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eytan Turgeman | AI Solutions Developer & Marketing Strategist",
  description:
    "AI Solutions Developer with marketing strategy background. Python, JavaScript, GCP, PPC, and team leadership.",
  icons: {
    icon: "/icon.svg",
  },
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
    <html lang="en" className={`${jakarta.variable} ${heebo.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-[#0d0d14] font-sans antialiased">{children}</body>
    </html>
  );
}
