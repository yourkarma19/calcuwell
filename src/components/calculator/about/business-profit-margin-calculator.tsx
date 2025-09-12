
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
      name: "What is the difference between Gross, Operating, and Net Margin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gross Margin shows profit on each sale after direct costs (COGS). Operating Margin shows profit from core operations after all expenses. Net Margin is the final 'bottom line' profit after all expenses, including taxes.",
      },
    },
    {
      "@type": "Question",
      name: "Why is looking at all three profit margins important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Analyzing all three margins tells a complete story. A company might have a high gross margin (efficient production) but a low net margin (high operating costs). Comparing these margins over time provides valuable insights into financial health.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good profit margin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 'good' profit margin varies widely by industry. A net profit margin of 10% is often considered average, 20% is high, and 5% is low. It's most useful to compare your margins to industry benchmarks.",
      },
    },
  ],
};

export default function AboutBusinessProfitMarginCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Profit Margin Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Profit Margin Calculator is a key financial tool for business
          owners, managers, and investors. It breaks down a company&apos;s profit
          into three important types: Gross, Operating, and Net Profit Margins.
          Understanding these margins helps you check the financial health and
          efficiency of a business.
        </p>

        <h3>How to Use the Profit Margin Calculator</h3>
        <ol>
          <li>Enter your **Total Revenue**.</li>
          <li>
            Input your **Cost of Goods Sold (COGS)**. These are the direct
            costs of making your products.
          </li>
          <li>
            Enter your total **Operating Expenses**. This includes costs not
            directly related to production, like rent and salaries.
          </li>
          <li>Provide the applicable **Tax Rate** as a percentage.</li>
        </ol>
        <p>
          The calculator will instantly show the three profit margins and their
          profit amounts.
        </p>

        <h3>Profit Margin FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What&apos;s the difference between Gross, Operating, and Net Margin?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Gross Margin</strong> shows the profit on each sale
                after accounting for direct costs (COGS).
              </p>
              <p>
                <strong>Operating Margin</strong> shows the profit from its
                main business operations, after all operating expenses.
              </p>
              <p>
                <strong>Net Margin</strong> is the &quot;bottom line.&quot; It&apos;s the
                final profit after all expenses, including interest and taxes.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why look at all three margins?
            </AccordionTrigger>
            <AccordionContent>
              Looking at all three margins tells a complete story. A company
              might have a high gross margin but a low net margin (meaning its
              other costs are too high). Comparing these margins over time gives
              you valuable insights.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is a good profit margin?</AccordionTrigger>
            <AccordionContent>
              A &quot;good&quot; profit margin varies a lot by industry. As a general
              rule, a net profit margin of 10% is average, 20% is high, and 5%
              is low. It&apos;s best to compare your margins to others in your
              industry.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
