"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
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
                  placeholder="e.g., 25"
                />
              </div>
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <Card>
          <CardHeader>
            <CardTitle>About Basal Metabolic Rate (BMR)</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The BMR Calculator estimates the calories your body burns at rest to perform its most basic functions. Think of it as the energy your body would need if you were to stay in bed all day. Knowing your BMR is the first step in finding your total daily calorie needs for weight management.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter your **Age**, **Gender**, **Height** (in cm), and **Weight** (in kg).</li>
            </ol>
            <p>The calculator will instantly estimate your BMR using the Mifflin-St Jeor equation. This is a very accurate formula for most people.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the difference between BMR and TDEE?</AccordionTrigger>
                <AccordionContent>
                  BMR is the calories you burn at complete rest. **Total Daily Energy Expenditure (TDEE)** is the total calories you burn in a day. TDEE includes your BMR plus calories burned from activity and digestion. Find your TDEE with our <a href="/calculators/calorie-needs-calculator" className="text-primary underline">Calorie Needs Calculator</a>.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How accurate is the BMR calculation?</AccordionTrigger>
                <AccordionContent>
                  The Mifflin-St Jeor equation used here is a very accurate estimate for most people. However, it's still an estimate. Individual factors like body composition (muscle vs. fat), genes, and health can change your actual BMR.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I use my BMR for weight loss?</AccordionTrigger>
                <AccordionContent>
                  Your BMR is the baseline. To lose weight, you need to eat fewer calories than your Total Daily Energy Expenditure (TDEE). Knowing your BMR helps you understand the minimum energy your body requires. This ensures you don't create an unhealthy diet.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
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
