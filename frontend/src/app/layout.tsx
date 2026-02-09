import type { Metadata } from "next";
import { Zen_Old_Mincho, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen-old-mincho",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Diary - Modern Literati",
  description: "A refined diary written by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${zenOldMincho.variable} ${cormorantGaramond.variable} ${inter.variable} antialiased bg-paper text-ink-800`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9B4LQQSW56"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9B4LQQSW56');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
