"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
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

export default function BusinessProfitMarginCalculator() {
  const [revenue, setRevenue] = usePersistentState("pm-revenue", 100000);
  const [costOfGoods, setCostOfGoods] = usePersistentState("pm-cogs", 40000);
  const [operatingExpenses, setOperatingExpenses] = usePersistentState(
    "pm-opex",
    20000,
  );
  const [taxRate, setTaxRate] = usePersistentState("pm-tax", 15);

  const {
    grossProfit,
    operatingProfit,
    netProfit,
    grossMargin,
    operatingMargin,
    netMargin,
  } = useMemo(() => {
    const rev = Number(revenue);
    const cogs = Number(costOfGoods);
    const opex = Number(operatingExpenses);
    const tax = Number(taxRate) / 100;

    if (rev <= 0)
      return {
        grossProfit: 0,
        operatingProfit: 0,
        netProfit: 0,
        grossMargin: 0,
        operatingMargin: 0,
        netMargin: 0,
      };

    const gp = rev - cogs;
    const op = gp - opex;
    const ebt = op; // Assuming no interest for simplicity
    const taxAmount = ebt * tax;
    const np = ebt - taxAmount;

    return {
      grossProfit: gp,
      operatingProfit: op,
      netProfit: np,
      grossMargin: (gp / rev) * 100,
      operatingMargin: (op / rev) * 100,
      netMargin: (np / rev) * 100,
    };
  }, [revenue, costOfGoods, operatingExpenses, taxRate]);

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Financials</CardTitle>
          <CardDescription>
            Enter your revenue and expense details to calculate gross,
            operating, and net profit margins.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="revenue">Total Revenue</Label>
            <Input
              id="revenue"
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cogs">Cost of Goods Sold (COGS)</Label>
            <Input
              id="cogs"
              type="number"
              value={costOfGoods}
              onChange={(e) => setCostOfGoods(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="opex">Operating Expenses</Label>
            <Input
              id="opex"
              type="number"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax">Tax Rate (%)</Label>
            <Input
              id="tax"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Profitability Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center bg-muted p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground">
              Net Profit Margin
            </h3>
            <p className="text-4xl font-bold font-headline text-primary">
              {netMargin.toFixed(2)}%
            </p>
            <p className="text-lg font-semibold">{formatCurrency(netProfit)}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Gross Margin
              </h3>
              <p className="text-2xl font-semibold">
                {grossMargin.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(grossProfit)}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                Operating Margin
              </h3>
              <p className="text-2xl font-semibold">
                {operatingMargin.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(operatingProfit)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
            owners, managers, and investors. It breaks down a company&apos;s
            profit into three important types: Gross, Operating, and Net Profit
            Margins. Understanding these margins helps you check the financial
            health and efficiency of a business.
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
                What&apos;s the difference between Gross, Operating, and Net
                Margin?
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
                  <strong>Net Margin</strong> is the &quot;bottom line.&quot;
                  It&apos;s the final profit after all expenses, including
                  interest and taxes.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why look at all three margins?</AccordionTrigger>
              <AccordionContent>
                Looking at all three margins tells a complete story. A company
                might have a high gross margin but a low net margin (meaning its
                other costs are too high). Comparing these margins over time
                gives you valuable insights.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is a good profit margin?</AccordionTrigger>
              <AccordionContent>
                A &quot;good&quot; profit margin varies a lot by industry. As a
                general rule, a net profit margin of 10% is average, 20% is
                high, and 5% is low. It&apos;s best to compare your margins to
                others in your industry.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
