import type { LucideIcon } from 'lucide-react';
import type { ComponentType, FC, LazyExoticComponent } from 'react';

export type CalculatorCategory = "Math" | "Finance" | "Health" | "Conversions" | "Date & Time" | "Programming" | "Geometry & Engineering" | "Miscellaneous";

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  Icon: LucideIcon;
  tags?: string[];
  formula?: string;
  component: LazyExoticComponent<ComponentType<any>>;
}

export interface Category {
    name: CalculatorCategory;
    slug: string;
    description: string;
    Icon: LucideIcon;
}
