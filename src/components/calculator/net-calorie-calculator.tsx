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
import usePersistentState from "@/hooks/use-persistent-state";
import { cn } from "@/lib/utils";

export default function NetCalorieCalculator() {
  const [caloriesConsumed, setCaloriesConsumed] = usePersistentState(
    "netcal-consumed",
    2000,
  );
  const [caloriesBurned, setCaloriesBurned] = usePersistentState(
    "netcal-burned",
    2300,
  );

  const { netCalories, status, color } = useMemo(() => {
    const consumed = Number(caloriesConsumed);
    const burned = Number(caloriesBurned);

    if (isNaN(consumed) || isNaN(burned)) {
      return { netCalories: 0, status: "Enter valid numbers", color: "" };
    }

    const net = consumed - burned;
    let stat = "Maintenance";
    let col = "text-yellow-500";

    if (net < -100) {
      stat = "Deficit";
      col = "text-green-500";
    }
    if (net > 100) {
      stat = "Surplus";
      col = "text-red-500";
    }

    return { netCalories: net, status: stat, color: col };
  }, [caloriesConsumed, caloriesBurned]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Net Calorie Calculator</CardTitle>
          <CardDescription>
            Find your daily calorie balance to see if you are in a surplus,
            deficit, or at maintenance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories-consumed">Calories Consumed</Label>
              <Input
                id="calories-consumed"
                type="number"
                value={caloriesConsumed}
                onChange={(e) => setCaloriesConsumed(Number(e.target.value))}
                placeholder="e.g., 2000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories-burned">Calories Burned (TDEE)</Label>
              <Input
                id="calories-burned"
                type="number"
                value={caloriesBurned}
                onChange={(e) => setCaloriesBurned(Number(e.target.value))}
                placeholder="e.g., 2300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Daily Calorie Balance</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">Net Calories</p>
          <p className="text-6xl font-bold font-headline text-primary my-2">
            {netCalories > 0 ? "+" : ""}
            {netCalories.toLocaleString()}
          </p>
          <p className={cn("text-xl font-semibold", color)}>
            You are in a {netCalories.toLocaleString()} Calorie {status}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
