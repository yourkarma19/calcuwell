
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
      name: "What is an EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An Equated Monthly Installment (EMI) is the fixed payment amount a borrower makes to a lender each month. It includes both the principal amount and the interest on the loan, ensuring the loan is fully paid off over the specified tenure.",
      },
    },
    {
      "@type": "Question",
      name: "How can I lower my car loan EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can lower your EMI by making a larger down payment, which reduces the principal loan amount. Choosing a longer loan tenure will also lower the monthly payment, but be aware that this usually means you will pay more in total interest.",
      },
    },
    {
      "@type": "Question",
      name: "What other costs should I consider when buying a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beyond the loan, remember to budget for ongoing car ownership costs such as insurance, fuel, regular maintenance, and potential repairs. These are not included in the loan calculation but are a significant part of the total cost of owning a car.",
      },
    },
  ],
};

export default function AboutCarLoanCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Car Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our <strong>Car Loan Calculator</strong> helps you understand the
          true cost of a car loan by calculating your monthly payment (EMI).
          This helps you budget effectively, compare different loan offers, and
          make a smart decision before you buy.
        </p>

        <h3>How to Use the Car Loan Calculator</h3>
        <ol>
          <li>Enter the total <strong>Car Price</strong>.</li>
          <li>
            Input your <strong>Down Payment</strong> and the{" "}
            <strong>Trade-in Value</strong> of your old vehicle.
          </li>
          <li>
            Adjust the <strong>Interest Rate</strong> and{" "}
            <strong>Loan Tenure</strong> (in years).
          </li>
        </ol>
        <p>
          The calculator will instantly show your monthly payment and how the
          total cost is divided between the loan amount and interest paid.
        </p>

        <h3>Car Loan FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is an EMI?</AccordionTrigger>
            <AccordionContent>
              An Equated Monthly Installment (EMI) is the fixed payment you make
              to a lender each month. It includes both the principal loan amount
              and the interest.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the total cost of the car?
            </AccordionTrigger>
            <AccordionContent>
              The total cost includes the loan amount, all the interest paid
              over the loan's life, and any down payment. It's the complete
              out-of-pocket expense for the vehicle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How can I lower my EMI?</AccordionTrigger>
            <AccordionContent>
              You can lower your EMI by making a larger down payment. A longer
              loan term also lowers the monthly payment, but you will usually
              pay more in total interest.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What other costs should I consider?
            </AccordionTrigger>
            <AccordionContent>
              Besides the loan, remember to budget for ongoing costs like
              insurance, fuel, and maintenance. These are not included in the
              loan calculation but are a big part of owning a car.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
