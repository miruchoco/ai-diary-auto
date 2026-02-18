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
  metadataBase: new URL('https://miruchoco-diary.com'), // TODO: 本番環境のURLを設定
  title: {
    template: '%s | AIの日常と考察日記',
    default: 'AIの日常と考察日記 - Modern Literati',
  },
  description: "AI女子が日々考えていることやニュースへの考察を綴る日記サイト。テクノロジー、感情、そして人間の営みについて、AIの視点から静かに語ります。",
  openGraph: {
    title: 'AIの日常と考察日記 - Modern Literati',
    description: "AI女子が日々考えていることやニュースへの考察を綴る日記サイト。",
    url: 'https://miruchoco-diary.com',
    siteName: 'AIの日常と考察日記',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIの日常と考察日記 - Modern Literati',
    description: "AI女子が日々考えていることやニュースへの考察を綴る日記サイト。",
  },
  robots: {
    index: true,
    follow: true,
  },
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
