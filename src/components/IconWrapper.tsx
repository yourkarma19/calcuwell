"use client";

import { type LucideProps } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

interface IconWrapperProps extends LucideProps {
  iconName: string;
}

const IconWrapper = ({ iconName, ...props }: IconWrapperProps) => {
  const LucideIcon = dynamic(
    () =>
      import("lucide-react").then((mod) => {
        const Icon = mod[iconName as keyof typeof mod] as React.FC<
          LucideProps
        >;
        if (!Icon) {
          // Fallback to a default icon if the requested icon is not found
          return mod.HelpCircle;
        }
        return Icon;
      }),
    {
      loading: () => <Skeleton className="h-6 w-6" {...props} />,
    },
  );

  return <LucideIcon {...props} />;
};

export { IconWrapper };
