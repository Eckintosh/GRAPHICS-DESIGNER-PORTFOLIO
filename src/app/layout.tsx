import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arjun Mehta — Graphic Designer & Brand Strategist",
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
  authors: [{ name: "Arjun Mehta" }],
  openGraph: {
    title: "Arjun Mehta — Graphic Designer",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[Inter,ui-sans-serif,system-ui,sans-serif]">
        {children}
      </body>
    </html>
  );
}
