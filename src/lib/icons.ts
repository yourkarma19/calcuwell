
import { createIcon, type IconNode, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
// Import all icons from lucide-react
import * as icons from "lucide-react";

export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

// This is a type assertion to help TypeScript understand the structure.
// We are telling TypeScript that `icons` is a record where keys are strings
// and values are of type `Icon` or some other valid icon component type.
const iconCollection = icons as Record<string, Icon>;

// Filter out non-component exports from lucide-react, like `createIcon`.
// This ensures our `icons` object only contains renderable icon components.
const filteredIcons = Object.entries(iconCollection).reduce((acc, [key, value]) => {
  // A simple check to see if it's a React component (lucide icons are ForwardRef components)
  if (typeof value === 'object' && value && 'displayName' in value) {
    acc[key] = value;
  }
  return acc;
}, {} as Record<string, Icon>);

export { filteredIcons as icons };
