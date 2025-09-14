"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import usePersistentState from "@/hooks/use-persistent-state";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is BMR and how is it different from TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basal Metabolic Rate (BMR) is the number of calories your body needs to function at complete rest. Total Daily Energy Expenditure (TDEE) is your BMR plus the calories you burn through daily activities. TDEE is your total daily calorie need.",
      },
    },
    {
      "@type": "Question",
      name: "Which formula is the most accurate for calculating BMR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Mifflin-St Jeor equation is considered the most accurate formula for estimating BMR in modern research, which is why it is the default in our calculator.",
      },
    },
    {
      "@type": "Question",
      name: "What are activity multipliers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Activity multipliers are values used to estimate your Total Daily Energy Expenditure (TDEE) from your BMR. For example, a sedentary person (desk job) would multiply their BMR by 1.2, while a very active person might multiply by 1.725.",
      },
    },
  ],
};


export default function BmrCalculator() {
  const [age, setAge] = usePersistentState("bmr-age", 25);
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "bmr-gender",
    "male",
  );
  const [height, setHeight] = usePersistentState("bmr-height", 175);
  const [weight, setWeight] = usePersistentState("bmr-weight", 70);
  const [formula, setFormula] = usePersistentState(
    "bmr-formula",
    "mifflin-st-jeor",
  );

  const bmr = useMemo(() => {
    if (age > 0 && height > 0 && weight > 0) {
      if (formula === "mifflin-st-jeor") {
        const bmrValue =
          10 * weight +
          6.25 * height -
          5 * age +
          (gender === "male" ? 5 : -161);
        return bmrValue > 0 ? bmrValue : 0;
      }
      // Add other formulas here if needed
    }
    return 0;
  }, [age, gender, height, weight, formula]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>BMR Calculator</CardTitle>
          <CardDescription>
            Discover your body&rsquo;s baseline calorie needs with our accurate BMR
            Calculator. Your Basal Metabolic Rate (BMR) is the number of
            calories your body needs to function at rest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Formula</Label>
            <div className="flex items-center gap-2">
              <RadioGroup
                value={formula}
                onValueChange={setFormula}
                className="flex items-center space-x-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mifflin-st-jeor" id="mifflin" />
                  <Label htmlFor="mifflin">Mifflin-St Jeor</Label>
                </div>
              </RadioGroup>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      The Mifflin-St Jeor equation is considered the most
                      accurate BMR formula by modern research.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
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
          <CardTitle>Your BMR Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Your Basal Metabolic Rate is
          </p>
          <p className="text-6xl font-bold font-headline text-primary my-2">
            {bmr.toFixed(0)}
          </p>
          <p className="text-lg text-muted-foreground">calories / day</p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
      <CardHeader>
        <CardTitle as="h2">About the BMR Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Your Basal Metabolic Rate (BMR) is the number of calories your body
          needs to perform its most basic, life-sustaining functions at rest.
          This includes breathing, circulation, and cell production. It is the
          single largest component of your total daily energy expenditure
          (TDEE).
        </p>

        <h3>How is BMR Calculated?</h3>
        <p>
          This calculator uses the Mifflin-St Jeor equation, which is widely
          regarded by nutrition experts as the most accurate method for
          estimating BMR.
        </p>

        <h3>BMR vs. TDEE (Total Daily Energy Expenditure)</h3>
        <p>
          BMR is your calorie needs at rest. TDEE is your total calorie needs for
          the entire day, including all activities. To find your TDEE, you
          multiply your BMR by an activity factor.
        </p>

        <h3>BMR FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              What is BMR and how is it different from TDEE?
            </AccordionTrigger>
            <AccordionContent>
              Basal Metabolic Rate (BMR) is the number of calories your body
              needs to function at complete rest. Total Daily Energy Expenditure
              (TDEE) is your BMR plus the calories you burn through daily
              activities. TDEE is your total daily calorie need.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              Which formula is the most accurate for calculating BMR?
            </AccordionTrigger>
            <AccordionContent>
              The Mifflin-St Jeor equation is considered the most accurate
              formula for estimating BMR in modern research, which is why it is
              the default in our calculator.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              What are activity multipliers?
            </AccordionTrigger>
            <AccordionContent>
              Activity multipliers are values used to estimate your Total Daily
              Energy Expenditure (TDEE) from your BMR. For example, a sedentary
              person (desk job) would multiply their BMR by 1.2, while a very
              active person might multiply by 1.725.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
      </div>
    </div>
  );
}
