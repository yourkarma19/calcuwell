import type { ReactNode } from "react";
import type { Calculator } from "@/lib/types";
import FormulaExplainer from "./formula-explainer";

interface CalculatorWrapperProps {
  children: ReactNode;
  calculator: Calculator;
}

export default function CalculatorWrapper({
  children,
  calculator,
}: CalculatorWrapperProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {calculator.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {calculator.description}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">{children}</div>
        <div className="lg:col-span-1 lg:sticky top-24">
           <FormulaExplainer 
            calculatorName={calculator.name}
            formula={calculator.formula || "No formula available."}
          />
        </div>
      </div>
    </div>
  );
}
