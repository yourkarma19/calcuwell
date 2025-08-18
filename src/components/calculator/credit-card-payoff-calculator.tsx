"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = usePersistentState("cc-balance", 5000);
  const [apr, setApr] = usePersistentState("cc-apr", 19.99);
  const [monthlyPayment, setMonthlyPayment] = usePersistentState("cc-payment", 200);

  const { monthsToPayoff, totalInterest, totalPaid } = useMemo(() => {
    const b = Number(balance);
    const r = Number(apr) / 100 / 12; // Monthly interest rate
    const p = Number(monthlyPayment);

    if (b <= 0 || r < 0 || p <= 0) {
      return { monthsToPayoff: 0, totalInterest: 0, totalPaid: 0 };
    }
    
    // Check if the payment is high enough to ever pay off the loan
    if (r > 0 && p <= b * r) {
      return { monthsToPayoff: Infinity, totalInterest: Infinity, totalPaid: Infinity };
    }

    // Handle 0% APR case
    if (r === 0) {
      const months = Math.ceil(b / p);
      return { monthsToPayoff: months, totalInterest: 0, totalPaid: b };
    }

    // Formula for number of payments (N)
    const n = -(Math.log(1 - (b * r) / p) / Math.log(1 + r));
    const totalPaidAmount = p * n;
    const totalInterestPaid = totalPaidAmount - b;

    return {
      monthsToPayoff: Math.ceil(n),
      totalInterest: totalInterestPaid,
      totalPaid: totalPaidAmount,
    };

  }, [balance, apr, monthlyPayment]);
  
  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Credit Card Debt Details</CardTitle>
            <CardDescription>Find out how long it will take to pay off your credit card balance with your current monthly payment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="balance">Card Balance</Label>
                <Input id="balance" type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apr">Interest Rate (APR %)</Label>
                <Input id="apr" type="number" value={apr} onChange={e => setApr(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly-payment">Monthly Payment</Label>
              <Input id="monthly-payment" type="number" value={monthlyPayment} onChange={e => setMonthlyPayment(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About Credit Card Payoffs</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Credit Card Payoff Calculator is a key tool for anyone looking to get out of debt. High-interest credit card debt can feel stressful, but this calculator helps you make a clear plan. It shows you how long it will take to become debt-free and how much you'll pay in interest. This helps you make smarter financial choices and reach your goals faster.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your current **Card Balance**.</li>
                    <li>Input your card's **Interest Rate (APR)**.</li>
                    <li>Provide the **Monthly Payment** you plan to make.</li>
                </ol>
                <p>The calculator will instantly show you how long it will take to pay off the balance. It also shows the total interest you'll pay.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is APR?</AccordionTrigger>
                        <AccordionContent>
                            APR, or Annual Percentage Rate, is the yearly interest on your balance. For credit cards, it's a key factor in how quickly your debt can grow if you don't pay it off.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why does paying only the minimum take so long?</AccordionTrigger>
                        <AccordionContent>
                            When you make only the minimum payment, a large part of it goes to paying the monthly interest. Very little reduces the main balance. This means your debt decreases very slowly, and you end up paying much more in interest over time.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What are some effective payoff strategies?</AccordionTrigger>
                        <AccordionContent>
                           Two popular methods are the **Avalanche** and **Snowball** methods. With the Avalanche method, you pay off the card with the highest interest rate first. This saves you the most money. With the Snowball method, you pay off the card with the smallest balance first, which can provide a mental boost.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Payoff Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4" aria-live="polite">
            {isFinite(monthsToPayoff) ? (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Time to Pay Off</p>
                  <p className="text-4xl font-bold font-headline text-primary">
                    {Math.floor(monthsToPayoff / 12)} <span className="text-lg">yrs</span> {monthsToPayoff % 12} <span className="text-lg">mos</span>
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Interest Paid:</span>
                    <span className="font-semibold">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Paid:</span>
                    <span className="font-semibold">{formatCurrency(totalPaid)}</span>
                  </div>
                </div>
              </>
            ) : (
                <p className="text-destructive">Payment is too low to ever pay off the balance. It does not cover the monthly interest.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
