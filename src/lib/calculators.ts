
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

export const calculators: Omit<Calculator, 'component'>[] = calculatorsData;

export const getCalculatorBySlug = (slug: string): Omit<Calculator, 'component'> | undefined => {
  return calculators.find((calculator) => calculator.slug === slug);
};

export const getCalculatorsByCategory = (categorySlug: string) => {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  return calculators.filter(c => c.category === category.name);
}
