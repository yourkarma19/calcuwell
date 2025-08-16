import type { LucideIcon } from 'lucide-react';

export type CalculatorCategory = "Math" | "Finance" | "Health" | "Conversions" | "Date & Time" | "Programming" | "Geometry & Engineering" | "Miscellaneous";

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  iconName: string; // Changed from Icon: LucideIcon
  tags?: string[];
  formula?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface Category {
    name: CalculatorCategory;
    slug: string;
    description: string;
    iconName:string; // Changed from Icon: LucideIcon
}
