import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCalculatorBySlug, calculators } from "@/lib/calculators";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import CalculatorLoader from "@/components/calculator/calculator-loader";

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

// Statically generate routes for all calculators
export async function generateStaticParams() {
    return calculators.map((calc) => ({
        slug: calc.slug,
    }));
}


export default function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }
  
  return (
    <main>
      <CalculatorWrapper calculator={calculator}>
        <CalculatorLoader slug={slug} />
      </CalculatorWrapper>
    </main>
  );
}
