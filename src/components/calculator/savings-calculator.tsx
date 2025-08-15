"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = usePersistentState("savings-initial", 1000);
  const [monthlyContribution, setMonthlyContribution] = usePersistentState("savings-monthly", 100);
  const [interestRate, setInterestRate] = usePersistentState("savings-rate", 5);
  const [years, setYears] = usePersistentState("savings-years", 10);

  const { futureValue, totalInterest, totalContributions } = useMemo(() => {
    const P = Number(initialAmount);
    const PMT = Number(monthlyContribution);
    const r = Number(interestRate) / 100;
    const t = Number(years);
    const n = 12; // Compounded monthly

    if (t <= 0) return { futureValue: P, totalInterest: 0, totalContributions: 0 };
    
    const monthlyRate = r / n;
    const totalMonths = t * n;
    
    const fvPrincipal = P * Math.pow(1 + monthlyRate, totalMonths);
    const fvContributions = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const fv = fvPrincipal + fvContributions;
    const totalContributed = PMT * totalMonths;
    const interest = fv - P - totalContributed;

    return {
      futureValue: fv,
      totalInterest: interest,
      totalContributions: totalContributed,
    };
  }, [initialAmount, monthlyContribution, interestRate, years]);
  
  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader><CardTitle>Savings Plan Details</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Initial Amount</Label>
                <span className="text-lg font-semibold">₹ {initialAmount.toLocaleString()}</span>
              </div>
              <Slider value={[initialAmount]} onValueChange={v => setInitialAmount(v[0])} min={0} max={100000} step={500} />
            </div>
             <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Monthly Contribution</Label>
                <span className="text-lg font-semibold">₹ {monthlyContribution.toLocaleString()}</span>
              </div>
              <Slider value={[monthlyContribution]} onValueChange={v => setMonthlyContribution(v[0])} min={0} max={10000} step={100} />
            </div>
             <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Annual Interest Rate (%)</Label>
                <span className="text-lg font-semibold">{interestRate}%</span>
              </div>
              <Slider value={[interestRate]} onValueChange={v => setInterestRate(v[0])} min={0} max={20} step={0.1} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Investment Duration (Years)</Label>
                <span className="text-lg font-semibold">{years} years</span>
              </div>
              <Slider value={[years]} onValueChange={v => setYears(v[0])} min={1} max={50} step={1} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Savings Projection</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Future Value</p>
              <p className="text-4xl font-bold font-headline text-primary">₹ {futureValue.toLocaleString("en-IN", {maximumFractionDigits: 0})}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Initial Deposit</p>
                  <p className="font-semibold">₹ {initialAmount.toLocaleString()}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Total Contributions</p>
                  <p className="font-semibold">₹ {totalContributions.toLocaleString("en-IN", {maximumFractionDigits: 0})}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Total Interest</p>
                  <p className="font-semibold">₹ {totalInterest.toLocaleString("en-IN", {maximumFractionDigits: 0})}</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
