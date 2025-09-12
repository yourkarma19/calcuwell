
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
      name: "How do you add fractions with different denominators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To add fractions with different denominators, you must first find a common denominator. This is a number that both denominators can divide into. Once both fractions have the same denominator, you can add their numerators. For example, to add 1/2 + 1/4, you convert 1/2 to 2/4. Then, you add the numerators: 2/4 + 1/4 = 3/4.",
      },
    },
    {
      "@type": "Question",
      name: "How do you simplify a fraction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To simplify a fraction, you find the largest number that divides both the numerator and the denominator evenly. This is called the Greatest Common Divisor (GCD). You then divide both the top and bottom numbers by the GCD. For example, for the fraction 12/16, the GCD is 4. Dividing both parts by 4 gives you the simplified fraction 3/4.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a proper and improper fraction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A proper fraction is one where the top number is smaller than the bottom number (e.g., 3/4). An improper fraction is one where the top number is larger than or equal to the bottom number (e.g., 5/4).",
      },
    },
  ],
};

export default function AboutFractionCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About Fraction Calculations</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our Fraction Calculator is designed to simplify math with fractions.
          It provides instant and accurate results for adding, subtracting,
          multiplying, and dividing fractions. It also automatically simplifies
          the result to its lowest terms.
        </p>

        <h3>How to Use the Calculator</h3>
        <ol>
          <li>
            Enter the numerator and denominator for the **first fraction**.
          </li>
          <li>Select the desired math **operator** (+, -, ×, ÷).</li>
          <li>
            Enter the numerator and denominator for the **second fraction**.
          </li>
        </ol>
        <p>
          The result of the calculation will be displayed instantly, already
          simplified for you.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              How do you add fractions with different denominators?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                To add fractions with different denominators, you must first
                find a common denominator. This is a number that both
                denominators can divide into. Once both fractions have the same
                denominator, you can add their numerators. For example, to add
                1/2 + 1/4, you convert 1/2 to 2/4. Then, you add the numerators:
                2/4 + 1/4 = 3/4.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              How do you simplify a fraction?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                To simplify a fraction, you find the largest number that divides
                both the numerator and the denominator evenly. This number is
                called the Greatest Common Divisor (GCD). You then divide both
                the top and bottom numbers by the GCD. For example, for the
                fraction 12/16, the GCD is 4. Dividing both parts by 4 gives you
                the simplified fraction 3/4.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              What is the difference between a proper and improper fraction?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                A **proper fraction** is one where the top number is smaller
                than the bottom number (e.g., 3/4). An **improper fraction** is
                one where the top number is larger than or equal to the bottom
                number (e.g., 5/4). Improper fractions can also be written as
                mixed numbers (e.g., 5/4 is the same as 1 ¼).
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
