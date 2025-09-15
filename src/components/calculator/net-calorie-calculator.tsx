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
import Link from "next/link";

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
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Net Calorie Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h3>What Are Net Calories?</h3>
          <p>
            Net calories represent your daily energy balance. They are crucial for
            managing your weight. The calculation is simple:
          </p>
          <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
            Net Calories = Calories Consumed - Calories Burned
          </p>
          <ul>
            <li>
              <strong>Calorie Surplus (Positive):</strong> You&rsquo;ve eaten more
              calories than you&rsquo;ve burned. This leads to weight gain.
            </li>
            <li>
              <strong>Calorie Deficit (Negative):</strong> You&rsquo;ve burned more
              calories than you&rsquo;ve eaten. This leads to weight loss.
            </li>
            <li>
              <strong>Maintenance (Near Zero):</strong> You&rsquo;ve eaten about
              the same number of calories you&rsquo;ve burned, which maintains your
              weight.
            </li>
          </ul>

          <h3>How to Calculate Your Calories Burned</h3>
          <p>
            Your &quot;calories burned&quot; is your Total Daily Energy
            Expenditure (TDEE). This has two main parts:
          </p>
          <ol>
            <li>
              <strong>Basal Metabolic Rate (BMR):</strong> The calories your body
              burns at rest.
            </li>
            <li>
              <strong>Activity Level:</strong> The calories you burn through daily
              activities.
            </li>
          </ol>
          <p>
            For the most accurate estimate, first calculate your BMR with our{" "}
            <Link
              href="/calculators/bmr-calculator"
              className="text-primary hover:underline"
            >
              BMR Calculator
            </Link>
            .
          </p>

          <h3>How to Use Net Calories for Your Goals</h3>
          <ul>
            <li>
              <strong>For Weight Loss:</strong> Aim for a calorie deficit. A
              deficit of 500 net calories per day typically results in about 1
              pound (~0.45 kg) of weight loss per week.
            </li>
            <li>
              <strong>For Weight Gain:</strong> Aim for a calorie surplus. A
              surplus of 300-500 net calories per day is a common target for
              steady muscle gain.
            </li>
            <li>
              <strong>For Maintenance:</strong> Aim to keep your net calories
              around zero.
            </li>
          </ul>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-800 dark:text-yellow-300">
            <h4 className="font-bold mt-0">Disclaimer</h4>
            <p>
              This calculator is for informational purposes only. Consult a
              healthcare professional before making big changes to your diet or
              exercise routine.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}