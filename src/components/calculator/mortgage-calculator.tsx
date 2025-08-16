
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

export default function MortgageCalculator() {
  const [principal, setPrincipal] = usePersistentState("mortgage-principal", 250000);
  const [rate, setRate] = usePersistentState("mortgage-rate", 6.5);
  const [tenure, setTenure] = usePersistentState("mortgage-tenure", 30);
  const [propertyTax, setPropertyTax] = usePersistentState("mortgage-tax", 2000);
  const [homeInsurance, setHomeInsurance] = usePersistentState("mortgage-insurance", 1000);

  const { monthlyPayment, totalPayable, totalInterest } = useMemo(() => {
    if (principal > 0 && rate > 0 && tenure > 0) {
      const monthlyRate = rate / 12 / 100;
      const numberOfMonths = tenure * 12;
      const P = principal;

      const principalAndInterest = (P * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
      
      const monthlyTaxes = propertyTax / 12;
      const monthlyInsurance = homeInsurance / 12;

      const totalMonthlyPayment = principalAndInterest + monthlyTaxes + monthlyInsurance;

      if (isFinite(totalMonthlyPayment)) {
        const totalPayableValue = totalMonthlyPayment * numberOfMonths;
        const totalInterestValue = (principalAndInterest * numberOfMonths) - principal;
        return {
          monthlyPayment: totalMonthlyPayment,
          totalPayable: totalPayableValue,
          totalInterest: totalInterestValue,
        };
      }
    }
    return { monthlyPayment: 0, totalPayable: 0, totalInterest: 0 };
  }, [principal, rate, tenure, propertyTax, homeInsurance]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Mortgage Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Home Price</Label>
              <div className="flex items-center gap-4">
                <Slider value={[principal]} onValueChange={(v) => setPrincipal(v[0])} min={10000} max={2000000} step={10000} />
                 <Input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-32" step="10000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Interest Rate (% p.a.)</Label>
              <div className="flex items-center gap-4">
                <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={1} max={20} step={0.05} />
                <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-24" step="0.05" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Loan Term (Years)</Label>
               <div className="flex items-center gap-4">
                <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={1} max={30} step={1} />
                <Input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Annual Property Tax</Label>
              <div className="flex items-center gap-4">
                <Slider value={[propertyTax]} onValueChange={(v) => setPropertyTax(v[0])} min={0} max={20000} step={100} />
                <Input type="number" value={propertyTax} onChange={e => setPropertyTax(Number(e.target.value))} className="w-32" step="100" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Annual Home Insurance</Label>
              <div className="flex items-center gap-4">
                <Slider value={[homeInsurance]} onValueChange={(v) => setHomeInsurance(v[0])} min={0} max={10000} step={50} />
                <Input type="number" value={homeInsurance} onChange={e => setHomeInsurance(Number(e.target.value))} className="w-32" step="50" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Mortgage EMI</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Monthly Payment</p>
              <p className="text-4xl font-bold font-headline text-primary">₹ {monthlyPayment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <p className="text-muted-foreground">Total Interest</p>
                  <p className="font-semibold">₹ {totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Payment</p>
                  <p className="font-semibold">₹ {totalPayable.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
