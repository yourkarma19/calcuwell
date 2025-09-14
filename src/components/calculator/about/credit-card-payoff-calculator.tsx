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
      name: "Why does it take so long to pay off credit card debt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Credit card interest is compounded, meaning you pay interest on your interest. Because APRs are typically high, making only the minimum payment can lead to a very long payoff time and a large amount of total interest paid.",
      },
    },
    {
      "@type": "Question",
      name: "What if my monthly payment is too low to pay off the balance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your monthly payment is less than or equal to the monthly interest accrued, you will never be able to pay off the debt; in fact, the balance may continue to grow. The calculator will show an error if this is the case, indicating that you need to increase your payment.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best strategies to pay off debt faster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most effective way is to pay more than the minimum payment each month. Even small extra payments can significantly reduce the time and total interest paid. You can also explore options like balance transfer cards with a 0% introductory APR or a debt consolidation loan to lower your interest rate.",
      },
    },
  ],
};

export default function AboutCreditCardPayoffCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Credit Card Payoff Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Credit Card Payoff Calculator is a crucial financial tool for
          anyone with credit card debt. It shows you exactly how long
          it&apos;ll take to become debt-free based on your current payments and
          highlights the total amount of interest you will pay.
        </p>

        <h3>How to Use the Calculator</h3>
        <ol>
          <li>
            Enter your total <strong>Card Balance</strong>.
          </li>
          <li>
            Input your card&apos;s <strong>Interest Rate (APR)</strong>.
          </li>
          <li>
            Enter the <strong>Monthly Payment</strong> you plan to make.
          </li>
        </ol>
        <p>
          The calculator will instantly show your payoff timeline and a summary
          of your total payments and interest costs, empowering you to create a
          plan to get out of debt.
        </p>

        <h3>Credit Card Debt FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Why does it take so long to pay off credit card debt?
            </AccordionTrigger>
            <AccordionContent>
              Credit card interest is compounded, meaning you pay interest on
              your interest. Because APRs are typically high, making only the
              minimum payment can lead to a very long payoff time and a large
              amount of total interest paid.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What if my payment is too low?
            </AccordionTrigger>
            <AccordionContent>
              If your monthly payment is less than the monthly interest, you
              will never pay off the debt. The calculator will show an error if
              this happens, telling you to increase your payment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How can I pay off my debt faster?
            </AccordionTrigger>
            <AccordionContent>
              The best way is to pay more than the minimum payment each month.
              Even small extra payments can greatly reduce the time and total
              interest. You can also look into balance transfer cards or debt
              consolidation loans to lower your interest rate.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
