"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function InvestmentReturnCalculator() {
  const [initialInvestment, setInitialInvestment] = usePersistentState("roi-initial", 10000);
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

  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Calculate your Return on Investment (ROI) by entering your initial and final investment values.</CardDescription>
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
            <CardHeader><CardTitle>About Return on Investment (ROI)</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The ROI Calculator is a simple yet powerful tool for checking how profitable an investment was. It measures the gain or loss on an investment relative to its cost. Understanding your ROI is key to making smart financial choices and checking how well your portfolio is doing.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **Initial Investment** amount (the total cost).</li>
                    <li>Enter the **Final Value** of the investment (what it's worth now or when you sold it).</li>
                </ol>
                <p>The calculator will instantly show the net profit or loss in currency and the overall ROI as a percentage.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Return on Investment (ROI)?</AccordionTrigger>
                        <AccordionContent>
                            ROI is a measure used to check the efficiency of an investment. It measures the return of an investment relative to its cost. A high ROI means the investment's gains are good compared to its cost.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How is ROI calculated?</AccordionTrigger>
                        <AccordionContent>
                            The formula is `ROI = (Final Value - Initial Investment) / Initial Investment * 100%`. This calculation shows the percentage gain or loss on the investment. A positive ROI means a profit, while a negative ROI means a loss.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is a "good" ROI?</AccordionTrigger>
                        <AccordionContent>
                           A "good" ROI depends on the type of investment and its risk. For example, a 7-10% average annual return from the stock market is often seen as good. A less risky investment like a government bond would have a lower, but more predictable, ROI. The key is to compare an investment's ROI to other similar options.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>What are the limits of ROI?</AccordionTrigger>
                        <AccordionContent>
                           ROI does not consider the time period of an investment. For example, a 20% ROI over one year is much better than a 20% ROI over ten years. To compare investments over different timeframes, it's often better to use metrics that account for time, such as Annualized ROI.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Investment Result</CardTitle></CardHeader>
          <CardContent className="space-y-4" aria-live="polite">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Net {isProfit ? "Profit" : "Loss"}</p>
              <p className={cn("text-4xl font-bold font-headline", resultColor)}>
                {formatCurrency(Math.abs(netProfit))}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Return on Investment (ROI)</p>
              <p className={cn("text-2xl font-semibold", resultColor)}>
                {roi.toFixed(2)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
