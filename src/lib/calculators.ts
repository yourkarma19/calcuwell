
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

// These functions were moved to a server-only file to prevent them
// from being included in the client bundle.
// See src/lib/server/calculator-data.ts

// A simplified, client-safe function can be provided if needed,
// but for now, we will rely on server components to pass data.
