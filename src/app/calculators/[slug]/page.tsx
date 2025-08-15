import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { calculators, getCalculatorBySlug } from "@/lib/calculators";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return calculators.map((calculator) => ({
    slug: calculator.slug,
  }));
}

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

  if (!calculator) {
    notFound();
  }

  const CalculatorComponent = calculator.component;

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
