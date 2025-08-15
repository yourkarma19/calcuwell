
"use client";

import { useState, useMemo } from "react";
import type { Calculator, Category } from "@/lib/types";
import CalculatorCard from "@/components/calculator/calculator-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryClientPageProps {
  category: Category;
  calculators: Omit<Calculator, 'component'>[];
}

export default function CategoryClientPage({ category, calculators }: CategoryClientPageProps) {
  const [filter, setFilter] = useState("");

  const filteredCalculators = useMemo(() => {
    if (!filter) {
        return calculators;
    }
    
    return calculators.filter((calculator) => 
        calculator.name.toLowerCase().includes(filter.toLowerCase())
    );

  }, [calculators, filter]);

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

      <div className="mb-8 max-w-sm mx-auto">
        <Label htmlFor="filter-input" className="sr-only">Filter calculators</Label>
        <Input 
            id="filter-input"
            type="text"
            placeholder={`Search in ${category.name}...`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCalculators.length > 0 ? (
            filteredCalculators.map((calculator) => (
              <CalculatorCard key={calculator.slug} calculator={calculator} />
            ))
        ) : (
            <p className="text-muted-foreground col-span-full text-center">No calculators found for "{filter}".</p>
        )}
      </div>
    </main>
  );
}
