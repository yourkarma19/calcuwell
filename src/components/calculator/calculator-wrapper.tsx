"use client";

import type { ReactNode } from "react";
import type { Calculator } from "@/lib/types";
import FormulaExplainer from "./formula-explainer";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/calculators";
import React from 'react';

interface CalculatorWrapperProps {
  children: (setFormula: (formula: string) => void) => ReactNode;
  calculator: Omit<Calculator, 'component'>;
}

export default function CalculatorWrapper({
  children,
  calculator,
}: CalculatorWrapperProps) {
  const category = categories.find(c => c.name === calculator.category);
  const [formula, setFormula] = React.useState(calculator.formula || "No formula available.");

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
          <Icon name={calculator.iconName} className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {calculator.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
          {calculator.description}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
        {children(setFormula)}
        <div className="hidden lg:block lg:col-span-1 lg:sticky top-24 no-print">
           <FormulaExplainer 
            calculatorName={calculator.name}
            formula={formula}
          />
        </div>
      </div>
    </div>
  );
}
