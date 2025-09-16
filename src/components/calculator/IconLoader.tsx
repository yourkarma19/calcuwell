"use client";

import dynamic from "next/dynamic";
import { LucideProps, Calculator } from "lucide-react";

interface IconLoaderProps extends LucideProps {
  iconName: string;
}

const IconLoader = ({ iconName, ...props }: IconLoaderProps) => {
  const LucideIcon = dynamic(
    () =>
      import("lucide-react").then((mod) => {
        const Icon = mod[iconName as keyof typeof mod];
        // If the icon is not found in lucide-react, return the Calculator icon as a fallback.
        if (!Icon) {
          return Calculator;
        }
        return Icon as React.FC<LucideProps>;
      }),
    {
      ssr: false, // Ensure this component is only rendered on the client side.
    },
  );

  return <LucideIcon {...props} />;
};

export default IconLoader;
