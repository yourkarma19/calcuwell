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
      name: "What is the Greatest Common Divisor (GCD)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Greatest Common Divisor (also known as the Greatest Common Factor) is the largest positive integer that divides each of the integers in a set without leaving a remainder. For example, the GCD of 12 and 18 is 6.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Least Common Multiple (LCM)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Least Common Multiple is the smallest positive integer that is a multiple of every integer in a set. For example, the LCM of 12 and 18 is 36.",
      },
    },
    {
      "@type": "Question",
      name: "How are LCM and GCD related?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For any two positive integers 'a' and 'b', their product is equal to the product of their GCD and LCM: a * b = GCD(a, b) * LCM(a, b).",
      },
    },
  ],
};

export default function AboutLcmGcdCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the LCM & GCD Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **LCM & GCD Calculator** is a tool for number theory. It lets you
          quickly find the Least Common Multiple (LCM) and the Greatest Common
          Divisor (GCD) for a set of two or more positive integers.
        </p>
        <h3>How to Use the LCM & GCD Calculator</h3>
        <ol>
          <li>Enter at least two positive integers into the input boxes.</li>
          <li>
            If you need to analyze more numbers, click the **&quot;Add
            Number&quot;** button.
          </li>
        </ol>
        <p>
          The calculator will instantly display the GCD and LCM for the numbers
          you have entered.
        </p>
        <h3>LCM & GCD FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is the Greatest Common Divisor (GCD)?
            </AccordionTrigger>
            <AccordionContent>
              The GCD is the largest positive integer that divides each of the
              integers in a set without a remainder. For example, the GCD of 12
              and 18 is 6.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the Least Common Multiple (LCM)?
            </AccordionTrigger>
            <AccordionContent>
              The LCM is the smallest positive integer that is a multiple of
              every integer in a set. For example, the LCM of 12 and 18 is 36.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How are LCM and GCD related?</AccordionTrigger>
            <AccordionContent>
              For any two positive integers &apos;a&apos; and &apos;b&apos;,
              their product is equal to the product of their GCD and LCM: `a * b
              = GCD(a, b) * LCM(a, b)`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Practical Uses</AccordionTrigger>
            <AccordionContent>
              GCD is used to simplify fractions. LCM is used when adding or
              subtracting fractions to find the least common denominator.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
