
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
        if (solveFor === 'd') {
            if (a === 0) return NaN;
            return (b * c) / a;
        }
        if (solveFor === 'c') {
            if (b === 0) return NaN;
            return (a * d) / b;
        }
        if (solveFor === 'b') {
            if (c === 0) return NaN;
            return (a * d) / c;
        }
        if (solveFor === 'a') {
            if (d === 0) return NaN;
            return (b * c) / d;
        }
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
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Proportion Calculator** is a powerful tool for solving equations involving two equivalent ratios. A proportion is a statement that two fractions are equal, written as A/B = C/D. This calculator allows you to find the missing value in the equation, making it invaluable for students, cooks, engineers, and anyone who needs to scale quantities.</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter any three known values into the boxes for A, B, C, and D.</li>
                <li>The calculator will automatically solve for the fourth, missing value.</li>
                <li>To solve for a different value, simply click on its input box, and it will become the new result field.</li>
            </ol>
            <p>The tool uses cross-multiplication to deliver an instant and accurate answer.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">How do you solve proportions using cross-multiplication?</AccordionTrigger>
                    <AccordionContent>
                        <p>Cross-multiplication is the standard method to solve a proportion. For the equation A/B = C/D, you multiply the numerator of the first fraction by the denominator of the second (A × D) and set it equal to the product of the other two (B × C). This gives you the equation A × D = B × C. From there, you can use simple algebra to solve for the unknown variable.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold">What are some real-world examples of proportions?</AccordionTrigger>
                    <AccordionContent>
                       <p>Proportions are used everywhere in daily life, often without us even realizing it. Common examples include:</p>
                        <ul className='list-disc pl-5 mt-2'>
                          <li>**Cooking:** Scaling a recipe up or down. If a recipe for 4 people needs 2 cups of flour, you can use a proportion to find how much flour is needed for 6 people.</li>
                          <li>**Maps:** Reading a map's scale. If 1 inch on the map equals 10 miles in reality, you can calculate the actual distance between two points.</li>
                          <li>**Finance:** Calculating fuel consumption for a trip or determining the price of items sold by weight.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold">What is the difference between a ratio and a proportion?</AccordionTrigger>
                    <AccordionContent>
                       <p>A **ratio** is a comparison of two numbers (e.g., A:B or A/B), showing their relative size. A **proportion** is an equation that states that two ratios are equal (e.g., A/B = C/D). In essence, a proportion is an equation built from two equal ratios. You can't have a proportion without ratios.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </CardContent>
      </Card>
    </div>
  );
}
