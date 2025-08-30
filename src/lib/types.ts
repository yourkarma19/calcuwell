import type { Icon } from 'lucide-react';
import type { categories } from './calculators';

export type CalculatorCategory = (typeof categories)[number]['name'];

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  iconName: keyof typeof import('lucide-react')['icons'];
  tags?: string[];
  formula?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface Category {
  name: CalculatorCategory;
  slug: string;
  description: string;
  iconName: keyof typeof import('lucide-react')['icons'];
}
