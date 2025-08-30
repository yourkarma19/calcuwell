
"use client";

import { ChevronRight, icons } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { Toaster } from "../ui/toaster";
import EmbedCalculator from "./embed-calculator";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { categories } from "@/lib/calculators";
import type { Calculator } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CalculatorWrapperProps {
  children: ReactNode;
  sidebar: ReactNode;
  calculator: Omit<Calculator, "component">;
}

export default function CalculatorWrapper({
  children,
  sidebar,
  calculator,
}: CalculatorWrapperProps) {
  const category = categories.find((c) => c.name === calculator.category);
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("embed") === "true";

  const LucideIcon =
    icons[calculator.iconName as keyof typeof icons] || icons.Calculator;

  if (isEmbed) {
    return (
      <div className="bg-background font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="p-2">
            <div className="grid grid-cols-1 gap-8 items-start max-w-5xl mx-auto">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {category && (
        <div className="mb-4 text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/categories/${category.slug}`}
            className="hover:text-primary"
          >
            {category.name}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{calculator.name}</span>
        </div>
      )}
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
          <LucideIcon className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {calculator.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
          {calculator.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
        <main className="lg:col-span-2">{children}</main>
        <aside className="space-y-6 lg:sticky lg:top-24">
          {sidebar}
          <EmbedCalculator slug={calculator.slug} />
        </aside>
      </div>
    </div>
  );
}
