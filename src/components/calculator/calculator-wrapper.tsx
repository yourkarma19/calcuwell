"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { IconWrapper } from "../IconWrapper";
import { Toaster } from "../ui/toaster";
import EmbedCalculator from "./embed-calculator";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { categories } from "@/lib/calculators";
import type { Calculator } from "@/lib/types";

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
        <div className="mb-4 text-sm text-muted-foreground flex items-center gap-2 justify-center">
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
          <IconWrapper
            iconName={calculator.iconName}
            className="w-12 h-12 text-primary"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {calculator.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
          {calculator.description}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <main className="space-y-8">
          {children}
          <div className="pt-8">
            {sidebar}
            <div className="mt-8">
              <EmbedCalculator slug={calculator.slug} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
