"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { cn } from "@/lib/utils";
import type { FAQPage, WithContext } from "schema-dts";

// Widmark formula: BAC = (Alcohol g / (Body Weight g * Gender Constant)) * 100
// Gender constant (r): Male: 0.68, Female: 0.55
// Assumes 1 standard drink = 14g of alcohol.

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a standard drink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard drink in most countries contains approximately 14 grams of pure alcohol. This is equivalent to a 12-ounce (355 ml) beer with 5% alcohol, a 5-ounce (150 ml) glass of wine with 12% alcohol, or a 1.5-ounce (44 ml) shot of 80-proof (40%) distilled spirits.",
      },
    },
    {
      "@type": "Question",
      name: "Why is this BAC calculator only an estimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many individual factors can affect your BAC that this calculator does not account for. These include your metabolism, whether you've eaten recently, your body fat percentage, and any medications you may be taking. The only way to know your true BAC is with a calibrated breathalyzer or blood test.",
      },
    },
    {
      "@type": "Question",
      name: "How does gender affect BAC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On average, women have a higher percentage of body fat and less body water than men of the same weight. Since alcohol is water-soluble, it becomes more concentrated in a woman's body, leading to a higher BAC from the same amount of alcohol.",
      },
    },
  ],
};

const getBacInfo = (bac: number) => {
  if (bac <= 0.0)
    return {
      level: "Sober",
      color: "text-green-500",
      description: "Minimal or no effect.",
    };
  if (bac < 0.02)
    return {
      level: "Minimal Impairment",
      color: "text-green-500",
      description: "Slight mood elevation.",
    };
  if (bac < 0.05)
    return {
      level: "Mild Impairment",
      color: "text-yellow-500",
      description: "Lowered alertness, impaired judgment.",
    };
  if (bac < 0.08)
    return {
      level: "Impaired",
      color: "text-yellow-500",
      description: "Muscle coordination and reaction time are impaired.",
    };
  if (bac < 0.15)
    return {
      level: "Legally Impaired",
      color: "text-red-500",
      description:
        "Significant impairment of motor coordination and judgment. Illegal to drive.",
    };
  if (bac < 0.3)
    return {
      level: "High Risk",
      color: "text-red-500",
      description: "Vomiting and potential loss of consciousness.",
    };
  return {
    level: "Very High Risk",
    color: "text-red-700",
    description: "Risk of coma or death.",
  };
};

export default function BacCalculator() {
  const [weight, setWeight] = usePersistentState("bac-weight", 70); // in kg
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "bac-gender",
    "male",
  );
  const [drinks, setDrinks] = usePersistentState("bac-drinks", 2); // standard drinks
  const [hours, setHours] = usePersistentState("bac-hours", 2); // hours since first drink

  const bac = useMemo(() => {
    if (weight <= 0 || drinks <= 0 || hours < 0) return 0;

    const alcoholGrams = drinks * 14;
    const bodyWeightGrams = weight * 1000;
    const genderConstant = gender === "male" ? 0.68 : 0.55;
    const eliminationRate = 0.015; // % per hour

    const rawBac = (alcoholGrams / (bodyWeightGrams * genderConstant)) * 100;
    const currentBac = rawBac - hours * eliminationRate;

    return Math.max(0, currentBac);
  }, [weight, gender, drinks, hours]);

  const { level, color, description } = getBacInfo(bac);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
          <CardDescription>
            Estimate your Blood Alcohol Content (BAC). This is an educational
            estimate and should not be used to determine if it is safe to drive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Body Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={gender}
                onValueChange={(v: string) => setGender(v as "male" | "female")}
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
              <Label htmlFor="drinks">Standard Drinks Consumed</Label>
              <Input
                id="drinks"
                type="number"
                value={drinks}
                onChange={(e) => setDrinks(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Hours Since First Drink</Label>
              <Input
                id="hours"
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Disclaimer: This is an estimate and should not be used to determine
            if it is safe to drive. Many factors affect BAC, including
            metabolism, food intake, and health conditions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estimated BAC</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">Blood Alcohol Content</p>
          <p className={cn("text-6xl font-bold font-headline my-2", color)}>
            {bac.toFixed(3)}%
          </p>
          <p className={cn("text-xl font-semibold", color)}>{level}</p>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h2">About the BAC Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Blood Alcohol Content (BAC) calculator gives you an{" "}
            <strong>estimate</strong> of your blood alcohol level. It uses the
            Widmark formula. It is a helpful tool to understand how alcohol
            affects you.{" "}
            <strong>Never use this tool to decide if it is safe to drive.</strong>
          </p>

          <h3>How to Use the BAC Calculator</h3>
          <ol>
            <li>
              Enter your <strong>Body Weight</strong>.
            </li>
            <li>
              Select your biological <strong>Gender</strong>.
            </li>
            <li>
              Input the number of <strong>Standard Drinks</strong> you have
              consumed.
            </li>
            <li>
              Enter the number of <strong>Hours</strong> that have passed since
              your first drink.
            </li>
          </ol>
          <p>
            The calculator will instantly show your estimated BAC and what
            effects you might feel.
          </p>

          <h3>BAC Calculator FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is a &quot;standard drink&quot;?
              </AccordionTrigger>
              <AccordionContent>
                A standard drink usually has about 14 grams of pure alcohol. This
                is about one 12-ounce beer, one 5-ounce glass of wine, or one
                1.5-ounce shot of liquor.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Why is this calculator only an estimate?
              </AccordionTrigger>
              <AccordionContent>
                Your actual BAC can be affected by many things. This includes
                your metabolism, recent meals, body fat percentage, and
                medications. Only a breathalyzer or blood test can give you a
                true BAC reading.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does gender affect BAC?</AccordionTrigger>
              <AccordionContent>
                Women often have more body fat and less body water than men of
                the same weight. Alcohol dissolves in water, so it becomes more
                concentrated in a woman&apos;s body. This leads to a higher BAC
                from the same amount of alcohol.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
