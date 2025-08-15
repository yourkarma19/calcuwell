"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const activityLevels = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

type ActivityLevel = keyof typeof activityLevels;

export default function CalorieNeedsCalculator() {
  const [age, setAge] = usePersistentState("calorie-age", 25);
  const [gender, setGender] = usePersistentState<"male" | "female">("calorie-gender", "male");
  const [height, setHeight] = usePersistentState("calorie-height", 175);
  const [weight, setWeight] = usePersistentState("calorie-weight", 70);
  const [activityLevel, setActivityLevel] = usePersistentState<ActivityLevel>("calorie-activity", "moderate");

  const bmr = useMemo(() => {
    if (age > 0 && height > 0 && weight > 0) {
      const bmrValue = 10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);
      return bmrValue > 0 ? bmrValue : 0;
    }
    return 0;
  }, [age, gender, height, weight]);

  const dailyCalories = useMemo(() => bmr * activityLevels[activityLevel], [bmr, activityLevel]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader><CardTitle>Enter Your Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input id="age" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup value={gender} onValueChange={(v) => setGender(v as "male" | "female")} className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
                </RadioGroup>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={(v) => setActivityLevel(v as ActivityLevel)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Lightly active (light exercise/sports 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</SelectItem>
                  <SelectItem value="active">Very active (hard exercise/sports 6-7 days a week)</SelectItem>
                  <SelectItem value="veryActive">Extra active (very hard exercise/sports & physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Daily Calorie Needs</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">To maintain your weight</p>
            <p className="text-5xl font-bold font-headline text-primary my-2">{dailyCalories.toFixed(0)}</p>
            <p className="text-lg text-muted-foreground">calories / day</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
