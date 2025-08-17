
import type { Calculator } from '@/lib/types';

export const trendingCalculators: Omit<Calculator, 'component'>[] = [
  {
    slug: 'loan-emi-calculator',
    name: 'Loan EMI Calculator',
    description: 'Calculate your Equated Monthly Installment.',
    category: 'Finance',
    iconName: 'Landmark',
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index.',
    category: 'Health',
    iconName: 'HeartPulse',
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate age from date of birth.',
    category: 'Date & Time',
    iconName: 'CalendarClock',
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases.',
    category: 'Math',
    iconName: 'Percent',
  },
];
