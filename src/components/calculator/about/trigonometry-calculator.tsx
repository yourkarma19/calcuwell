
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
      name: "What are Sine, Cosine, and Tangent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sine (sin), Cosine (cos), and Tangent (tan) are the three primary trigonometric functions, defined as ratios of the sides of a right-angled triangle: sin(θ) = Opposite / Hypotenuse, cos(θ) = Adjacent / Hypotenuse, and tan(θ) = Opposite / Adjacent.",
      },
    },
    {
      "@type": "Question",
      name: "What are Inverse Trigonometric Functions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Inverse trig functions (asin, acos, atan) are used to find an angle when you know the ratio of its sides. For example, if sin(θ) = 0.5, then asin(0.5) will give you the angle θ.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Degrees and Radians?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Degrees and Radians are two units for measuring angles. A full circle is 360 degrees or 2π radians. Most advanced math and physics formulas use radians for simplicity.",
      },
    },
  ],
};

export default function AboutTrigonometryCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Trigonometry Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Trigonometry Calculator** provides an easy way to solve trig
          problems. It allows you to find the values of sine, cosine, tangent,
          and their inverse functions for any angle, in either degrees or
          radians.
        </p>

        <h3>How to Use the Trigonometry Calculator</h3>
        <ol>
          <li>Select the trigonometric **Function** you want to use.</li>
          <li>Enter the **Value**.</li>
          <li>Choose the **Unit** for your angle (Degrees or Radians).</li>
        </ol>
        <p>The result is displayed instantly.</p>

        <h3>Trigonometry FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What are Sine, Cosine, and Tangent?
            </AccordionTrigger>
            <AccordionContent>
              Sine (sin), Cosine (cos), and Tangent (tan) are the three primary
              trigonometric functions. They are defined as ratios of the sides
              of a right-angled triangle.
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <strong>Sine (sin):</strong> Opposite / Hypotenuse
                </li>
                <li>
                  <strong>Cosine (cos):</strong> Adjacent / Hypotenuse
                </li>
                <li>
                  <strong>Tangent (tan):</strong> Opposite / Adjacent
                </li>
              </ul>
              The acronym **SOH-CAH-TOA** is often used to remember these.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What are Inverse Trigonometric Functions?
            </AccordionTrigger>
            <AccordionContent>
              Inverse trig functions (like asin, acos, atan) are used to find
              the angle when you know the ratio of the sides. For example, if
              you know sin(θ) = 0.5, you can use arcsin(0.5) to find that the
              angle is 30 degrees.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Degrees vs. Radians</AccordionTrigger>
            <AccordionContent>
              Degrees and Radians are two different units for measuring angles.
              A full circle is 360 degrees or 2π radians. It's important to use
              the correct unit for your calculations. Most advanced math
              formulas use radians.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Real-World Applications</AccordionTrigger>
            <AccordionContent>
              Trigonometry is used in astronomy, navigation (GPS), engineering,
              physics, and video game development.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
