
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// Widmark formula: BAC = (Alcohol g / (Body Weight g * Gender Constant)) * 100
// Gender constant (r): Male: 0.68, Female: 0.55
// Assumes 1 standard drink = 14g of alcohol.

const getBacInfo = (bac: number) => {
    if (bac <= 0.0) return { level: 'Sober', color: 'text-green-500', description: "Minimal or no effect." };
    if (bac < 0.02) return { level: 'Minimal Impairment', color: 'text-green-500', description: "Slight mood elevation." };
    if (bac < 0.05) return { level: 'Mild Impairment', color: 'text-yellow-500', description: "Lowered alertness, impaired judgment." };
    if (bac < 0.08) return { level: 'Impaired', color: 'text-yellow-500', description: "Muscle coordination and reaction time are impaired." };
    if (bac < 0.15) return { level: 'Legally Impaired', color: 'text-red-500', description: "Significant impairment of motor coordination and judgment. Illegal to drive." };
    if (bac < 0.30) return { level: 'High Risk', color: 'text-red-500', description: "Vomiting and potential loss of consciousness." };
    return { level: 'Very High Risk', color: 'text-red-700', description: "Risk of coma or death." };
};


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

  const { level, color, description } = getBacInfo(bac);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
          <CardDescription>Estimate your Blood Alcohol Content (BAC). This is an educational estimate and should not be used to determine if it is safe to drive.</CardDescription>
        </CardHeader>
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
            <p className="text-xs text-muted-foreground pt-2">Disclaimer: This is an estimate and should not be used to determine if it is safe to drive. Many factors affect BAC, including metabolism, food intake, and health conditions.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Estimated BAC</CardTitle></CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">Blood Alcohol Content</p>
          <p className={cn("text-6xl font-bold font-headline my-2", color)}>
            {bac.toFixed(3)}%
          </p>
          <p className={cn("text-xl font-semibold", color)}>{level}</p>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
