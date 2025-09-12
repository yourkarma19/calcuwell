
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
      name: "How do Roman numerals work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Roman numerals use letters to represent numbers: I (1), V (5), X (10), L (50), C (100), D (500), M (1000). Numbers are formed by combining these symbols, usually from largest to smallest (e.g., VI = 6).",
      },
    },
    {
      "@type": "Question",
      name: "What is the subtractive principle in Roman numerals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To avoid repeating a symbol four times, a smaller value is placed before a larger one to indicate subtraction. For example, 4 is written as IV (5 - 1) instead of IIII, and 9 is IX (10 - 1).",
      },
    },
    {
      "@type": "Question",
      name: "Why is there a limit of 3,999?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standard system does not have a symbol for 4,000 or greater, as it would require repeating 'M' four times (MMMM), which violates the standard rules. 3,999 is written as MMMCMXCIX.",
      },
    },
  ],
};

export default function AboutRomanNumeralConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Roman Numeral Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Roman Numeral Converter</strong> is a tool for translating
          between the Arabic numerals we use today (1, 2, 3) and the ancient
          Roman system (I, II, III). This calculator provides a quick and
          accurate conversion for any number between 1 and 3,999.
        </p>

        <h3>How to Use the Roman Numeral Converter</h3>
        <ol>
          <li>
            Enter either a <strong>Number</strong> or a{" "}
            <strong>Roman Numeral</strong> into the appropriate input box.
          </li>
          <li>
            The tool will instantly provide the conversion in the other box.
          </li>
          <li>
            Use the <strong>Swap button</strong> to easily switch the direction
            of the conversion.
          </li>
        </ol>

        <h3>Roman Numeral FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do Roman numerals work?</AccordionTrigger>
            <AccordionContent>
              Roman numerals use letters to represent numbers. The main symbols
              are I (1), V (5), X (10), L (50), C (100), D (500), and M (1000).
              The values are combined, typically from largest to smallest, to
              form larger numbers (e.g., VI = 6).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the subtractive principle?
            </AccordionTrigger>
            <AccordionContent>
              To avoid repeating a symbol four times (like IIII), a smaller
              value is placed before a larger one to indicate subtraction. This
              makes the notation more compact. For example: IV = 4 (5 - 1) and
              IX = 9 (10 - 1).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Why is there a limit of 3,999?</AccordionTrigger>
            <AccordionContent>
              The standard Roman numeral system does not have a native way to
              represent numbers of 4,000 or greater. The largest standard
              numeral is M (1,000), and the rules don't allow for four
              consecutive identical numerals (MMMM).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Where are Roman numerals still used today?
            </AccordionTrigger>
            <AccordionContent>
              Roman numerals are often used for stylistic purposes. Common uses
              include on clock faces, for chapter numbers in books, in the names
              of monarchs (like Queen Elizabeth II), and for major events like
              the Super Bowl.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
