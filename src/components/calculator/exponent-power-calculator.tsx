"use client";

import { useMemo } from "react";
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Exponent & Power Calculator</CardTitle>
          <CardDescription>
            Calculate the result of a base raised to the power of an exponent.
          </CardDescription>
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
                aria-label="Base value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exponent-input">Exponent (y)</Label>
              <Input
                id="exponent-input"
                type="number"
                value={exponent}
                onChange={(e) => setExponent(Number(e.target.value))}
                aria-label="Exponent value"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center" aria-live="polite">
          <p className="text-sm text-muted-foreground">
            {base} ^ {exponent} is:
          </p>
          <p className="text-4xl font-bold font-headline text-primary my-2 break-words">
            {result}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
