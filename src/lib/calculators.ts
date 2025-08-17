
import type { Calculator, Category } from '@/lib/types';
import { trendingCalculators } from './trending-calculators';

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
    name: "Blog",
    slug: "blog",
    description: "Articles and guides to help you understand the concepts behind the calculations.",
    iconName: "BookOpen",
  },
  {
    name: "Miscellaneous",
    slug: "miscellaneous",
    description: "A collection of other useful calculators.",
    iconName: "Gem",
  },
];

// Initially, only load trending calculators to keep bundles small.
export let calculators: Omit<Calculator, 'component'>[] = trendingCalculators;

// Lazy-load the full calculator list when needed
export const loadFullCalculatorData = async () => {
  if (calculators.length === trendingCalculators.length) {
    const { calculatorsData } = await import('@/lib/calculator-data');
    calculators = calculatorsData;
  }
  return calculators;
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
