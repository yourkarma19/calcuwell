"use client";

import dynamic from "next/dynamic";
import { type LucideProps } from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const IconLoader = dynamic(() => import("./calculator/IconLoader"), {
  loading: () => <Skeleton className="w-6 h-6" />,
});

export const IconWrapper = ({
  iconName,
  ...props
}: { iconName: string } & LucideProps) => {
  return <IconLoader iconName={iconName} {...props} />;
};
