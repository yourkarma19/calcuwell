
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function TipCalculator() {
  const [bill, setBill] = usePersistentState("tip-bill", 50);
  const [tipPercentage, setTipPercentage] = usePersistentState("tip-percentage", 18);
  const [people, setPeople] = usePersistentState("tip-people", 1);

  const { tipAmount, totalAmount, perPersonAmount } = useMemo(() => {
    const billAmount = Number(bill);
    const numPeople = Number(people);

    if(billAmount <= 0 || numPeople <= 0) {
        return { tipAmount: 0, totalAmount: 0, perPersonAmount: 0 };
    }

    const tip = billAmount * (tipPercentage / 100);
    const total = billAmount + tip;
    const perPerson = total / numPeople;

    return {
        tipAmount: tip,
        totalAmount: total,
        perPersonAmount: perPerson,
    };

  }, [bill, tipPercentage, people]);
  
  const formatCurrency = (value: number) => `₹${value.toFixed(2)}`;

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Bill and Tip Details</CardTitle>
            <CardDescription>Calculate the tip and split the bill between any number of people.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="bill">Bill Amount</Label>
                <Input id="bill" type="number" value={bill} onChange={e => setBill(Number(e.target.value))} />
            </div>
             <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="tip-percentage">Tip Percentage</Label>
                    <span className="text-lg font-semibold">{tipPercentage}%</span>
                </div>
                <Slider id="tip-percentage" value={[tipPercentage]} onValueChange={v => setTipPercentage(v[0])} min={0} max={50} step={1} />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="people">Number of People</Label>
                    <span className="text-lg font-semibold">{people}</span>
                </div>
                <Slider id="people" value={[people]} onValueChange={v => setPeople(v[0])} min={1} max={20} step={1} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Your Split</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4" aria-live="polite">
             <div>
                <p className="text-sm text-muted-foreground">Amount per Person</p>
                <p className="text-4xl font-bold font-headline text-primary">
                    {formatCurrency(perPersonAmount)}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tip Amount</p>
                  <p className="font-semibold">{formatCurrency(tipAmount)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Bill</p>
                  <p className="font-semibold">{formatCurrency(totalAmount)}</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
