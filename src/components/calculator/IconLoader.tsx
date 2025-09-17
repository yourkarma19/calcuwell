"use client";

import { LucideProps, Calculator } from "lucide-react";
import * as allIcons from "lucide-react";

interface IconLoaderProps extends LucideProps {
  iconName: string;
}

const IconLoader = ({ iconName, ...props }: IconLoaderProps) => {
  const LucideIcon =
    allIcons[iconName as keyof typeof allIcons] ?? Calculator;

  return <LucideIcon {...props} />;
};

export default IconLoader;
