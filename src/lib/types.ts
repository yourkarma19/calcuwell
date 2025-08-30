
import type { categories } from './calculators';

export type CalculatorCategory = (typeof categories)[number]['name'];

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  iconName: string; 
  tags?: string[];
  formula?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface Category {
    name: CalculatorCategory;
    slug: string;
    description: string;
    iconName:string; 
}
