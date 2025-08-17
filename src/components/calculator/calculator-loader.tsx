
"use client";

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import PlaceholderCalculator from './placeholder-calculator';

interface CalculatorLoaderProps {
  slug: string;
  setFormula?: (formula: string) => void;
}

export default function CalculatorLoader({ slug, setFormula }: CalculatorLoaderProps) {
  const CalculatorComponent = useMemo(() => {
    return dynamic(
      () => import(`@/components/calculator/${slug}`)
        .then(mod => mod.default)
        .catch(() => () => <PlaceholderCalculator />),
      {
        loading: () => <PlaceholderCalculator />,
        ssr: false,
      }
    );
  }, [slug]);

  // @ts-ignore
  return <CalculatorComponent setFormula={setFormula} />;
}
