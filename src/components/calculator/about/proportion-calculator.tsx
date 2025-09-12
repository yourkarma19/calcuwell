
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
      name: "How do you solve proportions using cross-multiplication?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For the equation A/B = C/D, you multiply the numerator of the first fraction by the denominator of the second (A × D) and set it equal to the product of the other two (B × C). This gives you the equation A × D = B × C. From there, you can use simple algebra to solve for the unknown variable.",
      },
    },
    {
      "@type": "Question",
      name: "What are some real-world examples of proportions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Proportions are used everywhere in daily life, such as scaling a recipe, reading a map's scale, and calculating fuel consumption for a trip.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a ratio and a proportion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A ratio is a comparison of two numbers (e.g., A:B). A proportion is an equation that states that two ratios are equal (e.g., A/B = C/D).",
      },
    },
  ],
};

export default function AboutProportionCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Proportion Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Proportion Calculator** solves equations with two equivalent
          ratios. A proportion is a statement that two fractions are equal,
          written as A/B = C/D. This calculator helps you find the missing
          value in the equation.
        </p>

        <h3>How to Use the Proportion Calculator</h3>
        <ol>
          <li>Enter any three known values into the boxes for A, B, C, and D.</li>
          <li>The calculator will automatically solve for the fourth value.</li>
          <li>Click on an input box to solve for that value instead.</li>
        </ol>
        <p>The tool uses cross-multiplication to give an accurate answer.</p>

        <h3>Proportion Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              How do you solve proportions?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Cross-multiplication is the standard method. For the equation
                A/B = C/D, you multiply A by D and B by C. This gives you the
                equation A × D = B × C. From there, you can solve for the
                unknown variable.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              What are some real-world examples of proportions?
            </AccordionTrigger>
            <AccordionContent>
              <p>Proportions are used everywhere:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <strong>Cooking:</strong> Scaling a recipe up or down.
                </li>
                <li>
                  <strong>Maps:</strong> Reading a map's scale to find actual
                  distances.
                </li>
                <li>
                  <strong>Finance:</strong> Calculating fuel consumption for a
                  trip.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              What is the difference between a ratio and a proportion?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                A <strong>ratio</strong> is a comparison of two numbers (e.g.,
                A:B). A <strong>proportion</strong> is an equation stating that
                two ratios are equal (e.g., A/B = C/D).
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
