"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const factorial = (n: number): number | string => {
  if (n < 0) return "Invalid input";
  if (n > 170) return "Number too large"; // Factorial of 171 is Infinity in JS
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export default function FactorialCalculator() {
  const [number, setNumber] = useState(10);

  const result = useMemo(() => {
    const num = Number(number);
    if (!Number.isInteger(num)) return "Input must be an integer.";
    const fact = factorial(num);
    if (typeof fact === 'number') {
        if(fact > 1e16) return fact.toExponential(4);
        return fact.toLocaleString();
    }
    return fact;
  }, [number]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Factorial Calculator</CardTitle>
            <CardDescription>The factorial of a non-negative integer 'n', denoted by n!, is the product of all positive integers less than or equal to n.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number-input">Enter a non-negative integer (n)</Label>
              <Input
                id="number-input"
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                min="0"
                step="1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">The factorial of {number} is:</p>
            <p className="text-4xl font-bold font-headline text-primary my-2 break-words">
              {result}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
