
"use client";

import type { ReactNode } from "react";
import type { Calculator } from "@/lib/types";
import FormulaExplainer from "./formula-explainer";
import EmbedCalculator from "./embed-calculator";
import Link from "next/link";
import { ChevronRight, icons } from "lucide-react";
import { categories } from "@/lib/calculators";
import React from 'react';
import { useSearchParams } from "next/navigation";
import CalculatorContent from "./calculator-content";


interface CalculatorWrapperProps {
  children: ReactNode;
  calculator: Omit<Calculator, 'component'>;
}

export default function CalculatorWrapper({
  children,
  calculator,
}: CalculatorWrapperProps) {
  const category = categories.find(c => c.name === calculator.category);
  const [formula, setFormula] = React.useState(calculator.formula || "No formula available.");
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';

  const LucideIcon = icons[calculator.iconName as keyof typeof icons] || icons.Calculator;

  // Clone the child element to pass the setFormula function as a prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { setFormula });
    }
    return child;
  });

  if (isEmbed) {
    return (
        <div className="p-2">
             <div className="grid grid-cols-1 gap-8 items-start max-w-5xl mx-auto">
                {childrenWithProps}
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
       {category && (
        <div className="mb-4 text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/categories/${category.slug}`} className="hover:text-primary">{category.name}</Link>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
             {childrenWithProps}
          </div>
        </div>
        <div className="lg:col-span-1 lg:sticky top-24 no-print space-y-6">
           <FormulaExplainer 
            calculatorName={calculator.name}
            formula={formula}
          />
          <EmbedCalculator slug={calculator.slug} />
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-12">
        <CalculatorContent slug={calculator.slug} />
      </div>
    </div>
  );
}
