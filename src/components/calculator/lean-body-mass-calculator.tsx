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
      name: "Why is Lean Body Mass (LBM) an important health metric?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tracking LBM is more useful than body weight alone because it differentiates between fat loss and muscle loss. Preserving muscle is crucial for a healthy metabolism and overall strength.",
      },
    },
    {
      "@type": "Question",
      name: "How is LBM different from BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI is a simple ratio of weight to height and cannot distinguish between fat and muscle. LBM specifically measures your non-fat mass, providing a clearer picture of your body composition.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is this LBM estimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator uses the Boer formula, which provides a reliable estimate for most people. However, for precise measurements, a clinical method like a DEXA scan is required. This tool is best used for tracking progress over time.",
      },
    },
  ],
};

// Using the Boer formula
const calculateLBM = (
  weightKg: number,
  heightCm: number,
  gender: "male" | "female",
) => {
  if (gender === "male") {
    return 0.407 * weightKg + 0.267 * heightCm - 19.2;
  } else {
    return 0.252 * weightKg + 0.473 * heightCm - 48.3;
  }
};

export default function LeanBodyMassCalculator() {
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "lbm-gender",
    "male",
  );
  const [height, setHeight] = usePersistentState("lbm-height", 175);
  const [weight, setWeight] = usePersistentState("lbm-weight", 70);

  const { lbm, bodyFatPercentage } = useMemo(() => {
    if (height > 0 && weight > 0) {
      const lbmValue = calculateLBM(weight, height, gender);
      const fatMass = weight - lbmValue;
      const bfp = (fatMass / weight) * 100;
      return {
        lbm: lbmValue,
        bodyFatPercentage: bfp > 0 ? bfp : 0,
      };
    }
    return { lbm: 0, bodyFatPercentage: 0 };
  }, [gender, height, weight]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lean Body Mass Calculator</CardTitle>
          <CardDescription>
            Estimate your Lean Body Mass (LBM) using the Boer formula, which is
            based on your weight and height.
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Lean Body Mass (LBM)
            </p>
            <p className="text-4xl font-bold font-headline text-primary">
              {lbm.toFixed(1)} kg
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Est. Body Fat</p>
            <p className="text-2xl font-semibold">
              {bodyFatPercentage.toFixed(1)}%
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Lean Body Mass (LBM) Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Lean Body Mass (LBM) Calculator estimates the total weight of your
            body minus all fat. LBM is a key part of your body composition and
            includes the weight of your bones, muscles, organs, and water. This
            calculator uses the Boer formula, a common estimation method.
          </p>
          <h3>How to Use the LBM Calculator</h3>
          <ol>
            <li>Select your **Gender**.</li>
            <li>Enter your **Weight** in kilograms (kg).</li>
            <li>Enter your **Height** in centimeters (cm).</li>
          </ol>
          <p>
            The calculator will instantly estimate your LBM and body fat
            percentage.
          </p>
          <h3>LBM FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Why is LBM an important health metric?
              </AccordionTrigger>
              <AccordionContent>
                Tracking LBM is more useful than tracking body weight alone
                because it separates fat loss from muscle loss. Preserving muscle
                is key for a healthy metabolism and overall strength.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How is LBM different from BMI?</AccordionTrigger>
              <AccordionContent>
                LBM and BMI measure different things. BMI is a simple ratio of
                weight to height and can&apos;t distinguish between fat and
                muscle. LBM specifically measures your non-fat mass, giving a
                clearer picture of your body composition.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How accurate is this LBM estimate?
              </AccordionTrigger>
              <AccordionContent>
                This calculator uses the Boer formula, which gives a reliable
                estimate for most people. However, for precise measurements, you
                would need a clinical method like a DEXA scan. Use this tool to
                track your progress over time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
