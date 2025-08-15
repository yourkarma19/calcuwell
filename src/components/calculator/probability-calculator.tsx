
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProbabilityCalculator() {
  const [mode, setMode] = usePersistentState<'single' | 'independent'>('prob-mode', 'single');
  const [probA, setProbA] = usePersistentState('prob-a', 0.5);
  const [probB, setProbB] = usePersistentState('prob-b', 0.5);

  const result = useMemo(() => {
    if (mode === 'single') {
        const pA = Number(probA);
        if (pA < 0 || pA > 1) return { value: "Probabilities must be between 0 and 1", percentage: "" };
        return {
            value: `P(A) = ${pA}`,
            percentage: `Not A = ${(1-pA).toFixed(4)}`
        };
    } else {
        const pA = Number(probA);
        const pB = Number(probB);
        if (pA < 0 || pA > 1 || pB < 0 || pB > 1) return { value: "Probabilities must be between 0 and 1", percentage: "" };
        const pAandB = pA * pB;
        const pAorB = pA + pB - pAandB;
        return {
            value: `P(A and B) = ${pAandB.toFixed(4)}`,
            percentage: `P(A or B) = ${pAorB.toFixed(4)}`
        };
    }
  }, [mode, probA, probB]);


  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
            <CardTitle>Probability Calculator</CardTitle>
            <CardDescription>Calculate probabilities for single or two independent events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label>Mode</Label>
                <Select value={mode} onValueChange={m => setMode(m as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="single">Single Event Probability</SelectItem>
                        <SelectItem value="independent">Two Independent Events</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="probA">Probability of A (0 to 1)</Label>
                    <Input id="probA" type="number" value={probA} onChange={e => setProbA(Number(e.target.value))} step="0.01" min="0" max="1" />
                </div>
                {mode === 'independent' && (
                    <div className="space-y-2">
                        <Label htmlFor="probB">Probability of B (0 to 1)</Label>
                        <Input id="probB" type="number" value={probB} onChange={e => setProbB(Number(e.target.value))} step="0.01" min="0" max="1" />
                    </div>
                )}
            </div>
             <div className="pt-4 text-center">
                <h3 className="text-lg font-semibold">Results</h3>
                <p className="text-2xl font-bold font-headline text-primary">{result.value}</p>
                {result.percentage && <p className="text-xl font-semibold text-muted-foreground">{result.percentage}</p>}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
