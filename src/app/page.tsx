import Link from "next/link";
import { categories, calculators } from "@/lib/calculators";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CalculatorCard from "@/components/calculator/calculator-card";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const trendingCalculators = calculators.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative text-center py-16 md:py-24 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
            CalcPro
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your one-stop destination for every calculation you might need. Fast,
            accurate, and easy to use.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <Button asChild variant="outline">
              <Link href="/calculators/vat-gst-calculator?amount=1000&rate=18">GST</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/calculators/loan-emi-calculator?principal=500000&rate=8.5&tenure=5">EMI</Link>
            </Button>
            <Button asChild variant="outline">
               <Link href="/calculators/age-calculator">Age</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
         <div className="flex justify-center -mt-32 md:-mt-36 relative z-20">
          <div className="animate-[float_4s_ease-in-out_infinite]">
            <Link href="/calculators/scientific-calculator">
              <Card className="hover:shadow-xl transition-shadow duration-300 group w-full max-w-sm">
                <CardHeader>
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Icon name="FlaskConical" className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-headline text-2xl">
                        Scientific Calculator
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Perform advanced mathematical calculations with ease.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      
      <section id="categories" className="py-12">
        <h2 className="text-3xl font-bold font-headline text-center mb-8">
          Calculator Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="block">
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon name={category.iconName} className="w-6 h-6 text-primary" />
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
    </div>
  );
}
