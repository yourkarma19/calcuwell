
import 'server-only';
import type { Calculator, Category } from '@/lib/types';
import { calculatorsData } from './calculator-data';

export const categories: Category[] = [
 {
    name: "Math",
    slug: "math",
    description: "Solve mathematical problems, from basic to complex.",
    iconName: "Calculator",
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Manage your finances, loans, and investments.",
    iconName: "Landmark",
  },
  {
    name: "Health",
    slug: "health",
    description: "Monitor your health and fitness levels.",
    iconName: "HeartPulse",
  },
  {
    name: "Conversions",
    slug: "conversions",
    description: "Convert between various units of measurement.",
    iconName: "ArrowRightLeft",
  },
  {
    name: "Date & Time",
    slug: "date-time",
    description: "Calculate dates, ages, and time differences.",
    iconName: "CalendarClock",
  },
  {
    name: "Programming",
    slug: "programming",
    description: "Tools for developers and programmers.",
    iconName: "Binary",
  },
  {
    name: "Geometry & Engineering",
    slug: "geometry-engineering",
    description: "Calculators for geometric shapes and engineering principles.",
    iconName: "Triangle",
  },
  {
    name: "Miscellaneous",
    slug: "miscellaneous",
    description: "A collection of other useful calculators.",
    iconName: "Gem",
  },
];

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
