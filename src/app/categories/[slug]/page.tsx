import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCalculatorsByCategory } from "@/lib/server/calculator-data";
import { categories } from "@/lib/calculators";
import CategoryClientPage from "@/components/calculator/category-client-page";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const awaitedParams = await params;
  const category = categories.find((c) => c.slug === awaitedParams.slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} Calculators | Free Online Tools | CalcPro`,
    description: `Browse a collection of free online ${category.name.toLowerCase()} calculators. Instantly solve problems for ${category.name.toLowerCase()} with our easy-to-use tools.`,
    alternates: {
        canonical: `/categories/${awaitedParams.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const categoryCalculators = await getCalculatorsByCategory(slug);

  return (
    <CategoryClientPage 
      name={category.name}
      iconName={category.iconName}
      description={category.description}
      calculators={categoryCalculators}
    />
  );
}
