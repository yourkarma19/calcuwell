
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorContent from "@/components/calculator/calculator-content";
import CalculatorLoader from "@/components/calculator/calculator-loader";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import { getCalculatorBySlug, loadFullCalculatorData } from "@/lib/server/calculator-data";
import type { BreadcrumbList, WithContext } from 'schema-dts';
import { categories } from "@/lib/calculators";


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

  const category = categories.find((c) => c.name === calculator.category);

  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://calcpro.online",
      },
      ...(category ? [{
        "@type": "ListItem" as const,
        position: 2,
        name: category.name,
        item: `https://calcpro.online/categories/${category.slug}`,
      }] : []),
      {
        "@type": "ListItem",
        position: category ? 3 : 2,
        name: calculator.name,
        item: `https://calcpro.online/calculators/${params.slug}`,
      },
    ],
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorWrapper 
        calculator={calculator}
        sidebar={<CalculatorContent slug={params.slug} />}
      >
        <CalculatorLoader slug={params.slug} calculatorName={calculator.name} />
      </CalculatorWrapper>
    </>
  );
}
