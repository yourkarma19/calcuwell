
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorContent from "@/components/calculator/calculator-content";
import CalculatorLoader from "@/components/calculator/calculator-loader";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import { getCalculatorBySlug, loadFullCalculatorData } from "@/lib/server/calculator-data";


type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const calculator = await getCalculatorBySlug(params.slug);

  if (!calculator) {
    return {};
  }

  return {
    title: `${calculator.name} | CalcPro`,
    description: calculator.metaDescription,
    alternates: {
        canonical: `/calculators/${params.slug}`,
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
  const calculator = await getCalculatorBySlug(params.slug);

  if (!calculator) {
    notFound();
  }
  
  return (
      <CalculatorWrapper 
        calculator={calculator}
        sidebar={<CalculatorContent slug={params.slug} />}
      >
        <CalculatorLoader slug={params.slug} />
      </CalculatorWrapper>
  );
}
