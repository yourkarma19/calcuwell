
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
      name: "What is Heron's formula for triangle area?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Heron's formula allows you to calculate the area of a triangle when you only know the lengths of the three sides. The formula is Area = √[s(s-a)(s-b)(s-c)], where 's' is the semi-perimeter (half the perimeter).",
      },
    },
    {
      "@type": "Question",
      name: "What is the Triangle Inequality Theorem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For any valid triangle, the sum of the lengths of any two sides must be greater than the length of the third side. If this condition isn't met, the sides cannot form a closed triangle. Our calculator checks for this.",
      },
    },
  ],
};

export default function AboutTriangleAreaCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Triangle Area Calculation</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our Triangle Area Calculator is a versatile tool for finding the area
          of a triangle using different sets of known values. Whether you know
          the base and height, all three sides (SSS), or two sides and the angle
          between them (SAS), this calculator can help you find the solution.
        </p>
        <h3>How It Works</h3>
        <p>The calculator uses the standard formula for each method:</p>
        <ul>
          <li>
            <strong>Base and Height:</strong> `Area = 0.5 * base * height`
          </li>
          <li>
            <strong>Three Sides (Heron's Formula):</strong> `Area =
            √[s(s-a)(s-b)(s-c)]`, where `s` is the semi-perimeter.
          </li>
          <li>
            <strong>Two Sides and an Included Angle (SAS):</strong> `Area = 0.5
            * a * b * sin(C)`
          </li>
        </ul>

        <h3>Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Heron's formula?</AccordionTrigger>
            <AccordionContent>
              Heron's formula allows you to calculate the area of a
              triangle when you only know the lengths of the three sides. It is
              named after Hero of Alexandria, a Greek mathematician and
              engineer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the Triangle Inequality Theorem?
            </AccordionTrigger>
            <AccordionContent>
              For any triangle, the sum of the lengths of any two sides must be
              greater than the length of the third side. If this condition
              isn't met, the sides cannot form a closed triangle. Our
              calculator checks for this when you use the &quot;Three Sides
              (SSS)&quot; method.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
