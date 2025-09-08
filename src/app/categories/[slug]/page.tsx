import { notFound } from "next/navigation";
import CategoryClientPage from "@/components/calculator/category-client-page";
import { categories } from "@/lib/calculators";
import { getCalculatorsByCategory } from "@/lib/server/calculator-data";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const calculators = await getCalculatorsByCategory(slug);

  return (
    <CategoryClientPage
      name={category.name}
      iconName={category.iconName}
      description={category.description}
      calculators={calculators}
    />
  );
}
