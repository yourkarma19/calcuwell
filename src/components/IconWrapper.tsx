"use client";
import React from "react";
import * as lucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

const { ...icons } = lucideIcons;

const validIcons = Object.entries(icons).reduce(
  (acc, [key, value]) => {
    if (typeof value === "function" && key[0] === key[0].toUpperCase()) {
      acc[key] = value as React.FC<LucideProps>;
    }
    return acc;
  },
  {} as Record<string, React.FC<LucideProps>>,
);

type IconWrapperProps = {
  iconName: string;
} & LucideProps;

export const IconWrapper: React.FC<IconWrapperProps> = ({
  iconName,
  ...props
}) => {
  const Icon = validIcons[iconName] || validIcons.Calculator;
  return <Icon {...props} />;
};
