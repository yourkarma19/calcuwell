
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Vo2MaxCalculator() {
  const [gender, setGender] = usePersistentState<"male" | "female">("vo2max-gender", "male");
  const [age, setAge] = usePersistentState("vo2max-age", 30);
  const [restingHR, setRestingHR] = usePersistentState("vo2max-resting-hr", 65);

  // Using the Uth-Sørensen-Overgaard-Pedersen estimation formula
  const vo2Max = useMemo(() => {
    const maxHR = 220 - age; // A simple estimation for Max HR
    const vo2 = 15.3 * (maxHR / restingHR);
    return vo2 > 0 ? vo2 : 0;
  }, [age, restingHR]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>VO₂ Max Estimator</CardTitle>
            <CardDescription>Estimate your maximum oxygen uptake based on resting heart rate and age.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup value={gender} onValueChange={(v) => setGender(v as any)} className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
                </RadioGroup>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="resting-hr">Resting Heart Rate (BPM)</Label>
                    <Input id="resting-hr" type="number" value={restingHR} onChange={e => setRestingHR(Number(e.target.value))} />
                </div>
            </div>
             <p className="text-xs text-muted-foreground pt-2">Disclaimer: This is a non-exercise estimation and may not be as accurate as a clinical test. It's for informational purposes only.</p>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Estimated VO₂ Max</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold font-headline text-primary">{vo2Max.toFixed(1)}</p>
            <p className="text-lg text-muted-foreground">mL/kg/min</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
