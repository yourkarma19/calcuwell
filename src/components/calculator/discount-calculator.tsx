"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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
              <div className="flex justify-between items-center">
                <Label htmlFor="discount">Discount Percentage</Label>
                <span className="text-lg font-semibold">{discount}%</span>
              </div>
              <Slider id="discount" value={[discount]} onValueChange={(v) => setDiscount(v[0])} min={0} max={100} step={1} />
            </div>
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
