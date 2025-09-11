"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Calculator, type LucideProps } from "lucide-react";

// This component handles the dynamic loading of icons on the client side.
const IconLoader = ({
  iconName,
  ...props
}: { iconName: string } & LucideProps) => {
  // Use dynamic import to load only the requested icon.
  const LucideIcon = dynamic(
    () =>
      import("lucide-react").then((mod) => {
        // Fallback to Calculator if the icon doesn't exist
        const IconComponent =
          mod[iconName as keyof typeof mod] || mod.Calculator;
        return IconComponent;
      }),
    {
      // Show a placeholder while the icon is loading.
      loading: () => <Calculator {...props} />,
    },
  );

  return <LucideIcon {...props} />;
};

export default IconLoader;
