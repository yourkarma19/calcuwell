
import type { categories } from './calculators';

export type CalculatorCategoryName = (typeof categories)[number]['name'];

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: CalculatorCategoryName;
  iconName: string;
  tags?: string[];
  formula?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  iconName: string;
}
