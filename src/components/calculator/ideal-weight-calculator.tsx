
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// Using Robinson Formula (1983)
const calculateIdealWeight = (heightCm: number, gender: "male" | "female") => {
  const heightInches = heightCm / 2.54;
  if (heightInches <= 60) {
    return gender === "male" ? 52 : 49;
  }
  const baseWeight = gender === "male" ? 52 : 49;
  const multiplier = gender === "male" ? 1.9 : 1.7;
  return baseWeight + multiplier * (heightInches - 60);
};

export default function IdealWeightCalculator() {
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "ideal-weight-gender",
    "male"
  );
  const [height, setHeight] = usePersistentState("ideal-weight-height", 175);

  const idealWeightKg = useMemo(() => {
    if (height > 0) {
      return calculateIdealWeight(height, gender);
    }
    return 0;
  }, [height, gender]);

  const idealWeightRange = useMemo(() => {
    const lowerBound = idealWeightKg * 0.9;
    const upperBound = idealWeightKg * 1.1;
    return {
      lower: lowerBound.toFixed(1),
      upper: upperBound.toFixed(1),
    };
  }, [idealWeightKg]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
          <CardDescription>Calculate your ideal body weight based on your height and gender using the Robinson formula.</CardDescription>
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
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="e.g., 175"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Ideal Weight</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">According to Robinson Formula</p>
          <p className="text-5xl font-bold font-headline text-primary my-2">
            {idealWeightKg.toFixed(1)} kg
          </p>
          <p className="text-muted-foreground">
            Healthy range: {idealWeightRange.lower} - {idealWeightRange.upper} kg
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
