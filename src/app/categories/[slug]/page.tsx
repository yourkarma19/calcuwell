
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryClientPage from "@/components/calculator/category-client-page";
import { categories } from "@/lib/calculators";
import { getCalculatorsByCategory } from "@/lib/server/calculator-data";
import type { BreadcrumbList, WithContext } from 'schema-dts';

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
    title: `${category.name} Calculators | CalcPro`,
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
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `https://calcpro.online/categories/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryClientPage 
        name={category.name}
        iconName={category.iconName}
        description={category.description}
        calculators={categoryCalculators}
      />
    </>
  );
}
