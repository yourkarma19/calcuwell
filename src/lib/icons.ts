
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

// Directly export the icons object from lucide-react and add aliases
export const icons = {
    ...LucideIcons,
    Home: LucideIcons.House,
    LineChart: LucideIcons.AreaChart,
};

export type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export type IconName = keyof typeof icons;
