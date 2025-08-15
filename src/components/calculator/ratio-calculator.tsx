"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Helper function to find the greatest common divisor
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export default function RatioCalculator() {
  const [valA, setValA] = useState(16);
  const [valB, setValB] = useState(9);
  const [valC, setValC] = useState(1920);
  const [isSolvingForD, setIsSolvingForD] = useState(true);

  const { simplifiedA, simplifiedB, resultD } = useMemo(() => {
    const a = Number(valA);
    const b = Number(valB);
    const c = Number(valC);

    if (!a || !b || !c) return { simplifiedA: a, simplifiedB: b, resultD: "" };
    
    const commonDivisor = gcd(a, b);
    const sA = a / commonDivisor;
    const sB = b / commonDivisor;

    let rD = "";
    if (isSolvingForD) {
      const res = (c * sB) / sA;
      rD = Number.isInteger(res) ? res.toString() : res.toFixed(2);
    }

    return { simplifiedA: sA, simplifiedB: sB, resultD: rD };
  }, [valA, valB, valC, isSolvingForD]);


  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader><CardTitle>Ratio Calculator</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter three values to solve for the fourth in the proportion A : B = C : D.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="valA">A</Label>
              <Input id="valA" type="number" value={valA} onChange={e => setValA(Number(e.target.value))} className="w-24 text-center" />
            </div>
            <span className="text-2xl mt-6">:</span>
            <div className="flex flex-col items-center gap-1">
               <Label htmlFor="valB">B</Label>
              <Input id="valB" type="number" value={valB} onChange={e => setValB(Number(e.target.value))} className="w-24 text-center" />
            </div>
            <span className="text-2xl mt-6">=</span>
             <div className="flex flex-col items-center gap-1">
               <Label htmlFor="valC">C</Label>
              <Input id="valC" type="number" value={valC} onChange={e => setValC(Number(e.target.value))} className="w-24 text-center" />
            </div>
            <span className="text-2xl mt-6">:</span>
             <div className="flex flex-col items-center gap-1">
               <Label htmlFor="valD">D</Label>
              <Input id="valD" value={resultD} readOnly className="w-24 text-center bg-primary/10 border-primary/20" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Simplified Ratio</CardTitle></CardHeader>
        <CardContent className="text-center">
            <p className="text-4xl font-bold font-headline text-primary">
                {simplifiedA} : {simplifiedB}
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
