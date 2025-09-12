
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
      name: "What is a complex number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A complex number has the form a + bi, where 'a' is the real part and 'b' is the imaginary part. They are used in many areas of science and engineering, like electronics and signal processing.",
      },
    },
    {
      "@type": "Question",
      name: "What is the imaginary unit 'i'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The imaginary unit 'i' is the solution to the equation x² = -1, defined as the square root of negative one (√-1). It was created to solve problems that have no real number solution.",
      },
    },
    {
      "@type": "Question",
      name: "How do you add or subtract complex numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You add or subtract the real parts and the imaginary parts separately. For example, (3 + 2i) + (1 + 4i) = (3+1) + (2+4)i = 4 + 6i.",
      },
    },
  ],
};

export default function AboutComplexNumberCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Complex Number Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          This calculator helps you work with complex numbers. They are a key
          part of math and engineering. This tool lets you easily add,
          subtract, multiply, and divide them.
        </p>

        <h3>How to Use the Complex Number Calculator</h3>
        <p>
          A complex number has two parts: a real part and an imaginary part.
          Enter both parts for the two numbers you want to use. Then, select
          the operation you want to perform.
        </p>

        <h3>Complex Number FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a complex number?</AccordionTrigger>
            <AccordionContent>
              A complex number has the form `a + bi`. The 'a' is the "real"
              part, and the 'b' is the "imaginary" part. They are used in many
              areas of science and engineering.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the imaginary unit 'i'?
            </AccordionTrigger>
            <AccordionContent>
              The imaginary unit 'i' is the solution to the equation x² = -1. It
              is defined as the square root of negative one (√-1). 'i' was
              created to solve problems that have no real number solution.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How do you add or subtract them?
            </AccordionTrigger>
            <AccordionContent>
              It's simple: you add or subtract the real parts and the imaginary
              parts separately. For example, `(3 + 2i) + (1 + 4i) = (3+1) +
              (2+4)i = 4 + 6i`.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
