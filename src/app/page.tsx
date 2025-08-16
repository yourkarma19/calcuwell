
import Link from "next/link";
import { categories, calculators } from "@/lib/calculators";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Smartphone } from "lucide-react";
import CalculatorCard from "@/components/calculator/calculator-card";
import { Icon } from "@/components/ui/icon";
import ScientificCalculator from "@/components/calculator/scientific-calculator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


export default function Home() {
  const trendingCalculators = calculators.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative text-center py-16 md:py-24 rounded-xl bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
            CalcPro
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your one-stop destination for fast, accurate, and easy-to-use online calculators.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
         <div className="flex justify-center relative z-20">
          <div className="w-full max-w-md">
            <ScientificCalculator showFaq={false}/>
          </div>
        </div>
      </section>
      
      <section id="categories" className="py-8">
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

      <section className="py-16">
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>About the Scientific Calculator</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What Do the Buttons Mean?</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc list-inside space-y-1">
                                <li><strong>sin, cos, tan:</strong> Trigonometric functions for calculating ratios of a right triangle's sides.</li>
                                <li><strong>sin⁻¹, cos⁻¹, tan⁻¹:</strong> Inverse trigonometric functions (or arc functions).</li>
                                <li><strong>log, ln:</strong> Logarithm base 10 and natural logarithm.</li>
                                <li><strong>e:</strong> Euler's number, the base of the natural logarithm.</li>
                                <li><strong>x!:</strong> Factorial, the product of all positive integers up to x.</li>
                                <li><strong>√:</strong> Square root.</li>
                                <li><strong>xʸ:</strong> Power function, raises x to the power of y.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How to Calculate Trigonometric Functions</AccordionTrigger>
                        <AccordionContent>
                            First, select your desired angle mode: Degrees (Deg) or Radians (Rad). Then, enter the angle and press the trigonometric function button (e.g., sin, cos, tan). For example, to find the sine of 30 degrees, ensure you are in 'Deg' mode, type '30', and then press 'sin'.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is the difference between DEG, RAD, and GRAD modes?</AccordionTrigger>
                        <AccordionContent>
                            These are three different units for measuring angles.
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li><strong>Degrees (DEG):</strong> The most common unit, where a full circle is 360°.</li>
                                <li><strong>Radians (RAD):</strong> The standard mathematical unit, where a full circle is 2π radians. This is used in many areas of mathematics and physics.</li>
                                <li><strong>Gradians (GRAD):</strong> A less common unit where a full circle is 400 gradians.</li>
                            </ul>
                            Ensure you are in the correct mode for your calculation to get the right result.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Practical Applications</AccordionTrigger>
                        <AccordionContent>
                            Scientific calculators are essential in many fields. Engineers use them for designing structures, physicists for modeling phenomena, and students for solving complex math problems in trigonometry, calculus, and algebra. They are a fundamental tool for anyone working with science, technology, engineering, and mathematics (STEM).
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </section>

    </div>
  );
}
