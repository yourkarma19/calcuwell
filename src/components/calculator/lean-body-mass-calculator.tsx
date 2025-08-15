"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Using the Boer formula
const calculateLBM = (weightKg: number, heightCm: number, gender: "male" | "female") => {
  if (gender === "male") {
    return (0.407 * weightKg) + (0.267 * heightCm) - 19.2;
  } else {
    return (0.252 * weightKg) + (0.473 * heightCm) - 48.3;
  }
};

export default function LeanBodyMassCalculator() {
  const [gender, setGender] = usePersistentState<"male" | "female">("lbm-gender", "male");
  const [height, setHeight] = usePersistentState("lbm-height", 175);
  const [weight, setWeight] = usePersistentState("lbm-weight", 70);

  const { lbm, bodyFatPercentage } = useMemo(() => {
    if (height > 0 && weight > 0) {
      const lbmValue = calculateLBM(weight, height, gender);
      const fatMass = weight - lbmValue;
      const bfp = (fatMass / weight) * 100;
      return {
        lbm: lbmValue,
        bodyFatPercentage: bfp > 0 ? bfp : 0,
      };
    }
    return { lbm: 0, bodyFatPercentage: 0 };
  }, [gender, height, weight]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Lean Body Mass Calculator</CardTitle>
            <CardDescription>Estimate your Lean Body Mass (LBM) using the Boer formula, which is based on your weight and height.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={gender}
                onValueChange={(val) => setGender(val as "male" | "female")}
                className="flex items-center space-x-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Lean Body Mass (LBM)</p>
              <p className="text-4xl font-bold font-headline text-primary">
                {lbm.toFixed(1)} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Est. Body Fat</p>
              <p className="text-2xl font-semibold">
                {bodyFatPercentage.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
