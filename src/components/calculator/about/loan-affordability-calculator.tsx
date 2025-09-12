
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
      name: "What is Debt-to-Income (DTI) Ratio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your DTI ratio is the percentage of your gross monthly income that goes toward paying your monthly debt payments. Lenders use it as a key metric to measure your ability to manage payments. A lower DTI ratio indicates a healthy balance between your debt and income.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my Debt-to-Income (DTI) ratio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are two main ways: increase your income or reduce your monthly debt. To reduce debt, focus on paying down existing loans or credit card balances. It's also wise to avoid taking on new debt right before you apply for a major loan.",
      },
    },
    {
      "@type": "Question",
      name: "Is this calculator an official loan offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this is an estimation tool for informational purposes only. The actual loan amount you qualify for may vary based on your credit score, employment history, and the specific policies of the lender. This tool should be used as a starting point for your financial planning.",
      },
    },
  ],
};

export default function AboutLoanAffordabilityCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Loan Affordability Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Loan Affordability Calculator helps you determine how much you can
          realistically borrow. By analyzing your income and existing debts,
          this tool provides an estimate of the maximum loan amount you can
          likely manage. This helps you set realistic goals.
        </p>

        <h3>How to Use the Loan Affordability Calculator</h3>
        <ol>
          <li>Enter your total gross <strong>Annual Income</strong>.</li>
          <li>
            Provide your total <strong>Monthly Debt Payments</strong> (e.g.,
            credit card bills, other loans).
          </li>
          <li>
            Input the estimated <strong>Interest Rate</strong> and{" "}
            <strong>Loan Term</strong> for the new loan.
          </li>
          <li>
            Adjust the <strong>Debt-to-Income (DTI) Ratio</strong> slider. 43%
            is a common maximum that lenders allow.
          </li>
        </ol>
        <p>
          The calculator will instantly show you the maximum loan you can likely
          afford and your estimated monthly payment.
        </p>

        <h3>Loan Affordability FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is Debt-to-Income (DTI) Ratio?
            </AccordionTrigger>
            <AccordionContent>
              Your DTI ratio is the percentage of your gross monthly income that
              goes toward monthly debt payments. Lenders use it to measure your
              ability to manage payments. A lower DTI ratio is better.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How can I improve my DTI?</AccordionTrigger>
            <AccordionContent>
              There are two main ways: increase your income or reduce your
              monthly debt. To reduce debt, focus on paying down existing loans.
              It's also wise to avoid taking on new debt right before applying
              for a major loan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is this an official loan offer?</AccordionTrigger>
            <AccordionContent>
              No, this is an estimation tool for informational purposes only.
              The actual loan amount you qualify for may vary based on your
              credit score, employment history, and lender policies.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
