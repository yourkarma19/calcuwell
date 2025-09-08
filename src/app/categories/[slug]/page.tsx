"use client";

import { Suspense, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import CategoryClientPage from "@/components/calculator/category-client-page";
import { categories } from "@/lib/calculators";
import { getCalculatorsByCategory } from "@/lib/server/calculator-data";
import { Calculator } from "@/lib/types";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const [calculators, setCalculators] = useState<
    Omit<Calculator, "component">[]
  >([]);
  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    if (category) {
      getCalculatorsByCategory(slug).then(setCalculators);
    } else {
      notFound();
    }
  }, [slug, category]);

  if (!category) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryClientPage
        name={category.name}
        iconName={category.iconName}
        description={category.description}
        calculators={calculators}
      />
    </Suspense>
  );
}
