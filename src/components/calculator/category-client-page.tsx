"use client";

import { useState, useMemo } from "react";
import { IconWrapper } from "@/components/IconWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Calculator } from "@/lib/types";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

type StrippedCalculator = Omit<Calculator, "component">;

interface CategoryClientPageProps {
  name: string;
  iconName: string;
  description: string;
  calculators: StrippedCalculator[];
}

const getSubCategory = (calc: StrippedCalculator) => {
  const algebra = ['Equation Solver', 'X and Y Intercept Calculator', 'Cubic Equation Calculator', 'Tangent Line Calculator', 'Partial Fraction Calculator'];
  const stats = ['Mean/Median/Mode Calculator', 'Standard Deviation Calculator', 'Probability Calculator', 'Permutation & Combination'];
  const geometry = ['Circle Calculator', 'Triangle Area & Perimeter', 'Rectangle Area & Perimeter', 'Cylinder Volume Calculator', 'Sphere Volume & Surface Area', 'Cone Volume Calculator', 'Pythagorean Theorem Calculator', 'Trigonometry Calculator', 'Beam Deflection Calculator', 'Torque Calculator', 'Triangle Angle Calculator'];

  if (algebra.includes(calc.name)) return 'Algebra';
  if (stats.includes(calc.name)) return 'Statistics & Probability';
  if (geometry.includes(calc.name)) return 'Geometry';
  return 'Basic Arithmetic';
}


export default function CategoryClientPage({
  name,
  iconName,
  description,
  calculators,
}: CategoryClientPageProps) {
  const [filter, setFilter] = useState("");

  const filteredAndGroupedCalculators = useMemo(() => {
    let items = calculators;
    if (filter) {
      items = calculators.filter(
        (calculator) =>
          calculator.name.toLowerCase().includes(filter.toLowerCase()) ||
          calculator.description.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    
    if (name === "Math") {
       return items.reduce((acc, calc) => {
        const subCategory = getSubCategory(calc);
        if (!acc[subCategory]) {
          acc[subCategory] = [];
        }
        acc[subCategory].push(calc);
        return acc;
      }, {} as Record<string, StrippedCalculator[]>);
    }

    return { [name]: items };

  }, [calculators, filter, name]);

  if (!iconName) {
    return null; // Or some fallback UI
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
          <IconWrapper iconName={iconName} className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">
          {name} Calculators
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="mb-8 max-w-sm mx-auto">
        <Label htmlFor="filter-input" className="sr-only">
          Filter calculators
        </Label>
        <Input
          id="filter-input"
          type="text"
          placeholder={`Search in ${name}...`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="space-y-12">
        {Object.entries(filteredAndGroupedCalculators).map(([subCategory, calcs]) => (
          <section key={subCategory}>
            <h2 className="text-2xl font-bold font-headline text-primary/80 mb-6">{subCategory}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {calcs.map((calculator) => (
                <Link
                  href={`/calculators/${calculator.slug}`}
                  key={calculator.slug}
                  className="block h-full"
                >
                  <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <IconWrapper
                            iconName={calculator.iconName}
                            className="w-6 h-6 text-primary"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold font-headline group-hover:text-primary transition-colors">
                            {calculator.name}
                          </CardTitle>
                          <CardDescription>
                            {calculator.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      {Object.keys(filteredAndGroupedCalculators).length === 0 && filter && (
        <p className="text-muted-foreground col-span-full text-center mt-8">
          No calculators found for &quot;{filter}&quot;.
        </p>
      )}

      {name === "Math" && (
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions (Math)</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle as="h3">What is the best free online math calculator?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>The "best" calculator depends on your needs. For daily arithmetic, a basic calculator is fine. For advanced problems, you might need a scientific or graphing calculator. CalcPro aims to provide a wide range of free, easy-to-use tools for everything from simple percentages to complex algebra and geometry.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle as="h3">How do you calculate percentages for exam marks?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>To calculate the percentage of marks, you use the formula: `(Marks Obtained / Total Marks) × 100`. For example, if a student scores 45 out of 60, the percentage is `(45 / 60) × 100 = 75%`. Our <Link href="/calculators/percentage-calculator" className="text-primary hover:underline">Percentage Calculator</Link> can do this for you quickly.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle as="h3">Which calculator is best for CBSE / GSEB board students?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>For students in boards like CBSE or GSEB, a good scientific calculator is essential. Tools like our <Link href="/calculators/trigonometry-calculator" className="text-primary hover:underline">Trigonometry</Link> and <Link href="/calculators/logarithm-calculator" className="text-primary hover:underline">Logarithm</Link> calculators are perfect for practicing and verifying homework for subjects like Physics and Mathematics.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

    </main>
  );
}
