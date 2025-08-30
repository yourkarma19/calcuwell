
"use client";

import dynamic from 'next/dynamic';
import PlaceholderCalculator from './placeholder-calculator';

interface CalculatorLoaderProps {
  slug: string;
  [key: string]: unknown; // Accept any other props
}

export default function CalculatorLoader({ slug, ...props }: CalculatorLoaderProps) {
  const CalculatorComponent = dynamic(
      () => import(`@/components/calculator/${slug}`),
      {
        loading: () => <PlaceholderCalculator />,
      }
    );

  // Pass all props through to the loaded component
  return <CalculatorComponent {...props} />;
}
