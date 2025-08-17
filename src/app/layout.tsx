
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";
import Script from "next/script";
import { headers } from 'next/headers';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calcpro.online"),
  title: "CalcPro - Your Ultimate Calculator Hub",
  description: "CalcPro is your free, all-in-one online calculator hub. Quickly solve problems in finance, health, math, and more with our fast, accurate, and easy-to-use tools.",
  alternates: {
    canonical: '/',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const searchParams = new URLSearchParams(headersList.get('x-search-params') || '');
  const isEmbed = searchParams.get('embed') === 'true';

  if (isEmbed) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased bg-transparent`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DNV4NPYV0F"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-DNV4NPYV0F');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased min-h-screen bg-background flex flex-col`}
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
