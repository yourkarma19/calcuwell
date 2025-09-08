"use client";

import { Suspense, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import CalculatorContent from "@/components/calculator/calculator-content";
import CalculatorLoader from "@/components/calculator/calculator-loader";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import { getCalculatorBySlug } from "@/lib/server/calculator-data";
import type { Calculator } from "@/lib/types";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const [calculator, setCalculator] = useState<Omit<
    Calculator,
    "component"
  > | null>(null);
  const [childProps, setChildProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const fetchCalculator = async () => {
      const calc = await getCalculatorBySlug(params.slug);
      if (!calc) {
        notFound();
      }
      setCalculator(calc);
    };
    fetchCalculator();
  }, [params.slug]);

  if (!calculator) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <CalculatorLoader slug={params.slug} calculatorName="Loading..." />
          </div>
          <div className="space-y-6 lg:sticky lg:top-24">
            <CalculatorContent slug={params.slug} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalculatorWrapper
        calculator={calculator}
        sidebar={<CalculatorContent slug={params.slug} {...childProps} />}
      >
        <CalculatorLoader
          slug={params.slug}
          calculatorName={calculator.name}
          setChildProps={setChildProps}
        />
      </CalculatorWrapper>
    </Suspense>
  );
}
