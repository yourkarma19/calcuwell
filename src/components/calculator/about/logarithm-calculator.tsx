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
      name: "What is a logarithm?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A logarithm is the power to which a number (the base) must be raised to produce another number. For example, the logarithm of 100 to base 10 is 2, because 10² equals 100.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Common Log and Natural Log?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The common logarithm (log) uses base 10 and is common in science. The natural logarithm (ln) uses base e (about 2.718) and is important in math, physics, and finance for describing continuous growth.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't the base of a logarithm be 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A base of 1 is not allowed because 1 raised to any power is always 1. This means you could never produce any other number, making the operation undefined for most values.",
      },
    },
  ],
};

export default function AboutLogarithmCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Logarithm Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Logarithm Calculator finds the logarithm of a number to a
          specified base. Logarithms are the inverse of exponents. They answer
          the question: &quot;To what power must we raise a base to get another
          number?&quot;
        </p>

        <h3>How to Use the Logarithm Calculator</h3>
        <ol>
          <li>
            Enter the <strong>Number (x)</strong> you want to find the logarithm
            of.
          </li>
          <li>
            Enter the <strong>Base (b)</strong> for the logarithm.
          </li>
        </ol>
        <p>
          The result of log(x) to the base(b) will be calculated and displayed
          instantly.
        </p>

        <h3>Logarithm FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a logarithm?</AccordionTrigger>
            <AccordionContent>
              A logarithm is the power to which a number (the base) must be
              raised to produce another number. For example, the logarithm of
              100 to base 10 is 2, because 10² equals 100.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Common Log vs. Natural Log</AccordionTrigger>
            <AccordionContent>
              The <strong>common logarithm (log)</strong> uses base 10. The{" "}
              <strong>natural logarithm (ln)</strong> uses base *e* (about
              2.718). The natural log is important in math, physics, and finance
              for describing continuous growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Why can&apos;t the base be 1?</AccordionTrigger>
            <AccordionContent>
              A base of 1 is not allowed because 1 raised to any power is always
              1. This means you could never produce any other number, so the
              operation would be undefined.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What is the Change of Base Formula?
            </AccordionTrigger>
            <AccordionContent>
              Most calculators only have buttons for common log (base 10) and
              natural log (base e). To find a log with a different base, you can
              use the change of base formula: `logb(x) = logc(x) / logc(b)`. Our
              calculator uses this formula for you.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
