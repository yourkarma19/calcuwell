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
        loading: () => <div className="lg:col-span-3 text-center p-8">Loading calculator...</div>,
        ssr: false,
      }
    );
  }, [slug]);

  // @ts-ignore
  return <CalculatorComponent setFormula={setFormula} />;
}
