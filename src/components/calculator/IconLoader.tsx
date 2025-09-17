"use client";

import * as React from "react";
import { LucideProps, Calculator } from "lucide-react";
import * as allIcons from "lucide-react";

interface IconLoaderProps extends LucideProps {
  iconName: string;
}

const IconLoader = ({ iconName, ...props }: IconLoaderProps) => {
  const LucideIcon = (allIcons[iconName as keyof typeof allIcons] ??
    Calculator) as React.ElementType;

  return <LucideIcon {...props} />;
};

export default IconLoader;
