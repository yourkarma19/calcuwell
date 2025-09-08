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

// This is now a Server Component
export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const calculator = await getCalculatorBySlug(params.slug);

  if (!calculator) {
    notFound();
  }

  // We are not using setChildProps anymore as data can be passed directly
  return (
    <CalculatorWrapper
      calculator={calculator}
      sidebar={<CalculatorContent slug={params.slug} />}
    >
      <CalculatorLoader
        slug={params.slug}
        calculatorName={calculator.name}
      />
    </CalculatorWrapper>
  );
}
