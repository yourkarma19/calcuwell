"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function StockProfitLossCalculator() {
  const [buyPrice, setBuyPrice] = usePersistentState("stock-buy-price", 100);
  const [sellPrice, setSellPrice] = usePersistentState("stock-sell-price", 120);
  const [quantity, setQuantity] = usePersistentState("stock-quantity", 50);
  const [commission, setCommission] = usePersistentState("stock-commission", 5);

  const { totalCost, totalProceeds, profitOrLoss, returnPercentage } = useMemo(() => {
    const cost = buyPrice * quantity;
    const proceeds = sellPrice * quantity;
    const profit = proceeds - cost - (2 * commission); // Commission on buy and sell
    const roi = (profit / cost) * 100;

    return {
      totalCost: cost,
      totalProceeds: proceeds,
      profitOrLoss: profit,
      returnPercentage: roi,
    };
  }, [buyPrice, sellPrice, quantity, commission]);

  const isProfit = profitOrLoss >= 0;
  const resultColor = isProfit ? "text-green-500" : "text-red-500";

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader><CardTitle>Enter Trade Details</CardTitle></CardHeader>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (Shares)</Label>
                <Input id="quantity" type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission">Commission per Transaction</Label>
                <Input id="commission" type="number" value={commission} onChange={e => setCommission(Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Trade Result</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total {isProfit ? "Profit" : "Loss"}</p>
              <p className={cn("text-4xl font-bold font-headline", resultColor)}>
                ₹{Math.abs(profitOrLoss).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Return on Investment</p>
              <p className={cn("text-2xl font-semibold", resultColor)}>
                {returnPercentage.toFixed(2)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
