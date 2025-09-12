"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutNetCalorieCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Net Calorie Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <h2>What Are Net Calories?</h2>
        <p>
          Net calories represent your daily energy balance and are crucial for
          managing your weight. The calculation is simple:
        </p>
        <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
          Net Calories = Calories Consumed - Calories Burned
        </p>
        <ul>
          <li>
            <strong>Calorie Surplus (Positive Net Calories):</strong>{" "}
            You&apos;ve eaten more calories than you&apos;ve burned. This leads
            to weight gain over time.
          </li>
          <li>
            <strong>Calorie Deficit (Negative Net Calories):</strong>{" "}
            You&apos;ve burned more calories than you&apos;ve eaten. This leads
            to weight loss over time.
          </li>
          <li>
            <strong>Maintenance (Net Calories near Zero):</strong> You&apos;ve
            eaten roughly the same number of calories you&apos;ve burned, which
            leads to weight maintenance.
          </li>
        </ul>

        <h2>How to Calculate Your Calories Burned</h2>
        <p>
          The &quot;calories burned&quot; part of the equation is your Total
          Daily Energy Expenditure (TDEE). This is made up of two main
          components:
        </p>
        <ol>
          <li>
            <strong>Basal Metabolic Rate (BMR):</strong> The calories your body
            burns at complete rest to keep you alive.
          </li>
          <li>
            <strong>Activity Level:</strong> The calories you burn through daily
            activities, from walking to intense exercise.
          </li>
        </ol>
        <p>
          For the most accurate estimate of your calories burned, you should
          first calculate your BMR. You can do this with our{" "}
          <Link
            href="/calculators/bmr-calculator"
            className="text-primary hover:underline"
          >
            BMR Calculator page
          </Link>
          .
        </p>

        <h2>How to Use Net Calories for Your Goals</h2>
        <ul>
          <li>
            <strong>For Weight Loss:</strong> Aim for a sustained calorie
            deficit. A deficit of 500 net calories per day is a common target,
            which typically results in about 1 pound (~0.45 kg) of weight loss
            per week.
          </li>
          <li>
            <strong>For Weight Gain/Muscle Building:</strong> Aim for a
            sustained calorie surplus. A surplus of 300-500 net calories per day
            is a common target for steady muscle gain with minimal fat gain.
          </li>
          <li>
            <strong>For Weight Maintenance:</strong> Aim to keep your net
            calories around zero. Your intake should match your expenditure.
          </li>
        </ul>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-800 dark:text-yellow-300">
          <h3 className="font-bold mt-0">Disclaimer</h3>
          <p>
            This calculator is for informational purposes only. Consult with a
            healthcare professional or registered dietitian before making
            significant changes to your diet or exercise routine.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
