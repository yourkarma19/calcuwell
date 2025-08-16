
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
  sedentary: 1.0,
  light: 1.2,
  moderate: 1.4,
  active: 1.6,
  veryActive: 1.8,
};

type ActivityLevel = keyof typeof activityLevels;

export default function WaterIntakeCalculator() {
  const [age, setAge] = usePersistentState("water-age", 30);
  const [weight, setWeight] = usePersistentState("water-weight", 70); // in kg
  const [gender, setGender] = usePersistentState<"male" | "female">("water-gender", "male");
  const [activityLevel, setActivityLevel] = usePersistentState<ActivityLevel>("water-activity", "moderate");

  const dailyWaterIntake = useMemo(() => {
    if (weight <= 0 || age <= 0) return 0;

    // Base calculation: 35ml per kg for adults (adjust for age)
    let baseIntake;
    if (age < 30) {
      baseIntake = weight * 40;
    } else if (age <= 55) {
      baseIntake = weight * 35;
    } else {
      baseIntake = weight * 30;
    }
    
    // Adjust for activity level
    const totalIntakeMl = baseIntake * activityLevels[activityLevel];
    
    // Return in Liters
    return totalIntakeMl / 1000;

  }, [age, weight, activityLevel]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
              <CardTitle>Daily Water Intake Calculator</CardTitle>
              <CardDescription>Estimate your recommended daily water intake based on your age, weight, and activity level.</CardDescription>
            </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input id="age" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
              </div>
            </div>
             <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={gender} onValueChange={(v) => setGender(v as "male" | "female")} className="flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
              </RadioGroup>
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
          <CardHeader><CardTitle>About Water Intake</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Why is staying hydrated important?</AccordionTrigger>
                <AccordionContent>
                  Water is essential for nearly every bodily function, including regulating body temperature, lubricating joints, preventing infections, delivering nutrients to cells, and keeping organs functioning properly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do other drinks count towards my water intake?</AccordionTrigger>
                <AccordionContent>
                  Yes, other beverages like milk, juice, and herbal teas are composed mostly of water and contribute to your daily intake. Even foods with high water content, like fruits and vegetables, help with hydration.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Disclaimer</AccordionTrigger>
                <AccordionContent>
                  This is a general guideline. Individual needs can vary based on climate, health conditions, and diet. Always consult a healthcare professional for personalized advice.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Daily Water Intake</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">Recommended Daily Intake</p>
            <p className="text-5xl font-bold font-headline text-primary my-2">{dailyWaterIntake.toFixed(2)}</p>
            <p className="text-lg text-muted-foreground">Liters / day</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
