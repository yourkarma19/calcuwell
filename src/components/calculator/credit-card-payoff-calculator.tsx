
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-6">
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
  );
}
