
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
      name: "What is the formula for simple interest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula is I = P × R × T, where I is the interest, P is the principal, R is the annual interest rate in decimal form, and T is the time period in years.",
      },
    },
    {
      "@type": "Question",
      name: "What is the main difference between simple and compound interest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal and also on the accumulated interest from previous periods, leading to exponential growth over time.",
      },
    },
    {
      "@type": "Question",
      name: "When is simple interest typically used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simple interest is most commonly used for short-term loans or financial products. For example, car loans and some personal loans often use simple interest.",
      },
    },
  ],
};

export default function AboutSimpleInterestCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Understanding Simple Interest</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Simple Interest Calculator</strong> provides a
          straightforward way to determine the interest earned on a principal
          amount over a specific period. Unlike compound interest, simple
          interest is calculated only on the initial amount (the principal) and
          does not include interest on previously earned interest. It&apos;s
          often used for short-term loans or investments.
        </p>

        <h3>How to Use the Simple Interest Calculator</h3>
        <ol>
          <li>
            Enter the <strong>Principal Amount</strong> (the initial sum of
            money).
          </li>
          <li>
            Set the annual <strong>Interest Rate</strong> (as a percentage).
          </li>
          <li>
            Define the <strong>Tenure</strong> in years.
          </li>
        </ol>
        <p>
          The results will instantly show the total interest earned and the
          final amount (principal + interest).
        </p>

        <h3>Simple Interest FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              What is the formula for simple interest?
            </AccordionTrigger>
            <AccordionContent>
              <p>The formula is `I = P × R × T`, where:</p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>I</strong> is the total interest earned.
                </li>
                <li>
                  <strong>P</strong> is the principal amount.
                </li>
                <li>
                  <strong>R</strong> is the annual interest rate in decimal form
                  (e.g., 5% = 0.05).
                </li>
                <li>
                  <strong>T</strong> is the time period in years.
                </li>
              </ul>
              <p>
                This calculator uses the rate as a percentage, so the formula is
                `(P * R * T) / 100`.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              Simple vs. Compound Interest: What&apos;s the main difference?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Simple interest is calculated solely on the original principal
                amount, so you earn the same amount of interest each year. In
                contrast, compound interest is calculated on both the principal
                and the accumulated interest from previous periods. This
                &quot;interest on interest&quot; effect means compound interest
                leads to much faster growth over time, especially for long-term
                investments.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              When is simple interest typically used?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Simple interest is most commonly used for short-term loans or
                financial products. For example, car loans and some personal
                loans often use simple interest. It&apos;s less common for
                long-term savings or investment accounts, where compound
                interest is the standard because it provides better returns.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
