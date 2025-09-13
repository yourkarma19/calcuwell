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
      name: "Why is it important to include commissions in a stock trade calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Commissions and other fees can significantly impact your profitability, especially on smaller trades. Forgetting to include them can make a trade look more profitable than it actually was. The total cost of an investment is the share price plus the buy commission.",
      },
    },
    {
      "@type": "Question",
      name: "What is Return on Investment (ROI)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Return on Investment (ROI) shows your net profit as a percentage of your total cost. It's a standard way to measure the performance of an investment, allowing you to compare the profitability of different trades on a like-for-like basis.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator account for taxes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this calculator does not account for capital gains taxes, which you may have to pay on your profits. Tax laws vary by country and depend on how long you held the stock. The profit shown here is the pre-tax profit.",
      },
    },
  ],
};

export default function AboutStockProfitLossCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Stock Profit/Loss Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Stock Profit/Loss Calculator is an essential tool for investors to
          determine the exact outcome of their stock trades. It allows you to
          factor in the quantity of shares and any commissions or fees. This
          gives you a true picture of your net profit or loss and your return on
          investment (ROI).
        </p>
        <h3>How to Use the Stock Profit/Loss Calculator</h3>
        <ol>
          <li>
            Enter the **Buy Price per Share** and the **Sell Price per Share**.
          </li>
          <li>Input the **Quantity** of shares you traded.</li>
          <li>Add any **Buy Commission** and **Sell Commission** you paid.</li>
        </ol>
        <p>
          The calculator will instantly display the total profit or loss, the
          total cost and proceeds, and the final ROI.
        </p>
        <h3>Stock Profit/Loss FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Why is it important to include commissions?
            </AccordionTrigger>
            <AccordionContent>
              Commissions and other fees can significantly impact your
              profitability, especially on smaller trades. Forgetting to include
              them can make a trade look more profitable than it actually was.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is Return on Investment (ROI)?
            </AccordionTrigger>
            <AccordionContent>
              Return on Investment (ROI) shows your net profit as a percentage
              of your total cost. It&apos;s a standard way to measure the
              performance of an investment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Does this calculator account for taxes?
            </AccordionTrigger>
            <AccordionContent>
              No, this calculator does not account for capital gains taxes. The
              profit shown here is the pre-tax profit. Tax laws vary by country
              and depend on how long you held the stock.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
