"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";

// Helper function to find the greatest common divisor
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export default function RatioCalculator() {
  const [valA, setValA] = usePersistentState("ratio-a", 16);
  const [valB, setValB] = usePersistentState("ratio-b", 9);
  const [valC, setValC] = usePersistentState("ratio-c", 1920);

  const { simplifiedA, simplifiedB, resultD } = useMemo(() => {
    const a = Number(valA);
    const b = Number(valB);
    const c = Number(valC);

    if (!a || !b || !c) return { simplifiedA: a, simplifiedB: b, resultD: "" };

    const commonDivisor = gcd(a, b);
    const sA = a / commonDivisor;
    const sB = b / commonDivisor;

    const res = (c * sB) / sA;
    const rD = Number.isInteger(res) ? res.toString() : res.toFixed(2);

    return { simplifiedA: sA, simplifiedB: sB, resultD: rD };
  }, [valA, valB, valC]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ratio Calculator</CardTitle>
          <CardDescription>
            Enter three values in the proportion A : B = C : D to solve for the
            missing value. Also simplifies the A : B ratio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="valA">A</Label>
              <Input
                id="valA"
                aria-label="Value A"
                type="number"
                value={valA}
                onChange={(e) => setValA(Number(e.target.value))}
                className="w-24 text-center"
              />
            </div>
            <span className="text-2xl mt-6">:</span>
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="valB">B</Label>
              <Input
                id="valB"
                aria-label="Value B"
                type="number"
                value={valB}
                onChange={(e) => setValB(Number(e.target.value))}
                className="w-24 text-center"
              />
            </div>
            <span className="text-2xl mt-6">=</span>
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="valC">C</Label>
              <Input
                id="valC"
                aria-label="Value C"
                type="number"
                value={valC}
                onChange={(e) => setValC(Number(e.target.value))}
                className="w-24 text-center"
              />
            </div>
            <span className="text-2xl mt-6">:</span>
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="valD">D (Result)</Label>
              <Input
                id="valD"
                aria-label="Value D (Result)"
                value={resultD}
                readOnly
                className="w-24 text-center bg-primary/10 border-primary/20 font-bold"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simplified Ratio (A : B)</CardTitle>
        </CardHeader>
        <CardContent className="text-center" aria-live="polite">
          <p className="text-4xl font-bold font-headline text-primary">
            {simplifiedA} : {simplifiedB}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>About the Ratio Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is a Ratio? A Simple Explanation
              </AccordionTrigger>
              <AccordionContent>
                A ratio compares two quantities. For example, if there are 8
                girls and 12 boys, the ratio of girls to boys is 8:12. This can
                be simplified to 2:3 by dividing both numbers by their greatest
                common divisor (4).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How to Simplify a Ratio</AccordionTrigger>
              <AccordionContent>
                To simplify a ratio, you find the largest number that both parts
                of the ratio can be divided by without a remainder (the Greatest
                Common Divisor). For the ratio 12:18, the GCD is 6. Dividing
                both parts by 6 gives the simplified ratio 2:3.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Understanding Aspect Ratios (e.g., 16:9 vs 4:3)
              </AccordionTrigger>
              <AccordionContent>
                Aspect ratio describes the relationship between the width and
                height of a screen. A 16:9 ratio, common for modern TVs, means
                for every 16 units of width, there are 9 units of height. An
                older, squarish TV used a 4:3 aspect ratio.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
