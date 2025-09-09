"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Calculator, type LucideProps } from "lucide-react";

const IconWrapper = ({
  iconName,
  ...props
}: { iconName: string } & LucideProps) => {
  const LucideIcon = dynamic(
    () =>
      import("lucide-react").then((mod) => {
        const Icon = mod[iconName as keyof typeof mod] as React.FC<
          LucideProps
        >;
        if (Icon) {
          return Icon;
        }
        // Fallback to a default icon if the requested one doesn't exist
        return mod.Calculator;
      }),
    {
      loading: () => <Calculator {...props} />, // Show a placeholder while loading
    },
  );

  return <LucideIcon {...props} />;
};

export { IconWrapper };
