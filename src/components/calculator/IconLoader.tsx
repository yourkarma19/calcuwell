"use client";

import { LucideProps, Calculator } from "lucide-react";
import * as allIcons from "lucide-react";

interface IconLoaderProps extends LucideProps {
  iconName: string;
}

const IconLoader = ({ iconName, ...props }: IconLoaderProps) => {
  const LucideIcon =
    (allIcons as { [key: string]: React.ComponentType<LucideProps> })[
      iconName
    ] ?? Calculator;

  return <LucideIcon {...props} />;
};

export default IconLoader;
