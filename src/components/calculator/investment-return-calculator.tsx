"use client";

import { useMemo } from "react";
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
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the formula for ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula for Return on Investment is: ROI = ( (Final Value - Initial Investment) / Initial Investment ) * 100. The result is expressed as a percentage.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 'good' ROI depends on the type of investment and risk. A 7-10% annual ROI is often considered a good average for the stock market. A high-risk investment would need a much higher potential ROI to be worthwhile.",
      },
    },
    {
      "@type": "Question",
      name: "What are the limitations of ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ROI doesn't account for the holding period. An ROI of 20% over one year is much better than 20% over ten years. For comparing investments over different timeframes, it's better to look at annualized ROI.",
      },
    },
  ],
};

export default function InvestmentReturnCalculator() {
  const [initialInvestment, setInitialInvestment] = usePersistentState(
    "roi-initial",
    10000,
  );
  const [finalValue, setFinalValue] = usePersistentState("roi-final", 12000);

  const { roi, netProfit } = useMemo(() => {
    const initial = Number(initialInvestment);
    const final = Number(finalValue);

    if (initial === 0) {
      return { roi: final > 0 ? Infinity : 0, netProfit: final };
    }

    const profit = final - initial;
    const returnOnInvestment = (profit / initial) * 100;

    return {
      roi: returnOnInvestment,
      netProfit: profit,
    };
  }, [initialInvestment, finalValue]);

  const isProfit = netProfit >= 0;
  const resultColor = isProfit ? "text-green-500" : "text-red-500";

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
          <CardDescription>
            Calculate your Return on Investment (ROI) by entering your initial
            and final investment values.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="initial-investment">Initial Investment</Label>
            <Input
              id="initial-investment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="final-value">Final Value</Label>
            <Input
              id="final-value"
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" aria-live="polite">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Net {isProfit ? "Profit" : "Loss"}
            </p>
            <p className={cn("text-4xl font-bold font-headline", resultColor)}>
              {formatCurrency(Math.abs(netProfit))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Return on Investment (ROI)
            </p>
            <p className={cn("text-2xl font-semibold", resultColor)}>
              {roi.toFixed(2)}%
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">
            About the Return on Investment (ROI) Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Return on Investment (ROI) Calculator measures the profitability
            of an investment. It helps you understand how much money you have made
            or lost in relation to your initial cost. This is one of the most
            popular ways to evaluate an investment&apos;s performance.
          </p>
          <h3>How to Use the ROI Calculator</h3>
          <ol>
            <li>
              Enter the **Initial Investment** amount. This is the total cost you
              paid.
            </li>
            <li>
              Enter the **Final Value** of the investment. This is what it&apos;s
              worth now, or what you sold it for.
            </li>
          </ol>
          <p>
            The calculator will instantly display the net profit or loss and the
            ROI as a percentage.
          </p>
          <h3>ROI FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the formula for ROI?</AccordionTrigger>
              <AccordionContent>
                The formula for Return on Investment is: `ROI = ( (Final Value -
                Initial Investment) / Initial Investment ) * 100`. The result is a
                percentage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is a good ROI?</AccordionTrigger>
              <AccordionContent>
                A &quot;good&quot; ROI depends on the type of investment and its
                risk. A 7-10% annual ROI is often considered a good average for
                the stock market. A high-risk investment would need a much higher
                potential ROI to be worthwhile.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What are the limitations of ROI?
              </AccordionTrigger>
              <AccordionContent>
                ROI is simple, but it doesn&apos;t account for the holding period
                of an investment. An ROI of 20% over one year is much better than
                an ROI of 20% over ten years. For comparing investments over
                different timeframes, it&apos;s better to look at the annualized
                ROI.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
