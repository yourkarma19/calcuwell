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
        text: "Your DTI ratio is the percentage of your gross monthly income that goes toward paying your monthly debt payments (like other loans, credit card minimums, etc.). Lenders use it as a key metric to measure your ability to manage payments. A lower DTI ratio indicates a healthy balance between your debt and income.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my Debt-to-Income (DTI) ratio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are two main ways: increase your income or reduce your monthly debt. To reduce debt, focus on paying down existing loans or credit card balances. It's also wise to avoid taking on new debt right before you apply for a major loan, as this can negatively impact your ratio.",
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
        <CardTitle>About the Loan Affordability Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h3>What is Loan Affordability?</h3>
        <p>
          This calculator helps you estimate the total loan amount you might be
          able to borrow based on your income and existing financial
          commitments. It&apos;s a crucial first step before applying for a home
          loan, car loan, or any major financing.
        </p>

        <h3>How it Works</h3>
        <p>
          The calculation is based on your **Debt-to-Income (DTI) ratio**. This
          is the percentage of your gross monthly income that goes toward paying
          your monthly debt. Lenders use this ratio to assess your ability to
          repay a new loan. A lower DTI suggests you can handle a new loan more
          comfortably.
        </p>

        <h3>Loan Affordability FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is Debt-to-Income (DTI) Ratio?
            </AccordionTrigger>
            <AccordionContent>
              Your DTI ratio is the percentage of your gross monthly income
              that goes toward paying your monthly debt payments. Lenders use
              it as a key metric to measure your ability to manage payments. A
              lower DTI ratio indicates a healthy balance between your debt
              and income.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How can I improve my Debt-to-Income (DTI) ratio?
            </AccordionTrigger>
            <AccordionContent>
              There are two main ways: increase your income or reduce your
              monthly debt. To reduce debt, focus on paying down existing
              loans or credit card balances. It&apos;s also wise to avoid taking
              on new debt right before you apply for a major loan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Is this calculator an official loan offer?
            </AccordionTrigger>
            <AccordionContent>
              No, this is an estimation tool for informational purposes only.
              The actual loan amount you qualify for may vary based on your
              credit score, employment history, and the specific policies of
              the lender.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
