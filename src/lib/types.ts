
import type { icons } from 'lucide-react';
import type { categories } from './calculators';

export type CalculatorCategoryName = (typeof categories)[number]['name'];

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: CalculatorCategoryName;
  iconName: keyof typeof icons;
  tags?: string[];
  formula?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface Category {
  name: CalculatorCategoryName;
  slug: string;
  description: string;
  iconName: keyof typeof icons;
}
