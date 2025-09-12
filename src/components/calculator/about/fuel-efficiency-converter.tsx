
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
      name: "MPG vs. L/100km: What's the Difference?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MPG (Miles Per Gallon) measures distance per unit of fuel (higher is better). L/100km (Liters per 100 kilometers) measures fuel per unit of distance (lower is better). They have an inverse relationship.",
      },
    },
    {
      "@type": "Question",
      name: "Why is my car's real-world MPG different from the advertised rating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Official ratings are achieved in controlled lab conditions. Real-world efficiency is affected by driving style, road conditions, tire pressure, vehicle load, and weather.",
      },
    },
  ],
};

export default function AboutFuelEfficiencyConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Fuel Efficiency Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Fuel Efficiency Converter helps you translate between the two most
          common ways of measuring a vehicle&apos;s fuel economy:{" "}
          <strong>Miles per Gallon (MPG)</strong> and <strong>Liters per 100
          kilometers (L/100km)</strong>. This makes it easy to compare vehicles
          from different countries.
        </p>
        <h3>How to Use the Fuel Efficiency Converter</h3>
        <ol>
          <li>Enter a value in the first input box.</li>
          <li>
            The converted value will appear automatically in the second box.
          </li>
          <li>Use the **Swap button** to reverse the conversion.</li>
        </ol>
        <h3>Fuel Efficiency FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              MPG vs. L/100km: What&apos;s the Difference?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>MPG (Miles Per Gallon):</strong> This unit is common in
                the United States. It tells you how far a car can go on one
                gallon of fuel. For MPG, a **higher number is better**.
              </p>
              <p>
                <strong>L/100km (Liters per 100 kilometers):</strong> This unit
                is standard in Europe and many other parts of the world. It
                tells you how many liters of fuel a car uses to travel 100
                kilometers. For L/100km, a **lower number is better**.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why is my car&apos;s real-world MPG different from its rating?
            </AccordionTrigger>
            <AccordionContent>
              Official ratings are achieved in lab conditions. Real-world fuel
              efficiency is affected by your driving style, road conditions,
              tire pressure, and vehicle load.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
