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
      name: "What is a mixed number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A mixed number is a whole number combined with a proper fraction. It's a way of representing a value greater than one. For example, 2 ½.",
      },
    },
    {
      "@type": "Question",
      name: "How do you convert a mixed number to an improper fraction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To convert a mixed number to an improper fraction, you multiply the whole number by the denominator and then add the numerator. This result becomes the new numerator, and the denominator stays the same. For example, for 2 ½, you calculate (2 * 2) + 1 = 5, so the improper fraction is 5/2.",
      },
    },
    {
      "@type": "Question",
      name: "What is an improper fraction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An improper fraction is a fraction where the numerator is greater than or equal to the denominator (e.g., 5/4). They represent a value of 1 or more and can be converted into mixed numbers.",
      },
    },
  ],
};

export default function AboutMixedNumberCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Mixed Number Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our Mixed Number Calculator helps you work with mixed numbers. A mixed
          number is a whole number and a proper fraction combined. This
          calculator helps you convert them and will soon handle operations like
          addition and subtraction.
        </p>
        <h3>How to Use the Mixed Number Calculator</h3>
        <ol>
          <li>
            Enter the <strong>whole number</strong> part.
          </li>
          <li>
            Enter the <strong>numerator</strong> (the top part).
          </li>
          <li>
            Enter the <strong>denominator</strong> (the bottom part).
          </li>
        </ol>
        <p>
          The calculator will instantly convert your mixed number into an
          improper fraction.
        </p>
        <h3>Mixed Number FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What Are Mixed Numbers?</AccordionTrigger>
            <AccordionContent>
              A mixed number is a whole number with a proper fraction. For
              example, 2 ½. This is often more intuitive than its improper
              fraction equivalent, 5/2.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do you convert a mixed number to an improper fraction?
            </AccordionTrigger>
            <AccordionContent>
              Multiply the whole number by the denominator and add the
              numerator. This result becomes the new numerator. For example, for
              2 ½, calculate (2 * 2) + 1 = 5. The improper fraction is 5/2.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How do you add and subtract mixed numbers?
            </AccordionTrigger>
            <AccordionContent>
              The easiest way is to first convert them to improper fractions.
              Once you have two improper fractions, find a common denominator.
              Then you can add or subtract the numerators.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What is an improper fraction?</AccordionTrigger>
            <AccordionContent>
              An improper fraction is a fraction where the top number is larger
              than or equal to the bottom number (e.g., 5/4). They represent a
              value of 1 or more.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
