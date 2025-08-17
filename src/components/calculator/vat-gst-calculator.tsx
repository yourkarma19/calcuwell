
"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function VatGstCalculator({ setFormula }: { setFormula: (formula: string) => void }) {
  const searchParams = useSearchParams();
  const [amount, setAmount] = usePersistentState("vat-amount", 0);
  const [taxRate, setTaxRate] = usePersistentState("vat-rate", 18);
  const [priceIncludesTax, setPriceIncludesTax] = usePersistentState<"yes" | "no">("vat-includes", "no");

  useEffect(() => {
    const a = searchParams.get('amount');
    const r = searchParams.get('rate');
    const i = searchParams.get('includes');
    if (a) setAmount(parseFloat(a));
    if (r) setTaxRate(parseFloat(r));
    if (i === 'yes' || i === 'no') setPriceIncludesTax(i);
  }, [searchParams, setAmount, setTaxRate, setPriceIncludesTax]);
  
  useEffect(() => {
    if (amount === 0) setAmount(100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { taxAmount, netPrice, grossPrice } = useMemo(() => {
    const initialAmount = Number(amount);
    const rate = Number(taxRate) / 100;

    if (initialAmount <= 0 || rate < 0) {
      return { taxAmount: 0, netPrice: 0, grossPrice: 0 };
    }

    if (priceIncludesTax === 'yes') {
      // Amount is the gross price
      const gross = initialAmount;
      const net = initialAmount / (1 + rate);
      const tax = gross - net;
      return { taxAmount: tax, netPrice: net, grossPrice: gross };
    } else {
      // Amount is the net price
      const net = initialAmount;
      const tax = net * rate;
      const gross = net + tax;
      return { taxAmount: tax, netPrice: net, grossPrice: gross };
    }
  }, [amount, taxRate, priceIncludesTax]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>VAT / GST Calculator</CardTitle>
            <CardDescription>Easily add or remove Value Added Tax (VAT) or Goods and Services Tax (GST) from a price.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Initial Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Does the initial price include tax?</Label>
              <RadioGroup
                value={priceIncludesTax}
                onValueChange={(v) => setPriceIncludesTax(v as any)}
                className="flex items-center space-x-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No (Add Tax)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes (Remove Tax)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="tax-rate"
                  value={[taxRate]}
                  onValueChange={(v) => setTaxRate(v[0])}
                  min={0}
                  max={100}
                  step={0.5}
                />
                <Input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-24" step="0.5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About VAT & GST</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is VAT/GST?</AccordionTrigger>
                        <AccordionContent>
                            Value-Added Tax (VAT) or Goods and Services Tax (GST) is a consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How to Calculate Tax</AccordionTrigger>
                        <AccordionContent>
                            To add tax to a net price, you multiply the price by the tax rate (as a decimal). For example, to add 18% tax to a ₹100 item, you calculate `100 * 0.18 = ₹18` in tax, for a total price of ₹118.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How to Remove Tax from a Gross Price</AccordionTrigger>
                        <AccordionContent>
                           To find the original price before tax was added, divide the gross price by (1 + tax rate as a decimal). For example, if a product costs ₹118 with 18% tax included, the original price is `118 / (1 + 0.18) = ₹100`.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Final Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" aria-live="polite">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Net Price</span>
              <span className="font-semibold">₹{netPrice.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
            </div>
             <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax Amount</span>
              <span className="font-semibold">₹{taxAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
            </div>
             <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span>Gross Price</span>
              <span className="text-primary">₹{grossPrice.toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
