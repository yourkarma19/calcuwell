"use client";

import { type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

interface IconWrapperProps extends LucideProps {
  iconName: string;
}

const IconWrapper = ({ iconName, ...props }: IconWrapperProps) => {
  const LucideIcon = dynamic(
    dynamicIconImports[iconName as keyof typeof dynamicIconImports],
    {
      loading: () => <Skeleton className="h-6 w-6" {...props} />,
    },
  );

  return <LucideIcon {...props} />;
};

export { IconWrapper };
