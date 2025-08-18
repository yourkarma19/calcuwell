
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
    <div className="space-y-6">
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
  );
}
