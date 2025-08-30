
import type { categories } from './calculators';

type CategoryName = typeof categories[number]['name'];

export type CalculatorCategory = CategoryName | "Blog";

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
    name: CategoryName;
    slug: string;
    description: string;
    iconName:string; 
}
