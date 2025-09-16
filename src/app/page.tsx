
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { IconWrapper } from "@/components/IconWrapper";
import HomeCalculator from "@/components/calculator/home-calculator";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categories } from "@/lib/calculators";
import { trendingCalculators } from "@/lib/trending-calculators";
import { cn } from "@/lib/utils";
import type { WebPage } from "schema-dts";

const trendingSchema = trendingCalculators.map((calc) => ({
  "@type": "SoftwareApplication",
  name: calc.name,
  applicationCategory: `${calc.category}Application`,
  operatingSystem: "Web",
  url: `https://calcpro.online/calculators/${calc.slug}`,
  description: calc.description,
}));

const categoriesSchema: WebPage[] = categories.map((cat) => ({
  "@type": "WebPage",
  name: `${cat.name} Calculators`,
  description: cat.description,
  url: `https://calcpro.online/categories/${cat.slug}`,
}));

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CalcPro",
  url: "https://calcpro.online",
  description:
    "CalcPro is your one-stop destination for fast, accurate, and easy-to-use online calculators. Solve finance, health, and math problems instantly.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://calcpro.online/search?q={search_term_string}",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "query-input": "required name=search_term_string" as any,
  },
  hasPart: [...trendingSchema, ...categoriesSchema],
};

export default function Home() {
  return (
    <div>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section with Integrated Calculator */}
      <section className="w-full text-center py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            Instant, Accurate Answers for Your Financial, Health, and
            Educational Questions.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Your free hub for fast, accurate online calculators. Solve complex
            problems with our easy-to-use tools.
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <Card className="shadow-xl rounded-2xl p-4 md:p-6 text-left">
              <HomeCalculator />
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Calculators Section */}
      <section className="w-full py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12">
            🔥 Trending Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {trendingCalculators.map((tool) => (
              <Link
                href={`/calculators/${tool.slug}`}
                key={tool.slug}
                className={cn(
                  "block rounded-2xl",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <Card className="h-full text-center transition-all duration-300 ease-in-out group hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 p-6 rounded-2xl">
                  <div className="flex justify-center mb-4">
                    <IconWrapper
                      iconName={tool.iconName}
                      className="w-8 h-8 text-primary"
                    />
                  </div>
                  <CardTitle className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {tool.description}
                  </CardDescription>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12">
            📂 Calculator Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                href={`/categories/${category.slug}`}
                key={category.slug}
                className={cn(
                  "block rounded-2xl",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <Card className="h-full transition-all duration-300 ease-in-out group hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 hover:scale-105 rounded-2xl">
                  <CardHeader className="flex flex-row items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <IconWrapper
                        iconName={category.iconName}
                        className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors"
                      />
                      <div>
                        <CardTitle className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why CalcPro Section */}
      <section className="w-full text-center py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Why CalcPro?
          </h2>
          <p className="text-lg text-muted-foreground">
            CalcPro offers a comprehensive suite of free online calculators
            designed to be fast, accurate, and easy to use. From solving complex{" "}
            <Link
              href="/categories/math"
              className="text-primary hover:underline"
            >
              mathematical problems
            </Link>{" "}
            to managing your{" "}
            <Link
              href="/categories/finance"
              className="text-primary hover:underline"
            >
              personal finances
            </Link>{" "}
            and{" "}
            <Link
              href="/categories/health"
              className="text-primary hover:underline"
            >
              health
            </Link>
            , our tools provide reliable results to help you make informed
            decisions instantly.
          </p>
        </div>
      </section>
    </div>
  );
}
