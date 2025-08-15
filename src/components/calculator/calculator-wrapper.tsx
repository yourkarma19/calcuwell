import type { ReactNode } from "react";
import type { Calculator } from "@/lib/types";
import FormulaExplainer from "./formula-explainer";
import { Icon } from "@/components/ui/icon";

interface CalculatorWrapperProps {
  children: ReactNode;
  calculator: Omit<Calculator, 'component'>;
}

export default function CalculatorWrapper({
  children,
  calculator,
}: CalculatorWrapperProps) {
  return (
    <div className="container mx-auto px-4 py-8">
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
        {children}
        <div className="hidden lg:block lg:col-span-1 lg:sticky top-24">
           <FormulaExplainer 
            calculatorName={calculator.name}
            formula={calculator.formula || "No formula available."}
          />
        </div>
      </div>
    </div>
  );
}
