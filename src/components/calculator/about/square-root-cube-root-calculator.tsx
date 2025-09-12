
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
      name: "What is a square root?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A square root of a number is a value that, when multiplied by itself, gives the original number. For example, the square root of 9 is 3, because 3 × 3 = 9.",
      },
    },
    {
      "@type": "Question",
      name: "What is a cube root?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cube root of a number is a value that, when multiplied by itself three times, gives the original number. For example, the cube root of 27 is 3, because 3 × 3 × 3 = 27.",
      },
    },
    {
      "@type": "Question",
      name: "What is the root of a negative number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can find the real cube root of a negative number (e.g., the cube root of -8 is -2). However, the square root of a negative number is an 'imaginary number,' which this calculator indicates with the symbol 'i'.",
      },
    },
    {
      "@type": "Question",
      name: "What is a 'perfect square'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A perfect square is an integer that is the square of another integer. For example, 4, 9, and 16 are perfect squares because they are 2², 3², and 4², respectively. Their square roots are whole numbers.",
      },
    },
  ],
};

export default function AboutSquareRootCubeRootCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Root Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Square & Cube Root Calculator</strong> is a simple tool
          for finding the square root and cube root of any number. This is
          useful in a wide range of applications, from basic algebra to complex
          engineering problems.
        </p>

        <h3>How to Use the Root Calculator</h3>
        <p>
          Simply enter a number into the input field. The calculator will
          instantly display both the square root and the cube root of the
          number.
        </p>

        <h3>Root Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a square root?</AccordionTrigger>
            <AccordionContent>
              A square root of a number is a value that, when multiplied by
              itself, gives the original number. For example, the square root of
              9 is 3, because 3 × 3 = 9.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is a cube root?</AccordionTrigger>
            <AccordionContent>
              A cube root of a number is a value that, when multiplied by itself
              three times, gives the original number. For example, the cube root
              of 27 is 3, because 3 × 3 × 3 = 27.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What about the root of a negative number?
            </AccordionTrigger>
            <AccordionContent>
              You can find the real cube root of a negative number (e.g., the
              cube root of -8 is -2). However, the square root of a negative
              number is an &quot;imaginary number,&quot; which this calculator indicates
              with the symbol &apos;i&apos;.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What is a &quot;perfect square&quot;?
            </AccordionTrigger>
            <AccordionContent>
              A perfect square is an integer that is the square of another
              integer. For example, 4, 9, and 16 are perfect squares because
              they are 2², 3², and 4², respectively. Their square roots are
              whole numbers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
