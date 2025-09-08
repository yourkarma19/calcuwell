
"use client";

import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, usePathname } from "next/navigation";
import CalculatorContent from "@/components/calculator/calculator-content";
import CalculatorLoader from "@/components/calculator/calculator-loader";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import {
  getCalculatorBySlug,
  loadFullCalculatorData,
} from "@/lib/server/calculator-data";
import { categories } from "@/lib/calculators";
import { useEffect, useState } from "react";
import { Calculator } from "@/lib/types";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const [calculator, setCalculator] = useState<Omit<Calculator, "component"> | null>(null);

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
    return <div>Loading...</div>;
  }

  const category = categories.find((c) => c.name === calculator.category);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalculatorWrapper
        calculator={calculator}
        sidebar={<CalculatorContent slug={params.slug} />}
      >
        <CalculatorLoader slug={params.slug} calculatorName={calculator.name} />
      </CalculatorWrapper>
    </Suspense>
  );
}
