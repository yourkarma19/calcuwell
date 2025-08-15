
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProportionCalculator() {
  const [valA, setValA] = usePersistentState("proportion-a", 1);
  const [valB, setValB] = usePersistentState("proportion-b", 2);
  const [valC, setValC] = usePersistentState("proportion-c", 5);
  const [valD, setValD] = usePersistentState("proportion-d", 10);
  const [solveFor, setSolveFor] = usePersistentState<'a' | 'b' | 'c' | 'd'>('proportion-solve', 'd');

  const result = useMemo(() => {
    const a = Number(valA);
    const b = Number(valB);
    const c = Number(valC);
    const d = Number(valD);

    try {
        if (solveFor === 'd') return (b * c) / a;
        if (solveFor === 'c') return (a * d) / b;
        if (solveFor === 'b') return (a * d) / c;
        if (solveFor === 'a') return (b * c) / d;
    } catch {
        return NaN;
    }
    return NaN;

  }, [valA, valB, valC, valD, solveFor]);

  const getInputProps = (field: 'a' | 'b' | 'c' | 'd') => {
    let value, setter;
    switch(field) {
        case 'a': [value, setter] = [valA, setValA]; break;
        case 'b': [value, setter] = [valB, setValB]; break;
        case 'c': [value, setter] = [valC, setValC]; break;
        case 'd': [value, setter] = [valD, setValD]; break;
    }

    if (field === solveFor) {
        return { 
            value: !isNaN(result) ? result.toFixed(4) : "Error",
            readOnly: true, 
            className: "font-bold text-primary bg-primary/10 border-primary/20",
            onClick: () => setSolveFor(field)
        };
    }
    
    return { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setter(Number(e.target.value)), onClick: () => setSolveFor(field) };
  };


  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
            <CardTitle>Proportion Calculator</CardTitle>
            <CardDescription>Solve for the missing value in the proportion A/B = C/D. Click on an input to solve for it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-4 text-2xl">
            <div className="flex flex-col items-center gap-1">
              <Input type="number" {...getInputProps('a')} className="w-24 text-center" />
              <div className="h-[2px] w-full bg-foreground" />
              <Input type="number" {...getInputProps('b')} className="w-24 text-center" />
            </div>
            <span className="font-bold text-primary">=</span>
            <div className="flex flex-col items-center gap-1">
              <Input type="number" {...getInputProps('c')} className="w-24 text-center" />
              <div className="h-[2px] w-full bg-foreground" />
              <Input type="number" {...getInputProps('d')} className="w-24 text-center" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
