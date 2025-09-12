import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryClientPage from "@/components/calculator/category-client-page";
import { categories } from "@/lib/calculators";
import { getCalculatorsByCategory } from "@/lib/server/calculator-data";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found | CalcPro",
    };
  }

  return {
    title: `${category.name} Calculators | CalcPro`,
    description: `A collection of free online ${category.name.toLowerCase()} calculators. ${category.description}`,
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
