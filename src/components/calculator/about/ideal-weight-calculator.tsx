"use client";
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

export default function AboutIdealWeightCalculator() {
  return (
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
  );
}
