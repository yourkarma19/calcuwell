"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function BusinessProfitMarginCalculator() {
  const [revenue, setRevenue] = usePersistentState("pm-revenue", 100000);
  const [costOfGoods, setCostOfGoods] = usePersistentState("pm-cogs", 40000);
  const [operatingExpenses, setOperatingExpenses] = usePersistentState("pm-opex", 20000);
  const [taxRate, setTaxRate] = usePersistentState("pm-tax", 15);

  const { grossProfit, operatingProfit, netProfit, grossMargin, operatingMargin, netMargin } = useMemo(() => {
    const rev = Number(revenue);
    const cogs = Number(costOfGoods);
    const opex = Number(operatingExpenses);
    const tax = Number(taxRate) / 100;
    
    if (rev <= 0) return { grossProfit: 0, operatingProfit: 0, netProfit: 0, grossMargin: 0, operatingMargin: 0, netMargin: 0 };

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
      netMargin: (np / rev) * 100
    };
  }, [revenue, costOfGoods, operatingExpenses, taxRate]);
  
  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Financials</CardTitle>
          <CardDescription>Enter your revenue and expense details to calculate gross, operating, and net profit margins.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="revenue">Total Revenue</Label>
            <Input id="revenue" type="number" value={revenue} onChange={e => setRevenue(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cogs">Cost of Goods Sold (COGS)</Label>
            <Input id="cogs" type="number" value={costOfGoods} onChange={e => setCostOfGoods(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="opex">Operating Expenses</Label>
            <Input id="opex" type="number" value={operatingExpenses} onChange={e => setOperatingExpenses(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax">Tax Rate (%)</Label>
            <Input id="tax" type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Profitability Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center bg-muted p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground">Net Profit Margin</h3>
            <p className="text-4xl font-bold font-headline text-primary">{netMargin.toFixed(2)}%</p>
            <p className="text-lg font-semibold">{formatCurrency(netProfit)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Gross Margin</h3>
              <p className="text-2xl font-semibold">{grossMargin.toFixed(2)}%</p>
              <p className="text-sm text-muted-foreground">{formatCurrency(grossProfit)}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">Operating Margin</h3>
              <p className="text-2xl font-semibold">{operatingMargin.toFixed(2)}%</p>
              <p className="text-sm text-muted-foreground">{formatCurrency(operatingProfit)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
          <CardHeader><CardTitle>About Profit Margins</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Gross vs. Operating vs. Net Margin</AccordionTrigger>
                <AccordionContent>
                  **Gross Margin** shows the profit after accounting for the direct costs of producing goods (COGS). **Operating Margin** shows the profit after COGS and operating expenses (like rent and marketing) are deducted. **Net Margin** is the final profit after all expenses, including interest and taxes, have been paid.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is a good profit margin?</AccordionTrigger>
                <AccordionContent>
                  A "good" profit margin varies widely by industry. A 10% net profit margin is often considered average, while a 20% margin is considered high, and a 5% margin is low. It's best to compare your margins to other businesses in your specific industry.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    </div>
  );
}
