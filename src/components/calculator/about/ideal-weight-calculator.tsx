
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
        <CardTitle as="h2">About Ideal Weight</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Ideal Weight Calculator provides an estimate of a healthy body
          weight based on your height and gender. It&apos;s important to
          remember that &quot;ideal weight&quot; is a general guideline, not a
          strict rule. This tool uses the Robinson formula, a commonly cited
          method, to give you a reference point for your health and fitness
          goals.
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
              Ideal weight is a concept used to estimate a healthy weight range
              for a person of a certain height. It does not account for
              individual differences in body composition (like muscle vs. fat),
              bone density, or frame size. Therefore, it should be used as a
              general guide, not a definitive goal.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Which formula does this calculator use?
            </AccordionTrigger>
            <AccordionContent>
              This calculator uses the **Robinson Formula (1983)**, which is a
              popular and simple method for estimating ideal body weight. Other
              formulas, like the Miller, Devine, and Hamwi formulas, exist and
              may produce slightly different results. No single formula is
              perfect for everyone.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is this better than BMI?</AccordionTrigger>
            <AccordionContent>
              Ideal weight and BMI are two different tools. BMI (Body Mass
              Index) assesses if your weight is healthy for your height but
              doesn&apos;t provide a specific target weight. The ideal weight
              calculation gives you a target number to aim for, but it&apos;s
              less comprehensive than BMI. Both are useful screening tools, but
              neither tells the whole story of your health.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
