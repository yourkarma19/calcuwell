"use client";

import dynamic from "next/dynamic";
import { type LucideProps } from "lucide-react";
import React from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Skeleton } from "@/components/ui/skeleton";

// Directly use the loader logic in the wrapper
const IconWrapper = ({
  iconName,
  ...props
}: { iconName: string } & LucideProps) => {
  const LucideIcon = dynamic(
    dynamicIconImports[iconName as keyof typeof dynamicIconImports],
    {
      loading: () => <Skeleton className="w-6 h-6" />,
    },
  );

  return <LucideIcon {...props} />;
};

export { IconWrapper };

    