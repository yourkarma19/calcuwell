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
      name: "What is a Ratio? A Simple Explanation with Examples",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ratio compares two quantities. For example, if there are 8 girls and 12 boys, the ratio of girls to boys is 8:12. This can be simplified to 2:3 by dividing both numbers by their greatest common divisor (4).",
      },
    },
    {
      "@type": "Question",
      name: "How to Simplify a Ratio",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To simplify a ratio, you find the largest number that both parts of the ratio can be divided by without a remainder (the Greatest Common Divisor). For the ratio 12:18, the GCD is 6. Dividing both parts by 6 gives the simplified ratio 2:3.",
      },
    },
    {
      "@type": "Question",
      name: "Understanding Aspect Ratios in Screens (e.g., 16:9 vs 4:3)",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aspect ratio describes the relationship between the width and height of a screen. A 16:9 ratio, common for modern TVs, means for every 16 units of width, there are 9 units of height. An older, squarish TV used a 4:3 aspect ratio.",
      },
    },
  ],
};

export default function AboutRatioCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Ratio Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our <strong>Ratio Calculator</strong> simplifies ratios and solves for
          missing values in a proportion. Ratios are used to compare the
          relative size of two quantities. This tool is perfect for students,
          designers, and engineers.
        </p>

        <h3>How to Use the Ratio Calculator</h3>
        <ol>
          <li>
            Enter the values for <strong>A</strong>, <strong>B</strong>, and{" "}
            <strong>C</strong> in the proportion `A : B = C : D`.
          </li>
          <li>
            The calculator will automatically solve for the missing value{" "}
            <strong>D</strong>.
          </li>
          <li>
            It will also display the simplified version of the ratio `A : B`.
          </li>
        </ol>
        <p>
          This makes it easy to scale quantities, such as when resizing an image
          while keeping its aspect ratio.
        </p>

        <h3>Ratio Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is a Ratio? A Simple Explanation
            </AccordionTrigger>
            <AccordionContent>
              A ratio compares two quantities. For example, if there are 8 girls
              and 12 boys, the ratio of girls to boys is 8:12. This can be
              simplified to 2:3 by dividing both numbers by 4.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How to Simplify a Ratio</AccordionTrigger>
            <AccordionContent>
              To simplify a ratio, find the largest number that divides both
              parts of the ratio evenly (the Greatest Common Divisor). For
              12:18, the GCD is 6. Dividing both parts by 6 gives the simplified
              ratio 2:3.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Understanding Aspect Ratios (e.g., 16:9 vs 4:3)
            </AccordionTrigger>
            <AccordionContent>
              Aspect ratio describes the relationship between the width and
              height of a screen. A 16:9 ratio, common for modern TVs, means for
              every 16 units of width, there are 9 units of height. An older TV
              used a 4:3 ratio.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Is a ratio the same as a fraction?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                They are closely related. A fraction represents a part of a
                whole (e.g., 1/2 means one part out of two total parts). A ratio
                compares two different quantities (e.g., a ratio of 1:2 could
                mean 1 teacher for every 2 students).
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
