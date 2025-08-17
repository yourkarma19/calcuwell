
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = usePersistentState("discount-price", 100);
  const [discount, setDiscount] = usePersistentState("discount-percentage", 25);

  const { finalPrice, amountSaved } = useMemo(() => {
    const price = Number(originalPrice);
    const disc = Number(discount);

    if (price > 0 && disc >= 0) {
      const saved = price * (disc / 100);
      const final = price - saved;
      return { finalPrice: final, amountSaved: saved };
    }
    return { finalPrice: price, amountSaved: 0 };
  }, [originalPrice, discount]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Discount Calculator</CardTitle>
            <CardDescription>Calculate the final price of an item after a discount has been applied.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="original-price">Original Price</Label>
              <Input id="original-price" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount Percentage</Label>
              <div className="flex items-center gap-4">
                <Slider id="discount" value={[discount]} onValueChange={(v) => setDiscount(v[0])} min={0} max={100} step={1} />
                 <Input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About the Discount Calculator</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Discount Calculator** is a simple and practical tool for any shopper looking to find out the final price of an item after a percentage-based discount. It takes the guesswork out of sales, allowing you to instantly see how much you will pay and how much you will save. This is perfect for savvy shoppers who want to verify sale prices and manage their budget effectively.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the **Original Price** of the item.</li>
                <li>Set the **Discount Percentage** using the slider or by typing it in.</li>
            </ol>
            <p>The calculator will immediately display the final sale price and the total amount of money you've saved.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How is the final price calculated?</AccordionTrigger>
                <AccordionContent>
                  First, the discount amount is calculated by converting the percentage to a decimal and multiplying it by the original price (`Discount Amount = Original Price * (Discount % / 100)`). This saved amount is then subtracted from the original price to get the final sale price (`Final Price = Original Price - Discount Amount`).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do you calculate a discount in your head?</AccordionTrigger>
                <AccordionContent>
                  A quick way is to use the 10% method. Find 10% of the price by moving the decimal one place to the left (e.g., 10% of $50 is $5). For a 20% discount, double that amount ($10). For a 25% discount, find 10% ($5), double it for 20% ($10), and add half of the 10% amount for the extra 5% ($2.50), giving you a total discount of $12.50.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Final Price</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">You Pay</p>
              <p className="text-4xl font-bold font-headline text-primary">₹{finalPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">You Save</p>
              <p className="text-2xl font-semibold">₹{amountSaved.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
