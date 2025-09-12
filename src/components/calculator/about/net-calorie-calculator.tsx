
"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutNetCalorieCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Net Calorie Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <h3>What Are Net Calories?</h3>
        <p>
          Net calories represent your daily energy balance. They are crucial
          for managing your weight. The calculation is simple:
        </p>
        <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
          Net Calories = Calories Consumed - Calories Burned
        </p>
        <ul>
          <li>
            <strong>Calorie Surplus (Positive):</strong> You&apos;ve eaten more
            calories than you&apos;ve burned. This leads to weight gain.
          </li>
          <li>
            <strong>Calorie Deficit (Negative):</strong> You&apos;ve burned more
            calories than you&apos;ve eaten. This leads to weight loss.
          </li>
          <li>
            <strong>Maintenance (Near Zero):</strong> You&apos;ve eaten about the
            same number of calories you&apos;ve burned, which maintains your weight.
          </li>
        </ul>

        <h3>How to Calculate Your Calories Burned</h3>
        <p>
          Your &quot;calories burned&quot; is your Total Daily Energy Expenditure (TDEE).
          This has two main parts:
        </p>
        <ol>
          <li>
            <strong>Basal Metabolic Rate (BMR):</strong> The calories your body
            burns at rest.
          </li>
          <li>
            <strong>Activity Level:</strong> The calories you burn through
            daily activities.
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
  );
}
