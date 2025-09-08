
import type { IconName as LucideIconName } from "./icons";
import type { categories } from "./calculators";

export type CalculatorCategoryName = (typeof categories)[number]["name"];

export type IconName = LucideIconName;

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  category: CalculatorCategoryName;
  iconName: IconName;
  tags?: string[];
  formula?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  iconName: IconName;
}
