import { notFound } from "next/navigation";
import { Suspense, lazy } from "react";
import type { Metadata } from "next";
import { getCalculatorBySlug, calculators } from "@/lib/calculators";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import dynamic from "next/dynamic";
import PlaceholderCalculator from "@/components/calculator/placeholder-calculator";

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

  // Dynamically import the calculator component based on the slug
  const CalculatorComponent = dynamic(
    () => import(`@/components/calculator/${slug}`).catch(() => PlaceholderCalculator), 
    {
      loading: () => <div className="lg:col-span-3 text-center">Loading calculator...</div>,
      ssr: false, // Most calculators are client-side interactive
    }
  );
  
  return (
    <main>
      <CalculatorWrapper calculator={calculator}>
        <Suspense fallback={<div className="lg:col-span-3 text-center">Loading calculator...</div>}>
          <CalculatorComponent />
        </Suspense>
      </CalculatorWrapper>
    </main>
  );
}
