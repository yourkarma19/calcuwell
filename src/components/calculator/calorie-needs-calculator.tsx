
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
          <CardHeader>
            <CardTitle>Daily Calorie Needs</CardTitle>
            <CardDescription>Estimate the number of calories you need to consume daily to maintain your current weight, based on the Mifflin-St Jeor equation.</CardDescription>
          </CardHeader>
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
        <Card>
          <CardHeader><CardTitle>About Calorie Needs</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are maintenance calories?</AccordionTrigger>
                <AccordionContent>
                  Maintenance calories are the total number of calories you need to consume each day to maintain your current body weight. This calculator estimates that value by first calculating your Basal Metabolic Rate (BMR) and then multiplying it by an activity level factor.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is BMR?</AccordionTrigger>
                <AccordionContent>
                  Your Basal Metabolic Rate (BMR) is the number of calories your body needs to perform its most basic life-sustaining functions, like breathing and circulation, while at rest. You can calculate your BMR with our <a href="/calculators/bmr-calculator" className="text-primary underline">BMR Calculator</a>.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I use this for weight loss or gain?</AccordionTrigger>
                <AccordionContent>
                  This result is for weight maintenance. To lose weight, you need to consume fewer calories (a caloric deficit). To gain weight or muscle, you need to consume more (a caloric surplus). For personalized advice, consult a healthcare or nutrition professional.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
