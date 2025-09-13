import { Metadata } from "next";
import { List } from "lucide-react";
import Link from "next/link";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { IconWrapper } from "@/components/IconWrapper";
import { categories } from "@/lib/calculators";
import { loadFullCalculatorData } from "@/lib/server/calculator-data";
import { Calculator, IconName } from "@/lib/types";

export const metadata: Metadata = {
  title: "Sitemap | CalcPro",
  description:
    "Explore a complete list of all our free online calculators, organized by category. Find tools for math, finance, health, and more.",
  alternates: {
    canonical: "/sitemap",
  },
};

type CategoryWithCalculators = {
  slug: string;
  name: string;
  iconName: IconName;
  calculators: Omit<Calculator, "component">[];
};

const breadcrumbSchema: WithContext<BreadcrumbList> = {
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
      name: "Sitemap",
      item: "https://calcpro.online/sitemap",
    },
  ],
};

export default async function SitemapPage() {
  const allCalculators = await loadFullCalculatorData();
  const categoriesWithCalculators: CategoryWithCalculators[] = categories.map(
    (category) => ({
      ...category,
      calculators: allCalculators
        .filter((calc) => calc.category === category.name)
        .sort((a, b) => a.name.localeCompare(b.name)), // Alphabetize calculators within each category
    }),
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="text-center mb-12">
        <List className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1>Sitemap</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Welcome to the sitemap for CalcPro. Here you can find a comprehensive
          list of all our calculators, neatly organized by category. This page
          is designed to help you quickly navigate to the specific tool you
          need, whether you&apos;re solving a complex math problem, managing
          your finances, or exploring health metrics. Browse through the
          sections below to discover the wide range of free tools we offer.
        </p>
      </div>

      <div className="space-y-12">
        {categoriesWithCalculators.map((category) => (
          <section key={category.slug}>
            <h2 className="text-3xl font-bold font-headline text-primary mb-6 flex items-center gap-3">
              <IconWrapper
                iconName={category.iconName as IconName}
                className="w-8 h-8"
              />
              {category.name} Calculators
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.calculators.map((calc) => {
                return (
                  <li key={calc.slug}>
                    <Link
                      href={`/calculators/${calc.slug}`}
                      className="text-sm hover:text-primary hover:underline flex items-center gap-2 rounded-md p-2 hover:bg-muted transition-colors"
                    >
                      <IconWrapper
                        iconName={calc.iconName as IconName}
                        className="w-4 h-4 text-muted-foreground"
                      />
                      {calc.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
