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
      name: "What is the formula for the break-even point?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula for the break-even point in units is: Break-Even Units = Fixed Costs / (Price Per Unit - Variable Cost Per Unit). The denominator is known as the contribution margin per unit.",
      },
    },
    {
      "@type": "Question",
      name: "What is the contribution margin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The contribution margin is the revenue from each sale left over to cover fixed costs. It's calculated as Price Per Unit - Variable Cost Per Unit. A higher margin means you break even faster.",
      },
    },
    {
      "@type": "Question",
      name: "Why is break-even analysis important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Break-even analysis helps you set realistic sales goals, determine a pricing strategy, and understand how changes in costs will affect profitability. It's a fundamental part of a solid business plan.",
      },
    },
  ],
};

export default function AboutBreakEvenPointCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Break-Even Point Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Break-Even Point (BEP) Calculator is a key tool for business
          owners. It helps you find the point where your total revenue equals
          your total costs. At this point, you are not making a profit, but you
          are not losing money either.
        </p>
        <h3>How to Use the Break-Even Point Calculator</h3>
        <ol>
          <li>
            Enter your **Total Fixed Costs**. These are expenses that do not
            change with sales (e.g., rent, salaries).
          </li>
          <li>
            Enter your **Variable Cost Per Unit**. This is the cost to make one
            item (e.g., materials).
          </li>
          <li>Enter the **Price Per Unit** you sell your product for.</li>
        </ol>
        <p>
          The calculator will show you how many units you need to sell to break
          even.
        </p>
        <h3>Break-Even Point FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is the formula for the break-even point?
            </AccordionTrigger>
            <AccordionContent>
              The formula is: `Break-Even Units = Fixed Costs / (Price Per Unit
              - Variable Cost Per Unit)`. The bottom part of the formula is
              known as the contribution margin.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the contribution margin?
            </AccordionTrigger>
            <AccordionContent>
              The contribution margin is the money from each sale that&apos;s
              left to cover your fixed costs. It&apos;s found by subtracting the
              Variable Cost Per Unit from the Price Per Unit. A higher margin
              means you break even faster.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Why is this analysis important?</AccordionTrigger>
            <AccordionContent>
              Break-even analysis helps you set sales goals, decide on a pricing
              strategy, and see how cost changes will affect your profit.
              It&apos;s a basic part of a solid business plan.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
