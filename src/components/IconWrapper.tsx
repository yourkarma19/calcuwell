"use client";

import * as React from "react";
import { type LucideProps } from "lucide-react";
import * as allIcons from "lucide-react";

interface IconWrapperProps extends LucideProps {
  iconName: string;
}

const IconWrapper = ({ iconName, ...props }: IconWrapperProps) => {
  const LucideIcon = (allIcons[iconName as keyof typeof allIcons] ??
    allIcons.HelpCircle) as React.ElementType;

  return <LucideIcon {...props} />;
};

export { IconWrapper };
