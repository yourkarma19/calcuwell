
"use client";

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import PlaceholderCalculator from './placeholder-calculator';

interface CalculatorLoaderProps {
  slug: string;
  [key: string]: any; // Accept any other props
}

export default function CalculatorLoader({ slug, ...props }: CalculatorLoaderProps) {
  const CalculatorComponent = useMemo(() => {
    return dynamic(
      () => import(`@/components/calculator/${slug}`),
      {
        loading: () => <PlaceholderCalculator />,
      }
    );
  }, [slug]);

  // Pass all props through to the loaded component
  return <CalculatorComponent {...props} />;
}
