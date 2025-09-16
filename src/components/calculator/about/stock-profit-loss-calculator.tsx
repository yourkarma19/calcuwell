
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

export default function StockProfitLossCalculator() {
  const [buyPrice, setBuyPrice] = usePersistentState("stock-buy-price", 100);
  const [sellPrice, setSellPrice] = usePersistentState("stock-sell-price", 120);
  const [quantity, setQuantity] = usePersistentState("stock-quantity", 50);
  const [buyCommission, setBuyCommission] = usePersistentState(
    "stock-buy-commission",
    5,
  );
  const [sellCommission, setSellCommission] = usePersistentState(
    "stock-sell-commission",
    5,
  );

  const { totalCost, totalProceeds, profitOrLoss, returnPercentage } =
    useMemo(() => {
      const cost = buyPrice * quantity + buyCommission;
      const proceeds = sellPrice * quantity - sellCommission;
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
  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stock Trade Details</CardTitle>
          <CardDescription>
            Enter your trade details to calculate the profit or loss and the
            return on investment (ROI).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buy-price">Buy Price per Share</Label>
              <Input
                id="buy-price"
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sell-price">Sell Price per Share</Label>
              <Input
                id="sell-price"
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (Number of Shares)</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buy-commission">Buy Commission</Label>
              <Input
                id="buy-commission"
                type="number"
                value={buyCommission}
                onChange={(e) => setBuyCommission(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sell-commission">Sell Commission</Label>
              <Input
                id="sell-commission"
                type="number"
                value={sellCommission}
                onChange={(e) => setSellCommission(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trade Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" aria-live="polite">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Total {isProfit ? "Profit" : "Loss"}
            </p>
            <p className={cn("text-4xl font-bold font-headline", resultColor)}>
              {formatCurrency(Math.abs(profitOrLoss))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Return on Investment
            </p>
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
              <span className="font-semibold">
                {formatCurrency(totalProceeds)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
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
    </div>
  );
}
