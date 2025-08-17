
import 'server-only';
import type { Calculator } from '@/lib/types';
import { calculatorsData } from '@/lib/calculator-data';
import { categories } from '@/lib/calculators';

let allCalculators: Omit<Calculator, 'component'>[] | null = null;

// This function now only runs on the server.
export const loadFullCalculatorData = async () => {
  if (allCalculators === null) {
    allCalculators = calculatorsData;
  }
  return allCalculators;
}

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
