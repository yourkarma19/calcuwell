import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { calculators, categories } from "@/lib/calculators";
import CalculatorCard from "@/components/calculator/calculator-card";

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

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} Calculators | CalcuWell`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const categoryCalculators = calculators.filter(
    (calculator) => calculator.category === category.name
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <category.Icon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-headline text-primary">
          {category.name} Calculators
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryCalculators.map((calculator) => (
          <CalculatorCard key={calculator.slug} calculator={calculator} />
        ))}
      </div>
    </main>
  );
}
