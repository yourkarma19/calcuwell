import {
  Calculator as CalculatorIcon,
  HeartPulse,
  Landmark,
  Binary,
  ArrowRightLeft,
  CalendarClock,
  Scale,
  Percent,
  FlaskConical,
  Baseline,
  Ruler,
  Thermometer,
  Beaker,
  AreaChart
} from 'lucide-react';
import type { Calculator, Category } from '@/lib/types';
import BMICalculator from '@/components/calculator/bmi-calculator';
import PlaceholderCalculator from '@/components/calculator/placeholder-calculator';

export const categories: Category[] = [
  {
    name: "Health",
    slug: "health",
    description: "Monitor your health and fitness levels.",
    Icon: HeartPulse,
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Manage your finances, loans, and investments.",
    Icon: Landmark,
  },
  {
    name: "Math",
    slug: "math",
    description: "Solve mathematical problems, from basic to complex.",
    Icon: CalculatorIcon,
  },
  {
    name: "Conversions",
    slug: "conversions",
    description: "Convert between various units of measurement.",
    Icon: ArrowRightLeft,
  },
   {
    name: "Programming",
    slug: "programming",
    description: "Tools for developers and programmers.",
    Icon: Binary,
  },
  {
    name: "Date & Time",
    slug: "date-time",
    description: "Calculate dates, ages, and time differences.",
    Icon: CalendarClock,
  },
];

export const calculators: Calculator[] = [
    {
        slug: 'bmi-calculator',
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index.',
        category: 'Health',
        Icon: HeartPulse,
        formula: 'weight (kg) / (height (m) * height (m))',
        tags: ['health', 'fitness', 'weight', 'body mass index'],
        component: BMICalculator,
    },
    {
        slug: 'bmr-calculator',
        name: 'BMR Calculator',
        description: 'Estimate your Basal Metabolic Rate.',
        category: 'Health',
        Icon: Scale,
        component: PlaceholderCalculator,
    },
    {
        slug: 'loan-emi-calculator',
        name: 'Loan EMI Calculator',
        description: 'Calculate your Equated Monthly Installment.',
        category: 'Finance',
        Icon: Landmark,
        component: PlaceholderCalculator,
    },
    {
        slug: 'percentage-calculator',
        name: 'Percentage Calculator',
        description: 'Find percentages of numbers.',
        category: 'Math',
        Icon: Percent,
        component: PlaceholderCalculator,
    },
    {
        slug: 'scientific-calculator',
        name: 'Scientific Calculator',
        description: 'Perform advanced calculations.',
        category: 'Math',
        Icon: FlaskConical,
        component: PlaceholderCalculator,
    },
    {
        slug: 'currency-converter',
        name: 'Currency Converter',
        description: 'Convert between different currencies.',
        category: 'Finance',
        Icon: ArrowRightLeft,
        component: PlaceholderCalculator,
    },
    {
        slug: 'age-calculator',
        name: 'Age Calculator',
        description: 'Calculate age from date of birth.',
        category: 'Date & Time',
        Icon: CalendarClock,
        component: PlaceholderCalculator,
    },
    {
        slug: 'binary-converter',
        name: 'Binary Converter',
        description: 'Convert between binary, decimal, and hex.',
        category: 'Programming',
        Icon: Binary,
        component: PlaceholderCalculator,
    },
    {
        slug: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert length, weight, temperature, etc.',
        category: 'Conversions',
        Icon: Ruler,
        component: PlaceholderCalculator,
    },
];

export const getCalculatorBySlug = (slug: string): Calculator | undefined => {
  return calculators.find((calculator) => calculator.slug === slug);
};
