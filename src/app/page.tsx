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
import { ArrowRight, Zap, Target, Smartphone } from "lucide-react";
import CalculatorCard from "@/components/calculator/calculator-card";
import { Icon } from "@/components/ui/icon";
import ScientificCalculator from "@/components/calculator/scientific-calculator";

export default function Home() {
  const trendingCalculators = calculators.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative text-center py-16 md:py-24 overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
            CalcPro – Free Online Calculators
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your one-stop destination for finance, health, and everyday calculations. Fast, accurate, and easy to use.
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
          <div className="w-full max-w-md">
            <ScientificCalculator />
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

      <section className="py-16 bg-muted/40 rounded-xl mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-center mb-6">
            Why Choose CalcPro?
          </h2>
          <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-10">
            CalcPro is your one-stop destination for everyday calculations – from 
            finance and health to education and productivity. Our calculators are 
            fast, accurate, and designed with modern UI/UX for an effortless experience.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent>
                <div className="p-3 inline-block bg-primary/10 rounded-full mb-2">
                   <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-headline">Fast</h3>
                <p className="text-sm text-muted-foreground">Instant results with a focus on performance and no unnecessary lag.</p>
              </CardContent>
            </Card>
             <Card className="text-center">
              <CardContent>
                 <div className="p-3 inline-block bg-primary/10 rounded-full mb-2">
                   <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-headline">Accurate</h3>
                 <p className="text-sm text-muted-foreground">Our tools are built on reliable formulas and rigorous testing to ensure you get the right answer.</p>
              </CardContent>
            </Card>
             <Card className="text-center">
              <CardContent>
                 <div className="p-3 inline-block bg-primary/10 rounded-full mb-2">
                   <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-headline">Mobile Friendly</h3>
                 <p className="text-sm text-muted-foreground">A clean, responsive design that works perfectly on any device, any time.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
