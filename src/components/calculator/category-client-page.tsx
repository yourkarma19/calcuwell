
"use client";

import { useState, useMemo } from "react";
import { IconWrapper } from "@/components/IconWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Calculator } from "@/lib/types";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

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
        calculator.description.toLowerCase().includes(filter.toLowerCase()),
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredCalculators.length > 0 ? (
          filteredCalculators.map((calculator) => (
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
                      <CardDescription>{calculator.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center">
            No calculators found for &quot;{filter}&quot;.
          </p>
        )}
      </div>
    </main>
  );
}
