import React from "react";
import * as icons from "lucide-react";
import { LucideProps } from "lucide-react";

type IconWrapperProps = {
  iconName: string;
} & LucideProps;

export const IconWrapper: React.FC<IconWrapperProps> = ({ iconName, ...props }) => {
  const Icon = (icons as Record<string, React.ComponentType<any>>)[iconName] || icons.Calculator;
  return <Icon {...props} />;
};
