"use client";

import { useSearchParams } from "next/navigation";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import { CalculatorMap } from "@/components/calculator/calculator-map";
import PlaceholderCalculator from "@/components/calculator/placeholder-calculator";
import type { Calculator } from "@/lib/types";

interface CalculatorClientPageProps {
  calculator: Omit<Calculator, "component">;
}

export default function CalculatorClientPage({
  calculator,
}: CalculatorClientPageProps) {
  const searchParams = useSearchParams();
  const CalculatorComponent = CalculatorMap[calculator.slug];

  return (
    <CalculatorWrapper calculator={calculator}>
      {CalculatorComponent ? (
        <CalculatorComponent
          calculatorName={calculator.name}
          searchParams={searchParams}
        />
      ) : (
        <PlaceholderCalculator />
      )}
    </CalculatorWrapper>
  );
}
