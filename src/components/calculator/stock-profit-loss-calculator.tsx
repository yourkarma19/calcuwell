
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function StockProfitLossCalculator() {
  const [buyPrice, setBuyPrice] = usePersistentState("stock-buy-price", 100);
  const [sellPrice, setSellPrice] = usePersistentState("stock-sell-price", 120);
  const [quantity, setQuantity] = usePersistentState("stock-quantity", 50);
  const [buyCommission, setBuyCommission] = usePersistentState("stock-buy-commission", 5);
  const [sellCommission, setSellCommission] = usePersistentState("stock-sell-commission", 5);

  const { totalCost, totalProceeds, profitOrLoss, returnPercentage } = useMemo(() => {
    const cost = (buyPrice * quantity) + buyCommission;
    const proceeds = (sellPrice * quantity) - sellCommission;
    const profit = proceeds - cost;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;

    return {
      totalCost: cost,
      totalProceeds: proceeds,
      profitOrLoss: profit,
      returnPercentage: roi,
    };
  }, [buyPrice, sellPrice, quantity, buyCommission, sellCommission]);

  const isProfit = profitOrLoss >= 0;
  const resultColor = isProfit ? "text-green-500" : "text-red-500";
  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Stock Trade Details</CardTitle>
            <CardDescription>Enter your trade details to calculate the profit or loss and the return on investment (ROI).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buy-price">Buy Price per Share</Label>
                <Input id="buy-price" type="number" value={buyPrice} onChange={e => setBuyPrice(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sell-price">Sell Price per Share</Label>
                <Input id="sell-price" type="number" value={sellPrice} onChange={e => setSellPrice(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (Number of Shares)</Label>
                <Input id="quantity" type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buy-commission">Buy Commission</Label>
                <Input id="buy-commission" type="number" value={buyCommission} onChange={e => setBuyCommission(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sell-commission">Sell Commission</Label>
                <Input id="sell-commission" type="number" value={sellCommission} onChange={e => setSellCommission(Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About Stock Calculations</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How is the total profit or loss calculated?</AccordionTrigger>
                <AccordionContent>
                  The total profit or loss is calculated by subtracting the total cost from the total proceeds. The total cost includes the price of the shares plus any buying commissions, and the total proceeds are the selling price minus any selling commissions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What are commissions and how do they affect my return?</AccordionTrigger>
                <AccordionContent>
                  Commissions are fees charged by your broker for executing a trade. They are a direct cost of trading and reduce your overall profit. It's important to include them in your calculation for an accurate picture of your return.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Trade Result</CardTitle></CardHeader>
          <CardContent className="space-y-4" aria-live="polite">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total {isProfit ? "Profit" : "Loss"}</p>
              <p className={cn("text-4xl font-bold font-headline", resultColor)}>
                {formatCurrency(Math.abs(profitOrLoss))}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Return on Investment</p>
              <p className={cn("text-2xl font-semibold", resultColor)}>
                {returnPercentage.toFixed(2)}%
              </p>
            </div>
            <div className="space-y-2 text-sm pt-4 border-t">
                 <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span className="font-semibold">{formatCurrency(totalCost)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Total Proceeds:</span>
                    <span className="font-semibold">{formatCurrency(totalProceeds)}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
