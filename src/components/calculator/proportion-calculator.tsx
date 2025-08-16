
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function ProportionCalculator() {
  const [valA, setValA] = usePersistentState("proportion-a", 1);
  const [valB, setValB] = usePersistentState("proportion-b", 2);
  const [valC, setValC] = usePersistentState("proportion-c", 5);
  const [valD, setValD] = usePersistentState("proportion-d", 10);
  const [solveFor, setSolveFor] = usePersistentState<'a' | 'b' | 'c' | 'd'>('proportion-solve', 'd');

  const result = useMemo(() => {
    const a = Number(valA);
    const b = Number(valB);
    const c = Number(valC);
    const d = Number(valD);

    try {
        if (solveFor === 'd') return (b * c) / a;
        if (solveFor === 'c') return (a * d) / b;
        if (solveFor === 'b') return (a * d) / c;
        if (solveFor === 'a') return (b * c) / d;
    } catch {
        return NaN;
    }
    return NaN;

  }, [valA, valB, valC, valD, solveFor]);

  const getInputProps = (field: 'a' | 'b' | 'c' | 'd') => {
    let value, setter;
    switch(field) {
        case 'a': [value, setter] = [valA, setValA]; break;
        case 'b': [value, setter] = [valB, setValB]; break;
        case 'c': [value, setter] = [valC, setValC]; break;
        case 'd': [value, setter] = [valD, setValD]; break;
    }

    if (field === solveFor) {
        return { 
            value: !isNaN(result) ? result.toFixed(4) : "Error",
            readOnly: true, 
            className: "font-bold text-primary bg-primary/10 border-primary/20",
            onClick: () => setSolveFor(field),
            'aria-label': `Value ${field.toUpperCase()} (Result)`
        };
    }
    
    return { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setter(Number(e.target.value)), onClick: () => setSolveFor(field), 'aria-label': `Value ${field.toUpperCase()}` };
  };


  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Proportion Calculator</CardTitle>
            <CardDescription>Solve for the missing value in the proportion A/B = C/D. Click on an input to solve for it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-2xl">
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="valA">A</Label>
              <Input type="number" {...getInputProps('a')} id="valA" className="w-24 text-center" />
              <div className="h-[2px] w-full bg-foreground" />
              <Label htmlFor="valB" className="sr-only">B</Label>
              <Input type="number" {...getInputProps('b')} id="valB" className="w-24 text-center" />
            </div>
            <span className="font-bold text-primary">=</span>
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="valC">C</Label>
              <Input type="number" {...getInputProps('c')} id="valC" className="w-24 text-center" />
              <div className="h-[2px] w-full bg-foreground" />
              <Label htmlFor="valD" className="sr-only">D</Label>
              <Input type="number" {...getInputProps('d')} id="valD" className="w-24 text-center" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
          <CardHeader><CardTitle>About Proportions</CardTitle></CardHeader>
          <CardContent>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>What is a Proportion?</AccordionTrigger>
                      <AccordionContent>
                          A proportion is an equation stating that two ratios are equal. For example, the ratio 1/2 is equal to the ratio 2/4. This would be written as 1/2 = 2/4. Proportions are used to solve for an unknown value when you have a known ratio.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>How to Solve Proportions Using Cross-Multiplication</AccordionTrigger>
                      <AccordionContent>
                          Cross-multiplication is the method used to solve a proportion. If you have the proportion A/B = C/D, you multiply the numerator of the first fraction by the denominator of the second (A * D), and the numerator of the second fraction by the denominator of the first (C * B). These two products are equal. So, A * D = C * B. You can then solve for the missing value.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                      <AccordionTrigger>Real-World Examples of Proportions</AccordionTrigger>
                      <AccordionContent>
                          Proportions are used everywhere in daily life. Examples include scaling a recipe up or down (if a recipe for 4 people needs 2 cups of flour, how much for 6 people?), reading a map scale (if 1 inch equals 10 miles), or calculating fuel consumption for a trip.
                      </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4">
                      <AccordionTrigger>How are ratios and proportions related?</AccordionTrigger>
                      <AccordionContent>
                          A ratio is a comparison of two numbers (e.g., A:B or A/B). A proportion is a statement that two ratios are equal (e.g., A/B = C/D). A proportion is essentially an equation made of two equal ratios.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
      </Card>
    </div>
  );
}
