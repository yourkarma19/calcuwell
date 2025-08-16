
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Input } from "../ui/input";

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
    const totalContributed = P + (PMT * totalMonths);
    const interest = fv - totalContributed;

    return {
      futureValue: fv,
      totalInterest: interest,
      totalContributions: totalContributed,
    };
  }, [initialAmount, monthlyContribution, interestRate, years]);
  
  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN", {maximumFractionDigits: 0})}`;

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Growth Calculator</CardTitle>
            <CardDescription>Project the future value of your savings based on your initial deposit, contributions, interest rate, and time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Initial Amount</Label>
              <div className="flex items-center gap-4">
                <Slider value={[initialAmount]} onValueChange={v => setInitialAmount(v[0])} min={0} max={100000} step={500} />
                <Input type="number" value={initialAmount} onChange={e => setInitialAmount(Number(e.target.value))} className="w-32" step="500" />
              </div>
            </div>
             <div className="space-y-2">
              <Label>Monthly Contribution</Label>
              <div className="flex items-center gap-4">
                <Slider value={[monthlyContribution]} onValueChange={v => setMonthlyContribution(v[0])} min={0} max={10000} step={100} />
                <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} className="w-32" step="100" />
              </div>
            </div>
             <div className="space-y-2">
              <Label>Annual Interest Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider value={[interestRate]} onValueChange={v => setInterestRate(v[0])} min={0} max={20} step={0.1} />
                <Input type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-24" step="0.1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Investment Duration (Years)</Label>
              <div className="flex items-center gap-4">
                <Slider value={[years]} onValueChange={v => setYears(v[0])} min={1} max={50} step={1} />
                <Input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground flex items-start gap-4">
                <Info className="w-5 h-5 mt-1 shrink-0" />
                <div>
                    <p>This calculator assumes interest is compounded monthly. The projected values are estimates and actual returns may vary.</p>
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
              <p className="text-4xl font-bold font-headline text-primary">{formatCurrency(futureValue)}</p>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm text-left border-t pt-4">
                 <div className="flex justify-between">
                  <p className="text-muted-foreground">Total Contributions</p>
                  <p className="font-semibold">{formatCurrency(totalContributions)}</p>
                </div>
                 <div className="flex justify-between">
                  <p className="text-muted-foreground">Total Interest</p>
                  <p className="font-semibold">{formatCurrency(totalInterest)}</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
