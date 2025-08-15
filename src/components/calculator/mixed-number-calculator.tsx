
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Helper to convert mixed number to improper fraction
const toImproper = (whole: number, num: number, den: number) => {
    return { num: whole * den + num, den };
};

// Helper to convert improper fraction to mixed number
const toMixed = (num: number, den: number) => {
    const whole = Math.floor(num / den);
    const newNum = num % den;
    return { whole, num: newNum, den };
};

// Placeholder for future operations like addition, subtraction etc.

export default function MixedNumberCalculator() {
    const [whole, setWhole] = usePersistentState("mixed-whole", 1);
    const [numerator, setNumerator] = usePersistentState("mixed-num", 1);
    const [denominator, setDenominator] = usePersistentState("mixed-den", 2);

    const improperFraction = useMemo(() => {
        if (denominator === 0) return { num: "Invalid", den: "Denominator" };
        const w = Number(whole) || 0;
        const n = Number(numerator) || 0;
        const d = Number(denominator) || 1;
        return toImproper(w, n, d);
    }, [whole, numerator, denominator]);

    return (
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Mixed Number to Improper Fraction</CardTitle>
                    <CardDescription>Convert a mixed number (a whole number and a fraction) into an improper fraction. More operations coming soon.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Label>Enter Mixed Number</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={whole}
                            onChange={(e) => setWhole(Number(e.target.value))}
                            className="w-24 text-center"
                            aria-label="Whole Number"
                        />
                        <div className="flex flex-col items-center gap-1">
                            <Input
                                type="number"
                                value={numerator}
                                onChange={(e) => setNumerator(Number(e.target.value))}
                                className="w-24 text-center"
                                aria-label="Numerator"
                            />
                            <div className="h-[2px] w-full bg-foreground" />
                            <Input
                                type="number"
                                value={denominator}
                                onChange={(e) => setDenominator(Number(e.target.value))}
                                className="w-24 text-center"
                                aria-label="Denominator"
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <h3 className="text-muted-foreground font-semibold">Improper Fraction Equivalent</h3>
                        <div className="flex items-center gap-4 text-3xl font-bold">
                            <p className="text-primary font-headline">
                                {improperFraction.num} / {improperFraction.den}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
