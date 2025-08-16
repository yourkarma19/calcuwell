
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function PythagoreanTheoremCalculator() {
  const [solveFor, setSolveFor] = usePersistentState<"a" | "b" | "c">("pythagorean-solveFor", "c");
  const [sideA, setSideA] = usePersistentState("pythagorean-sideA", 3);
  const [sideB, setSideB] = usePersistentState("pythagorean-sideB", 4);
  const [sideC, setSideC] = usePersistentState("pythagorean-sideC", 5);

  const result = useMemo(() => {
    const a = Number(sideA);
    const b = Number(sideB);
    const c = Number(sideC);

    if (solveFor === 'c') {
      if (a > 0 && b > 0) return Math.sqrt(a * a + b * b);
    } else if (solveFor === 'a') {
      if (c > 0 && b > 0 && c > b) return Math.sqrt(c * c - b * b);
    } else if (solveFor === 'b') {
      if (c > 0 && a > 0 && c > a) return Math.sqrt(c * c - a * a);
    }
    return null;
  }, [solveFor, sideA, sideB, sideC]);

  const getInputProps = (side: "a" | "b" | "c") => {
    if (side === solveFor) {
      return { value: result !== null ? result.toFixed(4) : "Result", readOnly: true, className: "font-bold text-primary bg-primary/10 border-primary/20" };
    }
    
    let value, setter;
    if (side === 'a') { value = sideA; setter = setSideA; }
    if (side === 'b') { value = sideB; setter = setSideB; }
    if (side === 'c') { value = sideC; setter = setSideC; }

    return { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setter?.(Number(e.target.value)) };
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pythagorean Theorem Calculator</CardTitle>
            <CardDescription>For a right-angled triangle, find the length of a missing side (a, b, or c) using the formula a² + b² = c².</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Solve for which side?</Label>
              <RadioGroup value={solveFor} onValueChange={(v) => setSolveFor(v as any)} className="flex space-x-4 pt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="a" id="a" /><Label htmlFor="a">Side a</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="b" id="b" /><Label htmlFor="b">Side b</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="c" id="c" /><Label htmlFor="c">Hypotenuse c</Label></div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sideA">Side a</Label>
                <Input id="sideA" type="number" {...getInputProps('a')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sideB">Side b</Label>
                <Input id="sideB" type="number" {...getInputProps('b')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sideC">Hypotenuse c</Label>
                <Input id="sideC" type="number" {...getInputProps('c')} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About the Pythagorean Theorem</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the Pythagorean Theorem?</AccordionTrigger>
                        <AccordionContent>
                            The Pythagorean theorem is a fundamental principle in geometry that states that for a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle, denoted as 'c') is equal to the sum of the squares of the other two sides (a and b). The formula is a² + b² = c².
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How to Use the Calculator</AccordionTrigger>
                        <AccordionContent>
                            Select which side you want to solve for (a, b, or c). Enter the lengths of the two known sides into their respective fields. The calculator will automatically compute the length of the unknown side. The theorem only applies to right-angled triangles.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is a Hypotenuse?</AccordionTrigger>
                        <AccordionContent>
                           The hypotenuse is the longest side of a right-angled triangle. It is always the side that is opposite the 90-degree angle. In the formula a² + b² = c², 'c' represents the hypotenuse.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Real-World Applications</AccordionTrigger>
                        <AccordionContent>
                           The Pythagorean theorem is used extensively in architecture, construction, navigation, and physics. For example, it can be used to calculate the diagonal distance across a rectangular room, determine the steepness of a ramp, or find the shortest distance for a boat to travel between two points.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">The length of the missing side is:</p>
            <p className="text-5xl font-bold font-headline text-primary my-2">
                {result !== null ? result.toFixed(4) : "Invalid"}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
