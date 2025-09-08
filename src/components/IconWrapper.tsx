"use client";
import React from "react";
import * as lucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

const icons = lucideIcons as unknown as Record<
  string,
  React.FC<LucideProps>
>;

type IconWrapperProps = {
  iconName: string;
} & LucideProps;

export const IconWrapper: React.FC<IconWrapperProps> = ({
  iconName,
  ...props
}) => {
  const Icon = icons[iconName] || lucideIcons.Calculator;
  return <Icon {...props} />;
};
