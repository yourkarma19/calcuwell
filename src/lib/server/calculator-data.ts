
import 'server-only';
import type { Calculator } from '@/lib/types';
import { calculatorsData } from '@/lib/calculator-data';
import { categories } from '@/lib/calculators';
import { cache } from 'react';

// Using React's `cache` to ensure this function only runs once per request.
// This is a key optimization for server-side rendering performance.
export const loadFullCalculatorData = cache(async () => {
  return calculatorsData;
});

export const getCalculatorBySlug = async (slug: string): Promise<Omit<Calculator, 'component'> | undefined> => {
  const allCalculators = await loadFullCalculatorData();
  return allCalculators.find((calculator) => calculator.slug === slug);
};

export const getCalculatorsByCategory = async (categorySlug: string) => {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  const allCalculators = await loadFullCalculatorData();
  return allCalculators.filter(c => c.category === category.name);
}
