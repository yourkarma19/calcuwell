"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePersistentState from "@/hooks/use-persistent-state";
import AboutCalorieNeedsCalculator from "./about/calorie-needs-calculator";

const activityLevels = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

type ActivityLevel = keyof typeof activityLevels;
type Goal = "maintain" | "lose" | "gain";

export default function CalorieNeedsCalculator() {
  const [age, setAge] = usePersistentState("calorie-age", 25);
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "calorie-gender",
    "male",
  );
  const [height, setHeight] = usePersistentState("calorie-height", 175);
  const [weight, setWeight] = usePersistentState("calorie-weight", 70);
  const [activityLevel, setActivityLevel] = usePersistentState<ActivityLevel>(
    "calorie-activity",
    "moderate",
  );
  const [goal, setGoal] = usePersistentState<Goal>("calorie-goal", "lose");
  const [weightChangeRate, setWeightChangeRate] = usePersistentState(
    "calorie-rate",
    0.5,
  ); // kg per week

  const maintenanceCalories = useMemo(() => {
    if (age > 0 && height > 0 && weight > 0) {
      const bmr =
        10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);
      const tdee = bmr * activityLevels[activityLevel];
      return tdee > 0 ? tdee : 0;
    }
    return 0;
  }, [age, gender, height, weight, activityLevel]);

  const targetCalories = useMemo(() => {
    const calorieChange = (weightChangeRate * 7700) / 7; // 7700 calories in 1kg of fat
    if (goal === "lose") {
      return maintenanceCalories - calorieChange;
    }
    if (goal === "gain") {
      return maintenanceCalories + calorieChange;
    }
    return maintenanceCalories;
  }, [goal, weightChangeRate, maintenanceCalories]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Calorie Calculator for India</CardTitle>
          <CardDescription>
            Estimate your daily calorie needs for weight loss, maintenance, or
            gain, with context for Indian lifestyles.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={gender}
                onValueChange={(v) => setGender(v as "male" | "female")}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select
              value={activityLevel}
              onValueChange={(v) => setActivityLevel(v as ActivityLevel)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">
                  Sedentary (desk job, e.g. IT professional)
                </SelectItem>
                <SelectItem value="light">
                  Lightly active (some walking, e.g. teacher)
                </SelectItem>
                <SelectItem value="moderate">
                  Moderately active (regular exercise 3-5 days/week)
                </SelectItem>
                <SelectItem value="active">
                  Very active (daily intense exercise)
                </SelectItem>
                <SelectItem value="veryActive">
                  Extra active (physical job, e.g. construction)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label>Your Goal</Label>
              <Select value={goal} onValueChange={(v) => setGoal(v as Goal)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {goal !== "maintain" && (
              <div className="space-y-2">
                <Label>Weight Change Rate (kg/week)</Label>
                <Select
                  value={String(weightChangeRate)}
                  onValueChange={(v) => setWeightChangeRate(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.25">0.25 kg/week (slow)</SelectItem>
                    <SelectItem value="0.5">
                      0.5 kg/week (recommended)
                    </SelectItem>
                    <SelectItem value="1">1.0 kg/week (fast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Calorie Targets</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Calories for Your Goal ({goal})
            </p>
            <p className="text-5xl font-bold font-headline text-primary my-2">
              {targetCalories.toFixed(0)}
            </p>
            <p className="text-lg text-muted-foreground">calories / day</p>
          </div>
          <div className="text-sm text-muted-foreground border-t pt-4">
            <p>Maintenance Calories: {maintenanceCalories.toFixed(0)}</p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <AboutCalorieNeedsCalculator />
      </div>
    </div>
  );
}
