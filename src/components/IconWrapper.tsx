"use client";

import { type LucideProps } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import * as allIcons from "lucide-react";

interface IconWrapperProps extends LucideProps {
  iconName: string;
}

const IconWrapper = ({ iconName, ...props }: IconWrapperProps) => {
  const LucideIcon = (allIcons as any)[iconName] ?? allIcons.HelpCircle;

  return <LucideIcon {...props} />;
};

export { IconWrapper };
