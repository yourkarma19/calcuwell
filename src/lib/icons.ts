
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

// This is a curated list of icons that are actually components.
// It filters out other exports from lucide-react like "createLucideIcon".
export const icons: { [key: string]: Icon } = Object.entries(LucideIcons).reduce((acc, [key, value]) => {
    // A simple check to see if it's a renderable React component.
    // Lucide icons are forwardRef components.
    if (typeof value === 'object' && value !== null && 'render' in value) {
        acc[key] = value as Icon;
    }
    return acc;
}, {} as { [key: string]: Icon });

// Add aliases
icons.Home = LucideIcons.House;
icons.LineChart = LucideIcons.AreaChart;

export type IconName = keyof typeof icons;
