"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SquareRootCubeRootCalculator() {
  const [number, setNumber] = useState(27);

  const { squareRoot, cubeRoot } = useMemo(() => {
    const num = Number(number);
    if (isNaN(num)) return { squareRoot: "Invalid", cubeRoot: "Invalid" };
    
    // For negative numbers, square root is imaginary, but cube root is real.
    const sqRoot = num >= 0 ? Math.sqrt(num) : `√${-num} i`;
    const cbRoot = Math.cbrt(num);

    return { 
        squareRoot: typeof sqRoot === 'number' ? sqRoot.toFixed(6) : sqRoot, 
        cubeRoot: cbRoot.toFixed(6) 
    };

  }, [number]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Square & Cube Root Calculator</CardTitle>
            <CardDescription>Enter a number to find its square and cube roots.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number-input">Number</Label>
              <Input
                id="number-input"
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
              />
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
              <p className="text-sm text-muted-foreground">Square Root (√)</p>
              <p className="text-3xl font-bold font-headline text-primary break-all">{squareRoot}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cube Root (∛)</p>
              <p className="text-3xl font-bold font-headline">{cubeRoot}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
