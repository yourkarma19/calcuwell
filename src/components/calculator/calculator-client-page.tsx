
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import PlaceholderCalculator from "@/components/calculator/placeholder-calculator";
import type { Calculator } from "@/lib/types";

interface CalculatorClientPageProps {
  calculator: Omit<Calculator, "component">;
}

const CalculatorLoader = dynamic(
  () => import("@/components/calculator/calculator-loader"),
  {
    loading: () => <PlaceholderCalculator />,
    ssr: false,
  },
);

export default function CalculatorClientPage({
  calculator,
}: CalculatorClientPageProps) {
  const [aboutProps, setAboutProps] = useState({});

  return (
    <CalculatorWrapper calculator={calculator}>
        <CalculatorLoader
          slug={calculator.slug}
          setAboutProps={setAboutProps}
          calculatorName={calculator.name}
        />
    </CalculatorWrapper>
  );
}
