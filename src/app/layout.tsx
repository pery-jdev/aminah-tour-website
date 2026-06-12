import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Navbar1 } from "@/components/ui/navbar-1";
import Footer from "@/components/Footer";
import GlobalSpotlight from "@/components/GlobalSpotlight";
import LayoutWrapper from "@/components/LayoutWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Aminah Tour Jepara - Haji & Umrah Premium",
  description: "Biro perjalanan Haji dan Umrah terpercaya, melayani sepenuh hati dengan mengutamakan kenyamanan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} ${notoArabic.variable} antialiased flex flex-col min-h-screen`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
