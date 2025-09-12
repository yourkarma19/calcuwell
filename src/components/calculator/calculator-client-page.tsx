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

  const AboutComponent = dynamic(
    () => import(`@/components/calculator/about/${calculator.slug}`),
    {
      loading: () => <div className="space-y-6">
        <PlaceholderCalculator />
        <PlaceholderCalculator />
      </div>,
      ssr: false,
    },
  );

  const sidebar = calculator.slug === 'sip-calculator' ? null : <AboutComponent {...aboutProps} />;

  return (
    <CalculatorWrapper
      calculator={calculator}
      sidebar={sidebar}
    >
      <CalculatorLoader
        slug={calculator.slug}
        setAboutProps={setAboutProps}
        calculatorName={calculator.name}
      />
    </CalculatorWrapper>
  );
}
