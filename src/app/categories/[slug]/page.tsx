
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCalculatorsByCategory, categories } from "@/lib/calculators";
import CategoryClientPage from "@/components/calculator/category-client-page";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} Calculators | CalcPro`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const categoryCalculators = getCalculatorsByCategory(slug);

  return (
    <CategoryClientPage 
      name={category.name}
      iconName={category.iconName}
      description={category.description}
      calculators={categoryCalculators}
    />
  );
}
