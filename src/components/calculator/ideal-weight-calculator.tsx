
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// Using Robinson Formula (1983)
const calculateIdealWeight = (heightCm: number, gender: "male" | "female") => {
  const heightInches = heightCm / 2.54;
  if (heightInches <= 60) {
    return gender === "male" ? 52 : 49;
  }
  const baseWeight = gender === "male" ? 52 : 49;
  const multiplier = gender === "male" ? 1.9 : 1.7;
  return baseWeight + multiplier * (heightInches - 60);
};

export default function IdealWeightCalculator() {
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "ideal-weight-gender",
    "male"
  );
  const [height, setHeight] = usePersistentState("ideal-weight-height", 175);

  const idealWeightKg = useMemo(() => {
    if (height > 0) {
      return calculateIdealWeight(height, gender);
    }
    return 0;
  }, [height, gender]);

  const idealWeightRange = useMemo(() => {
    const lowerBound = idealWeightKg * 0.9;
    const upperBound = idealWeightKg * 1.1;
    return {
      lower: lowerBound.toFixed(1),
      upper: upperBound.toFixed(1),
    };
  }, [idealWeightKg]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
            <CardDescription>Calculate your ideal body weight based on your height and gender using the Robinson formula.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About Ideal Weight</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Ideal Weight Calculator** provides a healthy weight estimate based on your height and gender. While "ideal" is subjective and varies for every individual, this tool uses established medical formulas to provide a general guideline. It's a great starting point for setting fitness or weight management goals and understanding where you stand in relation to broad health standards.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select your **Gender**.</li>
                    <li>Enter your **Height** in centimeters.</li>
                </ol>
                <p>The calculator will display your estimated ideal weight and a healthy weight range based on the Robinson formula.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is "ideal weight"?</AccordionTrigger>
                        <AccordionContent>
                            Ideal body weight is a concept that suggests there is a weight range that is healthiest for a person based on their height, gender, and frame size. It's important to remember that these formulas provide an estimate, and a healthy weight can vary significantly between individuals based on muscle mass, body composition, and personal health.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the Robinson Formula?</AccordionTrigger>
                        <AccordionContent>
                            This calculator uses the Robinson formula (1983), which is one of several common methods to estimate ideal body weight. Other popular formulas include the Devine, Miller, and Hamwi formulas. Each was developed based on different population studies and may give slightly different results. The Robinson formula is widely considered a reliable general-purpose estimator.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is ideal weight the same as a healthy BMI?</AccordionTrigger>
                        <AccordionContent>
                           They are related but different concepts. A healthy BMI (Body Mass Index) indicates a healthy weight range for your height, but it doesn't account for body composition (muscle vs. fat). Ideal weight formulas attempt to provide a more specific target number. Both are useful tools but should be considered alongside other health metrics and professional medical advice.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Ideal Weight</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">According to Robinson Formula</p>
            <p className="text-5xl font-bold font-headline text-primary my-2">
              {idealWeightKg.toFixed(1)} kg
            </p>
            <p className="text-muted-foreground">
              Healthy range: {idealWeightRange.lower} - {idealWeightRange.upper} kg
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
