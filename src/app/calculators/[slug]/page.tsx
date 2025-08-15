import { notFound } from "next/navigation";
import { Suspense, lazy } from "react";
import type { Metadata } from "next";
import { getCalculatorBySlug } from "@/lib/calculators";
import { calculatorComponents } from "@/lib/calculator-components";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const calculator = getCalculatorBySlug(params.slug);

  if (!calculator) {
    return {};
  }

  return {
    title: `${calculator.name} | CalcuWell`,
    description: calculator.description,
  };
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const calculator = getCalculatorBySlug(params.slug);

  if (!calculator || !(calculator.slug in calculatorComponents)) {
    notFound();
  }

  const CalculatorComponent = calculatorComponents[calculator.slug as keyof typeof calculatorComponents];

  return (
    <main>
      <CalculatorWrapper calculator={calculator}>
        <Suspense fallback={<div>Loading calculator...</div>}>
          <CalculatorComponent />
        </Suspense>
      </CalculatorWrapper>
    </main>
  );
}
