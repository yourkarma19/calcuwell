"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function LogarithmCalculator() {
  const [number, setNumber] = usePersistentState("log-number", 100);
  const [base, setBase] = usePersistentState("log-base", 10);

  const result = useMemo(() => {
    const num = Number(number);
    const b = Number(base);

    if (num <= 0 || b <= 0 || b === 1) {
      return "Invalid input";
    }

    const logResult = Math.log(num) / Math.log(b);
    return logResult.toFixed(6);
  }, [number, base]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Logarithm Calculator</CardTitle>
            <CardDescription>Calculate the logarithm of a number to a specified base. The number and base must be positive, and the base cannot be 1.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number-input">Number (x)</Label>
                <Input
                  id="number-input"
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base-input">Base (b)</Label>
                <Input
                  id="base-input"
                  type="number"
                  value={base}
                  onChange={(e) => setBase(Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About the Logarithm Calculator</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The Logarithm Calculator helps you find the logarithm of any positive number to any positive base (except 1). Logarithms are the reverse of exponents. They answer the question: "To what power must we raise a base to get another number?" This tool is great for students and professionals who work with exponential growth or decay.</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the **Number (x)** you want to find the logarithm of.</li>
                <li>Enter the **Base (b)** for the logarithm.</li>
            </ol>
            <p>The result of log b(x) will be calculated and displayed instantly.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is a logarithm?</AccordionTrigger>
                <AccordionContent>
                  A logarithm is the power to which a number (the base) must be raised to get another number. For example, the logarithm of 100 to base 10 is 2. This is because 10² = 100.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Common Log vs. Natural Log</AccordionTrigger>
                <AccordionContent>
                  The **common logarithm (log)** has a base of 10 and is widely used in science. The **natural logarithm (ln)** has a base of *e* (about 2.718) and is important in math, physics, and finance for describing continuous growth.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Why can't the base be 1?</AccordionTrigger>
                <AccordionContent>
                  The base of a logarithm cannot be 1 because 1 raised to any power is always 1. This means you could never get any other number. This makes the operation undefined for most values.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What is the Change of Base Formula?</AccordionTrigger>
                <AccordionContent>
                  Most calculators only have buttons for common log (base 10) and natural log (base e). To find a logarithm with a different base, you use the change of base formula: `logb(x) = logc(x) / logc(b)`. This calculator uses this formula internally.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">log<sub>{base}</sub>({number}) is:</p>
            <p className="text-4xl font-bold font-headline text-primary my-2 break-words">
              {result}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
