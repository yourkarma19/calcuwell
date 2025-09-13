"use client";

import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { FAQPage, WithContext } from "schema-dts";

interface AboutLoanEMICalculatorProps {
  principal: number;
  totalInterest: number;
}

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the formula for calculating EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula used to calculate EMI is: EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1), where P is the Principal, r is the monthly interest rate, and n is the number of monthly installments.",
      },
    },
    {
      "@type": "Question",
      name: "How can I reduce my EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reduce your EMI by choosing a longer tenure, but this means you pay more in total interest. The best ways to lower your loan burden are to make a larger down payment, find a lower interest rate, or make prepayments.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I use an EMI Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It helps you plan your budget, avoid financial stress by choosing an EMI you can afford, compare loans from different banks, and understand the real cost of borrowing money over time.",
      },
    },
  ],
};

const LoanBreakdownChart = dynamic(
  () =>
    import("@/components/charts/loan-breakdown-chart").then(
      (mod) => mod.LoanBreakdownChart,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[250px]" />,
  },
);

export default function AboutLoanEMICalculator({
  principal,
  totalInterest,
}: AboutLoanEMICalculatorProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the EMI Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our EMI Calculator helps you find your Equated Monthly Installments
            (EMI). Knowing your EMI in advance allows you to plan your finances
            better. By entering the loan amount, interest rate, and tenure, you
            can instantly get your monthly payment and total loan cost.
          </p>

          <h3>How to Use the EMI Calculator</h3>
          <ol>
            <li>Enter the **Loan Amount** you wish to borrow.</li>
            <li>Input the **Annual Interest Rate**.</li>
            <li>Select the **Loan Tenure** (in years).</li>
            <li>
              (Optional) Add extra payments to see how it reduces your loan
              duration and saves you money.
            </li>
          </ol>

          <h3>EMI FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                What is the formula for calculating EMI?
              </AccordionTrigger>
              <AccordionContent>
                <p>The formula to calculate EMI is:</p>
                <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
                  EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)
                </p>
                <p>
                  Where: <strong>P</strong> is the Principal Loan Amount,{" "}
                  <strong>r</strong> is the monthly interest rate, and{" "}
                  <strong>n</strong> is the number of monthly installments.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">
                How can I reduce my EMI?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You can reduce your EMI by choosing a longer tenure, but this
                  means you pay more in total interest. The best ways to lower
                  your loan burden are to make a larger down payment, find a
                  lower interest rate, or make prepayments.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold">
                Why use an EMI Calculator?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  It helps you plan your budget, avoid financial stress, compare
                  loans from different banks, and understand the real cost of
                  borrowing money.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {principal > 0 && totalInterest > 0 && (
        <Card>
          <CardHeader>
            <CardTitle as="h3">Loan Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[250px]">
              <LoanBreakdownChart
                principal={principal}
                totalInterest={totalInterest}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
