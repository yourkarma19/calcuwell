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
    </div>
  );
}
