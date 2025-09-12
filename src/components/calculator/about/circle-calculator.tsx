
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
      name: "What is Pi (π)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pi (π) is a fundamental mathematical constant representing the ratio of a circle's circumference to its diameter. It's an irrational number, approximately equal to 3.14159, and is crucial for all calculations involving circles and spheres.",
      },
    },
    {
      "@type": "Question",
      name: "What are the key formulas for a circle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The key formulas are: Diameter (d) = 2 * r, Circumference (C) = 2 * π * r, and Area (A) = π * r².",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a circle's radius and its diameter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The radius (r) is the distance from the center of the circle to any point on its edge. The diameter (d) is the distance across the circle passing through the center. The diameter is always twice the length of the radius.",
      },
    },
  ],
};

export default function AboutCircleCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Circle Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Circle Calculator finds a circle's properties from a single
          measurement. Whether you know the radius, diameter, circumference, or
          area, this calculator can instantly find the other three values.
        </p>

        <h3>How to Use the Circle Calculator</h3>
        <ol>
          <li>Select the measurement you know (e.g., Radius).</li>
          <li>Enter the value for your known measurement.</li>
        </ol>
        <p>
          The calculator will automatically show the computed values for all
          four properties of the circle.
        </p>

        <h3>Circle Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Pi (π)?</AccordionTrigger>
            <AccordionContent>
              Pi (π) is a special number in math. It's the ratio of a circle's
              circumference to its diameter. It's an irrational number, roughly
              3.14159, and is used in all calculations for circles and spheres.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Key Circle Formulas</AccordionTrigger>
            <AccordionContent>
              This calculator uses these standard formulas:
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong>Diameter (d):</strong> `d = 2 * r`
                </li>
                <li>
                  <strong>Circumference (C):</strong> `C = 2 * π * r`
                </li>
                <li>
                  <strong>Area (A):</strong> `A = π * r²`
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Radius vs. Diameter</AccordionTrigger>
            <AccordionContent>
              The <strong>radius (r)</strong> is the distance from the center
              of the circle to any point on its edge. The{" "}
              <strong>diameter (d)</strong> is the distance across the circle,
              passing through the center. The diameter is always twice the radius.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
