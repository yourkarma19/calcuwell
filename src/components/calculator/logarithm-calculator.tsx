"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LogarithmCalculator() {
  const [number, setNumber] = useState(100);
  const [base, setBase] = useState(10);

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
