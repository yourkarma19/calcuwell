import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";
import { cookies } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "CalcuWell - Your Ultimate Calculator Hub",
  description: "A fast, mobile-friendly web app with a wide range of calculators for finance, health, math, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("vite-ui-theme")?.value || "system";

  return (
    <html lang="en" className={theme} style={{colorScheme: theme}} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased min-h-screen bg-background flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
