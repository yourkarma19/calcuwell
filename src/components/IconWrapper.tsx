"use client";
import React from "react";
import * as lucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

const { createReactComponent, ...icons } = lucideIcons;

const validIcons = icons as Record<string, React.FC<LucideProps>>;

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
