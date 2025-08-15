import Link from "next/link";
import Image from "next/image";
import { categories, calculators } from "@/lib/calculators";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import CalculatorCard from "@/components/calculator/calculator-card";

export default function Home() {
  const trendingCalculators = calculators.slice(0, 4);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
          CalcuWell
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your one-stop destination for every calculation you might need. Fast,
          accurate, and easy to use.
        </p>
        <div className="mt-8">
           <Image 
            src="https://placehold.co/1200x600.png"
            alt="An illustration of various calculators"
            width={1200}
            height={600}
            className="rounded-lg shadow-xl mx-auto"
            data-ai-hint="calculator illustration"
          />
        </div>
      </section>

      <section id="categories" className="py-12">
        <h2 className="text-3xl font-bold font-headline text-center mb-8">
          Calculator Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-shadow duration-300 group">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <category.Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section id="trending" className="py-12">
        <h2 className="text-3xl font-bold font-headline text-center mb-8">
          Trending Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCalculators.map((calculator) => (
            <CalculatorCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      </section>
    </main>
  );
}
