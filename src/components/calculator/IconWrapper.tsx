
import React, { ComponentType } from "react";
import * as lucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

type IconWrapperProps = {
  iconName: string;
} & LucideProps;

export const IconWrapper: React.FC<IconWrapperProps> = ({ iconName, ...props }) => {
  // Filter only valid React components
  const validIcons: Record<string, ComponentType<LucideProps>> = {};
  Object.entries(lucideIcons).forEach(([key, value]) => {
    if (typeof value === "function" || (typeof value === 'object' && value !== null && 'render' in value)) {
      validIcons[key] = value as ComponentType<LucideProps>;
    }
  });

  const Icon = validIcons[iconName] || validIcons.Calculator;

  return <Icon {...props} />;
};
