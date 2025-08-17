
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
                <Label htmlFor="tip-percentage">Tip Percentage</Label>
                <div className="flex items-center gap-4">
                  <Slider id="tip-percentage" value={[tipPercentage]} onValueChange={v => setTipPercentage(v[0])} min={0} max={50} step={1} />
                  <Input type="number" value={tipPercentage} onChange={e => setTipPercentage(Number(e.target.value))} className="w-24" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="people">Number of People</Label>
                <div className="flex items-center gap-4">
                  <Slider id="people" value={[people]} onValueChange={v => setPeople(v[0])} min={1} max={20} step={1} />
                  <Input type="number" value={people} onChange={e => setPeople(Number(e.target.value))} className="w-24" />
                </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About the Tip Calculator</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Tip Calculator** is a simple yet essential tool for dining out. It takes the stress out of calculating tips and splitting the bill, especially when you're with a group. This calculator allows you to quickly determine the appropriate tip amount and find the total cost per person, ensuring a smooth and fair end to your meal.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the total **Bill Amount**.</li>
                <li>Adjust the **Tip Percentage** slider to your desired amount (e.g., 15%, 18%, 20%).</li>
                <li>Set the **Number of People** to split the bill with.</li>
            </ol>
            <p>The calculator will instantly show you the total tip, the total bill including the tip, and how much each person should pay.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is a standard tip percentage?</AccordionTrigger>
                <AccordionContent>
                  Tipping customs vary by country and service type. In the United States, a standard tip for restaurant service is typically between 15% and 20% of the pre-tax bill. 15% is considered average, 18% is good for good service, and 20% or more is for excellent service.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do you calculate a tip quickly?</AccordionTrigger>
                <AccordionContent>
                  A quick way to estimate a 20% tip is to find 10% of the bill (by moving the decimal point one place to the left) and then doubling that amount. For example, for a ₹50 bill, 10% is ₹5, so 20% is ₹10. For a 15% tip, find 10% and add half of that amount back on (e.g., ₹5 + ₹2.50 = ₹7.50).
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-3">
                <AccordionTrigger>Should you tip on the pre-tax amount or the total bill?</AccordionTrigger>
                <AccordionContent>
                  It is customary to calculate the tip based on the subtotal of the bill, before sales tax is added. However, many people find it easier to tip on the total amount for convenience, and the difference is usually small.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
