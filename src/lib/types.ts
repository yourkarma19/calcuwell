
export type CalculatorCategory = "Math" | "Finance" | "Health" | "Conversions" | "Date & Time" | "Programming" | "Geometry & Engineering" | "Miscellaneous" | "Blog";

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
