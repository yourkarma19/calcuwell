
"use client";

import { ChevronRight, icons } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from 'react';
import type { ReactNode } from "react";
import CalculatorContent from "./calculator-content";
import EmbedCalculator from "./embed-calculator";
import { categories } from "@/lib/calculators";
import type { Calculator } from "@/lib/types";


interface CalculatorWrapperProps {
  children: ReactNode;
  calculator: Omit<Calculator, 'component'>;
}

export default function CalculatorWrapper({
  children,
  calculator,
}: CalculatorWrapperProps) {
  const category = categories.find(c => c.name === calculator.category);
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';

  const LucideIcon = icons[calculator.iconName as keyof typeof icons] || icons.Calculator;
  
  const [childProps, setChildProps] = React.useState({});

  const EnhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const newProps = {
        ...child.props,
        setChildProps,
        calculatorName: calculator.name, // Pass down the calculator name
      };
      
      return React.cloneElement(child, newProps);
    }
    return child;
  });

  if (isEmbed) {
    return (
        <div className="p-2">
             <div className="grid grid-cols-1 gap-8 items-start max-w-5xl mx-auto">
                {EnhancedChildren}
            </div>
        </div>
    )
  }

  return (
    <>
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
          {EnhancedChildren}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-3 space-y-6">
            <CalculatorContent slug={calculator.slug} {...childProps} />
            <EmbedCalculator slug={calculator.slug} />
          </div>
        </div>
      </div>
    </>
  );
}
