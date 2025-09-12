
"use client";

import dynamic from "next/dynamic";
import { Calculator, LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const IconLoader = ({
  iconName,
  ...props
}: { iconName: string } & LucideProps) => {
  const hasIcon = iconName in dynamicIconImports;
  const LucideIcon = hasIcon
    ? dynamic(dynamicIconImports[iconName as keyof typeof dynamicIconImports])
    : Calculator;

  return <LucideIcon {...props} />;
};

export default IconLoader;
