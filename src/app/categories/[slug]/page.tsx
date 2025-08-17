
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCalculatorsByCategory, categories } from "@/lib/server/calculator-data";
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
    description: `Browse a comprehensive collection of free online ${category.name.toLowerCase()} calculators. ${category.description} Instantly solve problems with CalcPro.`,
    alternates: {
        canonical: `/categories/${params.slug}`,
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
