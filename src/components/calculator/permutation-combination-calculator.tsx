"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Helper function to calculate factorial
const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export default function PermutationCombinationCalculator() {
  const [mode, setMode] = useState<"permutation" | "combination">("permutation");
  const [totalItems, setTotalItems] = useState(10); // n
  const [chosenItems, setChosenItems] = useState(3); // r

  const { permutations, combinations } = useMemo(() => {
    const n = Number(totalItems);
    const r = Number(chosenItems);

    if (n < 0 || r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) {
      return { permutations: "Invalid input", combinations: "Invalid input" };
    }

    const nFact = factorial(n);
    const rFact = factorial(r);
    const nMinusRFact = factorial(n - r);
    
    if (isNaN(nFact) || isNaN(rFact) || isNaN(nMinusRFact)) {
      return { permutations: "Calculation overflow", combinations: "Calculation overflow" };
    }

    const p = nFact / nMinusRFact;
    const c = p / rFact;

    return {
      permutations: p.toLocaleString(),
      combinations: c.toLocaleString(),
    };
  }, [totalItems, chosenItems]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Permutations & Combinations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-items">Total number of items (n)</Label>
                <Input id="total-items" type="number" value={totalItems} onChange={e => setTotalItems(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chosen-items">Number of items to choose (r)</Label>
                <Input id="chosen-items" type="number" value={chosenItems} onChange={e => setChosenItems(Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Permutations (nPr)</p>
              <p className="text-3xl font-bold font-headline text-primary">{permutations}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Combinations (nCr)</p>
              <p className="text-3xl font-bold font-headline">{combinations}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
