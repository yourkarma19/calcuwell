
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import CalculatorContent from "@/components/calculator/calculator-content";
import CalculatorLoader from "@/components/calculator/calculator-loader";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import PlaceholderCalculator from "@/components/calculator/placeholder-calculator";
import type { Calculator } from "@/lib/types";

interface CalculatorClientPageProps {
  calculator: Omit<Calculator, "component">;
}

export default function CalculatorClientPage({
  calculator,
}: CalculatorClientPageProps) {
  const [aboutProps, setAboutProps] = useState({});

  if (calculator.slug === "sip-calculator") {
    return (
      <CalculatorWrapper calculator={calculator} sidebar={null}>
        <CalculatorLoader
          slug={calculator.slug}
          setAboutProps={setAboutProps}
          calculatorName={calculator.name}
        />
      </CalculatorWrapper>
    );
  }

  const AboutComponent = dynamic(
    () => import(`@/components/calculator/about/${calculator.slug}`),
    {
      loading: () => <PlaceholderCalculator />,
      ssr: false,
    },
  );

  return (
    <CalculatorWrapper
      calculator={calculator}
      sidebar={<AboutComponent {...aboutProps} />}
    >
      <CalculatorLoader
        slug={calculator.slug}
        setAboutProps={setAboutProps}
        calculatorName={calculator.name}
      />
    </CalculatorWrapper>
  );
}
