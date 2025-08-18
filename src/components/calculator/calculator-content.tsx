"use client";

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CalculatorContentProps {
  slug: string;
  [key: string]: any; // To pass through any other props
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


export default function CalculatorContent({ slug, ...props }: CalculatorContentProps) {
  const AboutComponent = useMemo(() => {
    return dynamic(
      () => import(`@/components/calculator/about/${slug}`).catch(() => () => null),
      {
        loading: () => <ContentLoader />,
        ssr: false,
      }
    );
  }, [slug]);

  return <AboutComponent {...props} />;
}
