"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Calculator, type LucideProps } from "lucide-react";

// The IconLoader is now responsible for the dynamic import,
// ensuring it only runs on the client.
const IconLoader = dynamic(
  () => import("@/components/calculator/IconLoader"),
  {
    loading: () => <Calculator />, // Fallback icon
  },
);

// The IconWrapper is simplified to pass the icon name to the loader.
const IconWrapper = ({
  iconName,
  ...props
}: { iconName: string } & LucideProps) => {
  return <IconLoader iconName={iconName} {...props} />;
};

export { IconWrapper };
