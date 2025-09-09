"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CalculatorContentProps {
  slug: string;
  [key: string]: unknown; // To pass through any other props
}

const ContentLoader = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-8 w-3/4" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </CardContent>
  </Card>
);

export default function CalculatorContent({
  slug,
  ...props
}: CalculatorContentProps) {
  const AboutComponent = dynamic(
    () =>
      import(`@/components/calculator/about/${slug}`).catch(() => () => null),
    {
      loading: () => <ContentLoader />,
      ssr: false, // Ensure this component is client-side only
    },
  );

  return <AboutComponent {...props} />;
}
