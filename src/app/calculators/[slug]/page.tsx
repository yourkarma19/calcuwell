
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

export async function generateMetadata({ params: { slug } }: CalculatorPageProps): Promise<Metadata> {
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return {};
  }

  return {
    title: calculator.seoTitle || `${calculator.name} | CalcPro`,
    description: calculator.metaDescription || `Use the free ${calculator.name} on CalcPro to ${calculator.description.toLowerCase()}. Fast, accurate, and easy to use for all your needs.`,
    alternates: {
        canonical: `/calculators/${slug}`,
    },
  };
}

// Statically generate routes for all calculators
export async function generateStaticParams() {
    return calculators.map((calc) => ({
        slug: calc.slug,
    }));
}


export default function CalculatorPage({ params: { slug } }: CalculatorPageProps) {
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
