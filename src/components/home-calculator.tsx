"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BasicCalculator = dynamic(
  () => import('@/components/calculator/basic-calculator'),
  { 
    ssr: false,
    loading: () => <Card className="max-w-sm mx-auto"><CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
  }
);

export default function HomeCalculator() {
    return <BasicCalculator />;
}
