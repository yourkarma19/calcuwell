
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Widmark formula: BAC = (Alcohol g / (Body Weight g * Gender Constant)) * 100
// Gender constant (r): Male: 0.68, Female: 0.55
// Assumes 1 standard drink = 14g of alcohol.

export default function BacCalculator() {
  const [weight, setWeight] = usePersistentState("bac-weight", 70); // in kg
  const [gender, setGender] = usePersistentState<"male" | "female">("bac-gender", "male");
  const [drinks, setDrinks] = usePersistentState("bac-drinks", 2); // standard drinks
  const [hours, setHours] = usePersistentState("bac-hours", 2); // hours since first drink

  const bac = useMemo(() => {
    if (weight <= 0 || drinks <= 0 || hours < 0) return 0;
    
    const alcoholGrams = drinks * 14;
    const bodyWeightGrams = weight * 1000;
    const genderConstant = gender === 'male' ? 0.68 : 0.55;
    const eliminationRate = 0.015; // % per hour

    const rawBac = (alcoholGrams / (bodyWeightGrams * genderConstant)) * 100;
    const currentBac = rawBac - (hours * eliminationRate);

    return Math.max(0, currentBac);
  }, [weight, gender, drinks, hours]);

  const getBacColor = (b: number) => {
    if (b < 0.02) return "text-green-500";
    if (b < 0.08) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader><CardTitle>Enter Your Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="weight">Body Weight (kg)</Label>
                    <Input id="weight" type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup value={gender} onValueChange={(v) => setGender(v as any)} className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
                    </RadioGroup>
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="drinks">Standard Drinks Consumed</Label>
                    <Input id="drinks" type="number" value={drinks} onChange={e => setDrinks(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="hours">Hours Since First Drink</Label>
                    <Input id="hours" type="number" value={hours} onChange={e => setHours(Number(e.target.value))} />
                </div>
            </div>
             <p className="text-xs text-muted-foreground pt-2">Note: This is an estimate and should not be used to determine if it is safe to drive. Many factors affect BAC.</p>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Estimated BAC</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">Blood Alcohol Content</p>
            <p className={`text-6xl font-bold font-headline my-2 ${getBacColor(bac)}`}>
              {bac.toFixed(3)}%
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
