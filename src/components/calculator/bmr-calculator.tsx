"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BmrCalculator() {
  const [age, setAge] = usePersistentState("bmr-age", 25);
  const [gender, setGender] = usePersistentState<"male" | "female">("bmr-gender", "male");
  const [height, setHeight] = usePersistentState("bmr-height", 175);
  const [weight, setWeight] = usePersistentState("bmr-weight", 70);

  const bmr = useMemo(() => {
    if (age > 0 && height > 0 && weight > 0) {
      // Using Mifflin-St Jeor Equation
      const bmrValue =
        10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);
      return bmrValue > 0 ? bmrValue : 0;
    }
    return 0;
  }, [age, gender, height, weight]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="e.g., 25"
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                defaultValue={gender}
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
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                placeholder="e.g., 70"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle>Your BMR Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">Your Basal Metabolic Rate is</p>
            <p className="text-6xl font-bold font-headline text-primary my-2">
              {bmr.toFixed(0)}
            </p>
            <p className="text-lg text-muted-foreground">calories / day</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
