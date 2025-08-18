import type { Calculator, Category } from '@/lib/types';

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
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Calculators for daily life, planning, and personal use.",
    iconName: "Home",
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
