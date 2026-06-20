import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eckintosh — Graphic Designer & Brand Strategist",
  description:
    "Freelance graphic designer crafting logos, brand systems, brochures and digital experiences for startups and studios across the globe.",
  keywords: [
    "graphic designer",
    "brand identity",
    "logo design",
    "packaging",
    "brochure",
    "social media design",
    "freelance designer",
  ],
  authors: [{ name: "Eckintosh" }],
  openGraph: {
    title: "Eckintosh — Graphic Designer",
    description:
      "Designing brands that feel alive. Freelance graphic designer with 8+ years of experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sora.className}>
        {children}
      </body>
    </html>
  );
}
