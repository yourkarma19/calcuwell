"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function LoanAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = usePersistentState("la-income", 60000);
  const [monthlyDebt, setMonthlyDebt] = usePersistentState("la-debt", 500);
  const [interestRate, setInterestRate] = usePersistentState("la-rate", 7);
  const [loanTerm, setLoanTerm] = usePersistentState("la-term", 30);
  const [dtiRatio, setDtiRatio] = usePersistentState("la-dti", 43); // Debt-to-income ratio

  const { affordableLoan, monthlyPayment } = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPaymentForHousing = (monthlyIncome * (dtiRatio / 100)) - monthlyDebt;
    
    if (maxMonthlyPaymentForHousing <= 0) {
      return { affordableLoan: 0, monthlyPayment: 0 };
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyInterestRate <= 0) {
      return { affordableLoan: maxMonthlyPaymentForHousing * numberOfPayments, monthlyPayment: maxMonthlyPaymentForHousing }
    }

    const affordableLoanAmount = maxMonthlyPaymentForHousing * 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) / 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments));

    return { 
      affordableLoan: isFinite(affordableLoanAmount) ? affordableLoanAmount : 0, 
      monthlyPayment: maxMonthlyPaymentForHousing 
    };
  }, [annualIncome, monthlyDebt, interestRate, loanTerm, dtiRatio]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader><CardTitle>Financial Details</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="annual-income">Annual Income</Label>
              <Input id="annual-income" type="number" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly-debt">Monthly Debt Payments</Label>
              <Input id="monthly-debt" type="number" value={monthlyDebt} onChange={e => setMonthlyDebt(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <Input id="interest-rate" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan-term">Loan Term (Years)</Label>
                <Input id="loan-term" type="number" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Debt-to-Income (DTI) Ratio (%)</Label>
                <span>{dtiRatio}%</span>
              </div>
              <Slider value={[dtiRatio]} onValueChange={v => setDtiRatio(v[0])} min={20} max={50} step={1} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Loan Affordability</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">You Can Afford a Loan Of</p>
              <p className="text-4xl font-bold font-headline text-primary">₹{affordableLoan.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
              <p className="text-2xl font-semibold">₹{monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
