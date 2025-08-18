
"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateEMI, calculateEMIWithExtraPayments } from "@/lib/math/loan-emi";
import { useSearchParams } from "next/navigation";

export default function LoanEMICalculator({ setFormula, setChildProps }: { setFormula: (formula: string) => void, setChildProps: (props: any) => void }) {
  const searchParams = useSearchParams();
  const [principal, setPrincipal] = usePersistentState("loan-principal", 500000);
  const [rate, setRate] = usePersistentState("loan-rate", 8.5);
  const [tenure, setTenure] = usePersistentState("loan-tenure", 5);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = usePersistentState("loan-extra-monthly", 0);
  const [extraYearlyPayment, setExtraYearlyPayment] = usePersistentState("loan-extra-yearly", 0);

  useEffect(() => {
    const p = searchParams.get('principal');
    const r = searchParams.get('rate');
    const t = searchParams.get('tenure');
    if (p) setPrincipal(parseFloat(p));
    if (r) setRate(parseFloat(r));
    if (t) setTenure(parseFloat(t));
    setFormula("EMI = [P x R x (1+R)^N] / [(1+R)^N-1]");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);


  const { emi, totalPayable, totalInterest } = useMemo(() => {
    return calculateEMI(principal, rate, tenure);
  }, [principal, rate, tenure]);
  
  useEffect(() => {
    setChildProps({ principal, totalInterest });
  }, [principal, totalInterest, setChildProps]);


  const { newTotalInterest, newTotalMonths, interestSaved, timeSaved } = useMemo(() => {
    if (extraMonthlyPayment > 0 || extraYearlyPayment > 0) {
      return calculateEMIWithExtraPayments(principal, rate, tenure, extraMonthlyPayment, extraYearlyPayment);
    }
    return { newTotalInterest: 0, newTotalMonths: 0, interestSaved: 0, timeSaved: { years: 0, months: 0 }};
  }, [principal, rate, tenure, extraMonthlyPayment, extraYearlyPayment]);
  
  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  };
  
  const formatTime = (totalMonths: number) => {
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years} yr, ${months} mo`;
  }

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="principal">Loan Amount</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="principal"
                  value={[principal]}
                  onValueChange={(value) => setPrincipal(value[0])}
                  min={10000}
                  max={10000000}
                  step={10000}
                />
                <Input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-32" step="10000" />
              </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
               <div className="flex items-center gap-4">
                <Slider
                  id="rate"
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                  min={0}
                  max={20}
                  step={0.05}
                />
                <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-24" step="0.05" />
               </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure">Loan Tenure (Years)</Label>
               <div className="flex items-center gap-4">
                <Slider
                  id="tenure"
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={1}
                  max={30}
                  step={1}
                />
                <Input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-24" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="extra-monthly">Extra Monthly Payment (Optional)</Label>
                <Input type="number" value={extraMonthlyPayment} onChange={e => setExtraMonthlyPayment(Number(e.target.value))} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extra-yearly">Extra Yearly Payment (Optional)</Label>
                <Input type="number" value={extraYearlyPayment} onChange={e => setExtraYearlyPayment(Number(e.target.value))} className="w-full" />
              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Loan EMI</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4" aria-live="polite">
             <div>
                <p className="text-sm text-muted-foreground">Monthly EMI</p>
                <p className="text-4xl font-bold font-headline text-primary">
                  {formatCurrency(emi)}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm text-left border-t pt-2">
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Principal Amount:</span>
                    <span className="font-semibold">{formatCurrency(principal)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Interest:</span>
                    <span className="font-semibold">{formatCurrency(totalInterest)}</span>
                </div>
                 <div className="flex justify-between font-bold">
                    <span className="text-muted-foreground">Total Payable:</span>
                    <span className="font-semibold">{formatCurrency(totalPayable)}</span>
                </div>
            </div>
            {(extraMonthlyPayment > 0 || extraYearlyPayment > 0) && interestSaved > 0 && (
              <div className="space-y-2 text-sm text-left border-t pt-4 mt-4">
                <p className="font-bold text-center text-primary">With Extra Payments</p>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">New Loan Term:</span>
                    <span className="font-semibold">{formatTime(newTotalMonths)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Saved:</span>
                    <span className="font-semibold">{timeSaved.years} yr, {timeSaved.months} mo</span>
                </div>
                <div className="flex justify-between font-bold text-green-600">
                    <span className="text-muted-foreground">Interest Saved:</span>
                    <span className="font-semibold">{formatCurrency(interestSaved)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
