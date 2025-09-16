
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
      name: "What is PITI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components of a monthly mortgage payment. Principal is the amount that goes towards paying down your loan balance, while Interest is the cost of borrowing. Taxes and Insurance are often collected by the lender and paid on your behalf from an escrow account.",
      },
    },
    {
      "@type": "Question",
      name: "What is loan amortization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Amortization is the process of paying off a loan over time with regular payments. In the early years of a mortgage, a larger portion of your payment goes towards interest. As you continue to make payments, more of your money goes towards paying down the principal balance. The amortization chart visualizes how much of your total payment goes to principal versus interest and other costs over the life of the loan.",
      },
    },
    {
      "@type": "Question",
      name: "How can I lower my mortgage payment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are several ways to lower your payment: 1) Make a larger down payment to reduce the principal. 2) Choose a longer loan term (e.g., 30 years instead of 15), but be aware this means paying more interest over time. 3) Shop around for the best possible interest rate, as even a small difference can have a big impact. 4) Improve your credit score before applying.",
      },
    },
  ],
};

export default function AboutMortgageCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Mortgage Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Mortgage Calculator** helps you understand the full cost of a
          home loan. It includes key expenses like property taxes and home
          insurance. This provides a realistic estimate of your total monthly
          housing payment and empowers you to budget accurately.
        </p>

        <h3>How to Use the Mortgage Calculator</h3>
        <ol>
          <li>Enter the **Home Price** you are considering.</li>
          <li>Input the estimated annual **Interest Rate**.</li>
          <li>Select the **Loan Term** in years (e.g., 15 or 30 years).</li>
          <li>
            Provide your estimated **Annual Property Tax** and **Home
            Insurance** costs.
          </li>
        </ol>
        <p>
          The calculator will instantly break down your monthly payment into
          principal, interest, tax, and insurance (PITI).
        </p>

        <h3>Mortgage FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is PITI?</AccordionTrigger>
            <AccordionContent>
              PITI stands for Principal, Interest, Taxes, and Insurance. These
              are the four main parts of a monthly mortgage payment. Principal
              pays down your loan balance, while Interest is the cost of
              borrowing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why include taxes and insurance?
            </AccordionTrigger>
            <AccordionContent>
              Property taxes and homeowners insurance are significant ongoing
              costs. Forgetting to include them can lead to a much higher
              payment than you expected.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is loan amortization?</AccordionTrigger>
            <AccordionContent>
              Amortization is paying off a loan over time with regular
              payments. In the early years of a mortgage, a larger portion of
              your payment goes towards interest. Later, more goes toward the
              principal.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              How can I lower my mortgage payment?
            </AccordionTrigger>
            <AccordionContent>
              You can make a larger down payment, choose a longer loan term
              (but you&apos;ll pay more interest), or shop around for the best
              interest rate. Improving your credit score also helps.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
