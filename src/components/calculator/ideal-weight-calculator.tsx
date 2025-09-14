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
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is 'ideal weight'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ideal weight is a guideline for a healthy body weight based on height. It does not account for individual differences in body composition, so it should be used as a general guide, not a strict goal.",
      },
    },
    {
      "@type": "Question",
      name: "Which formula does this calculator use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator uses the Robinson Formula (1983), a common method for estimating ideal body weight. Other formulas exist and may produce slightly different results. No single formula is perfect for everyone.",
      },
    },
    {
      "@type": "Question",
      name: "Is this better than BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ideal weight and BMI are two different tools. BMI assesses if your weight is healthy for your height but doesn't provide a specific target. The ideal weight calculation gives a target number but is less comprehensive. Both are useful screening tools.",
      },
    },
  ],
};

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
    "male",
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
          <CardDescription>
            Calculate your ideal body weight based on your height and gender
            using the Robinson formula.
          </CardDescription>
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
        <CardHeader>
          <CardTitle>Your Ideal Weight</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            According to Robinson Formula
          </p>
          <p className="text-5xl font-bold font-headline text-primary my-2">
            {idealWeightKg.toFixed(1)} kg
          </p>
          <p className="text-muted-foreground">
            Healthy range: {idealWeightRange.lower} - {idealWeightRange.upper}{" "}
            kg
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Ideal Weight Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Ideal Weight Calculator estimates a healthy body weight based on
            your height and gender. It&apos;s important to remember that this is a
            general guideline, not a strict rule. This tool uses the Robinson
            formula to give you a reference point for your fitness goals.
          </p>
          <h3>How to Use the Ideal Weight Calculator</h3>
          <ol>
            <li>Select your **Gender**.</li>
            <li>Enter your **Height** in centimeters.</li>
          </ol>
          <p>
            The calculator will instantly display your estimated ideal weight and
            a healthy weight range.
          </p>
          <h3>Ideal Weight FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is &quot;ideal weight&quot;?
              </AccordionTrigger>
              <AccordionContent>
                Ideal weight is a guideline for a healthy weight range based on
                height. It doesn&apos;t account for individual differences like
                muscle vs. fat. Use it as a general guide, not a strict goal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Which formula does this calculator use?
              </AccordionTrigger>
              <AccordionContent>
                This calculator uses the **Robinson Formula (1983)**, a popular
                method for estimating ideal body weight. Other formulas exist and
                may give slightly different results. No single formula is perfect
                for everyone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is this better than BMI?</AccordionTrigger>
              <AccordionContent>
                Ideal weight and BMI are different tools. BMI checks if your
                weight is healthy for your height but doesn&apos;t give a target.
                The ideal weight calculation gives a target number but is less
                complete. Both are useful screening tools, but neither tells the
                whole story.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
