"use client";

import { useState } from "react";
import CalculatorContent from "@/components/calculator/calculator-content";
import CalculatorLoader from "@/components/calculator/calculator-loader";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import type { Calculator } from "@/lib/types";

interface CalculatorClientPageProps {
  calculator: Omit<Calculator, "component">;
}

export default function CalculatorClientPage({
  calculator,
}: CalculatorClientPageProps) {
  const [aboutProps, setAboutProps] = useState({});

  return (
    <CalculatorWrapper
      calculator={calculator}
      sidebar={<CalculatorContent slug={`about/${calculator.slug}`} {...aboutProps} />}
    >
      <CalculatorLoader
        slug={calculator.slug}
        setAboutProps={setAboutProps}
        calculatorName={calculator.name}
      />
    </CalculatorWrapper>
  );
}
