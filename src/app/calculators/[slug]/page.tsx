
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorLoader from "@/components/calculator/calculator-loader";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import { getCalculatorBySlug, loadFullCalculatorData } from "@/lib/server/calculator-data";


type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const awaitedParams = await params;
  const calculator = await getCalculatorBySlug(awaitedParams.slug);

  if (!calculator) {
    return {};
  }

  return {
    title: `${calculator.name} | CalcPro`,
    description: calculator.metaDescription,
    alternates: {
        canonical: `/calculators/${awaitedParams.slug}`,
    },
  };
}

// Statically generate routes for all calculators
export async function generateStaticParams() {
    const calculators = await loadFullCalculatorData();
    return calculators.map((calc) => ({
        slug: calc.slug,
    }));
}


export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const awaitedParams = await params;
  const calculator = await getCalculatorBySlug(awaitedParams.slug);

  if (!calculator) {
    notFound();
  }
  
  return (
    <main>
      <CalculatorWrapper calculator={calculator}>
        <CalculatorLoader slug={awaitedParams.slug} />
      </CalculatorWrapper>
    </main>
  );
}
