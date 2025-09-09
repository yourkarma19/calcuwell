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
        const Icon = mod[iconName as keyof typeof mod] as React.FC<
          LucideProps
        >;
        // If the icon is found, return it. Otherwise, return the fallback.
        return Icon || mod.Calculator;
      }),
    {
      // Show a placeholder while the icon is loading.
      loading: () => <Calculator {...props} />,
    },
  );

  return <LucideIcon {...props} />;
};

export default IconLoader;
