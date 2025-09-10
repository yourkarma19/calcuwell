
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
        url: "https://calcpro.online/og-image.png", // It's recommended to create and add an actual OG image
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
      "Fast, accurate online calculators for finance, health, math, and more.",
    // creator: '@yourtwitterhandle', // Optional: Add your Twitter handle
    images: ["https://calcpro.online/og-image.png"], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = btoa(crypto.randomUUID());
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        </noscript>
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
