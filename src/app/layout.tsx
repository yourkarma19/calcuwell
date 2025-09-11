
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { headers } from 'next/headers';
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calcpro.online"),
  title: "CalcPro: Your Free Online Calculator Hub",
  description:
    "Your free hub for fast, accurate online calculators. Solve complex problems in finance, health, math, and more with our easy-to-use tools.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CalcPro: Your Free Online Calculator Hub",
    description:
      "Fast, accurate online calculators for finance, health, math, and more.",
    url: "https://calcpro.online",
    siteName: "CalcPro",
    images: [
      {
        url: "https://calcpro.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "CalcPro Logo and Calculator Montage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcPro: Your Free Online Calculator Hub",
    description:
      "Fast, accurate online calculators for finance, health, and more.",
    images: ["https://calcpro.online/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = headers().get('x-nonce') || '';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17483796549"></script>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-17483796549');
        `}} />
        <script
          nonce={nonce}
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1952235305826490"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased flex flex-col",
          inter.variable,
          spaceGrotesk.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
