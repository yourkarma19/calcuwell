"use client";

import React from "react";
import * as lucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

const icons = lucideIcons as unknown as Record<string, React.FC<LucideProps>>;

type IconLoaderProps = {
  iconName: string;
} & LucideProps;

const IconLoader: React.FC<IconLoaderProps> = ({ iconName, ...props }) => {
  const Icon = icons[iconName] || lucideIcons.Calculator;
  return <Icon {...props} />;
};

export default IconLoader;
