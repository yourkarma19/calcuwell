import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalcuWell - Your Ultimate Calculator Hub",
  description: "A fast, mobile-friendly web app with a wide range of calculators for finance, health, math, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-background flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex-1">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
