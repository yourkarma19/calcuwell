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
      name: "What is the formula for compound interest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula to calculate the future value (A) of an investment is: A = P(1 + r/n)^(nt), where P is the principal, r is the annual interest rate, n is the number of compounding periods per year, and t is the number of years.",
      },
    },
    {
      "@type": "Question",
      name: "How does compounding frequency affect my savings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The more frequently interest is compounded, the more you will earn. Interest compounded monthly will result in a slightly higher total amount than interest compounded annually at the same rate because you start earning interest on your interest sooner.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between simple and compound interest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal and also on the accumulated interest from previous periods, leading to exponential growth over time.",
      },
    },
  ],
};

export default function AboutCompoundInterestCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Compound Interest Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Compound Interest Calculator</strong> shows how your money
          can grow faster over time. By reinvesting the interest you earn, your
          investment gets larger. This &quot;interest on interest&quot; effect
          can significantly boost your savings.
        </p>

        <h3>How to Use the Compound Interest Calculator</h3>
        <ol>
          <li>
            Enter the <strong>Principal Amount</strong> you are starting with.
          </li>
          <li>
            Set the estimated annual <strong>Interest Rate</strong>.
          </li>
          <li>
            Choose the <strong>Investment Tenure</strong> in years.
          </li>
          <li>
            Select the <strong>Compounding Frequency</strong> (how often
            interest is calculated).
          </li>
        </ol>
        <p>
          The results will show the total future value and the total interest
          earned.
        </p>

        <h3>Compound Interest FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              What is the formula for compound interest?
            </AccordionTrigger>
            <AccordionContent>
              <p>The formula to find the future value (A) is:</p>
              <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
                A = P(1 + r/n)^(nt)
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>A</strong> = the future value of the investment
                </li>
                <li>
                  <strong>P</strong> = the principal amount
                </li>
                <li>
                  <strong>r</strong> = the annual interest rate (as a decimal)
                </li>
                <li>
                  <strong>n</strong> = the number of times interest is
                  compounded per year
                </li>
                <li>
                  <strong>t</strong> = the number of years
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              How does compounding frequency affect savings?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The more often interest is compounded, the more you will earn.
                For example, monthly compounding will result in a slightly
                higher total than annual compounding.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              Simple vs. Compound Interest: What&apos;s the difference?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Simple interest</strong> is calculated only on the
                original principal. <strong>Compound interest</strong> is
                calculated on the principal plus the interest that has already
                been earned. This means your investment grows faster.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-semibold">
              Why is starting early so important?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Time is the most important factor for compound interest. The
                longer your money is invested, the more it can grow. Someone who
                starts saving a small amount early can easily end up with more
                than someone who saves a larger amount starting later in life.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
