
"use client";

import { useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";

export default function ExponentPowerCalculator() {
  const [base, setBase] = usePersistentState("exp-base", 2);
  const [exponent, setExponent] = usePersistentState("exp-exponent", 10);

  const result = useMemo(() => {
    const b = Number(base);
    const exp = Number(exponent);

    if (isNaN(b) || isNaN(exp)) {
      return "Invalid input";
    }

    const res = Math.pow(b, exp);
    if (!isFinite(res)) return "Result too large";
    
    return res.toLocaleString();
    
  }, [base, exponent]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Exponent &amp; Power Calculator</CardTitle>
            <CardDescription>Calculate the result of a base raised to the power of an exponent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base-input">Base (x)</Label>
                <Input
                  id="base-input"
                  type="number"
                  value={base}
                  onChange={(e) => setBase(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exponent-input">Exponent (y)</Label>
                <Input
                  id="exponent-input"
                  type="number"
                  value={exponent}
                  onChange={(e) => setExponent(Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About the Exponent Calculator</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What does an exponent mean?</AccordionTrigger>
                <AccordionContent>
                  An exponent indicates how many times to multiply a number (the base) by itself. For example, in the expression 2⁴, the base is 2 and the exponent is 4. This means you multiply 2 by itself four times: 2 × 2 × 2 × 2 = 16.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What about negative exponents?</AccordionTrigger>
                <AccordionContent>
                  A negative exponent means to take the reciprocal of the base raised to the positive exponent. The formula is `x⁻ⁿ = 1 / xⁿ`. For example, 2⁻³ is the same as 1 / 2³, which equals 1/8 or 0.125.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What about fractional exponents?</AccordionTrigger>
                <AccordionContent>
                   A fractional exponent like `x¹/ⁿ` is another way of writing a root. For example, `9¹/²` is the same as the square root of 9 (√9), which is 3. Similarly, `8¹/³` is the cube root of 8 (∛8), which is 2.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger>What is an exponent of zero?</AccordionTrigger>
                <AccordionContent>
                   Any non-zero number raised to the power of zero is equal to 1. For example, 5⁰ = 1. This rule is a fundamental property of exponents that ensures mathematical consistency.
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
            <p className="text-sm text-muted-foreground">{base} ^ {exponent} is:</p>
            <p className="text-4xl font-bold font-headline text-primary my-2 break-words">
              {result}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
