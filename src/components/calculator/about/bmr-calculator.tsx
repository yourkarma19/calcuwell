
"use client";
import Link from "next/link";
import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FAQPage, WithContext } from "schema-dts";

const activityFactors = [
  { level: "Sedentary (little or no exercise)", multiplier: 1.2 },
  {
    level: "Lightly active (light exercise/sports 1-3 days/week)",
    multiplier: 1.375,
  },
  {
    level: "Moderately active (moderate exercise/sports 3-5 days/week)",
    multiplier: 1.55,
  },
  {
    level: "Very active (hard exercise/sports 6-7 days a week)",
    multiplier: 1.725,
  },
  {
    level: "Extra active (very hard exercise & physical job)",
    multiplier: 1.9,
  },
];

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is BMR (Basal Metabolic Rate)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic, life-sustaining functions, like breathing and circulation, while at complete rest.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between BMR and TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMR is the calories burned at rest. TDEE (Total Daily Energy Expenditure) is the total calories you burn in a day, including all activities. TDEE is calculated by multiplying your BMR by an activity factor.",
      },
    },
    {
      "@type": "Question",
      name: "Which BMR formula is most accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Mifflin-St Jeor equation is considered the most accurate BMR formula by modern research, which is why it is the default for this calculator. The Harris-Benedict equation is an older, slightly less accurate alternative.",
      },
    },
  ],
};

export default function AboutBmrCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the BMR Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h3>What is BMR?</h3>
        <p>
          Your <strong>Basal Metabolic Rate (BMR)</strong> is the number of
          calories your body needs to perform its most basic functions. Think
          of it as the energy your body would burn if you just stayed in bed all
          day. It supports breathing, circulation, and cell production.
        </p>

        <h3>BMR Formulas Explained</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Mifflin-St Jeor Equation{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 ml-2 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      The Mifflin-St Jeor equation is considered the most
                      accurate BMR formula by modern research.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The Mifflin-St Jeor equation is a more modern and accurate
                formula for calculating BMR. It is the one our calculator uses.
              </p>
              <p className="font-mono bg-muted p-2 rounded-md">
                For men: 10 × weight (kg) + 6.25 × height (cm) - 5 × age (y) + 5
              </p>
              <p className="font-mono bg-muted p-2 rounded-md">
                For women: 10 × weight (kg) + 6.25 × height (cm) - 5 × age (y) -
                161
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Harris-Benedict Equation</AccordionTrigger>
            <AccordionContent>
              <p>
                The original Harris-Benedict equation is one of the earliest
                formulas used to calculate BMR. It was published in 1919 and
                revised in 1984. While still used, it's considered slightly less
                accurate than the Mifflin-St Jeor equation.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h3 className="mt-6">BMR vs. TDEE</h3>
        <p>
          BMR is your baseline calorie burn. To understand your total daily
          calorie needs, you need to know your TDEE.
        </p>
        <ul>
          <li>
            <strong>BMR:</strong> Calories burned at complete rest.
          </li>
          <li>
            <strong>TDEE (Total Daily Energy Expenditure):</strong> Total
            calories you burn in a day, including all activities.
          </li>
        </ul>
        <p>
          TDEE is found by multiplying your BMR by an activity factor, as shown
          below.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity Level</TableHead>
              <TableHead>Multiplier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityFactors.map((item) => (
              <TableRow key={item.level}>
                <TableCell>{item.level}</TableCell>
                <TableCell>{item.multiplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="mt-6">How to Use Your BMR for Fitness Goals</h3>
        <p>
          Your TDEE is the key number for managing your weight. To lose weight,
          you need to eat fewer calories than your TDEE. To gain weight, you
          need to eat more. Knowing your BMR is the first step in understanding
          your personal energy needs.
        </p>
        <p>
          To calculate your total daily calorie needs, use our{" "}
          <Link
            href="/calculators/net-calorie-calculator"
            className="text-primary hover:underline"
          >
            Net Calorie Calculator
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
