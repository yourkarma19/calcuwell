
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
      return { roi: 0, netProfit: final };
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
          <CardHeader><CardTitle>About ROI</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Return on Investment (ROI)?</AccordionTrigger>
                <AccordionContent>
                  Return on Investment (ROI) is a performance measure used to evaluate the efficiency of an investment. It measures the amount of return on an investment relative to its cost. A high ROI means the investment's gains compare favorably to its cost.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How is ROI calculated?</AccordionTrigger>
                <AccordionContent>
                  The formula is `ROI = (Final Value - Initial Investment) / Initial Investment * 100%`. This calculation shows the percentage gain or loss on the investment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Return on Investment</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4" aria-live="polite">
            <div>
              <p className="text-sm text-muted-foreground">Return on Investment (ROI)</p>
              <p className={cn("text-4xl font-bold font-headline", resultColor)}>
                {roi.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net {isProfit ? "Profit" : "Loss"}</p>
              <p className={cn("text-2xl font-semibold", resultColor)}>
                ₹{Math.abs(netProfit).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
