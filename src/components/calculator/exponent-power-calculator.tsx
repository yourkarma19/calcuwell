"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExponentPowerCalculator() {
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(10);

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
            <CardTitle>Exponent & Power Calculator</CardTitle>
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
