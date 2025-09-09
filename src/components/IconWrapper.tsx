"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Calculator, type LucideProps } from "lucide-react";

// Dynamically load the IconLoader only on the client-side
const IconLoader = dynamic(() => import("./IconLoader"), {
  loading: () => <Calculator />, // Fallback icon during load
});

type IconWrapperProps = {
  iconName: string;
} & LucideProps;

export const IconWrapper: React.FC<IconWrapperProps> = ({
  iconName,
  ...props
}) => {
  return <IconLoader iconName={iconName} {...props} />;
};
