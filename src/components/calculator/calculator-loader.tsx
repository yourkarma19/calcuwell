"use client";

import { Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import PlaceholderCalculator from "@/components/calculator/placeholder-calculator";

interface CalculatorLoaderProps {
    slug: string;
}

export default function CalculatorLoader({ slug }: CalculatorLoaderProps) {

    const CalculatorComponent = useMemo(() => dynamic(
        () => import(`@/components/calculator/${slug}`).catch(() => PlaceholderCalculator), 
        {
          loading: () => <div className="lg:col-span-3 text-center">Loading calculator...</div>,
          ssr: false, // Most calculators are client-side interactive
        }
    ), [slug]);

    return (
        <Suspense fallback={<div className="lg:col-span-3 text-center">Loading calculator...</div>}>
            <CalculatorComponent />
        </Suspense>
    );
}
