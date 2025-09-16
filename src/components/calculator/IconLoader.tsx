"use client";

import dynamic from "next/dynamic";
import { Calculator, LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconLoaderProps extends LucideProps {
  iconName: string;
}

const IconLoader = ({ iconName, ...props }: IconLoaderProps) => {
  const LucideIcon =
    iconName in dynamicIconImports
      ? dynamic(dynamicIconImports[iconName as keyof typeof dynamicIconImports])
      : Calculator;

  return <LucideIcon {...props} />;
};

export default IconLoader;
