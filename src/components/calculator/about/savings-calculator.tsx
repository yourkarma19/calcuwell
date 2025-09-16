
"use client";
import Link from "next/link";
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
      name: "How does compound interest work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compound interest is 'interest on interest.' It means that the interest you earn is added back to your principal, and then you earn interest on the new, larger amount. This causes your savings to grow at an accelerating rate over time.",
      },
    },
    {
      "@type": "Question",
      name: "Why are regular contributions so important for saving?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consistent, regular contributions are the engine of your savings plan. Even small monthly deposits add up to a significant amount over many years. This strategy, known as dollar-cost averaging, helps you build wealth steadily.",
      },
    },
    {
      "@type": "Question",
      name: "What is a realistic interest rate to assume for savings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A realistic rate depends on where you are saving or investing. A high-yield savings account might offer 1-3%, while a diversified stock market portfolio has historically returned an average of 7-10% annually over the long term, though with higher risk. It's often wise to use a conservative estimate for planning.",
      },
    },
  ],
};

export default function AboutSavingsCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Savings Growth Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Savings Growth Calculator helps you visualize how your savings can
          grow over time. By factoring in your initial deposit, regular
          contributions, and compound interest, this calculator provides a clear
          projection of your financial future.
        </p>
        <h3>How to Use the Savings Calculator</h3>
        <ol>
          <li>Enter your **Initial Amount**.</li>
          <li>Set your planned **Monthly Contribution**.</li>
          <li>Input the estimated **Annual Interest Rate**.</li>
          <li>Choose your **Investment Duration** in years.</li>
        </ol>
        <p>
          The calculator will instantly show the future value of your savings
          and a breakdown of your contributions versus interest earned.
        </p>
        <h3>Savings Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does compound interest work?
            </AccordionTrigger>
            <AccordionContent>
              Compound interest is &quot;interest on interest.&quot; The
              interest you earn is added to your principal, and then you earn
              interest on the new, larger amount. This causes your savings to
              grow faster over time. Our{" "}
              <Link
                href="/calculators/compound-interest-calculator"
                className="text-primary hover:underline"
              >
                Compound Interest Calculator
              </Link>{" "}
              can help illustrate this.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why are regular contributions so important?
            </AccordionTrigger>
            <AccordionContent>
              Consistent, regular contributions are the engine of your savings
              plan. Even small monthly deposits add up to a large amount over
              many years. This strategy helps you build wealth steadily.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is a realistic interest rate to assume?
            </AccordionTrigger>
            <AccordionContent>
              A realistic rate depends on where you are investing. A high-yield
              savings account might offer 1-3%, while a stock market portfolio
              has historically returned an average of 7-10% annually over the
              long term, though with higher risk. It&apos;s often wise to use a
              conservative estimate.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
