
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FractionToPercentageCalculator() {
    const [numerator, setNumerator] = usePersistentState("ftp-num", 3);
    const [denominator, setDenominator] = usePersistentState("ftp-den", 4);

    const percentage = useMemo(() => {
        if (denominator === 0) return NaN;
        return (numerator / denominator) * 100;
    }, [numerator, denominator]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Fraction to Percentage Calculator</CardTitle>
                    <CardDescription>Convert any fraction into its equivalent percentage value.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="numerator">Numerator</Label>
                            <Input id="numerator" type="number" value={numerator} onChange={e => setNumerator(Number(e.target.value))}/>
                        </div>
                        <span className="text-3xl mt-7">/</span>
                        <div className="flex-1 space-y-2">
                             <Label htmlFor="denominator">Denominator</Label>
                            <Input id="denominator" type="number" value={denominator} onChange={e => setDenominator(Number(e.target.value))}/>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-5xl font-bold font-headline text-primary">
                        {isNaN(percentage) ? "Invalid" : percentage.toFixed(2)}%
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Calculation: ({numerator} / {denominator}) × 100
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
