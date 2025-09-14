"use client";

import { useMemo, useState } from "react";
import CalculatorCard from "@/components/calculator/calculator-card";
import { IconWrapper } from "@/components/IconWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Calculator } from "@/lib/types";

type StrippedCalculator = Omit<Calculator, "component">;

interface CategoryClientPageProps {
  name: string;
  iconName: string;
  description: string;
  calculators: StrippedCalculator[];
}

export default function CategoryClientPage({
  name,
  iconName,
  description,
  calculators,
}: CategoryClientPageProps) {
  const [filter, setFilter] = useState("");

  const filteredCalculators = useMemo(() => {
    if (!filter) {
      return calculators;
    }
    return calculators.filter(
      (calculator) =>
        calculator.name.toLowerCase().includes(filter.toLowerCase()) ||
        calculator.description.toLowerCase().includes(filter.toLowerCase()) ||
        calculator.tags?.some((tag) =>
          tag.toLowerCase().includes(filter.toLowerCase()),
        ),
    );
  }, [calculators, filter]);

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

      <div className="mb-8 max-w-lg mx-auto">
        <Label htmlFor="filter-input" className="sr-only">
          Filter calculators
        </Label>
        <Input
          id="filter-input"
          type="text"
          placeholder={`Search in ${name}...`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredCalculators.map((calculator) => (
          <CalculatorCard key={calculator.slug} calculator={calculator} />
        ))}
      </div>

      {filteredCalculators.length === 0 && filter && (
        <p className="text-muted-foreground col-span-full text-center mt-8">
          No calculators found for &quot;{filter}&quot;.
        </p>
      )}
    </main>
  );
}
