
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
        <div className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Mixed Number to Improper Fraction</CardTitle>
                    <CardDescription>Convert a mixed number (a whole number and a fraction) into an improper fraction. More operations coming soon.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Label id="mixed-number-label">Enter Mixed Number</Label>
                    <div role="group" aria-labelledby="mixed-number-label" className="flex items-center gap-2">
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
            <Card>
                <CardHeader><CardTitle>About Mixed Numbers</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What Are Mixed Numbers?</AccordionTrigger>
                            <AccordionContent>
                                A mixed number is a whole number combined with a proper fraction. It's a way of representing a value greater than one. For example, if you have 2 full pizzas and a half pizza, you would write it as 2 ½.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Step-by-Step Guide: How to Convert an Improper Fraction to a Mixed Number</AccordionTrigger>
                            <AccordionContent>
                                To convert an improper fraction (where the numerator is larger than the denominator) to a mixed number, you divide the numerator by the denominator. The quotient becomes the whole number, the remainder becomes the new numerator, and the denominator stays the same. For example, 7/3 becomes 2 with a remainder of 1, so the mixed number is 2 ⅓.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How to Add and Subtract Mixed Numbers (The Easy Way)</AccordionTrigger>
                            <AccordionContent>
                                The easiest way to add or subtract mixed numbers is to first convert them to improper fractions. Then, find a common denominator, perform the addition or subtraction on the numerators, and finally, convert the result back to a mixed number if needed.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Can a mixed number be negative?</AccordionTrigger>
                            <AccordionContent>
                                Yes, a mixed number can be negative. A negative mixed number like -3 ½ represents the sum of a negative whole number (-3) and a negative fraction (-½). The entire value is negative.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
