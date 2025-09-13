"use client";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are maintenance calories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Maintenance calories are the calories you need to eat each day to maintain your current weight. This calculator estimates that value by find your Basal Metabolic Rate (BMR) and multiplying it by an activity level factor.",
      },
    },
    {
      "@type": "Question",
      name: "What is BMR (Basal Metabolic Rate)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your Basal Metabolic Rate (BMR) is the number of calories your body needs to perform its most basic functions while at rest, like breathing and circulation. It's the baseline for your total daily calorie needs.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use this calculator for weight loss or gain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This result is for weight maintenance. To lose weight, you need to eat fewer calories (a caloric deficit). To gain weight or muscle, you need to eat more (a caloric surplus). For specific advice, consult a healthcare or nutrition professional.",
      },
    },
  ],
};

export default function AboutCalorieNeedsCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Daily Calorie Needs Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Daily Calorie Needs calculator estimates how many calories you
          should eat per day to maintain your current weight. It uses the
          Mifflin-St Jeor equation, which is a widely accepted formula.
        </p>
        <h3>How to Use the Calorie Needs Calculator</h3>
        <p>
          Enter your age, gender, height, weight, and activity level. The
          calculator will then estimate the calories you need to consume to keep
          your weight the same.
        </p>
        <h3>Calorie Needs FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are maintenance calories?</AccordionTrigger>
            <AccordionContent>
              Maintenance calories are the calories you need each day to keep
              your current weight. This calculator finds this value by
              estimating your Basal Metabolic Rate (BMR) and multiplying it by
              an activity level.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is BMR?</AccordionTrigger>
            <AccordionContent>
              Your Basal Metabolic Rate (BMR) is the number of calories your
              body burns at rest for basic functions, like breathing. You can
              calculate your BMR with our{" "}
              <Link
                href="/calculators/bmr-calculator"
                className="text-primary hover:underline"
              >
                BMR Calculator
              </Link>
              .
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How do I use this for weight loss or gain?
            </AccordionTrigger>
            <AccordionContent>
              This result is for maintaining your weight. To lose weight, eat
              fewer calories than this number. To gain weight, eat more. For
              personal advice, you should talk to a doctor or nutritionist.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
